import React,{useState} from "react"
import styled from "styled-components";
import CameraIcon from '@material-ui/icons/Camera';
import {
		createBeaconReply,
		createBeacon
	} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
	import {useSelector} from "react-redux";

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

const Creation=({
				closeCreationModal,
				updateBeaconPosts,
				beaconResponseDesignatedPostType,
				ownerId,
				beaconId,
				symposiumId
			})=>{
	const [displayUploadPrompt,changeDisplayUploadPrompt]=useState(true);
	const [selectedPostUrl,changeSelectedPostUrl]=useState();
	const [postType,changePostType]=useState("Images");
	const [isSubmtting,changeIsSubmitting]=useState(false);
	const userInformation=useSelector(state=>state.personalInformation);

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const clickFileUpload=()=>{
		document.getElementById("uploadFileBeacon").click();
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
		changeIsSubmitting(true);
		if(userSubmittedInput==""){
			alert('Please enter a prompt');
		}else{
			let uploadedBeaconResult;

			if(beaconResponseDesignatedPostType!=null){
				uploadedBeaconResult=await uploadReplyBeacon(userSubmittedInput);
			}else{
				uploadedBeaconResult=await uploadedBeacon(userSubmittedInput);
			}
			const {confirmation,data}=uploadedBeaconResult;
			if(confirmation=="Success"){
			let {message}=data;
			debugger;
			let currentSubmittedPostType=beaconResponseDesignatedPostType==null?postType:
										beaconResponseDesignatedPostType;

			if(currentSubmittedPostType=="Images" || currentSubmittedPostType=="Videos"){
				const postUrlParameter=currentSubmittedPostType=="Images"?"imgUrl":"videoUrl"
				message={
					...message,
					post:{
						...message.post,
						[postUrlParameter]:selectedPostUrl
					}
				};
			}
			message={
				...message,
				post:{
					...message.post,
					owner:{
						...message.post.owner,
						firstName:userInformation.firstName
					}
				}
			};
			updateBeaconPosts(currentSubmittedPostType,message);
			}else{
				alert('There was an error creating this beacon response');
				return null;
			}	
		}
		changeIsSubmitting(false);
	}
	const uploadedBeacon=async(userSubmittedValue)=>{
		const createBeaconResult=await createBeacon({
			postUrl:selectedPostUrl,
			beaconDescription:userSubmittedValue,
			postType,
			ownerId,
			symposiumId
		})
		return createBeaconResult;
	}
	const uploadReplyBeacon=async(userSubmittedValue)=>{
		const createdBeaconReplyResult=await createBeaconReply({
			beaconId,
			postUrl:selectedPostUrl,
			beaconDescription:userSubmittedValue,
			postType:beaconResponseDesignatedPostType,
			ownerId,
			symposiumId
		});
		return createdBeaconReplyResult;
	}



	const fileUploadSystem=()=>{
		console.log(beaconResponseDesignatedPostType);
		let fileSystemPostType=beaconResponseDesignatedPostType==null?postType:
		beaconResponseDesignatedPostType
		switch(fileSystemPostType){
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
						style={{width:"280px",height:"220px",borderRadius:"5px"}}
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
				{isSubmtting==true?
					<p>Submitting...</p>:
					<div onClick={()=>submitBeacon()} style={ButtonCSS}>
						Submit
					</div>
				}
			</React.Fragment>
		)
	}
	const imageUploadType=()=>{
		return(
			<div onClick={()=>changePostType("Images")} style={ButtonCSS}>
				Images
			</div>
		)
	}

	const videoUploadType=()=>{
		return(
			<div onClick={()=>changePostType("Videos")} style={ButtonCSS}>
				Videos
			</div>
		)
	}

	const regularPostUploadType=()=>{
		return(
			<div onClick={()=>changePostType("Regular")} style={ButtonCSS}>
				Regular Posts
			</div>
		)
	}

	const postUploadType=()=>{
		if(beaconResponseDesignatedPostType!=null){
			switch(beaconResponseDesignatedPostType){
				case "Images":{
					return imageUploadType();
					break;
				}
				case "Videos":{
					return videoUploadType();
					break;
				}
				case "Regular":{
					return regularPostUploadType();
					break;
				}
			}
		}else{
			return(
				<React.Fragment>
					{imageUploadType()}
					{videoUploadType()}
					{regularPostUploadType()}
				</React.Fragment>
			)
		}
	}
	return(
		<Container>
			<div onClick={()=>closeCreationModal()} style={BackButtonCSS}>
				Back
			</div>
			{displayUploadPrompt==true?
				<React.Fragment>
					<PostTypes>
						{postUploadType()}
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