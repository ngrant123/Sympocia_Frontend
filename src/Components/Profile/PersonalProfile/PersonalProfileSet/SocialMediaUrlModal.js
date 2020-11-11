import React,{useEffect} from "react";
import styled from "styled-components";
import {editSocialMediaUrls} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const SocialMediaContainer=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:12;
	top:20%;
	border-radius:5px;
	left:40%;
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:70%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const InputContainerCSS={
	listStyle:"none",
	marginBottom:"5%"
}
const SubmitButtonCSS={
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

const SocialMediaUrlContainer=({closeModal,socialMediaUrls,profileId,updateProfileSocialUrls})=>{

	useEffect(()=>{
		const {
			instagramUrl,
			tikTokUrl
		}=socialMediaUrls

		if(instagramUrl!=null){
			document.getElementById("instagramId").value=instagramUrl;
		}
		if(tikTokUrl!=null){
			document.getElementById("tiktokId").value=instagramUrl;
		}
	})

	const submitSocialMediaUrls=async()=>{
		debugger;
		const tikTokUrl=document.getElementById("tiktokId").value;
		const instagramUrl=document.getElementById("instagramId").value;
		const socialMedia={
			tikTokUrl,
			instagramUrl,
			profileId
		};
		const {confirmation,data}=await editSocialMediaUrls(socialMedia);
		if(confirmation=="Success"){
			updateProfileSocialUrls(socialMedia);
		}else{
			alert('Unfortunately there has been an error with updating your social media. Please try again');
		}
	}

	return(
		<>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<SocialMediaContainer>
				<ul style={{padding:"20px"}}>
					<p style={{fontSize:"20px"}}>
						<b> Edit social media urls </b>
					</p>
					<hr/>
					<li style={InputContainerCSS}>
						<p>Instagram url: </p>
						<InputContainer id="instagramId" placeholder="Enter instagram url"/>
					</li>
					<hr/>
					
					<li style={InputContainerCSS}>
						<p> Tik tok url: </p>
						<InputContainer id="tiktokId" placeholder="Enter instagram url"/>
					</li>
					<a href="javascription:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>submitSocialMediaUrls()} style={SubmitButtonCSS}>
							Submit
						</li>
					</a>

				</ul>
			</SocialMediaContainer>
		</>
	)
}

export default SocialMediaUrlContainer;