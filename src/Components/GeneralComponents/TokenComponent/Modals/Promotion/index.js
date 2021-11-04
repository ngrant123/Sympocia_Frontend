import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import VideoCallImage5 from "../../../../../designs/background/AiyanahFullInterview.png";

const Container=styled.div`
	position:fixed;
	height:55%;
	width:40%;
	left:30%;
	top:20%;
	z-index:51;
	background-color:white;
	border-radius:5px;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	padding:10%;
`;

const UnlockedFeaturesCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"#C8B0F4",
	borderRadius:"5px",
	padding:"10px",
	color:"white",
	marginRight:"2%",
	cursor:"pointer",
	textAlign:"center",
	width:"90%"
}

const Promotion=()=>{
	const [currentTier,changeTierLevel]=useState("Bronze");
	return (
		<Container>
			<img src={VideoCallImage5} 
				style={{width:"55%",height:"90%",borderRadius:"50%",marginBottom:"5%"}}
			/>
			<p style={{width:"70%",marginBottom:"20%"}}>
				<b>Congratulations!!! You have ascended to the next stage</b>
			</p>

			<div style={UnlockedFeaturesCSS}>
				<p style={{fontSize:"18px"}}>View Unlocked Features</p>
			</div>
		</Container>
	)
}

export default Promotion;