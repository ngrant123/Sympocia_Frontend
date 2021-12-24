import React,{useState,useEffect,useRef} from "react";
import styled,{keyframes} from "styled-components";
import EditImageCreation from "../ImageComponent/ImageCreation/EditImageCreation.js";
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
	addStampPost,
	unStampPost,
	fakeNewsPostResponse,
	markPostAsAuthentic,
	deletePost
} from "../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

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
} from "./PostContainerCSS.js";
import {triggerS3UrlViewProcessing} from "../S3PostViewProcessing.js"; 

import DeletePostConfirmationPortal from "../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";
import {useSelector,useDispatch} from  "react-redux";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";
import FirstTimePostOnboarding from "../FirstTimePostOnboardingIndicator.js"
import {getVideoUrl,getImgUrl} from "../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import PollOptionPortal from "../PollOptionPortal.js";
import {OwnerInformationAndPostOptions} from "./OwnerInformationAndPostOption.js";
import {PostDisplayContainer} from "./Post.js";
import CommentsAndAuthenticReplies from "./CommentsAndAuthenticReplies.js";
import EditVideoModal from "../VideoComponent/VideoCreation/EditVideoModal.js";
import PostBadgeAdditionModal from "../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/BadgePortal/PostBadgeAddition/index.js";

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
	const [commentPostIndicator,changeCommentsDisplay]=useState(false);
	const [displayPostModal,changeDisplayPost]=useState(false);
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
	const [postDataDestructedField,changePostDataDestructuredField]=useState();


	const [displayPollingOptions,changeDisplayPollingOptions]=useState(false);
	const [displayPollModal,changeDisplayPollingModal]=useState(false);
	const [displayApproveModal,changeDisplayApproveModal]=useState(false);
	const [displayPostAdditionalInformation,changePostAdditionalInformation]=useState(false);
	const [displayPostBadgeAdditionPortal,changePostBadgeAdditionalDisplayPortal]=useState(false);

	const videoDescriptionViewStartTimeStamp=useRef(); 
	const audioDescritptionViewStartTimeStamp=useRef();
	const videoViewStartTimeStamp=useRef();

	const isVideoDescriptionS3PostProcessingCompleted=useRef(false);
	const isAudioDescriptionS3PostProcessingCompleted=useRef(false);
	const isVideoS3PostProcessingCompleted=useRef(false);

	const triggerVideoDescriptionViewProcessing=()=>{
		if(isVideoDescriptionS3PostProcessingCompleted.current==false && postData.isOwnProfile==false){
			triggerS3UrlViewProcessing(
				"videoDescription",
				"PPWatchTimeVideoDescription",
				videoDescriptionViewStartTimeStamp.current,
				props.imageData==null?"Videos":"Images",
				props.imageData==null?props.videoData._id:props.imageData._id,
				userId
			);
		}
	}

	const triggerAudioDescriptionViewProcessing=()=>{
		if(isAudioDescriptionS3PostProcessingCompleted.current==false && audioDescritptionViewStartTimeStamp.current!=null
			&& postData.isOwnProfile==false){
			isAudioDescriptionS3PostProcessingCompleted.current=true;
			triggerS3UrlViewProcessing(
				"audioDescription",
				"PPWatchTimeAudioDescription",
				audioDescritptionViewStartTimeStamp.current,
				props.imageData==null?"Videos":"Images",
				props.imageData==null?props.videoData._id:props.imageData._id,
				userId
			);	
		}
	}

	const triggerVideoViewProcessing=()=>{
		if(isVideoS3PostProcessingCompleted.current==false && videoViewStartTimeStamp.current!=null
			&& postData.isOwnProfile==false){
			isVideoS3PostProcessingCompleted.current=true;
			triggerS3UrlViewProcessing(
				"videoElement",
				"PPWatchTimeVideo",
				videoViewStartTimeStamp.current,
				props.imageData==null?"Videos":"Images",
				props.imageData==null?props.videoData._id:props.imageData._id,
				userId
			);
		}
	}

	useEffect(()=>{
		fetchData();
		triggerUIChange();
		return ()=>{
			if(isVideoDescriptionS3PostProcessingCompleted.current==false){		
				triggerVideoDescriptionViewProcessing();
			}
			if(isAudioDescriptionS3PostProcessingCompleted.current==false){
				triggerAudioDescriptionViewProcessing();
			}
			if(isVideoS3PostProcessingCompleted.current==false){
				triggerVideoViewProcessing();
			}
		}
	},[]);

	const triggerInitS3Processing=()=>{
		const destructuredData=props.imageData==null?props.videoData:props.imageData;
		const {videoDescriptionKey}=destructuredData;
		const currentTimeStamp=new Date().getTime();
		if(videoDescriptionKey!=null){
			videoDescriptionViewStartTimeStamp.current=currentTimeStamp;
		}else{
			videoViewStartTimeStamp.current=currentTimeStamp;
		}
	}

	const fetchData=async()=>{
		const destructuredData=props.imageData==null?props.videoData:props.imageData;
		const destructedFieldTerm=props.imageData==null?"videoData":"imageData";
		const {videoDescriptionKey,videoUrlKey,uncompressedImageId}=destructuredData;	
		let	currentData=postData;

		if(videoDescriptionKey!=null){
			const {confirmation,data}=await getVideoUrl(videoDescriptionKey);

			if(confirmation=="Success"){
				const videoDescriptionUrl=data.message;

				currentData={
					...currentData,
					[destructedFieldTerm]:{
						...currentData[destructedFieldTerm],
						videoDescription:videoDescriptionUrl
					}
				}
			}else{
				alert('Unfortunately there was an error getting this video. Please try again later');
			}
		} 
		if(videoUrlKey!=null){
			const {confirmation,data}=await getVideoUrl(videoUrlKey);
			if(confirmation=="Success"){
				const videoUrl=data.message;

				currentData={
					...currentData,
					[destructedFieldTerm]:{
						...currentData[destructedFieldTerm],
						videoUrl:videoUrl
					}
				}
			}else{
				alert('Unfortunately there was an error getting this video. Please try again later');
			}
		}else{
			if(uncompressedImageId!=null){
				const {confirmation,data}=await getImgUrl(uncompressedImageId);
				if(confirmation=="Success"){
					const imgUrl=data.message;

					currentData={
						...currentData,
						[destructedFieldTerm]:{
							...currentData[destructedFieldTerm],
							imgUrl:imgUrl
						}
					}
				}else{
					alert('Unfortunately there was an error getting this image. Please try again later');
				}
			}
		}

		triggerInitS3Processing();
		changePostData(currentData);
		changePostDataDestructuredField(destructedFieldTerm)
		changeIsLoadingStatus(false);
	}


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

	const triggerS3UrlProcessing=()=>{
		triggerVideoDescriptionViewProcessing();
		triggerAudioDescriptionViewProcessing();
		triggerVideoViewProcessing();
	}

	const createOrRemoveStampEffect=async({isAccessTokenUpdated,updatedAccessToken})=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			triggerS3UrlProcessing();

			let confirmationResponse;
			let dataResponse;
			if(displayStampEffect==false){
				const {confirmation,data}=await addStampPost(
													postData[postDataDestructedField]._id,
													"personal",
													postData[postDataDestructedField].imgUrl==null?"Videos":"Images",
													userId,
													isAccessTokenUpdated==true?updatedAccessToken:
													personalInformation.accessToken
												);
				confirmationResponse=confirmation;
				dataResponse=data;

			}else{
				const {confirmation,data}=await unStampPost(
													postData[postDataDestructedField]._id,
													"personal",
													postData[postDataDestructedField].imgUrl==null?"Videos":"Images",
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
		postData.triggerPromoteModal(
			postData[postDataDestructedField]._id,
			postData[postDataDestructedField].imgUrl==null?"Videos":"Images"
		);
	}

	const editPost=(data)=>{
		changeDisplayPost(false);
		postData[postDataDestructedField].contextLocation.editPost(data);
	}

	const closeDeleteConfirmationModal=()=>{
		changeDisplayDeleteConfirmation(false);
	}

	const displayComments=()=>{
		triggerS3UrlProcessing();
		changeCommentsDisplay(true)
	}

	const closePollingModal=()=>{
		changeDisplayPollingModal(false);
	}

	const displayPollingOptionsTrigger=(indicator)=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(indicator);
	}

	const triggerDisplayPollingOptionDecider=()=>{
		triggerS3UrlProcessing();
		changeDisplayPollingOptions(true);
	}

	const handleDisplayPostBadgeAdditionModal=()=>{
		changePostBadgeAdditionalDisplayPortal(true);
	}

	const closePostBadgeAdditionalModal=()=>{
		changePostBadgeAdditionalDisplayPortal(false);
	}

	const displayInitialScreen=()=>{
		changeDisplayPollingOptions(false);
		changeCommentsDisplay(false);
		changePostAdditionalInformation(false);
	}

	const userActions={
		actions:{
			createOrRemoveStampEffect:createOrRemoveStampEffect,
			displayComments:displayComments,
			changeDisplayPollingOptions:triggerDisplayPollingOptionDecider,
			handleRemoveImagePost:handleRemoveImagePost,
			changeDisplayPost:changeDisplayPost,
			promoteModal:triggerPromoteModal,
			handleDisplayPostBadgeAdditionModal:handleDisplayPostBadgeAdditionModal
		},
		isOwnProfile:postData.isOwnProfile,
		displayPostModal:displayPostModal,
		profileType:postData.profileType
	}

	const closeEditModal=()=>{
		changeDisplayPost(false);
	}

	const triggerAudioInitS3Proccessing=()=>{
		if(audioDescritptionViewStartTimeStamp.current==null){
			audioDescritptionViewStartTimeStamp.current=new Date().getTime();
		}
	}

	const triggerVideoInitS3Processing=()=>{
		if(videoViewStartTimeStamp.current==null){
			videoViewStartTimeStamp.current=new Date().getTime();
		}
	}


	return(
		<React.Fragment>
			<FirstTimePostOnboarding
				userId={userId}
				isGuestProfile={isGuestProfile}
			/>
			{displayPostBadgeAdditionPortal==true &&(
				<PostBadgeAdditionModal
					profileId={postDataDestructedField=="imageData"?postData.imageData.owner:postData.videoData.owner}
					closeModal={closePostBadgeAdditionalModal}
					postType={postData[postDataDestructedField].imgUrl==null?"Videos":"Images"}
					postId={postData[postDataDestructedField]._id}
				/>
			)}
			{displayDeleteConfirmation==true &&(
				<DeletePostConfirmationPortal
					postType={"Posts"}
					selectedPostType={postData[postDataDestructedField].imgUrl==null?"Videos":"Images"}
					content={postData[postDataDestructedField]}
					closeModal={closeDeleteConfirmationModal}
					removeContextLocation={postData[postDataDestructedField].contextLocation.removePost}
					targetDom={"personalContainer"}
				/>
			)}
			{displayPollModal==true?
				<PollOptionPortal
					closeModal={closePollingModal}
					displayApproveModal={displayApproveModal}
					postId={postData[postDataDestructedField]._id}
					postType={postData[postDataDestructedField].imgUrl==null?"Videos":"Images"}
					targetDom={postData.targetDom}
					isGuestProfile={isGuestProfile}
					ownerId={postDataDestructedField=="imageData"?postData.imageData.owner:postData.videoData.owner}
				/>:null
			}
			{displayPostModal==true?
				<React.Fragment>
					{postData[postDataDestructedField].imgUrl==null?
						<EditVideoModal
							videoSrc={postData[postDataDestructedField].videoUrl}
							previousData={postData[postDataDestructedField]}
							editPost={editPost}
							closeModal={closeEditModal}
							isPhoneUIEnabled={displayMobileUI}
						/>
						:<EditImageCreation
							imageSrcUrl={postData[postDataDestructedField].imgUrl}
							previousData={postData[postDataDestructedField]}
							editPost={editPost}
							closeModal={closeEditModal}
							isPhoneUIEnabled={displayMobileUI}
						/>
					}
				</React.Fragment>:
				<Container>
					{(commentPostIndicator==false && displayPollingOptions==false)==true &&(
						<div style={{marginBottom:"2%",cursor:"pointer"}} onClick={()=>props.closePostModal()}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
								 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
								 stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <circle cx="12" cy="12" r="9" />
								  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</div>
					)}
					{isLoading==true?
						<p>Gives us one second while we get this post</p>:
						<React.Fragment>
							{(commentPostIndicator==false && displayPollingOptions==false && displayPostAdditionalInformation==false)==true?
								<React.Fragment>
									<OwnerInformationAndPostOptions
										displayMobileUI={displayMobileUI}
										postData={postData[postDataDestructedField]}
										profileType={postData.profileType}
										userActions={{...userActions}}
										triggerDisplayPostDescriptionAndCaption={changePostAdditionalInformation}
										targetDom={postData.targetDom}
										postType={postData[postDataDestructedField].imgUrl==null?"Videos":"Images"}
										videoDescriptionViewStartTimeStamp={videoDescriptionViewStartTimeStamp}
									/>
									<PostDisplayContainer
										postData={postData[postDataDestructedField]}
										displayStampEffect={displayStampEffect}
										displayMobileUI={displayMobileUI}
										userActions={{...userActions}}
										targetDom={postData.targetDom}
										headlineText={postDataDestructedField=="imageData"?postData.imageData.caption:postData.videoData.title}
										secondaryText={postData[postDataDestructedField].description}
										triggerAudioInitS3Proccessing={triggerAudioInitS3Proccessing}
										triggerVideoInitS3Processing={triggerVideoInitS3Processing}
										triggerVideoViewProcessing={triggerVideoViewProcessing}
									/>
								</React.Fragment>:
								<CommentsAndAuthenticReplies
									_id={postData[postDataDestructedField]._id}
									hideComments={hideComments}
									targetDom={postData.targetDom}
									isGuestProfile={isGuestProfile}
									displayPollingOptionsTrigger={displayPollingOptionsTrigger}
									postType={postData[postDataDestructedField].imgUrl==null?"Videos":"Images"}
									displayPollingOptions={displayPollingOptions}
									displayPostAdditionalInformation={displayPostAdditionalInformation}
									headlineText={postDataDestructedField=="imageData"?postData.imageData.caption:postData.videoData.title}
									secondaryText={postData[postDataDestructedField].description}
									triggerDisplayPostDescriptionAndCaption={displayInitialScreen}
									isOwnProfile={postData.isOwnProfile}
									ownerId={postDataDestructedField=="imageData"?postData.imageData.owner:postData.videoData.owner}
									selectedCommentPools={{
										regularCommentPool:postDataDestructedField=="imageData"?postData.imageData.regularCommentPool:
										postData.videoData.regularCommentPool,
										videoCommentPool:postDataDestructedField=="imageData"?postData.imageData.videoCommentPool:
										postData.videoData.videoCommentPool
									}}
								/>
							}
						</React.Fragment>
					}
				</Container>
			}
		</React.Fragment>
	)
}

export default ImageContainer;