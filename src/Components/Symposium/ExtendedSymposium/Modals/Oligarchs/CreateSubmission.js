import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux"

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
  marginRight:"4%",
  cursor:"pointer",
  width:"30%"
}


const InputContainer=styled.textarea`
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	margin-top:2%;
	width:100%;
	height:200px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;


const CreateSubmission=({addNewElectionContestant,closeCreationModal})=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const submit=()=>{
		const submissionElectionSpeech=document.getElementById("electionSpeech").value;
		if(submissionElectionSpeech.length<20){
			alert('Your election speech is too small. We require a minimum length of 20 so add more stuff')
		}else{
			const contestant={
				firstName:personalInformation.firstName,
				_id:personalInformation.id,
				electionSpeech:submissionElectionSpeech
			}
			addNewElectionContestant(contestant);
		}
	}
	return(
		<React.Fragment>
			<div onClick={()=>closeCreationModal()} style={ButtonCSS}>
				Back
			</div>
			<div>
				<p style={{marginTop:"5%",fontSize:"24px"}}>
					<b>Create Oligarch Submission</b>
				</p>
				<p>Let everyone know why you're running for a place in the oligarch </p>
				<InputContainer id="electionSpeech"/>
				<div onClick={()=>submit()} style={{...ButtonCSS,marginTop:"5%"}}>
					Submit
				</div>
			</div>
		</React.Fragment>
	)
}

export default CreateSubmission;