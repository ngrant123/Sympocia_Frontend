import React,{Component} from "react";
import styled from "styled-components";
import SmallVideoContainer from "./SmallVideos.js";
import {getCompanyVideos} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import {UserConsumer} from "../../../UserContext.js";
import NoPostsModal from "../NoPostsModal.js";
import {VideoPostProvider} from "./VideoPostContext.js";

import {PostDisplayConsumer} from "../../../PostDisplayModalContext.js";
import {CompanyPostDisplayConsumer} from "../../../../CompanyProfile/CompanyProfilePostsDisplayContext.js";
import CrownedVideo from "./CrownedVideoContainer.js";
import {PostConsumer} from "../PostsContext.js";
import Typed from "react-typed";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:125%;
	padding:10px;
	padding-right:20px;
	@media screen and (max-width:1370px){
		width:140%;
		#smallVideoLI{
			margin-right:15% !important;
			width:10% !important;
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
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	margin-left:10% !important;
	 	#smallVideoLI{
			margin-bottom:5% !important;
		}
    }
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
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


class VideoPostsContainer extends Component{
	constructor(props){
		super(props);
		console.log(props);
		this.state={
			videos:[],
			firstVideo:{},
			isLoading:true
		}
	}
	
	displayPostModal=(profileAction,companyAction,data,postsConsumer)=>{
		if(profileAction==null)
			companyAction.handleVideoPostModal(data,postsConsumer);
		else
			profileAction.handleVideoPostModal(data,postsConsumer);
	}

	
	render(){
		return(
			<PostConsumer>
				{postsConsumer=>(
						<PostDisplayConsumer>
							{postDisplayModal=>(
								<CompanyPostDisplayConsumer>
									{companyPostDisplayModal=>(
										<Container>
											{this.props.isLoadingIndicatorVideos==true ? <p>We are currently getting the videos please wait </p>:
												<React.Fragment>
													{this.props.videos.videos.length==0 && this.props.videos.headerVideo==null? 
																					<NoPostsModal
																						id="noPostsModalContainer"
																						postType={"video"}
																						profilePageType={this.props.profile}
																					/>:
														<ul style={{padding:"0px"}}>
															{this.props.videos.headerVideo==null? <React.Fragment></React.Fragment>:
																<React.Fragment>
																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		<li onClick={()=>this.displayPostModal(
																											postDisplayModal,
																											companyPostDisplayModal,
																											this.props.videos.headerVideo,
																											postsConsumer)} 
																		style={{listStyle:"none"}}>
																				<CrownedVideo
																					headerVideo={this.props.videos.headerVideo}
																				/>
																		</li>
																	</a>
																	<hr/>
																</React.Fragment>
															}
						
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<li id="smallVideoParentContainer" style={{listStyle:"none",marginTop:"1%"}}>	
																	<ul style={{padding:"0px"}}>
																		{this.props.videos.videos.map(data=>
																			<li id="smallVideoLI" onClick={()=>this.displayPostModal(
																									postDisplayModal,
																									companyPostDisplayModal,
																									data,
																									postsConsumer)} 
																			style={{width:"20%",listStyle:"none",display:"inline-block",marginRight:"100px",marginLeft:"2%"}}>
																					<SmallVideoContainer
																						video={data}
																					/>
																			</li>
																		)}
																	</ul>
																</li>
															</a>
															{postsConsumer.endOfPostsDBIndicator==false && (
																<React.Fragment>
																	{postsConsumer.isLoadingReloadedPosts==true?
																		 <Typed 
														                    strings={['Loading...']} 
														                    typeSpeed={60} 
														                    backSpeed={30} 
												                		  />:
																		<p onClick={()=>postsConsumer.fetchNextPosts()} style={NextPostLabelCSS}>
																			Next Page
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
							</CompanyPostDisplayConsumer>
						)}
					</PostDisplayConsumer>
				)}
			</PostConsumer>
		)
	}
}

export default VideoPostsContainer;