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
import {
	ConstructSuggestedSymposium,
	displayPersonalIndustryFeed
} from "./ConstructSuggestedSymposium.js";



const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:row;
	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:600px){
		flex-direction:column !important;
		top:-5%;
		#headerImageLI{
			width:250px !important;
			height:200px !important;
		}
		#headerAudioLI{
			width:100px !important;
		}
		#image{
			width:120px !important;
			height:120px !important;
			margin-bottom:10%;
		}
		#smallPersonalInformation{
			display:none !important;
		}
		#descriptionLI{
			display:none !important;
		}
		#postLI{
			top:-80px;
			margin-bottom:20% !important;
		}
	}
`;

const HeaderContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:50%;
	flex-wrap:wrap;
	@media screen and (max-width:1370px){
		width:90%;
		margin-top:5%;
		#headerPostProfilePictureLIInformation{
			top:70% !important;
		}
		#headerImageSympoosiumLI{
		}
	}

	@media screen and (max-width:1370px) and (max-height:1400px) {
    	#headerPostProfilePictureLIInformation{
			top:60% !important;
		}
    }

	@media screen and (max-width:700px){
		margin-top:-130px !important;
		#headerPostProfilePictureLIInformation{
			top:0% !important;
		}
		#headerImageSympoosiumLI{
			display:none !important;
		}
	}


	@media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		margin-top:45px !important;
    	#headerPostProfilePictureLIInformation{
			top:120% !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    	#headerPostProfilePictureLIInformation{
			top:90% !important;
		}
    }
`;

const PostsContainer=styled.div`
	display:flex;
	flex-direction:row; 
	width:50%;
	height:600px;
	overflow-y:scroll;
	margin-left:5%;
	flex-wrap: wrap;
	@media screen and (max-width:1370px){
		width:90%;
	}
	@media screen and (max-width:1024px) and (max-height:1366px) {
    	height:100%;
    }

	@media screen and (max-width:600px){
		margin-left:-5% !important;
		width:115% !important;
		margin-top:-5px;
		padding-top:70px;
		#smallAudioDescription{
			display:none !important;
		}
	}
`;


const ShadowContainer= styled.div`
	width:220px;
	height:200px;
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


const HeaderDescriptionContainer=styled.div`
	padding:10px;
	display:flex;
	flex-direction:row;
	height:10%;
	width:100%;

`;

const SmallPostContainer=styled.div`
	margin-bottom:8%;
	width:35%;
	margin-right:8%;
`;

const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;

`;

const HeaderInformationContainer=styled.div`
	display:flex;
	flex-direction:column;
`;
const ProfilePictureLink=styled(Link)`
	position:relative;
`;


const VideoDesriptionContainer=styled.div`
	width:60px;
	height:60px;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;

const PostUserAndSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;
	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:600px){
		#postOwner{
			font-size:15px !important;
			margin-right:2% !important;
		}
	}
`;

const PostUserInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-left:10%;

	@media screen and (max-width:1370px){
		margin-left:0% !important;
	}
`;

const SuggestedSymposiumsContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:90%;
	margin-left:2%;
	margin-right:2%;
`;
const HeaderImageCSS={
	width:"100%",
	height:"450px",
	borderRadius:"5px",
	borderRadius:"5px",
	boxShadow:"1px 1px 10px #707070",
	cursor:"pointer"
}

const ImageCSS={
	position:"relative",
	width:"220px",
	height:"200px",
	borderRadius:"5px"
}

const ImageLabelCSS={
	listStyle:"none",
	  display:"inline-block",
	  backgroundColor:"white",
	  borderRadius:"5px",
	  padding:"10px",
	  color:"#3898ec",
	  borderStyle:"solid",
	  borderWidth:"2px",
	  borderColor:"#3898ec",
	  maxWidth:"30%",
	  maxHeight:"50px",
	  overflow:"hidden",
	  cursor:"pointer"
}


const RecruitButtonLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#C8B0F4",
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"50%",
	color:"white",
	backgroundColor:"#a076e6",
	padding:"6px",
	marginRight:"2%",
	textAlign:"center"
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
								style={RecruitButtonLabelCSS}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" 
									width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none"
									stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <path d="M5 12l5 5l10 -10" />
								</svg>
							</li>:
							<li onClick={()=>handleRecruitButton(previousProps,post,changeDisplayRecruitButton)} 
								style={RecruitButtonLabelCSS}>
								+ 
							</li>
						}
					</a>
				)}
			</>
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

	/*
		const displaySpecialPost=(postResult,personalInformationRedux,previousProps)=>{
			return <>	
						{constructSuggestedSymposium(personalInformationRedux,previousProps,images)}
					</>
				console.log(postResult);
				if(postResult=="suggestedSymposium"){
					return <li id="suggestedSymposiumLI" style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"4%",marginTop:"-40%"}}>
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
	*/

	return(
	<>
		{props.posts.length>=1?
			<Container>
				<HeaderContainer>
					<PostUserAndSymposiumInformation>
						<p id="headerImageSympoosiumLI" onClick={()=>displayPersonalIndustryFeed(
											personalInformationRedux,
											null,
											headerImage.industriesUploaded,props
										)} style={ImageLabelCSS}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
							dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
							anim id est laborum.
						{/*
							{headerImage.industriesUploaded[0].industry}
						*/}
						</p>
						<PostUserInformation>
							<ProfilePictureLink to={{pathname:`/profile/${headerImage.owner._id}`}}>
								<img src={headerImage.owner.profilePicture==null?NoProfilePicture:
									headerImage.owner.profilePicture}
									style={{height:"50px",width:"60px",borderRadius:"50%"}}
								/>
								{/*
									{headerImage.videoDescription==null?
										:<video width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
											<source src={headerImage.videoDescription} type="video/mp4"/>
										</video>
									}

								*/}
							</ProfilePictureLink>

							<p id="postOwner" style={{fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
								anim id est laborum.
								{/*
									<b>{headerImage.owner.firstName}</b>
								*/}
							</p>
							{props.isGuestProfileIndicator==false &&(
								<DisplayRecruitButton
									post={headerImage}
									previousProps={props}
								/>
							)}
						</PostUserInformation>
					</PostUserAndSymposiumInformation>
					<img  onClick={()=>displayImageModal(headerImage)} id="headerImageLI"
						 src={headerImage.imgUrl} style={HeaderImageCSS}/>
					<HeaderDescriptionContainer>
						{props.isMobileUI==true?
							<>
								{headerImage.audioDescription==null?
									<p style={{marginLeft:"2%",height:"70px",overflow:"hidden"}}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
										incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
										exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
										dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
										Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
										anim id est laborum.
									</p>
									:
									<audio id="headerAudioLI" style={{width:"150%"}} controls muted>
									  	<source src={headerImage.audioDescription} type="audio/ogg"/>
									  	<source src={headerImage.audioDescription} type="audio/mpeg"/>
										Your browser does not support the audio element.
									</audio>
								}
							</>:
							<>
								<audio id="headerAudioLI" style={{width:"150%"}} controls muted>
								  	<source src={headerImage.audioDescription} type="audio/ogg"/>
								  	<source src={headerImage.audioDescription} type="audio/mpeg"/>
									Your browser does not support the audio element.
								</audio>
								<p style={{marginLeft:"2%",height:"70px",overflow:"hidden"}}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
									dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
									Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
									anim id est laborum.
								</p>
							</>
						}
					</HeaderDescriptionContainer>
				</HeaderContainer>
				<hr/>

				<PostsContainer>
					{images.map(data=>
						<React.Fragment>
							{data.owner==null?
								<ConstructSuggestedSymposium
									personalInformation={personalInformationRedux}
									previousProps={props}
								/>
							:<SmallPostContainer>
									<div onClick={()=>displayImageModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%",cursor:"pointer"}}>
											<img id="image" src={data.imgUrl} style={ImageCSS}/>
											<ul style={{padding:"0px",zIndex:"8",top:"10%"}}>
												{props.isGuestProfileIndicator==false &&(
													<li style={{listStyle:"none"}}>
														<DisplayRecruitButton
															post={data}
															previousProps={props}
														/>
													</li>
												)}
												<li id="smallAudioDescription" style={{listStyle:"none"}}>
													<audio style={{width:"150px",height:"25px"}} controls muted>
													  	<source src={data.audioDescription} type="audio/ogg"/>
													  	<source src={data.audioDescription} type="audio/mpeg"/>
														Your browser does not support the audio element.
													</audio>
												</li>
											</ul>
									</div>
									<DescriptionContainer>
										<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
											<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
												 style={{height:"50px",width:"60px",borderRadius:"50%"}}
											/>
											{/*
												{data.videoDescription==null?
													:<video style={{borderRadius:"50%"}} width="60px" height="50px" borderRadius="50%" autoplay="true" controls muted>
														<source src={data.videoDescription} type="video/mp4"/>
													</video>
												}
											*/}
										</ProfilePictureLink>
										<p onClick={()=>displayPersonalIndustryFeed(
															personalInformationRedux,
															null,
															data.industriesUploaded,props
														)} style={{listStyle:"none",display:"inline-block",height:"40px",overflow:"hidden",marginLeft:"2%"}}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
											incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
											exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
											dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
											Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
											anim id est laborum.
										</p>
									</DescriptionContainer>
							</SmallPostContainer>
						}	
						</React.Fragment>
					)}
					{props.endOfPostsDBIndicator==false && (
						<React.Fragment>
							{props.isLoadingReloadedPosts==true?
								<p>Loading please wait...</p>:
								<p onClick={()=>props.triggerReloadingPostsHandle("Images")} style={ImageLabelCSS}>
									Next Page
								</p>
							}
						</React.Fragment>
					)}
				</PostsContainer>
				{displayImageDisplayPortal==false?
					null:
					<ImagePostDisplayPortal
						closeModal={closeModal}
						selectedImage={selectedImage}
						recommendedImages={displayRecommendedImages}
						targetDom={props.targetDom}
					/>
				}
			</Container>
		:<p>No posts </p>
	}
</>
		)
	}

export{
	ImagePostsModal,
	DisplayRecruitButton
};





