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
import {getVideosFromUser} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import FriendsGauge from "./FriendsGauge.js";
import PostCreationPortal from "../../PersonalProfileSet/PostCreationPortal.js";

import {getRegularPostFromUser} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

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
	z-index:1;
`;

const listCSSButton={	
	listStyle:"none",
	display:"inline-block",
	padding:"5px",
	borderRadius:"5px",
	marginLeft:"2%"
}

/*
Later down the road this whole post section has to be refactored completely 
because at this point it getting too crazy and sphagetti like 

Naw i need to redo this now like this shit awful lol
*/

const PersonalPostsIndex=(props)=>{
	debugger;
	const [displayImages,changeDisplayForImages]=useState(true);
	const [displayVideos,changeDisplayForVideos]=useState(false);
	const [displayBlogs,changeDisplayForBlogs]=useState(false);
	const [displayRegularPosts,changeDisplayForRegularPosts]=useState(false);
	const [regularPost,changeRegularPost]=useState({
		headerPost:null,
		posts:[]
	})

	const [displayCreationPost,changeDisplayCreationPost]=useState(false);
	const [postOption,changePostOption]=useState();
	const [personalInformation,changePersonalInformation]=useState(props.personalInformation);
	console.log(personalInformation);

	const [videoPost,changeVideoPosts]=useState({
		headerVideo:null,
		videos:[]
	});
	const [isLoadingIndicatorVideos,changeVideosLoadingIndicator]=useState(true);
	console.log("Teste");

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

			debugger
			const videos=document.getElementById("videos");
			videos.style.color="#C8B0F4";
			videos.style.borderBottom="solid";
			videos.style.borderColor="#C8B0F4";
			changeDisplayForVideos(true); 

			console.log("Testing video api call");
			const {crownedVideo,videoPosts}=await getVideosFromUser(id);
			debugger;
			const videoObject={
				headerVideo:crownedVideo,
				videos:videoPosts
			}
			changeVideoPosts(videoObject);
			changeVideosLoadingIndicator(false);
			

		}else if(kindOfPost=="blog"){

			const blogs=document.getElementById("blogs");
			blogs.style.color="#C8B0F4";
			blogs.style.borderBottom="solid";
			blogs.style.borderColor="#C8B0F4";

			changeDisplayForBlogs(true);


		}else{
			const {crownedRegularPost,regularPosts}=await getRegularPostFromUser(id);

			const regularPost=document.getElementById("regularPosts");
			regularPost.style.color="#C8B0F4";
			regularPost.style.borderBottom="solid";
			regularPost.style.borderColor="#C8B0F4";

			const regularPostObject={
				headerPost:crownedRegularPost,
				posts:regularPosts
			}
			console.log(regularPostObject);

			changeRegularPost(regularPostObject);
			changeDisplayForRegularPosts(true);
		}
	}

	const closeModal=()=>{
		changeDisplayCreationPost(false);
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
		console.log("Test");

		if(displayCreationPost==false){
			console.log("Tur");
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

	const initializePersonalInformationToState=(personalInformationData)=>{
		debugger;
		changePersonalInformation(personalInformation);
	}

	return (<PostProvider
				value={{
					updatePostComponent:(postOption)=>{
						changePostOption(postOption);
						changeDisplayCreationPost(true);
					},
					hideCreationPost:()=>{
						props.disappearShadow();
						changeDisplayCreationPost(false)
					},
					updateImagePost:(imagePost)=>{
						debugger;
						const {isCrownedImage,image}=imagePost;
						if(isCrownedImage==true){
							//Set 
							debugger;
							var currentCrownedImage=props.personalInformation.userProfile.crownedImage;
							var currentImages=props.personalInformation.userProfile.imagePost;

							if(currentCrownedImage!=null)
								currentImages.push(currentCrownedImage);

							currentImages.sort(function(a,b){
								const aCreationDate=a.datePosted;
								const bCreationDate=b.datePosted;
								return bCreationDate>aCreationDate?1:-1;
							});
							var newPersonalInfoObject={
								...props.personalInformation,
								userProfile:{
									...props.personalInformation.userProfile,
									crownedImage:image,
									imagePost:currentImages
								}
							}
							changePersonalInformation(newPersonalInfoObject);
						}else{
							var currentImages=props.personalInformation.userProfile.imagePost
							currentImages.splice(0,0,imagePost);
							var newPersonalInfoObject={
								...props.personalInformation,
								userProfile:{
									...props.personalInformation.userProfile,
									imagePost:currentImages
								}
							}
							changePersonalInformation(newPersonalInfoObject);
						}

						changeDisplayCreationPost(false);
						props.closeModal();
					},
					updateVideoPost:(videoObject)=>{
						const {isCrownedVideo,video}=videoObject;
						if(isCrownedVideo==true){
							//Set 
							debugger;
							var currentVideos=videoPost.videos;
							var currentCrownedVideo=videoPost.headerVideo;
							if(currentCrownedVideo!=null){
								currentVideos.push(currentCrownedVideo);
							}
							currentVideos.sort(function(a,b){
								const aCreationDate=a.datePosted;
								const bCreationDate=b.datePosted;
								return bCreationDate>aCreationDate?1:-1;
							});

							var newVideoObject={
								headerVideo:video,
								videos:currentVideos==null?[]:currentVideos
							}
							changeVideoPosts(newVideoObject);
						}else{
							var currentVideos=videoPost.videos;
							currentVideos.splice(0,0,videoObject);
							var newVideoObject={
									...videoPost,
									videos:currentVideos
							}
							changeVideoPosts(newVideoObject);
						}

						changeDisplayCreationPost(false);
						props.closeModal();
					},
					updateRegularPost:(regularPostProp)=>{
						const {isCrownedPost,post}=regularPostProp;
						if(isCrownedPost==true){
							//Set 
							debugger;
							var currentPosts=regularPost.posts;
							var currentCrownedRegularPost=regularPost.headerPost;
							if(currentCrownedRegularPost!=null){
								currentPosts.push(currentCrownedRegularPost);
							}
							currentPosts.sort(function(a,b){
								const aCreationDate=a.datePosted;
								const bCreationDate=b.datePosted;
								return bCreationDate>aCreationDate?1:-1;
							});

							var newPostObject={
								headerPost:post,
								posts:currentPosts==null?[]:currentPosts
							}
							changeRegularPost(newPostObject);
						}else{
							var currentPosts=regularPost.posts;
							currentPosts.splice(0,0,regularPostProp);
							var newPostObject={
									...regularPost,
									posts:currentPosts
							}
							changeRegularPost(newPostObject);
						}

						changeDisplayCreationPost(false);
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
					<li style={{listStyle:"none",marginBottom:"10%"}}>
							{props.personalInformation.isLoading==true?
									<p>Give us a second </p>:
									<FriendsGauge
										personalInformation={props.personalInformation}
									/>
								}
					</li>
					<hr/>
				{displayCreationPostContainer()}
				{/*
					{props.personalInformation.isOwnProfile==true?
						<React.Fragment>
							<li style={{listStyle:"none",marginBottom:"5%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"5%",color:"#C8B0F4"}}>
											<b>Create a post</b>
										</li>

										<li style={{listStyle:"none",display:"inline-block"}}>
												<CommentCreationContainer onClick={()=>displayOrHideCreationPost()}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%",marginTop:"-20px"}}>
															<ProfilePicture>
																{props.personalInformation.profilePicture!=null?
																	<img src={props.personalInformation.profilePicture} style={{position:"absolute",top:"0px",height:"100%",width:"100%",borderRadius:"50%"}}/>:
																	<img src={NoProfilePicture} style={{position:"absolute",top:"0px",height:"100%",width:"100%"}}/>
																}
															</ProfilePicture>
														</li>

														<li style={{listStyle:"none",display:"inline-block"}}>
															<CommentTextArea placeholder="Enter a comment">

															</CommentTextArea>

														</li>
													</ul>
											</CommentCreationContainer>
										</li>
									</ul>
								</li>
								<li style={{listStyle:"none",marginBottom:"5%"}}>
									{props.personalInformation.isOwnProfile==true?
										<React.Fragment>
											{displayCreationPostContainer()}
										</React.Fragment>:
										<React.Fragment></React.Fragment>
									}
								</li> 
							</React.Fragment>
						:null}
				*/}

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
		
						{
							displayImages==true?
							<ImagePosts
								imageData={{
									crownImage:personalInformation.userProfile.crownedImage,
									images:personalInformation.userProfile.imagePost
								}}
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
				</ul>
				</>
			}
			</PostProvider>
	)
}

export default PersonalPostsIndex;