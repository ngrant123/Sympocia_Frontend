import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {getUserImages} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getBlogFromUser} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getVideosFromUser} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getRegularPostFromUser} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

import ImagePostDisplayPortal from "./ImageHomeDisplayPortal.js";
import BlogPostDisplayPortal from "./BlogHomeDisplayPortal.js";
import VideoPostDisplayPortal from "./VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "./RegularPostHomeDisplayPortal.js";

const Container=styled.div`

	position:absolute;
	width:30%;
	height:40%;
	background-color:red;
	z-index:14;

`;

const  SelectedRecruitPost=(props)=>{

	const [recommendedPostsArray,changeRecommendedPosts]=useState([]);
	console.log(props);
	useEffect(()=>{
		const getData=async()=>{
			/*
				const postType=props.selectedPost.postType;
				 if(postType=="Image"){
				 	var recommendedImagesArray;
				 	if(props.selectedPost.image.owner.companyName==null){
				 		var {userImage}= await getUserImages(props.selectedPost.image.owner._id);
				 		recommendedImagesArray=createNewArrayWithoutPost(props.selectedPost.image._id,userImage);
				 		changeRecommendedPosts(recommendedImagesArray);
				 	}else{

				 	}
				 }else if(postType=="Video"){
				 	var recommendedVideosArray;
				 	if(props.selectedPost.video.owner.companyName==null){
				 		debugger;
				 		var {videos,headerVideo}= await getVideosFromUser(props.selectedPost.video.owner._id);
				 		if(headerVideo!=null){
				 			videos.push(headerVideo);
				 		}

				 		recommendedVideosArray=createNewArrayWithoutPost(props.selectedPost.video._id,videos);
				 		changeRecommendedPosts(recommendedVideosArray);
				 	}else{

				 	}
				 }else if(postType=="Blog"){
				 	var recommendedBlogsArray;
				 	if(props.selectedPost.blog.owner.companyName==null){
				 		debugger;
				 		var {headerBlog,blogs}= await getBlogFromUser(props.selectedPost.blog.owner._id);
				 		if(headerBlog!=null){
				 			blogs.push(headerBlog);
				 		}
				 		debugger;
				 		recommendedBlogsArray=createNewArrayWithoutPost(props.selectedPost.blog._id,blogs);
				 		changeRecommendedPosts(recommendedBlogsArray);
				 	}else{

				 	}
				 }else{



				 }
			*/
	 	}
	 	getData();
	},[]);

	const createNewArrayWithoutPost=(selectedPostId,postArray)=>{
		var newPostArray=[];
		for(var i=0;i<postArray.length;i++){
			var currentPost=postArray[i];
			if(currentPost._id==selectedPostId)
				continue;
			newPostArray.push(currentPost);
		}
		return newPostArray;
	}


	return(
		<React.Fragment>
			{props.selectedPost.postType!="Images"?<React.Fragment></React.Fragment>:
				<ImagePostDisplayPortal
					closeModal={props.hidePost}
					selectedImage={props.selectedPost.post}
					recommendedImages={[]}
					targetDom={"homePageContainer"}
				/>
			}

			{props.selectedPost.postType!="Videos"?<React.Fragment></React.Fragment>:
				<VideoPostDisplayPortal
					closeModal={props.hidePost}
					selectedVideo={props.selectedPost.post}
					recommendedVideos={[]}
					targetDom={"homePageContainer"}
				/>
			}

		
			{props.selectedPost.postType!="Blogs"?<React.Fragment></React.Fragment>:
				<BlogPostDisplayPortal
					closeModal={props.hidePost}
					selectedBlog={props.selectedPost.post}
					recommendedBlogs={[]}
					targetDom={"homePageContainer"}
				/>
			}

			{props.selectedPost.postType!="RegularPosts"?<React.Fragment></React.Fragment>:
				<RegularPostDisplayPortal
					closeModal={props.hidePost}
					selectedPost={props.selectedPost.post}
					recommendedPosts={[]}
					targetDom={"homePageContainer"}
				/>
			}
		</React.Fragment>
	)
}

export default SelectedRecruitPost;