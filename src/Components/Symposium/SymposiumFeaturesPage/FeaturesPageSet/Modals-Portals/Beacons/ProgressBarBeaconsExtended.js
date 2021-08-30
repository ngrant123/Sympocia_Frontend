import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const BackgroundModalContainer= styled.div`
	position:fixed;
	width:100%;
	height:140%;
	background: rgba(0, 0, 0, 0.5);
	z-index:40;
	top:0%;
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:70%;
	z-index:41;
	left:30%;
	top:15%;
	padding:10px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;
	overflow-x:auto;

	@media screen and (max-width:1370px){
		width:80%;
		left:10%;
	}

	@media screen and (max-width:650px){
		height:100%;
		overflow-y:scroll;
		left:0%;
		width:100%;
		top:0%;

		#mobileCloseModalIcon{
			display:block !important;
		}
	}
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const ProgressBarBeaconsExtended=({closeModal})=>{
	const mobileCloseIcon=()=>{
		return(
			<div id="mobileCloseModalIcon" style={{cursor:"pointer",display:"none"}} 
				onClick={()=>closeModal()}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}
	return createPortal(
		<React.Fragment>
			<BackgroundModalContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{mobileCloseIcon()}
				<p style={{fontSize:"24px"}}>
					<b>Progress Bar</b>
				</p>
				<hr style={HorizontalLineCSS}/>
			</Container>
		</React.Fragment>
	,document.getElementById("symposiumFeaturesPage"))
}


export default ProgressBarBeaconsExtended;