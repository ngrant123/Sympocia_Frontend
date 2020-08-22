import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {ImagePostsModal} from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/ImagePostsModal.js";
import VideoPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/VideoPostsModal.js";
import BlogPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/BlogPostsModal.js";
import RegularPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/RegularPostsModal.js";

import {
		exploreImagePosts,
		exploreVideoPosts,
		exploreBlogPosts,
		exploreRegularPosts
} from "../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

const PostContainer=styled.div`
	position:absolute;
	width:95%;
	height:600px;
	margin-top:7%;
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
	const [isFinishedLoading,changeLoadState]=useState(false);

	const [displayImages,changeDisplayImages]=useState(true);
	const [displayVideos,changeDisplayVideos]=useState(false);
	const [displayBlogs,changeDisplayBlogs]=useState(false);
	const [displayRegularPosts,changeDisplayRegularPosts]=useState(false);


	useEffect(()=>{
		const getPosts=async()=>{
			const posts=await exploreImagePosts(props.userId,postsCount);
			const finalPosts=addSuggestedSymposiums(posts);
			changePosts(finalPosts);
			changeLoadState(true);
		}
		getPosts();
	},[]);

	const addSuggestedSymposiums=(posts)=>{
		return suggestedSymposiumsRecursive(posts);
	}

	const fetchBlogPosts=async()=>{
		const posts=await exploreBlogPosts(props.userId,postsCount);
		const finalPosts=addSuggestedSymposiums(posts);
		changePosts(finalPosts);
		changeLoadState(true);

		changeDisplayImages(false);
		changeDisplayVideos(false);
		changeDisplayBlogs(true);
		changeDisplayRegularPosts(false);
	}

	const fetchImagePosts=async()=>{
		const posts=await exploreImagePosts(props.userId,postsCount);
		const finalPosts=addSuggestedSymposiums(posts);
		changePosts(finalPosts);
		changeLoadState(true);

		changeDisplayImages(true);
		changeDisplayVideos(false);
		changeDisplayBlogs(false);
		changeDisplayRegularPosts(false);
	}

	const fetchVideoPosts=async()=>{
		const posts=await exploreVideoPosts(props.userId,postsCount);
		const finalPosts=addSuggestedSymposiums(posts);
		changePosts(finalPosts);
		changeLoadState(true);

		changeDisplayImages(false);
		changeDisplayVideos(true);
		changeDisplayBlogs(false);
		changeDisplayRegularPosts(false);
	}

	const fetchRegularPosts=async()=>{
		const posts=await exploreRegularPosts(props.userId,postsCount);
		const finalPosts=addSuggestedSymposiums(posts);
		changePosts(finalPosts);
		changeLoadState(true);

		changeDisplayImages(false);
		changeDisplayVideos(false);
		changeDisplayBlogs(false);
		changeDisplayRegularPosts(true);
	}

	const suggestedSymposiumsRecursive=(posts)=>{
		debugger;
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

	const constructPostsResponse=()=>{
		 if(displayImages==true){
		 	return <ImagePostsModal
						posts={posts}
					/>
		 }else if(displayVideos==true){
		 	return <VideoPostModal
		 				posts={posts}
		 		   />
		 }else if(displayBlogs==true){
		 	return <BlogPostModal
		 				posts={posts}
		 			/>
		 }else{
		 	return <RegularPostModal
		 				posts={posts}
		 			/>
		 }
	}

	return(
		<>
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

				<li style={{listStyle:"none"}}>
					<PostContainer>
						{isFinishedLoading==true?
							<>
								{constructPostsResponse()}
							</>:null
						}
					</PostContainer>
				</li>
			</ul>
		</>
	)
}

export default PostSearch;