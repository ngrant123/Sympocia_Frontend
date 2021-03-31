import React,{useState} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../Home/HomePageSet/VideoHomeDisplayPortal.js";

const PopularVideosContainer=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:25%;
	width:50%;
	height:60%;
	padding:20px;
	overflow-y:scroll;
	z-index:40;
	box-shadow: 1px 5px 5px 1px #d5d5d5;

	@media screen and (max-width:740px){
		width:90% !important;
		left:5% !important;
	}
`;
const PopularVideosListCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"20px",
	marginBottom:"10px",
	overflow:"hidden"
}


const PopularVideosModal=({popularVideos})=>{
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
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>displayVideo(data)}style={PopularVideosListCSS}>
									<video id="smallVideo" key={uuidv4()} borderRadius="5px" position="relative" height="200px" width="300px">
										<source src={data.videoUrl} type="video/mp4"/>
									</video>
								</li>
							</a>
						)}
					</>
				)}
			</ul>
		</PopularVideosContainer>
	)
}
export default PopularVideosModal;