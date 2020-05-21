import React,{useState} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../../HomePageSet/VideoHomeDisplayPortal.js";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";
import {displayPersonalIndustryFeed} from "./ImagePostsModal.js";
import {HomeConsumer} from "../../../HomeContext.js";

const HeaderVideo=styled.div`
	width:120%;
	height:80%;
	border-radius:5px;
	background-color:red;
	border-radius:5px;
`;

const VideosContainer=styled.div`
	position:relative;
	width:580px;
	height:290px;
	border-radius:5px;
	background-color:red;
`;

const ShadowContainer= styled.div`
	position:absolute;
	width:580px;
	height:290px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
`;

const ImageLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const VideoPostModal=(props)=>{

	const headerVideo=props.posts[0];
	const videos=props.posts.slice(1,props.posts.length);
	debugger;

		const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);

	const [displayVideoDisplayPortal,changeVideoDisplay]=useState(false);
	const [selectedVideo,changeSelectedVideo]=useState();
	const [displayRecommendedVideos,changeRecommendedVideos]=useState();


	const closeModal=()=>{
		changeVideoDisplay(false)
	}

	const handleDisplayHeaderVideo=()=>{
		changeSelectedVideo(headerVideo);
		changeRecommendedVideos(videos);
		changeVideoDisplay(true);
	}

	const displayVideoModal=(data)=>{
		changeSelectedVideo(data);
		changeRecommendedVideos(videos);
		changeVideoDisplay(true);
	}

	return(
		<HomeConsumer>
				{homePageInformation=>{
					return <React.Fragment>
								{headerVideo==null?
									<p> No video posts yet </p>:
										<React.Fragment>
											<li style={{listStyle:"none",display:"inline-block",width:"50%"}}>
												<ul style={{padding:"0px"}}>
													<li  onClick={()=>handleDisplayHeaderVideo()} style={{listStyle:"none",width:"90%",borderRadius:"5px"}}>
														<a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<video id="smallVideo" key={headerVideo.videoUrl} position="relative" height="80%" width="120%" controls autoplay>
																<source src={headerVideo.videoUrl} type="video/mp4"/>
															</video>
														</a>
													</li>
													<li style={{listStyle:"none",width:"80%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",fontSize:"15px",marginRight:"2%",width:"130%"}}>
																<b> 
																	{headerVideo.title}
																</b>
															</li>
															<li style={{listStyle:"none"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"10%"}}>
																		Nathan
																	</li>
																	<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,videos,homePageInformation,headerVideo)} style={ImageLabelCSS}>
																		{headerVideo.industriesUploaded[0].industry}
																	</li>

																	<li style={ImageLabelCSS}>
																		Follow
																	</li>
																</ul>
															</li>
														</ul>
													</li>
													<li style={{listStyle:"none",width:"90%",height:"10%",overflow:"hidden",color:"#A4A4A4"}}>
																{headerVideo.description}
													</li>
												</ul>
											</li>

											<li style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
												<ul style={{padding:"0px"}}>
													{videos.map(data=>
														<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
															<ul style={{padding:"0px"}}>
																<li onClick={()=>displayVideoModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
																	<ShadowContainer/>
																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		<video id="smallVideo" key={data.videoUrl} position="relative" height="290px" width="580px" controls autoplay>
																			<source src={data.videoUrl} type="video/mp4"/>
																		</video>
																	</a>
																</li>
																<li style={{listStyle:"none",marginBottom:"1%"}}>
																	<ul style={{padding:"0px"}}>
																		<li style={{listStyle:"none",width:"150%"}}>
																			<b> 
																				{data.title}
																			</b>
																		</li>
																		<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																			<b>{data.firstName}</b>
																		</li>

																		<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,videos,homePageInformation,headerVideo)} style={ImageLabelCSS}>
																			{data.industriesUploaded[0].industry}
																		</li>
																	</ul>
																</li>
															</ul>
														</li>
													)}
												</ul>
											</li>

											{displayVideoDisplayPortal==false?
												null:
												<VideoPostDisplayPortal
													closeModal={closeModal}
													selectedVideo={selectedVideo}
													recommendedVideos={displayRecommendedVideos}
												/>
											}
										</React.Fragment>
						}
					}
		</React.Fragment>
				}
			}
		</HomeConsumer>

	)
}

export default VideoPostModal;