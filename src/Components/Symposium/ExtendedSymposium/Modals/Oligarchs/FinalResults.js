import React from "react";
import styled from "styled-components";

import {BackgroundModalContainer} from "../../indexCSS.js";


const Container=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	width:60%;
	height:70%;
	z-index:41;
	left:20%;
	top:15%;
	padding:20px;
	display:flex;
	flex-direction:column;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:20%;
		width:65%;
		left:15%;
	}
`;


const FinalResults=({closeModal})=>{
	return(
		<React.Fragment>
			<Container>
			</Container>
			<BackgroundModalContainer/>
		</React.Fragment>
	)
}

export default FinalResults;