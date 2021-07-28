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
	height:50%;
	overflow:auto;
	width:45%;

	@media screen and (min-width:2500px){
		#headerCreationText{
    		font-size:48px !important;
    	}
    	#secondaryCreationText{
    		font-size:36px !important;
    	}
	}

	@media screen and (max-width:1370px){
    	top:20% !important;
    	width:100% !important;
		left:1% !important; 
		height:70% !important;
		overflow:scroll;

		#uploadOptionTypeLI{
			margin-bottom:15% !important;
		}

		#closeModalButton{
			display:block !important;
		}
    }

    @media screen and (max-width:650px){
    	width:100% !important;
    	top:0% !important;
    	height:100% !important;
    	#headerCreationText{
    		font-size:18px !important;
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
 		const maxFileSize=15*1024*1024
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
 					isPhoneUIEnabled={props.isPhoneUIEnabled}
 					closeModal={props.closeModal}
 				/>;
 	}

 	const parentRedoVideo=()=>{
 		changeVideo(null);
 	}

	return(
		<Container id="container">
			{videoUploaded==null?
				<React.Fragment>
					<div id="closeModalButton" 
						onClick={()=>props.closeModal()} style={{marginTop:"0%",cursor:"pointer",display:"none"}}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
						 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
						 stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <circle cx="12" cy="12" r="9" />
						  <path d="M10 10l4 4m0 -4l-4 4" />
						</svg>
					</div>
					<input type="file" accept="video/mp4,video/x-m4v,video/*" name="img"
						 id="uploadVideoFile" style={{position:"relative",opacity:"0",zIndex:"0"}}
						 onChange={()=>uploadVideo()}>
					</input>

					<ul style={{padding:"0px",marginLeft:"20%",paddingTop:"10%",width:"70%"}}>
						<p id="headerCreationText" style={{fontSize:"25px"}}>
							<b>Create your own video here with the click of a button</b>
						</p>
						<p id="secondaryCreationText" style={{fontSize:"15px",color:"#b3b3b3"}}>
							Everyone has a story. Show people your talents or your ideas that you've been working on
						</p>
						<hr/>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li id="uploadOptionTypeLI" style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={VideoOptionCSS}>
											<ul style={{padding:"0px"}} onClick={()=>clickUploadVideoButton()}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
													<CameraIcon/>
												</li>

												<li id="secondaryCreationText" style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
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
