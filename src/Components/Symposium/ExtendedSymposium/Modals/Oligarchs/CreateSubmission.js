import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {
	createOligarchVoterCard,
	editOligarchVoteCard,
	deleteOligarchVoteCard
} from "../../../../../Actions/Requests/OligarchRequests/OligarchAdapter.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {retrieveOwnerVoterCardIfItExits} from "../../../../../Actions/Requests/OligarchRequests/OligarchRetrieval.js";



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

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%",
	cursor:"pointer",
	marginTop:"5%"
}



const CreateSubmission=({addNewElectionContestant,closeCreationModal,symposiumId})=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isProcessing,changeProcessingStatus]=useState();
	const [editOligarchCardDisplay,changeEditOligarcCardDisplay]=useState(false);
	const [previousOwnerOligarchCardInformation,changePreviousOwnerOligarchCard]=useState();
	const dispatch=useDispatch();
	useEffect(()=>{
		retrieveOwnerOligarchCard();
	},[]);

	const retrieveOwnerOligarchCard=async()=>{
		const {confirmation,data}=await retrieveOwnerVoterCardIfItExits(symposiumId,personalInformation.id);
		debugger;
		if(confirmation=="Success"){
			const {message}=data;
			if(message!=null){
				changeEditOligarcCardDisplay(true);
				changePreviousOwnerOligarchCard(message);
				document.getElementById("electionSpeech").value=message.electionSpeech;
			}
		}
	}

	const submit=async({isAccessTokenUpdated,updatedAccessToken})=>{
		if(personalInformation.isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeProcessingStatus(true);
			const submissionElectionSpeech=document.getElementById("electionSpeech").value;
			if(submissionElectionSpeech.length<20){
				alert('Your election speech is too small. We require a minimum length of 20 so add more stuff')
			}else{
				const {confirmation,data}=await createOligarchVoterCard(
					{
						ownerId:personalInformation.id,
			            electionSpeech:submissionElectionSpeech,
			            firstName:personalInformation.firstName,
			            symposiumId
					},
					isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
					);
				if(confirmation=="Success"){
					closeCreationModal();
				}else{
					const {statusCode}=data;
					if(statusCode==409){
						alert('You have previously created an oligarch vote card. Delete your previous one to create a new one');
					}else if(statusCode==401){
						await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							submit,
							dispatch,
							{},
							false
						);
					}else{
						alert('Unfortunately there was an error creating this oligarch vote card.Please try again');
					}
				}
			}
			changeProcessingStatus(false);
			
		}
	}

	const editOligarch=async({isAccessTokenUpdated,updatedAccessToken})=>{
		debugger;
		changeProcessingStatus(true);
		const submissionElectionSpeech=document.getElementById("electionSpeech").value;
		if(submissionElectionSpeech==previousOwnerOligarchCardInformation.electionSpeech){
			alert('Please change election speech')
		}else if(submissionElectionSpeech.length<20){
			alert('Your election speech is too small. We require a minimum length of 20 so add more stuff')
		}else{
			const {confirmation,data}=await editOligarchVoteCard({
				editedElectionSpeech:submissionElectionSpeech,
				selectedOligarchCardId:previousOwnerOligarchCardInformation._id,
				ownerId:personalInformation.id,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
					personalInformation.accessToken
			})
			if(confirmation=="Success"){
				closeCreationModal();
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						editOligarch,
						dispatch,
						{},
						false
					);
				}else{
					alert('Unfortunately there was an error editing your oligarch card. Please try again');
				}
			}
		}
		changeProcessingStatus(false);
	}	

	const deleteOligarchCard=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeProcessingStatus(true);
		const {confirmation,data}=await deleteOligarchVoteCard(
										previousOwnerOligarchCardInformation._id,
										personalInformation.id,
										isAccessTokenUpdated==true?updatedAccessToken:
										personalInformation.accessToken
									)
		if(confirmation=="Success"){
			closeCreationModal();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					deleteOligarchCard,
					dispatch,
					{},
					false
				);
			}else{
				alert('Unfortunately there was an error deleting your oligarch card. Please try again');
			}
		}
		changeProcessingStatus(false);
	}

	const deleteOligarchCardIcon=()=>{
		return(
			<svg id="removePostOption" onClick={()=>deleteOligarchCard({isAccessTokenUpdated:false})}
				 xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
				width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
				stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <line x1="4" y1="7" x2="20" y2="7" />
			  <line x1="10" y1="11" x2="10" y2="17" />
			  <line x1="14" y1="11" x2="14" y2="17" />
			  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
			  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
			</svg>
		)
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
				{isProcessing==true?
					<p>Processing...</p>:
					<React.Fragment>
						{editOligarchCardDisplay==true?
							<div style={{alignItems:"center",display:"flex",flexDirection:"row"}}>
								<div onClick={()=>editOligarch({isAccessTokenUpdated:false})}
									style={{...ButtonCSS}}>
									Edit
								</div>
								{deleteOligarchCardIcon()}
							</div>
							:<div onClick={()=>submit({isAccessTokenUpdated:false})} 
								style={{...ButtonCSS,marginTop:"5%"}}>
								Submit
							</div>
						}
					</React.Fragment>
				}
			</div>
		</React.Fragment>
	)
}

export default CreateSubmission;