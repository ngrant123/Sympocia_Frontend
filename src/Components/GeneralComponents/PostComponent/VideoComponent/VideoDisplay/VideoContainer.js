import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Video from "./Video.js";
import RecommendedVideos from "./RecommendedVideos.js";
import EditVideoModal from "../VideoCreation/EditVideoModal.js";
import MobileUI from "./MobileUI.js";
import DeletePostConfirmationPortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";
import {useSelector} from "react-redux";
import PollOptionPortal from "../../PollOptionPortal.js";
import {getVideoUrl} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";

const Container=styled.div`
	position:fixed;
	width:65%;
	height:70%;
	z-index:12;
	border-radius:5px;
	background-color:white;
	border-radius:5px;
	padding:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
	overflow-y:auto;


	@media screen and (max-width:1370px){
		width:95%;
	}
	@media screen and (max-width:700px){
		height:120%;
		width:100%;
		margin-left:-5% !important;
	}


`;

const VideoContainer=(data)=>{
	const [displayVideoEditModal,changeVideoEditModal]=useState(false);
	const [displayMobileUI,changeUIStatus]=useState(false);
	const [displayDeleteConfirmation,changeDisplayDeleteConfirmation]=useState(false);
	const [displayPollOptionModal,changePollOptionModal]=useState(false);
	const [displayApprovePollOptionModal,changeDisplayApprovePollModal]=useState(false);
	const personalId=useSelector(state=>state.personalInformation.id);
	const [isLoading,changeIsLoadingStatus]=useState(true);
	const [postData,changePostData]=useState(data);

	const userInformation=useSelector(state=>state.personalInformation);
	const isGuestProfile=(userInformation.id=="0" || userInformation.isGuestProfile==true)==true?
						true:false;

	useEffect(()=>{
		const fetchData=async()=>{
			const {videoData}=data;
			const {
				videoDescriptionKey,
				videoUrlKey
			}=videoData;

			const promise=[];
			promise.push(getVideoUrl(videoUrlKey));
			if(videoDescriptionKey!=null)
				promise.push(getVideoUrl(videoDescriptionKey));

			Promise.all(promise).then(result=>{
				const videoUrlResult=result[0];
				const videoDescriptionUrlResult=result[1];
				let data=postData;

				if(videoUrlResult.confirmation=="Success" && videoDescriptionUrlResult.confirmation=="Success"){

					const videoUrl=videoUrlResult.data.message;
					const videoDescriptionUrl=videoDescriptionUrlResult.data.message;

					data={
						...data,
						videoData:{
							...videoData,
							videoUrl,
							videoDescription:videoDescriptionUrl
						}
					}
				}else{
					alert('Unfortunately there was an error getting this video. Please try again later');
				}
				changePostData(data);
				changeIsLoadingStatus(false);
			})
		}

		fetchData();
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

	const editPost=(editedVideoData)=>{
		postData.videoData.contextLocation.editPost(editedVideoData);
	}

	const deletePost=async()=>{
		changeDisplayDeleteConfirmation(true);
	}
  
	const triggerPromoteModal=()=>{
		postData.triggerPromoteModal(postData.videoData._id,"Videos");
	}

	const triggerVideoEditModal=()=>{
		changeVideoEditModal(true);
	}

	const closeDeleteConfirmationModal=()=>{
		changeDisplayDeleteConfirmation(false);
	}
	const closePollModal=()=>{
		changePollOptionModal(false);
	}
	const displayPollModalTrigger=(postData)=>{
		changeDisplayApprovePollModal(postData);
		changePollOptionModal(true);
	}
	const videoProps={
		video:postData.videoData,
		targetDom:postData.targetDom,
		triggerPromoteModal:triggerPromoteModal,
		displayEditModal:triggerVideoEditModal,
		deletePost:deletePost,
		pageType:postData.profileType,
		isOwnPostViewing:postData.isOwnProfile,
		personalId:personalId,
		closePostModal:postData.closePostModal,
		displayPollModal:displayPollModalTrigger,
		isGuestProfile
	}
	return(
		<React.Fragment>
			{displayPollOptionModal==true && (
				<PollOptionPortal
					closeModal={closePollModal}
					displayApproveModal={displayApprovePollOptionModal}
					postId={postData.videoData._id}
					postType={"Videos"}
					targetDom={postData.targetDom}
					isGuestProfile={isGuestProfile}
				/>
			)}

			{displayDeleteConfirmation==true &&(
				<DeletePostConfirmationPortal
					postType={"Posts"}
					selectedPostType={"Videos"}
					content={postData.videoData}
					closeModal={closeDeleteConfirmationModal}
					removeContextLocation={postData.videoData.contextLocation.removePost}
					targetDom={postData.targetDom}
				/>
			)}
				<Container>
					{isLoading==true?
						<p>Gives us one second while we get this post</p>:
						<React.Fragment>
							{displayMobileUI==true && displayVideoEditModal==false?
								<MobileUI
									{...videoProps}
								/>:
								<React.Fragment>
									{displayVideoEditModal==false?
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												<Video
													{...videoProps}
												/>
											</li>
										</ul>:
										<EditVideoModal
											videoSrc={postData.videoData.videoUrl}
											previousData={postData.videoData}
											editPost={editPost}
										/>
									}
								</React.Fragment>
							}
						</React.Fragment>
					}
				</Container>
		</React.Fragment>
	)
}

export default VideoContainer;