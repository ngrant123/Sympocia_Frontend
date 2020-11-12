import React,{useState,useEffect} from "react";
import styled from "styled-components";

import {ImagePostsModal} from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/ImagePostsModal.js";
import VideoPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/VideoPostsModal.js";
import BlogPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/BlogPostsModal.js";
import RegularPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/RegularPostsModal.js";
import {getPostsFromSearch} from "../../Actions/Requests/SearchPageAxiosRequests/index.js";
import LoadingScreen from "../../LoadingAnimation.js";


const Container=styled.div`
	@media screen and (max-width:1370px){
		#postLI{
			margin-top:-5% !important;
		}
	}

	@media screen and (max-width:600px){
		#postLI{
			margin-top:50% !important;
		}
	}



    @media screen  and (max-width:730px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	#postLI{
			margin-top:5% !important;
		}
    }
`;
const PostContainer=styled.div`
	position:absolute;
	width:95%;
	height:600px;
	margin-top:7%;
	padding:40px;

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	margin-left:10% !important;
    	width:70% !important;
    }
`;

const PostButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const PostSearch=(props)=>{
	const [posts,changePosts]=useState([]);
	const [postsCount,changePostsCount]=useState(0);
	const [isFinishedLoading,changeFinisheLoadingState]=useState(false);

	const [displayImages,changeDisplayImages]=useState(true);
	const [displayVideos,changeDisplayVideos]=useState(false);
	const [displayBlogs,changeDisplayBlogs]=useState(false);
	const [displayRegularPosts,changeDisplayRegularPosts]=useState(false);


	useEffect(()=>{
		const getPosts=async()=>{
			
			const searchCriteria={
				searchUrl:props.searchQuery,
				postType:props.postType
			}
			switch(props.postType){
				case "Images":{
					fetchImagePosts();
					break;
				}
				case "Blogs":{
					fetchBlogPosts();
					break;
				}
				case "Videos":{
					fetchVideoPosts();
					break;
				}
				case "RegularPosts":{
					fetchRegularPosts();
					break;
				}
			}
		}
		getPosts();
	},[]);

	const addSuggestedSymposiums=(posts)=>{
		return suggestedSymposiumsRecursive(posts);
	}

	const fetchBlogPosts=async()=>{

		const searchCriteria={
			searchUrl:props.searchQuery,
			postType:"Blogs"
		}
		changeFinisheLoadingState(false);

		const {confirmation,data}=await getPostsFromSearch(searchCriteria);
		if(confirmation=="Success"){
			const finalPosts=addSuggestedSymposiums(data);
			changePosts(finalPosts);
			changeFinisheLoadingState(true);

			changeDisplayImages(false);
			changeDisplayVideos(false);
			changeDisplayBlogs(true);
			changeDisplayRegularPosts(false);
		}else{
			alert('Unfortunately there has been an error getting this search result. Please try again');
		}
	}

	const fetchImagePosts=async()=>{

		const searchCriteria={
			searchUrl:props.searchQuery,
			postType:"Images"
		}
		changeFinisheLoadingState(false);

		const {confirmation,data}=await getPostsFromSearch(searchCriteria);
		if(confirmation=="Success"){
			const finalPosts=addSuggestedSymposiums(data);
			changePosts(finalPosts);
			changeFinisheLoadingState(true);

			changeDisplayImages(true);
			changeDisplayVideos(false);
			changeDisplayBlogs(false);
			changeDisplayRegularPosts(false);
		}else{
			alert('Unfortunately there has been an error getting this search result. Please try again');
		}
	}

	const fetchVideoPosts=async()=>{

		const searchCriteria={
			searchUrl:props.searchQuery,
			postType:"Videos"
		}
		changeFinisheLoadingState(false);

		const {confirmation,data}=await getPostsFromSearch(searchCriteria);
		if(confirmation=="Success"){
			const finalPosts=addSuggestedSymposiums(data);
			changePosts(finalPosts);
			changeFinisheLoadingState(true);

			changeDisplayImages(false);
			changeDisplayVideos(true);
			changeDisplayBlogs(false);
			changeDisplayRegularPosts(false);
		}else{
			alert('Unfortunately there has been an error getting this search result. Please try again');
		}
	}

	const fetchRegularPosts=async()=>{

		const searchCriteria={
			searchUrl:props.searchQuery,
			postType:"RegularPosts"
		}
		changeFinisheLoadingState(false);

		const {confirmation,data}=await getPostsFromSearch(searchCriteria);
		if(confirmation=="Success"){
			const finalPosts=addSuggestedSymposiums(data);
			changePosts(finalPosts);
			changeFinisheLoadingState(true);

			changeDisplayImages(false);
			changeDisplayVideos(false);
			changeDisplayBlogs(false);
			changeDisplayRegularPosts(true);
		}else{
			alert('Unfortunately there has been an error getting this search result. Please try again');
		}
	}

	const suggestedSymposiumsRecursive=(posts)=>{
		
		if(posts==null||posts.length==0){
			return posts;
		}else if(posts.length==1){
			posts.splice(1,0,"suggestedSymposium");
			return posts;
		}else{
			var randomNumber;
			if(posts.length<5){
				randomNumber=Math.floor(Math.random() * ((posts.length-1) - 1 + 1)) + 1;
			}else{
				randomNumber=Math.floor(Math.random() * (4 - 1 + 1)) + 1;
			}

			posts.splice(randomNumber,0,"suggestedSymposium");
			const currentPosts=posts.slice(0,6);
			const newPost=posts.slice(6,posts.length);
			const returnArray=suggestedSymposiumsRecursive(newPost);
			for(var i=0;i<returnArray.length;i++){
				currentPosts.push(returnArray[i]);
			}
			return currentPosts;
		}
	}

	const displaySymposium=()=>{

	}

	const constructPostsResponse=()=>{
		 if(displayImages==true){
		 	return <ImagePostsModal
						posts={posts}
						_id={props.userId}
						confettiAnimation={props.displayRecruitConfetti}
						isPersonalProfile={props.isPersonalProfile}
						displaySymposium={props.displaySymposium}
						targetDom={"searchContainer"}
					/>
		 }else if(displayVideos==true){
		 	return <VideoPostModal
						posts={posts}
						_id={props.userId}
						confettiAnimation={props.displayRecruitConfetti}
						isPersonalProfile={props.isPersonalProfile}
						displaySymposium={props.displaySymposium}
						targetDom={"searchContainer"}
		 		   />
		 }else if(displayBlogs==true){
		 	return <BlogPostModal
						posts={posts}
						_id={props.userId}
						confettiAnimation={props.displayRecruitConfetti}
						isPersonalProfile={props.isPersonalProfile}
						displaySymposium={props.displaySymposium}
						targetDom={"searchContainer"}
		 			/>
		 }else{
		 	return <RegularPostModal
						posts={posts}
						_id={props.userId}
						confettiAnimation={props.displayRecruitConfetti}
						isPersonalProfile={props.isPersonalProfile}
						displaySymposium={props.displaySymposium}
						targetDom={"searchContainer"}
		 			/>
		 }
	}

	return(
		<Container>
			<ul>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
							<div class="btn-group">
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"2px",
																															padding:"10px",
																															color:"#5298F8",
																															backgroundColor:"white"}}>
									Post Options
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
										<li onClick={()=>fetchImagePosts()}><a href="javascript:;">Images</a></li>	
										<li onClick={()=>fetchVideoPosts()}><a href="javascript:;">Videos</a></li>	
										<li onClick={()=>fetchBlogPosts()}><a href="javascript:;">Blogs</a></li>	
										<li onClick={()=>fetchRegularPosts()}><a href="javascript:;">Posts</a></li>		
								</ul>
							</div>
						</li>

						<li style={PostButton}>
							Request a post
						</li>
					</ul>
				</li>
				<hr/>

				<li id="postLI"  style={{listStyle:"none"}}>
					<PostContainer>
						{isFinishedLoading==true?
							<>
								{constructPostsResponse()}
							</>:<LoadingScreen/>
						}
					</PostContainer>
				</li>
			</ul>
		</Container>
	)
}

export default PostSearch;