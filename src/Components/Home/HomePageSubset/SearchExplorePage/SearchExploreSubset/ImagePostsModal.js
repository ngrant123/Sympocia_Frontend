import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ImagePostDisplayPortal from "../../../HomePageSet/ImageHomeDisplayPortal.js";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import {getSymposiumId} from "../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {addRecruit} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {isUserFollwingProfile} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {SearchConsumer} from "../../../../SearchPage/SearchContext.js";
import {Link} from "react-router-dom";

import {removeRecruitProfileIsFollowing} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:97%;
	margin-top:1%;


	@media screen and (max-width:740px) and (max-height:420px){
    	#headerLI{
			height:180% !important;
		}
		#headerImageLI{
			height:95% !important;
		}
    }


	@media screen and (max-width:1300px){
		width:120%;
		margin-left:-5% !important;
		#headerLI{
			display:block !important;
			margin-top:10% !important;
			width:95% !important;
		}
		#smallPostLI{
			width:95% !important;
		}
		#image{
			width:120px !important;
			height:120px !important;
			margin-right:2%;
		}
		#suggestedSymposiumLI{
			top:-15% !important;
		}
		#postLI{
			margin-right:2% !important;
		}
	}

	@media screen and (max-width:450px){
		margin-left:-5% !important;
		#headerLI{
			margin-top:-25% !important;
		}
	}
`;

const HeaderImageCSS={
	width:"110%",
	height:"80%",
	borderRadius:"5px",
	backgroundColor:"red",
	borderRadius:"5px",
	boxShadow:"1px 1px 10px #707070"
}

const ImageCSS={
	position:"relative",
	width:"280px",
	height:"230px",
	borderRadius:"5px",
	backgroundColor:"red"
}

const ShadowContainer= styled.div`
	position:absolute;
	width:280px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
	@media screen and (max-width:740px) and (max-height:420px){
    	width:120px !important;
    	height:120px !important;
    }

	@media screen and (max-width:450px){
		display:none !important;
		position:relative;
	}
`;

const ProfilePictureLink=styled(Link)`
	position:relative;
