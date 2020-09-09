import React,{Component} from "react";
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

import {BlogConsumer} from "./BlogContext.js";

const Container=styled.div`
	position:fixed;
	width:15%;
	height:60%;
	top:17%;
	left:2%;
	background-color:white;
	border-radius:5px;
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

const TextOptions=({displayEditBlogSubmitModal,blogState,postType,displayCommentSection})=>{
	const changeBold=()=>{

	}

	const changeItalics=()=>{

	}

	const enableCodingBlock=()=>{


	}

	const enableBulletList=()=>{


	}

	const enableNumberedLst=()=>{


	}

	const handleSubmitBlogData=()=>{

	}

	return(
		<BlogConsumer>
				{ personInformation=>{
					return <Container>
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
									{postType!="Creation" && (
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayCommentSection()} style={{listStyle:"none",marginBottom:"3%"}}>
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
									)}
									{/*
										<li style={{listStyle:"none"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<VideoDescriptionContainer>
														<video width="100%" height="100%" borderRadius="50%" autoplay="true" controls>
																		<source src={props.blogState.videoDescription} type="video/mp4"/>
														</video>
													</VideoDescriptionContainer>
												</li>

												<li style={{listStyle:"none",display:"inline-block"}}>
													<audio controls>
																  <source src={props.blogState.audioDescription} type="audio/ogg"/>
																  <source src={props.blogState.audioDescription} type="audio/mpeg"/>
																Your browser does not support the audio element.
													</audio>
												</li>
											</ul>
										</li>
									*/}
									
								</ul>
							</Container>
						}}
		</BlogConsumer>
		
	)
}

export default TextOptions;