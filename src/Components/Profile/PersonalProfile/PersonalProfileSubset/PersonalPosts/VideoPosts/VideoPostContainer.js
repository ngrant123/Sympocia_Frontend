import React,{Component} from "react";
import styled from "styled-components";
import SmallVideoContainer from "./SmallVideos.js";
import {getVideosFromUser} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getCompanyVideos} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import {UserConsumer} from "../../../UserContext.js";
import NoPostsModal from "../NoPostsModal.js";
import {VideoPostProvider} from "./VideoPostContext.js";

import {PostDisplayConsumer} from "../../../PostDisplayModalContext.js";
import {CompanyPostDisplayConsumer} from "../../../../CompanyProfile/CompanyProfilePostsDisplayContext.js";
import CrownedVideo from "./CrownedVideoContainer.js";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:125%;
	overflow-y:scroll;
	padding:10px;
	padding-right:20px;
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


class VideoPostsContainer extends Component{
	constructor(props){
		super(props);
		console.log(props);
		this.state={
			videos:[
				{},{},{},{},{},{}
			],
			firstVideo:{},
			isLoading:true
		}
	}
	
	displayPostModal=(profileAction,companyAction,data)=>{
		debugger;
		if(profileAction==null)
			companyAction.handleVideoPostModal(data);
		else
			profileAction.handleVideoPostModal(data);
	}

	
	render(){
		return(
			<PostDisplayConsumer>
				{postDisplayModal=>(
					<CompanyPostDisplayConsumer>
						{companyPostDisplayModal=>(
							<Container>
								{this.props.isLoadingIndicatorVideos==true ? <p>We are currently getting the videos please wait </p>:
									<React.Fragment>
										{this.props.videos.length==0 && this.props.videos.headerVideo==null? <NoPostsModal
																			postType={"video"}
																			profilePageType={this.props.profile}
																		/>:
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none"}}>
													{this.props.videos.headerVideo==null? <React.Fragment></React.Fragment>:
														<CrownedVideo
															headerVideo={this.props.videos.headerVideo}
														/>
													}
												</li>
			
												<li style={{listStyle:"none",marginTop:"1%"}}>	
													<ul style={{padding:"0px"}}>
														{this.props.videos.videos.map(data=>
															<li onClick={()=>this.displayPostModal(postDisplayModal,companyPostDisplayModal,data)} style={{listStyle:"none",display:"inline-block",marginRight:"1%",marginBottom:"-10%"}}>
																<a href="javscript:;" style={{textDecoration:"none"}}>
																	<SmallVideoContainer
																		video={data}
																	/>
																</a>
															</li>
														)}
													</ul>
												</li>
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
		)
	}
}

export default VideoPostsContainer;