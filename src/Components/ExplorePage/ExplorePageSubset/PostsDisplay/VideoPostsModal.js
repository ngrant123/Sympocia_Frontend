import React,{useState} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../ExplorePageSet/VideoHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";

const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:row;

	@media screen and (max-width:1370px){
		width:100%;
		flex-direction:column;
		margin-left:-5% !important;

		#symposiumText{
			display:none !important;
		}
		#headerVideoLI{
			height:600px !important;
			width:750px !important;
		}
		#smallPostLI{
			width:95% !important;
			margin-left:-5% !important;
		}
		#horizontalSeperator{
			display:block !important;
		}
	}

	@media screen and (max-width:650px){
		#headerAudio{
			height:20px !important;
		}
		
		#headerVideoLI{
			height:200px !important;
			width:300px !important;
		}
	}
	@media screen and (max-width:450px){
		margin-left:-5% !important;
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
		#videoDescriptionContainer{
			top:25% !important;
			left:0% !important;
		}
	}


	@media screen and (max-width:650px){
		margin-top:-130px !important;
		#headerPostProfilePictureLIInformation{
			top:-30% !important;
		}
		#videoDescriptionContainer{
			top:25% !important;
			left:0% !important;
			width:100px !important;
			height:40% !important;
		}
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:60px !important;
    	#headerPostProfilePictureLIInformation{
			top:160% !important;
		}
		#headerVideoLI{
			height:400px !important;
			width:450px !important;
		}
		#videoDescriptionContainer{
			top:20% !important;
		}
		#headerVideoContainer{
			position:relative !important;
		}
    }
`;

const HeaderDescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-top:1%;

	@media screen and (max-width:650px){
		#headerDescriptionParagraph{
			max-width:100% !important;
		}
		#heaerCaptionParagraph{
			width:100% !important;
		}
	}
`;

const HeaderTextsContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:2%;
`;

const SmallPostContainer=styled.div`
	display:flex;
	flex-direction:column; 
	width:50%;
	height:600px;
	margin-left:5%;
	overflow:scroll;
	@media screen and (max-width:1370px){
		overflow:visible !important;
		width:100%;
	}

	@media screen and (max-width:650px){
		margin-top:10%;
		margin-left:0%;

		#video{
			width:250px !important;
			height:150px !important;
		}
	}

`;

const HeaderOwnerInformation=styled.div`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		#ownerInformationDiv{
			width:100% !important;
		}
	}
	@media screen and (max-width:650px){
		flex-direction:column;
		#headerOwnerName{
			font-size:15px !important;
			max-width:90% !important;
		}
	}
`;

const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:200%;
`;

const PostContainer=styled.div`
	margin-bottom:8%;
	width:35%;
	margin-right:8%;

	@media screen and (max-width:1370px){
		#smallVideoDescriptionContainer{
			margin-left:5%;
		}
	}

	@media screen and (max-width:650px){
		#smallVideoDescriptionContainer{
			width:100px !important;
			height:40% !important;
			margin-left:5%;
			top:25% !important;
			left:0% !important;
		}
	}
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

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	display:"none"
}

const VideoPostModal=(props)=>{
	const headerVideo=props.posts[0];
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
						<HeaderOwnerInformation>
							<div id="ownerInformationDiv" style={{display:"flex",flexDirection:"row",width:"60%"}}>
								<ProfilePictureLink to={{pathname:`/profile/${headerVideo.owner._id}`}}>
									<img src={headerVideo.owner.profilePicture==null?NoProfilePicture:
										headerVideo.owner.profilePicture}
										style={{height:"50px",width:"60px",borderRadius:"50%"}}
									/>
								</ProfilePictureLink>
								<Link id="headerOwnerName" to={{pathname:`/profile/${headerVideo.owner._id}`}}
									style={{fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",marginRight:"5%"}}>
									<b>{headerVideo.owner.firstName}</b>
								</Link>
							</div>
							{headerVideo.audioDescription!=null &&(
								<audio id="headerAudio" style={{width:"200px",marginTop:"2%"}} controls>
								  	<source src={headerVideo.audioDescription} type="audio/ogg"/>
								  	<source src={headerVideo.audioDescription} type="audio/mp4"/>
									Your browser does not support the audio element.
								</audio>
							)}
						</HeaderOwnerInformation>
						<div id="headerVideoLI" style={{height:"400px",width:"100%",position:"relative"}}>
							<video id="headerVideoContainer" style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer",position:"absolute"}} height="100%" width="90%" borderRadius="50%"
							 key={headerVideo.videoUrl} autoPlay loop autoBuffer muted playsInline onClick={()=>handleDisplayHeaderVideo()}>
								<source src={headerVideo.videoUrl} type="video/mp4"/>
							</video>
							{headerVideo.videoDescription!=null &&(
								<video id="videoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
									style={{position:"absolute",top:"50px",left:"0%"}} width="200px" height="60%">
									<source src={headerVideo.videoDescription} type="video/mp4"/>
								</video>
							)}
						</div>

						<HeaderDescriptionContainer>
							<p id="headerDescriptionParagraph" style={{fontSize:"20px",maxWidth:"70%",maxHeight:"60px",overflow:"hidden"}}>
								<b>
									{headerVideo.title}
								</b>
							</p>
							<p id="heaerCaptionParagraph" style={{width:"70%",maxHeight:"60px",overflow:"hidden"}}>
								{headerVideo.description}
							</p>
						</HeaderDescriptionContainer>
					</HeaderContainer>

					<hr id="horizontalSeperator" style={HorizontalLineCSS}/>

					<SmallPostContainer>
						{videos.map(data=>
							<React.Fragment>
								{data.owner!=null &&(
									<PostContainer>
										{data.audioDescription!=null &&(
											<li id="smallAudioDescription" style={{listStyle:"none"}}>
												<audio style={{width:"150px",height:"25px"}} controls muted>
												  	<source src={data.audioDescription} type="audio/ogg"/>
												  	<source src={data.audioDescription} type="audio/mp4"/>
													Your browser does not support the audio element.
												</audio>
											</li>
										)}
										<div id="video" style={{height:"280px",width:"200%",position:"relative"}}>
											<video onClick={()=>displayVideoModal(data)} 
												style={{borderRadius:"5px",backgroundColor:"#151515",position:"absolute",cursor:"pointer"}}
												 position="relative" height="90%" width="100%" borderRadius="50%"
											 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
												<source src={data.videoUrl} type="video/mp4"/>
											</video>
											{data.videoDescription!=null &&(
												<video id="smallVideoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
													style={{position:"absolute",top:"50%",left:"5%"}} width="100px" height="40%">
													<source src={data.videoDescription} type="video/mp4"/>
												</video>
											)}
										</div>
										<DescriptionContainer>
											<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
												<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
													 style={{height:"50px",width:"60px",borderRadius:"50%"}}
												/>
											</ProfilePictureLink>
											<HeaderTextsContainer>
												<p style={{fontSize:"20px",maxWidth:"100%",maxHeight:"60px",overflow:"hidden"}}>
													<b>
														{data.title}
													</b>
												</p>
												<p style={{fontSize:"15px",width:"70%",maxWidth:"100%",height:"60px",overflow:"hidden"}}>
													{data.owner.firstName}
												</p>
											</HeaderTextsContainer>
										</DescriptionContainer>
									</PostContainer>
								)}
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