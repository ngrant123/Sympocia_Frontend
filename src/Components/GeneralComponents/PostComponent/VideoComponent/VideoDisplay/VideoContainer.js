import React,{Component} from "react";
import styled from "styled-components";
import Video from "./Video.js";
import RecommendedVideos from "./RecommendedVideos.js";

const Container=styled.div`
	position:fixed;
	width:100%;
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
	console.log("Popup video modal");
	console.log(data);
	return(
		<Container>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
					<Video
						video={data.videoData}
						profileType={data.profileType}
					/>  
				</li>
				<li style={{listStyle:"none",display:"inline-block"}}>
					<RecommendedVideos
						videos={data.recommendedVideos}
					/>
				</li> 
			</ul>
		</Container>
	)
}

export default VideoContainer;