import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ReplyIcon from '@material-ui/icons/Reply';
import BuildSharpIcon from '@material-ui/icons/BuildSharp';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
//import {concatVideoTogether} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import RefreshIcon from '@material-ui/icons/Refresh';

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
	width:70%;
	top:20%;
	left:20%;
	z-index:45;
	height:70%;
	top:10%;
	border-radius:5px;

	@media screen and (max-width:1370px){
		left:5%;
		height:50%;
		width:90%;
	}

    @media screen and (max-width:700px){
			left:1% !important; 
			height:100% !important;
			width:100%;
			#videoControllerLI{
				margin-top:-50% !important;
				margin-left:25% !important;

				#refreshIconLI{
					color:black !important;
				}
				#replyIconLI{
					color:black !important;
				}
			}
			#videoResultUL{
				height:30% !important;
				left:50% !important;
			}

    }
    @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
    	height:80% !important;
    	width:90% !important;
		#videoControllerLI{
			margin-top:-10% !important;
		}
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

//"blob:http://localhost:3000/9b5bb4e0-de5b-4e15-b127-1f05aeaaeb36"

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

	const recording=()=>{
		debugger;
		changeRecordingState(true);
		let video=document.getElementById("videoDescriptionVideo");
		if(!navigator.mediaDevices){
			alert('Unable to access voice/video cam. Either you computer does not have this option or something else. Sorry for the inconvience');
			props.closeModal();
		}else{
			if (navigator.mediaDevices.getUserMedia){
				console.log(navigator.mediaDevices.getUserMedia);
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
			    	debugger;
				  	 if(recordedChunks!=null){
						  	let recordedFile = new File(recordedChunks,'videoDescription.mp4',{type:"video/quicktime",lastModified:new Date()});
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
			reader.onloadend=()=>{
				let videoDescriptionResult=reader.result;
				videoDescriptionResult=videoDescriptionResult.replace('data:application/octet-stream','data:video/mp4');
				props.createVideoDescription(videoDescriptionResult);
			}
		  	reader.readAsDataURL(videoElements[0].videoFile);
		}else{
			alert('Create a video to continue or press the exit button on the top left');
		}
	}

	/*

	const displayEditVideoScreen=async()=>{
		
		const fileArray=[];
		for(var i=0;i<videoElements.length;i++){

			const {videoFile,videoCounter}=videoElements[i];
			const videoElement=document.getElementById('video'+videoCounter);
			const videoDuration=videoElement.duration;

			const videoObject={
				file:videoFile,
				duration:videoDuration
			}
			fileArray.push(videoObject);
		}
		const concatedVideos=await concatVideoTogether(fileArray);
	}
	*/
	const reDoVideo=()=>{
		
		videoElements.splice(0,videoElements.length);
		var newVideoElements=videoElements;
		changeVideoElements(newVideoElements);
		changeReInitliazed(true);
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
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
				
				{/*
					<video id="videoDescriptionVideo" transform="rotateY(180deg)" width="100%" height="100%" autoplay="true">
					</video>
				*/}
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
			</Container>
		</React.Fragment>
	,targetContainer)
};

export default VideoDescriptionPortal;