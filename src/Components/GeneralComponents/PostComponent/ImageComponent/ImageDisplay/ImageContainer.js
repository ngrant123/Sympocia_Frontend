import React,{useState,useEffect,Component} from "react";
import styled,{keyframes} from "styled-components";
import ImageInformation from "./ImageInformation.js";
import Comments from "../../../CommentsComponent/index.js";
import {ImageProvider} from "./ImageContext.js";
import EditImageCreation from "../ImageCreation/EditImageCreation.js";
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
		addStampPost,
		unStampPost,
		fakeNewsPostResponse,
		markPostAsAuthentic,
		deletePost
	} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

import StampIcon from "../../../../../designs/img/StampIcon.png";

import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';
import {
	Container,
	Image,
	ImageButtons,
	StampIconEffect,
	VideoDesriptionContainer,
	CrownIconContainer,
	ShadowContainer,
	CrownPostModal,
	CommentContainer,
	PersonalInformation,
	Post,
	PollingOptionsContainer
} from "./ImageContainerCSS.js";
import MobileUI from "./MobileUI.js";
import DeletePostConfirmationPortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";
import {useSelector,useDispatch} from  "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import FirstTimePostOnboarding from "../../FirstTimePostOnboardingIndicator.js"
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {getVideoUrl} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {Link} from "react-router-dom";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ChatIcon from '@material-ui/icons/Chat';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PollOptionPortal from "../../PollOptionPortal.js";

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

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"5%",
	marginBottom:"2%",
	cursor:"pointer"
}

const PollingOptionsCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
}


/*
	For some reason when you click the edit button it switches to the edit screen 
	but the old screen for the display image is still underneath it. Can reproduce 
	if you just change the height for editImageCreation 
*/

