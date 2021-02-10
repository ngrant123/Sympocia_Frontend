import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";


const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:45;
	top:20%;
	border-radius:5px;
	left:40%;
	display:flex;
	flex-direction: column;
	padding:30px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		overflow:scroll !important;
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const VideoDescriptionMobileDisplayPortal=({videoUrl,targetDom,closeModal})=>{
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<div onClick={()=>closeModal()} style={{marginBottom:"5%"}}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
					</svg>
				</div>
				<hr/>
				<video id="videoDescription" controls={true} width="100%" height="100%" autoplay="true">
					<source src={videoUrl} type="video/mp4"/>
				</video>
			</Container>
		</React.Fragment>
	,document.getElementById(targetDom))
}

export default VideoDescriptionMobileDisplayPortal;