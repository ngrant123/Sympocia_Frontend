import React,{useState} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Comments from "../../../CommentsComponent/index.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RegularPostCreation from "../RegularPostCreation/index.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {StampIconEffect} from "../../ImageComponent/ImageDisplay/ImageContainerCSS.js";
import {
	addStampPost,
	unStampPost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	overflow:scroll;
	padding:20px;

	@media screen and (max-width:1370px) and (max-height:1030px){
    	#postDiv{
			margin-left:5% !important;
		}
		width:90%;
		left:10% !important;
		#postInformationLI{
			display:none !important;
		}
		#postOptionsLI{
			display:none !important;
		}
    }
	@media screen and (max-width:700px){
    	width:100% !important;
    	padding:20px !important;
    	margin-left:-7% !important;
    	height:80% !important;

    	#profilePictureImage{
    		height:40px !important;
    	}
    }
 
`;


const PostInformationContainer=styled.div`
	width:40%;
	height:82%;
	z-index:3;
	background-color:white;
	overflow-y:scroll;

	@media screen and (max-width:1030px){
		width:80% !important;
		height:100% !important;
		padding:10px;
		border-radius:5px;
		#postLIContainer{
			width:60% !important;
		}
	}

	@media screen and (max-width:800px){
		width:100% !important;
		height:100% !important;
		padding:10px;
		border-radius:5px;

		#postOwnerAndSymposium{
			display:block !important;
			margin-bottom:3% !important;
		}
		#disapprovePostLI{
			display:block !important;
			margin-bottom:3% !important;
		}
		#approvesPostLI{
			display:block !important;
			margin-bottom:3% !important;
		}
	}

	@media screen and (max-width:420px){
		width:100% !important;
		height:100% !important;
		margin-left:-8% !important;
		padding:10px;
		border-radius:5px;
		margin-top:20% !important;

		#postOwnerAndSymposium{
			display:block !important;
			margin-bottom:3% !important;
		}
		#disapprovePostLI{
			display:block !important;
			margin-bottom:3% !important;
		}
		#approvesPostLI{
			display:block !important;
			margin-bottom:3% !important;
		}
		#postLIContainer{
			width:80% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px){
	 	width:80%;
	 	#postLIContainer{
	 		width:100% !important;
	 		margin-left:2%
	 	}
    }

	@media screen and (max-width:1370px) and (max-height:1030px){
	 	width:100%;
	 	#postLIContainer{
	 		width:100% !important;
	 	}
    }
`;

const CommentContainer=styled.div`
	position:absolute;
	background-color:white;
	border-radius:5px;
	z-index:15;
	@media screen and (max-width:1030px){
		margin-left:5% !important;
		left:5% !important;
		width:80% !important;
    }
	@media screen and (max-width:700px){
		margin-left:7% !important;
		width:85% !important;
		left:0% !important;
		margin-top:-15% !important;
    }
`;
const TogglePostInformationButton=styled.div`
	position:absolute;
	width:10%;
	height:5%;
	border-radius:50%;
	left:85%;
	background-color:white;
	top:5%;
	text-align:center;
	z-index:10;
	@media screen and (max-width:1370px) and (max-height:1030px){
	 	top:15%; !important;
		height:10%;
		width:7%;
    }
	@media screen and (max-width:740px) and (max-height:420px){
			top:15%; !important;
			height:10%;
			width:7%;
    }

`;

const InformationContainer=styled.div`
	border-radius:5px;
	height:40%;
	overflow:scroll;

	@media screen and (max-width:1370px) and (max-height:1030px){
	 	height:100% !important;
    }
	@media screen and (max-width:740px) and (max-height:420px){
		height:90% !important;
		width:80% !important;
    }
`;
const VideoDesriptionContainer=styled.div`
	width:60px;
	height:60px;
	border-radius:50%;
	background-color:white;
	z-index:8;
`;

const IndustryButton=styled.div`
	position:relative;
	background-color:#5298F8;
	text-align:center;
	width:120px;
	padding:5px;
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

const PostContent=styled.div`
	position:relative;
	width:90%;
	font-size:20px;

	@media screen and (max-width:1370px){
		margin-left:15%;		
	}

	@media screen and (max-width:800px){
		font-size:15px;
		margin-left:0
	}
`;

