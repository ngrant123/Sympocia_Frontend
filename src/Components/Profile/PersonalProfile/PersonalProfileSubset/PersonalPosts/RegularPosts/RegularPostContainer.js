import React,{useContext,useMemo,useCallback} from "react";
import styled from "styled-components";
import {getRegularPostFromUser} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getCompanyRegularPosts} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import NoPostsModal from "../NoPostsModal.js";
import { convertFromRaw,EditorState } from 'draft-js';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";

import SmallRegularPost from "./SmallRegularPostsContainer.js";
import HeaderPost from "./HeaderRegularPost.js";
import {CompanyPostDisplayConsumer} from "../../../../CompanyProfile/CompanyProfilePostsDisplayContext.js";
import {PostDisplayConsumer,PostDisplayContext} from "../../../PostDisplayModalContext.js";

import {PostConsumer,PostContext} from "../PostsContext.js";
import Typed from "react-typed";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:125%;
	background-color:white;
	padding:10px;

	@media screen and (max-width:1370px){
		width:130%;
		#postContainer{
			width:90%;
		}
		#smallContainerLI{
			display:block !important;
		}
	}

	@media screen and (max-width:450px){
		width:150% !important;
		#headerContainerLI{
			margin-bottom:5% !important;
			width:350px !important;
		}
		#postContainer{
			width:150% !important;
		}
	}
  @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#headerContainerLI{
			width:50% !important;
		}
    }
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	
		#smallContainerLI{
			height:60% !important;
		}
    }
`;

const RegularPostContainer=styled.div`
	background-color:white;
	width:102%;
	height:30%;
	border-radius:5px;
`;

const ProfilePicture=styled.div`
	position:relative;
	border-radius:50%;
	height:40%;
	width:45%;
	background-color:red;
	margin-top:2%;
	overflow:hidden;
	border-radius:50%;
	margin-left:20%;

	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
`;

const PostCommentsAndLikesButtons=styled.div`
	padding:5px;
	width:100%;
	border-color:#5298F8;
	border-style:solid;
	border-width:1px;
	color:#5298F8;
	background-color:white;
	border-radius:5px;
`;

const Post=styled.div`
	position:relative;
	width:450px;
	height:50%;
	overflow-y:scroll;
	font-size:15px;
	padding-top:30px;
`;

const CommentsProfile=styled.div`
	position:relative;
	width:450px;
	overflow-x:hidden;
	height:70%;

`;

const SmallProfileCommentPicture=styled.div`
	position:relative;
	width:55px;
	height:95%;
	background-color:red;
	border-radius:50%;
	margin-top:2%;
`;

const NextPostLabelCSS={
	listStyle:"none",
	  display:"inline-block",
	  backgroundColor:"white",
	  borderRadius:"5px",
	  padding:"10px",
	  color:"#3898ec",
	  borderStyle:"solid",
	  borderWidth:"2px",
	  borderColor:"#3898ec",
	  maxWidth:"30%",
	  maxHeight:"50px",
	  overflow:"hidden",
	  cursor:"pointer"
}


const RegularPostsContainer=(props)=>{
	const PostContextValues=useContext(PostContext);
	const PostDisplay=useContext(PostDisplayContext);
	const displayPostModalCallback=useCallback((data)=>displayPostModal(data),[props.posts.posts]);


	const displayPostModal=(data)=>{
		PostDisplay.handleRegularPostModal(data,PostContextValues);
	}

	return(
		<Container>
			{props.isLoadingIndicatorRegularPost==true?
				<p>We are currently getting posts</p>:
				<React.Fragment>
					{props.posts.posts.length==0 && props.posts.headerPost==null?
													<NoPostsModal
														id="noPostsModalContainer"
														postType={"post"}
														profilePageType={props.profile}
														isSearchFilterActivated={PostContextValues.isSearchFilterActivated}
													/>:
								<ul id="postContainer" style={{padding:"0px"}}>
									{props.posts.headerPost==null?null:
										<React.Fragment>
											<HeaderPost
												post={props.posts.headerPost}
												profilePicture={props.profilePicture}
												displayPostModal={displayPostModalCallback}
												friendsColorNodesMap={props.friendsColorNodesMap}
											/>	
											<hr/>
										</React.Fragment>
									}
									<SmallRegularPost
										posts={props.posts.posts}
										profilePicture={props.profilePicture}
										displayPostModal={displayPostModalCallback}
										friendsColorNodesMap={props.friendsColorNodesMap}
									/>
									{PostContextValues.endOfPostsDBIndicator==false
									 && PostContextValues.isSearchFilterActivated==false 
									 && PostContextValues.isFilteredPostsActivated==false  && (
										<React.Fragment>
											{PostContextValues.isLoadingReloadedPosts==true?
												 <Typed 
								                    strings={['Loading...']} 
								                    typeSpeed={60} 
								                    backSpeed={30} 
						                		  />:
												<p onClick={()=>PostContextValues.fetchNextPosts()} style={NextPostLabelCSS}>
													Next
												</p>
											}
										</React.Fragment>
									)}
								</ul>
						}
					</React.Fragment>
				}
			</Container>
	)
}

export default RegularPostsContainer;