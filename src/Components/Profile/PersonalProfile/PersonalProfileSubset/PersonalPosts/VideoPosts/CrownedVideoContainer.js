import React from "react";
import styled from "styled-components";


const ThumbnailVideoComponent=styled.div`
	position:relative;
	width:100%;
	height:35%;
	overflow:hidden;
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		#videoDescriptionLI{
			display:block !important;
		}
		#videoLI{
			display:block !important;
		}
	}

	@media screen and (max-width:740px){
		#description{
			display:none !important;
		}
		#postInformation{
			display:none !important;
		}
		#videoDescriptionLI{
			display:none !important;
		}
	}
	
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	height:50% !important;
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:150% !important;
		height:100% !important;
		#description{
			display:none !important;
		}
		margin-left:-10% !important;
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		
		margin-left:0% !important;
    }

`;

const ThumbnailVideo=styled.div`
	position:relative;
	width:60%;
	height:100%;
	border-radius:5px;
	display:flex;
	flex-direction:column;
	margin-right:2%;
	@media screen and (max-width:1370px){
		margin-top:-10%;
	}
	@media screen and (max-width:420px){
		width:110% !important;
		height:120% !important;
		margin-right:-5% !important;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:40%;
		height:200%;
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

const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:50%;

	@media screen and (max-width:700px){
		display:none !important;

		#videoDescriptionLI{
			display:none !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		display:none !important;

		#videoDescriptionLI{
			display:none !important;
		}
    }
`;


const CrownedVideoContainer=({headerVideo})=>{
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
				<ThumbnailVideo>
					<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline width="100%" height="100%">
						<source src={headerVideo.videoUrl} type="video/mp4"/>
					</video>
				</ThumbnailVideo>

				<DescriptionContainer id="videoDescriptionLI">
						<div id="postInformation">
							<li style={{marginBottom:"5%",listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
								{headerVideo.industriesUploaded[0].industry}
							</li>
							<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
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
								{headerVideo.videoDescription==null?null:
									<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
										<VideoDescriptionContainer>
											<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline width="100%" height="100%">
												<source src={headerVideo.videoDescription} type="video/mp4"/>
											</video>
										</VideoDescriptionContainer>
									</li>
								}
								
								{headerVideo.audioDescription==null ?null:
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
							<Description style={{maxWidth:"80%",maxHeight:"50px",overflow:"hidden"}}>
								{headerVideo.description}
							</Description>
						</li>
					</DescriptionContainer>

		</ThumbnailVideoComponent>
	)
}

export default CrownedVideoContainer;