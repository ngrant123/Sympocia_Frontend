import React,{useState} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ImageInformation from "./ImageInformation.js";
import Comments from "../../../CommentsComponent/index.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EditImageCreation from "../ImageCreation/EditImageCreation.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {StampIconEffect} from "./ImageContainerCSS.js";
import {useSelector,useDispatch} from "react-redux";
import {
	addStampPost,
	unStampPost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import VideoDescriptionMobileDisplayPortal from "../../VideoDescriptionMobileDisplayPortal.js";

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	@media screen and (max-width:1370px){
		width:80%;
		left:10% !important;
		#postInformationLI{
			display:none !important;
		}
		#postOptionsLI{
			display:none !important;
		}
    }
    @media screen and (max-width:700px){
		width:100%;
		left:2% !important;
		 #image{
			height:60% !important;
		}
		#postAudio{
			width:100px !important;
		}
		#keyBoardArrowIcon{
			margin-top:-20px !important;
			margin-left:10% !important;
		}
		#keyBoardDownLI{
			font-size:25 !important;
		}
		#keyBoardUpLI{
			font-size:25 !important;
		}
    }
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	#image{
			height:90% !important;
		}
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	 	#image{
	 		margin-left:5% !important;
			height:130% !important;
			width:80% !important;
		}
    }

`;

const CommentContainer=styled.div`
	position:relative;
	border-radius:5px;
	width:100% !important;
	margin-left:10%;

	@media screen and (max-width:420px){
		margin-left:7% !important;
		width:100% !important;
		left:0% !important;
    }
`;
const TogglePostInformationButton=styled.div`
	position:absolute;
	width:20%;
	height:5%;
	border-radius:50%;
	left:85%;
	background-color:white;
	top:7%;
	text-align:center;
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	top:15%; !important;
		height:10%;
		width:7%;
    }
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
			top:10%; !important;
			height:10%;
			width:7%;
    }
    @media screen and (max-width:1370px){
		width:7%;
    }

	@media screen and (max-width:420px){
		height:10%;
		width:15%;
    }

`;

const PostInformationContainer=styled.div`
	position:relative;
	width:80%;
	border-radius:5px; 

	@media screen and (max-width:1370px) and (max-height:1030px){
	 	height:10% !important;
    }
	@media screen and (max-width:840px) and (max-height:420px){
		height:90% !important;
    }
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	margin-left:5%;
    }
`;
const VideoDesriptionContainer=styled.div`
	width:100px;
	height:100px;
	border-radius:50%;
	background-color:white;
	z-index:8;

	@media screen and (max-width:700px){
		width:70px !important;
		height:70px !important;
	}
