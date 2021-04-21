import React,{useState} from "react"
import styled from "styled-components";
import CameraIcon from '@material-ui/icons/Camera';

const Container=styled.div`
	display:flex;
	flex-direction:column;
`;

const PostTypes=styled.div`
	display:flex;
	flex-direction:row;
`;
const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:85%;
	height:200px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;
	margin-top:5%;

	@media screen and (max-width:700px){
		width:95% !important;
	}
`;

const BackButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginBottom:"5%",
  cursor:"pointer"
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
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"2%"
}

const Creation=({closeCreationModal,updateBeaconPosts})=>{
	const [displayUploadPrompt,changeDisplayUploadPrompt]=useState(true);
	const [selectedPostUrl,changeSelectedPostUrl]=useState();
	const [postType,changePostType]=useState("Images");


	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const clickFileUpload=()=>{
		document.getElementById("uploadFileBeacon").click();
	}

	const uploadBeacon=()=>{

	}
	const handleUploadFile=(postType)=>{
		const fileReader=new FileReader();
		const currentFileUrl=document.getElementById("uploadFileBeacon").files[0];

		fileReader.onloadend=()=>{
			debugger;
			const fileUrl=fileReader.result;
			changePostType(postType);
			changeDisplayUploadPrompt(false);
			changeSelectedPostUrl(fileUrl);
		}

		if(currentFileUrl!=null){
			fileReader.readAsDataURL(currentFileUrl);
		}else{
			alert('Sorry, this file type is not allowed. Please try again');
		}
	}

	const submitBeacon=async()=>{
		const userSubmittedInput=document.getElementById("inputPromptContainer").value;
		if(userSubmittedInput==""){
			alert('Please enter a prompt');
		}else{
			updateBeaconPosts(postType,{
				imgUrl:selectedPostUrl,
				firstName:"Nathan",
				caption:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			});
		}
	}

	const fileUploadSystem=()=>{
		switch(postType){
			case "Images":{
				return(
					<React.Fragment>
						<ul onClick={()=>clickFileUpload()} style={{cursor:"pointer",padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
								<CameraIcon/>
							</li>

							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
								Upload Photo
							</li>
						</ul>
						<input type="file" name="img" id="uploadFileBeacon" style={{opacity:"0"}}
					        accept="image/jpeg" 
					        name="attachments"
					        onChange={()=>handleUploadFile("Images")} 
					    >
					    </input>
					</React.Fragment>
				)
				break;
			}
			case "Videos":{
				return(
					<React.Fragment>
						<ul onClick={()=>clickFileUpload()} style={{cursor:"pointer",padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
								<CameraIcon/>
							</li>

							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
								Upload Video
							</li>
						</ul>
						<input type="file" accept="video/mp4,video/x-m4v,video/*" 
							name="video" 
							id="uploadFileBeacon" 
							style={{position:"relative",opacity:"0",zIndex:"0"}}
							onChange={()=>handleUploadFile("Videos")} 
						>
						</input>
					</React.Fragment>
				)
				break;
			}

			case "Regular":{
				return(
					<React.Fragment>
						{promptContainer()}
					</React.Fragment>
				)
				break;
			}
		}
	}

	const postDisplayDecider=()=>{
		switch(postType){
			case "Images":{
				return(
					<img src={selectedPostUrl}
						style={{width:"240px",height:"220px",borderRadius:"5px"}}
					/>
				)
				break;
			}
			case "Videos":{
				return(
					<video id="uploadVideoUrl" key={uuidv4()} width="100%" height="40%" 
						borderRadius="5px" controls autoplay>
						<source src={selectedPostUrl} type="video/mp4"/>
					</video>
				)
			}
		}
	}
	const promptContainer=()=>{
		return(
			<React.Fragment>
				<InputContainer
					id="inputPromptContainer"
					placeholder="Enter a prompt for your beacon"
				/>
				<div onClick={()=>submitBeacon()} style={ButtonCSS}>
					Submit
				</div>
			</React.Fragment>
		)
	}
	return(
		<Container>
			<div onClick={()=>closeCreationModal()} style={BackButtonCSS}>
				Back
			</div>
			{displayUploadPrompt==true?
				<React.Fragment>
					<PostTypes>
						<div onClick={()=>changePostType("Images")} style={ButtonCSS}>
							Images
						</div>
						<div onClick={()=>changePostType("Videos")} style={ButtonCSS}>
							Videos
						</div>
						<div onClick={()=>changePostType("Regular")} style={ButtonCSS}>
							Regular Posts
						</div>
					</PostTypes>
					<div style={{marginTop:"5%"}}>
						{fileUploadSystem()}
					</div>
				</React.Fragment>:
				<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
					{postDisplayDecider()}
					{promptContainer()}
				</div>
			}
		</Container>
	)	
}

export default Creation;