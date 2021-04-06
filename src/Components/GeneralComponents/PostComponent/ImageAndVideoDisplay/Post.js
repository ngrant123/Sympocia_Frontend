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
	display:flex;
	flex-direction:column;
	@media screen and (max-width:1370px){
		#audioOnClickDiv{
			width:500px !important;
		}

		#audioDescription{
			width:500px !important;
		}
	}

	@media screen and (max-width:650px){
		#audioOnClickDiv{
			width:200px !important;
		}

		#audioDescription{
			width:200px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
   		margin-top:10%;
   		#mobileUserActions{
   			display:none !important;
   		}
    }
`;
const postCaptionAndDescription=(caption,description)=>{
	return(
		<React.Fragment>
			<p style={{marginTop:"5%",fontSize:"20px",listStyle:"none",marginBottom:"2%"}}>
				<b>
					{caption}
				</b>
			</p>

			<p style={{marginTop:"10%",fontSize:"13px",color:"#8c8c8c",listStyle:"none"}}>
				{description}
			</p>
		</React.Fragment>
	)
}

const PostDisplayContainer=(props)=>{
	const [displayVideoDescriptionDisplay,changeVideoDescriptionDisplay]=useState(false);
	const [displayZoomedInPostDisplay,changeZoomedInPostDisplay]=useState(false);
	let isVideoDescriptionPaused=false;
	const {
		postData,
		displayStampEffect,
		displayMobileUI,
		userActions,
		targetDom,
		headlineText,
		secondaryText,
	}=props;

	const containsVideoDescriptionAndIsImage=(postData.imgUrl==null?false:true)&&(postData.videoDescription==null?false:true);


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

	const playAudio=()=>{
		const audio=document.getElementById("audioDescription");
		if(document.getElementById("videoDescription")!=null && audio!=null){
			const currentTime=audio.currentTime;
			const duration=audio.duration;
			if(currentTime==duration || isVideoDescriptionPaused==false){
				isVideoDescriptionPaused=true;
				audio.play();
				document.getElementById("videoDescription").pause();
			}else if(isVideoDescriptionPaused==true){
				isVideoDescriptionPaused=false;
				audio.pause();
				document.getElementById("videoDescription").play();
			}
		}
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
					{postData.videoDescription!=null &&(
						<div id="audioOnClickDiv" onClick={()=>playAudio()} style={{cursor:"pointer",zIndex:"7",position:"absolute",width:"800px",height:"7%"}}>
						</div>
					)}
					<audio id="audioDescription" style={{width:"800px"}} controls>
						<source src={postData.audioDescription} type="audio/ogg"/>
						<source src={postData.audioDescription} type="audio/mp4"/>
						Your browser does not support the audio element.
					</audio>
				</div>
			)}
			<Post isImagePost={containsVideoDescriptionAndIsImage}>
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
					<div id="mobileUserActions" style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
						{userActionsContainer({...userActions})}
					</div>
				</React.Fragment>:
				<div  id="postInformation" style={{display:"flex",justifyContent:"center"}}>
					<div style={{width:"70%",padding:"20px"}}>
						{postCaptionAndDescription(headlineText,secondaryText)}
					</div>
				</div>
			}

		</Container>
	)
}

export{
	postCaptionAndDescription,
	PostDisplayContainer
};