import React,{useState,useMemo} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../../ExplorePageSet/Modals-Portals/VideoHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {
	ConstructSuggestedSymposium
} from "../ConstructSuggestedSymposium.js";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
	HeaderOwnerAndSymposiumInformation,
	SmallProfilePictureAndVideoDescription
} from "../PostDisplayGeneralComp.js";
import ExploreVideoDisplay from "../../../../GeneralComponents/PostComponent/VideoComponent/SymposiumAndExplorePageVideo.js";

import {
	Container,
	HeaderVideo,
	VideosContainer,
	ShadowContainer,
	ProfilePictureLink,
	VideoDesriptionContainer,
	HeaderContainer,
	HeaderDescriptionContainer,
	HeaderTextsContainer,
	SmallPostContainer,
	HeaderOwnerInformation,
	DescriptionContainer,
	PostContainer,
	PostUserAndSymposiumInformation
} from "./VideoPostCSS.js";

const HeaderArrowDownCSS={
	borderRadius:"50%",
	display:"flex",
	justifyContent:"center",
	padding:"5px",
	width:"30px",
	marginLeft:"40%",
	height:"25px",
	marginTop:"2%",
	boxShadow:"1px 1px 10px #707070"
}
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

const SmallImageArrowDownCSS={
	borderRadius:"50%",
	display:"flex",
	justifyContent:"center",
	backgroundColor:"#7A7A7A",
	padding:"5px",
	width:"30px",
	height:"25px",
	marginTop:"15%",
	marginLeft:"15%"
}

const ProfileProfileCSS={
	height:"40px",
	width:"45px",
	borderRadius:"50%",
	borderStyle:"solid",
	borderColor:"white",
	borderWidth:"5px"
}

const PostsHorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const VideoPostModal=(props)=>{
	const headerVideo=props.posts[0];
	const videos=props.posts.slice(1,props.posts.length);
	const isMobileUI=props.isMobileUI;

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

	const smallVideoComponent=(data)=>{
		return(
			<React.Fragment>
				{data.owner==null?
					<ConstructSuggestedSymposium
						personalInformation={personalInformationRedux}
						previousProps={props}
						currentHeight={"30%"}
					/>:
					<PostContainer>
						<div id="video" style={{height:"185px",width:"263px",position:"relative"}}>
							<video onClick={()=>displayVideoModal(data)} 
								style={{borderRadius:"5px",backgroundColor:"#151515",position:"absolute",cursor:"pointer"}}
								 position="relative" height="90%" width="100%" borderRadius="50%"
							 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
								<source src={data.videoUrl} type="video/mp4"/>
							</video>
							<div style={{position:"absolute",display:"flex",flexDirection:"column",top:"5%",left:"75%"}}>
								<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
									<SmallProfilePictureAndVideoDescription
										postData={data}
									/>
								</ProfilePictureLink>
								<div id="smallImageArrowDownCSS" style={SmallImageArrowDownCSS}>
									<KeyboardArrowDownIcon
										style={{color:"#FFFFFF"}}
									/>
								</div>
							</div>
						</div>
						<p style={{fontSize:"15px",maxWidth:"100%",maxHeight:"60px",overflow:"hidden"}}>
							<b>
								{data.title}
							</b>
						</p>
					</PostContainer>
				}
			</React.Fragment>
		)
	}

	const postDisplaySystem=()=>{
		const components=[];
		let counter=0;

		while(counter<videos.length){
			if(counter%2==0 && counter>0 && isMobileUI==false){
				const horizontalLine=<hr style={PostsHorizontalLineCSS}/>;
				components.push(horizontalLine);
			}
			const component=smallVideoComponent(videos[counter]);
			components.push(component)
			counter++;
		}
		return(
			<React.Fragment>
				{components.map(data=>
					<>{data}</>
				)}
			</React.Fragment>
		)
	}

	const posts=useMemo(()=>{
		return(
			<React.Fragment>
				{headerVideo==null?
					<p> No video posts yet </p>:
						<React.Fragment>
							<HeaderContainer>
								<HeaderOwnerAndSymposiumInformation
									headerPost={headerVideo}
									displayPostTrigger={handleDisplayHeaderVideo}
								/>
								<div id="headerVideoLI" style={{height:"264px",width:"464px",position:"relative"}}>
									<video id="headerVideoContainer" style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer",position:"absolute"}} height="100%" width="90%" borderRadius="50%"
									 key={headerVideo.videoUrl} autoPlay loop autoBuffer muted playsInline onClick={()=>handleDisplayHeaderVideo()}>
										<source src={headerVideo.videoUrl} type="video/mp4"/>
									</video>
									{headerVideo.videoDescription!=null &&(
										<video id="videoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
											style={{position:"absolute",top:"72%",left:"0%",borderRadius:"50%",width:"90px",height:"80px",
													backgroundColor:"#151515",
													borderStyle:"solid",
													borderColor:"white",
													borderWidth:"5px"}} width="200px" height="60%">
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
								{postDisplaySystem()}
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
						</React.Fragment>
				}
			</React.Fragment>
		)
	},[props.posts.length,props.isLoadingReloadedPosts,props.endOfPostsDBIndicator]);

	return(
	<Container>
		{posts}
		{displayVideoDisplayPortal==false?
			null:
			<VideoPostDisplayPortal
				closeModal={closeModal}
				selectedVideo={selectedVideo}
				recommendedVideos={displayRecommendedVideos}
				targetDom={props.targetDom}
			/>
		}
	</Container>
	)
}

export default VideoPostModal;