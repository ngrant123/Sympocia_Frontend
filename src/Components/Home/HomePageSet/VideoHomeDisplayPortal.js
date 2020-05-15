import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const ShadowContainerRecommenedImages=styled.div`
	position:absolute;
	width:280px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
`;

const VideoHomeDisplayPortal=()=>{

	return createPortal(
		<React.Fragment>
			<ShadowContainerRecommenedImages/>
			
		</React.Fragment>
	,document.getElementById("homePageContainer");
}
export default VideoHomeDisplayPortal;