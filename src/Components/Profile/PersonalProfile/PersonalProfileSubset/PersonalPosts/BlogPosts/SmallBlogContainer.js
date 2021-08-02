import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {
	SmallBlogComponent,
	SmallBlog,
	ColorPatchContainer,
	Container,
	VideoDesriptionContainer
} from "./SmallBlogContainerCSS.js";


const SymposiumCSS={
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


const SmallBlogTitleCSS={
	listStyle:"none",
	fontSize:"18px",
	maxWidth:"90%",
	maxHeight:"50px",
	overflow:"hidden",
	marginBottom:"2%",
	color:"black"
}

const SmallBlogDescriptionCSS={
	listStyle:"none",
	fontSize:"12px",
	maxWidth:"80%",
	maxHeight:"50px",
	overflow:"hidden",
	color:"#767677"
}

const BlogContainer=(props)=>{
	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;
	}

	const blogImage=()=>{
		const colorCode=props.friendsColorNodesMap.get(props.data.levelNode);
		return(
			<SmallBlog>
				<img id="smallImage" src={props.data.blogImageUrl}
					style={{borderRadius:"5px"}}
				 	width="100%" height="100%"
				 />
				<VideoDesriptionContainer>
					{props.data.videoDescription!=null &&(
						<video style={{borderRadius:"50%"}} autoPlay loop autoBuffer muted playsInline 
							width="100%" height="100%" borderRadius="50%" autoplay="true" >
							<source src={props.data.videoDescription} type="video/mp4"/>
						</video>
					)}
				</VideoDesriptionContainer>
				<ColorPatchContainer colorCode={colorCode}/>
			</SmallBlog>
		)
	}

	return(
		<Container to={{pathname:props.isOwnProfile==true?`/createBlog`:`/blog/${props.data._id}`,
										state:{
												...props.data,
												profileType:props.profileType,
												friendsNodes:props.friendsNodes
										}}}>
			<SmallBlogComponent>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none"}}>
						{props.data.audioDescription!=null &&(
							<audio id="smallAudio" controls style={{width:"120px",height:"20px"}}>
							  <source src={props.data.audioDescription} type="audio/ogg"/>
							  <source src={props.data.audioDescription} type="audio/mp4"/>
							  Your browser does not support the audio element.
							</audio>
						)}
					</li>
					{blogImage()}

					<li style={SmallBlogTitleCSS}>
						<b> {props.data.title} </b>
					</li>
					<li style={SmallBlogDescriptionCSS}>
						{props.data.description}
					</li>

					<li id="symposiumsLI" style={SymposiumCSS}>
						{props.data.industriesUploaded[0].industry}
					</li>
				</ul>
			</SmallBlogComponent>
			<hr id="blogHorizontalLine" style={{display:"none"}}/>
		</Container>
	)
}

export default BlogContainer;