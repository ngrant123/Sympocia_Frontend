import React,{useState,useEffect,useMemo} from "react";
import styled from "styled-components";
import SearchIcon from '@material-ui/icons/Search';
import ImagePosts from "./ImagePosts/ImagePostContainer.js";
import VideoPosts from "./VideoPosts/VideoPostContainer.js";
import BlogsPosts from "./BlogPosts/BlogPostsContainer.js";
import RegularPost from "./RegularPosts/RegularPostContainer.js";
import Dropdown from 'react-bootstrap/Dropdown';

import {UserConsumer} from "../../UserContext.js";
import {PostProvider} from "./PostsContext.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import FriendsGauge from "../FriendsGaugeSection/FriendsGauge.js";
import PostCreationPortal from "../../PersonalProfileSet/Modals-Portals/PostCreationPortal.js";

import {
		getRegularPostFromUser,
		getVideosFromUser,
		getUserImages,
		getBlogFromUser
} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

import {
	editPostIndexContext,
	removePostIndexContext,
	updateImagePostIndexContext,
	updateVideoPostIndexContext,
	updateRegularPostIndexContext
} from "./ContextActions.js";
import {RecruitButton} from "../PersonalDetails/PersonalInformation.js";
import {PhonePersonalInformationHeader} from "../../PersonalProfileSet/MobileUI.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import GuestLockScreenHOC from "../../../../GeneralComponents/PostComponent/GuestLockScreenHOC.js";
import {searchSymposiumsFilter} from "../../../../../Actions/Tasks/Search/SearchSymposiums.js";
import {searchPostsFilter} from "../../../../../Actions/Tasks/Search/SearchPosts.js";


const PostCreationContainer=styled.div`
	position:relative;
	background-color:blue;
	height:40%;
	left:1%;
	width:85%;
	box-shadow: 10px 10px 20px 	#dbdddf;
	transition:.8s;		
	border-radius:5px;
	overflow:hidden;
	margin-bottom:5%;

	&:hover{
		box-shadow: 10px 10px 20px 	#9395a0;
	}
`;


const CommentCreationContainer=styled.div`
	position:relative;
	width:190%;
	height:7%;
	top:0%;
	background-color:white;
	border-radius:10px;
	border-style:noe;
	box-shadow: 1px 1px 5px 	#9395a0;

`;


const ProfilePicture=styled.div`
	position:relative;
	width:45px;
	height:87%;
	background-color:red;
	border-radius:50%;

`;

const CommentTextArea=styled.textarea`
	resize:none;
	border-style:none;
	height:90%;
	text-align:center;
	padding-top:10px;
`;

const SearchPostsTextArea=styled.textarea`
	position:relative;
	width:120%;
	resize:none;
	height:5%;
	border-radius:5px;
	border-style:none;
	  border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:10%;
    }
`;


const Container1=styled.div`
	position:absolute;
	width:95%;
	height:80%;
	background-color:red;
`;


const Container2=styled.div`
	position:relative;
	width:20%;
	height:20%;
	background-color:yellow;


`;

const Container3=styled.div`
	position:absolute;
	width:20%;
	height:20%;
	background-color:blue;


`;

const Container4=styled.div`
	position:absolute;
	width:20%;
	height:20%;
	background-color:green;

`;

const PostCreation=styled.div`
	z-index:4;
`;

