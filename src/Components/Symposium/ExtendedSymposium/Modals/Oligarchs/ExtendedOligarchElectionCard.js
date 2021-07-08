import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {
	createOligarchCardComment,
	deleteOligarchComment,
	sponsorOligarchCard,
	unsponsorOligarchCard
} from "../../../../../Actions/Requests/OligarchRequests/OligarchAdapter.js";

import {
	getProfileSponsorOligarchCardStatus,
	getOligarchCardComments
} from "../../../../../Actions/Requests/OligarchRequests/OligarchRetrieval.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";


const CommentContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:5%;
	padding:20px;
	border-radius:5px;
	display:flex;
	flex-direction:column;
`;

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

const SimplifiedInputContainer=styled.textarea`
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	margin-top:2%;
	width:100%;
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
	cursor:"pointer"
}

const HorizontalLineCSS={
	marginLeft:"0",
	position:"relative",
	marginRight:"0"
}

const ExtendedOligarichElectionCard=({closeOligarchCardModal,electionCardInformation})=>{
	const [comments,changeComments]=useState([]);
	const [displayComments,changeDisplayComments]=useState(false);
	const [retrievingCommentsStatus,changeRetrievingCommentsStatus]=useState(false);
	const [displayCommentCreation,changeDisplayCommentCreation]=useState(false);
	const [isSponsored,changeIsSponsored]=useState(false);
	const [isProcessing,changeProcessingStatus]=useState();

	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	useEffect(()=>{
		if(displayComments==true){
			fetchData();
		}
		retrieveProfileToOligarchCardStatus();
	},[displayComments]);


	const retrieveProfileToOligarchCardStatus=async()=>{
		const {confirmation,data}=await getProfileSponsorOligarchCardStatus(
											electionCardInformation._id,
											personalInformation.id);
		if(confirmation=="Success"){
			const {message}=data;
			if(message==true){
				changeIsSponsored(true);
			}
		}
	}

	const removeComment=async({isAccessTokenUpdated,updatedAccessToken,commentId,selectedCommentIndex})=>{
		const {confirmation,data}=await deleteOligarchComment(
											commentId,
											personalInformation.id,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken
										);
		if(confirmation=="Success"){
			comments.splice(selectedCommentIndex,1);
			changeComments([...comments]);
		}else{
			await refreshTokenApiCallHandle(
				personalInformation.refreshToken,
				personalInformation.id,
				removeComment,
				dispatch,
				{
					commentId,
					selectedCommentIndex
				},
				false
			);
		}
	}

	const submitComment=async({isAccessTokenUpdated,updatedAccessToken})=>{
		if(personalInformation.isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeProcessingStatus(true);
			const comment=document.getElementById("oligarchComment").value;
			if(comment==""){
				alert('Please enter a value');
			}else{	
				const {confirmation,data}=await createOligarchCardComment({
					parentOligarchVoterId:electionCardInformation._id,
		            comment,
		            ownerId:personalInformation.id,
		            firstName:personalInformation.firstName
				},
					isAccessTokenUpdated==true?updatedAccessToken:
							personalInformation.accessToken
				);
				if(confirmation=="Success"){
					changeDisplayComments(false);
				}else{
					await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						submitComment,
						dispatch,
						{},
						false
					);
				}
				changeDisplayCommentCreation(false);
			}
			changeProcessingStatus(false);

		}
	}
	const fetchData=async()=>{
		changeRetrievingCommentsStatus(true);
		const {_id}=electionCardInformation;
		const {confirmation,data}=await getOligarchCardComments(_id);
		if(confirmation=="Success"){
			const {message}=data;
			changeComments(message);
		}else{
			alert('Unfortunately there was an error retrieving these comments');
		}
		changeRetrievingCommentsStatus(false);
	}

	const deleteCommentIcon=(commentId,selectedCommentIndex)=>{
		return(
			<svg id="removePostOption" onClick={()=>removeComment({
														isAccessTokenUpdated:false,
														commentId,
														selectedCommentIndex
													})}
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

	const comment=(commentData,currentIndex)=>{
		return(
			<CommentContainer>
				<div style={{marginBottom:"2%",display:"flex",flexDirection:"row"}}>
					<img src={commentData.owner.profilePicture==null?
						NoProfilePicture:commentData.owner.profilePicture}
						style={{width:"40px",height:"40px",borderRadius:"50%"}}
					/>
					<p style={{marginLeft:"2%"}}>
						<b>{commentData.owner.firstName}</b>
					</p>
				</div>
				<p>{commentData.comment}</p>
				{(commentData.owner.ownerId==personalInformation.id)==true &&(
					<>{deleteCommentIcon(commentData._id,currentIndex)}</>
				)}

			</CommentContainer>
		)
	}

	const sponsorUser=async({isAccessTokenUpdated,updatedAccessToken})=>{
		if(personalInformation.isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			const {confirmation,data}=await sponsorOligarchCard(
												electionCardInformation._id,
												personalInformation.id,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken
											);
			if(confirmation=="Success"){
				changeIsSponsored(true);
			}else{
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					sponsorUser,
					dispatch,
					{},
					false
				);
			}
		}
	}

	const unSponsoreUser=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const {confirmation,data}=await unsponsorOligarchCard(
											electionCardInformation._id,
											personalInformation.id,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessTokenn
										)
		if(confirmation=="Success"){
			changeIsSponsored(false);
		}else{
			await refreshTokenApiCallHandle(
				personalInformation.refreshToken,
				personalInformation.id,
				unSponsoreUser,
				dispatch,
				{},
				false
			);
		}
	}
	return(
		<React.Fragment>
			{displayCommentCreation==true?
				<React.Fragment>
					<div onClick={()=>changeDisplayCommentCreation(false)} style={ButtonCSS}>
						Back
					</div>
					<InputContainer id="oligarchComment" placeholder="Enter comment here"/>
					{isProcessing==true?
						<p>Processing...</p>:
						<div onClick={()=>submitComment({isAccessTokenUpdated:false})} style={{...ButtonCSS,marginTop:"5%"}}>
							Submit
						</div>
					}
				</React.Fragment>:
				<React.Fragment>
					<div onClick={()=>closeOligarchCardModal()} style={ButtonCSS}>
						Back
					</div>
					<div>
						<div style={{marginTop:"5%",marginLeft:"5%",display:"flex",flexDirection:"column"}}>
							<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:"5px"}}>
								<img src={electionCardInformation.owner.profilePicture==null?
									NoProfilePicture:
									electionCardInformation.owner.profilePicture} 
									style={{borderRadius:"50%",width:"50px",height:"50px"}}
								/>
								<p style={{marginLeft:"5%"}}>	
									<b>{electionCardInformation.owner.firstName}</b>
								</p>
							</div>
							<div id="electionSpeechDiv" style={{display:"flex",flexWrap:"wrap",marginBottom:"5%"}}>
								{electionCardInformation.electionSpeech}
							</div>
							<div style={{display:"flex",flexDirection:"row"}}>
								{isSponsored==true?
									<div onClick={()=>unSponsoreUser({isAccessTokenUpdated:false})} 
										style={ShadowButtonCSS}>
										UnSponsor
									</div> 
									:<div onClick={()=>sponsorUser({isAccessTokenUpdated:false})}
										style={ShadowButtonCSS}>
										Sponsor
									</div>
								}
								{displayComments==true?
									<div onClick={()=>changeDisplayComments(false)} style={ShadowButtonCSS}>
										Hide
									</div>
									:<div onClick={()=>changeDisplayComments(true)} style={ShadowButtonCSS}>
										Comments
									</div>
								}
							</div>
						</div>
						<hr style={HorizontalLineCSS}/>
					</div>
					<div>
						<SimplifiedInputContainer 
							onClick={()=>changeDisplayCommentCreation(true)}
							placeholder="Create comment"
						/>
					</div>
					{displayComments==true &&(
						<React.Fragment>
							{retrievingCommentsStatus==true?
								<p>Please wait...</p>:
								<>	
									{comments.length==0?
										<p style={{marginTop:"20px"}}>No comments</p>:
										<React.Fragment>
											{comments.map((data,index)=>
												<div>
													{comment(data,index)}
												</div>
											)}
										</React.Fragment>
									}
								</>
							}
						</React.Fragment>
					)}
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default ExtendedOligarichElectionCard;