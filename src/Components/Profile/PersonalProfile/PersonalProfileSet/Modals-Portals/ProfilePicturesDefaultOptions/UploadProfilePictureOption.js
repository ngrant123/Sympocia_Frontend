import React,{useState} from "react";
import styled from "styled-components";


const ButtonContainerCSS={
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"5%",
  marginTop:"5%",
  marginBottom:"5%"
}


const UploadOptionsCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"white",
	backgroundColor:"#5298F8",
	padding:"20px",
	borderRadius:"5px",
	cursor:"pointer",
	width:"50%"
}

const ImageCSS={
	marginRight:"2%",
	marginBottom:"2%",
	width:"200px",
	height:"200px",
	cursor:"pointer",
	borderRadius:"5px"
}

const UploadProfilePictureOption=({backButtonTrigger,uploadFile})=>{
	const [uploadedImageSrc,changeUploadedImageSrc]=useState();
	const triggerFileUploadPrompt=()=>{
		const fileUploadButton=document.getElementById("profilePictureFileUpload");
		fileUploadButton.click();
	}

	const changeProfilePicture=()=>{
		let reader=new FileReader();
		const uploadedFile=document.getElementById("profilePictureFileUpload").files[0];
		const maxFileSize=7000*1024;
		if(uploadedFile.size>maxFileSize){
			alert('Your file is too large. We only accept images that have a size of 250KB. You can go to preview (Mac) and lower the resolution there.');
		}else{
			reader.onloadend=async()=>{
				const uploadedFile=reader.result;
				changeUploadedImageSrc(uploadedFile);
			}

			if(uploadedFile!=null){
				reader.readAsDataURL(uploadedFile);
			}else{
				alert('File not supported');
			}
		}
	}


	return(
		<React.Fragment>
			<p style={ButtonContainerCSS} onClick={()=>backButtonTrigger()}>
				Back
			</p>
			{uploadedImageSrc!=null ?
				<React.Fragment>
					<img src={uploadedImageSrc} style={ImageCSS}/>
					<p onClick={()=>uploadFile({isAccessTokenUpdated:false,selectedImageSrc:uploadedImageSrc})} style={{...ButtonContainerCSS,width:"30%"}}>Upload </p>
				</React.Fragment>:
				<React.Fragment>
					<p onClick={()=>triggerFileUploadPrompt()} style={UploadOptionsCSS}>Upload File</p>
					<input type="file" name="img" id="profilePictureFileUpload" style={{opacity:"0",width:"1px",height:"1px"}} 
						accept="image/jpeg" name="attachments" onChange={()=>changeProfilePicture()}>
					</input>
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default UploadProfilePictureOption;