import React,{useState} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Comments from "../../../CommentsComponent/index.js";
import PollOptionPortal from "../../PollOptionPortal.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EditVideoModal from "../VideoCreation/EditVideoModal.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {StampIconEffect} from "../../ImageComponent/ImageDisplay/ImageContainerCSS.js";

import {
	addStampPost,
	unStampPost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	overflow:scroll;
	background-color:white;

	border-radius:5px;

	@media screen and (max-width:1370px){
		#video{
			width:100% !important;
			margin-left:0% !important;
		}
	}

	@media screen and (max-width:700px){
		width:110% !important;
		height:80% !important;
		margin-left:0% !important;
		#video{
			width:90% !important;
			height:100% !important;
			margin-top:-10% !important;
		}
		#expandMoreLI{
			font-size:15px !important;
		}
		#expandLessLI{
			font-size:15px !important;
		}
		#audio{
			width:100px !important;
		}

		#miniVideo{
			width:30% !important;
			height:20% !important;
			margin-left:10% !important;
		}
    }
    @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
	 	#video{
			margin-top:0% !important;
		}
		#videoDiv{
			height:100% !important;
		}
    }
`;


const VideoInformationContainer=styled.div`
	position:absolute;
	width:40%;
	height:82%;
	z-index:3;
	background-color:white;
	top:30px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:80% !important;
		height:100% !important;
		margin-left:8% !important;
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
		margin-left:8% !important;
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

const CommentAndVideoInformationContainer=styled.div`
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
		height:100%;
		left:0% !important;
		margin-top:5% !important;
    }
`;
const TogglePostInformationButton=styled.div`
	position:absolute;
	width:10%;
	height:5%;
	border-radius:50%;
	left:85%;
	background-color:white;
	top:10%;
	text-align:center;
	z-index:10;
	backface-visibility: hidden;
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

const PostInformationContainer=styled.div`
	position:absolute;
	width:120%;
	left:-10%;
	top:60%;
	border-radius:5px;
	height:40%;
	overflow:scroll;

	@media screen and (max-width:1370px) and (max-height:1030px){
	 	height:100% !important;
    }
	@media screen and (max-width:740px) and (max-height:420px){
		height:90% !important;
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

const VideoAudioAndVideoDescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:5%;

	@media screen and (max-width:700px){
		${({commentsIndicator})=>
			commentsIndicator==true &&(
				`display:none !important;`
			)
		}
	}
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

const BackButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	listStyle:"none",
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
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%",
	cursor:"pointer"
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
	cursor:"pointer",
	height:"20%",
	marginTop:"2%",
	marginLeft:"5%"
}


