import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Confetti from 'react-confetti';
import {uploadProfilePicture} from "../../Actions/Requests/MarketingRequests.js";

const ShadowContainer=styled.div`
	position:fixed;
	width:120%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:2;
	top:0px;
	left:0px;
`;

const Container=styled.div`
	position:fixed;
	width:30%;
	background-color:white;
	border-radius:5px;
	height:50%;
	top:140px;
	padding:20px;
	padding-right:30px;
	left:35%;
	z-index:2;
	text-align:center;
	overflow-y:auto;

	@media screen and (max-width:900px){
		width:50%;
		left:25%;
	}

	@media screen and (max-width:430px){
		width:70%;
		left:15%;
	}
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:80%;
	height:70px;
	margin-left:10%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const LinkTextContainer=styled.input`
    border: none;
    overflow: auto;
    outline: none;
    resize:none;
    border-radius:5px;
    width:80%;
    border-style:solid;
    border-width:2px;
    border-color:#d9d9d9;
`;


const CloseModalButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}


const RegisterButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginTop:"5%"
}

/*
	Right now since I'm on just displaying the images on the entertainment component
	not on the business component but I need to implement that in the future
*/

const EmailInformationModal=({closeModal,pushProfileObject,id,profileType})=>{
	const [displayProfileUploadPage,changeDisplayProfileUploadPage]=useState(false);
	const [displayConfetti,changeDisplayConfetti]=useState(true);
	const [profileUrl,changeProfilePictureUrl]=useState();

	useEffect(()=>{
		confettiAnimation();
	})
	

	const confettiAnimation=()=>{
		setTimeout(()=>{
			changeDisplayConfetti(false);
		},5000);
	}

	const changeImageUrl=()=>{
		var fileReader=new FileReader();
		var image=document.getElementById("imageFile").files[0];
		fileReader.onloadend=()=>{	
			const imageUrl=fileReader.result;
			changeProfilePictureUrl(imageUrl);
		};
		if(image!=null){
			fileReader.readAsDataURL(image);
		}else{
			alert('Sorry but this image type is not allowed');
		}

	}

	const submitPictureAndLink=async()=>{
		debugger;

		if(profileUrl==null){
			alert('Please submit a picture');
		}else{
			const userObject={
				id:id,
				profilePicture:profileUrl
			}
			const {confirmation}=await uploadProfilePicture(userObject);
			if(confirmation=="Success"){
				pushProfileObject(userObject);
			}else{
				alert('Sorry there has been an error. Please upload again');
			}
		}
	}

	const triggerPictureUpload=()=>{
		document.getElementById("imageFile").click();
	}
	return(
		<>
			{displayConfetti==false?null:
				<Confetti
					style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
					 run={true}
				/>
			}
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{displayProfileUploadPage==false?
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									 <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checkbox" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3" fill="none" stroke-linecap="round" stroke-linejoin="round">
									  <path stroke="none" d="M0 0h24v24H0z"/>
									  <polyline points="9 11 12 14 20 6" />
									  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
									</svg>
								</li>
								<li style={{listStyle:"none",marginBottom:"5%"}}>
									Thanks for submitting your email :) I really appreciate it. 
									In the meantime, I'll send you a confirmation email later on today and we can go from there
								</li>
								<hr/>
								{profileType==null?
									<>
										<p>Since your apart of the team now, would you like to upload
											 a picture and tell everyone what you're working on or promote your stuff?
											 Your picture will be displayed on the right for everyone to see. Its the least we can do for you 
											 signing up. Come get your free advertising:)
										</p>
										<li style={{listStyle:"none"}}>
											<ul style={{padding:"0px"}}>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li onClick={()=>changeDisplayProfileUploadPage(true)} style={{listStyle:"none",display:"inline-block"}}>
														<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7cfc00" fill="none" stroke-linecap="round" stroke-linejoin="round">
														  <path stroke="none" d="M0 0h24v24H0z"/>
														  <circle cx="12" cy="12" r="9" />
														  <path d="M9 12l2 2l4 -4" />
														</svg> Yes
													</li>
												</a>
												<a href="javascript:void(0);" style={{textDecoration:"none",marginTop:"3%"}}>
													<li onClick={()=>closeModal()} style={{listStyle:"none"}}>
														<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#E91E63" fill="none" stroke-linecap="round" stroke-linejoin="round">
														  <path stroke="none" d="M0 0h24v24H0z"/>
														  <rect x="4" y="4" width="16" height="16" rx="2" />
														  <path d="M10 10l4 4m0 -4l-4 4" />
														</svg> No
													</li>
												</a>
											</ul>
										</li>
									</>:
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>closeModal()}style={CloseModalButton}>
											Close
										</li>
									</a>
								}
							</ul>
						</li>
					</ul>:
					<ul style={{padding:"0px"}}>
						<p> The user will be redirected to the link that you provide below when they click on your picture</p>
						<li onClick={()=>triggerPictureUpload()} style={{listStyle:"none"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								{profileUrl!=null?
									<img src={profileUrl} style={{width:"40%",height:"110px",borderRadius:"50%"}}/>
									:<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
										  <path stroke="none" d="M0 0h24v24H0z"/>
										  <circle cx="12" cy="12" r="9" />
										  <line x1="9" y1="12" x2="15" y2="12" />
										  <line x1="12" y1="9" x2="12" y2="15" />
										</svg>
								}
							</a>
							<input id="imageFile" onChange={()=>changeImageUrl()} type="file" style={{zIndex:"-1",opacity:"0"}} accept="image/x-png,image/gif,image/jpeg"/>
						</li>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li onClick={()=>submitPictureAndLink()} style={RegisterButton}>
								Submit
							</li>
						</a>
					</ul>
				}
			</Container>
		</>

	)
}

export default EmailInformationModal;