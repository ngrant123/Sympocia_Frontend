import React from "react";
import styled from "styled-components";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	align-items:center;
	justify-content:center;

	@media screen and (max-width:1370px){
		flex-direction:column;
	}
`;

const VideoContainer=styled.div`
	margin-left:20%;
	@media screen and (max-width:1370px){
		margin-left:2%;
		#videoElement{
			width:600px !important;
			height:500px !important;
			margin-bottom:10% !important;
		}
	}

	@media screen and (max-width:600px){
	  	#videoElement{
			width:300px !important;
			height:300px !important;
			margin-bottom:0% !important;
		}
	}
`;

const VideoDescription=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:5%;
`;

const InterviewDisplay=({video,title,description})=>{
	return(
		<Container>
			<VideoContainer>
				<video id="videoElement" width="600" height="400" controls>
					<source src={video}/>
				</video>
			</VideoContainer>

			<VideoDescription>
				<p>	
					<b>{title}</b>
				</p>
				<p>{description}</p>
				<p style={{color:"#5298F8"}}> Hope you enjoy :) </p>
			</VideoDescription>
		</Container>
	)
}

export default InterviewDisplay;