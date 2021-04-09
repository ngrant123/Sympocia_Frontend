import React from "react";
import styled from "styled-components";

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
  cursor:"pointer"
}


const UserInput=({bubbleUpResponse,closeModal})=>{
	const sendResponse=()=>{
		const userInput=document.getElementById("input").value;
		if(userInput!="")
			bubbleUpResponse(userInput);
		else
			alert('Please enter a value');
	}

	return(
		<React.Fragment>
			<div style={BackButton} onClick={()=>closeModal()}>
				Back
			</div>
			<InputContainer
				id="input"
				placeholder="Change first name here"
			/>

			<div onClick={()=>sendResponse()} style={SumbitButton}>
				Submit
			</div>
		</React.Fragment>
	)
}

export default UserInput;