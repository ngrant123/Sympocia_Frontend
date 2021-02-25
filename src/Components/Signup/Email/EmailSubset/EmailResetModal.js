import React,{useState} from "react";
import styled from "styled-components";

const Container=styled.div`
	position:absolute;
	top:20%;
	width:50%;
	border-radius:5px;
	height:50%;
	background-color:white;
	box-shadow:1px 1px 10px #d5d5d5;
	padding:20px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;
	@media screen and (max-width:650px){
		top:0%;
		width:100% !important;
		height:100% !important;
		padding-top:20%;
	}
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	 	padding-top:0%;
	 	top:0%;
		width:100% !important;
		height:100% !important;
    }
`;
const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:85%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;

	@media screen and (max-width:700px){
		width:95% !important;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		min-height:100px;
    }
`;

const Button=styled.div`

	   width:30%;
	   height:10%;
	   border-color: #C8B0F4;
	   border-style:solid;
	   background-color:#C8B0F4;
	   color:white;
	   text-decoration:none;

	   display: flex;
	   align-items: center;
	   justify-content: center;
	   transition:8s;
	  border-radius:5px;
	  padding:20px;
	  margin-bottom:10%;
	  cursor:pointer;
	   z-index:2;
	   &:hover{

	      background-color:white;

	    color:#C8B0F4;
	   border-style:solid;
	   border-color: #C8B0F4;
	   text-decoration:none;

	   }

	  @media screen and (max-width:400px) {top:78%}
	  @media screen and (max-width:330px) {top:79%;font-size:10px}
	  @media screen and (max-width:414px) {top:77%;}
	  @media screen and (max-height:570px) {top:85%}
	  @media screen and (max-height:530px) {top:75%;height:20%}
`;


const EmailReset=({triggerEmailConfirmationModal})=>{
	const [displayEnterPasswordPrompt,changeEnterPasswordPrompt]=useState(true);
	const verifyToken=()=>{
		changeEnterPasswordPrompt(false);
	}

	const setPasswordForUser=()=>{

	}
	return(
		<Container>
			<p style={{fontSize:"30px"}}>
				<b>Reset password</b>
			</p>
			{displayEnterPasswordPrompt==true?
				<React.Fragment>
					<p>Please enter the verification code that was sent to your email</p>
					<InputContainer placeholder="Enter verification code"/>
					<Button onClick={()=>verifyToken()}>
						Submit
					</Button>
				</React.Fragment>:
				<React.Fragment>
					<InputContainer placeholder="New Password"/>
					<InputContainer placeholder="Retype new Password"/>
					<Button onClick={()=>setPasswordForUser()}>
						Submit
					</Button>
				</React.Fragment>
			}
			<p style={{color:"#5298F8",cursor:"pointer"}} onClick={()=>triggerEmailConfirmationModal()}>
				Resend Verfication Code
			</p>
		</Container>
	)
}

export default EmailReset;