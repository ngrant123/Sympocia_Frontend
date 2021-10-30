import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";


const BackgroundModalContainer= styled.div`
	position:fixed;
	width:100%;
	height:140%;
	background: rgba(0, 0, 0, 0.5);
	z-index:51;
	top:0%;
	left:0%;
`;



const PortalHOCContainer=styled.div`
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

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		width:100% !important;
		left:0% !important;
		height:100% !important;
		top:0% !important;
		padding:10px !important;
    }
`;



const PortalHOC=({targetDom,closeModal,component})=>{
	return createPortal(
		<React.Fragment>
			<BackgroundModalContainer onClick={()=>closeModal()}/>
			<PortalHOCContainer>
				{component}
			</PortalHOCContainer>
		</React.Fragment>
	,document.getElementById(targetDom))
}


export default PortalHOC;