import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';

const Container=styled.div`
	width:100%;
	height:100%;
	display:flex;
	flex-direction:column;
	margin-top:10%;
	padding:10px;
`;

const SubmissionOptionContainer=styled.div`
	position:fixed;
	left:53%;
	top:30%;
	height:20%;
	width:15%;
	background-color:white;
	z-index:30;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#9D9D9D;
	padding:5px;
	box-shadow: 1px 1px 5px #C1C1C1;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		width:60%;
		top:15%;
		left:35%;
		padding:20px;
	}

	@media screen and (max-width:650px){
		height:60%;
		overflow-y:scroll;
		left:5%;
		width:90%;
		top:25%;
	}
`;


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}

const VoteButtonCSS={
	padding:"10px",
	color:"white",
	backgroundColor:"#43D351",
	width:"30%",
	borderRadius:"5px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer"
}


/*
	question:"What do you think about pizza?",
	postType:"Images",
	votes:"23 votes"
*/
const ExtendedSubmission=({submissionData,closeModal})=>{
	console.log(submissionData);
	
	const [isSubmissionVotedOn,changeSubmissionVoteStatus]=useState(false);
	const [displaySubmissionOptions,changeDisplayOptionsModal]=useState(false);
	const [displayComments,changeDisplayComments]=useState(false);
	const [submissionComments,changeSubmissionComments]=useState([]);

	const voteSubmittedQuestion=()=>{
		changeSubmissionVoteStatus(!isSubmissionVotedOn);
	}

	const dropDownOptions=()=>{
		return(
			<React.Fragment>
				{displaySubmissionOptions==true &&(
					<SubmissionOptionContainer>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",cursor:"pointer"}} 
								onClick={()=>changeDisplayComments(true)}>
								Comments
							</li>
							<hr/>
						</ul>
					</SubmissionOptionContainer>
				)}
			</React.Fragment>
		)
	}

	return(
		<Container>
			{displayComments==true?
				<React.Fragment>
				</React.Fragment>:
				<React.Fragment>
					{dropDownOptions()}
					<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
						<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
							<img src={NoProfilePicture}
								style={{height:"40px",width:"46px",borderRadius:"50%"}}
							/>
							<p style={{marginLeft:"10%",fontSize:"18px"}}>
								<b>Nathan</b>
							</p>
						</div>
						<div style={DropDownCSS}>
							{displaySubmissionOptions==false ?
								<ExpandMoreIcon onClick={()=>changeDisplayOptionsModal(true)}
									style={{fontSize:"24"}}
								/>:
								<ExpandLessIcon onClick={()=>changeDisplayOptionsModal(false)}
									style={{fontSize:"24"}}
								/>
							}
						</div>
					</div>
					<hr style={HorizontalLineCSS}/>
					<p style={{marginTop:"5%"}}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						 exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
						 irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
						 pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
						 officia deserunt mollit anim id est laborum.
					</p>

					<div style={VoteButtonCSS} onClick={()=>voteSubmittedQuestion()}>
						<OfflineBoltIcon
							style={{color:"white",fontSize:"25"}}
						/>
						{isSubmissionVotedOn==false?
							<p style={{marginTop:"10%",marginLeft:"5%"}}>Vote</p>:
							<p style={{marginTop:"10%",marginLeft:"5%"}}>Un-Vote</p>
						}
						
					</div>
				</React.Fragment>
			}
		</Container>
	)
}


export default ExtendedSubmission;