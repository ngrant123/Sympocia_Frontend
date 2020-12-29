import React,{useState} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../../HomePageSet/VideoHomeDisplayPortal.js";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";

import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {DisplayRecruitButton} from "./ImagePostsModal.js";
import {Link} from "react-router-dom";
import {ConstructSuggestedSymposium} from "./ConstructSuggestedSymposium.js";

const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:row;
	@media screen and (max-width:740/px) and (max-height:420px){
    	#headerLI{
			height:180% !important;
		}
		#headerVideoLI{
			height:95% !important;
		}
    }


	@media screen and (max-width:1370px){
		width:120%;
		flex-direction:column;
		margin-left:-5% !important;
			#headerVideoLI{
			height:95% !important;
			width:100% !important;
		}
		#headerLI{
			display:block !important;
			margin-top:10% !important;
			width:95% !important;
		}
		#smallPostLI{
			width:95% !important;
			margin-left:-5% !important;
		}
		#video{
			width:330px !important;
			height:370px !important;
	
			margin-right:2%;
		}
		#suggestedSymposiumLI{
			top:-15% !important;
			width:120% !important;
		}
		#postLI{
			margin-right:2% !important;
		}
	}

	@media screen and (max-width:600px){
		#headerAudio{
			height:20px !important;
		}
	}
	@media screen and (max-width:450px){
		margin-left:-5% !important;
		#headerLI{
			margin-top:-25% !important;
		}
		#video{
			width:230px !important;
			height:160px !important;
		}
	}
`;

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
	@media screen and (max-width:1300px){
		width:330px !important;
			height:370px !important;
	}
	@media screen and (max-width:450px){
					width:230px !important;
			height:160px !important;
	}
`;



const ProfilePictureLink=styled(Link)`
	position:relative;
`;


const VideoDesriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:60px;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;

const HeaderContainer=styled.div`
	display:flex;
	width:60%;
	flex-direction:column;

	@media screen and (max-width:1370px){
		margin-top:30px !important;
		width:90%;
		#headerPostProfilePictureLIInformation{
			top:60% !important;
		}
	}

	@media screen and (max-width:600px){
		margin-top:-130px !important;
		#headerPostProfilePictureLIInformation{
			top:-30% !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:900px) and (orientation: landscape) {
		#headerPostProfilePictureLIInformation{
			top:110% !important;
		}
    }


	@media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:60px !important;
    	#headerPostProfilePictureLIInformation{
			top:160% !important;
		}
    }
`;

const HeaderDescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const HeaderTextsContainer=styled.div`
	display:flex;
	flex-direction:column;
`;

const SmallPostContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:50%;
	height:600px;
	overflow-y:scroll;
	margin-left:5%;
	flex-wrap: wrap;
	@media screen and (max-width:1370px){
		width:90%;
	}

	@media screen and (max-width:1024px) and (max-height:1366px) {
    	height:100%;
    }

	@media screen and (max-width:600px){
		margin-left:-5% !important;
		width:100% !important;
		margin-top:-5px;
		padding-top:70px;
		#smallAudioDescription{
			display:none !important;
		}
	}
`;

const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;

`;

const PostContainer=styled.div`
	margin-bottom:8%;
	width:70%;
	margin-right:8%;
`;

