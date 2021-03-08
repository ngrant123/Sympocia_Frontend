import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ImagePostDisplayPortal from "../../../HomePageSet/ImageHomeDisplayPortal.js";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector,useDispatch} from "react-redux";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import {getSymposiumId} from "../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {addRecruit} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {isUserFollwingProfile} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {SearchConsumer} from "../../../../SearchPage/SearchContext.js";
import {Link} from "react-router-dom";

import {removeRecruitProfileIsFollowing} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
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

	@media screen and (max-width:650px){
		flex-direction:column !important;
		top:-5%;
		#headerImageLI{
			width:220px !important;
			height:180px !important;
		}
		#headerAudioLI{
			width:200px !important;
		}
		#image{
			width:100px !important;
			height:100px !important;
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

	@media screen and (max-width:650px){
		margin-top:-130px !important;
		#headerPostProfilePictureLIInformation{
			top:0% !important;
		}
		#headerImageSympoosiumLI{
			display:none !important;
		}

		#videoDescriptionContainer{
			top:25% !important;
			left:0% !important;
			width:100px !important;
			height:40% !important;
		}
	}

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
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
	margin-left:5%;
	overflow:scroll;
	flex-wrap: wrap;
	@media screen and (max-width:1370px){
		width:90%;
		overflow:visible !important;
	}
	@media screen and (max-width:1024px) and (max-height:1366px) {
    	height:100%;
    }

	@media screen and (max-width:600px){
		margin-left:0% !important;
		width:100% !important;
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
	flex-direction:column;
	height:20%;
	overflow:hidden;

	@media screen and (max-width:650px){
		height:90px;
	}
`;

const SmallPostContainer=styled.div`
	margin-bottom:8%;
	width:35%;
	margin-right:8%;

	@media screen and (max-width:1370px){
		margin-right:15%;
	}

	@media screen and (max-width:650px){
		margin-right:10%;
		#smallVideoDescriptionContainer{
			width:50px !important;
			height:40% !important;
		}
		#smallImageContainer{
			width:260px !important;
			height:100px !important;
		}
	}
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

	@media screen and (max-width:650px){
		#smallProfilePicture{
			height:30px !important;
			width:40px !important;
		}
	}
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
	padding:10px;
	margin-right:10%;

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
	position:"relative",
	width:"85%",
	height:"400px",
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
	  width:"90%",
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
	width:"20%",
	backgroundColor:"#a076e6",
	padding:"10px",
	marginRight:"2%",
	textAlign:"center"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	display:"none"
}


const DisplayRecruitButton=({post,previousProps,personalInformationRedux})=>{
	const {isUserFollowing}=post;
	const postOwnerId=post.owner._id;
	const personalId=previousProps._id;
	const dispatch=useDispatch();
	const [isUserFollowingProfile,changeDisplayRecruitButton]=useState(isUserFollowing);

	const unRecruitButton=async({previousProps,post,changeDisplayRecruitButton,isAccessTokenUpdated,updatedAccessToken})=>{
		const {_id}=previousProps;

		const {confirmation,data}=await removeRecruitProfileIsFollowing({
			personalProfileId:_id,
			targetProfile:post.owner._id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
			personalInformationRedux.accessToken
		})
		if(confirmation=="Success"){
			changeDisplayRecruitButton(false);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformationRedux.refreshToken,
						_id,
						unRecruitButton,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error adding this recruit. Please try again');
			}
			alert('Unfortunately something has gone wrong when unrecruiting this person. Please try again');
		}
	}

	const handleRecruitButton=async({previousProps,post,changeDisplayRecruitButton,isAccessTokenUpdated,updatedAccessToken})=>{
		const {_id,confettiAnimation}=previousProps;
		const {confirmation,data}=await addRecruit(
												_id,
												post.owner._id,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformationRedux.accessToken
											);
		if(confirmation=="Success"){
			const {statusCode}=data;
			if(statusCode==300){
				alert('You have reached the limit of 100 recruits. Please delete some to recruit this person');
			}else{
				confettiAnimation();
				changeDisplayRecruitButton(true);
			}
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformationRedux.refreshToken,
						_id,
						handleRecruitButton,
						dispatch,
						{
							previousProps,
							post,
							changeDisplayRecruitButton
						},
						false
					);
			}else{
				alert('Unfortunately there has been an error adding this recruit. Please try again');
			}
		}
	} 

	return <>
				{(personalId!=postOwnerId) &&(
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						{isUserFollowingProfile==true?
							<li onClick={()=>unRecruitButton({
												previousProps,
												post,
												changeDisplayRecruitButton,
												isAccessTokenUpdated:false,
												dispatch,
												personalInformationRedux
											})} 
								style={RecruitButtonLabelCSS}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" 
									width="25" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none"
									stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <path d="M5 12l5 5l10 -10" />
								</svg>
							</li>:
							<li onClick={()=>handleRecruitButton({
												previousProps,
												post,
												changeDisplayRecruitButton,
												isAccessTokenUpdated:false,
												dispatch,
												personalInformationRedux
											})} style={RecruitButtonLabelCSS}>
								+ 
							</li>
						}
					</a>
				)}
			</>
}



