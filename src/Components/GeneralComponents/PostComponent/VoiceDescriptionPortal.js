import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ReplyIcon from '@material-ui/icons/Reply';
import BuildSharpIcon from '@material-ui/icons/BuildSharp';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RefreshIcon from '@material-ui/icons/Refresh';

import MicIcon from '@material-ui/icons/Mic';

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:36;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:50%;
	top:20%;
	left:30%;
	z-index:36;
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
  cursor:"pointer",
  width:"30%"
}
const VideoOptionCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"white",
	backgroundColor:"#5298F8",
	boxShadow:"2px 10px 10px #b9d6ff"
}

const VoiceDescriptionPortal=(props)=>{
	var targetContainer;
	if(props.isBlog==true){
		targetContainer=document.getElementById("blogPostContainer")
	}else{
		targetContainer=document.getElementById("personalContainer");
	}
		
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
		const inputElement=document.getElementById("uploadAudioFile");
		inputElement.click();
	},[])

	const clickUploadAudioButton=()=>{
 		document.getElementById("uploadAudioFile").click();
 	}

	const handleUploadAudioDescription=()=>{
		let reader= new FileReader();
		const audioDescription=document.getElementById("uploadAudioFile").files[0];

		reader.onloadend=()=>{
			props.createAudioDescription(reader.result);
		}

		if(audioDescription!=null){
			reader.readAsDataURL(audioDescription);
		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
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
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={VideoOptionCSS}>
							<ul style={{padding:"0px"}} onClick={()=>clickUploadAudioButton()}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
									<MicIcon/>
								</li>

								<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
									Upload Audio
								</li>
							</ul>																			
						</button>
						<input type="file" id="uploadAudioFile" name="img" accept=".mp3,.wav" style={{opacity:0,zIndex:0,position:"relative",cursor:"pointer"}} 
							onChange={()=>handleUploadAudioDescription()}>
						</input>
					</React.Fragment>
				}
			</Container>
		</React.Fragment>
	,targetContainer)
}
{/*
	const VoiceDescriptionPortal=(props)=>{
			var targetContainer;
		if(props.isBlog==true){
			targetContainer=document.getElementById("blogPostContainer")
		}else{
			targetContainer=document.getElementById("personalContainer");
		}
		

		const [maxTime,changeMaxTime]=useState(10000);
		const [currentTime,changeCurrentTime]=useState(0);
		const [isRecording,changeRecordingState]=useState(false);
		const [audioElements,changeAudioElements]=useState([]);
		const [reInitilize,changeReInitliazed]=useState(false);
		const [localStream,changeLocalStream]=useState();

		const [mediaDevice,changeMediaDevice]=useState();
		const [firstDone,chnagFirstDone]=useState(false);

		const pauseRecording=(stream)=>{
			mediaDevice.stop();
			changeRecordingState(false);
		}
		const stopRecording=(stream)=>{
			if(isRecording==true){
				mediaDevice.stop();
				stream.getTracks().forEach(track => track.stop());
				changeRecordingState(false);
			}
		}

		const handleRecording=(stream)=>{
			changeLocalStream(stream);
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
			 }else{
			 	
				  let recorder = new MediaRecorder(stream);
				  changeMediaDevice(recorder);
				  data=[];

				  recorder.ondataavailable = event => data.push(event.data);
				  recorder.start();

				  stoppedVideo=new Promise((resolve, reject) => {
				    recorder.onstop = resolve;
				    recorder.onerror = event => reject(event.name);
				  });
			 }
			  return Promise.all([stoppedVideo]).then(()=>data);
		}

		const closeModal=()=>{
			var audioElement=document.getElementById("audioElement");
			if(firstDone!=false && audioElement!=null)
				stopRecording(localStream);
			props.closeModal()
		}

		const test=()=>{
			if(reInitilize==true && audioElements.length>0){
				var newElements=audioElements;
				changeAudioElements(newElements);
				changeReInitliazed(false);
			}
		}

		const startRecording=()=>{
			if(audioElements.length>0){
				alert('Please refresh your previous audio to create a new one');
			}else{
				let audio=document.getElementById("audioElement");	
				changeRecordingState(true)
				if(!navigator.mediaDevices){
					alert('Unable to access voice/video cam. Either you computer does not have this option or something else. Sorry for the inconvience');
					props.closeModal();
				}else{
					if (navigator.mediaDevices.getUserMedia){
					  	navigator.mediaDevices.getUserMedia({
					  		audio:true
					  	}).then((stream)=>handleRecording(stream))
					  	  .then(recordedChunks=>{
						  	 if(recordedChunks!=null){
							  	let recordedFile = new File(recordedChunks, { type: "audio/mpeg-3" });
							  	var audioSrc=URL.createObjectURL(recordedFile);
							  	var reader=new FileReader();
								reader.onloadend=()=>{
									var currentAudioElements=audioElements;
									const audioObject={
										audioSrc:reader.result,
										videoFile:recordedFile,
										videoCounter:currentAudioElements.length
									}

								  	 currentAudioElements.push(audioObject);
								  	 changeAudioElements(currentAudioElements);

								  	 changeRecordingState(false);
								  	 changeReInitliazed(true);
								  	 chnagFirstDone(true)
								}
							  	reader.readAsDataURL(recordedFile);
						  	 }
						}).catch(err=>{
							alert('Unable to access voice/video cam. Either you computer does not have this option or something else. Sorry for the inconvience');
						});
					}
				}
			}
		}

		const submitAudioDescription=()=>{
			if(audioElements.length>0){
				props.createAudioDescription(audioElements[0].audioSrc);
			}else{
				alert('Create a video to continue or press the exit button on the top left');
			}
		}

		const redoAudio=()=>{
			audioElements.splice(0,audioElements.length);
			var newaudioElements=audioElements;
			changeAudioElements(newaudioElements);
			changeReInitliazed(true);
		}

		return createPortal(
			<React.Fragment>
				<ShadowContainer
					onClick={()=>closeModal()}
				/>
				<Container>
					{test()}
					<ul id="voiceOptionsLI"style={{marginLeft:"20%",marginTop:"10%"}}>
						<li style={{listStyle:"none",marginBottom:"5%"}}>
							<p>Click start recording to get started and then when you're all done click the continue buttonp</p>
							<hr/>
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
										<li onClick={()=>pauseRecording()} style={StopButtonCSS}>
											Stop Recording
										</li>
									</a>
								}
								<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
									<RefreshIcon
										onClick={()=>redoAudio()}
										style={{fontSize:20}}
									/>
								</li>
							</ul>
						</li>
						{audioElements.length>0 &&(
							<>
								{audioElements.map(data=>
									<li style={{listStyle:"none"}}>
										<audio controls id="audioElement" >
										  	<source src={data.audioSrc} type="audio/ogg"/>
										  	<source src={data.audioSrc} type="audio/mpeg"/>
											Your browser does not support the audio element.
										</audio>
									</li>
								)}
							</>
						)}
						<hr/>
						<li onClick={()=>submitAudioDescription()} style={ContinueButtonCSS}>
							Continue
						</li>

					</ul>
				</Container>
			</React.Fragment>
		,targetContainer)
	};

*/}

export default VoiceDescriptionPortal;