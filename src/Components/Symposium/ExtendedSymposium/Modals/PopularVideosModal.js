import React,{useState} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/Modals-Portals/VideoHomeDisplayPortal.js";
import VideoLoadingPrompt from "../../../GeneralComponents/PostComponent/VideoLoadingPrompt.js";

const PopularVideosListCSS={
	marginRight:"20px",
	marginBottom:"10px",
	cursor:"pointer"
}


const PopularVideosModal=({popularVideos,changeState})=>{
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
		<div>
			{displayVideoDisplayPortal==true &&(
				<VideoPostDisplayPortal
					closeModal={closeModal}
					selectedVideo={selectedVideo}
					recommendedVideos={[]}
					targetDom="extendedSymposiumContainer"
				/>
			)}
			<hr/>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
				{popularVideos.map((data,index)=>
					<>
						{data!=null &&(
							<div onClick={()=>displayVideo(data)} style={PopularVideosListCSS}>
								<VideoLoadingPrompt
									videoElement={
										<video id={"popularVideo"+index} key={uuidv4()} borderRadius="5px"
									 	position="relative" height="150px" width="250px"
									 	autoPlay loop autoBuffer muted playsInline>
										<source src={data.videoUrl} type="video/mp4"/>
									</video>}
									videoId={"popularVideo"+index}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
export default PopularVideosModal;