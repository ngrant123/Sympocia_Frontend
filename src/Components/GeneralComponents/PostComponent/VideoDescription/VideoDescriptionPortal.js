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

{/*
	const VideoDescriptionPortal=(props)=>{
		var targetContainer=document.getElementById(props.parentContainer);
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
			const inputElement=document.getElementById("uploadedVideoDescription");
			inputElement.click();
		},[]);

		const clickUploadVideoButton=()=>{
	 		document.getElementById("uploadedVideoDescription").click();
	 	}

		const handleUploadedVideoDescription=()=>{
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

		return createPortal(
			<React.Fragment>
				<ShadowContainer
					onClick={()=>props.closeModal()}
				/>
				<Container>
					{isMobileUI==true?
						<p>Unfortunately this feature is only available for desktops :(</p>:
						<React.Fragment>
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
								onChange={()=>handleUploadedVideoDescription()}>
							</input>
						</React.Fragment>
					}
				</Container>
			</React.Fragment>,
			targetContainer
		)
	}
*/}


	const VideoDescriptionPortal=(props)=>{
		var targetContainer=document.getElementById(props.parentContainer);
		const [localStream,changeLocalStream]=useState();

		const [maxTime,changeMaxTime]=useState(10000);
		const [currentTime,changeCurrentTime]=useState(0);
		const [isRecording,changeRecordingState]=useState(false);
		const [videoElements,changeVideoElements]=useState([]);
		const [reInitilize,changeReInitliazed]=useState(false);

		const [mediaDevice,changeMediaDevice]=useState();
		const [firstDone,chnagFirstDone]=useState(false);
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
			if(!navigator.mediaDevices){
				alert('Unable to access voice/video cam. Either you computer does not have this option or something else. Sorry for the inconvience');
				props.closeModal();
			}else{
				if (navigator.mediaDevices.getUserMedia){
					navigator.mediaDevices.getUserMedia({ 
					  		video: true,
					  		audio:true
					  	}).then(function(stream) {
					  	  video.muted='true'
					  	  changeLocalStream(stream);
					      video.srcObject = stream;
					      video.captureStream = video.captureStream || video.mozCaptureStream;
					      return new Promise(resolve => video.onplaying = resolve);
					    })
				    .then(()=>handleRecording(video.captureStream()))
				    .then(recordedChunks=>{
					  	 if(recordedChunks!=null){
							  	let recordedFile = new File(recordedChunks,'videoDescription2.mp4',{mime:"video/mp4",type:"video/mp4",lastModified:new Date()});
							  	var videoSrc=URL.createObjectURL(recordedFile);
								var currentVideoElements=videoElements;

								const videoObject={
									videoSrc,
									videoFile:recordedFile,
									videoCounter:currentVideoElements.length
								}

							  	 currentVideoElements.push(videoObject);
							  	 changeVideoElements(currentVideoElements);
							  	 changeRecordingState(false);
							  	 changeReInitliazed(true);
							  	 chnagFirstDone(true)
							}
					  }).catch(function (error) {
					  	alert('Unable to access voice/video cam. Either you computer does not have this option or something else. Sorry for the inconvience');
				   	 });
				}
			}
		}

		const pauseRecording=(stream)=>{
			mediaDevice.stop();
			changeRecordingState(false);
		}
		const stopRecording=(stream)=>{
			if(isRecording!=false){
				mediaDevice.stop();
			}
			stream.getTracks().forEach(track => track.stop());
			stream.getVideoTracks()[0].stop();
			stream.getAudioTracks()[0].stop();
			changeRecordingState(false);
		}

		const handleRecording=(stream)=>{
			var stoppedVideo;
			var data;
			 if(firstDone==true){
			 	
				  data=[];

				  mediaDevice.ondataavailable = event => data.push(event.data);
				  mediaDevice.start();

				  stoppedVideo=new Promise((resolve, reject) => {
				    mediaDevice.onstop = resolve;
				    mediaDevice.onerror = event => reject(event.name);
				  });
				  //changeRecordingState(true);
			 }else{
			 	
				  let recorder = new MediaRecorder(stream);
				  data=[];

				  recorder.ondataavailable = event => data.push(event.data);
				  recorder.start();

				  stoppedVideo=new Promise((resolve, reject) => {
				    recorder.onstop = resolve;
				    recorder.onerror = event => reject(event.name);
				  });
				  changeMediaDevice(recorder);
				  //changeRecordingState(true);
			 }
			  return Promise.all([stoppedVideo]).then(()=>data);
		}

		const closeModal=()=>{
			if(isRecording!=false)
				stopRecording(localStream);
			props.closeModal()
		}

		const test=()=>{
			if(reInitilize==true && videoElements.length>0){
				var newElements=videoElements;
				changeVideoElements(newElements);
				changeReInitliazed(false);
			}
		}

		const startRecording=()=>{
			changeRecordingState(true)
		}

		const submitVideoDescription=()=>{
			
			if(videoElements.length>0){
				stopRecording(localStream);
				let reader=new FileReader();
				debugger;
				const maxSize=11*1024*1024;
				console.log(videoElements[0].videoFile.size);
				if(videoElements[0].videoFile.size>maxSize){
					alert('Your file is too large. We only accept video descriptions that have a size of 11MB. You can go to quicktime (Mac) and lower the resolution there.');
				}else{
					reader.onloadend=()=>{
						props.createVideoDescription(reader.result);
					}
				  	reader.readAsDataURL(videoElements[0].videoFile);
				}
			}else{
				alert('Create a video to continue or press the exit button on the top left');
			}
		}
		const reDoVideo=()=>{
			
			videoElements.splice(0,videoElements.length);
			var newVideoElements=videoElements;
			changeVideoElements(newVideoElements);
			changeReInitliazed(true);
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
					{test()}
					{videoElements.length>0?
						<ul id="videoResultUL" style={VideoResultContainerCSS}>
							{videoElements.map(data=>
								<li style={{listStyle:"none",marginBottom:"4%"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<VideoResultContainer>
												<video id={'video'+data.videoCounter} width="100%" height="100%"  controls>
													<source src={data.videoSrc} type="video/mp4"/>
												</video>
										</VideoResultContainer>
									</a>
								</li>
							)}
						</ul>:null
					}
					<video id="videoDescriptionVideo" width="100%" height="100%" autoplay="true">
					</video>

					<ul id="videoControllerLI" style={{marginLeft:"40%",marginTop:"-10%",padding:"0px"}}>
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

						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<RecordButton>
									{isRecording==false?
										<PlayArrowIcon
											onClick={()=>recording()}
											style={{fontSize:40,color:"#C8B0F4"}}
										/>:<PauseIcon
												onClick={()=>pauseRecording(document.getElementById("videoDescriptionVideo").srcObject)}
												style={{fontSize:40,color:"#C8B0F4"}}
										/>
									}
								</RecordButton>
							</a>
						</li>

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
					{mobileVideoDescription()}
					{/*
						{isMobileUI==true?
							<>{mobileVideoDescription()}</>:
							<>{desktopVideoDescription()}</>
						}
					*/}
				</Container>
			</React.Fragment>
		,targetContainer)
	};
export default VideoDescriptionPortal;
