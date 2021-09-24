import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const Container=styled.div`
	position:fixed;
	left:10%;
	top:50%;
	height:30%;
	width:20%;
	background-color:white;
	z-index:30;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#9D9D9D;
	padding:5px;
	box-shadow: 1px 1px 5px #C1C1C1;
	overflow-y:auto;
	padding:20px;

	@media screen and (max-width:1370px){
		width:40%;
		top:25%;
	}

	@media screen and (max-width:650px){
		height:60%;
		overflow-y:scroll;
		left:5%;
		width:50%;
		top:25%;
	}
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0);
	z-index:29;
	top:0px;
`;


const CommunityOptions=({closeModal})=>{
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<li style={{listStyle:"none",cursor:"pointer"}}>
					View all
				</li>
				<hr/>
				<li style={{listStyle:"none",cursor:"pointer"}}>
					Popular
				</li>
				<hr/>
				<li style={{listStyle:"none",cursor:"pointer"}}>
					Recent
				</li>
			</Container>
		</React.Fragment>
	,document.getElementById("symposiumFeaturesPage"))
}


export default CommunityOptions;