`;
const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%"
}

const MobileUI=({closePostModal,imgData,targetDom,deletePost,pageType,isOwnPostViewing,promote,isPhoneUI,editPostAction,isGuestProfile})=>{

	const [displayPostInformationContainer,changePostInfoContainerDisplay]=useState(false);
	const [displayComments,changeDisplayComments]=useState(false);
	const [displayInformation,changeDisplayInformation]=useState(false);
	const [displayPollOption,changeDisplayPollOption]=useState(false);
	const [displayEditImageModal,changeDisplayEditImageModal]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayVideoDescriptionDisplay,changeVideoDescriptionDisplay]=useState(false);

	const userId=useSelector(state=>state.personalInformation.id);
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();


	const displayCommentsTrigger=()=>{
		if(displayComments==true){
			changePostInfoContainerDisplay(false);
			changeDisplayComments(false);
			changeDisplayInformation(false);
		}else{
			changePostInfoContainerDisplay(true);
			changeDisplayComments(true);
			changeDisplayInformation(false);

		}
	}

	const displayPostInformationTrigger=()=>{
		if(displayInformation==true){
			changePostInfoContainerDisplay(false);
			changeDisplayComments(false);
			changeDisplayInformation(false);
		}else{
			changePostInfoContainerDisplay(true);
			changeDisplayComments(false);
			changeDisplayInformation(!displayInformation);
		}
	}

	const displayPollOptionTrigger=()=>{
		changePostInfoContainerDisplay(true);
		changeDisplayComments(false);
		changeDisplayInformation(false);
		changeDisplayPollOption(true);
	}

	const hidePostDisplayInformationContainer=()=>{
		changePostInfoContainerDisplay(false);
		changeDisplayComments(false);
		changeDisplayInformation(false);
		changeDisplayPollOption(false);
	}
	const editPost=(data)=>{
		editPostAction(data);
	}

	const commentContainer=()=>{
		return(
			<CommentContainer>
		 		<Comments
					postId={imgData._id}
					postType={"Images"}
					hideComments={hidePostDisplayInformationContainer}
					targetDom={targetDom}
				/>
			</CommentContainer>
		)
	}

	const imageInformation=()=>{
		return (
			<PostInformationContainer>
				<ImageInformation
					imageInformation={imgData}
					targetDom={targetDom}
					isMobileTrue={true}
					isGuestProfile={isGuestProfile}
				/>
			</PostInformationContainer>
		)
	}
	const postInformation=()=>{
		return(
			<PostInformationContainer>
				{isGuestProfile==false && (
					<React.Fragment>
						{displayComments==true &&(
							<>{commentContainer()}</>
						)}
					</React.Fragment>
				)}
				{displayInformation==true &&(
					<>{imageInformation()}</>
				)}
			</PostInformationContainer>
		)
	}

	const createOrRemoveStampEffect=async({isAccessTokenUpdated,updatedAccessToken})=>{
		let confirmationResponse;
		let dataResponse;

		if(displayStampEffect==false){
			const {confirmation,data}=await addStampPost(
												imgData._id,
												"personal",
												"Images",
												userId,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken
											);
			confirmationResponse=confirmation;
			dataResponse=data;

		}else{
			const {confirmation,data}=await unStampPost(
												imgData._id,
												"personal",
												"Images",
												userId,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken
											);
			confirmationResponse=confirmation;
			dataResponse=data;
			debugger;
		}

		if(confirmationResponse=="Success"){
			if(displayStampEffect==false)
				changeDisplayStampEffect(true);
			else
				changeDisplayStampEffect(false);
		}else{
			const {statusCode}=dataResponse;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						createOrRemoveStampEffect,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error with stamping/unstamping this post. Please try again');
			}
		}
	}

	 const commentsAndPostDescriptionDecider=()=>{
	 	if(isPhoneUI==false){
	 		return (
	 			<>
	 				{displayPostInformationContainer==true?
		 				<>{postInformation()}</>:
						<>
							{displayStampEffect==true &&(
								<StampIconEffect
									id="stampEffect"
								>
									<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
								</StampIconEffect>
							)}

							<img  id="image" src={imgData.imgUrl} 
								style={{width:"80%",height:"90%",borderRadius:"5px",marginLeft:"10%"}}
							/>
						</>
	 				}
	 			</>
			)
	 	}else if(isPhoneUI==true){
	 		return(
	 			<>
	 				{displayInformation==true?	
	 					<>{imageInformation()}</>
	 					:<>
							{displayStampEffect==true &&(
								<StampIconEffect
									id="stampEffect"
								>
									<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
								</StampIconEffect>
							)}

							<img  src={imgData.imgUrl} 
								style={{width:"100%",height:"90%",borderRadius:"5px",marginLeft:"0%"}}
							/>
						</>
	 				}
	 			</>
	 		)
	 	}
	 }

	 const displayVideoDescriptionTrigger=()=>{
	 	changeVideoDescriptionDisplay(true);
	}	

	const closeVideoDescriptionDisplayModal=()=>{
		changeVideoDescriptionDisplay(false);
	}
	return (
		<React.Fragment>
			{displayVideoDescriptionDisplay==true &&(
				<VideoDescriptionMobileDisplayPortal
					targetDom={targetDom}
					closeModal={closeVideoDescriptionDisplayModal}
					videoUrl={imgData.videoDescription}
				/>
			)}
			{displayEditImageModal==false?
				<Container>
					<ul style={{padding:"10px"}}>
						{isPhoneUI==true && (displayPostInformationContainer==true && displayComments==true)?
							<>{commentContainer()}</>:
							<React.Fragment>
								<div onClick={()=>closePostModal()} style={{marginBottom:"5%"}}>
									<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
									 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
									 stroke-linecap="round" stroke-linejoin="round">
									  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									  <circle cx="12" cy="12" r="9" />
									  <path d="M10 10l4 4m0 -4l-4 4" />
									</svg>
								</div>
								<li style={{listStyle:"none",marginBottom:"5%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
											{imgData.videoDescription!=null &&(
												<VideoDesriptionContainer>
													<video id="videoDescription" style={{borderRadius:"50%"}} width="100%" 
													height="100%" borderRadius="50%" autoPlay muted>
														<source src={imgData.videoDescription} type="video/mp4"/>
													</video>
												</VideoDesriptionContainer>
											)}
										</li>
										<li style={{listStyle:"none",display:"inline-block"}}>
											{imgData.audioDescription!=null &&(
												<audio id="postAudio" style={{width:"150px"}} controls>
													<source src={imgData.audioDescription} type="audio/ogg"/>
													<source src={imgData.audioDescription} type="audio/mp4"/>
													Your browser does not support the audio element.
												</audio>
											)}
										</li>

										<li id="keyBoardArrowIcon" style={{listStyle:"none",display:"inline-block",marginLeft:"2%"}} 
											onClick={()=>displayPostInformationTrigger()}>
											{displayInformation==false?
												<KeyboardArrowDownIcon
													id="keyBoardDownLI"
													style={{borderRadius:"50%",fontSize:"40",boxShadow:"1px 1px 5px #dbdddf"}}
												/>:
												<KeyboardArrowUpIcon
													id="keyBoardUpLI"
													style={{borderRadius:"50%",fontSize:"40",boxShadow:"1px 1px 5px #dbdddf"}}
												/>
											}
										</li>
									</ul>
								</li>

								<div id="image" style={{marginLeft:"-10%",height:"60%",overflow:"scroll",width:"110%"}}>
									{commentsAndPostDescriptionDecider()}
								</div>
								<hr/>
							<li style={{listStyle:"none"}}>
							<ul style={{padding:"20px"}}>
								{isGuestProfile==false && (
									<>
										<a href="javascript:void(0);">
											<li onClick={()=>createOrRemoveStampEffect({isAccessTokenUpdated:false})} style={ShadowButtonCSS}>
												<LoyaltyIcon
													style={{fontSize:30}}
												/>
											</li>
										</a>
										<a href="javascript:void(0);">
											<li onClick={()=>displayCommentsTrigger()} style={ShadowButtonCSS}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C" fill="none" stroke-linecap="round" stroke-linejoin="round">
												  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
												  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
												  <line x1="8" y1="9" x2="16" y2="9" />
												  <line x1="8" y1="13" x2="14" y2="13" />
												</svg>
											</li>
										</a>
									</>
								)}
								
								{(pageType=="personalProfile" && isOwnPostViewing==true) &&(
									<>
										<a href="javascript:void(0);">
											<li onClick={()=>changeDisplayEditImageModal(true)} style={ShadowButtonCSS}>
												<BorderColorIcon
													style={{fontSize:30}}
												/>
											</li>
										</a>

										<a href="javascript:void(0);">
											<li onClick={()=>deletePost()} style={ShadowButtonCSS}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C" fill="none" stroke-linecap="round" stroke-linejoin="round">
												  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
												  <line x1="4" y1="7" x2="20" y2="7" />
												  <line x1="10" y1="11" x2="10" y2="17" />
												  <line x1="14" y1="11" x2="14" y2="17" />
												  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
												  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
												</svg>
											</li>
										</a>

										<a href="javascript:void(0);">
											<li onClick={()=>promote()} style={ShadowButtonCSS}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" 
													  width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C"
													  fill="none" stroke-linecap="round" stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z"/>
													  <circle cx="12" cy="9" r="6" />
													  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
													  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
												</svg>
											</li>
										</a>
									</>
								)}

								</ul>
							</li>
							</React.Fragment>

						}
					</ul>
				</Container>
				:<EditImageCreation
						imageSrcUrl={imgData.imgUrl}
						previousData={imgData}
						editPost={editPost}
					/>
			}
		</React.Fragment>
	)
}

export default MobileUI;