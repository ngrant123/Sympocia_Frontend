import React,{Component} from "react";
import styled from "styled-components";
import ImageContainer from "../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";
import RegularPostContainer from "../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import BlogPostContainer from "../GeneralComponents/PostComponent/BlogComponent/BlogPostDisplay/BlogPostContainer.js";
import VideoPostContainer from "../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";
import CommentsContainer from "../GeneralComponents/CommentsComponent/index.js";

import PostCreation from "../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";

import ImageIcon from '@material-ui/icons/Image';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FunctionsIcon from '@material-ui/icons/Functions';
import GifIcon from '@material-ui/icons/Gif';



const PostCreationContainer=styled.div`
	width:60%;

`;

const CommentsContainerTesting=styled.div`
	position:absolute;
	width:35%;
	height:45%;
	background-color:blue;
	border-radius:5px;
	overflow-y:scroll;
`;

const CSS={
	listStyle:"none",
	marginBottom:"20px"
}

const DemoContainer=()=>{


	return(
		<ul style={{padding:"10px"}}>
			<li style={CSS}>
				<PostCreationContainer>
					<PostCreation/>
				</PostCreationContainer>
			</li>


			<li style={CSS}>
				<ImageContainer/>
			</li>

			<li style={CSS}>
				<RegularPostContainer/>
				
			</li>
		{/*
			<li style={CSS}>
				<CommentsContainerTesting>
					<CommentsContainer/>
				</CommentsContainerTesting>
			</li>
		*/}
			
			<li style={CSS}>
				<BlogPostContainer/>
			</li>

			<li style={CSS}>
				<VideoPostContainer/>
				
			</li>

			<li>

			</li>





		</ul>
	)
}

export default DemoContainer;