const PostOwnerInformation=styled.div`
	display:flex;
	flex-direction:row;
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
  marginRight:"4%"
}


const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%"
}

const ExpandButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%",
	height:"5%",
	textAlign:"center"
}

const MobileUI=({postData,targetDom,userPostsInformation,triggerPromoteModal,pageType,isOwnPostViewing,deletePost,personalId,displayApprovePollModalTrigger,displayDisapproveModalTrigger})=>{

	const [displayPostInformationContainer,changePostInfoContainerDisplay]=useState(false);
	const [displayComments,changeDisplayComments]=useState(false);
	const [displayInformation,changeDisplayInformation]=useState(false);
	const [displayPollOption,changeDisplayPollOption]=useState(false);
	const [displayRegularPostModal,changeDisplayRegularPostModal]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayPollingModal,changeDisplayPollingModal]=useState(false);
	const [displayApproveModal,changeDisplayApproveModal]=useState(false);

	if(postData.isPostAuthentic!=null){
		var approvesPostNumber=postData.isPostAuthentic.numOfApprove!=null?
	 	postData.isPostAuthentic.numOfApprove.length:null;

		var disapprovesPostNumber=postData.isPostAuthentic.numOfDisapprove!=null?
		postData.isPostAuthentic.numOfDisapprove.length:null;
	}

	const closeModal=()=>{
		changeDisplayPollingModal(false);
	}

	const displayCommentsTrigger=()=>{
		changePostInfoContainerDisplay(true);
		changeDisplayComments(true);
		changeDisplayInformation(false);
		changeDisplayPollOption(false);
	}

	const displayPostInformationTrigger=()=>{
		changePostInfoContainerDisplay(!displayPostInformationContainer);
		changeDisplayComments(false);
		changeDisplayInformation(!displayInformation);
		changeDisplayPollOption(false);
	}

	const displayPollOptionTrigger=()=>{
		changePostInfoContainerDisplay(true);
		changeDisplayComments(false);
		changeDisplayInformation(false);
		changeDisplayPollOption(true);
	}

	const hidePostDisplayInformationContainer=()=>{
		changePostInfoContainerDisplay(false);
		changeDisplayComments(false);
		changeDisplayInformation(false);
		changeDisplayPollOption(false);
	}
	const editPost=(data)=>{
		changeDisplayRegularPostModal(false);
		postData.contextLocation.editPost(data);
	}

	const postInformation=()=>{
		return(
			<>
				{displayPostInformationContainer==true &&(
					<PostInformationContainer>
						{displayComments==true &&(
							<CommentContainer>
						 		<Comments
									postId={postData._id}
									postType={"RegularPosts"}
									hideComments={hidePostDisplayInformationContainer}
									targetDom={targetDom}
								/>
							</CommentContainer>
						)}
						{displayInformation==true &&(
							<InformationContainer>
								<ul id="postLIContainer" style={{padding:"0px"}}>
									<li id="postOwnerAndSymposium" style={{listStyle:"none",display:"inline-block",marginTop:"0%",marginRight:"3%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<p style={{fontSize:"20px"}}>{postData.firstName}</p>
											</li>
											{postData.industriesUploaded.length>0 &&(
												<li style={{listStyle:"none"}}>	
													<IndustryButton>
														{postData.industriesUploaded[0].industry}
													</IndustryButton>
												</li>
											)}
										</ul>
									</li>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li id="approvesPostLI" onClick={()=>displayApprovePollModalTrigger()} 
											style={ButtonCSS}>
											<p style={{color:"#01DF01"}}>{approvesPostNumber}</p> Approve Post
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li id="disapprovePostLI" onClick={()=>displayDisapproveModalTrigger()}
											 style={ButtonCSS}>
											<p style={{color:"#FE2E2E"}}>{disapprovesPostNumber}</p> Mark as Fake News
										</li>
									</a>
								</ul>
							</InformationContainer>
						)}
					</PostInformationContainer>
				)}
			</>
		)
	}

	const createOrRemoveStampEffect=()=>{
		if(displayStampEffect==false){
		//	addStampPost(postData._id,"personal","RegularPosts",personalId);
			changeDisplayStampEffect(true);
		}else{
		//	unStampPost(postData._id,"personal","RegularPosts",personalId);
			changeDisplayStampEffect(false);
		}
	}

	return (
		<React.Fragment>
			{displayRegularPostModal==false?
				<Container>
					<PostOwnerInformation>
						<img id="profilePictureImage" 
						src={postData.profilePicture==null?NoProfilePicture:postData.profilePicture} 
						style={{borderRadius:"50%",width:"15%",height:"80px"}}/>
						<p style={{fontSize:"25px",maxWidth:"55%",overflow:"hidden",maxHeight:"40px",marginLeft:"5%",marginRight:"5%"}}>
							<b>{postData.firstName}</b>
						</p>
						<div onClick={()=>displayPostInformationTrigger()} style={ExpandButtonCSS}>
							{displayInformation==false?
								<ExpandMoreIcon
									style={{fontSize:30}}
								/>
								:<ExpandLessIcon
									style={{fontSize:30}}
								/>
							}
						</div>
					</PostOwnerInformation>
					{displayPostInformationContainer==true?
						<React.Fragment>
							{postInformation()}
						</React.Fragment>
						:<React.Fragment>
							<div id="postDiv" style={{marginLeft:"-10%",width:"90%",marginTop:"5%"}}>
								{displayStampEffect==true &&(
									<StampIconEffect id="stampEffect">
										<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
									</StampIconEffect>
								)}
								{/*
									{postData.isAudioPost==null || postData.isAudioPost==false?
										<PostContent id="postContent">
											{postData.post}
										</PostContent>:
										<audio style={{width:"90%"}} controls>
											<source src={postData.post} type="audio/ogg"/>
											<source src={postData.post} type="audio/mpeg"/>
											Your browser does not support the audio element.
										</audio>
									}
								*/}
								<PostContent>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
									 et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
									  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
									   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
									   culpa qui officia deserunt mollit anim id est laborum.
									   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
									 et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
									  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
									   cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
									   culpa qui officia deserunt mollit anim id est laborum.
								</PostContent>
							</div>
							<ul style={{padding:"10px"}}>
								<hr/>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"20px"}}>
										<a href="javascript:void(0);">
											<li onClick={()=>createOrRemoveStampEffect()} style={ShadowButtonCSS}>
												<LoyaltyIcon
													style={{fontSize:30}}
												/>
											</li>
										</a>
										<a href="javascript:void(0);">
											<li onClick={()=>displayCommentsTrigger()} style={ShadowButtonCSS}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C" fill="none" stroke-linecap="round" stroke-linejoin="round">
												  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
												  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
												  <line x1="8" y1="9" x2="16" y2="9" />
												  <line x1="8" y1="13" x2="14" y2="13" />
												</svg>
											</li>
										</a>

										{(pageType=="personalProfile" && isOwnPostViewing==true) &&(
											<>
												<a href="javascript:void(0);">
													<li onClick={()=>changeDisplayRegularPostModal(true)} style={ShadowButtonCSS}>
														<BorderColorIcon
															style={{fontSize:30}}
														/>
													</li>
												</a>

												<a href="javascript:void(0);">
													<li onClick={()=>deletePost()} style={ShadowButtonCSS}>
														<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C" fill="none" stroke-linecap="round" stroke-linejoin="round">
														  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
														  <line x1="4" y1="7" x2="20" y2="7" />
														  <line x1="10" y1="11" x2="10" y2="17" />
														  <line x1="14" y1="11" x2="14" y2="17" />
														  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
														  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
														</svg>
													</li>
												</a>

												<a href="javascript:void(0);">
													<li onClick={()=>triggerPromoteModal()} style={ShadowButtonCSS}>
														<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" 
															  width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#151515"
															  fill="none" stroke-linecap="round" stroke-linejoin="round">
															  <path stroke="none" d="M0 0h24v24H0z"/>
															  <circle cx="12" cy="9" r="6" />
															  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
															  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
														</svg>
													</li>
												</a>
											</>
										)}
									</ul>
								</li>
							</ul>
						</React.Fragment>}
				</Container>
				:<RegularPostCreation 
					previousData={postData}
					contextLocation={userPostsInformation}
				/>
			}
		</React.Fragment>
	)
}

export default MobileUI;




