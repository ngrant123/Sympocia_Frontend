import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import RegularPostDisplay from "../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";


const ShadowContainer=styled.div`
	position:fixed;
	width:110%;
	height:100%;
	margin-left:-5%;
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
	height:55%;
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
	
	@media screen and (max-width:1370px) and (max-height:1030px){
    	left:10% !important;
    }


	@media screen and (max-width:1030px){
		left:10% !important;
		width:80% !important;
	}

	@media screen and (max-width:450px){
		left:0% !important;
		height:100% !important;
		width:100% !important;

	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
			height:70% !important;
    }
`;

const RegularPostHomeDisplayPortal=(props)=>{
	
	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>props.closeModal()}/>
			<RegularPostDisplayContainer>
				<div onClick={()=>props.closeModal()} style={{marginBottom:"5%"}}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
					</svg>
				</div>
				<RegularPostDisplay
					postData={props.selectedPost}
					targetDom={props.targetDom}
				/>
			</RegularPostDisplayContainer>
		</React.Fragment>
	,document.getElementById(props.targetDom));
}
export default RegularPostHomeDisplayPortal;