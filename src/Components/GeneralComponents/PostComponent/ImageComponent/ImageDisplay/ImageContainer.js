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
	CommentContainer
} from "./ImageContainerCSS.js";

import {testIfUserIsUsingChrome} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/VerifyBrowserIsChrome.js";
import MobileUI from "./MobileUI.js";
import DeletePostConfirmationPortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";
import {useSelector} from  "react-redux";

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
  marginRight:"4%"
}


/*
	For some reason when you click the edit button it switches to the edit screen 
	but the old screen for the display image is still underneath it. Can reproduce 
	if you just change the height for editImageCreation 
*/

const ImageContainer=(props)=>{

	const [commentImageIndicator,changeIndicator]=useState(true);
	const [displayImageModal,changeDisplayImage]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayMobileUI,changeUIStatus]=useState(false);
	const [displayCrownModalIndicator,changeDisplayCrownModalIndicator]=useState(false);
	const [displayDeleteConfirmation,changeDisplayDeleteConfirmation]=useState(false);
	const userInformation=useSelector(state=>state.personalInformation);
	const isGuestProfile=(userInformation.id=="0" || userInformation.isGuestProfile==true)==true?
						true:false;
	const userId=useSelector(state=>state.personalInformation.id);

	useEffect(()=>{
		triggerUIChange();
	},[]);
	window.addEventListener('resize',triggerUIChange)

	const triggerUIChange=()=>{
		if(window.innerWidth<1340){
			changeUIStatus(true);
		}else{
			changeUIStatus(false);
		}
	}
	
	const handleRemoveImagePost=async()=>{
		debugger;
		changeDisplayDeleteConfirmation(true);
	}

	const createOrRemoveStampEffect=()=>{
		var isPersonalProfile=props.profileType=="personalProfile"?true:false;
		if(displayStampEffect==false){
			if(isPersonalProfile==true){
				addStampPost(props.imageData._id,"personal","Images",userId);
			}else{
				addStampPost(props.imageData._id,"company","Images",userId);
			}
			changeDisplayStampEffect(true);
		}else{
			if(isPersonalProfile==true){
				unStampPost(props.imageData._id,"personal","Images",userId);
			}else{
				unStampPost(props.imageData._id,"company","Images",userId);
			}
			changeDisplayStampEffect(false);
		}
	}

	const hideComments=()=>{
		changeIndicator(true);
	}

	const triggerPromoteModal=()=>{
		props.triggerPromoteModal(props.imageData._id,"Images");
	}

	const editPost=(data)=>{
		changeDisplayImage(false);
		props.imageData.contextLocation.editPost(data);
	}

	const closeDeleteConfirmationModal=()=>{
		changeDisplayDeleteConfirmation(false);
	}


	return(
		<ImageProvider value={{
			updateIndicator:(indicator)=>{
				changeIndicator(indicator);
			}
		}}>
			<React.Fragment>
				{displayDeleteConfirmation==true &&(
					<DeletePostConfirmationPortal
						postType={"Posts"}
						selectedPostType={"Images"}
						content={props.imageData}
						closeModal={closeDeleteConfirmationModal}
						removeContextLocation={props.imageData.contextLocation.removePost}
						targetDom={"personalContainer"}
					/>
				)}
				{displayMobileUI==true?
					<MobileUI
						imgData={props.imageData}
						isChromeBrowser={testIfUserIsUsingChrome()}
						targetDom={props.targetDom}
						deletePost={handleRemoveImagePost}
						pageType={props.profileType}
						promote={triggerPromoteModal}
						isOwnPostViewing={props.isOwnProfile}
						isGuestProfile={isGuestProfile}
					/>
					:<Container>
						{displayImageModal==true?
							<EditImageCreation
								imageSrcUrl={props.imageData.imgUrl}
								previousData={props.imageData}
								editPost={editPost}
							/>:
							<React.Fragment>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginRight:"70px"}}>
										<ul>
											<li id="postOptionsLI" style={{listStyle:"none",marginBottom:"2%"}}>
												<ul style={{padding:"0px"}}>
													{props.imageData.isCrownedPost==true?
														<a style={{textDecoration:"none"}}href="javascript:void(0);">
															<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																<CrownIconContainer>
																	<Icon 
																		id="crownIcon"
																		icon={crownIcon}
																		style={{borderRadius:"50%",zIndex:"8",backgroundColor:"white",fontSize:"40px",color:"#C8B0F4"}}
																	/>
																</CrownIconContainer>
															</li>
														</a>:null
													}
													{isGuestProfile==false && (
														<a style={{textDecoration:"none"}}href="javascript:void(0);">
															<li onClick={()=>createOrRemoveStampEffect()} style={ButtonCSS}>
																	Stamp
															</li>
														</a>
													)}

													{(props.profileType=="personalProfile" && props.isOwnProfile==true) &&(
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
													<img src={props.imageData.imgUrl} style={{width:"100%",height:"100%",borderRadius:"5px"}}/>
													{(props.imageData.videoDescription==null && testIfUserIsUsingChrome()==true)?null:
														<VideoDesriptionContainer>
															<video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoPlay={true} controls={true} playsInline>
																	<source src={props.imageData.videoDescription} type="video/webm"></source>
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
													imageInformation={props.imageData}
													targetDom={props.targetDom}
													isMobileTrue={displayMobileUI}
													isGuestProfile={isGuestProfile}
												/>
												:
												<CommentContainer>
													<Comments
														postId={props.imageData._id}
														postType={"Images"}
														hideComments={hideComments}
														targetDom={props.targetDom}
													/>
												</CommentContainer>
										}

									</li>
								</ul>
							</React.Fragment>
						}
					</Container>
				}
			</React.Fragment>
		</ImageProvider>

	)
}

export default ImageContainer;