const ImageContainer=(props)=>{
	
	const [commentImageIndicator,changeCommentsDisplay]=useState(false);
	const [displayImageModal,changeDisplayImage]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayMobileUI,changeUIStatus]=useState(false);
	const [displayPhoneUI,changePhoneUIStatus]=useState(false);
	const [displayCrownModalIndicator,changeDisplayCrownModalIndicator]=useState(false);
	const [displayDeleteConfirmation,changeDisplayDeleteConfirmation]=useState(false);
	const userInformation=useSelector(state=>state.personalInformation);
	const isGuestProfile=(userInformation.id=="0" || userInformation.isGuestProfile==true)==true?
						true:false;
	const userId=useSelector(state=>state.personalInformation.id);
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();
	const [isLoading,changeIsLoadingStatus]=useState(true);
	const [postData,changePostData]=useState(props);
	const [displayPollingOptions,changeDisplayPollingOptions]=useState(false);
	const [displayPollModal,changeDisplayPollingModal]=useState(false);
	const [displayApproveModal,changeDisplayApproveModal]=useState(false);

	useEffect(()=>{
		const fetchData=async()=>{
			const {imageData}=props;
			const {videoDescriptionKey}=imageData;	
			if(videoDescriptionKey!=null){
				const {confirmation,data}=await getVideoUrl(videoDescriptionKey);

				let currentData=postData;
				if(confirmation=="Success"){
					const videoDescriptionUrl=data.message;

					currentData={
						...currentData,
						imageData:{
							...imageData,
							videoDescription:videoDescriptionUrl
						}
					}
				}else{
					alert('Unfortunately there was an error getting this video. Please try again later');
				}
				debugger;
				changePostData(currentData);
			}
			changeIsLoadingStatus(false);
		}

		fetchData();
		triggerUIChange();
	},[]);
	window.addEventListener('resize',triggerUIChange)

	const triggerUIChange=()=>{
		if(window.innerWidth<700){
			changeUIStatus(true);
			changePhoneUIStatus(true);
		}
		else if(window.innerWidth<1340){
			changeUIStatus(true);
		}else{
			changeUIStatus(false);
		}
	}
	
	const handleRemoveImagePost=async()=>{
		
		changeDisplayDeleteConfirmation(true);
	}

	const createOrRemoveStampEffect=async({isAccessTokenUpdated,updatedAccessToken})=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			let confirmationResponse;
			let dataResponse;

			if(displayStampEffect==false){
				const {confirmation,data}=await addStampPost(
													postData.imageData._id,
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
													postData.imageData._id,
													"personal",
													"Images",
													userId,
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

	const hideComments=()=>{
		changeCommentsDisplay(false);
	}

	const triggerPromoteModal=()=>{
		postData.triggerPromoteModal(postData.imageData._id,"Images");
	}

	const editPost=(data)=>{
		changeDisplayImage(false);
		postData.imageData.contextLocation.editPost(data);
	}

	const closeDeleteConfirmationModal=()=>{
		changeDisplayDeleteConfirmation(false);
	}

	const displayComments=()=>{
		changeCommentsDisplay(true)
	}

	const userActionsContainer=()=>{
		return(
			<React.Fragment>
				<LoyaltyIcon
					style={{fontSize:50,...ShadowButtonCSS}}
					onClick={()=>createOrRemoveStampEffect({isAccessTokenUpdated:false})}
				/>
				<ChatIcon
					style={{fontSize:50,...ShadowButtonCSS}}
					onClick={()=>displayComments()}
				/>

				<AssessmentIcon
					style={{fontSize:50,...ShadowButtonCSS}}
					onClick={()=>changeDisplayPollingOptions(true)}
				/>
					
				{(postData.profileType=="personalProfile" && postData.isOwnProfile==true) &&(
					<>
						<BorderColorIcon
							style={{fontSize:50,...ShadowButtonCSS}}
							onClick={()=>changeDisplayImage(!displayImageModal)}
						/>

						<svg id="removePostOption" onClick={()=>handleRemoveImagePost()}
							 xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
							width="300" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
							stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <line x1="4" y1="7" x2="20" y2="7" />
						  <line x1="10" y1="11" x2="10" y2="17" />
						  <line x1="14" y1="11" x2="14" y2="17" />
						  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
						  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
						</svg>
						<svg id="promotePostOption" onClick={()=>triggerPromoteModal()}
							xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" 
							  width="300" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e"
							  fill="none" stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
							  <path stroke="none" d="M0 0h24v24H0z"/>
							  <circle cx="12" cy="9" r="6" />
							  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
							  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
						</svg>
					</>
				)}
			</React.Fragment>
		)
	}

	const postInformationAdditionalInformation=()=>{
		return(
			<React.Fragment>
				<p style={{fontSize:"20px",listStyle:"none",height:"60px",overflowY:"hidden",marginBottom:"2%"}}>
					<b>
						{postData.imageData.caption}
					</b>
				</p>

				<p style={{fontSize:"13px",color:"#8c8c8c",listStyle:"none",height:"50px",overflowY:"hidden"}}>
					{postData.imageData.description}
				</p>
			</React.Fragment>
		)
	}

	const closePollingModal=()=>{
		changeDisplayPollingModal(false);
	}

	const displayPollingOptionsTrigger=(indicator)=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(indicator);
	}


	return(
		<ImageProvider value={{
			updateIndicator:(indicator)=>{
				changeCommentsDisplay(indicator);
			}
		}}>
			<React.Fragment>
				<FirstTimePostOnboarding
					userId={userId}
					isGuestProfile={isGuestProfile}
				/>
				{displayDeleteConfirmation==true &&(
					<DeletePostConfirmationPortal
						postType={"Posts"}
						selectedPostType={"Images"}
						content={postData.imageData}
						closeModal={closeDeleteConfirmationModal}
						removeContextLocation={postData.imageData.contextLocation.removePost}
						targetDom={"personalContainer"}
					/>
				)}
				{displayPollModal==true?
					<PollOptionPortal
						closeModal={closePollingModal}
						displayApproveModal={displayApproveModal}
						postId={postData.imageData._id}
						postType="Images"
						targetDom={"personalContainer"}
						isGuestProfile={isGuestProfile}
					/>:null
				}
				{displayImageModal==true?
					<EditImageCreation
						imageSrcUrl={postData.imageData.imgUrl}
						previousData={postData.imageData}
						editPost={editPost}
					/>:
					<React.Fragment>
						{isLoading==true?
							<p>Gives us one second while we get this post</p>:
							<Container>
								{(commentImageIndicator==false && displayPollingOptions==false)==true?
									<React.Fragment>
										<PersonalInformation>
											<img id="ownerProfilePicture" 
												src={postData.imageData.owner.profilePicture==null?
												NoProfilePicture:postData.imageData.owner.profilePicture}
											 style={{borderRadius:"50%",width:"7%",height:"60px"}}
											/>
											<Link style={{marginLeft:"4%",fontSize:"20px",maxWidth:"80%",maxHeight:"30px",overflow:"hidden",textDecoration:"none",color:"black",marginRight:"10%"}}
												to={{pathname:`/profile/${postData.imageData.owner._id}`}}
											>	
												<p>
													<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliq</b>
												</p>
											</Link>
											{displayMobileUI==false ?
												<React.Fragment>
													{userActionsContainer()}
												</React.Fragment>:
												<KeyboardArrowDownIcon
													id="keyBoardDownLI"
													style={{borderRadius:"50%",fontSize:"40",boxShadow:"1px 1px 5px #dbdddf"}}
												/>
											}
										</PersonalInformation>

										<hr/>
										<div style={{marginLeft:"10%",marginBottom:"2%"}}>
											<audio id="audio" style={{width:"800px"}} controls>
												<source src={postData.imageData.audioDescription} type="audio/ogg"/>
												<source src={postData.imageData.audioDescription} type="audio/mp4"/>
												Your browser does not support the audio element.
											</audio>
										</div>
										<Post>
											{postData.imageData.videoDescription==null?null:
												<VideoDesriptionContainer>
													<video id="videoDescription"
														width="100%" height="100%" borderRadius="50%"
														autoPlay loop autoBuffer muted playsInline controls>
														<source src={postData.imageData.videoDescription} type="video/mp4"/>
													</video>
												</VideoDesriptionContainer>
											}
											<Image>	
												{displayStampEffect==true?
														<React.Fragment>
															<StampIconEffect
																id="stampEffect"
															>
																<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
															</StampIconEffect>
														</React.Fragment>:
												null}
												<img id="image" src={postData.imageData.imgUrl} style={{width:"100%",height:"100%",borderRadius:"5px"}}/>
											</Image>
										</Post>
										{displayMobileUI==true ?
											<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
												{userActionsContainer()}
											</div>:
											<div id="postInformation">
												{postInformationAdditionalInformation()}
											</div>
										}
									</React.Fragment>:
									<CommentContainer>
										{displayPollingOptions==false?
											<Comments
												postId={postData.imageData._id}
												postType={"Images"}
												hideComments={hideComments}
												targetDom={postData.targetDom}
												isGuestProfile={isGuestProfile}
											/>:
											<PollingOptionsContainer>
												<p onClick={()=>changeDisplayPollingOptions(false)} style={{marginBottom:"10%",...ButtonCSS}}>Back</p>
												<p onClick={()=>displayPollingOptionsTrigger(true)} style={PollingOptionsCSS}>
													Approve Post
												</p>

												<p onClick={()=>displayPollingOptionsTrigger(false)} style={PollingOptionsCSS}>
													Disapprove Post
												</p>
											</PollingOptionsContainer>
										}
									</CommentContainer>
								}
							</Container>
						}
					</React.Fragment>
				}
				{/*
					{displayMobileUI==true?
						<MobileUI
							imgData={postData.imageData}
							targetDom={postData.targetDom}
							deletePost={handleRemoveImagePost}
							pageType={postData.profileType}
							promote={triggerPromoteModal}
							isOwnPostViewing={postData.isOwnProfile}
							closePostModal={postData.closePostModal}
							isPhoneUI={displayPhoneUI}
							isGuestProfile={isGuestProfile}
							editPostAction={editPost}
						/>
						:<React.Fragment>
							{displayImageModal==true?
								<EditImageCreation
									imageSrcUrl={postData.imageData.imgUrl}
									previousData={postData.imageData}
									editPost={editPost}
								/>:
							<Container>
								{isLoading==true?
									<p>Gives us one second while we get this post</p>:
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"70px"}}>
											<ul>
												<li id="postOptionsLI" style={{listStyle:"none",marginBottom:"2%"}}>
													<ul style={{padding:"0px"}}>
														<a style={{textDecoration:"none"}}href="javascript:void(0);">
															<li onClick={()=>createOrRemoveStampEffect({isAccessTokenUpdated:false})} style={ButtonCSS}>
																	Stamp
															</li>
														</a>

														{(postData.profileType=="personalProfile" && postData.isOwnProfile==true) &&(
															<>
																<a style={{textDecoration:"none"}} href="javascript:void(0);">
																	<li onClick={()=>triggerPromoteModal()} style={ButtonCSS}>
																			Promote
																	</li>
																</a>

																<li onClick={()=>changeDisplayImage(!displayImageModal)} style={{listStyle:"none",display:"inline-block",marginRight:"3%"}}>
																	<a style={{textDecoration:"none"}}href="javascript:void(0);">
																		<EditIcon/> 
																		Edit image
																	</a>
																</li>

																<li onClick={()=>handleRemoveImagePost()} style={{listStyle:"none",display:"inline-block"}}>
																	<a style={{textDecoration:"none"}}href="javascript:;">
																		<HighlightOffIcon/> 
																		Remove image
																	</a>
																</li>
															</>
														)}
													</ul>
												</li>
												<li style={{listStyle:"none"}}>
													<Image>	
														{displayStampEffect==true?
																<React.Fragment>
																	<StampIconEffect
																		id="stampEffect"
																	>
																		<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
																	</StampIconEffect>
																</React.Fragment>:
														null}
														<img src={postData.imageData.imgUrl} style={{width:"100%",height:"100%",borderRadius:"5px"}}/>
														{postData.imageData.videoDescription==null?null:
															<VideoDesriptionContainer>
																<video id="videoDescription"
																	style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%"
																	autoPlay loop autoBuffer muted playsInline controls>
																	<source src={postData.imageData.videoDescription} type="video/mp4"/>
																</video>
															</VideoDesriptionContainer>
														}
													</Image>
												</li>
											</ul>
										</li>

										<li id="postInformationLI" style={{listStyle:"none",display:"inline-block",padding:"0px"}}>
											{commentImageIndicator==true?
													<ImageInformation
														imageInformation={postData.imageData}
														targetDom={postData.targetDom}
														isMobileTrue={displayMobileUI}
														isGuestProfile={isGuestProfile}
													/>
													:
													<CommentContainer>
														<Comments
															postId={postData.imageData._id}
															postType={"Images"}
															hideComments={hideComments}
															targetDom={postData.targetDom}
															isGuestProfile={isGuestProfile}
														/>
													</CommentContainer>
											}

										</li>
									</ul>
								}
							</Container>
							}
					</React.Fragment>
					}
				*/}
			</React.Fragment>
		</ImageProvider>

	)
}

export default ImageContainer;