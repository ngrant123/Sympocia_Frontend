import React,{useState} from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {SmallProfilePictureAndVideoDescription} from "../../../ExplorePage/ExplorePageSubset/PostsDisplay/PostDisplayGeneralComp.js";
import {Link} from "react-router-dom";
import VideoPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/Modals-Portals/VideoHomeDisplayPortal.js";

const ProfilePictureLink=styled(Link)`
	position:relative;
	margin-bottom:1%;
`;


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

const SymposiumAndExplorePageDisplay=({videoInformation,targetDom})=>{
	const [selectedVideo,changeSelectedVideo]=useState();
	const [displayVideoDisplayPortal,changeVideoDisplay]=useState(false);

	const closeModal=()=>{
		changeVideoDisplay(false)
	}
	const displayVideoModal=(data)=>{
		changeSelectedVideo(data);
		changeVideoDisplay(true);
	}
	return(
		<React.Fragment>
			{displayVideoDisplayPortal==true &&(
				<VideoPostDisplayPortal
					closeModal={closeModal}
					selectedVideo={selectedVideo}
					recommendedVideos={[]}
					targetDom={targetDom}
				/>
			)}
			<div id="video" style={{height:"185px",width:"263px",position:"relative"}}>
				<video onClick={()=>displayVideoModal(videoInformation)} 
					style={{borderRadius:"5px",backgroundColor:"#151515",position:"absolute",cursor:"pointer"}}
					 position="relative" height="90%" width="100%" borderRadius="50%"
				 	key={videoInformation.videoUrl} autoPlay loop autoBuffer muted playsInline>
					<source src={videoInformation.videoUrl} type="video/mp4"/>
				</video>
				<div style={{position:"absolute",display:"flex",flexDirection:"column",top:"5%",left:"75%"}}>
					<ProfilePictureLink to={{pathname:`/profile/${videoInformation.owner._id}`}}>
						<SmallProfilePictureAndVideoDescription
							postData={videoInformation}
						/>
					</ProfilePictureLink>
					<div id="smallImageArrowDownCSS" style={SmallImageArrowDownCSS}>
						<KeyboardArrowDownIcon
							style={{color:"#FFFFFF"}}
						/>
					</div>
				</div>
			</div>
			<p id="videoTitle" style={{fontSize:"15px",maxWidth:"100%",maxHeight:"60px",overflow:"hidden"}}>
				<b>
					{videoInformation.title}
				</b>
			</p>
		</React.Fragment>
	)
}


export default SymposiumAndExplorePageDisplay;