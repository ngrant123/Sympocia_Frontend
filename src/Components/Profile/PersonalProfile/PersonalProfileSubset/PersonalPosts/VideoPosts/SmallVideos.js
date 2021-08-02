import React,{useEffect,memo} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../../UserContext.js";

import {
	SmallVideoComponent,
	SmallVideo,
	VideoDescriptionContainer,
	ColorPatchContainer
} from "./SmallVideosCSS.js";

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

const SmallVideoContainer=({videos,displayPostModal,friendsColorNodesMap})=>{
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

	const video=(data)=>{
		const colorCode=friendsColorNodesMap.get(data.levelNode);
		return <SmallVideo>
				<ul id="videoAndAudioDescriptionLI" style={{position:"absolute",padding:"0px"}}>
					<ColorPatchContainer colorCode={colorCode}/>
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
							<audio id="audioLI" key={uuidv4()} style={{width:"100px",height:"30px"}} controls>
								<source src={data.audioDescription} type="audio/ogg"/>
								<source src={data.audioDescription} type="audio/mp4"/>
								Your browser does not support the audio element.
							</audio>
						</li>
					}
				</ul>
				<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
					width="100%" height="100%" style={{backgroundColor:"#151515"}}>
					<source src={data.videoUrl} type="video/mp4"/>
				</video>
			</SmallVideo>
	}

	let audioId=uuidv4();
	let videoDescriptionId=uuidv4();
	return(
		<li id="smallVideoParentContainer" style={{cursor:"pointer",listStyle:"none",marginTop:"1%"}}>	
			<ul style={{padding:"0px"}}>
				{videos.map(data=>
					<li id="smallVideoLI" onClick={()=>displayPostModal(data)} 
					style={{width:"20%",listStyle:"none",display:"inline-block",marginRight:"120px"}}>
						<SmallVideoComponent>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									{video(data)}
								</li>

								<div id="postInformation">
									<li style={{listStyle:"none",fontSize:"15px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
										<b>{data.title} </b>
									</li>

									<li id="symposiumsDisplay" style={{listStyle:"none"}}>
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