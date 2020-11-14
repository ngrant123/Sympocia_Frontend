import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:5;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:5;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
	@media screen and (max-width:1030px){
		width:40% !important;
		left:30% !important;
    }

    @media screen and (max-width:600px){
		width:90% !important;
		left:5% !important;
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