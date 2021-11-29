import React,{useEffect,useRef,useState} from "react";
import styled,{keyframes} from "styled-components";

const AirplaneContainer=styled.div`
	position:absolute;
	z-Index:60;
	background-color:red;
	width:50px;
	height:50px;
`;



const Airplane=({startPoint,targetDivsInformation,startingPoint,divId})=>{
	const airplaneRef=useRef();
	const [displayCloudExplosionAnimation,changeDisplayCloudExplosionAnimation]=useState(false);

	let dynamicStyles;
	const addAnimation=(body)=>{
	  if (!dynamicStyles) {
	    dynamicStyles = document.createElement('style');
	    dynamicStyles.type = 'text/css';
	    document.head.appendChild(dynamicStyles);
	  }
	  
	  dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
	}

	useEffect(()=>{
		debugger;
		const {
			position:{
				top,
				left
			}
		}=targetDivsInformation;
		const {
			startingLeft,
			startingTop
		}=startingPoint;

		airplaneRef.current.style.top=top;
		airplaneRef.current.style.left=left;

		addAnimation(`@keyframes ${'airplaneFlowAnimation'+divId} {
		    0% {
		    	left:${startingLeft};
		    	top:${startingTop};
		    }
		    20%{
		    	transform: rotate(0deg) translateX(150px) rotate(0deg);
		    }
		    50%{
		    	transform: rotate(360deg) translateX(150px) rotate(-360deg);
		    }
		    95% {
		    	left:${left}px;
		    	top:${top}px;
		    	opacity:1;

		    	#gifHolder{
		    		opacity:0 !important;
		    	}
		    }
		}`);
		setTimeout(()=>{
			changeDisplayCloudExplosionAnimation(true);
		},6000);

		airplaneRef.current.style.animation = `${'airplaneFlowAnimation'+divId} 5s ease-in-out 0s forwards`;
	},[]);

	return(
		<AirplaneContainer ref={airplaneRef}>
			{displayCloudExplosionAnimation==false ?
				<p id="gifHolder" style={{opacity:1}}>Plane</p>:
				<p id="gifHolder" style={{opacity:1}}>Explosion</p>
			}
		</AirplaneContainer>
	)
}

export default Airplane;