const ImageLabelCSS={
	listStyle:"none",
	height:"30%",
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
	console.log(headerVideo);
	const videos=props.posts.slice(1,props.posts.length);
	

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
	<Container>
		{headerVideo==null?
			<p> No video posts yet </p>:
				<React.Fragment>
					<HeaderContainer>

						<ul id="headerPostProfilePictureLIInformation"
							  style={{width:"90%",padding:"10px",zIndex:"8",position:"absolute",top:"60%"}}>
							<li style={{marginLeft:"1%",marginBottom:"1%",listStyle:"none"}}>
								<DisplayRecruitButton
									post={headerVideo}
									previousProps={props}
								/>
							</li>

							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<ProfilePictureLink to={{pathname:`/profile/${headerVideo.owner._id}`}}>
											{headerVideo.videoDescription==null?
												<img src={headerVideo.owner.profilePicture==null?NoProfilePicture:
													headerVideo.owner.profilePicture}
													style={{height:"50px",width:"60px",borderRadius:"50%"}}
												/>
												:<video width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
													<source src={headerVideo.videoDescription} type="video/mp4"/>
												</video>
											}
										</ProfilePictureLink>
									</li>
									<li style={{marginLeft:"2%",listStyle:"none",display:"inline-block"}}>
										<p style={{fontSize:"20px",color:"#FFFFFF"}}>
											<b>{headerVideo.owner.firstName}</b>
										</p>
									</li>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<audio id="headerAudio" style={{width:"200px"}} controls>
										  	<source src={headerVideo.audioDescription} type="audio/ogg"/>
										  	<source src={headerVideo.audioDescription} type="audio/mpeg"/>
											Your browser does not support the audio element.
										</audio>
									</li>
								</ul>
							</li>
						</ul>
						<video id="headerVideoLI" style={{cursor:"pointer",marginTop:"-5%"}} key={headerVideo.videoUrl} position="relative" height="80%" width="100%" autoplay>
							<source src={headerVideo.videoUrl} type="video/mp4"/>
						</video>
						<HeaderDescriptionContainer>
							<HeaderTextsContainer>
								<p style={{fontSize:"20px",maxWidth:"70%",maxHeight:"60px",overflow:"hidden"}}>
									<b>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
										incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
										exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
										dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
										Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
										anim id est laborum.
									</b>
								</p>
								<p style={{width:"70%",height:"60px",overflow:"hidden"}}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
									dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
									Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
									anim id est laborum.
								</p>
							</HeaderTextsContainer>

							<p style={ImageLabelCSS}>{headerVideo.industriesUploaded[0].industry}</p>

						</HeaderDescriptionContainer>


					</HeaderContainer>
					<SmallPostContainer>
						{videos.map(data=>
							<React.Fragment>
								{data.owner==null?
									<ConstructSuggestedSymposium
										personalInformation={personalInformationRedux}
										previousProps={props}
									/>
								:<PostContainer>
										<div id="videoContainer" onClick={()=>displayVideoModal(data)}style={{listStyle:"none",display:"inline-block",marginBottom:"1%",cursor:"pointer"}}>
												<video id="video" key={data.videoUrl} position="relative" height="290px" width="100%" autoplay>
													<source src={data.videoUrl} type="video/mp4"/>
												</video>
												<ul style={{padding:"0px",zIndex:"8",top:"-20%"}}>
													<li style={{listStyle:"none"}}>
														<DisplayRecruitButton
															post={data}
															previousProps={props}
														/>
													</li>
													<li id="smallAudioDescription" style={{listStyle:"none"}}>
														<audio style={{width:"150px",height:"25px"}} controls muted>
														  	<source src={data.audioDescription} type="audio/ogg"/>
														  	<source src={data.audioDescription} type="audio/mpeg"/>
															Your browser does not support the audio element.
														</audio>
													</li>
												</ul>
										</div>
										<DescriptionContainer>
											<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
												{data.videoDescription==null?
													<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
														 style={{height:"50px",width:"60px",borderRadius:"50%"}}
													/>
													:<video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
														<source src={data.videoDescription} type="video/mp4"/>
													</video>
												}
											</ProfilePictureLink>
											<HeaderTextsContainer>
												<p style={{fontSize:"20px",maxWidth:"100%",maxHeight:"60px",overflow:"hidden"}}>
													<b>
														Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
														incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
														exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
														dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
														Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
														anim id est laborum.
													</b>
												</p>
												<p style={{width:"70%",height:"60px",overflow:"hidden"}}>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
													incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
													exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
													dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
													Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
													anim id est laborum.
												</p>
											</HeaderTextsContainer>
										</DescriptionContainer>
								</PostContainer>
							}	
							</React.Fragment>
						)}
					</SmallPostContainer>
































				{/*
					<li id="headerLI" style={{position:"relative",top:"-70px",listStyle:"none",display:"inline-block",width:"50%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px",zIndex:"8",marginBottom:"1%"}}>
									{headerVideo.videoDescription!=null?
										<li style={{listStyle:"none",display:"inline-block",marginRight:"4%"}}>
											<VideoDesriptionContainer>
												   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true">
														<source src={headerVideo.videoDescription} type="video/mp4"/>
													</video>
											</VideoDesriptionContainer>
										</li>:null
									}
									
									{headerVideo.audioDescription!=null?
										<li style={{llistStyle:"none",display:"inline-block"}}>
											<audio style={{width:"200px"}} controls>
											  	<source src={headerVideo.audioDescription} type="audio/ogg"/>
											  	<source src={headerVideo.audioDescription} type="audio/mpeg"/>
												Your browser does not support the audio element.
											</audio>
										</li>:null
									}
								</ul>
							</li>
							<li onClick={()=>handleDisplayHeaderVideo()} style={{listStyle:"none",width:"90%",borderRadius:"5px"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<video id="headerVideoLI" key={headerVideo.videoUrl} position="relative" height="80%" width="120%" autoplay>
										<source src={headerVideo.videoUrl} type="video/mp4"/>
									</video>
								</a>
							</li>
							<li style={{marginLeft:"20%",listStyle:"none",width:"80%"}}>
								<ul style={{padding:"0px"}}>	
									<li style={{position:"relative",listStyle:"none",display:"inline-block",width:"25%",top:"-20px"}}>
										<ul style={{padding:"0px"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li style={{position:"relative",listStyle:"none",width:"25%"}}>
													<ProfilePictureLink to={{pathname:`/profile/${headerVideo.owner._id}`}}>
														{headerVideo.owner.profilePicture!=null?
															<img src={headerVideo.owner.profilePicture} style={{height:"10%",width:"200%",borderRadius:"50%"}}/>:
															<img src={NoProfilePicture} style={{height:"10%",width:"200%",borderRadius:"50%"}}/>
														}
													</ProfilePictureLink>
												</li>
											</a>
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
															<DisplayRecruitButton
																post={headerVideo}
																previousProps={props}
															/>

															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,headerVideo.industriesUploaded,props)} style={ImageLabelCSS}>
																	{headerVideo.industriesUploaded[0].industry}
																</li>
															</a>	
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

					<li  id="smallPostLI" style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							{videos.map(data=>
								<React.Fragment>
									{data=="suggestedSymposium"?
										<li id="suggestedSymposiumLI" style={{listStyle:"none",display:"inline-block",position:"relative",top:"0px",marginBottom:"8%",width:"70%",marginRight:"4%"}}>
											{constructSuggestedSymposium(personalInformationRedux,props)}
										</li>
									:<li id="postLI" style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px",zIndex:"8",marginBottom:"1%"}}>
													{data.videoDescription!=null?
														<li style={{listStyle:"none",display:"inline-block",marginRight:"4%"}}>
															<VideoDesriptionContainer>
																   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true">
																		<source src={data.videoDescription} type="video/mp4"/>
																	</video>
															</VideoDesriptionContainer>
														</li>:null
													}
													
													{data.audioDescription!=null?
														<li style={{llistStyle:"none",display:"inline-block"}}>
															<audio style={{width:"200px"}} controls>
															  	<source src={data.audioDescription} type="audio/ogg"/>
															  	<source src={data.audioDescription} type="audio/mpeg"/>
																Your browser does not support the audio element.
															</audio>
														</li>:null
													}
												</ul>
											</li>
											<li onClick={()=>displayVideoModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
												<ShadowContainer/>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<video id="video" key={data.videoUrl} position="relative" height="290px" width="580px" autoplay>
														<source src={data.videoUrl} type="video/mp4"/>
													</video>
												</a>
											</li>
											<li style={{listStyle:"none",marginBottom:"1%",width:"170%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{marginLeft:"20%",marginRight:"3%",listStyle:"none",display:"inline-block",width:"25%"}}>
														<ul style={{padding:"0px"}}>
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<li style={{listStyle:"none",marginBottom:"2%"}}>
																	<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
																		{data.owner.profilePicture!=null?
																			<img src={data.owner.profilePicture} style={{height:"10%",width:"40%",borderRadius:"50%"}}/>:
																			<img src={NoProfilePicture} style={{height:"10%",width:"40%",borderRadius:"50%"}}/>
																		}
																	</ProfilePictureLink>
																</li>
															</a>
															<li style={{listStyle:"none"}}>
																<b>
																	{data.owner.firstName}
																</b>
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
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} style={ImageLabelCSS}>
																	{data.industriesUploaded[0].industry}
																</li>
															</a>
															<DisplayRecruitButton
																post={data}
																previousProps={props}
															/>
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


				*/}

				{displayVideoDisplayPortal==false?
					null:
					<VideoPostDisplayPortal
						closeModal={closeModal}
						selectedVideo={selectedVideo}
						recommendedVideos={displayRecommendedVideos}
						targetDom={props.targetDom}
					/>
				}
			</React.Fragment>
		}
		</Container>
	)
}

export default VideoPostModal;