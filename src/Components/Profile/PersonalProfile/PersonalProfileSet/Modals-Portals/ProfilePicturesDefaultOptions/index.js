import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import  DefaultOptions from "./DefaultOptions.js";
import UploadProfilePictureOption from "./UploadProfilePictureOption.js";

const Container=styled.div`
	position:fixed;
	width:40%;
	height:50%;
	background-color:white;
	z-index:35;
	top:20%;
	border-radius:5px;
	left:35%;
	display:flex;
	padding:15px;
	flex-direction:column;
	overflow:scroll;
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:35;
	top:0px;
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}

const OptionsCSS={
	boxShadow:"1px 1px 5px #d5d5d5",
	padding:"30px",
	cursor:"pointer"
}

const ProfilePicturesDefaultOptions=({targetDom,closeModal})=>{
	const targetContainer=document.getElementById(targetDom);

	const [displayDefaultPictures,changeDefaultPicturesDisplay]=useState(false);
	const [displayDefaultOptions,changeDisplayDefaultOptions]=useState(true);
	const [displayUploadOption,changeDisplayUploadOption]=useState(false);

	const handleDisplayDefaultPictures=()=>{
		changeDefaultPicturesDisplay(true);
		changeDisplayDefaultOptions(false);
	}

	const handleFileUploadProfilePicture=()=>{
		changeDisplayUploadOption(true);
		changeDisplayDefaultOptions(false);
	}

	const uploadFile=(selectedImageSrc)=>{

	}

	const defaultOptionsTrigger=()=>{
		return (
			<React.Fragment>
				{displayDefaultOptions==true &&(
					<React.Fragment>
						<div onClick={()=>closeModal()} style={{marginBottom:"5%"}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
							 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
							 stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							  <circle cx="12" cy="12" r="9" />
							  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</div>

						<p style={{fontSize:"20px"}}> 	
							<b>Choose your profile picture option:</b>
						</p>
						<hr style={HorizontalLineCSS}/>
						<p onClick={()=>handleDisplayDefaultPictures()} style={OptionsCSS}> Choose from our default options </p>
						<p> or </p>
						<p onClick={()=>handleFileUploadProfilePicture()} style={OptionsCSS}> Select your own </p>
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	const closeModalAndDisplayOptions=()=>{
		changeDefaultPicturesDisplay(false);
		changeDisplayDefaultOptions(true);
		changeDisplayUploadOption(false);
	}

	const displayDefaultPicturesTrigger=()=>{
		return(
			<React.Fragment>
				{displayDefaultPictures==true && (
					<DefaultOptions
						backButtonTrigger={closeModalAndDisplayOptions}
						uploadFile={uploadFile}
					/>
				)}
			</React.Fragment>
		)
	}

	const displayUploadPicturesModalTrigger=()=>{
		return(
			<React.Fragment>
				{displayUploadOption==true && (
					<UploadProfilePictureOption
						backButtonTrigger={closeModalAndDisplayOptions}
						uploadFile={uploadFile}
					/>
				)}
			</React.Fragment>
		)
	}


	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{defaultOptionsTrigger()}
				{displayDefaultPicturesTrigger()}
				{displayUploadPicturesModalTrigger()}
			</Container>
		</React.Fragment>
	,targetContainer)
}

export default ProfilePicturesDefaultOptions;