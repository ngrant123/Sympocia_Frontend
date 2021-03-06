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
import FirstTimePostOnboarding from "../../FirstTimePostOnboardingIndicator.js";
import AssessmentIcon from '@material-ui/icons/Assessment';
import {PostDisplayConsumer} from "../../../../Symposium/ExtendedSymposium/Posts/PostDisplay/PostDisplayContext.js";
import PostBadgeAdditionModal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/BadgePortal/PostBadgeAddition/index.js";
import BadgeDisplay from "../../../BadgeComponent/index.js"; 
import {Link} from "react-router-dom";
import ChatIcon from '@material-ui/icons/Chat';

const Container=styled.div`
	padding:30px;
	height:100%;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		#postOptions{
			box-shadow:none !important;
		}

		#mobilePostOptionsDivider{
			display:block !important;
		}
	}

	@media screen and (max-width:650px){
		#postOptionsDiv{
			width:100% !important;
			margin-left:1% !important;
		}
		#ownerOptionsAndPostOptions{
			flex-direction:row !important;
		}
	}

	@media screen and (max-width:350px){
		#ownerOptionsAndPostOptions{
			height:260px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		#postInformationHorizontalLine{
			display:none !important;
		}
		#ownerOptionsAndPostOptions{
			margin-bottom:20% !important;
		}

    }
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
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
   		height:110% !important;
    }
`;

const PostOwnerAndActionsContainer=styled.div`
	display:flex;
	align-items:center;
	flex-direction:row;
	background-color:red;

	@media screen and (max-width:1370px){
		flex-direction:column;
	}
`;

const PostActions=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	background-color:blue;

	@media screen and (max-width:1370px){
		margin-top:20%;
		width:100%;
		height:110px;
	}

	@media screen and (max-width:650px){	
		width:100%;
		height:240px;
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
   		display:none !important;
    }
`;

const ProfileOwnerContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:20%;
	background-color:yellow;

	@media screen and (max-width:1370px){
		width:100%;
		align-items:flex-start;

		#profilePictureDiv{
			width:50px !important;
			height:50px !important;
		}
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
   		margin-bottom:120px !important;
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

	@media screen and (max-width:650px){
		#backButton{
			width:30% !important;
		}
	}
`;


const BackButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	overflow:"scroll",
	padding:"10px",
	width:"10%"
}
const ShadowButtonCSS={
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	borderStyle:"none",
	marginRight:"5%",
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
  cursor:"pointer",
	width:"10%"
}

const PollingOptionsCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"20px",
	borderRadius:"5px",
	cursor:"pointer",
	marginBottom:"10%"
}

const HorizontalLineCSS={
	marginLeft:"0",
	position:"relative",
	marginRight:"2%",
	marginTop:"0px",
	height:"2px"
}

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"60px"
}

