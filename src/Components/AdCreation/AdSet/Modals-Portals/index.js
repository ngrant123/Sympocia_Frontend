import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:51;
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
	z-index:50;
	top:0px;
`;


const PortalHOC=({component,closeModal})=>{
	return createPortal(
		<React.Fragment>
			<Container>
				{component}
			</Container>
			<ShadowContainer onClick={()=>closeModal()}/>
		</React.Fragment>
	,document.getElementById("adsContainer"))
}

export default PortalHOC;