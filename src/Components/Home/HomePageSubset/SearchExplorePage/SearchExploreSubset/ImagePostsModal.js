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

const Container=styled.div`
	position:absolute;
	width:95%;
	height:97%;
	margin-top:1%;
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

const handleRecruitButton=async(previousProps,post)=>{
		debugger;
		const {_id,confettiAnimation}=previousProps;
		const postOwnerId=post.owner._id;
		const personalId=_id;
		const indicator=await isUserFollwingProfile(personalId,postOwnerId);

		if(indicator==true){
				alert("You already recruited this profile :) If you want to unrecruit them then head over to their profile"); 
		}else{
			confettiAnimation();
			addRecruit(_id,post.owner._id);
		}	
	} 

const displayRecruitButton=(post,previousProps)=>{
		const postOwnerId=post.owner._id;
		const personalId=previousProps._id;
		if(personalId==postOwnerId){
			return null
		}else{
			return <a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>handleRecruitButton(previousProps,post)} style={ImageLabelCSS}>
							+ Recruit
						</li>
					</a>
		}
}

const constructSuggestedSymposium=(personalInformation,previousProps,images)=>{
		debugger;

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
			return <ul style={{padding:"0px",position:"relative",top:"-140px"}}>
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
		debugger;
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
						industryArray.push(industryObject);
			}
			
			const symposiumsAfterFirstOne=industryArray.splice(1,industryArray.length);
			const selectedSymposiumsObject={
				selectedSymposiums:industryArray[industryArray.length-1],
				symposiums:symposiumsAfterFirstOne
			}

			previousProps.displaySymposium(selectedSymposiumsObject);
		}
}



const ImagePostsModal=(props)=>{
	debugger;
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
			return <li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"4%"}}>
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
	<React.Fragment>
		{props.posts.length>=1?
			<React.Fragment>
				<li style={{listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{padding:"0px"}}>
						<li onClick={()=>handleDisplayHeaderImage()} style={{listStyle:"none",backgroundColor:"red",width:"90%",borderRadius:"5px",position:"relative",top:"-80px"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<img src={headerImage.imgUrl} style={HeaderImageCSS}/>
								<ul style={{padding:"0px",zIndex:"8",position:"absolute",top:"10px"}}>
									{headerImage.videoDescription!=null?
										<li style={{listStyle:"none"}}>
											<VideoDesriptionContainer>
												   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true">
														<source src={headerImage.videoDescription} type="video/mp4"/>
													</video>
											</VideoDesriptionContainer>
										</li>:null
									}
									
									{headerImage.audioDescription!=null?
										<li style={{listStyle:"none"}}>
											<audio style={{width:"200px"}} controls>
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
										{headerImage.owner.profilePicture!=null?
											<img src={headerImage.owner.profilePicture} style={{height:"10%",width:"35%",borderRadius:"50%"}}/>:
											<img src={NoProfilePicture} style={{height:"10%",width:"60%",borderRadius:"50%"}}/>
										}
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
								{displayRecruitButton(headerImage,props)}
								
								<li style={{listStyle:"none",width:"90%",marginLeft:"20%"}}>
									{headerImage.description}
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
					<ul style={{padding:"0px"}}>
						{images.map(data=>
							<React.Fragment>
								{data.owner==null?
									<React.Fragment>
										{displaySpecialPost(data,personalInformationRedux,props)}
									</React.Fragment>
								:<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"2%"}}>
									<ul style={{padding:"0px"}}>
										<li onClick={()=>displayImageModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<ShadowContainer/>
												<img src={data.imgUrl} style={ImageCSS}/>
												<ul style={{padding:"0px",zIndex:"8",position:"absolute",top:"25%"}}>
													{data.videoDescription!=null?
														<li style={{listStyle:"none"}}>
															<VideoDesriptionContainer>
																   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true">
																		<source src={data.videoDescription} type="video/mp4"/>
																	</video>
															</VideoDesriptionContainer>
														</li>:null
													}
													
													{data.audioDescription!=null?
														<li style={{listStyle:"none"}}>
															<audio style={{width:"200px"}} controls>
															  	<source src={data.audioDescription} type="audio/ogg"/>
															  	<source src={data.audioDescription} type="audio/mpeg"/>
																Your browser does not support the audio element.
															</audio>
														</li>:null
													}
												</ul>
											</a>
										</li>
										<li style={{listStyle:"none",marginBottom:"1%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",width:"20%"}}>
													<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
														{data.owner.profilePicture!=null?
															<img src={data.owner.profilePicture} style={{height:"10%",width:"35%",borderRadius:"50%"}}/>:
															<img src={NoProfilePicture} style={{height:"10%",width:"60%",borderRadius:"50%"}}/>
														}
													</ProfilePictureLink>
												</li>

												<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
													<b>{data.owner.firstName}</b>
												</li>
												<li onClick={()=>handleRecruitButton(props,data)} style={ImageLabelCSS}>
													+ Recruit
												</li>

												<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} style={ImageLabelCSS}>
													{data.industriesUploaded[0].industry}
												</li>
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
					/>
				}
			</React.Fragment>
		:<p>No posts </p>
	}
</React.Fragment>
		)
	}

export{
	ImagePostsModal,
	displayPersonalIndustryFeed,
	constructSuggestedSymposium,
	displayRecruitButton
};





