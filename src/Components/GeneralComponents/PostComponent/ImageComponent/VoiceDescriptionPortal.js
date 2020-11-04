import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ReplyIcon from '@material-ui/icons/Reply';
import BuildSharpIcon from '@material-ui/icons/BuildSharp';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RefreshIcon from '@material-ui/icons/Refresh';

import MicIcon from '@material-ui/icons/Mic';

//<Icon icon={scissorsCutting} />

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
	width:50%;
	top:20%;
	left:30%;
	z-index:23;
	height:60%;
	top:20%;
	border-radius:5px;


	@media screen and (max-width:1030px) and (max-height:1370px){
		#recordingContainer{
			height:100% !important;
			width:100%;
			left:5% !important; 
		}
    }

    @media screen and (max-width:770px){
    	#recordingContainer{
			left:1% !important; 
			height:100% !important;
			width:100%;
		}
    }

	@media screen and (max-width:420px){
		#recordingContainer{
			left:1% !important; 
			height:100% !important;
			width:100%;
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

const StartButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const StopButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#C8B0F4",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#C8B0F4"
}

const ContinueButtonCSS={
  listStyle:"none",
  backgroundColor:"#C8B0F4",
  borderRadius:"5px",
  padding:"10px",
  color:"white",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#C8B0F4",
  marginTop:"2%",
  width:"30%"
}

//"blob:http://localhost:3000/9b5bb4e0-de5b-4e15-b127-1f05aeaaeb36"

const VoiceDescriptionPortal=(props)=>{
	console.log("Testing video description");

	const [maxTime,changeMaxTime]=useState(10000);
	const [currentTime,changeCurrentTime]=useState(0);
	const [isRecording,changeRecordingState]=useState(false);
	const [videoElements,changeVideoElements]=useState([]);
	const [reInitilize,changeReInitliazed]=useState(false);

	const [mediaDevice,changeMediaDevice]=useState();
	const [firstDone,chnagFirstFone]=useState(false);

	useEffect(()=>{
		var video=document.getElementById("video");
				if (navigator.mediaDevices.getUserMedia){
					  navigator.mediaDevices.getUserMedia({
					  		audio:true 
					  	}).then(stream=>handleRecording(stream))
				   		.then(recordedChunks=>{
					  	 debugger;
					  	 if(recordedChunks!=null){
					  	 	console.log("Recorded chunks");
						  	 let recordedFile = new File(recordedChunks, { type: "video/mp4" });
						  	 var videoSrc=URL.createObjectURL(recordedFile);

						  	 var reader=new FileReader();

							reader.onloadend=()=>{
								debugger;
								console.log(reader.result);
								var currentVideoElements=videoElements;

								const videoObject={
									audioSrc:reader.result,
									videoFile:recordedFile,
									videoCounter:currentVideoElements.length
								}
							  	 currentVideoElements.push(videoObject);

							  	 changeVideoElements(currentVideoElements);
							  	 changeRecordingState(false);
							  	 changeReInitliazed(true);

							  	 console.log("Array added");
							  	 chnagFirstFone(true)
							}
						  	 reader.readAsDataURL(recordedFile);
					  	 }
					  	 
					  }).catch(function (error) {
				      console.log("Something went wrong!");
				      console.log(error);
				    });
			}	
	},[]);

	const stopRecording=(stream)=>{
		mediaDevice.stop();
		//stream.getTracks().forEach(track => track.stop());
		changeRecordingState(false);
	}

	const handleRecording=(stream)=>{
		var stoppedVideo;
		var data;
		 if(firstDone==true){
		 	debugger;
			  data=[];

			  mediaDevice.ondataavailable = event => data.push(event.data);
			  mediaDevice.start();

			  stoppedVideo=new Promise((resolve, reject) => {
			    mediaDevice.onstop = resolve;
			    mediaDevice.onerror = event => reject(event.name);
			  });
			  //changeRecordingState(true);
		 }else{
		 	debugger;
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
		var videoElement=document.getElementById("video");
		stopRecording(videoElement);
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
						debugger;
					  	 if(recordedChunks!=null){
					  	 	console.log("Recorded chunks");
						  	let recordedFile = new File(recordedChunks, { type: "audio/mpeg-3" });
						  	var audioSrc=URL.createObjectURL(recordedFile);

						  
						  	var reader=new FileReader();
							reader.onloadend=()=>{
								debugger;
								var currentVideoElements=videoElements;
								console.log(reader.result);

								const videoObject={
									audioSrc:reader.result,
									videoFile:recordedFile,
									videoCounter:currentVideoElements.length
								}

							  	 currentVideoElements.push(videoObject);
							  	 changeVideoElements(currentVideoElements);

							  	 changeRecordingState(false);
							  	 changeReInitliazed(true);
							  	 console.log("Array added");
							  	 chnagFirstFone(true)
							}

						  	 reader.readAsDataURL(recordedFile);
						  	 /*
						  	 	 const newVideoElement=document.createElement('video');
						  	 		const newVideoElementSource=document.createElement('source');
						  	 newVideoElementSource.src=audioSrc;
						  	 newVideoElement.append(newVideoElementSource);
						  	 */
					  	 }
			});
		}
		changeRecordingState(true)
	}

	const submitVideoDescription=()=>{
		debugger;
		if(videoElements.length>0){
			props.createAudioDescription(videoElements[0].audioSrc);
		}else{
			alert('Create a video to continue or press the exit button on the top left');
		}
	}

	/*

	const displayEditVideoScreen=async()=>{
		debugger;
		console.log(videoElements);
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
		debugger;
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
				<ul id="recordingContainer" style={{marginLeft:"20%",marginTop:"10%"}}>
					<li style={{listStyle:"none",marginBottom:"5%"}}>
						<p>Click start recording to get started and then when you're all done click the continue buttonp</p>
						<p> 
							<b>If audio is messed up click redo button and just do it again sorry :(</b>
						</p>
					</li>
					<li style={{listStyle:"none",marginBottom:"5%",marginTop:"10%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
								<MicIcon
									style={{fontSize:50}}
								/>
							</li>

							{isRecording==false?
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>startRecording()} style={StartButtonCSS}>
										Start Recording
									</li>
								</a>:
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>stopRecording()} style={StopButtonCSS}>
										Stop Recording
									</li>
								</a>
							}
							<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
								<RefreshIcon
									onClick={()=>reDoVideo()}
									style={{fontSize:20}}
								/>
							</li>
						</ul>
					</li>
					{videoElements.length>0?
						<li style={{listStyle:"none"}}>
							<audio controls>
							  <source src={videoElements[0].audioSrc} type="audio/ogg"/>
							  <source src={videoElements[0].audioSrc} type="audio/mpeg"/>
							Your browser does not support the audio element.
							</audio>
						</li>:null
					}
					
					<li onClick={()=>submitVideoDescription()} style={ContinueButtonCSS}>
						Continue
					</li>

				</ul>
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
};

export default VoiceDescriptionPortal;