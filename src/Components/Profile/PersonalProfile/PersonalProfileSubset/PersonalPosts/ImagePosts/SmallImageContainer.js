import React,{useState,useEffect,memo,useContext} from "react";
import styled from "styled-components";
import EditIcon from '@material-ui/icons/Edit';
import Typed from "react-typed";

import {
	Container,
	ImageContainer,
	Image,
	VideoDesriptionContainer,
	ColorPatchContainer,
	AudioDescriptionContainer,
	ImageCaption
} from "./SmallImageContainerCSS.js";


const IndustryButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	listStyle:"none",
	padding:"5px",
	borderRadius:"5px",
	marginTop:"2%"
}

const ImageLabelCSS={
	listStyle:"none",
	  display:"inline-block",
	  backgroundColor:"white",
	  borderRadius:"5px",
	  padding:"10px",
	  color:"#3898ec",
	  borderStyle:"solid",
	  borderWidth:"2px",
	  borderColor:"#3898ec",
	  maxWidth:"30%",
	  maxHeight:"50px",
	  overflow:"hidden",
	  cursor:"pointer"
}

const VideoAndAudioDescriptionCSS={
	position:"absolute",
	padding:"0px",
	marginTop:"-165px",
	display:"flex",
	flexDirection:"column-reverse"
}

const SmallImageContainer=({images,displayPostModal,friendsColorNodesMap,PostContextValues})=>{
	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();
		//work on this a little more
		return dateToString;
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
	//onClick={()=>displayPostModal(data)} 

	const image=(data)=>{
		const colorCode=friendsColorNodesMap.get(data.levelNode);
		return 	<div>
					<img id="img" src={data.imgUrl} 
						style={{cursor:"pointer",borderRadius:"5px",height:"100%",width:"100%"}}
					/>
					<ul id="videoAndAudioDescriptionLI" style={VideoAndAudioDescriptionCSS}>
						{data.videoDescription!=null &&(
							<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
								width="90px" height="40px" borderRadius="5px">
								<source src={data.videoDescription} type="video/mp4"/>
							</video>
						)}
						
						{data.audioDescription!=null &&(
							<audio id="audioLI" key={uuidv4()} 
								style={{width:"200px",height:"40px",marginBottom:"2%"}} controls>
								<source src={data.audioDescription} type="audio/ogg"/>
								<source src={data.audioDescription} type="audio/mp4"/>
								Your browser does not support the audio element.
							</audio>
						)}
					</ul>
					<ColorPatchContainer colorCode={colorCode}/>
				</div>
	}

	let audioId=uuidv4();
	let videoDescriptionId=uuidv4();
	return(
		<Container style={{marginTop:"5%",width:"90%",display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
			{images.map(data=>
				<div id="smallPostLI" style={{marginBottom:"5%"}} onClick={()=>displayPostModal(data)}>
					<div id="smallImageDiv" style={{height:"170px",marginBottom:"5%"}}>
						{image(data)}
					</div>
					<div id="postInformation">
						{data.caption!=""?
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<ImageCaption>
									{data.caption}
								</ImageCaption>
							</li>:<React.Fragment></React.Fragment>
						}
					</div>
				</div>
			)}
		</Container>
	)
}

export default memo(SmallImageContainer);



