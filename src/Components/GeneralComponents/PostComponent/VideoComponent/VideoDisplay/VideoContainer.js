import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Video from "./Video.js";
import RecommendedVideos from "./RecommendedVideos.js";
import EditVideoModal from "../VideoCreation/EditVideoModal.js";
import MobileUI from "./MobileUI.js";
import {testIfUserIsUsingChrome} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/VerifyBrowserIsChrome.js";


const Container=styled.div`
	position:fixed;
	width:85%;
	height:70%;
	z-index:12;
	border-radius:5px;
	background-color:white;
	border-radius:5px;
	padding:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
	overflow-y:auto;
`;

const VideoContainer=(data)=>{
	const [displayVideoEditModal,changeVideoEditModal]=useState(false);
	const [displayMobileUI,changeUIStatus]=useState(false);

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
		const removeVideos={
			postType:"Videos",
			postId:data.videoData._id,
			industriesUploaded:data.videoData.industriesUploaded,
			profileId:data.videoData.owner._id
		}
		const {confirmation,data}=await deletePost(removeVideos);
		
		if(confirmation=="Success"){
			data.videoData.contextLocation.removePost(data.videoData._id,"Videos");
		}else{
			alert('Unfortunately there has been an error deleting this post. Please try again');
		}
	}
	const triggerPromoteModal=()=>{
		data.triggerPromoteModal(data.videoData._id,"Videos");
	}

	const triggerVideoEditModal=()=>{
		changeVideoEditModal(true);
	}
	return(
		<React.Fragment>
			{displayMobileUI==true?
				<MobileUI
					videoData={data.videoData}
					isChromeBrowser={testIfUserIsUsingChrome()}
					targetDom={data.targetDom}
					deletePost={deletePost}
					pageType={data.profileType}
					isOwnPostViewing={data.isOwnProfile}
					triggerPromoteModal={triggerPromoteModal}
				/>:
				<Container>
				{displayVideoEditModal==false?
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
							<Video
								video={data.videoData}
								profileType={data.profileType}
								targetDom={data.targetDom}
								triggerPromoteModal={triggerPromoteModal}
								displayEditModal={triggerVideoEditModal}
								deletePost={deletePost}
								pageType={data.profileType}
								isOwnPostViewing={data.isOwnProfile}
							/>
						</li>
						{data.recommendedVideos!=null?
							<li style={{listStyle:"none",display:"inline-block"}}>
								<RecommendedVideos
									videos={data.recommendedVideos}
								/>
							</li>:null
						}
					</ul>:
					<EditVideoModal
						videoSrc={data.videoData.videoUrl}
						previousData={data.videoData}
						editPost={editPost}
					/>
				}
				</Container>
			}
		</React.Fragment>
	)
}

export default VideoContainer;