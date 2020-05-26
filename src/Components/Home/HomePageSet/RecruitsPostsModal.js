import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ImageContainer from "../../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";
import RegularPost from "../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import BlogPost from "../../GeneralComponents/PostComponent/BlogComponent/BlogPostDisplay/BlogPostContainer.js";
import VideoPost from "../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";
import ReactSnapScroll from 'react-snap-scroll';
import NoProfileIcon from "../../../designs/img/NoProfilePicture.png";
import {getRecruitsPostsHomePage} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import SelectedRecruitPosts from "./SelectedRecruitPost.js";



const Container=styled.div`
	position:absolute;
	background-color:white;
	border-radius:5px;
	width:80%;
	height:85%;
	z-index:11;
	margin-left:15%;
	margin-top:5%;
	overflow-y:auto;
	padding:5px;
`;


const RecruitsProfileContainer=styled.div`
	position:relative;
	width:55px;
	height:50px;
	background-color:red;
	border-radius:50%;
	border-style:solid;
	border-color:#5298F8;
	border-width:2px;
	transition:8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070; 
	}
`;

const SearchButton=styled.textarea`
	position:relative;
	resize:none;
	border-radius:5px;
	border-style:none;
	text-align:center;
	z-index:5;
	width:300%;
	padding:6px;

	box-shadow: 1px 1px 5px #707070; 

`;

const ProfilePictures=styled.div`
	width:110%;
	height:50px;
	background-color:red;
	border-radius:50%;
	border-style:solid;
	border-color:#5298F8;
	border-width:2px;

`;


const ImagePostContainer=styled.div`
	position:relative;
	height:350px;
	width:350px;
	margin-bottom:10%;
	margin-right:5%;
	border-radius:5px;
	box-shadow: 1px 1px 5px #707070; 
	transition:.8s;

	&:hover{
		box-shadow: 5px 10px 10px #707070;
	}
`;

const VideoPostContainer=styled.div`
	position:relative;
	height:400px;
	width:650px;
	margin-bottom:10%;
	margin-right:5%;
	border-radius:5px;
	box-shadow: 1px 1px 5px #707070; 
	transition:.8s;

	&:hover{
		box-shadow: 5px 10px 10px #707070;
	}
`;

const BlogPostContainer=styled.div`
	position:relative;
	height:450px;
	width:350px;
	margin-bottom:10%;
	margin-right:5%;
	border-radius:5px;
	box-shadow: 1px 1px 5px #707070; 
	transition:.8s;

	&:hover{
		box-shadow: 5px 10px 10px #707070;
	}
`;



const IndustryCSSButton={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	listStyle:"none",
	borderRadius:"5px",
	padding:"20px",
	display:"inline-block"
}

