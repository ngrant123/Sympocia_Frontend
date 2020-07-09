import React from "react";
import styled,{keyframes} from "styled-components";
import StampIcon from "./designs/img/StampIcon.png";
import Typed from "react-typed";


const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color:white;
	z-index:99;
	top:0px;
	filter: blur(4px);
`;

const keyFrameAnimation=keyframes`
	0%{
	}
	100%{
		transform: rotate(360deg);
	}
`;

const AnimationContainer=styled.div`
	position:fixed;
	z-index:100;
	left:37%;
	top:30%;
	width:20%;
	height:30%;
	filter: blur(4px);
	animation:${keyFrameAnimation} 3s ease-in-out 0s forwards infinite;
`;
const LoadingAnimation=()=>{

	return (
		<React.Fragment>
			<AnimationContainer>
				<img src={StampIcon} style={{borderRadius:"50%",width:"60%",height:"70%"}} />
			</AnimationContainer>
			<p style={{fontSize:"30px",position:"fixed",top:"70%",left:"30%"}}> 
				<b><Typed 
			           strings={['Give us a second were getting all your information']} 
			           typeSpeed={60} 
			           backSpeed={30} 
	               />
	            </b>
			</p>
		</React.Fragment>
	)
}

export default LoadingAnimation;
