import React,{useState} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/VideoHomeDisplayPortal.js";
import {PopularVideosContainer} from "../indexCSS.js";

const BackgroundModalContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;


const PopularVideosListCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"20px",
	marginBottom:"10px",
	overflow:"hidden",
	cursor:"pointer"
}


const PopularVideosModal=({popularVideos,changeState,displayPopularVideos})=>{
	const [selectedVideo,changeSelectedVideo]=useState();
	const [displayVideoDisplayPortal,changeDisplayVideoPortal]=useState(false);

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const displayVideo=(data)=>{
		changeSelectedVideo(data);
		changeDisplayVideoPortal(true);
	}

	const closeModal=()=>{
		changeDisplayVideoPortal(false);
	}

	return(
		<React.Fragment>
			{displayPopularVideos==true &&(
				<React.Fragment>
					<PopularVideosContainer>
						{displayVideoDisplayPortal==true &&(
							<VideoPostDisplayPortal
								closeModal={closeModal}
								selectedVideo={selectedVideo}
								recommendedVideos={[]}
								targetDom="extendedSymposiumContainer"
							/>
						)}
						
						<ul style={{padding:"10px"}}>
							{popularVideos.map(data=>
								<>
									{data!=null &&(
										<li onClick={()=>displayVideo(data)} style={PopularVideosListCSS}>
											<video id="smallVideo" key={uuidv4()} borderRadius="5px"
											 	position="relative" height="200px" width="300px"
											 	autoPlay loop autoBuffer muted playsInline>
												<source src={data.videoUrl} type="video/mp4"/>
											</video>
										</li>
									)}
								</>
							)}
						</ul>
					</PopularVideosContainer>
					<BackgroundModalContainer style={{zIndex:"39"}}onClick={()=>changeState.setState({displayPopularVideos:false})}/>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}
export default PopularVideosModal;