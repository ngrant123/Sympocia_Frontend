import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:50;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:50%;
	height:70%;
	background-color:white;
	z-index:50;
	top:15%;
	border-radius:5px;
	left:25%;
	padding:10px;
	overflow-y:auto;
	@media screen and (min-width:2500px){
		height:50%;
	}


	@media screen and (max-width:1370px){
		width:75% !important;
		left:15% !important;
    }

    @media screen and (max-width:600px){
		width:90% !important;
		left:5% !important;
    }
     @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		top:25% !important;
    }
`;


const UserOptionsHOC=({optionsElement,closeModal})=>{
	const element=optionsElement();
	return createPortal(
				<>
					<ShadowContainer
						onClick={()=>closeModal()}
					/>
					<Container>
						{element}
					</Container>
				</>
		,document.getElementById("blogPostContainer"))
}

export default UserOptionsHOC;