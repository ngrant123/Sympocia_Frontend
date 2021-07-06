import styled from "styled-components";

export const VideoDisplayContainer=styled.div`
	position:fixed;
	background-color:red;
	z-index:40;
	height:90%;
	width:70%;
	border-radius:5px;
	top:5%;
	left:20%;
	background-color:white;
	padding:20px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		left:5%;
		width:90%;
	}
	@media screen and (max-width:700px){
		width:100% !important;
		top:0%;
		height:100% !important;
		margin-right:-10% !important;
		margin-left:-5% !important;
	}

`;