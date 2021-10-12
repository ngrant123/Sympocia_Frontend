import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import RegularPostDisplay from "../../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import {RegularPostDisplayContainer} from "../../../GeneralComponents/PostComponent/RegularPostComponent/indexCSS.js";

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
	const closeModal=()=>{
		props.closeModal();
	}
	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>props.closeModal()}/>
			<RegularPostDisplayContainer>
				<RegularPostDisplay
					postData={props.selectedPost}
					targetDom={props.targetDom}
					closePostModal={closeModal}
				/>
			</RegularPostDisplayContainer>
		</React.Fragment>
	,document.getElementById(props.targetDom));
}
export default RegularPostHomeDisplayPortal;