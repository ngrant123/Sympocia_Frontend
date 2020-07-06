import React,{useState} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../../HomePageSet/VideoHomeDisplayPortal.js";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";
import {displayPersonalIndustryFeed} from "./ImagePostsModal.js";
import {HomeConsumer} from "../../../HomeContext.js";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";

import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {displayRecruitButton} from "./ImagePostsModal.js";
import {Link} from "react-router-dom";

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



const ProfilePictureLink=styled(Link)`
	position:relative;
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
	console.log(props);
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

	const constructSuggestedSymposium=(personalInformation,homePageInformation)=>{
		debugger;
		console.log(personalInformation);
		const {personalInformationState}=personalInformation;
		var symposiumContainer=new Map();
		var selectedSymposiums=[];
			var counter=0;
			while(counter<3){   
				if(homePageInformation.isPersonalProfile==true){
					const randomNum=Math.floor(Math.random() * ((PERSONAL_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}else{
					const randomNum=Math.floor(Math.random() * ((COMPANY_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}
				counter++;
			}

			return <ul style={{padding:"0px",position:"relative"}}>
						{selectedSymposiums.map(data=>
							<a href="javascript:void(0);">
								<li onClick={()=>displayPersonalIndustryFeed(personalInformation,homePageInformation,data,selectedSymposiums)} style={{fontSize:"15px",color:"white",background:data.backgroundColor,padding:"20px",listStyle:"none",borderRadius:"5px",marginBottom:"5%"}}>
									<b>{data.industry}</b>
								</li>
							</a>
						)}
				   </ul>
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
															<li style={{position:"relative",listStyle:"none",display:"inline-block",width:"25%",top:"-20px"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{position:"relative",listStyle:"none",width:"25%"}}>
																		<ProfilePictureLink to={{pathname:`/profile/${headerVideo.owner._id}`}}>
																			{headerVideo.owner.profilePicture!=null?
																				<img src={headerVideo.owner.profilePicture} style={{height:"10%",width:"200%",borderRadius:"50%"}}/>:
																				<img src={NoProfilePicture} style={{height:"10%",width:"200%",borderRadius:"50%"}}/>
																			}
																		</ProfilePictureLink>
																		
																	</li>
																</ul>
															</li>
															<li style={{listStyle:"none",display:"inline-block",width:"60%"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none"}}>
																		<ul style={{padding:"0px"}}>
																			<li style={{listStyle:"none"}}>
																				<ul style={{padding:"0px"}}>
																					<li style={{listStyle:"none",fontSize:"15px",marginRight:"2%"}}>
																						<b> 
																							{headerVideo.title}
																						</b>
																					</li>
																					<li style={{listStyle:"none",width:"90%",height:"5%",overflow:"hidden",color:"#A4A4A4"}}>
																								{headerVideo.description}
																					</li>
																				</ul>
																			</li>
																			
																			<li style={{listStyle:"none"}}>
																				<ul style={{padding:"0px"}}>
																							<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"2%"}}>
																								{headerVideo.owner.firstName}
																							</li>
																							{displayRecruitButton(homePageInformation,headerVideo)}

																							<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,homePageInformation,null,headerVideo.industriesUploaded)} style={ImageLabelCSS}>
																								{headerVideo.industriesUploaded[0].industry}
																							</li>
																							
																				</ul>
																			</li>
																		</ul>
																	</li>
																</ul>
															</li>
														</ul>
													</li>
												</ul>
											</li>

											<li style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
												<ul style={{padding:"0px"}}>
													{videos.map(data=>
														<React.Fragment>
															{data=="suggestedSymposium"?
																<li style={{listStyle:"none",display:"inline-block",position:"relative",top:"0px",marginBottom:"8%",width:"70%",marginRight:"4%"}}>
																	{constructSuggestedSymposium(personalInformationRedux,homePageInformation)}
																</li>
															:<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
																<ul style={{padding:"0px"}}>
																	<li onClick={()=>displayVideoModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
																		<ShadowContainer/>
																		<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																			<video id="smallVideo" key={data.videoUrl} position="relative" height="290px" width="580px" controls autoplay>
																				<source src={data.videoUrl} type="video/mp4"/>
																			</video>
																		</a>
																	</li>
																	<li style={{listStyle:"none",marginBottom:"1%",width:"170%"}}>
																		<ul style={{padding:"0px"}}>
																			<li style={{marginRight:"3%",listStyle:"none",display:"inline-block",width:"25%"}}>
																				<ul style={{padding:"0px"}}>
																					<li style={{listStyle:"none",marginBottom:"2%"}}>
																						<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
																							{headerVideo.owner.profilePicture!=null?
																								<img src={data.owner.profilePicture} style={{height:"10%",width:"40%",borderRadius:"50%"}}/>:
																								<img src={NoProfilePicture} style={{height:"10%",width:"40%",borderRadius:"50%"}}/>
																							}
																						</ProfilePictureLink>
																					</li>
																					<li style={{listStyle:"none"}}>
																						<b>
																							{data.owner.firstName}
																						</b>
																						<AddCircleOutlineIcon/>
																					</li>
																				</ul>
																			</li>

																			<li style={{position:"relative",listStyle:"none",display:"inline-block",width:"50%",top:"-10px"}}>
																				<ul style={{padding:"0px"}}>
																					<li style={{listStyle:"none",width:"150%"}}>
																						<b> 
																							{data.title}
																						</b>
																					</li>
																					<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,homePageInformation,null,data.industriesUploaded)} style={ImageLabelCSS}>
																						{data.industriesUploaded[0].industry}
																					</li>
																				</ul>
																			</li>
																		</ul>
																	</li>
																</ul>
															</li>
														}	
														</React.Fragment>
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