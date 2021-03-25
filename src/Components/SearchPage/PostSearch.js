import React,{useState,useEffect} from "react";
import styled from "styled-components";

import {ImagePostsModal} from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/ImagePostsModal.js";
import VideoPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/VideoPostsModal.js";
import BlogPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/BlogPostsModal.js";
import RegularPostModal from "../Home/HomePageSubset/SearchExplorePage/SearchExploreSubset/RegularPostsModal.js";
import {getPostsFromSearch} from "../../Actions/Requests/SearchPageAxiosRequests/index.js";
import LoadingScreen from "../../LoadingAnimation.js";
import {useSelector} from "react-redux";


const Container=styled.div`
	@media screen and (max-width:1370px){
		#postLI{
			margin-top:-5% !important;
		}
	}

	@media screen and (max-width:650px){
		#postLI{
			margin-top:-50px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#postOptionsLI{
    		margin-top:5% !important;
    	}
    }
`;


const PostsContainer=styled.div`
	position:absolute;
	width:90%;
	height:60%;

	@media screen and (max-width:1300px){
		#headerTitleLI{
			display:none !important;
		}
	}

	@media screen and (max-width:650px){
		width:100% !important;
		margin-top:-15%;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		margin-left:0% !important;
		margin-top:-100px !important;
    }
`;

const Posts=styled.div`
	position:absolute;
	width:100%;
	@media screen and (max-width:650px){
		margin-top:60% !important;
		margin-left:2% !important;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		margin-top:110px !important;
    }

`;

