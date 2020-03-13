import React,{Component} from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import {  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton } from 'video-react';
import QierPlayer from 'qier-player';
import Comments from "../../../../GeneralComponents/CommentsComponent/index.js";



const Container=styled.div`
	position:relative;
	width:870px;
	height:95%;
	background-color:black;
	border-radius:5px;

`;

const OptionsContainer=styled.div`
	position:absolute;
	width:7%;
	height:75%;
	background-color:red;
	z-index:3;
	top:0%;
	left:90%;
`;

const SmallVideoModal=styled.div`

	position:relative;
	width:350px;
	height:300px;
	background-color:yellow;
	border-radius:5px;

`;

const CommentsContainer=styled.div`
	position:relative;
	width:380px;
	height:350px;
	background-color:blue;
	overflow-y:auto;
	border-radius:5px;



`;

const VideoCommentsAndModalContainer=styled.div`
	position:absolute;
	width:85%;
	height:80%;
	z-index:3;
	top:10%;
	left:2%;
	visibility: hidden;
	z-index:4;

`;

const ShadowContainer = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:rgba(0,0,0,0.4); /* Black w/ opacity */
	z-index:3;

`;

const DescriptionModal=styled.div`

	position:absolute;
	width:45%;
	height:45%;
	z-index:3;
	top:2%;
	left:5%;
	overflow-y:auto;
	border-radius:5px;
`;

const SmallProfileDescriptionPicture=styled.div`
	postion:relative;
	width:60px;
	height:28%;
	border-radius:50%;
	background-color:red;

`;

const IndustryContainer=styled.div`
	position:relative;
	background-color:white;
	text-align:center;
	width:60px;
	padding:10px;
	color:#5298F8;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;




class Video extends Component{


	constructor(props){
		super(props);

		this.state={
			displayComments:false,
			displayDescription:false,
			seconds:0
		}
	}


displayOrHideVideoAndComments=()=>{


	if(this.state.displayComments==true){
		const commentsAndVideoContainer=document.getElementById("commentsAndVideoContainer");
		commentsAndVideoContainer.style.visibility="visible";

		const videoElement=document.getElementById("video");
		const videoSeconds=videoElement.currentTime;
		videoElement.muted=true;
		const smallVideo=document.getElementById("smallVideo");
		smallVideo.currentTime=videoSeconds;
		smallVideo.play();

		//make api call to get comments
	}
	else{
		const commentsAndVideoContainer=document.getElementById("commentsAndVideoContainer");
		if(commentsAndVideoContainer!=null){
			const videoElement=document.getElementById("video");
			commentsAndVideoContainer.style.visibility="hidden";
			const smallVideo=document.getElementById("smallVideo");
			smallVideo.pause();
			videoElement.muted=false;
		}
	}
	
}

displayDescription=()=>{

	return this.state.displayDescription==false? <React.Fragment></React.Fragment>:
		<DescriptionModal>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",marginBottom:"2%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
							<SmallProfileDescriptionPicture>

							</SmallProfileDescriptionPicture>
						</li>

						<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",color:"white",marginRight:"35%"}}>
							<b>Nathan</b>
						</li>
						<li onClick={()=>this.setState({displayDescription:false})} style={{position:"relative",listStyle:"none",display:"inline-block",color:"white"}}>
							<b>Close</b>
						</li>
					</ul>
				</li>

				<li style={{listStyle:"none",marginBottom:"2%",padding:"5px",fontSize:"15px",color:"white"}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
					exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
					dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
					mollit anim id est laborum.
				</li>
			</ul>

		</DescriptionModal>


}


displayShadow=()=>{
	return this.state.displayComments==true?<ShadowContainer onClick={()=>this.setState({displayComments:false})}/>:
		<React.Fragment></React.Fragment>
}
//Like,Dislike,Comment,Share,Promote

	render(){
		return(
			<Container>

				
				{this.displayShadow()}
				<VideoCommentsAndModalContainer id="commentsAndVideoContainer">
					<ul style={{padding:"0px",position:"relative",zIndex:"5px"}}>

						<li style={{listStyle:"none",display:"inline-block",color:"yellow",marginRight:"2%"}}>
							<SmallVideoModal id="smallVideoMaodl">
								<video id="smallVideo" position="relative" height="100%" width="100%" controls autoplay>
								    <source src="https://www.w3schools.com/tags/movie.mp4" codecs="avc1.42E01E, mp4a.40.2"/>
								</video>

							</SmallVideoModal>
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<CommentsContainer>
								<Comments/>  

							</CommentsContainer>
						</li>
					</ul>
				</VideoCommentsAndModalContainer>

				{this.displayOrHideVideoAndComments()}

    			<video id="video" position="relative" height="100%" width="100%" controls autoplay>
				    <source src="https://www.w3schools.com/tags/movie.mp4" codecs="avc1.42E01E, mp4a.40.2"/>
				</video>

				{this.displayDescription()}

				<OptionsContainer>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",marginBottom:"20px"}}>
							Like
						</li>

						<li style={{listStyle:"none",marginBottom:"20px"}}>
							Dislike
						</li>

						<li onClick={()=>this.setState({displayComments:!this.state.displayComments})} style={{listStyle:"none",marginBottom:"20px"}}>
							Comments
						</li>

						<li style={{listStyle:"none",marginBottom:"20px"}}>
							Share
						</li>

						<li style={{listStyle:"none",marginBottom:"20px"}}>
							Promote
						</li>

						<li onClick={()=>this.setState({displayDescription:!this.state.displayDescription})} style={{listStyle:"none",marginBottom:"20px"}}>
							Description
						</li>
					</ul>

				</OptionsContainer>

			</Container>


		)
	}
}

export default Video;