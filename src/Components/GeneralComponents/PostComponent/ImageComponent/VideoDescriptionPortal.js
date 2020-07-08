import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ReplyIcon from '@material-ui/icons/Reply';
import BuildSharpIcon from '@material-ui/icons/BuildSharp';

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
	width:70%;
	top:20%;
	left:20%;
	z-index:23;
	height:70%;
	top:10%;
	border-radius:5px;
`;

const RecordButton=styled.div`
	position:relative;
	z-index:3;
	width:40px;
	height:50px;
	border-radius:50%;
	background-color:red;
`;

const VideoResultContainer=styled.div`

`;


const VideoElement=styled.div`
`;

const VideoDescriptionPortal=(props)=>{
	const {closeModal}=props;
	const [maxTime,changeMaxTime]=useState(10000);
	const [currentTime,changeCurrentTime]=useState(0);

	useEffect(()=>{
		var video=document.getElementById("video");
				if (navigator.mediaDevices.getUserMedia) {
					  navigator.mediaDevices.getUserMedia({ 
					  		video: true,
					  		audio:true 
					  	}).then(function (stream) {
					      video.srcObject = stream;
					      video.captureStream = video.captureStream || video.mozCaptureStream;
					    })
				    .catch(function (error) {
				      console.log("Something went wrong!");
				    });
			}	
	});

	const stopRecording=(stream)=>{
		stream.getTracks().forEach(track => track.stop());
	}

	const startRecording=(stream)=>{
		  let recorder = new MediaRecorder(stream);
		  let data = [];

		  recorder.ondataavailable = event => data.push(event.data);
		  recorder.start();

		  var stoppedVideo=new Promise((resolve, reject) => {
		    recorder.onstop = resolve;
		    recorder.onerror = event => reject(event.name);
		  }).then(recordedChunks=>{
		  	 let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
		    // recording.src = URL.createObjectURL(recordedBlob);
		  });
	}


	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>props.closeModal()}
			/>
			<Container>
				<VideoElement>
					<video id="video" transform="rotateY(180deg)" width="100%" height="100%" autoplay="true">
					</video>
					<ul style={{marginTop:"-20%",padding:"0px",zIndex:"3"}}>
						<li style={{listStyle:"none",display:"inline-block"}}>
							<BuildSharpIcon
								style={{fontSize:40}}
							/>
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<RecordButton/>
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<ReplyIcon
								style={{fontSize:40}}
							/>
						</li>
					</ul>
				</VideoElement>
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
};

export default VideoDescriptionPortal;