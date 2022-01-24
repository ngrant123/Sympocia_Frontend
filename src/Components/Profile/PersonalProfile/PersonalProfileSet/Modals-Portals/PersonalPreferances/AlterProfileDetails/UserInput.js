import React,{useState} from "react";
import styled from "styled-components";

const Container=styled.div`
	position:absolute;
	width:90%;
	display:flex;
	flex-direction:column;
	@media screen and (min-width:2500px){
		margin-left:-5%;
		#submitButton{
			font-size:24px !important;
		}
	}
`;
const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:90%;
	height:40%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-top:5%;
	margin-bottom:5%;

	@media screen and (min-width:2500px){
		width:120%;
		height:70% !important;
		font-size:30px !important;
	}

	@media screen and (max-width:550px){
		width:90% !important;
		height:150px !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:90% !important;
		height:90px !important;
   	}
`;


const SumbitButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"#C8B0F4",
  borderRadius:"5px",
  padding:"10px",
  color:"white",
  cursor:"pointer",
  width:"90%",
  cursor:"pointer"
}

const BackButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  width:"20%"
}


const UserInput=({bubbleUpResponse,closeModal,editProfileParameter})=>{
	const editParameter="Change "+editProfileParameter+" here";
	const [isSubmitting,changeSubmittingStatus]=useState(false);

	const sendResponse=()=>{
		const userInput=document.getElementById("input").value;
		if(userInput!="")
			bubbleUpResponse({userInput,changeSubmittingStatus,isAccessTokenUpdated:false});
		else
			alert('Please enter a value');
	}

	return(
		<Container>
			<div style={BackButton} onClick={()=>closeModal()}>
				Back
			</div>
			<InputContainer
				id="input"
				placeholder={editParameter}
			/>

			{isSubmitting==false?
				<div id="submitButton" onClick={()=>sendResponse()} style={SumbitButton}>
					Submit
				</div>:
				<p>Submitting please wait...</p>
			}
		</Container>
	)
}

export default UserInput;