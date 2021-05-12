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
	left:25%;
	padding:10px;
	top:20%;
	border-radius:5px;
	background-color:white;
	z-index:40;
	overflow:scroll;

	@media screen and (max-width:1370px){
		width:80% !important;
		left:10% !important;
    }

    @media screen and (max-width:650px){
		width:90% !important;
		left:5% !important;
		height:75%;
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