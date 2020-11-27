import React from "react";
import styled from "styled-components";
import {testIfUserIsUsingChrome} from "../VerifyBrowserIsChrome.js";



const ThumbnailVideoComponent=styled.div`
	position:relative;
	width:100%;
	height:35%;
	overflow:hidden;

	@media screen and (max-width:420px){
		#description{
			display:none !important;
		}
		#postInformation{
			display:none !important;
		}
	}
	@media screen and (max-width:740px) and (max-height:420px){
		width:150% !important;
		height:100% !important;
		#description{
			display:none !important;
		}
		#postInformation{
			display:none !important;
		}
    }

`;

const ThumbnailVideo=styled.div`
	position:relative;
	width:450px;
	height:140%;
	border-radius:5px;
	@media screen and (max-width:420px){
		width:110% !important;
		height:120% !important;
		margin-right:-5% !important;
	}
`;

const Description=styled.div`
	width:85%;
	height:240%;
	overflow:hidden;
	color:#767677;
`;

const VideoDescriptionContainer=styled.div`
	position:relative;
	width:70px;
	height:60px;
	border-radius:50%;
`;

const CrownedVideoContainer=({headerVideo})=>{
	console.log(headerVideo);

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();
		return dateToString;
	}
	return(
		<ThumbnailVideoComponent>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"1%",marginTop:"-10%"}}>
					<ThumbnailVideo>
						<video key={headerVideo._id} width="100%" height="100%" autoplay muted>
							<source src={headerVideo.videoUrl} type="video/mp4"/>
						</video>
					</ThumbnailVideo>
				</li>

				<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block"}}>
					<ul style={{paddging:"0px"}}>
						<div id="postInformation">
							<li style={{marginBottom:"5%",listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
								{headerVideo.industriesUploaded[0].industry}
							</li>
							<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px"}}>
								<b>{headerVideo.title}</b>
							</li>

							<li style={{listStyle:"none",marginBottom:"5px"}}>
								<ul style={{padding:"0px",color:"#a6a6a7"}}>
									{/*
										<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
											{headerVideo.views} views
										</li>
									*/}

									<li style={{listStyle:"none",display:"inline-block"}}>
										{constructDate(headerVideo.datePosted)}
									</li>
								</ul>
							</li>
						</div>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								{(headerVideo.videoDescription==null && testIfUserIsUsingChrome()==true)?null:
									<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
										<VideoDescriptionContainer>
											<video key={uuidv4()} style={{borderRadius:"50%"}} width="100%" height="100%" autoplay="true" muted>
												<source src={headerVideo.videoDescription} type="video/mp4"/>
											</video>
										</VideoDescriptionContainer>
									</li>
								}
								
								{(headerVideo.audioDescription==null && testIfUserIsUsingChrome()==true)?null:
									<li style={{listStyle:"none",display:"inline-block"}}>
										<audio key={uuidv4()} style={{width:"150px"}} controls>
											<source src={headerVideo.audioDescription} type="audio/ogg"/>
											<source src={headerVideo.audioDescription} type="audio/mpeg"/>
											Your browser does not support the audio element.
										</audio>
									</li>
								}
							</ul>
						</li>

						<li id="description" style={{listStyle:"none"}}>
							<Description>
								{headerVideo.description}
							</Description>
						</li>
					</ul>
				</li>
			</ul>
		</ThumbnailVideoComponent>
	)
}

export default CrownedVideoContainer;