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
	z-index:35;
	left:30%;
	top:20%;
	padding:30px;

	@media screen  and (max-width:1370px){
		width:90% !important;
		top:10%;
		left:5% !important;
		#closeOptionIconLI{
			display:none !important;
		}
    }
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:110%;
	left:-5%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:35;
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

const GuestOnBoarding=({targetDom,closeModal})=>{
	const dispatch=useDispatch();

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
	const handleCloseModal=()=>{
		//const  id=uuidv4();
		//dispatch(signUpGuestUser(id));
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
				 	We've noticed that you're currently not signed up to our platform. Thats okay we don't mind just go at
					your own pace but unfortunately you're signed in as a guest. Thats means you can go anything like commenting, posting,
					and all the other good stuff :( But feel free to explore and everything
				</p>

				<p style={ButtonCSS}>
					Close
				</p>
			</Container>
		</>
	,document.getElementById(targetDom))
}

export default GuestOnBoarding;