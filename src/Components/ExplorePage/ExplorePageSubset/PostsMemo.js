import React,{useMemo} from "react";
import styled from "styled-components";


const Posts=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	margin-top:0%;

	@media screen and (max-width:1370px){
		margin-top:0%;		
	}

	@media screen and (max-width:450px){
		margin-top:60% !important;
	}

`;

const PostsMemo=(props)=>{
	const {
		handleDisplayImages,
		handleDisplayVideos,
		handleDisplayBlogs,
		handleDisplayRegularPosts,
		homePageInformation,
		searchPageInformation,
		postsInformation
	}=props;

	const posts=useMemo(()=>{
		return <Posts>
					{handleDisplayImages(homePageInformation,searchPageInformation)}
					{handleDisplayVideos(homePageInformation,searchPageInformation)}
					{handleDisplayBlogs(homePageInformation,searchPageInformation)}
					{handleDisplayRegularPosts(homePageInformation,searchPageInformation)}	
				</Posts>
	},[postsInformation]);

	return(
		<React.Fragment>
			{posts}
		</React.Fragment>
	)
}

export default PostsMemo;