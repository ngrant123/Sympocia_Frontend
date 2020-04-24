import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import CreateAPostComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";
import SearchIcon from '@material-ui/icons/Search';
import ImagePosts from "./ImagePosts/ImagePostContainer.js";
import VideoPosts from "./VideoPosts/VideoPostContainer.js";
import BlogsPosts from "./BlogPosts/BlogPostsContainer.js";
import RegularPost from "./RegularPosts/RegularPostContainer.js";
import Dropdown from 'react-bootstrap/Dropdown';

import {UserConsumer} from "../../UserContext.js";
import {PostProvider} from "./PostsContext.js";

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
	console.log("Teste");

	useEffect(()=>{

		const image=document.getElementById("images");
			image.style.color="#C8B0F4";
			image.style.borderBottom="solid";
			image.style.borderColor="#C8B0F4";
	},[]);

	/*
		Could be implemented in a better way
	*/

	const handlePostsClick=(kindOfPost)=>{

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
		console.log("Test");

		if(displayCreationPost==false){
			console.log("Tur");
			props.displayShadowOverlay();
		}
		changeDisplayCreationPost(!displayCreationPost);
	}

	const getAndDisplayVideos=()=>{

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

	return (
		<UserConsumer>
			{personalInformation=>{
				return <React.Fragment>
							<PostProvider
								value={{
									updatePostComponent:(postOption)=>{
										changePostOption(postOption);
										changeDisplayCreationPost(true);
										props.displayShadowOverlay();
									}
								}}
							>
							{displayCreatePostAndShadowOverlay(personalInformation)}
								{displayCreationPost==true?
									<ShadowContainer
										onClick={()=>disappearShadowOverlay()}
									/>:
									<React.Fragment></React.Fragment>}
								<ul>
									<li style={{listStyle:"none",marginBottom:"5%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"5%",color:"#C8B0F4"}}>
												<b>Create a post</b>
											</li>

											<li style={{listStyle:"none",display:"inline-block"}}>
													<CommentCreationContainer onClick={()=>displayOrHideCreationPost()}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
																<ProfilePicture>

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
										{personalInformation.isOwnProfile==true?
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

											<li id="videos" onClick={()=>handlePostsClick("video")} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
												Videos
											</li>

											<li id="regularPosts" onClick={()=>handlePostsClick("regularPost")} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
												Regular Posts
											</li>

											<li id="blogs" onClick={()=>handlePostsClick("blog")} style={{listStyle:"none",display:"inline-block",fontSize:"17px",padding:"10px",color:"#bebebf"}}>
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
												personalInformation={personalInformation}
												profile="Personal"
											/>:<React.Fragment></React.Fragment>
										}

										{
											displayVideos==true?
											<VideoPosts
												id={personalInformation.userProfile._id}
												profile="Personal"
											/>:<React.Fragment></React.Fragment>
										}


										{
											displayBlogs==true?
											<BlogsPosts
												id={personalInformation.userProfile._id}
												profile="Personal"
											/>:<React.Fragment></React.Fragment>
										}

										{
											displayRegularPosts==true?
											<RegularPost
												id={personalInformation.userProfile._id}
												profile="Personal"
											/>:<React.Fragment></React.Fragment>
										}
								</ul>
							</PostProvider>


						</React.Fragment>
				}}
			
		</UserConsumer>
	)
}

export default PersonalPostsIndex;