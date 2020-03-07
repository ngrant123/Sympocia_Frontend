import React,{Component} from "react";
import styled from "styled-components";
import Video from "./Video.js";
import RecommendedVideos from "./RecommendedVideos.js";

const Container=styled.div`
	position:relative;
	width:90%;
	height:60%;
	background-color:red;
	z-index:3;
	border-radius:5px;
	padding:5px;
`;

const VideoContainer=()=>{


	return(

		<Container>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"3%"}}>
					<Video/> 

				</li>

				<li style={{listStyle:"none",display:"inline-block"}}>
					<RecommendedVideos/>
				</li> 

			</ul>

		</Container>
	)
}

export default VideoContainer;