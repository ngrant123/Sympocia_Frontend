import React,{useState} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ImageInformation from "./ImageInformation.js";
import Comments from "../../../CommentsComponent/index.js";
import PollOptionPortal from "../../PollOptionPortal.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EditImageCreation from "../ImageCreation/EditImageCreation.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {StampIconEffect} from "./ImageContainerCSS.js";

import {
	addStampPost,
	unStampPost,
	deletePost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	overflow:scroll;
	@media screen and (max-width:830px){
		width:80%;
		left:10% !important;
		#postInformationLI{
			display:none !important;
		}
		#postOptionsLI{
			display:none !important;
		}
    }
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	#image{
			height:140% !important;
		}
    }
    @media screen and (min-width:740px) and (min-height:420px) and (orientation:landscape){
	 	#image{
			height:70% !important;
		}
    }

    @media screen and (max-width:500px){
		width:100%;
		left:0% !important;
		 #image{
			height:60% !important;
		}
    }
 

`;

const CommentContainer=styled.div`
	position:absolute;
	background-color:white;
	border-radius:5px;

	@media screen and (max-width:1030px){
		margin-left:5% !important;
		left:5% !important;
		width:80% !important;
    }
	@media screen and (max-width:420px){
		margin-left:7% !important;
		width:85% !important;
		left:0% !important;
    }
`;
const TogglePostInformationButton=styled.div`
	position:absolute;
	width:20%;
	height:5%;
	border-radius:50%;
	left:85%;
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

const PostInformationContainer=styled.div`
	position:absolute;
	width:120%;
	left:-10%;
	top:30%;
	border-radius:5px;
	height:40%;

	@media screen and (max-width:1370px) and (max-height:1030px){
	 	height:10% !important;
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

const MobileUI=({imgData,isChromeBrowser,targetDom,deletePost,pageType,isOwnPostViewing,promote})=>{

	const [displayPostInformationContainer,changePostInfoContainerDisplay]=useState(false);
	const [displayComments,changeDisplayComments]=useState(false);
	const [displayInformation,changeDisplayInformation]=useState(false);
	const [displayPollOption,changeDisplayPollOption]=useState(false);
	const [displayEditImageModal,changeDisplayEditImageModal]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);


	const displayCommentsTrigger=()=>{
		changePostInfoContainerDisplay(true);
		changeDisplayComments(true);
		changeDisplayInformation(false);
		changeDisplayPollOption(false);
	}

	const displayPostInformationTrigger=()=>{
		changePostInfoContainerDisplay(true);
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
		changeDisplayEditImageModal(false);
		imgData.contextLocation.editPost(data);
	}

	const postInformation=()=>{
		return(
			<>
				{displayPostInformationContainer==true &&(
					<PostInformationContainer>
						{displayComments==true &&(
							<CommentContainer>
						 		<Comments
									postId={imgData._id}
									postType={"Image"}
									hideComments={hidePostDisplayInformationContainer}
									targetDom={targetDom}
								/>
							</CommentContainer>
						)}
						{displayInformation==true &&(
							<ImageInformation
								imageInformation={imgData}
								targetDom={targetDom}
								isMobileTrue={true}
							/>
						)}
					</PostInformationContainer>
				)}
			</>
		)
	}

	const createOrRemoveStampEffect=()=>{
		if(displayStampEffect==false){
			addStampPost(imgData.owner,imgData._id,"personal","ImagePost");
			changeDisplayStampEffect(true);
		}else{
			unStampPost(imgData.owner,imgData._id,"personal","ImagePost");
			changeDisplayStampEffect(false);
		}
	}
	return (
		<React.Fragment>
			{displayEditImageModal==false?
				<Container>
					<ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",marginBottom:"5%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
									{(imgData.videoDescription==null && isChromeBrowser==false)==true?null:
										<VideoDesriptionContainer>
											<video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" controls>
												<source src={imgData.videoDescription} type="video/mp4"/>
											</video>
										</VideoDesriptionContainer>
									}
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									{(imgData.audioDescription==null && isChromeBrowser==false)==true?null:
										<audio style={{width:"150px"}} controls>
											<source src={imgData.audioDescription} type="audio/ogg"/>
											<source src={imgData.audioDescription} type="audio/mpeg"/>
											Your browser does not support the audio element.
										</audio>
									}
								</li>
							</ul>
						</li>
						<div id="image" style={{marginLeft:"-10%",height:"60%",overflow:"hidden",width:"120%"}}>
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

							<img  src={imgData.imgUrl} style={{width:"120%",height:"90%",borderRadius:"5px",marginLeft:"-10%"}}/>
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
								
								{(pageType=="personalProfile" && isOwnPostViewing==true) &&(
									<>
										<a href="javascript:void(0);">
											<li onClick={()=>changeDisplayEditImageModal(true)} style={ShadowButtonCSS}>
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
											<li onClick={()=>promote()} style={ShadowButtonCSS}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" 
													  width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#151515"
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
				</Container>
				:<EditImageCreation
						imageSrcUrl={imgData.imgUrl}
						previousData={imgData}
						editPost={editPost}
					/>
			}
		</React.Fragment>
	)
}

export default MobileUI;