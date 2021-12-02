import React,{useState,useEffect} from "react";
import styled from "styled-components";


 const HeaderWave=styled.div`
 	position:absolute;
 	background-color:#A98DDE;
 	width:200%;
 	height:200%;
 	
 	${({startingTopLevel})=>
 		`top:${startingTopLevel}%;`
 	}
 
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

//100%

 //5% top is the cuttoff limit

  const SupportingWave=styled.div`
 	position:absolute;
 	background-color:#C8B0F4;
 	width:200%;
 	height:200%;
 	 ${({startingTopLevel})=>
 		`top:${startingTopLevel}%;`
 	}

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


const Waves=({tokenScore,maxTokenScore})=>{
	const [startingTopLevel,changeStartingTopLevel]=useState();

	useEffect(()=>{
		const percentileCompleted=tokenScore/maxTokenScore;
		const normalizedCompletion=percentileCompleted*100;
		const cssCompatibleTopLevel=105-normalizedCompletion;
		changeStartingTopLevel(cssCompatibleTopLevel);

	},[tokenScore]);
	return(
		<React.Fragment>
			<HeaderWave startingTopLevel={startingTopLevel}/>
			<SupportingWave startingTopLevel={startingTopLevel}/>
		</React.Fragment>
	)
}

export default Waves;
