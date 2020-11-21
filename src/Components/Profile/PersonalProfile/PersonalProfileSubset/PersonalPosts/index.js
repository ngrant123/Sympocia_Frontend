import React,{useState,useEffect,Component} from "react";
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
import FriendsGauge from "./FriendsGauge.js";
import PostCreationPortal from "../../PersonalProfileSet/Modals-Portals/PostCreationPortal.js";

import {
		getRegularPostFromUser,
		getVideosFromUser
} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

import {
	editPostIndexContext,
	removePostIndexContext,
	updateImagePostIndexContext,
	updateVideoPostIndexContext,
	updateRegularPostIndexContext
} from "./ContextActions.js";
import {recruitButton} from "../PersonalDetails/PersonalInformation.js";
import {PhonePersonalInformationHeader} from "../../PersonalProfileSet/MobileUI.js";
import {useSelector} from "react-redux";


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

	const [regularPost,changeRegularPost]=useState({
		headerPost:null,
		posts:[]
	})

	const [displayCreationPost,changeDisplayCreationPost]=useState(false);
	const [postOption,changePostOption]=useState();
	const [personalInformation,changePersonalInformation]=useState(props.personalInformation);

	const [imagePost,changeImagePost]=useState({
			crownedImage:props.personalInformation.userProfile.crownedImage,
			images:props.personalInformation.userProfile.imagePost
	});

	const [videoPost,changeVideoPosts]=useState({
		headerVideo:null,
		videos:[]
	});
	const [isLoadingIndicatorVideos,changeVideosLoadingIndicator]=useState(true);

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

	const handlePostsClick=async(kindOfPost,id)=>{
			changeDisplayForImages(false);
			changeDisplayForBlogs(false);
			changeDisplayForVideos(false);
			changeDisplayForRegularPosts(false);

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

		if(kindOfPost=="image"){

			const image=document.getElementById("images");
			image.style.color="#C8B0F4";
			image.style.borderBottom="solid";
			image.style.borderColor="#C8B0F4";

			changeDisplayForImages(true);

		}else if(kindOfPost=="video"){
			const videos=document.getElementById("videos");
			videos.style.color="#C8B0F4";
			videos.style.borderBottom="solid";
			videos.style.borderColor="#C8B0F4";
			changeDisplayForVideos(true); 

			const {confirmation,data}=await getVideosFromUser({userId:id,visitorId:props.visitorId});

			if(confirmation=="Success"){
				const {crownedVideo,videoPosts}=data;
				
				const videoObject={
					headerVideo:crownedVideo,
					videos:videoPosts
				}
				changeVideoPosts(videoObject);
				changeVideosLoadingIndicator(false);
			}else{
				alert('Unfortunately there has been an error getting your pictures. Please try again');
			}
		}else if(kindOfPost=="blog"){
			const blogs=document.getElementById("blogs");
			blogs.style.color="#C8B0F4";
			blogs.style.borderBottom="solid";
			blogs.style.borderColor="#C8B0F4";
			changeDisplayForBlogs(true);
		}else{

			const {confirmation,data}=await getRegularPostFromUser({userId:id,
																	visitorId:props.visitorId
																});

				if(confirmation=="Success"){	
					const {crownedRegularPost,regularPosts}=data;
					const regularPost=document.getElementById("regularPosts");
					regularPost.style.color="#C8B0F4";
					regularPost.style.borderBottom="solid";
					regularPost.style.borderColor="#C8B0F4";
		
					const regularPostObject={
						headerPost:crownedRegularPost,
						posts:regularPosts.reverse()
					}
		
					changeRegularPost(regularPostObject);
					changeDisplayForRegularPosts(true);
				}else{
					alert('Unfortunately there has been an error getting your regular posts. Please try again');
				}
		}
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
			<li  style={{listStyle:"none"}}>
				<ul style={{padding:"0px"}}>
					<li id="mobilePhonePostOption"style={{marginLeft:"25%",listStyle:"none",display:"inline-block",marginRight:"5%"}}>
						<div class="dropdown">
							<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
								style={ShadowButtonCSS}>
									Post Type
							   		<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li onClick={()=>handlePostsClick("image")} style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>
									<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
										Images
									</a>
								</li>

								<li onClick={()=>handlePostsClick("video",props.personalInformation.userProfile._id)} style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>
									<a id="videos" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
										Videos
									</a>
								</li>

								<li onClick={()=>handlePostsClick("regularPost",props.personalInformation.userProfile._id)} style={{listStyle:"none",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
									<a id="regularPosts" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
										Regular Posts
									</a>
								</li>

								<li onClick={()=>handlePostsClick("blog",props.personalInformation.userProfile._id)} style={{listStyle:"none",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
									<a id="blogs" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
										Blogs
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li style={{listStyle:"none",display:"inline-block"}}>
						{recruitButton(personalInformation,personalInformation.displayConfettiHandle,personalRedux.id)}
					</li>
				</ul>
				<hr/>
			</li>
		)
	}

/*
	const initializePersonalInformationToState=(personalInformationData)=>{
		
		changePersonalInformation(personalInformation);
	}
*/

	return (
			<PostProvider
				value={{
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
						debugger;
						const {isCrowned,post}=regularPostProp;
						let updatedNewRegularPostProp;
						if(isCrowned==true){
							updatedNewRegularPostProp={
								...post,
								owner:{
									firstName:props.personalInformation.userProfile.firstName,
									profilePicture:props.personalInformation.userProfile.profilePicture
								}
							}
						}else{
							updatedNewRegularPostProp={
								...regularPostProp,
								owner:{
									firstName:props.personalInformation.userProfile.firstName,
									profilePicture:props.personalInformation.userProfile.profilePicture
								}
							}
						}
						if(displayRegularPosts){
							let newPostObject=updateRegularPostIndexContext(
								updatedNewRegularPostProp,
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
					}
				}}
			>
			{props.personalInformation.isLoading==true?null:
				<>
				{/*
					{initializePersonalInformationToState(props.personalInformation)}
					{displayCreatePostAndShadowOverlay(props.personalInformation)}
				*/}
				<ul>
					{props.uiStatus.displayPhoneUI==true &&(
						<PhonePersonalInformationHeader
							ownerName={props.personalInformation.userProfile.firstName}
						/>
					)}
					<li id="friendsGaugeContainer" style={{listStyle:"none",marginBottom:"10%"}}>
							{props.personalInformation.isLoading==true?
									<p>Give us a second </p>:
									<FriendsGauge
										personalInformation={props.personalInformation}
										mobileUIStatus={props.uiStatus}
									/>
								}
					</li>
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
														placeholder="Search for any posts here"
													/>
												</li>

											</ul>
										</li>

										<li onClick={()=>handlePostsClick("image")} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px"}}>
											<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
												Images
											</a>
										</li>

										<li onClick={()=>handlePostsClick("video",props.personalInformation.userProfile._id)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px"}}>
											<a id="videos" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
												Videos
											</a>
										</li>

										<li onClick={()=>handlePostsClick("regularPost",props.personalInformation.userProfile._id)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
											<a id="regularPosts" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
												Regular Posts
											</a>
										</li>

										<li onClick={()=>handlePostsClick("blog",props.personalInformation.userProfile._id)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
											<a id="blogs" href="javascript:void(0);" style={{textDecoration:"none",color:"#bebebf"}}>
												Blogs
											</a>
										</li>

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

										<li style={listCSSButton}>
											<div class="dropdown">
													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														Industries
													   	<span class="caret"></span>
													</button>
													<ul class="dropdown-menu">
														<li><a href="">Most Popular</a></li>
														<li><a href="">Most Recent</a></li>
														
													</ul>
							  				 </div>
										</li>

									</ul>
								</li>
							}
							<div id="postCollectionContainer">
								{
									displayImages==true?
									<ImagePosts
										imageData={imagePost}
										isLoading={props.personalInformation.isLoading}
										profile="Personal"
									/>:<React.Fragment></React.Fragment>
								}
								{
									displayVideos==true?
									<VideoPosts
										videos={videoPost}
										isLoadingIndicatorVideos={isLoadingIndicatorVideos}
										id={personalInformation.userProfile._id}
									/>:<React.Fragment></React.Fragment>
								}
								{
									displayBlogs==true?
									<BlogsPosts
										id={props.personalInformation.userProfile._id}
										profileType="Personal"
										friendsNodes={props.personalInformation.userProfile.friendsGaugeNodes}
										visitorId={props.visitorId}
									/>:<React.Fragment></React.Fragment>
								}
								{
									displayRegularPosts==true?
									<RegularPost
										id={props.personalInformation.userProfile._id}
										posts={regularPost}
										profilePicture={props.personalInformation.userProfile.profilePicture}
										profile="Personal"
									/>:<React.Fragment></React.Fragment>
								}
							</div>
								
						</ul>
					</li>
				</ul>
				</>
			}
			</PostProvider>
	)
}

export default PersonalPostsIndex;