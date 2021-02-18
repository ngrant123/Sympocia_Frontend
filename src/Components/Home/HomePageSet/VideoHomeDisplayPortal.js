import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import VideoDisplayContainer from "../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";

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
	z-index:40;
	border-radius:5px;
	top:10%;
	margin-left:17%;
	overflow-y:auto;
	width:65%;
	height:70%;
	@media screen and (max-width:1370px){
		margin-left:2%;
		top:5%;
	}

	@media screen and (max-width:700px){
		margin-left:2% !important;
		left:-2% !important;
		top:0px !important;
    	width:100% !important;
    	height:100% !important;
    	border-radius:5px !important;
    }
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	width:80% !important;
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:0%;
    	height:90%;
    	width:110% !important;
    }
`;


const VideoContainer=styled.div`
	padding:20px;
	 @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	width:90%;
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
				<VideoContainer>
					<VideoDisplayContainer
						videoData={props.selectedVideo}
						recommendedVideos={props.recommendedVideos}
						targetDom={props.targetDom}
						closePostModal={closePostsModal}
					/>
				</VideoContainer>
			</Container>
		</React.Fragment>
	,document.getElementById(props.targetDom));
}

export default VideoHomeDisplayPortal;