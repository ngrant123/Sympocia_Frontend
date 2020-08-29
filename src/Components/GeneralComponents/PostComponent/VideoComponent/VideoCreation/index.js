import React,{useState,Component} from "react";
import styled from "styled-components";
import CameraIcon from '@material-ui/icons/Camera';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditOrUploadVideoOption from "./EditOrUploadVideoOption.js";

const Container=styled.div`
	position:fixed;
	z-index:21;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:30%;
	height:40%;
	overflow:scroll;
`;


 const VideoPostCreation=()=>{
 	console.log("Testing video creation");
 	const [videoUploaded,changeVideo]=useState();

 	const clickUploadVideoButton=()=>{
 		document.getElementById("uploadVideoFile").click();
 	}

 	const uploadVideo=()=>{
 		console.log("Upload video is being accessed");
 		let reader= new FileReader();
		const video=document.getElementById("uploadVideoFile").files[0];
		reader.onloadend=()=>{
			console.log(reader.result);
			changeVideo(reader.result);
		}
		if(video!=null){
				reader.readAsDataURL(video);
		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}
 	}

 	const createEditVideoContainer=()=>{
 		document.getElementById("container").style.height="60%";
 		document.getElementById("container").style.width="60%";
 		return <EditOrUploadVideoOption
 					videoSrc={videoUploaded}
 				/>;
 	}

	return(
		<Container id="container">
			{videoUploaded==null?
				<React.Fragment>

					<input type="file" accept="video/*" name="img" id="uploadVideoFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>uploadVideo()}></input>

					<ul style={{padding:"0px",marginLeft:"20%",paddingTop:"10%",width:"70%"}}>
						<p style={{fontSize:"25px"}}><b>Create your own video here with the click of a button</b> </p>
						<p style={{fontSize:"15px",color:"#b3b3b3"}}>Everyone has a story. Show people your talents or your ideas that you've been working on </p>

						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"white",
																															backgroundColor:"#5298F8",
																															boxShadow:"2px 10px 10px #b9d6ff"}}>
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

								<li style={{position:"relative",listStyle:"none",display:"inline-block"}}>
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"white",
																															backgroundColor:"#5298F8",
																															boxShadow:"2px 10px 10px #b9d6ff"}}>
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
