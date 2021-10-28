import React,{useState} from "react";
import styled,{keyframes} from "styled-components";
import {createPortal} from "react-dom";
import VideoCallImage5 from "../../../designs/background/AiyanahFullInterview.png";
import Bubbles from "./Bubbles.js";
import Waves from "./WaveDisplay.js";
import ClearIcon from '@material-ui/icons/Clear';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const keyFrameOsicallating1=keyframes`
	0% {
		width:100%;
		height:42%;
		left:0%;
	}
	100% {
		height:15%;
		width:100%;
	}
`;
const Container=styled.div`
	position:fixed;
	width:12%;
	height:20%;
	border-radius:50%;
	background-color:#C8B0F4;
	z-index:100;
	bottom: 10;
	right: 0;
	padding:10px;
	margin-right:25px;
`;

const CloseTokenDisplay=styled.div`
	position:absolute;
	border-radius:50%;
	height:30px;
	width:30px;
	background-color:white;
	z-index:30;
	margin-left:-20%;
	display:flex;
	justify-content:center;
	align-items:center;
	cursor:pointer;
`;	

const MinifiedTokenDisplay=styled.div`
	position:fixed;
	background-color:white;
	z-index:100;
	bottom: 10;
	right: 0;
	padding:10px;
	margin-right:25px;
	border-radius:5px;
	cursor:pointer;
	box-shadow: 1px 1px 10px #707070;
`;

const InnerTokenCSS={
	position:"relative",
	backgroundColor:"white",
	width:"100%",
	height:"100%",
	borderRadius:"50%",
	overflow:"hidden",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer"
}

const TokenDisplay=({targetDom})=>{
	const [displayMinifiedToken,changeDisplayMinifiedToken]=useState(true);

	return createPortal(
		<React.Fragment>
			{displayMinifiedToken==true?
				<MinifiedTokenDisplay onClick={()=>changeDisplayMinifiedToken(false)}>
					<ArrowLeftIcon
						style={{fontSize:"40"}}
					/>
				</MinifiedTokenDisplay>:
				<Container>
					<CloseTokenDisplay onClick={()=>changeDisplayMinifiedToken(true)}>
						<ClearIcon/>
					</CloseTokenDisplay>

					<Bubbles/>
					<div style={InnerTokenCSS}>
						<div style={{display:"flex",justifyContent:"center",alignItems:"center",position:"relative",textAlign:"center",borderRadius:"50%",padding:"10px"}}>
							<img src={VideoCallImage5} style={{width:"90%",height:"90%",borderRadius:"50%"}}/>
							<Waves/>
						</div>
					</div>
				</Container>
			}
		</React.Fragment>
	,document.getElementById(targetDom))
}

export default TokenDisplay;