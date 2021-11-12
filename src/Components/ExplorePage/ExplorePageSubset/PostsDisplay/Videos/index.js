import React,{useState,useMemo,useEffect} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../../ExplorePageSet/Modals-Portals/VideoHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import ConstructSuggestedSymposium from "../../ConstructSuggestedSymposium.js";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Header from "./Header.js";
import Posts from "./Posts.js";

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

const NextButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"10%"
}


const VideoPostModal=(props)=>{
	console.log(props.posts);
	const isMobileUI=props.isMobileUI;

	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);

	const [displayVideoDisplayPortal,changeVideoDisplay]=useState(false);
	const [selectedVideo,changeSelectedVideo]=useState();
	const [displayRecommendedVideos,changeRecommendedVideos]=useState();
	const [headerPosts,changeHeaderPosts]=useState([]);
	const [videos,changeVideos]=useState([]);
	const [firstIndicator,changeFirstIndicator]=useState(false);
	const [isInitializing,changeInitializingStatus]=useState(false);

	useEffect(()=>{
		if(firstIndicator==false){
			const splicedHeaderPosts=props.posts.slice(0,3);
			const splicedVideos=props.posts.slice(3,props.posts.length);

			changeHeaderPosts([...splicedHeaderPosts]);
			changeVideos([...splicedVideos])
			changeInitializingStatus(true);
		}else{
			const currentVideos=videos;
			const updatedVideos=currentVideos.concat(props.posts);
			changeVideos([...updatedVideos])
			changeInitializingStatus(false);	
		}
	},[props.posts]);

	const closeModal=()=>{
		changeVideoDisplay(false)
	}

	const displayVideoModal=(data)=>{
		changeSelectedVideo(data);
		changeRecommendedVideos(videos);
		changeVideoDisplay(true);
	}

	const posts=()=>{
		return(
			<React.Fragment>
				<Header
					posts={headerPosts}
					targetDom={props.targetDom}
					isSymposiumPostUI={props.isSymposiumPostUI}
				/>
				<hr style={PostsHorizontalLineCSS}/>
				<Posts
					posts={videos}
					targetDom={props.targetDom}
					isSymposiumPostUI={props.isSymposiumPostUI}
				/>

				{props.endOfPostsDBIndicator==false && (
					<React.Fragment>
						{props.isLoadingReloadedPosts==true?
							<p>Loading please wait...</p>:
							<p id="nextButton" onClick={()=>props.triggerReloadingPostsHandle("Videos")} 
								style={NextButtonCSS}>
								Next
							</p>
						}
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	return(
	<Container>
		{isInitializing==true &&(
			<>{posts()}</>
		)}

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