import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import VideoDisplayContainer from "../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";

const ShadowContainerVideos=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:8;
	top:0px;
`;

const Container=styled.div`
	position:absolute;
	z-index:9;
	height:85%;
	width:95%;
	border-radius:5px;
	top:5%;
	left:10%;
	overflow-y:auto;
	background-color:white;
`;

const VideoHomeDisplayPortal=(props)=>{
	debugger;
	return createPortal(
		<React.Fragment>
			<ShadowContainerVideos onClick={()=>props.closeModal()}/>
			<Container>
				<VideoDisplayContainer
					videoData={props.selectedVideo}
					recommendedVideos={props.recommendedVideos}
				/>
			</Container>
		</React.Fragment>
	,document.getElementById("homePageContainer"));
}
export default VideoHomeDisplayPortal;