import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ReplyIcon from '@material-ui/icons/Reply';
import BuildSharpIcon from '@material-ui/icons/BuildSharp';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
//import {concatVideoTogether} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import RefreshIcon from '@material-ui/icons/Refresh';
import CameraIcon from '@material-ui/icons/Camera';

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:45;
	top:0px;

	@media screen and (max-width:740px){
		left:-5%;
		width:120%;
	}
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:50%;
	top:20%;
	left:30%;
	z-index:45;
	height:60%;
	top:20%;
	border-radius:5px;
	overflow-y:scroll;
	padding:10px;

	@media screen and (max-width:1370px){
		width:80%;
		left:10%;
		#voiceOptionsLI{
			margin-left:-5% !important;
		}
	}

    @media screen and (max-width:700px){
			left:1% !important; 
			height:100% !important;
			width:100%;
    }

	@media screen and (max-width:420px){
			left:1% !important; 
			height:100% !important;
			width:100%;
			#voiceOptionsLI{
				margin-left:-5% !important;
			}
    }

    @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		height:70% !important;
		width:90% !important;
    }
`;

const RecordButton=styled.div`
	position:relative;
	width:55px;
	height:50px;
	border-radius:50%;
	background-color:white;
	padding:7px;
	@media screen and (max-width:1370px){

	}
`;

const ClipVideoContainer=styled.div`
	position:relative;
`;

const SubmitVideoDescriptionContainer=styled.div`
	position:relative;
	transform:rotateY(180deg)
`;

const VideoResultContainer=styled.div`
	position:relative;
	width:140px;
	height:90px;
	border-radius:5px;
	z-index:10;
