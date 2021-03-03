import React,{useState,Component} from "react";
import styled from "styled-components";
import CameraIcon from '@material-ui/icons/Camera';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditOrUploadVideoOption from "./EditOrUploadVideoOption.js";

const Container=styled.div`
	position:fixed;
	z-index:35;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:30%;
	height:40%;
	overflow:scroll;

	@media screen and (max-width:1370px){
    	top:20% !important;
    	width:100% !important;
		left:1% !important; 
		height:70% !important;

		#uploadOptionTypeLI{
			margin-bottom:15% !important;
		}
    }
     @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	  top:20% !important;
    	width:100% !important;
		left:1% !important; 
		height:70% !important;
    }
`;


const VideoOptionCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"white",
	backgroundColor:"#5298F8",
	boxShadow:"2px 10px 10px #b9d6ff"
}

 const VideoPostCreation=(props)=>{
 	const [videoUploaded,changeVideo]=useState();

 	const clickUploadVideoButton=()=>{
 		document.getElementById("uploadVideoFile").click();
 	}

 	const uploadVideo=()=>{
 		let reader= new FileReader();
 		const maxFileSize=15*1024*1024 //50MB;
 		let dummyVideoObject=document.createElement('video');
 		dummyVideoObject.preload = 'metadata'
		const video=document.getElementById("uploadVideoFile").files[0];
		const videoSize=video.size;
		if(videoSize>maxFileSize){
			alert('The file you selected is too large. As of right now we only accept files of size 15MB for videos. Sorry for the inconvenience.');
		}else{
			reader.onloadend=()=>{
				
				dummyVideoObject.src=reader.result;
				 window.URL.revokeObjectURL(dummyVideoObject.src);
				const duration=dummyVideoObject.duration;
				if(duration>30){

				}else{
					
					if(props.uploadedRedoVideo!=null){
						props.uploadedRedoVideo(reader.result);
					}else{
						changeVideo(reader.result);
					}
				}
			}
			if(video!=null){
					reader.readAsDataURL(video);
			}
			else{
				alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
			}

		}
 	}

 	const closeAndRedoVideo=()=>{
 		changeVideo(null)
 	}

 	const createEditVideoContainer=()=>{
 		document.getElementById("container").style.height="60%";
 		document.getElementById("container").style.width="60%";
 		return <EditOrUploadVideoOption
 					videoSrc={videoUploaded}
 					parentRedoVideo={parentRedoVideo}
 					closeAndRedoVideo={closeAndRedoVideo}
 				/>;
 	}

 	const parentRedoVideo=()=>{
 		changeVideo(null);
 	}

	return(
		<Container id="container">
			{videoUploaded==null?
				<React.Fragment>

					<input type="file" accept="video/move,video/mp4" name="img" id="uploadVideoFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>uploadVideo()}></input>

					<ul style={{padding:"0px",marginLeft:"20%",paddingTop:"10%",width:"70%"}}>
						<p style={{fontSize:"25px"}}><b>Create your own video here with the click of a button</b> </p>
						<p style={{fontSize:"15px",color:"#b3b3b3"}}>Everyone has a story. Show people your talents or your ideas that you've been working on </p>

						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li id="uploadOptionTypeLI" style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
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
								</li>

								{/*	
									<li style={{position:"relative",listStyle:"none",display:"inline-block"}}>
										<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={VideoOptionCSS}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
														<AddAPhotoIcon/>
													</li>

													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
														Take a video
													</li>
												</ul>	
										</button>
									</li>
								*/}

							</ul>
						</li>
					</ul>
				</React.Fragment>:
				<React.Fragment>
					{createEditVideoContainer()}
				</React.Fragment>
			}

		</Container>

	)
}

export default VideoPostCreation;
