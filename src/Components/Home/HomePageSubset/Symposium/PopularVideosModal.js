import React from "react";
import styled from "styled-components";
import VideoDisplayContainer from "../../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";

const PopularVideosContainer=styled.div`
	position:relative;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:10%;
	width:80%;
	height:73%;
	padding:10px;
	overflow-y:scroll;
	z-index:16;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
`;

const PopularVideosModal=(props)=>{
	return(
		<PopularVideosContainer>
			<ul style={{padding:"10px"}}>
				{props.popularVideos.map(data=>
					<li style={{listStyle:"none"}}>
						<VideoDisplayContainer
							videoData={data}
							recommendedVideos={[]}
						/>
					</li>
				)}
			</ul>
		</PopularVideosContainer>
	)
}
export default PopularVideosModal;