/*
	const PostContainer=styled.div`
		position:absolute;
		width:90%;
		height:90%;
		margin-top:0%;

		@media screen and (max-width:1370px){
			margin-top:10px !important;
		}

		@media screen and (max-width:740px){
			margin-top:45% !important;
			margin-left:-15% !important;
			width:100%;
		}

		@media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
			margin-top:5% !important;
	    	margin-left:-5% !important;
	    }
		@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
	    	margin-left:10% !important;
	    	width:70% !important;
	    }
	`;
*/

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
	let [posts,changePosts]=useState([]);
	const [postCount,changePostsCount]=useState(0);
	const [isFinishedLoading,changeFinisheLoadingState]=useState(false);

	const [displayImages,changeDisplayImages]=useState(true);
	const [displayVideos,changeDisplayVideos]=useState(false);
	const [displayBlogs,changeDisplayBlogs]=useState(false);
	const [displayRegularPosts,changeDisplayRegularPosts]=useState(false);
	const [displayMobileUI,changeDisplayMobileUI]=useState(false);
	
	const userId=useSelector(state=>state.personalInformation.id);
	const [endOfPostsDBIndicator,changeEndOfPostsIndicator]=useState(false);
	const [triggerPostReload,changePostReloadTrigger]=useState(false);
	const [isLoadingReloadedPosts,changeIsLoadingReloadPostsTrigger]=useState(false);
	const [currentSelectedPostType,changeCurrentSelectedPostType]=useState();
	const [postType,changePostType]=useState(props.postType);

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeDisplayMobileUI(true);
		}else{
			changeDisplayMobileUI(false);
		}
	}

	window.addEventListener('resize',triggerUIChange)

	useEffect(()=>{
		const getPosts=async()=>{
			
			triggerUIChange();
			const searchCriteria={
				searchUrl:props.searchQuery,
				postType:props.postType
			}
			changeCurrentSelectedPostType(props.postType);
			switch(props.postType){
				case "Images":{
					await fetchImagePosts(0);
					break;
				}
				case "Blogs":{
					await fetchBlogPosts(0);
					break;
				}
				case "Videos":{
					await fetchVideoPosts(0);
					break;
				}
				case "RegularPosts":{
					await fetchRegularPosts(0);
					break;
				}
			}
		}
		getPosts();
	},[]);

	const addSuggestedSymposiums=(posts)=>{
		return suggestedSymposiumsRecursive(posts);
	}

	const fetchBlogPosts=async(postCount)=>{
		if(postType!="Blogs"){
			postCount=0;
			posts=[];
			changeFinisheLoadingState(false);
		}
		const searchCriteria={
			searchUrl:props.searchQuery,
			postType:"Blogs",
			userId,
			postCount
		}

		const {confirmation,data}=await getPostsFromSearch(searchCriteria);
		if(confirmation=="Success"){
			
			changeFinisheLoadingState(true);
			if(data.length==0){
				changeEndOfPostsIndicator(true);
			}else{
				changeEndOfPostsIndicator(false);
				changePostType("Blogs");
				posts=posts.concat(data);
				const finalPosts=addSuggestedSymposiums(posts);
				changePosts([...finalPosts]);

				changeDisplayImages(false);
				changeDisplayVideos(false);
				changeDisplayBlogs(true);
				changeDisplayRegularPosts(false);	
			}
				changeIsLoadingReloadPostsTrigger(false);
		}else{
			alert('Unfortunately there has been an error getting this search result. Please try again');
		}
	}

	const fetchImagePosts=async(postCount)=>{
		debugger
		if(postType!="Images"){
			postCount=0;
			posts=[];
			changeFinisheLoadingState(false);
		}
		const searchCriteria={
			searchUrl:props.searchQuery,
			postType:"Images",
			userId,
			postCount
		}

		const {confirmation,data}=await getPostsFromSearch(searchCriteria);
		if(confirmation=="Success"){
			changeFinisheLoadingState(true);
			if(data.length==0){
				changeEndOfPostsIndicator(true);
			}else{
				changeEndOfPostsIndicator(false);
				changePostType("Images");
				posts=posts.concat(data);
				const finalPosts=addSuggestedSymposiums(posts);
				changePosts([...finalPosts]);

				changeDisplayImages(true);
				changeDisplayVideos(false);
				changeDisplayBlogs(false);
				changeDisplayRegularPosts(false);

			}
				changeIsLoadingReloadPostsTrigger(false);
		}else{
			alert('Unfortunately there has been an error getting this search result. Please try again');
		}
	}

	const fetchVideoPosts=async(postCount)=>{
		if(postType!="Videos"){
			postCount=0;
			posts=[];
			changeFinisheLoadingState(false);
		}
		const searchCriteria={
			searchUrl:props.searchQuery,
			postType:"Videos",
			userId,
			postCount
		}

		const {confirmation,data}=await getPostsFromSearch(searchCriteria);
		if(confirmation=="Success"){
			changeFinisheLoadingState(true);
			if(data.length==0){
				changeEndOfPostsIndicator(true);
			}else{
				changeEndOfPostsIndicator(false);
				changePostType("Videos");
				posts=posts.concat(data);
				const finalPosts=addSuggestedSymposiums(posts);
				changePosts([...finalPosts]);

				changeDisplayImages(false);
				changeDisplayVideos(true);
				changeDisplayBlogs(false);
				changeDisplayRegularPosts(false);

			}
				changeIsLoadingReloadPostsTrigger(false);
		}else{
			alert('Unfortunately there has been an error getting this search result. Please try again');
		}
	}

	const fetchRegularPosts=async(postCount)=>{
		if(postType!="RegularPosts"){
			postCount=0;
			posts=[];
			changeFinisheLoadingState(false);
		}
		const searchCriteria={
			searchUrl:props.searchQuery,
			postType:"RegularPosts",
			userId,
			postCount
		}

		const {confirmation,data}=await getPostsFromSearch(searchCriteria);
		if(confirmation=="Success"){
			changeFinisheLoadingState(true);
			if(data.length==0){
				changeEndOfPostsIndicator(true);
			}else{
				changeEndOfPostsIndicator(false);
				changePostType("RegularPosts");
				posts=posts.concat(data);
				const finalPosts=addSuggestedSymposiums(posts);
				changePosts([...finalPosts]);

				changeDisplayImages(false);
				changeDisplayVideos(false);
				changeDisplayBlogs(false);
				changeDisplayRegularPosts(true);
			}
				changeIsLoadingReloadPostsTrigger(false);
		}else{
			alert('Unfortunately there has been an error getting this search result. Please try again');
		}
	}

	const suggestedSymposiumsRecursive=(posts)=>{
		if(posts==null||posts.length==0){
			return posts;
		}else if(posts.length==1){
			return posts;
		}else{
			var randomNumber;
			if(posts.length<5){
				randomNumber=Math.floor(Math.random() * ((posts.length-1) - 1 + 1)) + 1;
			}else{
				randomNumber=Math.floor(Math.random() * (7 - 1 + 1)) + 1;
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
						_id={props.userId}
						confettiAnimation={props.displayRecruitConfetti}
						isPersonalProfile={props.isPersonalProfile}
						displaySymposium={props.displaySymposium}
						targetDom={"searchContainer"}
						isMobileUI={displayMobileUI==true?true:false}
						isLoadingReloadedPosts={isLoadingReloadedPosts}
						triggerReloadingPostsHandle={triggerReloadingPostsHandle}
						endOfPostsDBIndicator={endOfPostsDBIndicator}
					/>
		 }else if(displayVideos==true){ 
		 	return <VideoPostModal
						posts={posts}
						_id={props.userId}
						confettiAnimation={props.displayRecruitConfetti}
						isPersonalProfile={props.isPersonalProfile}
						displaySymposium={props.displaySymposium}
						targetDom={"searchContainer"}
						isMobileUI={displayMobileUI==true?true:false}
						isLoadingReloadedPosts={isLoadingReloadedPosts}
						triggerReloadingPostsHandle={triggerReloadingPostsHandle}
						endOfPostsDBIndicator={endOfPostsDBIndicator}
		 		   />
		 }else if(displayBlogs==true){
		 	return <BlogPostModal
						posts={posts}
						_id={props.userId}
						confettiAnimation={props.displayRecruitConfetti}
						isPersonalProfile={props.isPersonalProfile}
						displaySymposium={props.displaySymposium}
						targetDom={"searchContainer"}
						isMobileUI={displayMobileUI==true?true:false}
						isLoadingReloadedPosts={isLoadingReloadedPosts}
						triggerReloadingPostsHandle={triggerReloadingPostsHandle}
						endOfPostsDBIndicator={endOfPostsDBIndicator}
		 			/>
		 }else{
		 	return <RegularPostModal
						posts={posts}
						_id={props.userId}
						confettiAnimation={props.displayRecruitConfetti}
						isPersonalProfile={props.isPersonalProfile}
						displaySymposium={props.displaySymposium}
						targetDom={"searchContainer"}
						isMobileUI={displayMobileUI==true?true:false}
						isLoadingReloadedPosts={isLoadingReloadedPosts}
						triggerReloadingPostsHandle={triggerReloadingPostsHandle}
						endOfPostsDBIndicator={endOfPostsDBIndicator}
		 			/>
		 }
	}

	const triggerReloadingPostsHandle=()=>{ 
		const nextPostCount=postCount+1;
		changePostReloadTrigger(true);
		changeIsLoadingReloadPostsTrigger(true);
		changePostsCount(nextPostCount);
		
		if(postType=="Images"){
			fetchImagePosts(nextPostCount);
		}else if(postType=="Videos"){
			fetchVideoPosts(nextPostCount);
		}else if(postType=="Blogs"){
			fetchBlogPosts(nextPostCount);
		}else{
			fetchRegularPosts(nextPostCount)
		}
	}

	const triggerPostHandle=(postType)=>{
		changePostsCount(0);
		changePosts([]);
		changeCurrentSelectedPostType(postType);

		if(postType=="Images"){
			fetchImagePosts(0);
		}else if(postType=="Videos"){
			fetchVideoPosts(0);
		}else if(postType=="Blogs"){
			fetchBlogPosts(0);
		}else{
			fetchRegularPosts(0)
		}
	}

	return(
		<Container>
			<ul style={{padding:"0px"}}>
				<li id="postOptionsLI" style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginLeft:"10%"}}>
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
									<li onClick={()=>triggerPostHandle("Images")}><a href="javascript:;">Images</a></li>	
									<li onClick={()=>triggerPostHandle("Videos")}><a href="javascript:;">Videos</a></li>	
									<li onClick={()=>triggerPostHandle("Blogs")}><a href="javascript:;">Blogs</a></li>	
									<li onClick={()=>triggerPostHandle("RegularPosts")}><a href="javascript:;">Posts</a></li>			
								</ul>
							</div>
						</li>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",color:"#5298F8"}}>
							{currentSelectedPostType}
						</li>
						{/*
							<li style={PostButton}>
								Request a post
							</li>
						*/}
					</ul>
				</li>
				<hr/>
				<PostsContainer>
					<Posts>
						<ul>
							{isFinishedLoading==true?
								<>
									{constructPostsResponse()}
								</>:<LoadingScreen/>
							}
						</ul>
					</Posts>
				</PostsContainer>
			</ul>
		</Container>
	)
}

export default PostSearch;