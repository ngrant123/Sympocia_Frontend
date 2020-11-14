import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ReplyIcon from '@material-ui/icons/Reply';
import BuildSharpIcon from '@material-ui/icons/BuildSharp';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
//import {concatVideoTogether} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import RefreshIcon from '@material-ui/icons/Refresh';
import {testIfUserIsUsingChrome} from "../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/VerifyBrowserIsChrome.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:22;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:70%;
	top:20%;
	left:20%;
	z-index:23;
	height:70%;
	top:10%;
	border-radius:5px;

	@media screen and (max-width:1030px) and (max-height:1370px){
			height:100% !important;
			width:100%;
    }

    @media screen and (max-width:770px){
			left:1% !important; 
			height:100% !important;
			width:100%;
    }

	@media screen and (max-width:420px){
			left:1% !important; 
			height:100% !important;
			width:100%;
			#videoControllerLI{
				margin-top:-80% !important;
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


	const [maxTime,changeMaxTime]=useState(10000);
	const [currentTime,changeCurrentTime]=useState(0);
	const [isRecording,changeRecordingState]=useState(false);
	const [videoElements,changeVideoElements]=useState([]);
	const [reInitilize,changeReInitliazed]=useState(false);

	const [mediaDevice,changeMediaDevice]=useState();
	const [firstDone,chnagFirstFone]=useState(false);

	useEffect(()=>{
		
		if(!testIfUserIsUsingChrome()){
			alert('Unfortunately your browser does not allow this option. Please switch to any other browser');
			props.closeModal();
		}else{
				let video=document.getElementById("videoDescriptionVideo");
				if (navigator.mediaDevices.getUserMedia){
					navigator.mediaDevices.getUserMedia({ 
							audio:true,
					  		video: true
					  	}).then(function(stream) {
					  	  video.muted='true'
					      video.srcObject = stream;
					      video.captureStream = video.captureStream || video.mozCaptureStream;
					    })
				    .then(()=>handleRecording(video.captureStream()))
				    .then(recordedChunks=>{
					  	 
					  	 if(recordedChunks!=null){
						  	 let recordedFile = new File(recordedChunks, { type: "video/mp4" });
						  	 var videoSrc=URL.createObjectURL(recordedFile);

						  	 var reader=new FileReader();

							reader.onloadend=()=>{
								var currentVideoElements=videoElements;

								const videoObject={
									videoSrc:reader.result,
									videoFile:recordedFile,
									videoCounter:currentVideoElements.length
								}
							  	 currentVideoElements.push(videoObject);

							  	 changeVideoElements(currentVideoElements);
							  	 changeRecordingState(false);
							  	 changeReInitliazed(true);
							  	 chnagFirstFone(true)
							}
						  	reader.readAsDataURL(recordedFile);
					  	 }
					  }).catch(function (error) {
				    });
				}	
		}
	},[]);

	const pauseRecording=(stream)=>{
		mediaDevice.stop();
		changeRecordingState(false);
	}
	const stopRecording=(stream)=>{
		if(isRecording!=false){
			mediaDevice.stop();
		}
		stream.getTracks().forEach(track => track.stop());
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
		stopRecording(document.getElementById("videoDescriptionVideo").captureStream());
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
		if(firstDone==true){
			handleRecording().then(recordedChunks=>{
						
					  	 if(recordedChunks!=null){
						  	let recordedFile = new File(recordedChunks, { type: "video/webm" });
						  	var videoSrc=URL.createObjectURL(recordedFile);

						  
						  	var reader=new FileReader();
							reader.onloadend=()=>{
								
								var currentVideoElements=videoElements;

								const videoObject={
									videoSrc:reader.result,
									videoFile:recordedFile,
									videoCounter:currentVideoElements.length
								}

							  	 currentVideoElements.push(videoObject);
							  	 changeVideoElements(currentVideoElements);

							  	 changeRecordingState(false);
							  	 changeReInitliazed(true);
							  	 chnagFirstFone(true)
							}

						  	 reader.readAsDataURL(recordedFile);
						  	 /*
						  	 	 const newVideoElement=document.createElement('video');
						  	 		const newVideoElementSource=document.createElement('source');
						  	 newVideoElementSource.src=videoSrc;
						  	 newVideoElement.append(newVideoElementSource);
						  	 */
					  	 }
			});
		}
		changeRecordingState(true)
	}

	const submitVideoDescription=()=>{
		
		if(videoElements.length>0){
			stopRecording(document.getElementById("videoDescriptionVideo").captureStream());
			props.createVideoDescription(videoElements[0].videoSrc);
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
							<ul style={VideoResultContainerCSS}>
								{videoElements.map(data=>
									<li style={{listStyle:"none",marginBottom:"4%"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<VideoResultContainer>
													<video id={'video'+data.videoCounter} width="100%" height="100%" autoplay="true" muted="muted">
														<source src={data.videoSrc} type="video/mp4"/>
													</video>
											</VideoResultContainer>
										</a>
									</li>
								)}
							</ul>:null
						}
					

					<video id="videoDescriptionVideo" transform="rotateY(180deg)" width="100%" height="100%" autoplay="true" zIndex="2">
					</video>

					<ul id="videoControllerLI" style={{marginLeft:"40%",marginTop:"-10%",padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<ClipVideoContainer onClick={()=>reDoVideo()}>
									<RefreshIcon
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
											onClick={()=>startRecording()}
											style={{fontSize:40,color:"#C8B0F4"}}
										/>:<PauseIcon
												onClick={()=>pauseRecording(document.getElementById("videoDescriptionVideo").captureStream())}
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