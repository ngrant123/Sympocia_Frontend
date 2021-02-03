import React,{useState,Component} from "react";
import styled, {keyframes} from "styled-components";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import { Icon, InlineIcon } from '@iconify/react';
import stampIcon from '@iconify/icons-fa-solid/stamp';
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

const Container=styled.div`
	position:fixed;
	width:15%;
	height:40%;
	left:83%;
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
	width:40%;
	height:50%;
	border-radius:50%;
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
		displayApproveDisapproveModalHandle,
		profileId,
		history,
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
		debugger;
		changeDisplayDeleteConfirmation(true);
	}

	const closeDeleteConfirmationModal=()=>{
		changeDisplayDeleteConfirmation(false);
	}

	const toggleComments=()=>{
		changeDisplayComments(!displayComments);
	}

	const userOptions=()=>{
		return	<>
					{displayComments==true ?
						<CommentContainer>
							<Comments
								postId={postId}
								postType={"Blogs"}
								hideComments={toggleComments}
								targetDom={"blogPostContainer"}
							/>
						</CommentContainer>:
						<React.Fragment>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									{postType!="Creation" && (
										<>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>toggleComments()} style={{listStyle:"none",display:"inline-block",
																								  marginBottom:"3%"}}>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-2"
															 width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C" 
															 fill="none" stroke-linecap="round" stroke-linejoin="round">
														  <path stroke="none" d="M0 0h24v24H0z"/>
														  <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3" />
														  <line x1="8" y1="9" x2="16" y2="9" />
														  <line x1="8" y1="13" x2="14" y2="13" />
													</svg>
												</li>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>displayApproveDisapproveModalHandle()}
												    style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
													<PollOutlinedIcon
														style={{fontSize:"40",color:"black"}}
													/>
												</li>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>props.triggerPromoteModal()}
												    style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
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

											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>handleRemoveBlogPost()}
												    style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler 
														icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#151515" fill="none" stroke-linecap="round" stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z"/>
													  <line x1="4" y1="7" x2="20" y2="7" />
													  <line x1="10" y1="11" x2="10" y2="17" />
													  <line x1="14" y1="11" x2="14" y2="17" />
													  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
													  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
													</svg>
												</li>
											</a>
											{blog!=null  &&(
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li onClick={()=>displayEditBlogSubmitModal()} style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
														<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil"
															 width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#151515" 
															 fill="none" stroke-linecap="round" stroke-linejoin="round">
														  	<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
														  	<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
														  	<line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
														</svg>
													</li>
												</a>	
											)}
											<hr/>
										</>
									)}
								</ul>
							</li>
							
							<li style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									{videoDescription!=null &&(
										<li style={{marginBottom:"3%",listStyle:"none",display:"inline-block"}}>
											<VideoDescriptionContainer>
												<video width="100%" height="100%" borderRadius="50%" autoplay="true" controls>
													<source src={videoDescription} type="video/mp4"/>
												</video>
											</VideoDescriptionContainer>
										</li>
									)}
									{audioDescription && (
										<li style={{listStyle:"none",display:"inline-block"}}>
											<audio controls>
												<source src={audioDescription} type="audio/ogg"/>
												<source src={props.blogState.audioDescription} type="audio/mpeg"/>
												Your browser does not support the audio element.
											</audio>
										</li>
									)}
								</ul>
							</li>
						</React.Fragment>
					}
			</>
	}

	const closeTextOptions=()=>{
		changeDisplayInformation(false);
	}


	return(
		<Container>
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
					optionsElement={userOptions}
					closeModal={closeTextOptions}
				/>
			)}
			<ul style={{padding:"0px"}}>
				{postType!="Creation" &&(
					<li onClick={()=>createOrRemoveStampEffect({isAccessTokenUpdated:false})} style={{listStyle:"none"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
								<LoyaltyIcon
									style={{fontSize:"40",color:"black"}}
								/>
							</li>
						</a>
					</li>
				)}
				{displayStampEffect==false?
					null:
					<li style={{listStyle:"none"}}>
						<StampIconEffect>
							<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
						</StampIconEffect>
					</li>
				}
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