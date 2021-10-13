import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExtendedSubmission from "./ExtendedSubmission.js";

const Container=styled.div`
	width:100%;
	height:100%;
	padding:20px;
	overflow-y:auto;
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const VotesCSS={
	padding:"10px",
	color:"white",
	backgroundColor:"#43D351",
	width:"70%",
	borderRadius:"5px",
	display:"flex",
	justifyContent:"center",
	alignItems:"center"
}

const BackButtonCSS={
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
	width:"30%"
}


const CurrentSubmissions=({currentQuestions})=>{
	const [selectedSubmission,changeSelectedSubmission]=useState();

	const mobileCloseIcon=()=>{
		return(
			<div id="mobileCloseModalIcon" style={{cursor:"pointer",display:"none"}} >
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}

	return (
		<Container>
			{selectedSubmission!=null?
				<React.Fragment>
					<div style={BackButtonCSS} onClick={()=>changeSelectedSubmission(null)}>
						Back
					</div>
					<ExtendedSubmission
						submissionData={selectedSubmission}
					/>
				</React.Fragment>:
				<React.Fragment>
					<p style={{fontSize:"24px"}}>
						<b>Submissions</b>
					</p>
					<hr style={HorizontalLineCSS}/>

					{currentQuestions.map(data=>
						<React.Fragment>
							<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}
								onClick={()=>changeSelectedSubmission(data)}>
								<img src={NoProfilePicture}
									style={{height:"40px",width:"46px",borderRadius:"50%"}}
								/>
								<div style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
									<p>
										<b>Nathan</b>
									</p>
									<p>{data.question}</p>
									<div style={VotesCSS}>
										{data.votes}
									</div>
								</div>
							</div>
							<hr style={HorizontalLineCSS}/>
						</React.Fragment>
					)}
				</React.Fragment>
			}
		</Container>
	)
}

export default CurrentSubmissions;