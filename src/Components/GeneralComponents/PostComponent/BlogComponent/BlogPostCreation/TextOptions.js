import React,{useState} from "react";
import styled from "styled-components";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import FormatItalicOutlinedIcon from '@material-ui/icons/FormatItalicOutlined';
import FormatBoldOutlinedIcon from '@material-ui/icons/FormatBoldOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {BlogConsumer} from "./BlogContext.js";
import {deletePost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import TextOptionsHOC from "./TextOptionPortalHOC.js";
import DeletePostConfirmationPortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/DeletePostConfirmationPortal.js";

const Container=styled.div`
	position:fixed;
	width:15%;
	height:60%;
	top:17%;
	left:2%;
	background-color:white;
	border-radius:5px;
	padding-right:20px;

	@media screen and (max-width:600px){
		left:-5% !important;
	}
`;

const ProfilePicture=styled.div`

	position:relative;
	margin-left:2px;
	margin-top:1px;
	width:60px;
	height:10%;
	border-radius:50%;
	background-color:red;

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

const SubmitButton=styled.div`
	color:white;
	padding:10px;
	text-align:center;
	background-color:#C8B0F4;
	border-radius:5px;

`;
const VideoDescriptionContainer=styled.div`
	position:relative;
	width:50px;
	height:60px;
	border-radius:50%;
`;

const TextOptionsCSS={
	listStyle:"none",
	display:"inline-block",
	marginLeft:"10%",
	marginRight:"5%",
	marginBottom:"10%"
}

const TextOptions=(props)=>{
	const {
		displayEditBlogSubmitModal,
		blogState,
		postType,
		displayCommentSection,
		displayApproveDisapproveModalHandle,
		postId,
		industriesUploaded,
		history,
		isOwner,
		profileId
	}=props;

	const {location:{
		state:{
			videoDescription,
			audioDescription,
			blog
		}
	}}=history;
	const [displayInformation,changeDisplayInformation]=useState(false);
	const [displayDeleteConfirmation,changeDisplayDeleteConfirmation]=useState(false);

	const changeBold=()=>{}

	const changeItalics=()=>{}

	const enableCodingBlock=()=>{}

	const enableBulletList=()=>{}

	const enableNumberedLst=()=>{}

	const handleSubmitBlogData=()=>{}

	const handleRemoveBlogPost=async()=>{
		debugger;
		changeDisplayDeleteConfirmation(true);
	}

	const closeDeleteConfirmationModal=()=>{
		changeDisplayDeleteConfirmation(false);
	}

	const userOptions=()=>{
		return	<>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							{postType!="Creation" && (
								<>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayCommentSection()} style={{listStyle:"none",display:"inline-block",
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

									{isOwner==true && (
										<>
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
										</>
									)}
									<hr/>
								</>
							)}
						</ul>
					</li>
					
					<li style={{listStyle:"none",marginTop:"15%"}}>
						<ul style={{padding:"0px"}}>
							{videoDescription!=null &&(
								<li style={{listStyle:"none",display:"inline-block"}}>
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
				</>
	}

	const closeTextOptions=()=>{
		changeDisplayInformation(false);
	}
	return(
		<BlogConsumer>
				{ personInformation=>{
					return <Container>
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
								{props.isDesktop==true?
									<ul style={{padding:"0px"}}>
										{/*
											<li style={{listStyle:"none",marginBottom:"20%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
														<ProfilePicture/>
													</li>

													<li  style={{listStyle:"none",display:"inline-block"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",fontSize:"30px"}}>
																<b>Nathan</b>
															</li>

															<li style={{listStyle:"none"}}>
																Started 2 days ago
															</li>


														</ul>
													</li>
												</ul>
											</li>
										*/}

										<li style={{listStyle:"none",filter:" blur(8px)"}}>
											<ul style={{padding:"10px",minHeight:"50%",borderRadius:"5px"}}>
												<li style={TextOptionsCSS}>
													<ImageOutlinedIcon
														style={{fontSize:40}}
													/>
												</li>

												<li style={TextOptionsCSS}>
													<FormatBoldOutlinedIcon
														style={{fontSize:40}}
														onClick={()=>changeBold()}
													/>
												</li>

												<li style={TextOptionsCSS}>
													<TextFormatIcon
														style={{fontSize:40}}
														onClick={()=>changeBold()}
													/>
												</li>

												<li style={TextOptionsCSS}>
													<FormatItalicOutlinedIcon
														style={{fontSize:40}}
														onClick={()=>changeItalics()}
													/>
												</li>
												<li style={TextOptionsCSS}>
													<CodeOutlinedIcon
														style={{fontSize:40}}
														onClick={()=>enableCodingBlock()}
													/>
												</li>
												<li style={TextOptionsCSS}>
													<FormatListBulletedOutlinedIcon
														style={{fontSize:40}}
														onClick={()=>enableBulletList()}
													/>
												</li>
												<li style={TextOptionsCSS}>
													<FormatListNumberedOutlinedIcon
														style={{fontSize:40}}
														onClick={()=>enableNumberedLst()}
													/>
												</li>
												<li style={TextOptionsCSS}>
													<FormatQuoteRoundedIcon
														style={{fontSize:40}}
													/>
												</li>
												<li style={TextOptionsCSS}>
													<FunctionsRoundedIcon
														style={{fontSize:40}}
													/>
												</li>
												<li style={TextOptionsCSS}>
													<EmojiEmotionsOutlinedIcon
														style={{fontSize:40}}
														/>
												</li>
												<li style={TextOptionsCSS}>
													<GifIcon	
														style={{fontSize:40}}
													/>
												</li>
											</ul>
										</li>
										<li style={{listStyle:"none",marginBottom:"3%"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<SubmitButton onClick={()=>displayEditBlogSubmitModal()}>
													Submit
												</SubmitButton>
											</a>
										</li>
										<hr/>
										{userOptions()}
										
									</ul>
									:<TogglePostInformationButton>
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
								}
							</Container>
						}}
		</BlogConsumer>
		
	)
}

export default TextOptions;