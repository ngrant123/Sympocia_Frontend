import React from "react";
import styled from "styled-components";
import {createBadge} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:100%;
	height:70px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const CreateButtonCSS={
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
  marginTop:"5%"
}

const Creation=({profileId})=>{
	const createBadge=async()=>{
		const {confirmation,data}=await createBadge();
	}
	return(
		<React.Fragment>
			<p>
				<b>Create a badge caption here</b>
			</p>
			<InputContainer
				placeholder="Enter a badge caption"
			/>
			<div style={CreateButtonCSS} onClick={()=>createBadge()}>
				Create
			</div>
		</React.Fragment>
	)
}

export default Creation;