import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:40;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
`;


const HighRankingPosts=({closeModal})=>{

	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>closeModal()}/>
			<Container>
				
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}

export default HighRankingPosts;


