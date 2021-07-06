import styled from "styled-components";



export const RegularPostDisplayContainer=styled.div`
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
		top:5%; 
		width:95%;
		border-radius:5px;
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

	@media screen and (max-width:650px){
		top:0% !important;
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