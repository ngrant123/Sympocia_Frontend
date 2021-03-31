import React from "react";
import styled from "styled-components";
import Particles from 'react-particles-js';
import StampIcon from "../../designs/img/StampIcon.png";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:white;
`;

const NoFoundContainer=styled.div`
	position:absolute;
	display:flex;
	flex-direction:row;
	justify-content:center;
	padding-top:20%;
	margin-left:30%;
	top:0%;

	@media screen and (max-width:1370px){
		flex-direction:column;
		margin-left:10%
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	top:-10%;
    }
`;

const StampContainer=styled.div`
	width:200px;
	height:180px;
	border-radius:50%;
	background-color:green;

	@media screen and (max-width:670px){
		width:100px;
		height:80px;
	}
`;

const TextAndRedirectionContainer=styled.div`
	flex-direction:column;
	margin-left:5%;

	@media screen and (max-width:670px){
		width:80% !important;
	}
`;

const Button={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}


const PageNotFoundDisplay=()=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const isGuestProfile=personalInformation.id=="0"|| personalInformation.isGuestProfile?true:false;

	const buttonText=isGuestProfile==true?
					<Link to={{pathname:'/signup'}}>
						<p style={Button}> Sign Up </p>
					</Link>:
					<Link to={{pathname:'/home'}}>
						<p style={Button}>Home</p>
					</Link>
	return(
		<Container>	
			<div>
				<Particles	
				    params={{	
					    "particles": {	
					        "number": {	
					            "value": 100	
					        },	
					        "size": {	
					            "value": 3	
					        },	
					        "color": {	
						      "value": "#000000"	
						    },	
						    "line_linked": {	

					      "color": "#000000",	

					    	}	
					    },	
					    "interactivity": {	
					        "events": {	
					            "onhover": {	
					                "enable": true,	
					                "mode": "repulse"	
					            }	
					        }	
					    },	
					}}	
				/>	
			</div>
			<NoFoundContainer>
				<StampContainer>
					<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
				</StampContainer>
				<TextAndRedirectionContainer>
					<p style={{fontSize:"30px"}}>
						<b>Page Not Found </b>
					</p>
					<p>Unfortunately the page you entered is not available :(. Maybe enter another url?</p>

					{buttonText}
				</TextAndRedirectionContainer>
			</NoFoundContainer>
		</Container>
	)
}

export default PageNotFoundDisplay;