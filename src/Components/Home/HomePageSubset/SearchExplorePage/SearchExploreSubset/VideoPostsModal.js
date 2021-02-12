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
		width:100%;
		flex-direction:column;
		margin-left:-5% !important;

		#symposiumText{
			display:none !important;
		}
		#headerVideoLI{
			height:80% !important;
			width:80% !important;
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
	}

	@media screen and (max-width:600px){
		#headerAudio{
			height:20px !important;
		}
	}
	@media screen and (max-width:450px){
		margin-left:-5% !important;
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
	overflow:hidden;
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
	flex-direction:column; 
	width:50%;
	height:600px;
	margin-left:5%;
	overflow:scroll;
	@media screen and (max-width:1370px){
		width:90%;
		overflow:visible !important;
	}
	@media screen and (max-width:1024px) and (max-height:1366px) {
    	height:100%;
    }

	@media screen and (max-width:600px){
		width:100% !important;
		#smallAudioDescription{
			display:none !important;
		}
	}
`;

const HeaderOwnerInformation=styled.div`
	display:flex;
	flex-direction:row;
`;

const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;

`;

const PostContainer=styled.div`
	margin-bottom:8%;
	width:35%;
	margin-right:8%;
`;

const ImageLabelCSS={
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
	  cursor:"pointer",
	  width:"90%"
}

const NextButtonCSS={
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	color:"#3898ec",
	height:"70px",
	width:"30%",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
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
		const video=document.getElementById("video");
		video.pause();
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
						<HeaderOwnerInformation>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<ProfilePictureLink to={{pathname:`/profile/${headerVideo.owner._id}`}}>
									{headerVideo.videoDescription==null?
										<img src={headerVideo.owner.profilePicture==null?NoProfilePicture:
											headerVideo.owner.profilePicture}
											style={{height:"50px",width:"60px",borderRadius:"50%"}}
										/>
										:<video style={{borderRadius:"50%"}} width="50px" height="60px" borderRadius="50%" autoplay="true" muted>
											<source src={headerVideo.videoDescription} type="video/mp4"/>
										</video>
									}
								</ProfilePictureLink>
							</li>
								<p style={{fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",marginRight:"5%"}}>
									{headerVideo.owner.firstName}
								</p>

							{props.isGuestProfileIndicator==false &&(
								<li style={{marginLeft:"1%",marginBottom:"1%",listStyle:"none"}}>
									<DisplayRecruitButton
										post={headerVideo}
										previousProps={props}
										personalInformationRedux={personalInformationRedux}
									/>
								</li>
							)}
							{headerVideo.audioDescription!=null &&(
								<li style={{listStyle:"none",display:"inline-block"}}>
									<audio id="headerAudio" style={{width:"200px"}} controls>
									  	<source src={headerVideo.audioDescription} type="audio/ogg"/>
									  	<source src={headerVideo.audioDescription} type="audio/mpeg"/>
										Your browser does not support the audio element.
									</audio>
								</li>
							)}
						</HeaderOwnerInformation>

						<video id="headerVideoLI" style={{cursor:"pointer"}} width="80%" height="100%" borderRadius="50%"
						 key={headerVideo.videoUrl} autoPlay loop autoBuffer muted playsInline onClick={()=>handleDisplayHeaderVideo()}>
							<source src={headerVideo.videoUrl} type="video/mp4"/>
						</video>
						<HeaderDescriptionContainer>
							<HeaderTextsContainer>
								<p style={{fontSize:"20px",maxWidth:"70%",maxHeight:"60px",overflow:"hidden"}}>
									<b>
										{headerVideo.title}
									</b>
								</p>
								<p style={{width:"70%",height:"60px",overflow:"hidden"}}>
									{headerVideo.description}
								</p>
							</HeaderTextsContainer>
							<p id="symposiumText" style={ImageLabelCSS}>
								{headerVideo.industriesUploaded[0].industry}
							</p>
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
										<div onClick={()=>displayVideoModal(data)} style={{listStyle:"none",cursor:"pointer"}}>	
											<video id="video" height="290px" width="160%"  borderRadius="50%"
											 key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
												<source src={data.videoUrl} type="video/mp4"/>
										</video>
										<ul style={{padding:"0px",zIndex:"8"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
												<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
													{data.videoDescription==null?
														<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
															 style={{height:"50px",width:"60px",borderRadius:"50%"}}
														/>
														:<video style={{borderRadius:"50%"}} width="60px" height="50px" borderRadius="50%" autoplay="true" controls muted>
															<source src={data.videoDescription} type="video/mp4"/>
														</video>
													}
												</ProfilePictureLink>
											</li>
											{props.isGuestProfileIndicator==false &&(
												<li style={{listStyle:"none",display:"inline-block"}}>
													<DisplayRecruitButton
														post={data}
														previousProps={props}
														personalInformationRedux={personalInformationRedux}
													/>
												</li>
											)}
											{data.audioDescription!=null &&(
												<li id="smallAudioDescription" style={{listStyle:"none"}}>
													<audio style={{width:"150px",height:"25px"}} controls muted>
													  	<source src={data.audioDescription} type="audio/ogg"/>
													  	<source src={data.audioDescription} type="audio/mpeg"/>
														Your browser does not support the audio element.
													</audio>
												</li>
											)}
										</ul>
									</div>
									<DescriptionContainer>
										<HeaderTextsContainer>
											<p style={{fontSize:"20px",maxWidth:"100%",maxHeight:"60px",overflow:"hidden"}}>
												<b>
													{data.title}
												</b>
											</p>
											<p style={{width:"70%",maxWidth:"100%",height:"60px",overflow:"hidden"}}>
												{data.description}
											</p>
										</HeaderTextsContainer>
									</DescriptionContainer>
								</PostContainer>
							}	
							</React.Fragment>
						)}
						{props.endOfPostsDBIndicator==false && (
							<React.Fragment>
								{props.isLoadingReloadedPosts==true?
									<p>Loading please wait...</p>:
									<p onClick={()=>props.triggerReloadingPostsHandle("Videos")} style={NextButtonCSS}>
										Next 
									</p>
								}
							</React.Fragment>
						)}
					</SmallPostContainer>

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