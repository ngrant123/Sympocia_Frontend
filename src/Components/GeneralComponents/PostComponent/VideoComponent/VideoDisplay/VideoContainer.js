import React,{useState} from "react";
import styled from "styled-components";
import Video from "./Video.js";
import RecommendedVideos from "./RecommendedVideos.js";
import EditVideoModal from "../VideoCreation/EditVideoModal.js";

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

	console.log("Popup video modal");
	console.log(data);

	const editPost=(editedVideoData)=>{
		data.videoData.contextLocation.editPost(editedVideoData);
	}
	const deletePost=()=>{
		data.videoData.contextLocation.removePost(data.videoData._id,"Videos");
	}

	const triggerVideoEditModal=()=>{
		changeVideoEditModal(true);
	}
	return(
		<Container>
			{displayVideoEditModal==false?
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
						<Video
							video={data.videoData}
							profileType={data.profileType}
							targetDom={data.targetDom}
							triggerPromoteModal={data.triggerPromoteModal}
							displayEditModal={triggerVideoEditModal}
							deletePost={deletePost}
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
	)
}

export default VideoContainer;