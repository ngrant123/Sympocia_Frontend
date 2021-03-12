import React,{useState} from "react";
import styled from "styled-components";
import {userActionsContainer} from "./OwnerInformationAndPostOption.js";
import {
	VideoDesriptionContainer,
	Image,
	StampIconEffect,
	Post
} from "./PostContainerCSS.js";
import StampIcon from "../../../../designs/img/StampIcon.png";
import VideoDescriptionMobileDisplayPortal from "../VideoDescriptionMobileDisplayPortal.js";
import ZoomedPostImageOrVideoPortal from "../ZoomedInPostImageOrVideo.js";

const Container=styled.div`	
	margin-top:10%;
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
   		margin-top:20%;
    }
`;
const postCaptionAndDescription=(caption,description)=>{
	return(
		<React.Fragment>
			<p style={{fontSize:"20px",listStyle:"none",height:"60px",overflowY:"hidden",marginBottom:"2%"}}>
				<b>
					{caption}
				</b>
			</p>

			<p style={{fontSize:"13px",color:"#8c8c8c",listStyle:"none",height:"50px",overflowY:"hidden"}}>
				{description}
			</p>
		</React.Fragment>
	)
}

const PostDisplayContainer=(props)=>{
	console.log(props);
	const [displayVideoDescriptionDisplay,changeVideoDescriptionDisplay]=useState(false);
	const [displayZoomedInPostDisplay,changeZoomedInPostDisplay]=useState(false);
	const {
		postData,
		displayStampEffect,
		displayMobileUI,
		userActions,
		targetDom,
		headlineText,
		secondaryText,
	}=props;

	const pauseVideoUrls=()=>{
		if(document.getElementById("videoDescription")!=null)
			document.getElementById("videoDescription").pause();

		if(document.getElementById("videoElement"))
			document.getElementById("videoElement").pause();
	}

	const displayVideoDescriptionContainer=()=>{	
		pauseVideoUrls();
		changeVideoDescriptionDisplay(true);
	}

	const displayVideoContainer=()=>{
		pauseVideoUrls();
		changeZoomedInPostDisplay(true)
	}

	const closeModal=()=>{
		if(document.getElementById("videoDescription")!=null)
			document.getElementById("videoDescription").play();
		
		changeVideoDescriptionDisplay(false);
		changeZoomedInPostDisplay(false);
	}

	return(
		<Container>
			{displayZoomedInPostDisplay==true &&(
				<ZoomedPostImageOrVideoPortal
					targetDom={targetDom}
					closeModal={closeModal}
					postUrl={postData.imgUrl==null?postData.videoUrl:postData.imgUrl}
					postType={postData.imgUrl!=null?"Images":"Videos"}
				/>
			)}
			{displayVideoDescriptionDisplay==true &&(
				<VideoDescriptionMobileDisplayPortal
					targetDom={targetDom}
					closeModal={closeModal}
					videoUrl={postData.videoDescription}
				/>
			)}
			<hr/>
			{postData.audioDescription!=null &&(
				<div style={{marginLeft:"10%",marginBottom:"2%"}}>
					<audio id="audio" style={{width:"800px"}} controls>
						<source src={postData.audioDescription} type="audio/ogg"/>
						<source src={postData.audioDescription} type="audio/mp4"/>
						Your browser does not support the audio element.
					</audio>
				</div>
			)}
			<Post>
				{postData.videoDescription==null?null:
					<VideoDesriptionContainer onClick={()=>displayVideoDescriptionContainer()}>
						<video id="videoDescription"
							width="100%" height="100%" borderRadius="50%"
							autoPlay loop autoBuffer playsInline>
							<source src={postData.videoDescription} type="video/mp4"/>
						</video>
					</VideoDesriptionContainer>
				}
				{displayStampEffect==true?
					<React.Fragment>
						<StampIconEffect
							id="stampEffect"
						>
							<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
						</StampIconEffect>
					</React.Fragment>:
					null
				}
				{postData.imgUrl==null?
					<VideoDesriptionContainer onClick={()=>displayVideoContainer()}>
						<video id="videoElement"
							width="100%" height="100%" borderRadius="50%"
							autoPlay loop autoBuffer muted playsInline>
							<source src={postData.videoUrl} type="video/mp4"/>
						</video>
					</VideoDesriptionContainer>
					:<Image onClick={()=>changeZoomedInPostDisplay(true)}>	
						<img id="image" src={postData.imgUrl} style={{width:"100%",height:"100%",borderRadius:"5px"}}/>
					</Image>
				}
			</Post>
			{displayMobileUI==true ?
				<React.Fragment>
					<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
						{userActionsContainer({...userActions})}
					</div>
				</React.Fragment>:
				<div id="postInformation">
					{postCaptionAndDescription(headlineText,secondaryText)}
				</div>
			}

		</Container>
	)
}

export{
	postCaptionAndDescription,
	PostDisplayContainer
};