const ImagePostsModal=(props)=>{
	const headerImage=props.posts[0];
	const images=props.posts.slice(1,props.posts.length);
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

	return(
	<>
		{props.posts.length>=1?
			<Container>
				<HeaderContainer>
					<PostUserAndSymposiumInformation>
						<PostUserInformation>
							<ProfilePictureLink style={{marginRight:"20%"}} to={{pathname:`/profile/${headerImage.owner._id}`}}>
								<img src={headerImage.owner.profilePicture==null?NoProfilePicture:
									headerImage.owner.profilePicture}
									style={{height:"50px",width:"60px",borderRadius:"50%"}}
								/>
							</ProfilePictureLink>

							<Link to={{pathname:`/profile/${headerImage.owner._id}`}}
								id="postOwner" style={{fontSize:"20px",maxWidth:"60%",maxHeight:"50px"}}>
								<b>{headerImage.owner.firstName}</b>
							</Link>
						</PostUserInformation>
						{headerImage.audioDescription!=null &&(
							<audio id="headerAudioLI" style={{width:"350px",marginBottom:"2%"}} id="headerAudioLI" controls muted>
							  	<source src={headerImage.audioDescription} type="audio/ogg"/>
							  	<source src={headerImage.audioDescription} type="audio/mp4"/>
								Your browser does not support the audio element.
							</audio>
						)}
					</PostUserAndSymposiumInformation>
					<div id="headerImageLI" style={HeaderImageCSS}>
						<img  onClick={()=>displayImageModal(headerImage)} id="headerImageLI"
							src={headerImage.imgUrl} style={{borderRadius:"5px",position:"relative",width:"100%",height:"100%"}}
						/>
						{headerImage.videoDescription!=null &&(
							<video id="videoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
								style={{position:"absolute",top:"50%",left:"0%"}} width="200px" height="60%">
								<source src={headerImage.videoDescription} type="video/mp4"/>
							</video>
						)}
					</div>
					<HeaderDescriptionContainer> 
						<p style={{fontSize:"20px"}}>
							<b>{headerImage.caption}</b>
						</p>
						<p>
							{headerImage.description}
						</p>
					</HeaderDescriptionContainer>
				</HeaderContainer>
				<hr id="horizontalSeperator" style={HorizontalLineCSS}/>

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
											<ul style={{padding:"0px",zIndex:"8",top:"10%"}}>
												{data.audioDescription!=null &&(
													<li id="smallAudioDescription" style={{listStyle:"none"}}>
														<audio style={{width:"150px",height:"25px"}} controls muted>
														  	<source src={data.audioDescription} type="audio/ogg"/>
														  	<source src={data.audioDescription} type="audio/mp4"/>
															Your browser does not support the audio element.
														</audio>
													</li>
												)}
											</ul>
											<div id="smallImageContainer" style={ImageCSS}>
												<img id="image" src={data.imgUrl} style={{borderRadius:"5px",width:"100%",height:"100%"}}/>
												{data.videoDescription!=null &&(
													<video id="smallVideoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
														style={{position:"absolute",top:"62%",left:"0%"}} width="100px" height="40%">
														<source src={data.videoDescription} type="video/mp4"/>
													</video>
												)}
											</div>
									</div>
									<p style={{maxHeight:"15%",overflow:"hidden"}}>
										<b>{data.caption}</b>
									</p>
									<DescriptionContainer>
										<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
											<img id="smallProfilePicture" src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
												 style={{height:"50px",width:"60px",borderRadius:"50%"}}
											/>
										</ProfilePictureLink>
										<p onClick={()=>displayPersonalIndustryFeed(
															personalInformationRedux,
															null,
															data.industriesUploaded,props
														)} style={{listStyle:"none",display:"inline-block",height:"40px",overflow:"hidden",marginLeft:"2%"}}>
											{data.owner.firstName}
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
									Next
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





