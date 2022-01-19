import React,{useState,Component} from "react";
import styled, {keyframes} from "styled-components";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {addStampPost,unStampPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import TextOptionsHOC from "./TextOptionPortalHOC.js";
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import DeletePostConfirmationPortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";
import Comments from "../../../CommentsComponent/index.js";
import VideoDescriptionMobileDisplayPortal from "../../VideoDescriptionMobileDisplayPortal.js";
import ChatIcon from '@material-ui/icons/Chat';
import AssessmentIcon from '@material-ui/icons/Assessment';

const Container=styled.div`
	position:fixed;
	width:15%;
	height:40%;
	left:83%;
	z-index:10;
	top:17%;
	border-radius:5px;
	background-color:white;

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	  top:25% !important;
    }
`;

const ProfilePicture=styled.div`

	position:relative;
	margin-left:2px;
	margin-top:1px;
	width:60px;
	height:15%;
	border-radius:50%;
	background-color:red;

`;

const ViewTipsButton=styled.div`
	border-color:#5298F8;
	border-style:solid;
	border-width:1px;
	color:#5298F8;
	padding:10px;
	text-align:center;
	background-color:white;
	border-radius:5px;

`;

const keyFrame=keyframes`
	  0%{
	    opacity: 0;
	  }
	  10%{
	    opacity:.50;
	    transform-origin: 50% 50%;
	    transform: scale(5);
	    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
	  }
	  100%{
	    opacity:1;
	    transform: scale(1);
	  }

`;
const StampIconEffect=styled.div`
	  height:100px;
	  width:100px;
	  border-radius:5px;
	  position:relative;
	  animation:${keyFrame} 1s ease-in-out 0s forwards;

	  @media screen and (max-width:760px){
	  	height:60px !important;
	  	width:60px !important;
	  }
`;

const TogglePostInformationButton=styled.div`
	box-shadow: 1px 1px 30px #d5d5d5;
	border-radius:50%;
	cursor:pointer;
	width:15%;
	margin-top:5%;
	background-color:white;
	top:7%;
	text-align:center;
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	top:15%; !important;
		height:10%;
		width:7%;
    }
	@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
			top:10%; !important;
			height:10%;
			width:7%;
    }
    @media screen and (max-width:1370px){
		width:7%;
    }

	@media screen and (max-width:420px){
		height:10%;
		width:15%;
    }
`;


const VideoDescriptionContainer=styled.div`
	position:relative;
	width:20%;
	height:30%;
	border-radius:5px;
	cursor:pointer;
	background-color:#151515;
	margin-right:5%;
`;


const CommentContainer=styled.div`
	position:relative;
	overflow-y:scroll;
	background-color:white;
	padding:20px;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	z-index:6;
	width:100%;

	@media screen and (max-width:600px){
		width:90% !important;
		left:5% !important;
	}
`;

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	borderStyle:"none",
	marginRight:"2%",
	marginBottom:"2%",
	cursor:"pointer"
}


const StampButtonCSS={
	listStyle:"none",borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	boxShadow:"2px 10px 10px #b9d6ff",
	borderRadius:"5px",
	padding:"10px",
	marginBottom:"5%"
}


const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"40px",
 	marginRight:"2%"
}

const PollingOptionsCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"20px",
	borderRadius:"5px",
	cursor:"pointer",
	marginBottom:"10%"
}


const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
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
  marginRight:"4%",
  cursor:"pointer",
  width:"10%",
  marginBottom:"5%"
}



/*
	The point for this section is to doing multiple things in the future:
		Offer a tips section,
		Display all contributors working on this document 
*/

