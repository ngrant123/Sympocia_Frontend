import React,{Component} from "react";
import styled from "styled-components";
import SmallVideoContainer from "./SmallVideos.js";
import {getVideosFromUser} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getCompanyVideos} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import {UserConsumer} from "../../../UserContext.js";
import NoPostsModal from "../NoPostsModal.js";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:125%;
	overflow-y:scroll;
	padding:10px;
	padding-right:20px;
`;

const ThumbnailVideoComponent=styled.div`
	position:relative;
	width:100%;
	height:45%;
	overflow:hidden;
`;
const ThumbnailVideo=styled.div`
	position:relative;
	width:450px;
	height:100%;
	background-color:blue;
	border-radius:5px;
`;

const Description=styled.div`
	position:absolute;
	width:85%;
	height:240%;
	overflow:hidden;
	color:#767677;

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
		this.state={
			videos:[
				{},{},{},{},{},{}
			],
			firstVideo:{},
			isLoading:true
		}
	}

	async componentDidMount(){
		console.log("Testing video api call");
		if(this.props.profile=="Personal"){
			const {headerVideo,videos}=await getVideosFromUser(this.props.id);
			this.setState({
				headerVideo:headerVideo,
				videos:videos,
				isLoading:false
			})
		}else{	
			const {headerVideo,videoPosts}=await getCompanyVideos(this.props.id);
			debugger;
			this.setState({
				headerVideo:headerVideo,
				videos:videoPosts,
				isLoading:false
			})

		}
	}

	
	render(){
		return(

			<Container>
				{this.state.isLoading==true ? <p>We are currently getting the videos please wait </p>:
					<React.Fragment>
						{this.state.videos.length==0? <NoPostsModal
															postType={"video"}
															profilePageType={this.props.profile}
														/>:
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									{this.state.headerVideo==null? <React.Fragment></React.Fragment>:
										<ThumbnailVideoComponent>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
													<ThumbnailVideo>
														<video width="100%" height="100%" controls autoplay>
															<source src={this.state.headerVideo.videoUrl} type="video/mp4"/>
														</video>
													</ThumbnailVideo>
												</li>

												<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block"}}>
													<ul style={{paddging:"0px"}}>
														<li style={{marginBottom:"5px",listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
															{this.state.headerVideo.industry}
														</li>
														<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px"}}>
															<b>{this.state.headerVideo.title}</b>
														</li>

														<li style={{listStyle:"none",marginBottom:"5px"}}>
															<ul style={{padding:"0px",color:"#a6a6a7"}}>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
																	{this.state.headerVideo.views} views
																</li>

																<li style={{listStyle:"none",display:"inline-block"}}>
																	{this.state.headerVideo.datePosted} days ago
																</li>

															</ul>

														</li>

														<li style={{listStyle:"none"}}>
															<Description>
																{this.state.headerVideo.description}
															</Description>

														</li>
													</ul>
												</li>
											</ul>
										</ThumbnailVideoComponent>
									}
								</li>

								<li style={{listStyle:"none",marginTop:"5%"}}>	
									<ul style={{padding:"0px"}}>
										{this.state.videos.map(data=>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"1%",marginBottom:"9%"}}>
												<SmallVideoContainer
													video={data}
												/>
											</li>
										)}
									</ul>
								</li>
							}
						</ul>
						}
					</React.Fragment>
				}
			</Container>


		)
	}
}

export default VideoPostsContainer;