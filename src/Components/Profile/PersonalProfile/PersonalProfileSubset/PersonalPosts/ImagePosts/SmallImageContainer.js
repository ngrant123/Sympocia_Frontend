import React,{useState,useEffect,memo,useContext} from "react";
import styled from "styled-components";
import EditIcon from '@material-ui/icons/Edit';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
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
	padding:"5px",
	marginTop:"-165px",
	display:"flex",
	flexDirection:"column-reverse"
}

const SmallImageContainer=({images,displayPostModal,friendsColorNodesMap,PostContextValues})=>{
	console.log(images);
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const image=(data)=>{
		const colorCode=friendsColorNodesMap.get(data.levelNode);
		return 	<div style={{width:"100%",height:"100%"}}>
					<img id="img" src={data.imgUrl} 
						style={{cursor:"pointer",borderRadius:"5px",height:"100%",width:"100%"}}
					/>
					<ul id="videoAndAudioDescriptionLI" style={VideoAndAudioDescriptionCSS}>
						{data.videoDescription!=null &&(
							<video key={uuidv4()} style={{borderRadius:"50%"}} autoPlay loop autoBuffer muted playsInline 
								width="40px" height="40px" borderRadius="5px">
								<source src={data.videoDescription} type="video/mp4"/>
							</video>
						)}
						{data.audioDescription!=null &&(
							<VolumeUpIcon style={{color:"white",fontSize:"30"}}/>
						)}
					</ul>
					<ColorPatchContainer colorCode={colorCode}/>
				</div>
	}

	let audioId=uuidv4();
	let videoDescriptionId=uuidv4();
	return(
		<Container style={{marginTop:"5%"}}>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",width:"100%"}}>
				{images.map(data=>
					<div id="smallPostLI" style={{height:"170px",marginBottom:"5%"}} onClick={()=>displayPostModal(data)}>
						{image(data)}
					</div>
				)}
			</div>
		</Container>
	)
}

export default memo(SmallImageContainer);



