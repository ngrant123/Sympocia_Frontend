import React,{useState} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Comments from "../../../CommentsComponent/index.js";
import PollOptionPortal from "../../PollOptionPortal.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RegularPostCreation from "../RegularPostCreation/index.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {StampIconEffect} from "../../ImageComponent/ImageDisplay/ImageContainerCSS.js";

import {
	addStampPost,
	unStampPost,
	deletePost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

const Container=styled.div`
	position:relative;
	background-color:white;
	width:150%;
	height:100%;
	overflow:scroll;

	@media screen and (max-width:1370px) and (max-height:1030px){
    	#postDiv{
			margin-left:5% !important;
		}
    }

	@media screen and (max-width:1030px){
		#postDiv{
			margin-left:5% !important;
		}
	}
	@media screen and (max-width:830px){
		width:80%;
		left:10% !important;
		#postInformationLI{
			display:none !important;
		}
		#postOptionsLI{
			display:none !important;
		}
		#postDiv{
			margin-left:10% !important;
		}
    }


    @media screen and (max-width:500px){
    	width:100% !important;
    	padding:20px !important;
    	margin-left:-7% !important;
    	height:80% !important;
    }

    @media screen  and (max-width:730px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
 		height:800px !important;
    }
 
`;


const PostInformationContainer=styled.div`
	position:absolute;
	width:40%;
	height:82%;
	z-index:3;
	background-color:white;
	top:30px;
	overflow-y:scroll;

	@media screen and (max-width:1030px){
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
	@media screen and (max-width:420px){
		margin-left:7% !important;
		width:85% !important;
		left:0% !important;
		margin-top:35% !important;
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
		width:80% !important;
    }
    @media screen and (max-width:1030px){
    	margin-left:10% !important;
		width:70% !important;
    }
    @media screen and (max-width:420px){
    	margin-left:20% !important;
		width:50% !important;
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
	height:140px;
	overflow-y:auto;
	font-size:20px;
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

const MobileUI=({postData,isChromeBrowser,targetDom,deletePost,userPostsInformation})=>{

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
									postType={"RegularPost"}
									hideComments={hidePostDisplayInformationContainer}
									targetDom={targetDom}
								/>
							</CommentContainer>
						)}
						{displayInformation==true &&(
							<InformationContainer>
								{displayPollingModal==true?
									<PollOptionPortal
										closeModal={closeModal}
										displayApproveModal={displayApproveModal}
										postId={postData._id}
										postType="Videos"
										targetDom={targetDom}
									/>:null
								}
								<ul id="postLIContainer" style={{padding:"0px",width:"140%"}}>
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
										<li id="approvesPostLI" onClick={()=>displayApproved()} style={ButtonCSS}>
											<p style={{color:"#01DF01"}}>{approvesPostNumber}</p> Approve Post
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li id="disapprovePostLI" onClick={()=>displayUnApprove()} style={ButtonCSS}>
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
			addStampPost(postData.owner,postData._id,"personal","ImagePost");
			changeDisplayStampEffect(true);
		}else{
			unStampPost(postData.owner,postData._id,"personal","ImagePost");
			changeDisplayStampEffect(false);
		}
	}

	const handleRemovePost=async()=>{
		const removeRegularPost={
			postType:"RegularPosts",
			postId:postData._id,
			industriesUploaded:postData.industriesUploaded
		}
		const {confirmation,data}=await deletePost(removeRegularPost);
		debugger;
		if(confirmation=="Success"){
			postData.contextLocation.removePost(postData._id,"RegularPosts");
		}else{
			alert('Unfortunately there has been an error deleting this post. Please try again');
		}
	}

	return (
		<React.Fragment>
			{displayRegularPostModal==false?
				<Container>
					<ul style={{padding:"10px"}}>
						<div id="postDiv" style={{marginLeft:"-10%",height:"60%",overflow:"hidden",width:"120%"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<TogglePostInformationButton
									onClick={()=>displayPostInformationTrigger()}
								>
									{displayInformation==false?
										<ExpandMoreIcon
											style={{fontSize:30}}
										/>
										:<ExpandLessIcon
											style={{fontSize:30}}
										/>
									}
									
								</TogglePostInformationButton>
							</a>
							{displayStampEffect==true &&(
								<StampIconEffect
									id="stampEffect"
								>
									<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
								</StampIconEffect>
							)}
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
							{postInformation()}
						</div>
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
								<a href="javascript:void(0);">
									<li onClick={()=>changeDisplayRegularPostModal(true)} style={ShadowButtonCSS}>
										<BorderColorIcon
											style={{fontSize:30}}
										/>
									</li>
								</a>

								<a href="javascript:void(0);">
									<li onClick={()=>handleRemovePost()} style={ShadowButtonCSS}>
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
							</ul>
						</li>
					</ul>
				</Container>
				:
				<RegularPostCreation 
					previousData={postData}
					contextLocation={userPostsInformation}
				/>
			}
		</React.Fragment>
	)
}

export default MobileUI;




