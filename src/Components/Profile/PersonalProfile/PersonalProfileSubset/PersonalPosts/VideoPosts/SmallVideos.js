import React,{useEffect,memo} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../../UserContext.js";

const SmallVideoComponent=styled.div`
	position:relative;
	width:250px;
	height:40%;
	background-color:white;
	@media screen and (max-width:740px){
		width:250% !important;
		height:30%;
		#videoAudio{
			display:none
		}
		#postInformation{
			display:none;
		}

	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape){
		height:100% !important;
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

	@media screen and (max-width:1370px){
		#videoAndAudioDescriptionLI{
			margin-top:30% !important;
		}
	}

	@media screen and (max-width:740px){
		height:90%;
		#videoAndAudioDescriptionLI{
			margin-top:80% !important;
		}
		#audioLI{
			height:20px !important;
			width:50px !important;
		}
	}

	 @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#videoAndAudioDescriptionLI{
			margin-top:10% !important;
		}
    }
`;

const VideoDescriptionContainer=styled.div`
	position:relative;
	width:70px;
	height:60px;
	border-radius:50%;

	@media screen and (max-width:700px){
		width:30px;
		height:40px;
	}

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

const SmallVideoContainer=({videos,displayPostModal})=>{
	const displayIndustries=(data)=>{
		
		const {industriesUploaded}=data;
		if(industriesUploaded.length>=1){
			const industry=industriesUploaded[0].industry;
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


	const constructDate=(data)=>{
		const date=data.datePosted;
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
		<li id="smallVideoParentContainer" style={{cursor:"pointer",listStyle:"none",marginTop:"1%"}}>	
			<ul style={{padding:"0px"}}>
				{videos.map(data=>
					<li id="smallVideoLI" onClick={()=>displayPostModal(data)} 
					style={{width:"20%",listStyle:"none",display:"inline-block",marginRight:"100px",marginLeft:"2%"}}>
						<SmallVideoComponent>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<SmallVideo>
										<ul id="videoAndAudioDescriptionLI" style={{position:"absolute",padding:"0px"}}>
											{data.videoDescription==null?null:
												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
													<VideoDescriptionContainer>
														<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
															width="100%" height="100%">
															<source src={data.videoDescription} type="video/mp4"/>
														</video>
													</VideoDescriptionContainer>
												</li>
											}
											
											{data.audioDescription==null?null:
												<li style={{listStyle:"none",display:"inline-block"}}>
													<audio id="audioLI" key={uuidv4()} style={{width:"150px"}} controls>
														<source src={data.audioDescription} type="audio/ogg"/>
														<source src={data.audioDescription} type="audio/mp4"/>
														Your browser does not support the audio element.
													</audio>
												</li>
											}
										</ul>
										<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
											width="100%" height="100%">
											<source src={data.videoUrl} type="video/mp4"/>
										</video>
									</SmallVideo>
								</li>

								<div id="postInformation">
									<li style={{listStyle:"none",fontSize:"15px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
										<b>{data.title} </b>
									</li>
									{/*
										<li style={{listStyle:"none"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block"}}>
													{constructDate(data)}
												</li>
											</ul>
										</li>
									*/}

									<li style={{listStyle:"none"}}>
										{displayIndustries(data)}
									</li>
								</div>
							</ul>
						</SmallVideoComponent>
							
					</li>
				)}
			</ul>
		</li>
	)
}

export default memo(SmallVideoContainer);