import React,{useEffect,useRef,useState} from "react";
import styled,{keyframes} from "styled-components";
import AirPlane from "../../../../designs/img/AirPlane.svg";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import AnimatedExplosion from "../../../../designs/gifs/CloudAnimation.gif";
import {Link} from "react-router-dom";

const AirplaneContainer=styled.div`
	position:fixed;
	z-Index:60;
	width:60px;
	height:60px;
	border-radius:50%;
`;


const AirPlaneImageCSS={
	width:"100%",
	height:"100%",
	borderRadius:"50%",
	transform:"rotate(20deg)"
}

const ProfilePictureContainerCSS={
	position:"absolute",
	backgroundColor:"yellow",
	width:"35px",
	height:"35px",
	overflow:"hidden",
	zIndex:"10",
	borderRadius:"50%",
	transform:"rotate(-7deg)",
	marginTop:"-1px",
	marginLeft:"33%"
}

const ProfilePictureDividerCSS={
	position:"absolute",
	width:"100%",
	height:"20px",
	backgroundColor:"blue",
	zIndex:"11",
	bottom:"-10",
	backgroundColor:"white",
	borderTop:"2px solid black"
}

const Airplane=(props)=>{
	console.log(props);
	const {
		startingPoint,
		targetDivsInformation,
		divId,
		profilePicture,
		profileIdAccessing
	}=props;

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
		
		const firstRevolutionTransformation=top>200?
			`rotate(360deg) translateX(150px) rotate(-360deg);`:
	    	`rotate(0deg) translateX(150px) rotate(0deg);`;

		const secondRevolutionTransformation=top>200?
			`rotate(0deg) translateX(150px) rotate(0deg);`:
    		`rotate(360deg) translateX(150px) rotate(-360deg);`;

		addAnimation(`@keyframes ${'airplaneFlowAnimation'+divId} {
		    0% {
		    	left:${startingLeft};
		    	top:${startingTop};
		    	bottom:0;
		    }
		    20%{
		    	transform:${firstRevolutionTransformation}
		    }
		    50%{
		    	transform:${secondRevolutionTransformation}
		    }
		    95% {
		    	left:${left}px;
		    	top:${top}px;
		    	opacity:1;
		    }
		}`);
		setTimeout(()=>{
			changeDisplayCloudExplosionAnimation(true);
			setTimeout(()=>{
				airplaneRef.current.style.display="none";
			},1000)
		},6000);

		airplaneRef.current.style.animation = `${'airplaneFlowAnimation'+divId} 5s ease-in-out 0s forwards`;
	},[]);

	return(
		<AirplaneContainer ref={airplaneRef} id="airPlaneContainer">
			{displayCloudExplosionAnimation==false ?
				<Link to={{pathname:`/profile/${profileIdAccessing}`}}>
					<div style={{position:"relative",width:"100%",height:"100%"}}>
						<div style={ProfilePictureContainerCSS}>
							<img src={profilePicture==null?
								NoProfilePicture:profilePicture} 
								style={{width:"100%",height:"100%",borderRadius:"50%",zIndex:"10"}}/>
							<div style={ProfilePictureDividerCSS}/>
						</div>
						<div>
							<img id="airPlane" src={AirPlane} style={AirPlaneImageCSS}/>
						</div>
					</div>
				</Link>:
				<p>
					<img src={AnimatedExplosion} style={{width:"100%",height:"95%",borderRadius:"50%"}}/>
				</p>
			}
		</AirplaneContainer>
	)
}

export default Airplane;