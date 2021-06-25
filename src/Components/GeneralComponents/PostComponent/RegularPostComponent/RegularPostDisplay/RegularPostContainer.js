import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import CommentsContainer from "../../../../GeneralComponents/CommentsComponent/index.js";
import RegularPostCreation from "../RegularPostCreation/index.js";
import {PostConsumer} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/PostsContext.js";
import MobileUI from "./MobileUI.js";
import DeletePostConfirmationPortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";
import {useSelector,useDispatch} from "react-redux";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import PollOptionPortal from "../../PollOptionPortal.js";
import {
	addStampPost,
	unStampPost,
	deletePost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {StampIconEffect} from "../../../PostComponent/ImageAndVideoDisplay/PostContainerCSS.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import FirstTimePostOnboarding from "../../FirstTimePostOnboardingIndicator.js"
import AssessmentIcon from '@material-ui/icons/Assessment';

const Container=styled.div`
	padding:30px;
	height:100%;
	overflow:scroll;
`;


const PostContentAndCommentsButtons=styled.div`
	position:relative;
	height:80%;
	width:800;
`;


const CommentsContainerDiv=styled.div`

	position:absolute;
	top:-15%;
	width:60%;
	height:300px;
`;

const PostProfilePicture=styled.div`
	position:relative;
	width:130px;
	height:120px;
	border-radius:50%;
	left:45%;
	margin-top:10%;
	top:10%;
	border-style:solid;
	border-width:5px;
	border-color:#5298F8;

`;

const IndustryButton=styled.div`
	position:relative;
	background-color:#5298F8;
	left:30%;
	text-align:center;
	width:160px;
	padding:10px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;

const NameContainer=styled.div`
	position:relative;
	left:30%;
	text-align:center;
	width:160px;
	padding:10px;
	color:black;
	transition:.8s;
	font-size:20px;

`;

const DateContainer=styled.div`
	position:relative;
	left:30%;
	text-align:center;
	width:160px;
	padding:10px;
	color:black;
	transition:.8s;
	font-size:15px;
`;

const PostContainer=styled.div`
	width:100%;
	height:100%;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		height:90% !important;
		overflow:scroll;
	}

	@media screen and (max-width:650px){
		height:70% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
   		height:110% !important;
    }
`;

const PostOwnerAndActionsContainer=styled.div`
	display:flex;
	align-items:center;
	flex-direction:row;

	@media screen and (max-width:1370px){
		flex-direction:column;
	}
`;

const PostActions=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	@media screen and (max-width:1370px){
		margin-top:2%;
	}
`;

const ProfileOwnerContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:20%;

	@media screen and (max-width:1370px){
		width:100%;
		align-items:flex-start;

		#profilePictureDiv{
			width:50px !important;
			height:50px !important;
		}
	}
`;


const PostInformationContainer=styled.div`
	position:relative;
	width:55%;
	padding:5px;
	margin-top:5%;

	@media screen and (max-width:1370px){
		width:100%;
		height:90%;
		display:flex;
		flex-wrap:wrap;
		margin-top:2%;
	}
`;

const PostOwnerAndOptionsContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:5%;
`;

const SocialMedaIcon=styled.div`
`;

const SymposiumContainer=styled.div`
	position:absolute;
	top:80%;
	margin-left:2%;
`;

const PollingOptionsContainer=styled.div`
	display:flex;
	flex-direction:column;
`;


const BackButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	overflow:"scroll",
	padding:"10px"
}

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"10px",
	marginBottom:"2%",
	cursor:"pointer"
}


const ButtonCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%",
  marginBottom:"2%",
  cursor:"pointer"
}

const PollingOptionsCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"40px",
	borderRadius:"5px",
	cursor:"pointer",
	marginBottom:"10%"
}




