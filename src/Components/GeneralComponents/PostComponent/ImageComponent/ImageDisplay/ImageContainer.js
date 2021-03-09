import React,{useState,useEffect,Component} from "react";
import styled,{keyframes} from "styled-components";
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
	PollingOptionsContainer
} from "./ImageContainerCSS.js";

import MobileUI from "./MobileUI.js";
import DeletePostConfirmationPortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";
import {useSelector,useDispatch} from  "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import FirstTimePostOnboarding from "../../FirstTimePostOnboardingIndicator.js"
import {getVideoUrl} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import PollOptionPortal from "../../PollOptionPortal.js";
import {OwnerInformationAndPostOptions} from "./OwnerInformationAndPostOption.js";
import {PostDisplayContainer} from "./Post.js";
import CommentsAndAuthenticReplies from "./CommentsAndAuthenticReplies.js";

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

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}


/*
	For some reason when you click the edit button it switches to the edit screen 
	but the old screen for the display image is still underneath it. Can reproduce 
	if you just change the height for editImageCreation 
*/

const ImageContainer=(props)=>{
	console.log(props);
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
	const [displayPostAdditionalInformation,changePostAdditionalInformation]=useState(false);

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

	const closePollingModal=()=>{
		changeDisplayPollingModal(false);
	}

	const displayPollingOptionsTrigger=(indicator)=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(indicator);
	}
	const userActions={
		actions:{
			createOrRemoveStampEffect:createOrRemoveStampEffect,
			displayComments:displayComments,
			changeDisplayPollingOptions:changeDisplayPollingOptions,
			handleRemoveImagePost:handleRemoveImagePost,
			changeDisplayImage:changeDisplayImage,
			promoteModal:triggerPromoteModal
		},
		isOwnProfile:postData.isOwnProfile,
		displayImageModal:displayImageModal,
		profileType:postData.profileType
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
								{(commentImageIndicator==false && displayPollingOptions==false && displayPostAdditionalInformation==false)==true?
									<React.Fragment>
										<OwnerInformationAndPostOptions
											displayMobileUI={displayMobileUI}
											imageData={postData.imageData}
											profileType={postData.profileType}
											userActions={{...userActions}}
											triggerDisplayPostDescriptionAndCaption={changePostAdditionalInformation}
											targetDom={postData.targetDom}
										/>
										<PostDisplayContainer
											imageData={postData.imageData}
											displayStampEffect={displayStampEffect}
											displayMobileUI={displayMobileUI}
											userActions={{...userActions}}
											targetDom={postData.targetDom}
										/>
									</React.Fragment>:
									<CommentsAndAuthenticReplies
										_id={postData.imageData._id}
										hideComments={hideComments}
										targetDom={postData.targetDom}
										isGuestProfile={isGuestProfile}
										changeDisplayPollingOptions={changeDisplayPollingOptions}
										displayPollingOptionsTrigger={displayPollingOptionsTrigger}
										postType={"Images"}
										displayPollingOptions={displayPollingOptions}
										displayPostAdditionalInformation={displayPostAdditionalInformation}
										caption={postData.imageData.caption}
										description={postData.imageData.description}
										triggerDisplayPostDescriptionAndCaption={changePostAdditionalInformation}
									/>
								}
							</Container>
						}
					</React.Fragment>
				}
			</React.Fragment>
		</ImageProvider>

	)
}

export default ImageContainer;