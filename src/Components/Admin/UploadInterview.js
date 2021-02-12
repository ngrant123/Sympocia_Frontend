import React,{useState} from "react";
import styled from "styled-components";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	padding:60px;
`;

const InterviewStepProcess=styled.div`
	display:flex;
	flex-direction:row;
	justify-content:center;
	align-content:center;
`;

const FirstStepContainer=styled.div`
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	margin-right:5%;
`;

const SecondStepContainer=styled.div`
	display:flex;
	flex-direction:column;
`;

const VideoDescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:5%;
`;

const VideoContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const InputContainer=styled.textarea`
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ButtonContainer={
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"5%",
  marginBottom:"5%",
  marginTop:"5%",
  width:"40%"
}
const BackContainerCSS={
	...ButtonContainer,
	width:"20%"
}



const UploadInterview=()=>{
	const [displayFirstStep,changeFirstStep]=useState(true);
	const [displaySecondStep,changeSecondStep]=useState(false);                                           
	const [videoUrl,changeVideoUrl]=useState();

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const uploadFile=()=>{
		const reader=new FileReader();
		const file=document.getElementById("uploadedInterviewFile").files[0];

		reader.onload=()=>{
			debugger;
			const data=reader.result;
			changeVideoUrl(data);
			changeSecondStep(true);
		}

		if(file!=null){
			debugger;
			const chunks=sliceFile(file);
		}else{
			alert('An error has occured');
		}
	}
	const sliceFile=(file)=>{
		let chunks=[];

	}
	const initialStep=()=>{
		return(
			<FirstStepContainer>
				<p style={{fontSize:"30px"}}>
					<b>Step 1: Upload File</b>
				</p>
				<input id="uploadedInterviewFile" onChange={()=>uploadFile()} type="file"/>
			</FirstStepContainer>
		)
	}

	const editFileStep=()=>{
		return (
			<SecondStepContainer>
				<p style={{fontSize:"30px"}}>
					<b>Step 2: Submit File</b>
				</p>
				<VideoContainer>
					<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline width="30%" height="100%">
						<source src={videoUrl} type="video/mp4"/>
					</video>

					<VideoDescriptionContainer>
						<InputContainer placeholder="Enter video title"/>
						<div style={ButtonContainer}>
							Submit
						</div>
					</VideoDescriptionContainer>
				</VideoContainer>
			</SecondStepContainer>
		)
	}
	return(
		<Container>
			<div style={BackContainerCSS}>
				Back
			</div>
			<InterviewStepProcess>
				{displayFirstStep==true &&(
					<>{initialStep()}</>
				)}

				{displaySecondStep==true &&(
					<>{editFileStep()}</>
				)}

			</InterviewStepProcess>


		</Container>
	)
}

export default UploadInterview;


