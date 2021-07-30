import React,{useContext,useMemo,useCallback} from "react";
import styled from "styled-components";
import SmallVideoContainer from "./SmallVideos.js";
import {getCompanyVideos} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import {UserConsumer} from "../../../UserContext.js";
import NoPostsModal from "../NoPostsModal.js";
import {VideoPostProvider} from "./VideoPostContext.js";

import {PostDisplayConsumer,PostDisplayContext} from "../../../PostDisplayModalContext.js";
import {CompanyPostDisplayConsumer} from "../../../../CompanyProfile/CompanyProfilePostsDisplayContext.js";
import CrownedVideo from "./CrownedVideoContainer.js";
import {PostConsumer,PostContext} from "../PostsContext.js";
import Typed from "react-typed";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:125%;
	padding:10px;
	padding-right:20px;

	@media screen and (min-width:2500px){
		#smallVideoParentContainer{
			margin-right:-10% !important;
			margin-top:5% !important;
		}
	}
	@media screen and (max-width:1370px){
		width:140%;
		#smallVideoLI{
			margin-left:5%;
			margin-right:15% !important;
			width:10% !important;
		}
		#smallVideoParentContainer{
			margin-left:-5% !important;
		}
	}
	@media screen and (max-width:1030px){
		width:140%;
		#smallVideoLI{
			margin-right:30% !important;
		}
	}
	@media screen and (max-width:740px){
		#smallVideoLI{
			width:15% !important;
		}
	}

	@media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:740px) and (max-height:850px){
		margin-left:15% !important;
	}

	@media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:1000px) and (max-height:1370px){
		margin-left:10% !important;
	}

	@media screen and (min-width:620px) and (max-width:650px) 
	    and (min-height:1300px) and (max-height:1370px){
		margin-left:15% !important;
	}
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	margin-left:10% !important;
	 	#smallVideoLI{
			margin-bottom:5% !important;
		}
    }
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		margin-top:5px;
		margin-left:0% !important;
		#smallVideoParentContainer{
			margin-bottom:-5% !important;
		}
    }
`;

const SmallVideoComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;
`;

const SmallVideo=styled.div`
	position:relative;
	height:65%;
	width:100%;
	background-color:red;
	border-radius:5px;
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

const VideoPostsContainer=(props)=>{
	const PostContextValues=useContext(PostContext);
	const PostDisplay=useContext(PostDisplayContext);
	const displayPostModalCallback=useCallback((data)=>displayPostModal(data),[props.videos.videos]);

	const displayPostModal=(data)=>{
		PostDisplay.handleVideoPostModal(data,PostContextValues);
	}

	return(
		<Container>
			{props.isLoadingIndicatorVideos==true ? <p>We are currently getting the videos please wait </p>:
				<React.Fragment>
					{props.videos.videos.length==0 && props.videos.headerVideo==null? 
						<NoPostsModal
							id="noPostsModalContainer"
							postType={"video"}
							profilePageType={props.profile}
							isSearchFilterActivated={PostContextValues.isSearchFilterActivated}
						/>:
						<ul style={{padding:"0px"}}>
							{props.videos.headerVideo==null? <React.Fragment></React.Fragment>:
								<React.Fragment>
									<CrownedVideo
										headerVideo={props.videos.headerVideo}
										displayPostModal={displayPostModalCallback}
										friendsColorNodesMap={props.friendsColorNodesMap}
									/>
									<hr/>
								</React.Fragment>
							}
							<SmallVideoContainer
								videos={props.videos.videos}
								displayPostModal={displayPostModalCallback}
								friendsColorNodesMap={props.friendsColorNodesMap}
							/>
							{PostContextValues.endOfPostsDBIndicator==false
								&& PostContextValues.isSearchFilterActivated==false 
								&& PostContextValues.isFilteredPostsActivated==false && (
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


export default VideoPostsContainer;