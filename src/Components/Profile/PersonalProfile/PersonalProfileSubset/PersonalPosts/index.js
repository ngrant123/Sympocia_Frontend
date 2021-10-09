import React,{useState,useEffect} from "react";
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
import {
	searchSymposiumsFilter,
	initializeSymposiums
} from "../../../../../Actions/Tasks/Search/SearchSymposiums.js";
import {getProfilePostsSearch} from "../../../../../Actions/Requests/SearchPageAxiosRequests/index.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


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
	height:35px;
	resize:none;
	padding:10px;
	border-radius:5px;
	border-style:solid;
	border-color:#E5E5E5;
	overflow:hidden;
	border-width:1px;

    resize: none; /*remove the resize handle on the bottom right*/
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:40px;
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

const PostOptionsAndSearchContainer=styled.div`
	${({displayExtendedSearchTextArea})=>
		displayExtendedSearchTextArea==true?
			`
				display:flex;
				flex-direction:column;
			`:
			`
				display:flex;
				flex-direction:row;
			`
	}
	@media screen and (min-width:2500px){
	    #images{
	    	font-size:24px !important;
	    }
	    #videos{
	    	font-size:24px !important;
	    }
	    #regularPosts{
	    	font-size:24px !important;
	    }
	    #blogs{
	    	font-size:24px !important;
	    }
	    #symposiumsDropDown{
	    	font-size:24px !important;
	    }
  	}
  

	@media screen and (max-width:1370px){
		#postOptionsAndSearchDiv{
			margin-bottom:5% !important;
		}
	}
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

const SymposiumDropDownCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
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
	const [displayExtendedSearchTextArea,changeDisplayExtendedTextArea]=useState(false);
	const [currentRequestedFriendsGaugeNodeId,changeRequestedFriendsGaugeLevelId]=useState(
		props.currentRequestedFriendsGaugeNodeId);
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
	const [friendsColorNodesMap,changeFriendsColorNodesMapping]=useState(new Map());

	useEffect(()=>{
		triggerPostDecider(
			currentPostType,
			props.personalInformation._id,
			0,
			props.currentRequestedFriendsGaugeNodeId=="General"?null:
			props.currentRequestedFriendsGaugeNodeId);
	},[props.currentRequestedFriendsGaugeNodeId]);

	useEffect(()=>{
		if(props.personalInformation.isLoading!=true){
			const image=document.getElementById("images");
			image.style.color="#C8B0F4";
			image.style.borderBottom="solid";
			image.style.borderColor="#C8B0F4";
		}
		const nodes=props.personalInformation.friendsGaugeNodes;
		const currentMapping=new Map();
		for(var i=0;i<nodes.length;i++){
			currentMapping.set(nodes[i]._id.toString(),nodes[i].colorCode);
		}
		changeFriendsColorNodesMapping(currentMapping);
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

	const handlePostsClick=async({
		kindOfPost,
		id,
		isAccessTokenUpdated,
		updatedAccessToken,
		postCounter,
		requestedFriendsGaugeNodeId})=>{

		changeIsLoadingReloadedPosts(true);
		unSelectButtonsCSS();
		const postFetchRequest={
			userId:id,
			visitorId:props.visitorId,
			postCount:postCounter==null?0:postCounter,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
			personalRedux.accessToken,
			isGuestProfile:props.isGuestVisitorProfile,
			requestedFriendsGaugeNodeId:
				(props.currentRequestedFriendsGaugeNodeId=="General" || requestedFriendsGaugeNodeId=="General")==true?null
				:props.currentRequestedFriendsGaugeNodeId
		}

		if(kindOfPost=="image"){
			const image=document.getElementById("images");
			image.style.color="#C8B0F4";
			image.style.borderBottom="solid";
			image.style.borderColor="#C8B0F4";
			changeCurrentPostType("image");

			const {confirmation,data}=await getUserImages(postFetchRequest);
			
			if(confirmation=="Success"){
				const {crownedPost,posts}=data;
				if(posts.length==0 && crownedPost==null){
					if(currentRequestedFriendsGaugeNodeId!=props.currentRequestedFriendsGaugeNodeId){
						const imagePost={
							...imagePost,
							crownedImage:null,
							images:[]
						}
						changeImagePost(imagePost);
					}
					changeEndOfPostsDBIndicator(true);
				}else{
					let {
						images,
						crownedImage
					}=imagePost;
					images=(isFilteredPostsActivated==true || isSearchFilterActivated==true)?[]:images;
					const newImages=postCounter==0?posts:images.concat(posts);
					imagePost={
						...imagePost,
						crownedImage:crownedPost,
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
			changeCurrentPostType("video");

			const {confirmation,data}=await getVideosFromUser(postFetchRequest);
			if(confirmation=="Success"){
				const {crownedPost,posts}=data;
				if(posts.length==0 && crownedPost==null){
					if(currentRequestedFriendsGaugeNodeId!=props.currentRequestedFriendsGaugeNodeId){
						const videoObject={
							headerVideo:null,
							videos:[]
						}
						changeVideoPosts(videoObject);
					}

					changeEndOfPostsDBIndicator(true);
				}else{
					let {videos}=videoPost;
					videos=(isFilteredPostsActivated==true || isSearchFilterActivated==true)?[]:videos;
					const newVideos=postCounter==0?posts:videos.concat(posts);
					
					const videoObject={
						headerVideo:crownedPost==null?videoPost.headerVideo:crownedPost,
						videos:[...newVideos]
					}
					changeVideoPosts({...videoObject});
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
			changeCurrentPostType("blog");
			const blogDiv=document.getElementById("blogs");
			blogDiv.style.color="#C8B0F4";
			blogDiv.style.borderBottom="solid";
			blogDiv.style.borderColor="#C8B0F4";

			const {	confirmation,data}=await getBlogFromUser(postFetchRequest);
			if(confirmation=="Success"){
				const {crownedPost,posts}=data;

				changeBlogPostsLoadingIndicator(false);
				if(posts.length==0 && crownedPost==null){
					if(currentRequestedFriendsGaugeNodeId!=props.currentRequestedFriendsGaugeNodeId){
						const blogObject={
							headerBlog:null,
							blogs:[]
						}
						changeBlogPosts(blogObject);
					}
					changeEndOfPostsDBIndicator(true);
				}else{

					let {blogs}=blogPost;
					blogs=(isFilteredPostsActivated==true || isSearchFilterActivated==true)?[]:blogs;
					const newBlogs=postCounter==0?posts:blogs.concat(posts);
					const blogObject={
						headerBlog:crownedPost==null?blogPost.headerBlog:crownedPost,
						blogs:newBlogs
					}
							
					changeBlogPosts(blogObject);
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
			
		}else{
			changeCurrentPostType("regularPost");

			const regularPostDiv=document.getElementById("regularPosts");
			regularPostDiv.style.color="#C8B0F4";
			regularPostDiv.style.borderBottom="solid";
			regularPostDiv.style.borderColor="#C8B0F4";


			const {confirmation,data}=await getRegularPostFromUser(postFetchRequest);
			if(confirmation=="Success"){	
				const {crownedPost}=data;
				const postsResponse=data.posts;
				if(postsResponse.length==0 && crownedPost==null){
					if(currentRequestedFriendsGaugeNodeId!=props.currentRequestedFriendsGaugeNodeId){
						const regularPostObject={
							headerPost:null,
							posts:[]
						}
						changeRegularPost(regularPostObject);
					}
					changeEndOfPostsDBIndicator(true);
				}else{
					let {posts}=regularPost;
					posts=(isFilteredPostsActivated==true || isSearchFilterActivated==true)?[]:posts;
					const newRegularPosts=postCounter==0?postsResponse:posts.concat(postsResponse);
					const regularPostObject={
						headerPost:crownedPost==null?regularPost.headerPost:crownedPost,
						posts:newRegularPosts
					}
					changeRegularPost(regularPostObject);
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
			<div id="postSelectionAndRecruitDiv" style={{display:"flex",flexDirection:"row"}}>
				<div class="dropdown" id="mobilePhonePostOption"
				 	style={{marginLeft:"25%",listStyle:"none",display:"inline-block",marginRight:"5%"}}>
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
						style={ShadowButtonCSS}>
							Post Type <span class="caret"></span>
					</button>
					<ul class="dropdown-menu">
						{postOptions()}
					</ul>
				</div>
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
			</div>
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

	const triggerPostDecider=(postType,profileId,counter,requestedFriendsGaugeNodeId)=>{
		if(postType!=currentPostType || isFilteredPostsActivated==true || isSearchFilterActivated==true
			|| props.currentRequestedFriendsGaugeNodeId!=currentRequestedFriendsGaugeNodeId){
			if(postType!=currentPostType)
				changeRequestedFriendsGaugeLevelId(null);
			changeRequestedFriendsGaugeLevelId(requestedFriendsGaugeNodeId);
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
				isLoadingNewPosts:true,
				requestedFriendsGaugeNodeId
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
		const postSelectedSymposiums=initializeSymposiums(
										retrievedCurrentDisplayedPosts
									);

		return (
			<ul class="dropdown-menu">
				<li id="symposiumsDropDown" style={{cursor:"pointer"}} 
					onClick={()=>triggerPostDecider(currentPostType,props.personalInformation._id,0)}>
					<a>Clear Filter</a>
				</li>
				<hr/>
				{postSelectedSymposiums.map(data=>
					<li id="symposiumsDropDown" style={{cursor:"pointer"}}>
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

	const searchPromptTrigger=async(event)=>{
		const textAreaValue=document.getElementById("searchPostTextArea").value;
		const keyEntered=event.key;
		const currentSelectedPosts=retrievedCurrentDisplayedPosts();
		if(keyEntered=="Enter"){
			changeIsSearchFilterActivated(true);
			event.preventDefault();
			if(textAreaValue==""){
				triggerPostDecider(currentPostType,props.personalInformation._id,0)
			}else{
				const {confirmation,data}=await getProfilePostsSearch({
					searchUrl:textAreaValue,
				    postType:currentPostType,
				    targetProfileId:personalInformation._id,
				    postCount:0,
				    levelNode:""
				})
				if(confirmation=="Success"){
					const {message}=data;
					switch(currentPostType){
						case 'image':{
							const filteredImagePosts={
								...imagePost,
								images:message
							}
							changeImagePost(filteredImagePosts);
						}

						case 'video':{

							const filteredVideoPosts={
								...videoPost,
								videos:message
							}
							changeVideoPosts(filteredVideoPosts);
						}
						case 'blog':{
							const filteredBlogPosts={
								...blogPost,
								blogs:message
							}
							changeBlogPosts(filteredBlogPosts);
						}

						case 'regularPost':{
							const filteredRegularPosts={
								...regularPost,
								posts:message
							}
							changeRegularPost(filteredRegularPosts);
						}
					}

				}else{
					alert('Unfortunately there has been an error search for this post. Please try again');
				}
			}
		}
	}

	const postsDisplaySystem=()=>{
		let posts;
		switch(currentPostType){
			case 'image':{
				posts=<ImagePosts
						imageData={imagePost}
						isLoading={isLoadingIndicatorImages}
						profile="Personal"
						friendsColorNodesMap={friendsColorNodesMap}
						currentRequestedFriendsGaugeNodeId={currentRequestedFriendsGaugeNodeId}
					/>
				break;
			}
			case 'video':{
				posts=<VideoPosts
						videos={videoPost}
						isLoadingIndicatorVideos={isLoadingIndicatorVideos}
						id={personalInformation._id}
						postCounter={currentPostCounter}
						handleVideoPostModal={props.handleVideoPostModal}
						friendsColorNodesMap={friendsColorNodesMap}
						currentRequestedFriendsGaugeNodeId={currentRequestedFriendsGaugeNodeId}
					/>
				break;
			}
			case 'blog':{
				posts=<BlogsPosts
						blogData={blogPost}
						isLoadingIndicatorBlogPost={isLoadingIndicatorBlogPost}
						id={personalInformation._id}
						friendsNodes={props.personalInformation.friendsGaugeNodes}
						friendsColorNodesMap={friendsColorNodesMap}
						currentRequestedFriendsGaugeNodeId={currentRequestedFriendsGaugeNodeId}
					/>
				break;
			}
			default:{
				posts=<RegularPost
						id={props.personalInformation._id}
						posts={regularPost}
						isLoadingIndicatorRegularPost={isLoadingIndicatorRegularPost}
						profilePicture={props.personalInformation.profilePicture}
						profile="Personal"
						friendsColorNodesMap={friendsColorNodesMap}
						currentRequestedFriendsGaugeNodeId={currentRequestedFriendsGaugeNodeId}
					/>
				break;
			}
		}
		return <div id="postCollectionContainer">
					{posts}
				</div>
	}

	const triggerSearchPostExtended=()=>{
		changeDisplayExtendedTextArea(true);
	}

	const closeSeachAreaModal=()=>{
		document.getElementById("searchPostTextArea").value="";
		triggerPostDecider(currentPostType,props.personalInformation._id,0)
		changeDisplayExtendedTextArea(false);
	}

	const searchAreaCloseIcon=()=>{
		return(
			<React.Fragment>
				{displayExtendedSearchTextArea==true &&(
					<HighlightOffIcon
						onClick={()=>closeSeachAreaModal()}
						style={{fontSize:30,cursor:"pointer"}}
					/>
				)}
			</React.Fragment>
		)
	}

	const postOptions=()=>{
		return(
			<React.Fragment>
				<li id="images" onClick={()=>triggerPostDecider("image",props.personalInformation._id,0,"General")} 
					style={{listStyle:"none",fontSize:"17px",padding:"10px",textDecoration:"none",color:"#C8B0F4",cursor:"pointer"}}>
					Images
				</li>

				{(props.isGuestProfile==false && props.isGuestVisitorProfile==false) && (
					<React.Fragment>
						<li id="videos" onClick={()=>triggerPostDecider("video",props.personalInformation._id,0,"General")} 
							style={{listStyle:"none",fontSize:"17px",padding:"10px",textDecoration:"none",color:"#bebebf",cursor:"pointer"}}>
							Videos
						</li>

						<li id="regularPosts" onClick={()=>triggerPostDecider("regularPost",props.personalInformation._id,0,"General")} 	
							style={{listStyle:"none",fontSize:"17px",padding:"10px",color:"#bebebf",textDecoration:"none",cursor:"pointer"}}>
							Regular 
						</li>

						<li id="blogs" onClick={()=>triggerPostDecider("blog",props.personalInformation._id,0,"General")} 
							style={{listStyle:"none",fontSize:"17px",padding:"10px",color:"#bebebf",textDecoration:"none",color:"#bebebf",cursor:"pointer"}}>
							Blogs
						</li>
					</React.Fragment>
				)}
			</React.Fragment>
		)
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
						
						let newImageObject=updateImagePostIndexContext(imageData,imagePost);
						changeImagePost(newImageObject);
						changeDisplayCreationPost(false);
						props.closeModal();
					},
					updateVideoPost:(videoObject)=>{
						let newVideoObject=updateVideoPostIndexContext(videoObject,videoPost);
						changeVideoPosts(newVideoObject);		
						changeDisplayCreationPost(false);
						props.closeModal();
					},
					updateRegularPost:(regularPostProp)=>{
						const {isCrownedPost,post}=regularPostProp;
						let newPostObject=updateRegularPostIndexContext(
							regularPostProp,
							regularPost
						);
						changeRegularPost(newPostObject);
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
								<PostOptionsAndSearchContainer 
									displayExtendedSearchTextArea={displayExtendedSearchTextArea}>
									<div style={{alignItems:"center",display:"flex",flexDirection:"row",marginRight:"5%",marginBottom:"15px"}}>
										<SearchIcon
											style={{fontSize:30}}
										/>
										<SearchPostsTextArea
											id="searchPostTextArea"
											onClick={()=>triggerSearchPostExtended()}
											onKeyPress={e=>searchPromptTrigger(e)}
											placeholder="Search for any posts here"
										/>
										{searchAreaCloseIcon()}
									</div>
									<div style={{display:"flex",flexDirection:"row"}}>
										{postOptions()}
										<li style={listCSSButton}>
											<div class="dropdown">
													<button id="symposiumsDropDown" 
														class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
														style={SymposiumDropDownCSS}>
														Symposiums
													   	<span class="caret"></span>
													</button>
													{selectedPostSymposiums()}
							  				 </div>
										</li>
									</div>
								</PostOptionsAndSearchContainer>
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