/*
	Would be better down the road to seperate this into two whole components where one is post information/functiions
	and other is post itself etc
*/
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
	const [displayPostBadgeAdditionPortal,changePostBadgeAdditionalDisplayPortal]=useState(false);

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

	const crownLogo=()=>{
		return(
			<svg id="oligarchButtonIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crown" 
			  width="30" height="30" viewBox="0 0 24 24" stroke-width="2.5" stroke="#6e6e6e" fill="none" 
		 	  stroke-linecap="round" stroke-linejoin="round">
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
			</svg>
		)
	}


	const closeRegularCreationModal=()=>{
		changeDisplayEditPostModal(false);
	}

	const closePostBadgeAdditionalModal=()=>{
		changePostBadgeAdditionalDisplayPortal(false);
	}

	return(
	<PostConsumer>
		{userPostsInformation=>(
			<PostDisplayConsumer>
				{symposiumPostInformation=>(
					<React.Fragment>
						<FirstTimePostOnboarding
							userId={personalId}
							isGuestProfile={isGuestProfile}
						/>

						{displayPostBadgeAdditionPortal==true &&(
							<PostBadgeAdditionModal
								profileId={postData.owner._id==null?postData.owner:postData.owner._id}
								closeModal={closePostBadgeAdditionalModal}
								postType={"Text"}
								postId={postData._id}
							/>
						)}
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

						{displayPollingModal==true &&(
							<PollOptionPortal
								closeModal={closePollingModal}
								displayApproveModal={displayApproveModal}
								postId={postData._id}
								postType="RegularPost"
								targetDom={targetDom}
								isGuestProfile={isGuestProfile}
								postOwnerId={postData.owner._id==null?postData.owner:postData.owner._id}
							/>
						)}
						<Container>
							{displayEditPostModal==true?
								<RegularPostCreation 
									previousData={props.postData}
									contextLocation={userPostsInformation}
									closeModal={closeRegularCreationModal}
								/>
								:<PostContainer>
									{(displayCommentsAndResponses==false)==true &&(
										<div style={{marginBottom:"2%",cursor:"pointer"}} onClick={()=>props.closePostModal()}>
											<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
												 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
												 stroke-linecap="round" stroke-linejoin="round">
												  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
												  <circle cx="12" cy="12" r="9" />
												  <path d="M10 10l4 4m0 -4l-4 4" />
											</svg>
										</div>
									)}
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
											<div id="ownerOptionsAndPostOptions" 
												style={{display:"flex",flexDirection:"column",flexWrap:"wrap",width:"100%"}}>
												{profileType!="personalProfile" &&(
													<div style={{width:"100%",display:"flex",flexDirection:"row",marginBottom:"5px",alignItems:"center"}}>
														<Link style={{textDecoration:"none",color:"black",marginRight:"5%"}}
															to={{pathname:`/profile/${props.postData.owner._id}`}}
														>	
															<img id="profilePictureDiv" src={profilePicture==null?
																NoProfilePicture:profilePicture}
																style={{width:"50px",height:"50px",borderRadius:"50%"}}
															/>
														</Link>
														<Link style={{textDecoration:"none",color:"black",marginRight:"5%",maxWidth:"60%"}}
															to={{pathname:`/profile/${props.postData.owner._id}`}}
														>	
															<p style={{marginRight:"5%",maxHeight:"20px",overflow:"hidden"}}>
																<b>{props.postData.owner.firstName}</b>
															</p>
														</Link>

														{profileType!="personalProfile"==true &&(
															<BadgeDisplay
																profileId={props.postData.owner._id}
															/>
														)}
													</div>
												)}
												<div id="postOptionsDiv" style={{flexWrap:"wrap",marginLeft:"10%",display:"flex",flexDirection:"row",alignItems:"center"}}>
													<div onClick={()=>createOrRemoveStampEffect({isAccessTokenUpdated:false})} 
														style={ShadowButtonCSS}
														id="postOptions">
														<LoyaltyIcon
															style={{fontSize:30}}
														/>
													</div>
													<div style={VerticalLineCSS}/>
													<div onClick={()=>displayCommentsTrigger()} 
														style={ShadowButtonCSS}
														id="postOptions">
														<ChatIcon
															id="postOptions"
															style={{fontSize:30}}
														/>
													</div>
													<div style={VerticalLineCSS}/>
													<div style={ShadowButtonCSS} id="postOptions">
														<AssessmentIcon
															onClick={()=>changeDisplayPollingOptions(true)}
															style={{fontSize:30}}
														/>
													</div>
													<div style={VerticalLineCSS}/>
													{(profileType=="personalProfile" && isOwnProfile==true) &&(
														<React.Fragment>
															<div onClick={()=>displayEditPostHandle()} style={ShadowButtonCSS}
																id="postOptions">
																<BorderColorIcon
																	style={{fontSize:30}}
																/>
															</div>
															<div style={VerticalLineCSS}/>
															<div onClick={()=>handleRemoveRegularPost()} style={ShadowButtonCSS}
																id="postOptions">
																<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler 
																	icon-tabler-trash" width="30" height="30" viewBox="0 0 24 24" 
																	stroke-width="1.5" stroke="#858585" fill="none" stroke-linecap="round" 
																	stroke-linejoin="round">
																  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
																  <line x1="4" y1="7" x2="20" y2="7" />
																  <line x1="10" y1="11" x2="10" y2="17" />
																  <line x1="14" y1="11" x2="14" y2="17" />
																  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
																  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
																</svg>
															</div>
															<div style={VerticalLineCSS}/>
															<div onClick={()=>triggerPromoteModal()} style={ShadowButtonCSS}
																id="postOptions">
																<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" 
																	  width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" 
																	  stroke="#858585"
																	  fill="none" stroke-linecap="round" stroke-linejoin="round">
																	  <path stroke="none" d="M0 0h24v24H0z"/>
																	  <circle cx="12" cy="9" r="6" />
																	  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
																	  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
																</svg>
															</div>
															<div style={VerticalLineCSS}/>
															<div class="fa fa-shield" onClick={()=>changePostBadgeAdditionalDisplayPortal(true)}
																style={{...ShadowButtonCSS,fontSize:"30px",color:"#6e6e6e",cursor:"pointer"}}
																id="postOptions"
															/>
														</React.Fragment>
													)}
													{(symposiumPostInformation!=null && symposiumPostInformation.isOligarch==true)==true &&(
														<React.Fragment>
															<div style={VerticalLineCSS}/>
															<div style={ShadowButtonCSS} 
																onClick={()=>symposiumPostInformation.displayOligarchPostSettings(
																										postData._id,
																										postData.symposiumUploadCategory)}>
																{crownLogo()}
															</div>
														</React.Fragment>
													)}
												</div>
											</div>
											<hr id="postInformationHorizontalLine" style={HorizontalLineCSS}/>

											<div style={{display:"flex",flexDirection:"column"}}>
												{displayPollingOptions==true?
													<PollingOptionsContainer>

														<div id="backButton" onClick={()=>changeDisplayPollingOptions(false)}
															style={ButtonCSS}>
															Back
														</div>

														<p style={{fontSize:"18px"}}>
															Create a comment about why you think this post is authentic or.... tell everyone 
															why you think this post is fake
														</p>
														<hr style={HorizontalLineCSS}/>

														<div style={{display:"flex",flexDirection:"row"}}>
															<p onClick={()=>displayApprovePollModalTrigger()} style={PollingOptionsCSS}>
																Approve Post
															</p>

															<div style={{...VerticalLineCSS,marginRight:"2%",marginLeft:"2%"}}/>

															<p onClick={()=>displayDisapproveModalTrigger(false)} style={PollingOptionsCSS}>
																Disapprove Post
															</p>
														</div>







													</PollingOptionsContainer>
													:<React.Fragment>
														{displayStampEffect==true && (
															<StampIconEffect id="stampEffect">
																<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
															</StampIconEffect>
														)}
														{isAudioPost==null || isAudioPost==false?
															<p style={{fontSize:"18px"}}>
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
											</div>
										</React.Fragment>
									}
								</PostContainer>
							}
						</Container>
					</React.Fragment>

				)}
			</PostDisplayConsumer>
		)}
	</PostConsumer>
	)
}

export default RegularPostContainer;