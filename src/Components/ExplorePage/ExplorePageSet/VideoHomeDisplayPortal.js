import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import VideoContainer from "../../GeneralComponents/PostComponent/ImageAndVideoDisplay/PostContainer.js";
import {VideoDisplayContainer} from "../../GeneralComponents/PostComponent/VideoComponent/indexCSS.js";

const ShadowContainerVideos=styled.div`
	position:fixed;
	width:110%;
	left:-10%;
	height:130%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	background-color:red;
	z-index:40;
	height:90%;
	width:70%;
	border-radius:5px;
	top:5%;
	left:20%;
	background-color:white;
	padding:20px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		left:5%;
		width:90%;
	}
	@media screen and (max-width:700px){
		width:100% !important;
		height:100% !important;
		margin-right:-10% !important;
		top:5% !important;
		margin-left:-5% !important;
	}
`;


const VideoHomeDisplayPortal=(props)=>{
	const closePostsModal=()=>{
		props.closeModal()
	}
	return createPortal(
		<React.Fragment>
			<ShadowContainerVideos onClick={()=>props.closeModal()}/>
			<Container>
				<VideoDisplayContainer>
					<VideoContainer
						videoData={props.selectedVideo}
						recommendedVideos={props.recommendedVideos}
						targetDom={props.targetDom}
						closePostModal={closePostsModal}
					/>
				</VideoDisplayContainer>
			</Container>
		</React.Fragment>
	,document.getElementById(props.targetDom));
}

export default VideoHomeDisplayPortal;