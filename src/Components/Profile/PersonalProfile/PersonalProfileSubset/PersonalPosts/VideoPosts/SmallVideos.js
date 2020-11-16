import React,{useEffect} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../../UserContext.js";
import {testIfUserIsUsingChrome} from "../VerifyBrowserIsChrome.js";

const SmallVideoComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;

	@media screen and (max-width:420px){
		width:220% !important;
		height:50%;
		#videoAudio{
			display:none
		}
		#postInformation{
			display:none;
		}
	}

	@media screen and (max-width:740px) and (max-height:420px){
		height:200% !important;
		width:200%;
	 	#videoAudio{
			display:none
		}
		#postInformation{
			display:none;
		}
    }
`;



const SmallVideo=styled.div`

	position:relative;
	height:50%;
	width:100%;
	background-color:white;
	border-radius:5px;
	overflow:hidden;
`;

const VideoDescriptionContainer=styled.div`
	position:relative;
	width:70px;
	height:60px;
	border-radius:50%;
`;

const IndustryButtonCSS={
	listStyle:"none",
	padding:"5px",
	width:"50%",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px"
}

const SmallVideoContainer=(videoData)=>{
	console.log(videoData);
	const displayIndustries=()=>{
		
		const {industriesUploaded}=videoData.video;
		if(industriesUploaded.length>=1){
			const industry=industriesUploaded[0].industry;
			console.log("Small video industry");
			console.log(industry);
			return <ul style={{padding:"0px"}}>
						<li style={IndustryButtonCSS}>
							{industry}
						</li>
						<li style={{listStyle:"none",display:"inline-block"}}>
							(View more...)
						</li>
					</ul>
		}else{
			return <ul style={{padding:"0px"}}>
						<li style={IndustryButtonCSS}>
							{industriesUploaded.industry}
						</li>
					</ul>
			}
	}


	const constructDate=()=>{
		const date=videoData.video.datePosted;
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();
		return dateToString;
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	let audioId=uuidv4();
	let videoDescriptionId=uuidv4();
	return(
		<UserConsumer>
			{personalInformation=>{
				return <SmallVideoComponent>
							<ul style={{padding:"0px"}}>
								<li id="videoAudio" style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										{(videoData.video.videoDescription==null  && testIfUserIsUsingChrome()==true)?null:
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												<VideoDescriptionContainer>
													<video key={uuidv4()} style={{borderRadius:"50%"}} width="100%" height="100%" autoplay="true">
														<source src={videoData.video.videoDescription} type="video/mp4"/>
													</video>
												</VideoDescriptionContainer>
											</li>
										}
										
										{(videoData.video.audioDescription==null && testIfUserIsUsingChrome()==true)?null:
											<li style={{listStyle:"none",display:"inline-block"}}>
												<audio key={uuidv4()} style={{width:"150px"}} controls>
													<source src={videoData.video.audioDescription} type="audio/ogg"/>
													<source src={videoData.video.audioDescription} type="audio/mpeg"/>
													Your browser does not support the audio element.
												</audio>
											</li>
										}
									</ul>
								</li>
								<li style={{listStyle:"none"}}>
									<SmallVideo>
										<video key={uuidv4()} width="100%" height="100%" autoplay muted>
												<source src={videoData.video.videoUrl} type="video/mp4"/>
										</video>
									</SmallVideo>
								</li>

								<div id="postInformation">
									<li style={{listStyle:"none",fontSize:"15px"}}>
										<b>{videoData.video.title} </b>
									</li>

									<li style={{listStyle:"none"}}>
										{/*{personalInformation.userProfile.firstName}*/}
									</li>

									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												{constructDate()}
											</li>
										</ul>
									</li>

									<li style={{listStyle:"none"}}>
										{displayIndustries()}
									</li>
								</div>
							</ul>
						</SmallVideoComponent>
			}}
		</UserConsumer>

	)
}

export default SmallVideoContainer;