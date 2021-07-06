import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import RegularPostDisplay from "../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import {RegularPostDisplayContainer} from "../../GeneralComponents/PostComponent/RegularPostComponent/indexCSS.js";

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

const RegularPostHomeDisplayPortal=(props)=>{
	
	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>props.closeModal()}/>
			<RegularPostDisplayContainer>
				<div onClick={()=>props.closeModal()} style={{cursor:"pointer",marginBottom:"5%"}}>
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