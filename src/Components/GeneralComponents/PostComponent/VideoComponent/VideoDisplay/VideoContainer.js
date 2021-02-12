import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Video from "./Video.js";
import RecommendedVideos from "./RecommendedVideos.js";
import EditVideoModal from "../VideoCreation/EditVideoModal.js";
import MobileUI from "./MobileUI.js";
import DeletePostConfirmationPortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";
import {useSelector} from "react-redux";
import PollOptionPortal from "../../PollOptionPortal.js";

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

	const userInformation=useSelector(state=>state.personalInformation);
	const isGuestProfile=(userInformation.id=="0" || userInformation.isGuestProfile==true)==true?
						true:false;

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

	const editPost=(editedVideoData)=>{
		data.videoData.contextLocation.editPost(editedVideoData);
	}

	const deletePost=async()=>{
		changeDisplayDeleteConfirmation(true);
	}
  
	const triggerPromoteModal=()=>{
		data.triggerPromoteModal(data.videoData._id,"Videos");
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
	const displayPollModalTrigger=(data)=>{
		changeDisplayApprovePollModal(data);
		changePollOptionModal(true);
	}
	const videoProps={
		video:data.videoData,
		targetDom:data.targetDom,
		triggerPromoteModal:triggerPromoteModal,
		displayEditModal:triggerVideoEditModal,
		deletePost:deletePost,
		pageType:data.profileType,
		isOwnPostViewing:data.isOwnProfile,
		personalId:personalId,
		closePostModal:data.closePostModal,
		displayPollModal:displayPollModalTrigger,
		isGuestProfile
	}
	return(
		<React.Fragment>
			{displayPollOptionModal==true && (
				<PollOptionPortal
					closeModal={closePollModal}
					displayApproveModal={displayApprovePollOptionModal}
					postId={data.videoData._id}
					postType={"Videos"}
					targetDom={data.targetDom}
				/>
			)}

			{displayDeleteConfirmation==true &&(
				<DeletePostConfirmationPortal
					postType={"Posts"}
					selectedPostType={"Videos"}
					content={data.videoData}
					closeModal={closeDeleteConfirmationModal}
					removeContextLocation={data.videoData.contextLocation.removePost}
					targetDom={data.targetDom}
				/>
			)}
				<Container>
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
									videoSrc={data.videoData.videoUrl}
									previousData={data.videoData}
									editPost={editPost}
								/>
							}
						</React.Fragment>
					}
				</Container>
		</React.Fragment>
	)
}

export default VideoContainer;