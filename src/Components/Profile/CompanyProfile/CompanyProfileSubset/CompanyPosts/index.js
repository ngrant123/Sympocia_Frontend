import CreateAPostComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";
import ImagePosts from "../../../PersonalProfile/PersonalProfileSubset/PersonalPosts/ImagePosts/ImagePostContainer.js";
import VideoPosts from "../../../PersonalProfile/PersonalProfileSubset/PersonalPosts/VideoPosts/VideoPostContainer.js";
import BlogsPosts from "../../../PersonalProfile/PersonalProfileSubset/PersonalPosts/BlogPosts/BlogPostsContainer.js";
import RegularPost from "../../../PersonalProfile/PersonalProfileSubset/PersonalPosts/RegularPosts/RegularPostContainer.js";

import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import SearchIcon from '@material-ui/icons/Search';
import Dropdown from 'react-bootstrap/Dropdown';
import {PostProvider} from "../../../PersonalProfile/PersonalProfileSubset/PersonalPosts/PostsContext.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {CompanyConsumer} from "../../CompanyContext.js";
import {CompanyPostProvider} from "../../CompanyPostsContext.js";
import {getCompanyVideos} from "../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";

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
	position:absolute;
	width:50%;
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
	width:120%;
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


const PersonalPostsIndex=(props)=>{
	const [displayImages,changeDisplayForImages]=useState(true);
	const [displayVideos,changeDisplayForVideos]=useState(false);
	const [displayBlogs,changeDisplayForBlogs]=useState(false);
	const [displayRegularPosts,changeDisplayForRegularPosts]=useState(false);

	const [displayCreationPost,changeDisplayCreationPost]=useState(false);
	const [postOption,changePostOption]=useState();
	const [personalInformation,changePersonalInformation]=useState([]);

	const [videoPost,changeVideoPosts]=useState([]);
	const [isLoadingIndicatorVideos,changeVideosLoadingIndicator]=useState(true);

	useEffect(()=>{

		const image=document.getElementById("images");
			image.style.color="#C8B0F4";
			image.style.borderBottom="solid";
			image.style.borderColor="#C8B0F4";
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
			const videoPostResponse=await getCompanyVideos(id);
			const header=videoPostResponse.headerVideo;
			const videoPosts=videoPostResponse.videos;

			const videoObject={
				headerVideo:header,
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

			const regularPost=document.getElementById("regularPosts");
			regularPost.style.color="#C8B0F4";
			regularPost.style.borderBottom="solid";
			regularPost.style.borderColor="#C8B0F4";

			changeDisplayForRegularPosts(true);
		}
	}

	const displayCreationPostContainer=()=>{
		if(displayCreationPost==true){
			return <React.Fragment>
						<PostCreation>
							<CreateAPostComponent
								postOption={postOption}
							/>
						</PostCreation>
					</React.Fragment>;
		}else
			return <React.Fragment></React.Fragment>
	}

	const displayOrHideCreationPost=()=>{
		changeDisplayCreationPost(!displayCreationPost);
	}

	const getAndDisplayVideos=()=>{

	}

	const displayCreatePostAndShadowOverlay=(personalInformation)=>{
		if(personalInformation.displayShadowBackground==false){
				changeDisplayCreationPost(false);
		}
	}
	const initializePersonalInformationToState=(personalInformationData)=>{
		
		changePersonalInformation(personalInformation);
	}

	return (
		<CompanyConsumer>
			{personalInformation=>{
				return <React.Fragment>
							<PostProvider
								value={{
									updatePostComponent:(postOption)=>{
										changePostOption(postOption);
										changeDisplayCreationPost(true);
										props.displayShadowOverlay();
									},
									hideCreationPost:()=>{
										
										changeDisplayCreationPost(false)
									},
									updateImagePost:(imagePost)=>{
										
										const currentImages=personalInformation.state.userProfile.imagePost
										currentImages.push(imagePost);
										const newPersonalInfoObject={
											...personalInformation,
											userProfile:{
												...personalInformation.state.userProfile,
												imagePost:currentImages
											}
										}
										changePersonalInformation(newPersonalInfoObject);
									},
									updateVideoPost:(videoObject)=>{
										
											const currentVideoObject=videoPost;
											const videos=currentVideoObject.videos;

											videos.push(videoObject);

											const newVideoObject={
												...currentVideoObject,
												videos:videos
											}
											changeVideoPosts(newVideoObject);
											//this.hideCreationPost();
										}
								}}
							>
							{initializePersonalInformationToState(personalInformation)}
							{displayCreatePostAndShadowOverlay(personalInformation)}
							
								
								<ul style={{padding:"0px"}}>
									{props.isOwnProfile==true?
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
																		{personalInformation.state.profilePicture!=null?
																			<img src={personalInformation.state.profilePicture} style={{position:"absolute",top:"0px",height:"100%",width:"100%",borderRadius:"50%"}}/>:
																			<img src={NoProfilePicture} style={{position:"absolute",top:"0px",height:"100%",width:"100%"}}/>
																		}
																	</ProfilePicture>
																</li>

																<li style={{listStyle:"none",display:"inline-block"}}>
																	<CommentTextArea placeholder="Click here to create a post">

																	</CommentTextArea>

																</li>
															</ul>
													</CommentCreationContainer>
												</li>
											</ul>
										</li>:null
									}
									<li style={{listStyle:"none",marginBottom:"5%"}}>
										{personalInformation.state.isOwnProfile==true?
											<React.Fragment>
												{displayCreationPostContainer()}
											</React.Fragment>:
											<React.Fragment></React.Fragment>
										}
									</li> 

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

											<li id="images" onClick={()=>handlePostsClick("image")} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px"}}>
												Images
											</li>

											<li id="videos" onClick={()=>handlePostsClick("video",personalInformation.state.userProfile._id)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
												Videos
											</li>

											<li id="regularPosts" onClick={()=>handlePostsClick("regularPost",personalInformation.state.userProfile._id)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
												Regular Posts
											</li>

											<li id="blogs" onClick={()=>handlePostsClick("blog",personalInformation.state.userProfile._id)} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
												Blogs
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
												personalInformation={personalInformation.state}
												profile="Company"
											/>:<React.Fragment></React.Fragment>
										}

										{
											displayVideos==true?
											<VideoPosts
												videos={videoPost}
												isLoadingIndicatorVideos={isLoadingIndicatorVideos}
												id={personalInformation.state.userProfile._id}
												profile="Company"
											/>:<React.Fragment></React.Fragment>
										}


										{
											displayBlogs==true?
											<BlogsPosts
												id={personalInformation.state.userProfile._id}
												profile="Company"
											/>:<React.Fragment></React.Fragment>
										}
										
										{
											displayRegularPosts==true?
											<RegularPost
												id={personalInformation.state.userProfile._id}
												profile="Company"
											/>:<React.Fragment></React.Fragment>
										}
								</ul>
							</PostProvider>
						</React.Fragment>
				}}
			
		</CompanyConsumer>
	)
}

export default PersonalPostsIndex;