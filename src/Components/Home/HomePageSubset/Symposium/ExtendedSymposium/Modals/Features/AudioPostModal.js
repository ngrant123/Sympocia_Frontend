import React,{useState} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MicIcon from '@material-ui/icons/Mic';
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	position:absolute;
	z-index:13;
	height:95%;
	width:75%;
	border-radius:5px;
	top:2%;
	left:20%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	height:10%;
	width:80%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

const CreatePostButton=styled.div`
	width:50px;
	height:50px;
	border-radius:50%;
	background-color:white;
	border-color:white;
	border-style:solid;
	padding:15px;
	border-width:5px;
	animation: glowing 1300ms infinite;
	text-align:center;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const DescriptionInputContainer=styled.textarea`
	border-radius:5px;
	height:20%;
	width:95%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ProfilePictureCSS={
	position:"relative",
	width:"10%",
	marginRight:"6%",
	top:"-75px",
	listStyle:"none",
	display:"inline-block"
}

const AudioCSS={
	listStyle:"none",
	display:"inline-block",
	overflow:"hidden",
	borderRadius:"5px",
	marginRight:"5%",
	marginBottom:"5%"
}

const ButtonCSS={
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


const SubmitButtonCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"30%"
}

const SkillLevelButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

///<input type="file" accept=".mp3,audio/*">
const AudioPostModal=({closeModal,symposium,displayImage,modalType})=>{

	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [finalAudioEditDisplay,changeDisplayForFinalAudio]=useState(false);
	const [audioUrl,changeAudioUrl]=useState();
	const [posts,changePosts]=useState([{},{},{},{},{}]);	

	const handleUploadAudio=()=>{
		var fileReader=new FileReader();
		var currentAudioUrl=document.getElementById("uploadAudioFile").files[0];

		fileReader.onloadend=()=>{
			const audioResult=fileReader.result;
			changeAudioUrl(audioResult);
			changeDisplayForFinalAudio(true);
		}

		if(currentAudioUrl!=null){
			fileReader.readAsDataURL(currentAudioUrl);
		}else{
			alert('Sorry, this image type is not allowed. Please try again');
		}
	}

	const clickFileUpload=()=>{
		document.getElementById("uploadAudioFile").click();
	}

	const submitImage=async()=>{
		debugger;
		var audio={
			audioUrl:audioUrl,
			description:document.getElementById("imageDescription").value
		}

		//Connect image date to api 

		audio={
			...audio,
			_id:4290532423,
			comments:[],
			isCrownedPost:false
		}

		posts.splice(0,0,audio);
		changePosts([...posts]);
		changeDisplayCreationModal(false);
	}
	return(
		<ul style={{padding:"20px"}}>
			{displayCreationModal==false?
				<>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<p style={{fontSize:"20px"}}>
									<b>{symposium} {modalType}</b>
								</p>
							</li>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>changeDisplayCreationModal(true)} 
										style={{listStyle:"none",marginLeft:"400px",marginBottom:"5%"}}>
										<CreatePostButton>
											<BorderColorIcon
												style={{fontSize:"20",color:"#C8B0F4"}}
											/>
										</CreatePostButton>
									</li>
								</a>
							</li>
						</ul>
					</li>
					<hr/>

					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<InputContainer placeholder="Search for a person here"/>
							<li style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									{posts.map(data=>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li style={AudioCSS}>
												<ul style={{padding:"0px"}}>
													<li style={ProfilePictureCSS}>
														<img src={NoProfilePicture} style={{width:"60px",height:"10%",borderRadius:"50%"}}/>
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														<p> 
															<b>{data.firstName}</b>
														</p>
														<audio controls>
														  <source src={data.audioUrl} type="audio/ogg"/>
														  <source src={data.audioUrl} type="audio/mpeg"/>
															Your browser does not support the audio element.
														</audio>
														<p style={{overflowY:"auto",height:"10%"}}>
															{data.description}
														</p>
													</li>
												</ul>
											</li>
										</a>
									)}
								</ul>
							</li>
						</ul>
					</li>
				</>:
				<>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>changeDisplayCreationModal(false)} style={ButtonCSS}>
									Back
								</li>
							</a>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<p style={{fontSize:"20px"}}>
									<b>Upload an image for others to {modalType}</b>
								</p>
							</li>
						</ul>
					</li>
					<hr/>
					<li style={{marginTop:"2%",listStyle:"none"}}>
						{finalAudioEditDisplay==false?
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>clickFileUpload()} style={ButtonCSS}>
										<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
													<MicIcon/>
												</li>

												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
													Upload Audio
												</li>
											</ul>
										<input type="file" id="uploadAudioFile" name="img" accept=".mp3,.mp4,.wav"
											style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>handleUploadAudio()}>
										</input>
								</li>
							</a>:
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginBottom:"2%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",width:"40%"}}>
											<audio controls>
											  <source src={audioUrl} type="audio/ogg"/>
											  <source src={audioUrl} type="audio/mpeg"/>
											Your browser does not support the audio element.
											</audio>
										</li>
										<li style={{width:"45%",listStyle:"none"}}>
											<DescriptionInputContainer id="imageDescription" placeholder="Write down a description here"/>
										</li>
									</ul>
								</li>
								<li onClick={()=>submitImage()} style={SubmitButtonCSS}>
									Submit
								</li>
							</ul>
						}
					</li>
				</>
			}
		</ul>
	);
}

export default AudioPostModal;