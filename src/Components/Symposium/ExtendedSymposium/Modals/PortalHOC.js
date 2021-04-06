import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

import {
	BackgroundModalContainer
} from "../indexCSS.js";

const PortalHOCContainer=styled.div`
	position:absolute;
	height:55%;
	width:60%;
	left:20%;
	padding:10px;
	top:20%;
	border-radius:5px;
	background-color:white;
	z-index:40;

	@media screen and (max-width:1370px){
		width:80% !important;
		left:10% !important;
    }
`;


const PortalHOC=({component,closeModal})=>{
	return createPortal(
		<React.Fragment>
			<BackgroundModalContainer onClick={()=>closeModal()}/>
			<PortalHOCContainer>
				{component}
			</PortalHOCContainer>
		</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"))
}
export default PortalHOC;