`;


const VideoDesriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:60px;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;


const ImageLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const handleRecruitButton=async(previousProps,post,changeDisplayRecruitButton)=>{
	const {_id,confettiAnimation}=previousProps;
	confettiAnimation();
	addRecruit(_id,post.owner._id);
	changeDisplayRecruitButton(true);
} 

const unRecruitButton=async(previousProps,post,changeDisplayRecruitButton)=>{
	const {_id}=previousProps;

	const {confirmation,data}=await removeRecruitProfileIsFollowing({
		personalProfileId:_id,
		targetProfile:post.owner._id
	})
	if(confirmation=="Success"){
		changeDisplayRecruitButton(false);
	}else{
		alert('Unfortunately something has gone wrong when unrecruiting this person. Please try again');
	}
}


const DisplayRecruitButton=({post,previousProps})=>{
	const {isUserFollowing}=post;
	const postOwnerId=post.owner._id;
	const personalId=previousProps._id;

	const [displayRecruitButton,changeDisplayRecruitButton]=useState(isUserFollowing);

	return <>
				{(personalId!=postOwnerId) &&(
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						{displayRecruitButton==true?
							<li onClick={()=>unRecruitButton(previousProps,post,changeDisplayRecruitButton)} 
								style={ImageLabelCSS}>
								- Recruit
							</li>:
							<li onClick={()=>handleRecruitButton(previousProps,post,changeDisplayRecruitButton)} 
								style={ImageLabelCSS}>
								+ Recruit
							</li>
						}
					</a>
				)}
			</>
}

const constructSuggestedSymposium=(personalInformation,previousProps,images)=>{
		console.log(personalInformation);
		const {personalInformationState}=personalInformation;
		var symposiumContainer=new Map();
		var selectedSymposiums=[];
			var counter=0;
			while(counter<3){   
				if(previousProps.isPersonalProfile==true){
					const randomNum=Math.floor(Math.random() * ((PERSONAL_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}else{
					const randomNum=Math.floor(Math.random() * ((COMPANY_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}
				counter++;
			}
			var topCSS;
			console.log(images.length);
			if(images.length>=1)
				topCSS="-140px"
			else
				topCSS="10px"
//10px 
			return <ul style={{padding:"0px",position:"relative",top:"5px"}}>
						<li style={{listStyle:"none",marginBottom:"5%"}}>
							<b> Suggested syposiums </b>
						</li>
						{selectedSymposiums.map(data=>
							<a href="javascript:void(0);">
								<li onClick={()=>displayPersonalIndustryFeed(personalInformation,data,selectedSymposiums,previousProps)} style={{fontSize:"15px",color:"white",background:data.backgroundColor,padding:"20px",listStyle:"none",borderRadius:"5px",marginBottom:"5%"}}>
									<b>{data.industry}</b>
								</li>
							</a>
						)}
				   </ul>
}

const displayPersonalIndustryFeed=async(personalInformationRedux,selectedSymposium,selectedIndustries,previousProps)=>{
		//have to format selected industries in and add additional information so that the personalPage can 
		//accept props
		console.log(selectedSymposium);
		var industryColorMap=new Map();

		if(previousProps.displaySymposium!=null){
			if(selectedSymposium!=null){
				for(var i=0;i<selectedIndustries.length;i++){
					const currentSymposium=selectedIndustries[i].industry;
					if(currentSymposium==selectedSymposium.industry){
						selectedIndustries.splice(i,1);
						selectedIndustries.splice(0,0,selectedSymposium);
						break;
					}
				}
			}
			else{
				var personalIndustries=PersonalIndustry.INDUSTRIES;
				var companyIndustries=CompanyIndustry.INDUSTRIES;

				if(personalInformationRedux.loggedIn==true){
					for(var i=0;i<personalIndustries.length;i++){
						const industry=personalIndustries[i];
						industryColorMap.set(industry.industry,industry.backgroundColor);
					}
				}else{
					for(var i=0;i<companyIndustries.length;i++){
						const industry=personalIndustries[i];
						industryColorMap.set(industry.industry,industry.backgroundColor);
					}
				}
			}

			var isPersonalProfile;
			const industryArray=[];
			let selectedSymposiums;
			for(var i=0;i<selectedIndustries.length;i++){
				const currentPostIndustry=selectedIndustries[i];
				const {data}=await getSymposiumId(currentPostIndustry.industry);
				var color;
				if(currentPostIndustry.backgroundColor==null)
					var color=industryColorMap.get(currentPostIndustry.industry);
				else
					color=currentPostIndustry.backgroundColor

				const industryObject={
					_id:data,
					backgroundColor:color,
					symposium:currentPostIndustry.industry,
					popularVideos:[]
				}
				if(i!=0){
					
					industryArray.push(industryObject);
				}else{
					selectedSymposiums=industryObject;
				}
			}
			industryArray.reverse();

		//	const symposiumsAfterFirstOne=industryArray.splice(1,industryArray.length);
			const selectedSymposiumsObject={
				selectedSymposiums,
				symposiums:industryArray
			}

			previousProps.displaySymposium(selectedSymposiumsObject);
		}
}



const ImagePostsModal=(props)=>{
	console.log(props);
	const headerImage=props.posts[0];
	console.log("Header image");
	console.log(headerImage);
	const images=props.posts.slice(1,props.posts.length);
	console.log(images);
	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);


	const [displayImageDisplayPortal,changeImageDisplay]=useState(false);
	const [selectedImage,changeSelectedImage]=useState();
	const [displayRecommendedImages,changeRecommendedImages]=useState();

	const closeModal=()=>{
		changeImageDisplay(false)
	}

	const handleDisplayHeaderImage=()=>{
		changeSelectedImage(headerImage);
		changeRecommendedImages(images);
		changeImageDisplay(true);
	}

	const displayImageModal=(data)=>{
		changeSelectedImage(data);
		changeRecommendedImages(images);
		changeImageDisplay(true);
	}

	const displaySpecialPost=(postResult,personalInformationRedux,previousProps)=>{
		console.log(postResult);
		if(postResult=="suggestedSymposium"){
			return <li id="suggestedSymposiumLI" style={{listStyle:"none",display:"inline-block",top:"-130px",position:"relative",marginBottom:"8%",width:"45%",marginRight:"4%"}}>
						{constructSuggestedSymposium(personalInformationRedux,previousProps,images)}
					</li>
		}else{
			const {data}=postResult;
			var posts=data;
			return <li style={{listStyle:"none",display:"inline-block",top:"-150px",position:"relative",marginBottom:"3%",width:"45%",marginRight:"4%"}}>
						<ul style={{padding:"0px"}}>
							{posts.map(data=>
								<li  onClick={()=>displayImageModal(data)}  style={{listStyle:"none",display:"inline-block",borderRadius:"5px",width:"50%",height:"30%"}}>
									<a href="javascript:void(0)" style={{textDecoration:"none"}}>
										<img src={data.imgUrl} style={{width:"80%",height:"80%",borderRadius:"5px"}}/>
									</a>
								</li>
							)}
						</ul>
				   </li>
		}
	}

	return(
	<Container>
		{props.posts.length>=1?
			<React.Fragment>
				<li id="headerLI" style={{listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{padding:"0px"}}>
						<li onClick={()=>handleDisplayHeaderImage()} style={{listStyle:"none",backgroundColor:"red",width:"90%",borderRadius:"5px",position:"relative",top:"-80px"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<img id="headerImageLI"src={headerImage.imgUrl} style={HeaderImageCSS}/>
								<ul style={{padding:"0px",zIndex:"8",position:"absolute",top:"10px"}}>
									{headerImage.videoDescription!=null?
										<li style={{listStyle:"none"}}>
											<VideoDesriptionContainer>
												   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
														<source src={headerImage.videoDescription} type="video/mp4"/>
													</video>
											</VideoDesriptionContainer>
										</li>:null
									}
									
									{headerImage.audioDescription!=null?
										<li style={{listStyle:"none"}}>
											<audio style={{width:"200px"}} controls muted>
											  	<source src={headerImage.audioDescription} type="audio/ogg"/>
											  	<source src={headerImage.audioDescription} type="audio/mpeg"/>
												Your browser does not support the audio element.
											</audio>
										</li>:null
									}
								</ul>
							</a>
						</li>
						<li style={{listStyle:"none",width:"80%",position:"relative",top:"-70px"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",width:"20%"}}>
									<ProfilePictureLink to={{pathname:`/profile/${headerImage.owner._id}`}}>
											<img src={headerImage.owner.profilePicture==null?NoProfilePicture:
												headerImage.owner.profilePicture}
												style={{height:"10%",width:"60%",borderRadius:"50%"}}
											/>
									</ProfilePictureLink>
								</li>
								<li style={{listStyle:"none",display:"inline-block",fontSize:"30px",marginRight:"2%"}}>
									<b>{headerImage.owner.firstName}</b>
								</li>

								<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,headerImage.industriesUploaded,props)} style={ImageLabelCSS}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										{headerImage.industriesUploaded[0].industry}
									</a>
								</li>
								<DisplayRecruitButton
									post={headerImage}
									previousProps={props}
								/>
								
								<li style={{listStyle:"none",width:"90%",marginLeft:"20%"}}>
									{headerImage.description}
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li id="smallPostLI" style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"5%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
					<ul style={{padding:"0px"}}>
						{images.map(data=>
							<React.Fragment>
								{data.owner==null?
									<React.Fragment>
										{displaySpecialPost(data,personalInformationRedux,props)}
									</React.Fragment>
								:<li id="postLI" style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"2%"}}>
									<ul style={{padding:"0px"}}>
										<li onClick={()=>displayImageModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<ShadowContainer/>
												<img id="image" src={data.imgUrl} style={ImageCSS}/>
												{/*
													<ul id="smallAudioDescription"style={{padding:"0px",zIndex:"8",position:"absolute",top:"25%"}}>
														{data.videoDescription!=null?
															<li style={{listStyle:"none"}}>
																<VideoDesriptionContainer>
																	   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
																			<source src={data.videoDescription} type="video/mp4"/>
																		</video>
																</VideoDesriptionContainer>
															</li>:null
														}
														
														{data.audioDescription!=null?
															<li style={{listStyle:"none"}}>
																<audio style={{width:"200px"}} controls muted>
																  	<source src={data.audioDescription} type="audio/ogg"/>
																  	<source src={data.audioDescription} type="audio/mpeg"/>
																	Your browser does not support the audio element.
																</audio>
															</li>:null
														}
													</ul>
												*/}
											</a>
										</li>
										<li id="smallPersonalInformation" style={{listStyle:"none",marginBottom:"1%"}}>
											<ul style={{padding:"0px"}}>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",width:"20%"}}>
														<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
																<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
																 style={{height:"10%",width:"60%",borderRadius:"50%"}}
																/>
														</ProfilePictureLink>
													</li>
												</a>

												<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
													<b>{data.owner.firstName}</b>
												</li>
												<DisplayRecruitButton
													post={data}
													previousProps={props}
												/>

												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} style={ImageLabelCSS}>
														{data.industriesUploaded[0].industry}
													</li>
												</a>
											</ul>
										</li>
										<li style={{marginLeft:"30%",listStyle:"none",width:"70%",height:"20%",overflow:"hidden"}}>
											  <p>
											  	{data.description}</p>
										</li>
						 			</ul>
								</li>
							}	
							</React.Fragment>
						)}
					</ul>
				</li>

				{displayImageDisplayPortal==false?
					null:
					<ImagePostDisplayPortal
						closeModal={closeModal}
						selectedImage={selectedImage}
						recommendedImages={displayRecommendedImages}
						targetDom={props.targetDom}
					/>
				}
			</React.Fragment>
		:<p>No posts </p>
	}
</Container>
		)
	}

export{
	ImagePostsModal,
	displayPersonalIndustryFeed,
	constructSuggestedSymposium,
	DisplayRecruitButton
};





