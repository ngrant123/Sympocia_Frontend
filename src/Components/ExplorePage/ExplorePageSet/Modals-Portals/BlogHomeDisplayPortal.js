import React,{useState,useEffect,useRef} from "react";
import styled,{keyframes} from "styled-components";
import {createPortal} from "react-dom";
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw,EditorState } from 'draft-js';
import { Icon, InlineIcon } from '@iconify/react';
import StampIcon from "../../../../designs/img/StampIcon.png";

import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {addStampPost,unStampPost} from "../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PollOptionPortal from "../../../GeneralComponents/PostComponent/PollOptionPortal.js";
import Comments from "../../../GeneralComponents/CommentsComponent/index.js";
import VideoDescriptionMobileDisplayPortal from "../../../GeneralComponents/PostComponent/VideoDescriptionMobileDisplayPortal.js";
import PollIcon from '@material-ui/icons/Poll';
import {HomeConsumer} from "../../HomeContext.js";
import {Link} from "react-router-dom";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import FirstTimePostOnboarding from "../../../GeneralComponents/PostComponent/FirstTimePostOnboardingIndicator.js"
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";
import {getVideoUrl} from "../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {PostDisplayConsumer} from "../../../Symposium/ExtendedSymposium/Posts/PostDisplay/PostDisplayContext.js";
import {triggerS3UrlViewProcessing} from "../../../GeneralComponents/PostComponent/S3PostViewProcessing.js"; 
import BadgeDisplay from "../../../GeneralComponents/BadgeComponent/index.js"; 

const Container=styled.div`
	position:fixed;
	background-color:red;
	z-index:40;
	width:70%;
	border-radius:5px;
	top:5%;
	left:20%;
	background-color:white;
	height:90%;
	padding:20px;
	overflow:hidden;

	@media screen and (max-width:1370px){
		left:5%;
		width:90%;
		#blogContainerDiv{
			margin-top:15% !important;
		}
	}
	@media screen and (max-width:700px){
		width:100%;
		height:100%;
		margin-right:-10%;
		top:0%;
		margin-left:-5%;

		#badgeParentContainer{
			margin-top:-10% !important;
		}

		#extendedBlogAudioDescription{
			width:150px !important;
		}
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#blogContainerDiv{
			height:80% !important;
			margin-top:0% !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px)  and (orientation: landscape){
		width:100%;
		height:100%;
		left:0%;
		top:0%;
		margin-left:0%;
    }

`;

const ShadowContainerBlog=styled.div`
	position:fixed;
	width:110%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	left:-5;
	top:0px;
`;

const PosterInformationModal=styled.div`
	position:fixed;
	width:30%;
	border-radius:5px;
	background-color:white;
	box-shadow: 1px 1px 10px #707070;
	top:20%;
	left:55%;
	padding:10px;
	height:60%;
	z-index:9;
	overflow:scroll;

	@media screen and (max-width:1370px){
		left:20% !important;
		width:70% !important;
		top:10% !important;
	}

	@media screen and (max-width:700px){
		width:90% !important;
		left:5% !important;
		top:12% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		top:10% !important;
    }
`;

const ProfilePicture=styled(Link)`
	position:relative;
	width:80px;
	height:80px;

	@media screen and (max-width:650px){
		#smallImagePicture{
			width:45px !important;
			height:40px !important;
		}
	}
`;

const keyFrame=keyframes`
	  0%{
	    opacity: 0;
	  }
	  10%{
	    opacity:.50;
	    transform-origin: 50% 50%;
	    transform: scale(5);
	    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
	  }
	  100%{
	    opacity:1;
	    transform: scale(1);
	  }

`;
const StampIconEffect=styled.div`
	  height:100px;
	  width:100px;
	  border-radius:5px;
	  position:relative;
	  animation:${keyFrame} 1s ease-in-out 0s forwards;
`;

