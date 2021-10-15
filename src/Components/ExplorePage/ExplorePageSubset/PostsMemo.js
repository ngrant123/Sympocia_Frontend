import React,{useMemo} from "react";
import styled from "styled-components";
import {ImagePostsModal} from './PostsDisplay/Images/index.js';
import VideosPostsModal from './PostsDisplay/Videos/index.js';
import BlogsPostsModal from './PostsDisplay/Blogs/index.js';
import RegularPostsModal from './PostsDisplay/Text/RegularPostsModal.js';



const PostDisplayDecider=(props)=>{
	const {postType}=props;
	const postDecider=()=>{
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