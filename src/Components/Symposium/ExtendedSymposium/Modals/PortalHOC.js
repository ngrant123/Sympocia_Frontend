import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

import {
	BackgroundModalContainer
} from "../indexCSS.js";

const PortalHOCContainer=styled.div`
	position:fixed;
	height:55%;
	width:40%;
	left:30%;
	top:20%;
	border-radius:5px;
	background-color:white;
	z-index:40;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:80% !important;
		left:10% !important;
    }

    @media screen and (max-width:650px){
		width:100% !important;
		left:0% !important;
		height:100%;
		top:0%;
    }
`;


const PortalHOC=({component,closeModal})=>{

	const closeIcon=()=>{
		return(
			<div style={{marginBottom:"2%",cursor:"pointer"}} onClick={()=>closeModal()}>
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
			<BackgroundModalContainer onClick={()=>closeModal()}/>
			<PortalHOCContainer>
				{closeIcon()}
				{component}
			</PortalHOCContainer>
		</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"))
}
export default PortalHOC;