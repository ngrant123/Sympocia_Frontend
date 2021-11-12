import React,{useState,useEffect} from "react";
import styled,{keyframes,css} from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {SmallProfilePictureAndVideoDescription} from "../../../ExplorePage/ExplorePageSubset/PostsDisplay/PostDisplayGeneralComp.js";
import {Link} from "react-router-dom";
import VideoPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/Modals-Portals/VideoHomeDisplayPortal.js";
import AdIndicator from "../AdIndicator.js";


const ProfilePictureLink=styled(Link)`
	position:relative;
	margin-bottom:1%;
`;

const glowing=keyframes`
      0% { border-color: #D6C5F4; box-shadow: 0 0 10px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0px 0px 10px 5px #FFF52C; }
      100% { border-color: #B693F7; box-shadow: 0 0 10px #C8B0F4; }
`;


const Container=styled.div`
	border-radius:5px;
	${({swimmingStatus})=>
		swimmingStatus==true &&(
			css`
				animation: ${glowing} 1300ms infinite;
			`
		)
	}
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
	const [swimmingStatus,changeSwimmingStatus]=useState(false);

	useEffect(()=>{
		const {industriesUploaded}=videoInformation;
		for(var i=0;i<industriesUploaded.length;i++){
			if(industriesUploaded[i].isSwimmingTriggeredForPost==true){
				changeSwimmingStatus(true);
				break;
			}
		}
	},[]);

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
				<Container swimmingStatus={swimmingStatus} style={{height:"90%"}}>
					<video onClick={()=>displayVideoModal(videoInformation)} 
						style={{borderRadius:"5px",backgroundColor:"#151515",position:"absolute",cursor:"pointer"}}
						 position="relative" height="90%" width="100%" borderRadius="50%"
					 	key={videoInformation.videoUrl} autoPlay loop autoBuffer muted playsInline>
						<source src={videoInformation.videoUrl} type="video/mp4"/>
					</video>
				</Container>
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
					<div style={{marginTop:"130%"}}>
						<AdIndicator
							postData={videoInformation}
						/>
					</div>
				</div>
			</div>

			<p id="videoTitle" style={{fontSize:"15px",maxWidth:"100%",maxHeight:"60px",overflow:"hidden"}}>
				<b>{videoInformation.title}</b>
			</p>
		</React.Fragment>
	)
}


export default SymposiumAndExplorePageDisplay;