const SmallPostInformationModal=styled.div`
	position:fixed;
	width:20%;
	border-radius:5px;
	background-color:white;
	box-shadow: 1px 1px 10px #707070;
	top:12%;
	left:65%;
	padding:10px;
	cursor:pointer;
	z-index:9;

	@media screen and (max-width:1370px){
		top:10% !important;
	}
	@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		top:25% !important;
    }
`;

const ApproveDisapproveContainer=styled.div`
	position:fixed;
	background-color:white;
	width:30%;
	height:10%;
	border-radius:5px;
	left:15%;
	top:20%;
	height:25%;
	overflow:scroll;
	z-index:16;
	box-shadow: 1px 1px 10px #707070;

	@media screen and (max-width:1370px){
		width:60% !important;
	}
`;


const ShadowContainer = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	z-index:15;

`;

const VideoDescriptionContainer=styled.div`
	position:relative;
	width:80px;
	height:80px;
	border-radius:50%;
	cursor:pointer;
	background-color:#151515;



	@media screen and (max-width:650px){
		width:70px;
		height:70px;
	}	

`;


const StampButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	backgroundColor:"white",
	boxShadow:"2px 10px 10px #b9d6ff",
	borderRadius:"5px",
	listStyle:"none",
	display:"inline-block",
	width:"30%",
	padding:"10px"
}


const authenticPostButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

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
	marginBottom:"2%",
	cursor:"pointer"
}

const BackButtonCSS={
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginLeft:"10%"
}

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"4%",
  cursor:"pointer"
}


const PollingOptionsCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"40px",
	borderRadius:"5px",
	cursor:"pointer",
	marginBottom:"10%"
}





const BlogHomeDisplayPortal=(props)=>{
	const [postData,changePostData]=useState(props);
	const blog=postData.selectedBlog.blog;
	var DBEditorState = convertFromRaw(JSON.parse(blog));
	var blogContentState=EditorState.createWithContent(DBEditorState);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayLargeModal,changeDisplayModal]=useState(true);
	const [displayDesktopUI,changeDisplayDesktopUI]=useState(false);
	const [displayPollingModal,changeDisplayPollingModal]=useState(false);
	const [displayApproveModal,changeDisplayApproveModal]=useState(false);
	const [displayApproveDisapproveIndicator,changeDisplayApproveDisapproveIndicator]=useState(false);
	const [displayCommentsContainer,changeDisplayCommentsContainer]=useState(false);
	const [isLoading,changeIsLoadingStatus]=useState(true);

	const personalInformation=useSelector(state=>state.personalInformation);
	const isGuestProfile=(personalInformation.id=="0" || personalInformation.isGuestProfile==true)==true?
					true:false;
	const [displayVideoDescriptionDisplay,changeVideoDescriptionDisplay]=useState(false);
	const [displayPollingOptions,changeDisplayPollingOptions]=useState(false);

	const videoDescriptionViewStartTimeStamp=useRef(); 
	const audioDescritptionViewStartTimeStamp=useRef();
	const isVideoDescriptionS3PostProcessingCompleted=useRef(false);
	const isAudioDescriptionS3PostProcessingCompleted=useRef(false);

	const dispatch=useDispatch();


	const triggerVideoDescriptionViewProcessing=()=>{
		if(videoDescriptionViewStartTimeStamp.current!=null && isVideoDescriptionS3PostProcessingCompleted.current==false){
			isVideoDescriptionS3PostProcessingCompleted.current=true;
			triggerS3UrlViewProcessing(
				"extendedBlogVideoDescription",
				"PPWatchTimeVideoDescription",
				videoDescriptionViewStartTimeStamp.current,
				"Blogs",
				postData.selectedBlog._id,
				personalInformation.id
			);
		}
	}


	const triggerAudioDescriptionViewProcessing=()=>{
		if(audioDescritptionViewStartTimeStamp.current!=null && isAudioDescriptionS3PostProcessingCompleted.current==false){
			isAudioDescriptionS3PostProcessingCompleted.current=true;
			triggerS3UrlViewProcessing(
				"extendedBlogAudioDescription",
				"PPWatchTimeAudioDescription",
				audioDescritptionViewStartTimeStamp.current,
				"Blogs",
				postData.selectedBlog._id,
				personalInformation.id
			);
		}
	}

	const triggerInitVideoS3Processing=()=>{
		const currentTimeStamp=new Date().getTime();
		videoDescriptionViewStartTimeStamp.current=currentTimeStamp;
	}

	const triggerInitAudioS3Processing=()=>{
		const currentTimeStamp=new Date().getTime();
		audioDescritptionViewStartTimeStamp.current=currentTimeStamp;	
	}

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeDisplayDesktopUI(false);

		}else{
			changeDisplayDesktopUI(true);
		}
	}

	useEffect(()=>{
		const fetchData=async()=>{
			const {selectedBlog}=postData;
			const {videoDescriptionKey}=selectedBlog;	
			if(videoDescriptionKey!=null){
				const {confirmation,data}=await getVideoUrl(videoDescriptionKey);

				let currentData=postData;
				if(confirmation=="Success"){
					const videoDescriptionUrl=data.message;

					currentData={
						...currentData,
						selectedBlog:{
							...selectedBlog,
							videoDescription:videoDescriptionUrl
						}
					}
				}else{
					alert('Unfortunately there was an error getting this video. Please try again later');
				}
				changePostData(currentData);
			}
			changeIsLoadingStatus(false);
		}

		fetchData();
		triggerUIChange();
		
		return ()=>{
			triggerAudioDescriptionViewProcessing();
		}
	},[]);

	window.addEventListener('resize',triggerUIChange)

	const createOrRemoveStampEffect=async({isAccessTokenUpdated,updatedAccessToken})=>{
			triggerAudioDescriptionViewProcessing();
			var isPersonalProfile=postData.profileType=="personalProfile"?true:false;
			let confirmationResponse;
			let dataResponse;
			if(isGuestProfile==true){
				alert('Unfortunately there has been an error with stamping/unstamping this post. Please try again');
			}else{
				if(displayStampEffect==false){
					const {confirmation,data}=await addStampPost(
														postData.selectedBlog._id,
														"personal",
														"Blogs",
														postData.personalId,
														isAccessTokenUpdated==true?updatedAccessToken:
														personalInformation.accessToken
													);
					confirmationResponse=confirmation;
					dataResponse=data;
				}else{
					const {confirmation,data}=await unStampPost(
														postData.selectedBlog._id,
														"personal",
														"Blogs",
														postData.personalId,
														isAccessTokenUpdated==true?updatedAccessToken:
														personalInformation.accessToken
													);
					confirmationResponse=confirmation;
					dataResponse=data;
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
	}



	const displayOrHideModal=()=>{
		triggerAudioDescriptionViewProcessing();
		changeDisplayModal(!displayLargeModal);
	}
	const closeModalPollModal=()=>{
		changeDisplayPollingModal(false);
	}

	const triggerApprovePollModal=()=>{
		changeDisplayApproveModal(true)
		changeDisplayPollingModal(true);
	}

	const triggerDisapprovePollModal=()=>{
		changeDisplayApproveModal(false);
		changeDisplayPollingModal(true);	
	}

	const pollModal=()=>{
		return <React.Fragment>
					{displayPollingModal && (
						<PollOptionPortal
							closeModal={closeModalPollModal}
							displayApproveModal={displayApproveModal}
							postId={postData.selectedBlog._id}
							postType="Blogs"
							targetDom={postData.targetDom}
							isGuestProfile={isGuestProfile}
							ownerId={postData.selectedBlog.owner._id}
						/>
					)}
				</React.Fragment>
	}

	const hideComments=()=>{
		changeDisplayCommentsContainer(false);
	}

	const commentModal=()=>{
		return (
			<Comments
				postId={postData.selectedBlog._id}
				postType={"Blogs"}
				hideComments={hideComments}
				targetDom={postData.targetDom}
				isGuestProfile={isGuestProfile}
				ownerId={postData.selectedBlog.owner._id}
				selectedCommentPools={{
					regularCommentPool:postData.selectedBlog.regularCommentPool,
					videoCommentPool:postData.selectedBlog.videoCommentPool
				}}
			/>
		)
	}

	const displayVideoDescriptionTrigger=()=>{
	 	changeVideoDescriptionDisplay(true);
	}


	const closeVideoDescriptionDisplayModal=()=>{
	 	triggerVideoDescriptionViewProcessing();
		changeVideoDescriptionDisplay(false);
	}

	const crownLogo=()=>{
		return(
			<svg id="oligarchButtonIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crown" 
			  width="30" height="30" viewBox="0 0 24 24" stroke-width="2.5" stroke="#6e6e6e" fill="none" 
		 	  stroke-linecap="round" stroke-linejoin="round">
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
			</svg>
		)
	}

	const triggerDisplayPollingOption=()=>{
		changeDisplayApproveDisapproveIndicator(true);
		triggerAudioDescriptionViewProcessing();
	}

	const triggerDisplayComments=()=>{
		changeDisplayCommentsContainer(true);
		triggerAudioDescriptionViewProcessing();
	}

	const closeBlogPortal=()=>{
		if(postData.closeModal==null){
			console.log(props);
			props.closePostModal();
		}else{
			postData.closeModal();
		}
	}
	

	return createPortal(
	<PostDisplayConsumer>
		{symposiumPostInformation=>{
			return(
				<React.Fragment>
					<ShadowContainerBlog onClick={()=>closeBlogPortal()}/>
					<Container>	
						<FirstTimePostOnboarding
							userId={personalInformation.id}
							isGuestProfile={isGuestProfile}
						/>
						{displayVideoDescriptionDisplay==true &&(
							<VideoDescriptionMobileDisplayPortal
								targetDom={postData.targetDom}
								closeModal={closeVideoDescriptionDisplayModal}
								videoUrl={postData.selectedBlog.videoDescription}
								triggerVideoInitS3Processing={triggerInitVideoS3Processing}
							/>
						)}
						<div style={{cursor:"pointer",marginBottom:"5%"}}>
							<svg onClick={()=>closeBlogPortal()} 
								xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
							 	width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
							 	stroke-linecap="round" stroke-linejoin="round">
							  	<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							  	<circle cx="12" cy="12" r="9" />
							  	<path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</div>
						{pollModal()}
						<div id="blogContainerDiv" style={{position:"relative",marginTop:"2%",overflow:"hidden",height:"85%"}}>
							<Editor
								editorState={blogContentState}
								toolbarClassName="toolbarClassName"
								wrapperClassName="wrapperClassName"
								editorClassName="editorClassName"
								placeholder="Start typing to create your masterpiece"
								readOnly={false}
								toolbarHidden={true}
							/>
						</div>
						{displayLargeModal==true?
							<PosterInformationModal>
							{isLoading==true?
								<p>Loading please wait...</p>:
								<React.Fragment>
									{displayApproveDisapproveIndicator==true?
										<React.Fragment>
											<p onClick={()=>changeDisplayApproveDisapproveIndicator(false)} style={{marginBottom:"10%",...ButtonCSS}}>Back</p>
											<p onClick={()=>triggerApprovePollModal(true)} style={PollingOptionsCSS}>
												Approve Post
											</p>

											<p onClick={()=>triggerDisapprovePollModal(false)} style={PollingOptionsCSS}>
												Disapprove Post
											</p>
										</React.Fragment>
										:<React.Fragment>
											{displayCommentsContainer==true?
												<>{commentModal()}</>
											:<ul style={{padding:"0px"}}>
												<li onClick={()=>displayOrHideModal()} style={{listStyle:"none",marginRight:"70%"}}>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<ExpandLessIcon
															style={{fontSize:25}}
														/>
													</a>
												</li>
												{displayStampEffect==true?
														<li style={{listStyle:"none"}}>
															<StampIconEffect
																id="stampEffect"
															>
																<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
															</StampIconEffect>
														</li>
												:null}
							
												<li style={{listStyle:"none",marginBottom:"5%"}}>
													<div style={{display:"flex",flexDirection:"column"}}>
														<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
															<ProfilePicture to={{pathname:`/profile/${postData.selectedBlog.owner._id}`}}>
																<img id="smallImagePicture" src={postData.selectedBlog.owner.profilePicture==null?
																		NoProfilePicture:
																		postData.selectedBlog.owner.profilePicture
																	} style={{width:"55px",height:"50px",borderRadius:"50%"}}/>
															</ProfilePicture>
															<p style={{marginLeft:"2%"}}>
																<b>{postData.selectedBlog.owner.firstName}</b>
															</p>
															<div id="badgeParentContainer" style={{marginTop:"-5%"}}>
																<BadgeDisplay
																	profileId={postData.selectedBlog.owner._id}
																/>
															</div>
														</div>
														<p style={{height:"90px",overflowY:"auto"}}>
															{postData.selectedBlog.title}
														</p>
													</div>
												</li>
												<hr/>
												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														<li onClick={()=>createOrRemoveStampEffect({isAccessTokenUpdated:false})} style={ShadowButtonCSS}>
															<LoyaltyIcon
																style={{fontSize:30}}
															/>
														</li>

														<li onClick={()=>triggerDisplayPollingOption()} style={ShadowButtonCSS}>
															<PollIcon
																style={{fontSize:"30"}}
															/>
														</li>

														<li onClick={()=>triggerDisplayComments()} style={ShadowButtonCSS}>
															<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#585858" fill="none" stroke-linecap="round" stroke-linejoin="round">
															  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
															  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
															  <line x1="8" y1="9" x2="16" y2="9" />
															  <line x1="8" y1="13" x2="14" y2="13" />
															</svg>
														</li>
														<li onClick={()=>symposiumPostInformation.displayOligarchPostSettings(
																		postData.selectedBlog._id,
																		postData.selectedBlog.symposiumUploadCategory)}
															style={{listStyle:"none",display:"inline-block"}}>
															{(symposiumPostInformation!=null && symposiumPostInformation.isOligarch==true)==true &&(
																<div style={ShadowButtonCSS}>
																	{crownLogo()}
																</div>
															)}
														</li>
													</ul>
												</li>
												<hr/>
												<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
													{postData.selectedBlog.videoDescription!=null &&(
														<VideoDescriptionContainer onClick={()=>displayVideoDescriptionTrigger()}>
															<video id="extendedBlogVideoDescription" 
																autoPlay loop autoBuffer muted playsInline
																style={{borderRadius:"50%",overflow:"hidden"}} 
																width="100%" height="100%" borderRadius="50%">
																<source src={postData.selectedBlog.videoDescription} type="video/mp4"/>
															</video>
														</VideoDescriptionContainer>
													)}
													{postData.selectedBlog.audioDescription && (
														<div style={{marginLeft:"10%"}}>
															<audio id="extendedBlogAudioDescription" 
																controls onPlay={()=>triggerInitAudioS3Processing()}>
																<source src={postData.selectedBlog.audioDescription} type="audio/ogg"/>
																<source src={postData.selectedBlog.audioDescription} type="audio/mp4"/>
																Your browser does not support the audio element.
															</audio>
														</div>
													)}
												</div>
											</ul>
											}
										</React.Fragment>
									}
								</React.Fragment>
								}
							</PosterInformationModal>:
							<SmallPostInformationModal>
									<li onClick={()=>displayOrHideModal()} style={{listStyle:"none",display:"inline-block"}}>
										<ExpandMoreIcon
											style={{fontSize:25}}
										/>
									</li>
							</SmallPostInformationModal>
							}
						</Container>
				</React.Fragment>
			)
		}}
		</PostDisplayConsumer>
	,document.getElementById(postData.targetDom));

}

export default BlogHomeDisplayPortal;