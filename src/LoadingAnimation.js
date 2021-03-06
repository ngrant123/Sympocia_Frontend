import React from "react";
import styled,{keyframes} from "styled-components";
import StampIcon from "./designs/img/StampIcon.png";
import Typed from "react-typed";
import {useSelector} from "react-redux";


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

	${({isExtendedSymposium})=>
		isExtendedSymposium!=null &&(
			`
				height:300px;
				width:300px;
			`
	)}
	${({isScrollEnabled})=>
		isScrollEnabled!=null &&(
			`@media screen and (max-width:650px){
				display:none !important;
			}`
		)
	}


	@media screen and (max-width:1370px){
		width:60% !important;
		margin-left:-10%;
		#animationImage{
			height:90% !important;
		}
	}

	@media screen and (max-width:740px){
		#animationImage{
			width:75% !important;
			height:85% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	width:20% !important;
    }
`;
const LoadingAnimation=({isScrollEnabled,isExtendedSymposium})=>{
	const isGuestProfile=useSelector(state=>state.personalInformation.isGuestProfile);
	const loadingText=isGuestProfile==false?"Give us a second we're getting all your information":"Please wait..."
	return (
		<React.Fragment>
			<AnimationContainer isScrollEnabled={isScrollEnabled} isExtendedSymposium={isExtendedSymposium}>
				<img id="animationImage" src={StampIcon} style={{borderRadius:"50%",width:"60%",height:"70%"}} />
			</AnimationContainer>
			<p style={{fontSize:"30px",position:"fixed",top:"70%",left:"30%"}}> 
				<b>
					<Typed 
			           strings={[loadingText]} 
			           typeSpeed={60} 
			           backSpeed={30} 
	               />
	            </b>
			</p>
		</React.Fragment>
	)
}

export default LoadingAnimation;
