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
	top:5%;
	left:5%;
	overflow-y:auto;
	background-color:white;

	@media screen and (max-width:1370px){
		left:2%;
	}
	@media screen and (max-width:840px){
		left:5%;
	}
`;


const VideoContainer=styled.div`
	 @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	width:90%;
    }

`;
const VideoHomeDisplayPortal=(props)=>{
	return createPortal(
		<React.Fragment>
			<ShadowContainerVideos onClick={()=>props.closeModal()}/>
			<Container>
				<VideoContainer>
					<VideoDisplayContainer
						videoData={props.selectedVideo}
						recommendedVideos={props.recommendedVideos}
						targetDom={props.targetDom}
					/>
				</VideoContainer>
			</Container>
		</React.Fragment>
	,document.getElementById(props.targetDom));
}

export default VideoHomeDisplayPortal;