`;

const VideoOptionCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"white",
	backgroundColor:"#5298F8",
	boxShadow:"2px 10px 10px #b9d6ff"
}


const VideoResultContainerCSS={
	position:"absolute",
	left:"70%",
	top:"5%",
	padding:"5px",
	backgroundColor:"white",
	height:"50%",
	borderRadius:"5px",
	overflowY:"scroll"
}


	const VideoDescriptionPortal=(props)=>{
		var targetContainer=document.getElementById(props.parentContainer);
		const [localStream,changeLocalStream]=useState();

		const [maxTime,changeMaxTime]=useState(10000);
		const [currentTime,changeCurrentTime]=useState(0);
		const [isRecording,changeRecordingState]=useState(false);
		const [videoElement,changeVideoElement]=useState();
		const [reInitilize,changeReInitliazed]=useState(false);

		const [mediaDevice,changeMediaDevice]=useState();
		const [firstDone,changeFirstDone]=useState(false);
		const [isMobileUI,changeIsMobileUI]=useState(false);

		const triggerUIChange=()=>{
			if(window.innerWidth<1370){
				changeIsMobileUI(true);
			}else{
				changeIsMobileUI(false);
			}
		}
		window.addEventListener('resize',triggerUIChange)
		useEffect(()=>{
			triggerUIChange();
		},[]);

		const recording=()=>{
			changeRecordingState(true);
			let video=document.getElementById("videoDescriptionVideo");
			changeVideoElement(null);
			if(!navigator.mediaDevices){
				alert('Unable to access voice/video cam. Either you computer does not have this option or something else(maybe an outdated browser). Sorry for the inconvience');
				props.closeModal();
			}else{
				try{
					debugger;
					let recorder =MediaRecorder.state;
					if (navigator.mediaDevices.getUserMedia){
						navigator.mediaDevices.getUserMedia({ 
						  		video: true,
						  		audio:true
						  	}).then(function(stream){
						  	video.muted='true'
					  	  	changeLocalStream(stream);
					     	video.srcObject = stream;
					     	return new Promise(resolve => video.onplaying = resolve);
						})
					    .then(()=>handleRecording(video.srcObject))
					    .then(recordedChunks=>{
						  	if(recordedChunks!=null){
						  	 	debugger;
							  	let recordedFile = new File(recordedChunks,'videoDescription2.mp4',{mime:"video/mp4",type:"video/mp4",lastModified:new Date()});
							  	var videoSrc=URL.createObjectURL(recordedFile);

								const videoObject={
									videoSrc,
									videoFile:recordedChunks[0]
								}

						  	 	changeVideoElement(videoObject);
						  	 	changeRecordingState(false);
						  	 	changeReInitliazed(true);
						  	 	changeFirstDone(true)
							}
						  }).catch(function (error) {
						  	console.log(error);
						  	changeRecordingState(false);
						  	alert('Unable to access voice/video cam. Either you computer does not have this option or something else. Sorry for the inconvience');
						  	closeModal();
					   	 });
					}
				}catch(err){
					alert('Unable to access voice/video cam. Either you computer does not have this option or something else(maybe an outdated browser). Sorry for the inconvience');
					props.closeModal();
				}
			}
		}

		const pauseRecording=(stream)=>{
			mediaDevice.stop();
			changeRecordingState(false);
		}
		const stopRecording=(stream)=>{
			debugger;
			if(isRecording!=false){
				mediaDevice.stop();
			}
			if(stream!=null){
				stream.getTracks().forEach(track => track.stop());
				stream.getVideoTracks()[0].stop();
				stream.getAudioTracks()[0].stop();
				changeRecordingState(false);
			}
		}

		const handleRecording=(stream)=>{
			debugger;
			var stoppedVideo;
			var data;
			let recorder = new MediaRecorder(stream);
			  data=[];

			  recorder.ondataavailable = event => data.push(event.data);
			  recorder.start();

			  stoppedVideo=new Promise((resolve, reject) => {
			    recorder.onstop = resolve;
			    recorder.onerror = event => reject(event.name);
			  });
			  changeMediaDevice(recorder);
		  return Promise.all([stoppedVideo]).then(()=>data);
		}

		const closeModal=()=>{
			stopRecording(localStream);
			props.closeModal()
		}

		const startRecording=()=>{
			changeRecordingState(true)
		}

		const submitVideoDescription=()=>{
			stopRecording(localStream);
			let reader=new FileReader();
			debugger;
			const maxSize=11*1024*1024;
			console.log(videoElement.videoFile.size);
			if(videoElement.videoFile.size>maxSize){
				alert('Your file is too large. We only accept video descriptions that have a size of 11MB. You can go to quicktime (Mac) and lower the resolution there.');
			}else{
				reader.onloadend=()=>{
					let url=reader.result;
					url=url.replace('data:video/x-matroska;codecs=avc1,opus;base64,',"data:video/quicktime;base64,");
					props.createVideoDescription(url);
				}
			  	reader.readAsDataURL(videoElement.videoFile);
			}
		}
		const reDoVideo=()=>{
			changeVideoElement(null);
		}
		const clickUploadVideoButton=()=>{
	 		document.getElementById("uploadedVideoDescription").click();
	 	}

	 	const handleMobileUploadedVideoDescription=()=>{
			let reader= new FileReader();
			const videoDescription=document.getElementById("uploadedVideoDescription").files[0];

			const maxSize=11*1024*1024;
			if(videoDescription.size>maxSize){
				alert('Your file is too large. We only accept video descriptions that have a size of 11MB. You can go to quicktime (Mac) and lower the resolution there.');
			}else{
				reader.onloadend=()=>{
					props.createVideoDescription(reader.result);
				}

				if(videoDescription!=null){
					reader.readAsDataURL(videoDescription);
				}
				else{
					alert("Sorry but this type of video is not currently allowed. Change it to either mov,mp4 to continue");
				}
			}
		}

		const mobileVideoDescription=()=>{
			alert('Just letting you know we only accept video descriptions that have a size of 11MB :( Sorry.')
			return(
				<>
					<div onClick={()=>props.closeModal()} style={{marginBottom:"5%"}}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
						 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
						 stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <circle cx="12" cy="12" r="9" />
						  <path d="M10 10l4 4m0 -4l-4 4" />
						</svg>
					</div>
					<p>We only allow .mov files as of right now unfortunately</p>
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={VideoOptionCSS}>
						<ul style={{padding:"0px"}} onClick={()=>clickUploadVideoButton()}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
								<CameraIcon/>
							</li>

							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
								Upload Video
							</li>
						</ul>																			
					</button>
					<input type="file" accept="video/*" id="uploadedVideoDescription" style={{opacity:0,zIndex:0,position:"relative",cursor:"pointer"}} 
						onChange={()=>handleMobileUploadedVideoDescription()}>
					</input>
				</>
			)
		}

		const desktopVideoDescription=()=>{
			return(
				<>	
					{videoElement!=null &&(
						<ul id="videoResultUL" style={VideoResultContainerCSS}>
							<VideoResultContainer>
								<video id={videoElement.videoSrc} width="100%" height="100%"  controls>
									<source src={videoElement.videoSrc} type="video/mp4"/>
								</video>
							</VideoResultContainer>
						</ul>
					)}
					<video id="videoDescriptionVideo" width="100%" height="100%" autoplay="true">
					</video>

					<ul id="videoControllerLI" style={{marginLeft:"35%",marginTop:"-10%",padding:"0px"}}>
						{isRecording==false &&(
							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<ClipVideoContainer onClick={()=>reDoVideo()}>
										<RefreshIcon
											id="refreshIconLI"
											style={{fontSize:40,color:"white"}}
										/>
									</ClipVideoContainer>
								</a>
							</li>
						)}

						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<RecordButton>
									{isRecording==false?
										<PlayArrowIcon
											onClick={()=>recording()}
											style={{fontSize:40,color:"#C8B0F4"}}
										/>:<PauseIcon
												onClick={()=>stopRecording(localStream)}
												style={{fontSize:40,color:"#C8B0F4"}}
										/>
									}
								</RecordButton>
							</a>
						</li>

						{isRecording==false &&(
							<li style={{listStyle:"none",display:"inline-block"}}>
								<SubmitVideoDescriptionContainer>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<ReplyIcon
											id="replyIconLI"
											onClick={()=>submitVideoDescription()}
											style={{fontSize:40,color:"white",zIndex:"4"}}
										/>
									</a>
								</SubmitVideoDescriptionContainer>
							</li>
						)}
					</ul>
				</>
			)
		}

		return createPortal(
			<React.Fragment>
				<ShadowContainer
					onClick={()=>closeModal()}
				/>
				<Container>
					{isMobileUI==true?
						<>{mobileVideoDescription()}</>:
						<>{desktopVideoDescription()}</>
					}
				</Container>
			</React.Fragment>
		,targetContainer)
	};
export default VideoDescriptionPortal;