const RecruitsPosts=(props)=>{
	console.log(props);
	const [recruitsPosts,changeRecruitsPosts]=useState([]);
	const [originalPosts,changeOriginalPosts]=useState([]);

	const [profileType,changeProfileType]=useState();
	const [isLoading,changeLoadingState]=useState(true);
	const [selectedPost,changeSelectedPost]=useState();

	var postMap=new Map();

	const [displaySelectedPostPopup,changeSelectedPostPopup]=useState(false);

	useEffect(()=>{
	 	const getData=async()=>{
	 		const time=new Date();
			const currentTime=time.getTime();

			if(props.isPersonalProfile==true){
				const recruitPosts=await getRecruitsPostsHomePage(props.id,currentTime);
				changeRecruitsPosts(recruitPosts);
				changeProfileType("personalProfile");
				changeLoadingState(false);
				console.log(recruitPosts);
			}else{

			}
	 	}
	 	getData();
	},[])

	
	const hidePost=()=>{
		changeSelectedPostPopup(false);
	}

	const selectPost=(data)=>{

		changeSelectedPostPopup(true);
		changeSelectedPost(data);
	}

	const createNewArrayWithoutPost=(selectedPostId,postArray)=>{
		var newPostArray=[];
		for(var i=0;i<postArray.length;i++){
			var currentPost=postArray[i];
			if(currentPost.owner._id==selectedPost)
				continue;
			newPostArray.push(currentPost);
		}
		return newPostArray;
	}

	const displaySelectedUserPosts=(userProfile)=>{
		debugger;
		const {_id}=userProfile;

		const userPosts=postMap.get(_id);
		if(userPosts!=null){
			changeRecruitsPosts(userPosts);
		}
		/*
			const {_id}=userProfile;
			//down later iterations could probably place recruits in  hash map
			var newUserPostArray=[];
			for(var i=0;i<recruitPosts.length;i++){
				const {postType}=recruitPosts[i];
				if(postType=="Video")
			}
		*/
	}

	const constructPostMap=(ownerID,data)=>{
		if(postMap.has(ownerID)){
			const currentPostArray=postMap.get(ownerID);
			currentPostArray.push(data);
			postMap.set(ownerID,currentPostArray);
		}else{
			const newItemArray=[];
			newItemArray.push(data);
			postMap.set(ownerID,newItemArray);
		}
	}

	 const constructPosts=(data)=>{

	 	if(data.postType=="Image"){
	 		constructPostMap(data.image.owner._id,data);
	 		return <a href="javascript:void(0)" style={{textDecoration:"none",color:"black"}}>
												<ImagePostContainer onClick={()=>selectPost(data)}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none"}}>
															<img src={data.image.imgUrl} style={{width:"100%",height:"80%"}}/>
														</li>
														<li style={{listStyle:"none"}}>
															<ul style={{padding:"10px"}}>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																	{data.profilePicture==null?
																		<img src={NoProfileIcon} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>:
																		<img src={data.profilePicture} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
																	}
																</li>

																<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																	<b>{data.image.owner.firstName}</b>
																</li>

																<li style={IndustryCSSButton}>
																	{data.image.industriesUploaded[0].industry}
																</li>
															</ul>
														</li>
													</ul>
												</ImagePostContainer>
											</a>
	 	}else if(data.postType=="Video"){
	 		constructPostMap(data.video.owner._id,data);
	 		return <a href="javascript:void(0)" style={{textDecoration:"none",color:"black"}}>
	 					<VideoPostContainer onClick={()=>selectPost(data)}>
	 						<video  key={data.video.videoUrl} id="video" position="absolute" height="100%" width="100%" controls autoplay>
							    <source src={data.video.videoUrl} type="video/mp4"/>
							</video>
	 						<ul style={{position:"absolute",padding:"0px"}}>
	 							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
									{data.profilePicture==null?
										<img src={NoProfileIcon} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>:
										<img src={data.profilePicture} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
									}
								</li>

								<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
									<b>{data.video.owner.firstName}</b>
								</li>

								<li style={IndustryCSSButton}>
									{data.video.industriesUploaded[0].industry}
								</li>
	 						</ul>
	 					</VideoPostContainer>
	 			   </a>;   

	 	}else if(data.postType=="Blog"){
	 		constructPostMap(data.blog.owner._id,data);
	 		return <a href="javascript:void(0)" style={{textDecoration:"none",color:"black"}}>
	 					<BlogPostContainer onClick={()=>selectPost(data)}>
	 						<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none"}}>
															<img src={data.blog.blogImageUrl} style={{width:"100%",height:"80%"}}/>
														</li>
														<li style={{listStyle:"none"}}>
															<ul style={{padding:"10px"}}>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																	{data.profilePicture==null?
																		<img src={NoProfileIcon} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>:
																		<img src={data.profilePicture} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
																	}
																</li>

																<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																	<b>{data.blog.owner.firstName}</b>
																</li>

																<li style={IndustryCSSButton}>
																	{data.blog.industriesUploaded[0].industry}
																</li>
																<li style={{listStyle:"none"}}>
																	{data.blog.title}
																</li>
															</ul>
														</li>
							</ul>


	 					</BlogPostContainer>
	 			   </a>;


	 	}else if(data.postType=="RegularPost"){
	 		return <a href="javascript:void(0)" style={{textDecoration:"none"}}>

	 			   </a>;
	 	}
	 }

	return(
		<Container>
			{displaySelectedPostPopup==false?<React.Fragment></React.Fragment>:
					<SelectedRecruitPosts
						selectedPost={selectedPost}
						hidePost={hidePost}
					/>
			}

			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li style={{position:"relative",top:"-20px",listStyle:"none",display:"inline-block",marginLeft:"3%"}}>
							<div class="dropdown">

													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														
														Filter By Users

													   	<span class="caret"></span>
													</button>

													<ul class="dropdown-menu" style={{height:"170px",overflow:"auto"}}>
														{props.recruits.map(data=>
															<li onClick={()=>displaySelectedUserPosts(data)}>
																<a>
																	<ul style={{padding:"0px"}}>
																		<li style={{listStyle:"none",display:"inline-block",width:"40%"}}>
																			<ProfilePictures>
																				{data.profilePicture==null||data.profilePicture==""?
																					<img src={NoProfileIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>:
																					<img src={data.profilePicture} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
																				}
																			</ProfilePictures>
																		</li>

																		<li style={{listStyle:"none",display:"inline-block",marginLeft:"10%"}}>
																			{data.firstName}
																		</li>
																	</ul>
																</a>
															</li>
														)} 
													</ul>
							  	</div>
						</li>

						<li style={{position:"relative",top:"-20px",listStyle:"none",display:"inline-block",marginLeft:"2%"}}>
							<div class="dropdown">

													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														
														More Options

													   	<span class="caret"></span>
													</button>

													<ul class="dropdown-menu">
														<li ><a>Most popular</a></li>
														<li ><a>Most Commented</a></li>
														<li ><a>Recent</a></li>
													</ul>
							  	</div>
						</li>

						<li style={{listStyle:"none",display:"inline-block",marginTop:"2%",marginLeft:"3%"}}>
							<SearchButton placeholder="Search for a community or a person"/> 
						</li>
					</ul>
				</li>
				<li style={{listStyle:"none",fontSize:"30px",marginLeft:"2%"}}>
					<b>Most Recent Posts </b>
				</li>

				<li style={{listStyle:"none",marginBottom:"10%"}}>
					<ul style={{padding:"20px"}}>
						{isLoading==true?
							<p>Is loading </p>:
								<React.Fragment>
									{recruitsPosts.map(data=>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5%"}}>
											{constructPosts(data)}
										</li>
									)}
								</React.Fragment>
						}
					</ul>
				</li>
			</ul>
		</Container>
	)
}

export default RecruitsPosts;