const ShadowContainer= styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:35;
`;

const listCSSButton={	
	listStyle:"none",
	display:"inline-block",
	padding:"5px",
	borderRadius:"5px",
	marginLeft:"2%"
}


const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none"
}

/*
Later down the road this whole post section has to be refactored completely 
because at this point it getting too crazy and sphagetti like 

Naw i need to redo this now like this shit awful lol
*/

const PersonalPostsIndex=(props)=>{

	const [displayImages,changeDisplayForImages]=useState(true);
	const [displayVideos,changeDisplayForVideos]=useState(false);
	const [displayBlogs,changeDisplayForBlogs]=useState(false);
	const [displayRegularPosts,changeDisplayForRegularPosts]=useState(false);
	const personalRedux=useSelector(state=>state.personalInformation);
	const [currentPostType,changeCurrentPostType]=useState("image");
	const [currentPostCounter,changeCurrentPostCounter]=useState(0);
	const [isLoadingNewPosts,changeIsLoadingNewPosts]=useState(false);
	const dispatch=useDispatch();
	const [isLoadingReloadedPosts,changeIsLoadingReloadedPosts]=useState(false);
	const [endOfPostsDBIndicator,changeEndOfPostsDBIndicator]=useState(false);
	const [isFilteredPostsActivated,changeIsFilteredPosts]=useState(false);
	const [isSearchFilterActivated,changeIsSearchFilterActivated]=useState(false);

	let [regularPost,changeRegularPost]=useState({
		headerPost:null,
		posts:[]
	})

	const [displayCreationPost,changeDisplayCreationPost]=useState(false);
	const [postOption,changePostOption]=useState();
	const [personalInformation,changePersonalInformation]=useState(props.personalInformation);

	let [imagePost,changeImagePost]=useState({
			crownedImage:props.personalInformation.crownedPost,
			images:props.personalInformation.imagePost
	});

	let [videoPost,changeVideoPosts]=useState({
		headerVideo:null,
		videos:[]
	});

	let [blogPost,changeBlogPosts]=useState({
		headerBlog:null,
		blogs:[]
	});
	const [isLoadingIndicatorImages,changeImagesLoadingIndicator]=useState(false);
	const [isLoadingIndicatorVideos,changeVideosLoadingIndicator]=useState(true);
	const [isLoadingIndicatorRegularPost,changeRegularPostsLoadingIndicator]=useState(true);
	const [isLoadingIndicatorBlogPost,changeBlogPostsLoadingIndicator]=useState(true);

	useEffect(()=>{
		if(props.personalInformation.isLoading!=true){
			const image=document.getElementById("images");
			image.style.color="#C8B0F4";
			image.style.borderBottom="solid";
			image.style.borderColor="#C8B0F4";
		}
	},[]);

	/*
		Could be implemented in a better way
	*/

	const unSelectButtonsCSS=()=>{
		if(props.isGuestVisitorProfile==false){
			const image=document.getElementById("images");
			image.style.color="#bebebf";
			image.style.borderStyle="none";

			const blogs=document.getElementById("blogs");
			blogs.style.color="#bebebf";
			blogs.style.borderStyle="none";


			const videos=document.getElementById("videos");
			videos.style.color="#bebebf";
			videos.style.borderStyle="none";


			const regularPost=document.getElementById("regularPosts");
			regularPost.style.color="#bebebf";
			regularPost.style.borderStyle="none";
		}
	}

// Should be refactored in the future everytime i look at it i want to kill myself

	const handlePostsClick=async({kindOfPost,id,isAccessTokenUpdated,updatedAccessToken,postCounter})=>{
			changeDisplayForImages(false);
			changeDisplayForBlogs(false);
			changeDisplayForVideos(false);
			changeDisplayForRegularPosts(false);
			changeIsLoadingReloadedPosts(true);
			unSelectButtonsCSS();
			

		if(kindOfPost=="image"){
			const image=document.getElementById("images");
			image.style.color="#C8B0F4";
			image.style.borderBottom="solid";
			image.style.borderColor="#C8B0F4";
			changeCurrentPostType("image");
			changeDisplayForImages(true);
			changeVideoPosts({...videoPost,videos:[]})
			changeBlogPosts({...blogPost,blogs:[]})
			changeRegularPost({...regularPost,posts:[]})
			const {confirmation,data}=await getUserImages({
											userId:id,
											visitorId:props.visitorId,
											postCount:postCounter==null?0:postCounter,
											accessToken:isAccessTokenUpdated==true?updatedAccessToken:
											personalRedux.accessToken,
											isGuestProfile:props.isGuestVisitorProfile
										});
			
			if(confirmation=="Success"){
				const {crownedPost,posts}=data;
				if(posts.length==0 && crownedPost==null){
					changeEndOfPostsDBIndicator(true);
				}else{
					let {images}=imagePost;
					images=(isFilteredPostsActivated==true || isSearchFilterActivated==true)?[]:images;
					const newImages=images.concat(posts);
					imagePost={
						...imagePost,
						images:newImages
					}
					changeImagePost(imagePost);
					changeIsLoadingNewPosts(false)
				}
			}else{
				
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalRedux.refreshToken,
							personalRedux.id,
							handlePostsClick,
							dispatch,
							{
								kindOfPost,
								id
							},
							false
						);
				}else{
					alert('Unfortunately there has been an error getting images. Please try again');
				}
			}
			changeImagesLoadingIndicator(false);
		}else if(kindOfPost=="video"){
			const videos=document.getElementById("videos");
			videos.style.color="#C8B0F4";
			videos.style.borderBottom="solid";
			videos.style.borderColor="#C8B0F4";
			changeDisplayForVideos(true); 
			changeCurrentPostType("video");
			changeImagePost({...imagePost,images:[]});
			changeBlogPosts({...blogPost,blogs:[]})
			changeRegularPost({...regularPost,posts:[]})

			const {confirmation,data}=await getVideosFromUser({
												userId:id,
												visitorId:props.visitorId,
												postCount:postCounter==null?0:postCounter,
												accessToken:isAccessTokenUpdated==true?updatedAccessToken:
												personalRedux.accessToken
											});
			debugger;
			console.log(data);
			if(confirmation=="Success"){
				const {crownedPost,posts}=data;
				if(posts.length==0 && crownedPost==null){
					changeEndOfPostsDBIndicator(true);
				}else{
					let {videos}=videoPost;
					videos=(isFilteredPostsActivated==true || isSearchFilterActivated==true)?[]:videos;
					const newVideos=videos.concat(posts);
					
					const videoObject={
						headerVideo:crownedPost==null?videoPost.headerVideo:crownedPost,
						videos:newVideos
					}
					changeVideoPosts(videoObject);
				}
				changeVideosLoadingIndicator(false);
			}else{
				
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalRedux.refreshToken,
							personalRedux.id,
							handlePostsClick,
							dispatch,
							{
								kindOfPost,
								id
							},
							false
						);
				}else{
					alert('Unfortunately there has been an error getting videos. Please try again');
				}
			}
		}else if(kindOfPost=="blog"){
			changeDisplayForBlogs(true);
			changeCurrentPostType("blog");
			const blogDiv=document.getElementById("blogs");
			blogDiv.style.color="#C8B0F4";
			blogDiv.style.borderBottom="solid";
			blogDiv.style.borderColor="#C8B0F4";

			const {	confirmation,data}=await getBlogFromUser({
												userId:id,
												visitorId:props.visitorId,
												postCount:postCounter==null?0:postCounter,
												accessToken:isAccessTokenUpdated==true?updatedAccessToken:
												personalRedux.accessToken
											});
			if(confirmation=="Success"){
				const {crownedPost,posts}=data;

				changeBlogPostsLoadingIndicator(false);
				if(posts.length==0 && crownedPost==null){
					changeEndOfPostsDBIndicator(true);
				}else{

					let {blogs}=blogPost;
					blogs=(isFilteredPostsActivated==true || isSearchFilterActivated==true)?[]:blogs;
					const newBlogs=blogs.concat(posts);
					const blogObject={
						headerBlog:crownedPost==null?blogPost.headerBlog:crownedPost,
						blogs:newBlogs
					}
							
					changeBlogPosts(blogObject);
					changeDisplayForBlogs(true);
				}
			}else{
				
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalRedux.refreshToken,
							personalRedux.id,
							handlePostsClick,
							dispatch,
							{
								kindOfPost,
								id
							},
							false
						);
				}else{
					alert('Unfortunately there has been an error getting these blog posts. Please try again');
				}
			}
			changeImagePost({...imagePost,images:[]});
			changeVideoPosts({...videoPost,videos:[]})
			changeRegularPost({...regularPost,posts:[]})
		}else{
			changeDisplayForRegularPosts(true);
			changeCurrentPostType("regularPost");
			changeBlogPosts({...blogPost,blogs:[]});
			changeImagePost({...imagePost,images:[]});
			changeVideoPosts({...videoPost,videos:[]})
			const regularPostDiv=document.getElementById("regularPosts");
			regularPostDiv.style.color="#C8B0F4";
			regularPostDiv.style.borderBottom="solid";
			regularPostDiv.style.borderColor="#C8B0F4";


			const {confirmation,data}=await getRegularPostFromUser({
												userId:id,
												visitorId:props.visitorId,
												postCount:postCounter==null?0:postCounter,
												accessToken:isAccessTokenUpdated==true?updatedAccessToken:
												personalRedux.accessToken
											});
			if(confirmation=="Success"){	
				const {crownedPost}=data;
				const postsResponse=data.posts;
				if(postsResponse.length==0 && crownedPost==null){
					changeEndOfPostsDBIndicator(true);
				}else{
					let {posts}=regularPost;
					posts=(isFilteredPostsActivated==true || isSearchFilterActivated==true)?[]:posts;
					const newRegularPosts=posts.concat(postsResponse);
					const regularPostObject={
						headerPost:crownedPost==null?regularPost.headerPost:crownedPost,
						posts:newRegularPosts
					}
		
					changeRegularPost(regularPostObject);
					changeDisplayForRegularPosts(true);
				}
					changeRegularPostsLoadingIndicator(false);
					changeIsLoadingNewPosts(false)
			}else{
				
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalRedux.refreshToken,
							personalRedux.id,
							handlePostsClick,
							dispatch,
							{
								kindOfPost,
								id
							},
							false
						);
				}else{
					alert('Unfortunately there has been an error getting regular posts. Please try again');
				}
			}
		}
		changeIsFilteredPosts(false);
		changeIsSearchFilterActivated(false);
		changeIsLoadingReloadedPosts(false);
		
	}

	const closeModal=()=>{
		changeDisplayCreationPost(false);
		changePostOption("General");
		props.closeModal();
	}

	const displayCreationPostContainer=()=>{
		return displayCreationPost==true ||props.displayCreationPortal==true?
			<PostCreationPortal
				postOption={postOption}
				closeModal={closeModal}
				isPhoneUIEnabled={props.uiStatus.displayPhoneUI}
			/>:null;
	}

	const displayOrHideCreationPost=()=>{

		if(displayCreationPost==false){
			props.displayShadowOverlay();
		}
		changeDisplayCreationPost(true);
	}

	const disappearShadowOverlay=()=>{
		props.disappearShadow();
		changeDisplayCreationPost(!displayCreationPost);
	}

	const displayCreatePostAndShadowOverlay=(personalInformation)=>{
		if(personalInformation.displayShadowBackground==false){
				changeDisplayCreationPost(false);
		}
	}
	const mobilePostSelectionAndRecruitUI=(personalInformation)=>{
		return (
			<li  style={{listStyle:"none",marginLeft:"-5%"}}>
				<ul style={{padding:"0px"}}>
					<li id="mobilePhonePostOption" style={{marginLeft:"25%",listStyle:"none",display:"inline-block",marginRight:"5%"}}>
						<div class="dropdown">
							<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
								style={ShadowButtonCSS}>
									Post Type
							   		<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li onClick={()=>triggerPostDecider("image",props.personalInformation._id,0)} style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>
									<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
										Images
									</a>
								</li>
								{(props.isGuestProfile==false && props.isGuestVisitorProfile==false) &&(
									<React.Fragment>
										<li onClick={()=>triggerPostDecider("video",props.personalInformation._id,0)} style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>

											<a id="videos" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
												Videos
											</a>
										</li>

										<li onClick={()=>triggerPostDecider("regularPost",props.personalInformation._id,0)} style={{listStyle:"none",fontSize:"17px",padding:"10px",color:"#bebebf"}}>

											<a id="regularPosts" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
												Regular Posts
											</a>
										</li>


										<li onClick={()=>triggerPostDecider("blog",props.personalInformation._id,0)} style={{listStyle:"none",fontSize:"17px",padding:"10px",color:"#bebebf"}}>

											<a id="blogs" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
												Blogs
											</a>
										</li>
									</React.Fragment>
								)}
							</ul>
						</div>
					</li>
					<li style={{listStyle:"none",display:"inline-block"}}>
						<RecruitButton
							personalInformation={{
								_id:personalInformation._id,
								isGuestProfile:personalInformation.isGuestProfile,
								isOwnProfile:personalInformation.isOwnProfile,
								firstName:personalInformation.firstName,
								socialMediaUrls:{
									instagramUrl:"",
									tikTokUrl:""
								},
								isGuestVisitorProfile:personalInformation.isGuestVisitorProfile,
								recruits:personalInformation.recruits
							}}
							displayConfettiHandle={personalInformation.displayConfettiHandle}
							userId={personalRedux.id}
						/>
					</li>
				</ul>
				<hr/>
			</li>
		)
	}


	const handleTriggerPostReload=()=>{
		const nextCounter=currentPostCounter+1;
		changeCurrentPostCounter(nextCounter);
		changeIsLoadingNewPosts(true);
		handlePostsClick({
			kindOfPost:currentPostType,
			id:props.personalInformation._id,
			isAccessTokenUpdated:false,
			postCounter:nextCounter,
			isLoadingNewPosts:true
		})
	}

	const triggerPostDecider=(postType,profileId,counter)=>{
		if(postType!=currentPostType || isFilteredPostsActivated==true || isSearchFilterActivated==true){
			switch(postType){
				case 'image':{
					changeImagesLoadingIndicator(true)
					break;
				}
				case 'video':{
					changeVideosLoadingIndicator(true);
					break;
				}
				case 'blog':{
					changeBlogPostsLoadingIndicator(true);
					break;
				}
				default:{
					changeRegularPostsLoadingIndicator(true);
					break;
				}
			}
			changeEndOfPostsDBIndicator(false);
			changeCurrentPostCounter(0);
			handlePostsClick({
				kindOfPost:postType,
				id:profileId,
				isAccessTokenUpdated:false,
				postCounter:0,
				isLoadingNewPosts:true
			})
		}
	}

	const retrievedCurrentDisplayedPosts=()=>{
		let displayedPosts;
		if(currentPostType=="image"){
			displayedPosts=imagePost.images;
		}else if(currentPostType=="video"){
			displayedPosts=videoPost.videos;
		}else if(currentPostType=="blog"){
			displayedPosts=blogPost.blogs;
		}else{
			displayedPosts=regularPost.posts;
		}
		return displayedPosts;
	}
	const selectedPostSymposiums=()=>{
		let displayedPosts=retrievedCurrentDisplayedPosts();
		const postSelectedSymposiums=[];
		const isSymposiumsContained=new Map();

		for(var i=0;i<displayedPosts.length;i++){
			const symposiums=displayedPosts[i].industriesUploaded;
			for(var j=0;j<symposiums.length;j++){
				const selectedSymposium=symposiums[j].industry;
				if(isSymposiumsContained.get(selectedSymposium)==null){
					isSymposiumsContained.set(selectedSymposium,1);
					postSelectedSymposiums.push(selectedSymposium);
				}
			}
		}

		return (
			<ul class="dropdown-menu">
				<li style={{cursor:"pointer"}} 
					onClick={()=>triggerPostDecider(currentPostType,props.personalInformation._id,0)}>
					<a>Clear Filter</a>
				</li>
				<hr/>
				{postSelectedSymposiums.map(data=>
					<li style={{cursor:"pointer"}}>
						<a onClick={()=>triggerSymposiumsPostFilters(data)}>{data}</a>
					</li>
				)}
			</ul>
		)
	}


	const triggerSymposiumsPostFilters=(filteredInput)=>{
		let displayedPosts=retrievedCurrentDisplayedPosts();
		changeIsFilteredPosts(true);
		const filteredPosts=searchSymposiumsFilter(filteredInput,displayedPosts);
		switch(currentPostType){
			case 'image':{
				const filteredImagePosts={
					...imagePost,
					images:filteredPosts
				}
				changeImagePost(filteredImagePosts);
			}

			case 'video':{

				const filteredVideoPosts={
					...videoPost,
					videos:filteredPosts
				}
				changeVideoPosts(filteredVideoPosts);
			}
			case 'blog':{
				const filteredBlogPosts={
					...blogPost,
					blogs:filteredPosts
				}
				changeBlogPosts(filteredBlogPosts);
			}

			case 'regularPost':{
				const filteredRegularPosts={
					...regularPost,
					posts:filteredPosts
				}
				changeRegularPost(filteredRegularPosts);
			}
		}

	}

	const searchPromptTrigger=(event)=>{
		const textAreaValue=document.getElementById("searchPostTextArea").value;
		const keyEntered=event.key;
		const currentSelectedPosts=retrievedCurrentDisplayedPosts();
		if(keyEntered=="Enter"){
			changeIsSearchFilterActivated(true);
			event.preventDefault();
			if(textAreaValue==""){
				triggerPostDecider(currentPostType,props.personalInformation._id,0)
			}else{
				const posts=searchPostsFilter(currentSelectedPosts,textAreaValue,currentPostType);
				switch(currentPostType){
					case 'image':{
						const filteredImagePosts={
							...imagePost,
							images:posts
						}
						changeImagePost(filteredImagePosts);
					}

					case 'video':{

						const filteredVideoPosts={
							...videoPost,
							videos:posts
						}
						changeVideoPosts(filteredVideoPosts);
					}
					case 'blog':{
						const filteredBlogPosts={
							...blogPost,
							blogs:posts
						}
						changeBlogPosts(filteredBlogPosts);
					}

					case 'regularPost':{
						const filteredRegularPosts={
							...regularPost,
							posts:posts
						}
						changeRegularPost(filteredRegularPosts);
					}
				}
			}
		}
	}

	const postsDisplaySystem=()=>{
		return <div id="postCollectionContainer">
				{
					displayImages==true?
					<ImagePosts
						imageData={imagePost}
						isLoading={isLoadingIndicatorImages}
						profile="Personal"
					/>:<React.Fragment></React.Fragment>
				}
				{
					displayVideos==true?
					<VideoPosts
						videos={videoPost}
						isLoadingIndicatorVideos={isLoadingIndicatorVideos}
						id={personalInformation._id}
						postCounter={currentPostCounter}
						handleVideoPostModal={props.handleVideoPostModal}
					/>:<React.Fragment></React.Fragment>
				}
				{
					displayBlogs==true?
					<BlogsPosts
						blogData={blogPost}
						isLoadingIndicatorBlogPost={isLoadingIndicatorBlogPost}
						id={personalInformation._id}
						friendsNodes={props.personalInformation.friendsGaugeNodes}
					/>:<React.Fragment></React.Fragment>
				}
				{
					displayRegularPosts==true?
					<RegularPost
						id={props.personalInformation._id}
						posts={regularPost}
						isLoadingIndicatorRegularPost={isLoadingIndicatorRegularPost}
						profilePicture={props.personalInformation.profilePicture}
						profile="Personal"
					/>:<React.Fragment></React.Fragment>
				}
			</div>
	}
	return (
			<PostProvider
				value={{
					isSearchFilterActivated,
					isFilteredPostsActivated,
					isLoadingReloadedPosts,
					endOfPostsDBIndicator,
					updatePostComponent:(postOption)=>{
						changePostOption(postOption);
						changeDisplayCreationPost(true);
					},
					hideCreationPost:()=>{
						props.disappearShadow();
						changeDisplayCreationPost(false)
					},
					updateImagePost:(imageData)=>{
						
						if(displayImages==true){
							let newImageObject=updateImagePostIndexContext(imageData,imagePost);
							changeImagePost(newImageObject);
						}
						changeDisplayCreationPost(false);
						props.closeModal();
					},
					updateVideoPost:(videoObject)=>{
						
						if(displayVideos==true){
							let newVideoObject=updateVideoPostIndexContext(videoObject,videoPost);
							changeVideoPosts(newVideoObject);							
						}
						changeDisplayCreationPost(false);
						props.closeModal();
					},
					updateRegularPost:(regularPostProp)=>{
						const {isCrownedPost,post}=regularPostProp;
						if(displayRegularPosts){
							let newPostObject=updateRegularPostIndexContext(
								regularPostProp,
								regularPost
							);
							changeRegularPost(newPostObject);
						}
						changeDisplayCreationPost(false);
						props.closeModal();
					},
					editPost:(postData)=>{
						const {postType}=postData;
						let propData;
						let stateCallBackFunction;
						switch(postType){
							case 'Images':{
								propData=imagePost;
								stateCallBackFunction=changeImagePost;
								break;
							}

							case 'Videos':{
								propData=videoPost;
								stateCallBackFunction=changeVideoPosts;
								break;
							}

							case 'RegularPosts':{
								propData=regularPost;
								stateCallBackFunction=changeRegularPost;
								break;
							}
						}

						let result =editPostIndexContext(postData,propData);
						stateCallBackFunction(result);
						props.closeModal();
					},
					removePost:(postId,postType)=>{
						let propData;
						let stateCallBackFunction;
						debugger;
						switch(postType){
							case 'Images':{
								propData=imagePost;
								stateCallBackFunction=changeImagePost;
								break;
							}

							case 'Videos':{
								propData=videoPost;
								stateCallBackFunction=changeVideoPosts;
								break;
							}

							case 'RegularPosts':{
								propData=regularPost;
								stateCallBackFunction=changeRegularPost;
								break;
							}
						}
						console.log(videoPost);
						let result=removePostIndexContext(postId,propData,postType);
						stateCallBackFunction(result);
						props.closeModal();
					},
					fetchNextPosts:()=>{
						handleTriggerPostReload();
					}
				}}
			>
			{props.personalInformation.isLoading==true?null:
				<>
				<ul>
					<hr/>
					{displayCreationPostContainer()}
					<li id="postsContainer" style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							{props.uiStatus.displayPhoneUI==true? 
								<>{mobilePostSelectionAndRecruitUI(props.personalInformation)}</>:
								<li style={{listStyle:"none",marginBottom:"20px"}}>
									<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														<SearchIcon
															style={{fontSize:40}}
														/>
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														<SearchPostsTextArea
															id="searchPostTextArea"
															onKeyPress={e=>searchPromptTrigger(e)}
															placeholder="Search for any posts here"
														/>
													</li>
												</ul>
											</li>

										<li onClick={()=>triggerPostDecider("image",props.personalInformation._id,0)} 
											style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px"}}>
											<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
												Images
											</a>
										</li>

										{(props.isGuestProfile==false && props.isGuestVisitorProfile==false) && (
											<React.Fragment>
												<li onClick={()=>triggerPostDecider("video",props.personalInformation._id,0)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px"}}>

													<a id="videos" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
														Videos
													</a>
												</li>


												<li onClick={()=>triggerPostDecider("regularPost",props.personalInformation._id,0)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>

													<a id="regularPosts" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
														Regular Posts
													</a>
												</li>

												<li onClick={()=>triggerPostDecider("blog",props.personalInformation._id,0)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>

													<a id="blogs" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
														Blogs
													</a>
												</li>
											</React.Fragment>
										)}

										<li style={listCSSButton}>
											<div class="dropdown">
													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														Symposiums
													   	<span class="caret"></span>
													</button>
													{selectedPostSymposiums()}
							  				 </div>
										</li>

										{/*
											<li style={listCSSButton}>	

												<div class="dropdown">
														<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																				borderColor:"#5298F8",
																																				borderStyle:"solid",
																																				borderWidth:"1px",
																																				color:"#5298F8",
																																				backgroundColor:"white"}}>
															Sort By
														   	<span class="caret"></span>
														</button>
														<ul class="dropdown-menu">
															<li><a href="">Most Popular</a></li>
															<li><a href="">Most Recent</a></li>
														</ul>
								  				 </div>
								  			</li>

										*/}
									</ul>
								</li>
							}
							{postsDisplaySystem()}
						</ul>
					</li>
				</ul>
				</>
			}
			</PostProvider>
	)
}

export default PersonalPostsIndex;