import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import RegularPostDisplay from "../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";


const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	z-index:45;
	height:85%;
	width:80%;
	border-radius:5px;
	top:5%;
	left:5%;
	overflow-y:auto;
`;

const RegularPostDisplayContainer=styled.div`
	position:fixed;
	z-index:45;
	height:40%;
	top:20%; 
	width:60%;
	border-radius:5px;
	left:20%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
	box-shadow: 1px 1px 5px #707070; 

	@media screen and (max-width:1360px){
		position:fixed;
		z-index:45;
		height:90%;
		width:95%;
		border-radius:5px;
		top:15%;
		left:5%;
		overflow-y:auto;
		background-color:white;
	}
`;

const RegularPostHomeDisplayPortal=(props)=>{
	
	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>props.closeModal()}/>
			<RegularPostDisplayContainer>
				<RegularPostDisplay
					postData={props.selectedPost}
				/>
			</RegularPostDisplayContainer>
		</React.Fragment>
	,document.getElementById(props.targetDom));
}
export default RegularPostHomeDisplayPortal;