const RegularPostContainer=(props)=>{
	
	const{
		profileType,
		postData,
		isOwnProfile,
		targetDom
	}=props;

	let {
		post,
		isAudioPost,
		comments,
		isPostAuthentic,
		_id,
		firstName,
		profilePicture
	}=postData;
	profilePicture=profilePicture==null?postData.owner.profilePicture:profilePicture;
	firstName=firstName==null?postData.owner.firstName:firstName;
	const [displayCommentsAndResponses,changeDisplayCommentsAndResponses]=useState(false);
	const [displayEditPostModal,changeDisplayEditPostModal]=useState(false);
	const [displayMobileUI,changeUIStatus]=useState(false);
	const [displayDeleteConfirmation,changeDisplayDeleteConfirmation]=useState(false);
	const [displayRegularPostModal,changeDisplayRegularPostModal]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayPollingModal,changeDisplayPollingModal]=useState(false);

	const [displayPostApprovalAndSymposiumInfo,changeDisplayPostApprovalAndSymposium]=useState(false);
	const [displayApproveModal,changeDisplayApproveModal]=useState(false);
	const userInformation=useSelector(state=>state.personalInformation);
	const isGuestProfile=(userInformation.id=="0" || userInformation.isGuestProfile==true)==true?
						true:false;

	const personalId=useSelector(state=>state.personalInformation.id);
	const personalInformation=useSelector(state=>state.personalInformation);
	const [displayPollingOptions,changeDisplayPollingOptions]=useState(false);
	const dispatch=useDispatch();

	useEffect(()=>{
		triggerUIChange();
	},[]);
	window.addEventListener('resize',triggerUIChange)

	const triggerUIChange=()=>{
		if(window.innerWidth<1340){
			changeUIStatus(true);
		}else{
			changeUIStatus(false);
		}
	}

	const DisplayCommentsState=()=>{
		changeDisplayCommentsAndResponses(true);
	}

	const hideComments=()=>{
		changeDisplayCommentsAndResponses(false);
	}

	const displayEditPostHandle=()=>{
		changeDisplayEditPostModal(true);
	}

	const triggerPromoteModal=()=>{
		props.triggerPromoteModal(props.postData._id,"RegularPosts");
	}

	const closeDeleteConfirmationModal=()=>{
		changeDisplayDeleteConfirmation(false);
	}

	const handleRemoveRegularPost=()=>{
		changeDisplayDeleteConfirmation(true);
	}

	const createOrRemoveStampEffect=async({isAccessTokenUpdated,updatedAccessToken})=>{
		let confirmationResponse;
		let dataResponse;
		if(isGuestProfile==true){
			alert('Unfortunately there has been an error with stamping/unstamping this post. Please try again');
		}else{
			if(displayStampEffect==false){
				const {confirmation,data}=await addStampPost(
													postData._id,
													"personal",
													"RegularPosts",
													personalId,
													isAccessTokenUpdated==true?updatedAccessToken:
													personalInformation.accessToken
												);
				confirmationResponse=confirmation;
				dataResponse=data;

			}else{
				const {confirmation,data}=await unStampPost(
													postData._id,
													"personal",
													"RegularPosts",
													personalId,
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
	}
	const displayCommentsTrigger=()=>{
		changeDisplayCommentsAndResponses(true);
	}

	const displayApprovePollModalTrigger=()=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(true);
	}

	const displayDisapproveModalTrigger=()=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(false);
	}

	const closePollingModal=()=>{
		changeDisplayPollingModal(false);
	}


	return(
	<PostConsumer>
		{userPostsInformation=>{
			return <React.Fragment>
				<FirstTimePostOnboarding
					userId={personalId}
					isGuestProfile={isGuestProfile}
				/>
				{displayDeleteConfirmation==true &&(
					<DeletePostConfirmationPortal
						postType={"Posts"}
						selectedPostType={"RegularPosts"}
						content={props.postData}
						closeModal={closeDeleteConfirmationModal}
						removeContextLocation={props.postData.contextLocation.removePost}
						targetDom={"personalContainer"}
					/>
				)}

				{displayPollingModal==true?
					<PollOptionPortal
						closeModal={closePollingModal}
						displayApproveModal={displayApproveModal}
						postId={postData._id}
						postType="RegularPost"
						targetDom={targetDom}
						isGuestProfile={isGuestProfile}
						ownerId={postData.owner._id==null?postData.owner:postData.owner._id}
					/>:null
				}
				<Container>
					{displayEditPostModal==true?
						<RegularPostCreation 
							previousData={props.postData}
							contextLocation={userPostsInformation}
						/>
						:<PostContainer>
							{displayCommentsAndResponses==true?
								<CommentsContainer
									postId={postData._id}
									postType={"RegularPosts"}
									hideComments={hideComments}
									targetDom={targetDom}
									isGuestProfile={isGuestProfile}
									isOwnProfile={isOwnProfile}
									ownerId={postData.owner._id==null?postData.owner:postData.owner._id}
									selectedCommentPools={{
										regularCommentPool:postData.regularCommentPool,
										videoCommentPool:postData.videoCommentPool
									}}
								/>:
								<React.Fragment>
								<PostOwnerAndActionsContainer>
									<ProfileOwnerContainer>
										<img id="profilePictureDiv" src={profilePicture==null?NoProfilePicture:profilePicture}
											style={{width:"25%",height:"45px",borderRadius:"50%",marginRight:"5%"}}
										/>
										<p style={{marginRight:"5%",maxWidth:"60%",maxHeight:"20px",overflow:"hidden"}}>
											<b>{props.postData.owner.firstName}</b>
										</p>
									</ProfileOwnerContainer>
									<PostActions>
										<li onClick={()=>createOrRemoveStampEffect({isAccessTokenUpdated:false})} style={ShadowButtonCSS}>
											<LoyaltyIcon
												style={{fontSize:20}}
											/>
										</li>
										<li onClick={()=>displayCommentsTrigger()} style={ShadowButtonCSS}>
											<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C" fill="none" stroke-linecap="round" stroke-linejoin="round">
											  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
											  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
											  <line x1="8" y1="9" x2="16" y2="9" />
											  <line x1="8" y1="13" x2="14" y2="13" />
											</svg>
										</li>
										<li style={ShadowButtonCSS}>
											<AssessmentIcon
												onClick={()=>changeDisplayPollingOptions(true)}
												style={{fontSize:20}}
											/>
										</li>

										{(profileType=="personalProfile" && isOwnProfile==true) &&(
											<React.Fragment>
												<li onClick={()=>displayEditPostHandle()} style={ShadowButtonCSS}>
													<BorderColorIcon
														style={{fontSize:20}}
													/>
												</li>

												<li onClick={()=>handleRemoveRegularPost()} style={ShadowButtonCSS}>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C" fill="none" stroke-linecap="round" stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
													  <line x1="4" y1="7" x2="20" y2="7" />
													  <line x1="10" y1="11" x2="10" y2="17" />
													  <line x1="14" y1="11" x2="14" y2="17" />
													  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
													  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
													</svg>
												</li>

												<li onClick={()=>triggerPromoteModal()} style={ShadowButtonCSS}>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" 
														  width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#151515"
														  fill="none" stroke-linecap="round" stroke-linejoin="round">
														  <path stroke="none" d="M0 0h24v24H0z"/>
														  <circle cx="12" cy="9" r="6" />
														  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
														  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
													</svg>
												</li>

											</React.Fragment>
										)}
									</PostActions>
								</PostOwnerAndActionsContainer>
								<PostInformationContainer>
									{displayPollingOptions==true?
										<PollingOptionsContainer>
											<p onClick={()=>changeDisplayPollingOptions(false)} style={{marginBottom:"10%",...ButtonCSS}}>Back</p>
											<p onClick={()=>displayApprovePollModalTrigger()} style={PollingOptionsCSS}>
												Approve Post
											</p>

											<p onClick={()=>displayDisapproveModalTrigger(false)} style={PollingOptionsCSS}>
												Disapprove Post
											</p>
										</PollingOptionsContainer>
										:<React.Fragment>
											{displayStampEffect==true && (
												<StampIconEffect id="stampEffect">
													<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
												</StampIconEffect>
											)}
											{isAudioPost==null || isAudioPost==false?
												<p>
													{post}
												</p>:
												<audio style={{width:"90%"}} controls>
													<source src={post} type="audio/ogg"/>
													<source src={post} type="audio/mp4"/>
													Your browser does not support the audio element.
												</audio>
											}
										</React.Fragment>
									}

								</PostInformationContainer>
								</React.Fragment>
							}
						</PostContainer>
					}
				</Container>
			</React.Fragment>
		}}
	</PostConsumer>
	)
}

export default RegularPostContainer;