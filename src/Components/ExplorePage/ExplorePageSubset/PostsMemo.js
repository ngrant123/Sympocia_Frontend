import React,{useMemo} from "react";
import styled from "styled-components";
import {ImagePostsModal} from './PostsDisplay/ImagePostsModal.js';
import VideosPostsModal from './PostsDisplay/VideoPostsModal.js';
import BlogsPostsModal from './PostsDisplay/BlogPostsModal.js';
import RegularPostsModal from './PostsDisplay/RegularPostsModal.js';



const PostDisplayDecider=(props)=>{
	debugger;
	const {postType}=props;
	const postDecider=()=>{
		debugger;
		switch(postType){
			case 'Images':{
				return <ImagePostsModal
							{...props}
						/>
			};
			case 'Videos':{
				return <VideosPostsModal
							{...props}
						/>
			};
			case 'RegularPosts':{
				return <RegularPostsModal
							{...props}
						/>
			};

			case 'Blogs':{
				return <BlogsPostsModal
							{...props}
						/>
			}
		}
	}
	return(
		<React.Fragment>
			{postDecider()}	
		</React.Fragment>
	)
}

export default PostDisplayDecider;