import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {useDispatch} from "react-redux";
import {signUpGuestUser} from "../../Actions/Redux/Actions/PersonalProfile.js";

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	border-radius:5px; 
	z-index:40;
	left:30%;
	top:20%;
	padding:30px;
	overflow:scroll;

	@media screen  and (max-width:1370px){
		width:90% !important;
		top:10%;
		left:5% !important;
		#closeOptionIconLI{
			display:none !important;
		}
    }

    @media screen and (max-width:650px){
    	height:80% !important;
    }
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:110%;
	left:-5%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:40;
	top:0px;
`;

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%",
  cursor:"pointer"
}

const GuestOnBoarding=({targetDom,closeModal,routerHistory})=>{
	const dispatch=useDispatch();

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
	const handleCloseModal=()=>{
		dispatch(signUpGuestUser());
		closeModal();
	}


	return createPortal(
		<>
			<ShadowContainer
				onClick={()=>handleCloseModal()}
			/>
			<Container>
				<p style={{fontSize:"40px"}}>
					<b>Welcome to Sympocia</b>
				</p>
				<hr/>
				<p>
					When you make a profile we give a bigger onboarding but since you're a guest we'll give you short one.
					<br/>
					<br/>
					Right now you're on the explore page where you can check out new things that goes on and if you look to your left 
					you'll see a section called symposiums. Symposiums are dedicated sections of our platform focused on a subject.
					Like I said before you're a guest so you wont be able to participate but you can still look around :)
				</p>
				<br/>
				<br/>
				<p>
					We know the guest experience is boring so whenever you want to sign up hit the me button (desktop) or the house symbol(mobile)
					and click sign up. Or just do it right now :)
				</p>
				<div style={{display:"flex",flexDirection:"row"}}>
					<p onClick={()=>routerHistory.push({
						pathname:'/signup'
					})} style={ButtonCSS}>
						Sign Up
					</p>
					<p onClick={()=>handleCloseModal()} style={ButtonCSS}>
						Close
					</p>
				</div>
			</Container>
		</>
	,document.getElementById(targetDom))
}

export default GuestOnBoarding;