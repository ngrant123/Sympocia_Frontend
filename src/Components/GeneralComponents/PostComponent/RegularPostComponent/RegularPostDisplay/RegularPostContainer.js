import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import CommentsContainer from "../../../../GeneralComponents/CommentsComponent/index.js";
import PosterInformation from "./PosterInformation.js";
import PostContent from "./PostInformation.js";
import RegularPostCreation from "../RegularPostCreation/index.js";
import {PostConsumer} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/PostsContext.js";
import MobileUI from "./MobileUI.js";
import {testIfUserIsUsingChrome} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/VerifyBrowserIsChrome.js";


const Container=styled.div`
`;

const PostInformationContainer=styled.div`
	position:relative;
	height:90%;
	width:330px;
	background-color:white;
`;

const PostContentAndCommentsButtons=styled.div`
	position:relative;
	height:80%;
	width:800;
	background-color:blue;
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
	background-color:red;
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


const SocialMedaIcon=styled.div`
`;

const BackButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px"
}





const RegularPostContainer=(props)=>{
	const [displayCommentsAndResponses,changeDisplayCommentsAndResponses]=useState(false);
	const [displayEditPostModal,changeDisplayEditPostModal]=useState(false);
	const [displayMobileUI,changeUIStatus]=useState(false);

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


	return(
	<PostConsumer>
		{userPostsInformation=>{
			return <React.Fragment>
						{displayMobileUI==true?
							<MobileUI
								postData={props.postData}
								isChromeBrowser={testIfUserIsUsingChrome()}
								targetDom={props.targetDom}
								userPostsInformation={userPostsInformation}
								triggerPromoteModal={props.triggerPromoteModal}
								triggerEditPostModal={displayEditPostHandle}
								pageType={props.profileType}
								isOwnPostViewing={props.isOwnProfile}
							/>:
							<Container>
								{displayEditPostModal==true?
									<RegularPostCreation 
										previousData={props.postData}
										contextLocation={userPostsInformation}
									/>
									:
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
											<PosterInformation
												postData={props.postData}
												triggerPromoteModal={props.triggerPromoteModal}
												triggerEditPostModal={displayEditPostHandle}
												pageType={props.profileType}
												isOwnPostViewing={props.isOwnProfile}
											/>
										</li>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"1%",height:"20%",overflow:"hidden"}}>
											{displayCommentsAndResponses==true?
												<CommentsContainerDiv>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"3%"}}>
														<a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<p style={BackButtonCSS} onClick={()=>hideComments()}>
																Back
															</p>
														</a>
													</li>
													<CommentsContainer
														postId={props.postData._id}
														postType={"RegularPost"}
														hideComments={hideComments}
														targetDom={props.targetDom}
													/>
											 	</CommentsContainerDiv>:
											  <PostContent
													displayComments={DisplayCommentsState}	
													hideComments={hideComments}
													userData={props.postData}
													targetDom={props.targetDom}
												/>

											}
										</li>
									</ul>
								}
							</Container>
						}
					</React.Fragment>
		}}
	</PostConsumer>
	)
}

export default RegularPostContainer;