const AdditionalInformation=(props)=>{
	const {
		displayEditBlogSubmitModal,
		blogState,
		postType,
		triggerDisplayApproveModal,
		triggerDisplayUnApproveModal,
		profileId,
		history,
		targetDom,
		postId
	}=props;
	const {location:{
		state:{
			videoDescription,
			audioDescription,
			blog
		}
	}}=history;

	const [profilePictureContributors,changeContributors]=useState([{},{},{},{},{}]);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);
	const [displayInformation,changeDisplayInformation]=useState(false);
	const dispatch=useDispatch();
	const [displayDeleteConfirmation,changeDisplayDeleteConfirmation]=useState(false);
	const [displayComments,changeDisplayComments]=useState(false);
	const [displayVideoDescriptionDisplay,changeVideoDescriptionDisplay]=useState(false);
	const [currentAdditionalInformationType,changeCurrentAdditionalInformationType]=useState("UserOptions");


	const createOrRemoveStampEffect=async({isAccessTokenUpdated,updatedAccessToken})=>{
		var isPersonalProfile=props.profileType=="personalProfile"?true:false;
		let confirmationResponse;
		let dataResponse;

		if(displayStampEffect==false){
			const {confirmation,data}=await addStampPost(
												postId,
												"personal",
												"Blogs",
												profileId,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken
											);
			confirmationResponse=confirmation;
			dataResponse=data;

		}else{
			const {confirmation,data}=await unStampPost(
												postId,
												"personal",
												"Blogs",
												profileId,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken
											);
			confirmationResponse=confirmation;
			dataResponse=data;
		}

		if(confirmationResponse=="Success"){
			if(displayStampEffect==false)
				changeDisplayStampEffect(true);
			else
				changeDisplayStampEffect(false);
		}else{
			const {statusCode}=dataResponse;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						createOrRemoveStampEffect,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error with stamping/unstamping this post. Please try again');
			}
		}
	}
	const handleRemoveBlogPost=async()=>{
		
		changeDisplayDeleteConfirmation(true);
	}

	const closeDeleteConfirmationModal=()=>{
		changeDisplayDeleteConfirmation(false);
	}

	const hideComments=()=>{
		changeCurrentAdditionalInformationType("UserOptions");
	}

	const AdditionalInformationInitialDisplayModal=({children})=>{
		console.log(children);
		return children.filter(data=>data.props.selectedComponentType==currentAdditionalInformationType);
	}


	const CommentsInitialModal=()=>{
		return(
			<CommentContainer>
				<Comments
					postId={postId}
					postType={"Blogs"}
					hideComments={hideComments}
					targetDom={"blogPostContainer"}
					ownerId={props.ownerId}
					selectedCommentPools={props.selectedCommentPools}
					isOwnProfile={props.ownerId==personalInformation.id?true:false}
				/>
			</CommentContainer>
		)
	}

	const AuthenticCommentsInitialModal=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column"}}>
				<p id="backButton" onClick={()=>changeCurrentAdditionalInformationType("UserOptions")}
					style={ButtonCSS}>
					Back
				</p>

				<p style={{fontSize:"18px"}}>
					Create a comment about why you think this post is authentic or.... tell everyone 
					why you think this post is fake
				</p>
				<hr style={HorizontalLineCSS}/>

				<div style={{display:"flex",flexDirection:"row"}}>
					<p onClick={()=>triggerDisplayApproveModal()} style={PollingOptionsCSS}>
						Approve Post
					</p>

					<div style={VerticalLineCSS}/>

					<p onClick={()=>triggerDisplayUnApproveModal()} style={PollingOptionsCSS}>
						Disapprove Post
					</p>
				</div>

			</div>
		)
	}

	const UserOptions=()=>{
		return	(
			<React.Fragment>
				<div style={{display:"flex",flexDirection:"row"}}>
					<ChatIcon
						id="postOptions"
						style={{fontSize:50,...ShadowButtonCSS}}
						onClick={()=>changeCurrentAdditionalInformationType("Comments")}
					/>

					<div style={VerticalLineCSS}/>

					<AssessmentIcon
						id="postOptions"
						style={{fontSize:50,...ShadowButtonCSS}}
						onClick={()=>changeCurrentAdditionalInformationType("AuthenticInitialModal")}
					/>

					<div style={VerticalLineCSS}/>

					<div style={ShadowButtonCSS} id="postOptions">
						<svg id="promotePostOption" onClick={()=>props.triggerPromoteModal()}
							xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" 
							  width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e"
							  fill="none" stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z"/>
							  <circle cx="12" cy="9" r="6" />
							  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
							  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
						</svg>
					</div>

					<div style={VerticalLineCSS}/>

					<div style={ShadowButtonCSS} id="postOptions">
						<svg id="removePostOption" onClick={()=>handleRemoveBlogPost()}
							 xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
							width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
							stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <line x1="4" y1="7" x2="20" y2="7" />
						  <line x1="10" y1="11" x2="10" y2="17" />
						  <line x1="14" y1="11" x2="14" y2="17" />
						  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
						  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
						</svg>
					</div>
				</div>
				<hr/>
				<div style={{display:"flex",flexDirection:"row"}}>
					{videoDescription!=null &&(
						<VideoDescriptionContainer onClick={()=>displayVideoDescriptionTrigger()}>
							 <video autoPlay loop autoBuffer muted playsInline 
								style={{borderRadius:"5px"}} width="100%" height="100%" borderRadius="50%">
								<source src={videoDescription} type="video/mp4"/>
							</video>
						</VideoDescriptionContainer>
					)}
					{audioDescription && (
						<audio controls>
							<source src={audioDescription} type="audio/ogg"/>
							<source src={audioDescription} type="audio/mp4"/>
							Your browser does not support the audio element.
						</audio>
					)}
				</div>
			</React.Fragment>
		)
	}

	const closeTextOptions=()=>{
		changeDisplayInformation(false);
	}

	const displayVideoDescriptionTrigger=()=>{
	 	changeVideoDescriptionDisplay(true);
	}	

	const closeVideoDescriptionDisplayModal=()=>{
		changeVideoDescriptionDisplay(false);
	}
	const options=()=>{
		return(
			<AdditionalInformationInitialDisplayModal>
				<AuthenticCommentsInitialModal selectedComponentType={"AuthenticInitialModal"}/>
				<UserOptions selectedComponentType={"UserOptions"}/>
				<CommentsInitialModal selectedComponentType={"Comments"}/>
			</AdditionalInformationInitialDisplayModal>
		)
	}
	return(
		<Container>
			{displayVideoDescriptionDisplay==true &&(
				<VideoDescriptionMobileDisplayPortal
					targetDom={targetDom}
					closeModal={closeVideoDescriptionDisplayModal}
					videoUrl={videoDescription}
				/>
			)}
			{displayDeleteConfirmation==true &&(
				<DeletePostConfirmationPortal
					postType={"Posts"}
					selectedPostType={"Blogs"}
					content={props.blogState}
					closeModal={closeDeleteConfirmationModal}
					targetDom={"blogPostContainer"}
					history={history}
				/>
			)}
			{displayInformation==true &&(
				<TextOptionsHOC
					optionsElement={options}
					closeModal={closeTextOptions}
				/>
			)}
			<ul style={{padding:"0px"}}>
				{postType!="Creation" && (
					<TogglePostInformationButton>
						{displayInformation==false?
							<ExpandMoreIcon
								style={{fontSize:30}}
								onClick={()=>changeDisplayInformation(true)}
							/>
							:<ExpandLessIcon
								style={{fontSize:30}}
								onClick={()=>changeDisplayInformation(false)}
							/>
						}
					</TogglePostInformationButton>
				)}
				{/*
					<li style={{listStyle:"none",fontSize:"30px",marginBottom:"3%"}}>
						<b>Contributors</b>
					</li>


					<li style={{listStyle:"none",marginBottom:"10%"}}>
						<ul style={{padding:"0px"}}>
							{profilePictureContributors.map(data=>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5%"}}>
									<ProfilePicture/>
								</li>
							)}

						</ul>

					</li>

					<li style={{listStyle:"none"}}>
						<ViewTipsButton>
							View Tips
						</ViewTipsButton>
					</li>
				*/}
			</ul>
		</Container>
	)
}

export default AdditionalInformation;