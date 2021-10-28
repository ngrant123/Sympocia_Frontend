import React from "react";
import styled from "styled-components";


 const HeaderWave=styled.div`
 	position:absolute;
 	background-color:#A98DDE;
 	width:200%;
 	height:200%;
 	top:80%;
 	border-radius: 35%;
 	z-index:10;
 	animation: wave 7000ms infinite;

	@keyframes wave {
		0% {
			transform: rotate(10deg);
		}
		50%{
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(10deg);
		}
	}
 `;

  const SupportingWave=styled.div`
 	position:absolute;
 	background-color:#C8B0F4;
 	width:200%;
 	height:200%;
 	top:70%;
 	border-radius: 35%;
 	z-index:9;
 	animation: wave2 7000ms infinite;
 	transform: rotate(-150deg);

	@keyframes wave2 {
		0% {
			transform: rotate(10deg);
		}
		50%{
			transform: rotate(-180deg);
		}
		90% {
			transform: rotate(20deg);
		}
		100% {
			transform: rotate(10deg);
		}
	}
 `;


const Waves=()=>{
	return(
		<React.Fragment>
			<HeaderWave/>
			<SupportingWave/>
		</React.Fragment>
	)
}

export default Waves;
