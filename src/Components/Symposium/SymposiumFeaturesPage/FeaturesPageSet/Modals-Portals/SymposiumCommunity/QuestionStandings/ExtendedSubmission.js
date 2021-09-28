import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import {
	createCommunityQuestionStandingComment,
	upvoteCommunityQuestion,
	removeVoteFromCommunityQuestion
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import {
	getSpecificQuestionStandingComments,
	hasProfileInteractedWithQuestionStanding
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	width:100%;
	height:100%;
	display:flex;
	flex-direction:column;
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

const SimplifiedInputContainer=styled.textarea`
	width:100%;
	resize:none;
	padding:5px;
	height:45px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
	border-radius:5px;
	margin-bottom:10%;
`;


const ExtendedInputContainer=styled.textarea`
	width:100%;
	resize:none;
	padding:5px;
	height:160px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
	border-radius:5px;
	margin-bottom:2%;
	margin-top:2%;
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
	padding:"5px",
	color:"white",
	backgroundColor:"#43D351",
	width:"20%",
	borderRadius:"5px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer"
}

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
	cursor:"pointer",
	width:"30%",
	marginTop:"5%"
}
const ExtendedSubmission=({submissionData,closeModal,currentSymposiumId,isGuestProfile})=>{

	const [isSubmissionVotedOn,changeSubmissionVoteStatus]=useState(false);
	const [displaySubmissionOptions,changeDisplayOptionsModal]=useState(false);
	const [displayComments,changeDisplayComments]=useState(false);
	const [displayCommentCreation,changeDisplayCommentCreation]=useState(false);
	const [submissionComments,changeSubmissionComments]=useState([]);
	const [submittingComment,changeSubmittingComment]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await hasProfileInteractedWithQuestionStanding(
												personalInformation.id,
												submissionData._id);
			if(confirmation=="Success"){
				const {message}=data;
				changeSubmissionVoteStatus(message);	
			}
		}
		fetchData();
	},[]);

	const upvoteQuestion=async()=>{
		const upvoteInformation={
			symposiumId:currentSymposiumId,
			communityQuestionId:submissionData._id,
			voterProfileId:personalInformation.id,
			voterFirstName:personalInformation.firstName
		}
		const {confirmation,data}=await upvoteCommunityQuestion(upvoteInformation);
		if(confirmation=="Success"){
			changeSubmissionVoteStatus(!isSubmissionVotedOn);
		}else{
			alert('Unfortunately there has been an error upvoting this question. Please try again');
		}
	}

	const unvoteQuestion=async()=>{
		const unvoteInformation={
			voterProfileId:personalInformation.id,
			questionId:submissionData._id,
			symposiumId:currentSymposiumId
		}

		const {confirmation,data}=await removeVoteFromCommunityQuestion(unvoteInformation);
		if(confirmation=="Success"){
			changeSubmissionVoteStatus(!isSubmissionVotedOn);
		}else{
			alert('Unfortunately there has been an error unvoting this question. Please try again');
		}
	}

	const voteSubmittedQuestion=()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			if(isSubmissionVotedOn==false){
				upvoteQuestion();
			}else{
				unvoteQuestion();
			}
		}
	}

	const retrieveComments=async()=>{
		const {confirmation,data}=await getSpecificQuestionStandingComments(submissionData._id);
		if(confirmation=="Success"){
			const {message}=data;
			changeSubmissionComments([...message]);
			changeDisplayComments(true);
		}else{
			alert('Unfortunately there has been an error retrieving these comments. Please try again');
		}
	}

	const createComment=async()=>{
		changeSubmittingComment(true);
		const commentValue=document.getElementById("commentValue").value;
		if(commentValue==""){
			alert("Please enter a value");
		}else{
			const {confirmation,data}=await createCommunityQuestionStandingComment({
				questionId:submissionData._id,
				comment:commentValue,
				ownerId:personalInformation.id,
				ownerFirstName:personalInformation.firstName,
				symposiumId:currentSymposiumId
			})

			if(confirmation=="Success"){
				const {message}=data;
				const comment={
					_id:message._id,
					comment:commentValue,
					profilePicture:message.profilePicture,
					owner:{
						profileId:personalInformation.id,
						firstName:personalInformation.firstName
					}
				}

				const currentCommments=submissionComments;
				currentCommments.splice(0,0,comment);
				changeSubmissionComments([...currentCommments]);
				changeDisplayCommentCreation(false);
			}else{
				alert('Unfortunately there has been an error creating this comment. Please try again')
			}
		}
		changeSubmittingComment(false);
	}

	const dropDownOptions=()=>{
		return(
			<React.Fragment>
				{displaySubmissionOptions==true &&(
					<SubmissionOptionContainer>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",cursor:"pointer"}} 
								onClick={()=>retrieveComments()}>
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
				<div>
					{displayCommentCreation==true?
						<React.Fragment>
							<div style={ButtonCSS} onClick={()=>changeDisplayCommentCreation(false)}>
								Back
							</div>
							<ExtendedInputContainer	
								id="commentValue"
								placeholder="Create a comment"
							/>
							{submittingComment==true?
								<p>Please wait...</p>:
								<div style={ButtonCSS} onClick={()=>createComment()}>
									Submit
								</div>
							}
						</React.Fragment>:
						<React.Fragment>
							<div style={ButtonCSS} onClick={()=>changeDisplayComments(false)}>
								Back
							</div>
							<hr/>
							<SimplifiedInputContainer
								placeholder="Create a comment"
								onClick={()=>changeDisplayCommentCreation(true)}
							/>
							{submissionComments.map(data=>
								<div style={{display:"flex",flexDirection:"row",marginBottom:"5%"}}>
									<img src={data.profilePicture==null?
												NoProfilePicture:data.profilePicture}
										style={{height:"40px",width:"46px",borderRadius:"50%"}}
									/>
									<div style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
										<p>
											<b>{data.owner.firstName}</b>
										</p>
										<p>{data.comment}</p>
									</div>
								</div>
							)}
						</React.Fragment>
					}
				</div>:
				<React.Fragment>
					{dropDownOptions()}
					<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
						<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
							<img src={submissionData.profilePicture==null?
										NoProfilePicture:submissionData.profilePicture}
								style={{height:"40px",width:"46px",borderRadius:"50%"}}
							/>
							<p style={{marginLeft:"10%",fontSize:"18px"}}>
								<b>{submissionData.owner.firstName}</b>
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
					
					<p style={{marginTop:"5%"}}>{submissionData.question}</p>

					<hr style={HorizontalLineCSS}/>
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