const MobileUI=({video,targetDom,triggerPromoteModal,displayEditModal,deletePost,pageType,isOwnPostViewing,personalId,closePostModal,displayPollModal})=>{

	const [displayPostInformationContainer,changePostInfoContainerDisplay]=useState(false);
	const [displayComments,changeDisplayComments]=useState(false);
	const [displayInformation,changeDisplayInformation]=useState(false);
	const [displayPollOption,changeDisplayPollOption]=useState(false);
	const [displayVideoImageModal,changeDisplayVideoImageModal]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);


	const [displayPollingModal,changeDisplayPollingModal]=useState(false);
	const [displayApproveModal,changeDisplayApproveModal]=useState(false);

	if(video.isPostAuthentic!=null){
		var approvesPostNumber=video.isPostAuthentic.numOfApprove!=null?
							   video.isPostAuthentic.numOfApprove.length:null;

		var disapprovesPostNumber=video.isPostAuthentic.numOfDisapprove!=null?
								  video.isPostAuthentic.numOfDisapprove.length:null;
	}

	const closeModal=()=>{
		changeDisplayPollingModal(false);
	}

	const displayApproved=()=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(true);
	}

	const displayUnApprove=()=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(false);
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
	const postInformation=()=>{
		return(
			<CommentAndVideoInformationContainer>
				{displayComments==true?
					<li style={{listStyle:"none"}}>
						<Comments
							postId={video._id}
							postType={"Videos"}
							hideComments={hidePostDisplayInformationContainer}
							targetDom={targetDom}
						/>
					</li>:
					<React.Fragment>
						<ul id="postLIContainer" style={{padding:"0px"}}>
							<hr/>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>hidePostDisplayInformationContainer()} style={BackButtonCSS}>
									Back
								</li>
							</a>
							<li id="postOwnerAndSymposium" style={{listStyle:"none",display:"inline-block",marginTop:"2%",marginRight:"3%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<p style={{fontSize:"20px"}}>{video.firstName}</p>
									</li>
									{video.industriesUploaded.length>0 &&(
										<li style={{listStyle:"none"}}>	
											<IndustryButton>
												{video.industriesUploaded[0].industry}
											</IndustryButton>
										</li>
									)}
								</ul>
							</li>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li id="approvesPostLI" onClick={()=>displayPollModal(true)} style={ButtonCSS}>
									<p style={{color:"#01DF01"}}>{approvesPostNumber}</p> Approve Post
								</li>
							</a>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li id="disapprovePostLI" onClick={()=>displayPollModal(false)} style={ButtonCSS}>
									<p style={{color:"#FE2E2E"}}>{disapprovesPostNumber}</p> Mark as Fake News
								</li>
							</a>
						</ul>

						<p style={{width:"90%",fontSize:"40px"}}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
							dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
							anim id est laborum.
							{/*
								<b>
									{video.title}
								</b>
							*/}
						</p>
						<p style={{overflow:"hidden"}}> 
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
							dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
							anim id est laborum.
							{/*
							 	{video.description}
							*/}
						</p>
					</React.Fragment>
				}
			</CommentAndVideoInformationContainer>
		)
	}

	const miniVideoInformationAndCommentComponent=()=>{
		return(
			<React.Fragment>
				<div>
					<video onClick={()=>hidePostDisplayInformationContainer()} 
						id="miniVideo"  width="30%" height="30%" borderRadius="50%" autoplay="true">
						<source src={video.videoUrl} type="video/mp4"/>
					</video>
				</div>
				{postInformation()}
			</React.Fragment>
		)
	}

	const createOrRemoveStampEffect=()=>{
		if(displayStampEffect==false){
			addStampPost(video._id,"personal","Videos",personalId);
			changeDisplayStampEffect(true);
		}else{
			unStampPost(video._id,"personal","Videos",personalId);
			changeDisplayStampEffect(false);
		}
	}
	return (
				<Container>
					<ul style={{padding:"10px"}}>
						<div onClick={()=>closePostModal()} style={{marginBottom:"5%"}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
							 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
							 stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							  <circle cx="12" cy="12" r="9" />
							  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</div>
						<VideoAudioAndVideoDescriptionContainer 
							commentsIndicator={displayComments}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
								{video.videoDescription==null? null:
									<VideoDesriptionContainer>
										<video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" controls muted>
											<source src={video.videoDescription} type="video/mp4"/>
										</video>
									</VideoDesriptionContainer>
								}
							</li>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
								{video.audioDescription==null? null:
									<audio id="audio" style={{width:"150px"}} controls>
										<source src={video.audioDescription} type="audio/ogg"/>
										<source src={video.audioDescription} type="audio/mpeg"/>
										Your browser does not support the audio element.
									</audio>
								}
							</li>
							<li id="expandLI" onClick={()=>displayPostInformationTrigger()} style={ExpandButtonCSS}>
								{displayInformation==false?
									<ExpandMoreIcon
										id="expandMoreLI"
										style={{fontSize:30}}
									/>
									:<ExpandLessIcon
										id="expandLessLI"
										style={{fontSize:30}}
									/>
								}
							</li>
						</VideoAudioAndVideoDescriptionContainer>
						<div id="videoDiv" style={{marginLeft:"0%",height:"60%",overflow:"hidden",width:"100%"}}>
							{displayInformation==false && displayComments==false ?
								<React.Fragment>
									<video  key={video.videoUrl} id="video" position="absolute" height="100%" width="100%" controls autoplay muted>
									    <source src={video.videoUrl} type="video/mp4"/>
									</video>
									
									{displayStampEffect==true &&(
										<StampIconEffect
											id="stampEffect"
										>
											<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
										</StampIconEffect>
									)}
								</React.Fragment>:
								<React.Fragment>
									{miniVideoInformationAndCommentComponent()}
								</React.Fragment>
							}
						</div>
						{displayInformation==false && displayComments==false && (
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
											<li onClick={()=>displayEditModal()} style={ShadowButtonCSS}>
												<BorderColorIcon
													style={{fontSize:30}}
												/>
											</li>

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

						)}

					</ul>
				</Container>
	)
}

export default MobileUI;