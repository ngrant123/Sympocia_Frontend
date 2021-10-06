import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const Container=styled.div`
	position:fixed;
	left:75%;
	top:25%;
	width:20%;
	background-color:white;
	z-index:30;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#9D9D9D;
	padding:5px;
	box-shadow: 1px 1px 5px #C1C1C1;

	@media screen and (max-width:1370px){
		width:40%;
		top:25%;
	}

	@media screen and (max-width:650px){
		height:60%;
		overflow-y:scroll;
		left:5%;
		width:50%;
		top:25%;
	}
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0);
	z-index:29;
	top:0px;
`;

const SymposiumAndChatInformationCSS={
	color:"#5298F8",
	borderRadius:"5px",
	padding:"10px",
	marginRight:"2px",
	cursor:"pointer",
	height:"20%",
	width:"100%"
}

const PostOptionsCSS={
    listStyle:"none",
    display:"inline-block",
    marginRight:"5%",
    cursor:"pointer",
    color:"#5298F8"
}


const PostOptionsPortal=({closeModal,updatePosts})=>{
	const triggerUpdatePosts=(postType,displayPostText)=>{
		debugger;
		const updatePostInformation={
			updatePostType:postType,
			displayPostText
		}
		updatePosts(updatePostInformation);
		closeModal();
	}
	return createPortal(
		<React.Fragment>
			<Container>
				<li onClick={()=>triggerUpdatePosts("Regular","Regular posts")} id="regular" style={PostOptionsCSS}>
                    Regular posts
                </li>
                <hr/>

                <li  onClick={()=>triggerUpdatePosts("Image","Images")} id="image" style={PostOptionsCSS}>  
                    Images
                </li>
                <hr/>
                <li onClick={()=>triggerUpdatePosts("Video","Videos")} id="video" style={PostOptionsCSS}> 
                    Videos
                </li>
                <hr/>
                <li onClick={()=>triggerUpdatePosts("Blog","Blogs")} id="blog" style={PostOptionsCSS}>
                    Blogs
                </li>
			</Container>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
		</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"));
}

export default PostOptionsPortal;


















