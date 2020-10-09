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
import LoadingScreen from "../../../LoadingAnimation.js";
import {Link} from "react-router-dom";
import {displayPersonalIndustryFeed} from "../HomePageSubset/SearchExplorePage/SearchExploreSubset/ImagePostsModal.js";
import {useSelector} from "react-redux";

import ImagePostDisplayPortal from "./ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "./VideoHomeDisplayPortal.js";
import BlogPostPostDisplayPortal from "./ImageHomeDisplayPortal.js";
//import ImagePostDisplayPortal from "./ImageHomeDisplayPortal.js";

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

const RegularPostContainer=styled.div`
	position:relative;
	height:300px;
	width:350px;
	margin-bottom:10%;
	margin-right:5%;
	border-radius:5px;
	box-shadow: 1px 1px 5px #707070; 
	transition:.8s;
	padding:25px;
	overflow:hidden;
	&:hover{
		box-shadow: 5px 10px 10px #707070;
	}
`;

const ProfilePictureLink=styled(Link)`
	position:relative;
`;


const ButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	listStyle:"none",
	borderRadius:"5px",
	padding:"10px",
	display:"inline-block",
	marginRight:"3%"
}

const RecruitsPosts=(props)=>{
	console.log(props);
	const [recruitsPosts,changeRecruitsPosts]=useState([]);
	const [originalPosts,changeOriginalPosts]=useState([]);
	const [displayPostPortal,changeDisplayPostPortal]=useState(false);
	const [postType,changePostType]=useState();

	const [profileType,changeProfileType]=useState();
	const [isLoading,changeLoadingState]=useState(true);
	const [selectedPost,changeSelectedPost]=useState();

	var postMap=new Map();
	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const [displaySelectedPostPopup,changeSelectedPostPopup]=useState(false);

	useEffect(()=>{
	 	const getData=async()=>{
		 	retrieveRecruitsPosts("Images");
	 	}
	 	getData();
	},[])

	
	const hidePost=()=>{
		changeSelectedPostPopup(false);
	}

	const selectPost=(data)=>{
		changeSelectedPost(data);
		changeSelectedPostPopup(true);
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

	const closePostDisplayPortal=()=>{
		changeDisplayPostPortal(false);
	}

	const postDisplayPortal=(postType)=>{
		/*
			if(postType=="Images"){
				return <ImagePostDisplayPortal
							closeModal={closeModal}
							selectedImage={selectedImage}
							recommendedImages={[]}
							targetDom="homePageContainer"
						/>
			}else if(postType=="Videos"){

			}else if(postType=="Blogs"){

			}else{

			}
		*/
	}

	const retrieveRecruitsPosts=async(postType)=>{
		debugger;
		const time=new Date();
		const currentTime=time.getTime();
		changeLoadingState(true);
		const recruitsParams={
			id:props.id,
			currentTime,
			postType, 
			recruits:props.recruits
		}
		if(props.isPersonalProfile==true){
			const {confirmation,data}=await getRecruitsPostsHomePage(recruitsParams);
			if(confirmation=="Success"){
				changeRecruitsPosts(data);
				changeProfileType("personalProfile");
				changeLoadingState(false);
			}else{
				alert('Unfortunately there has been an error trying to get your recruits information. Please try again');
			}
		}else{

		}
	}

	 const constructPosts=(data)=>{
	 	if(data.postType=="Images"){
	 		constructPostMap(data.post.owner._id,data);
	 		return <a href="javascript:void(0);" style={{textDecoration:"none",color:"black"}}>
						<ImagePostContainer onClick={()=>selectPost(data)}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
										<img src={data.post.imgUrl} style={{width:"100%",height:"80%"}}/>
								</li>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"10px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
											<ProfilePictureLink to={{pathname:`/profile/${data.post.owner._id}`}}>
												<img src={data.post.owner.profilePicture==null?
														  NoProfileIcon:
														  data.profilePicture
														} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
											</ProfilePictureLink>
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
											<b>{data.post.owner.firstName}</b>
										</li>

										<li  onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.post.industriesUploaded,props)} style={ButtonCSS}>
											{data.post.industriesUploaded[0].industry}
										</li>
									</ul>
								</li>
							</ul>
						</ImagePostContainer>
					</a>
	 	}else if(data.postType=="Videos"){
	 		constructPostMap(data.post.owner._id,data);
	 		return <a href="javascript:void(0)" style={{textDecoration:"none",color:"black"}}>
	 					<VideoPostContainer onClick={()=>selectPost(data)}>
	 						<video  key={data.post.videoUrl} id="video" position="absolute" height="100%" width="100%" controls autoplay>
							    <source src={data.post.videoUrl} type="video/mp4"/>
							</video>
	 						<ul style={{position:"absolute",padding:"0px"}}>
	 							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
	 								<ProfilePictureLink to={{pathname:`/profile/${data.post.owner._id}`}}>
										<img src={data.post.owner.profilePicture==null?
														  NoProfileIcon:
														  data.profilePicture
														} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
									</ProfilePictureLink>
								</li>

								<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
									<b>{data.post.owner.firstName}</b>
								</li>

								<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.post.industriesUploaded,props)} style={ButtonCSS}>
									{data.post.industriesUploaded[0].industry}
								</li>
	 						</ul>
	 					</VideoPostContainer>
	 			   </a>;   

	 	}else if(data.postType=="Blogs"){
	 		constructPostMap(data.post.owner._id,data);
	 		return <a href="javascript:void(0)" style={{textDecoration:"none",color:"black"}}>
	 					<BlogPostContainer onClick={()=>selectPost(data)}>
	 						<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<img src={data.post.blogImageUrl} style={{width:"100%",height:"80%"}}/>
								</li>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"10px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
											<ProfilePictureLink to={{pathname:`/profile/${data.post.owner._id}`}}>
												<img src={data.post.owner.profilePicture==null?
														  NoProfileIcon:
														  data.profilePicture
														} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
											</ProfilePictureLink>
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
											<b>{data.post.owner.firstName}</b>
										</li>

										<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.post.industriesUploaded,props)} style={ButtonCSS}>
											{data.post.industriesUploaded[0].industry}
										</li>
										<li style={{listStyle:"none"}}>
											{data.post.title}
										</li>
									</ul>
								</li>
							</ul>
	 					</BlogPostContainer>
	 			   </a>;

	 	}else if(data.postType=="RegularPosts"){
	 		return <a href="javascript:void(0)" style={{textDecoration:"none"}}>
	 					<RegularPostContainer onClick={()=>selectPost(data)}>
	 						<ul style={{padding:"0px"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li style={{position:"relative",top:"-70px",display:"inline-block",listStyle:"none",width:"20%",borderRadius:"5px",overflow:"hidden"}}>
										<ProfilePictureLink to={{pathname:`/profile/${data.post.owner._id}`}}>
											<img src={data.post.owner.profilePicture!=null?
													  data.post.owner.profilePicture:
													  NoProfileIcon} 
											style={{height:"20%",width:"90%",borderRadius:"50%"}}/>
										</ProfilePictureLink>
									</li>
								</a>

								<li style={{position:"relative",listStyle:"none",display:"inline-block",width:"70%",overflow:"hidden",marginLeft:"5%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",marginBottom:"2%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{display:"inline-block",listStyle:"none",fontSize:"30px",marginRight:"2%"}}>
													<b>{data.post.owner.firstName}</b>
												</li>

												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li  onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.post.industriesUploaded,props)} style={ButtonCSS}>
														{data.post.industriesUploaded[0].industry}
													</li>
												</a>
											</ul>
										</li>
										
										
										<li style={{listStyle:"none",height:"30%",overflowY:"scroll",display:"inline-block",width:"80%",fontSize:"15px"}}>
											{data.post.audioDescription==null?
												<p>
													{data.post.post}
												</p>:
												<audio controls>
												 	<source src={data.post.audioDescription} type="audio/ogg"/>
												  	<source src={data.post.audioDescription} type="audio/mpeg"/>
													Your browser does not support the audio element.
												</audio>
											}
										</li>
									</ul>
								</li>
							</ul>
	 					</RegularPostContainer>
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

													<button class="btn btn-primary dropdown-toggle" 
														type="button" data-toggle="dropdown" 
																					style={{borderColor:"#5298F8",
																							borderStyle:"solid",
																							borderWidth:"1px",
																							color:"#5298F8",
																							backgroundColor:"white"}}>
														
														PostType

													   	<span class="caret"></span>
													</button>

													<ul class="dropdown-menu">
														<li onClick={()=>retrieveRecruitsPosts("Images")}><a>Images</a></li>
														<li onClick={()=>retrieveRecruitsPosts("Videos")}><a>Videos</a></li>
														<li onClick={()=>retrieveRecruitsPosts("Blogs")}><a>Blogs</a></li>
														<li onClick={()=>retrieveRecruitsPosts("RegularPosts")}><a>Regular Posts</a></li>
													</ul>
							  	</div>
						</li>

						<li style={{listStyle:"none",display:"inline-block",marginTop:"2%",marginLeft:"3%"}}>
							<SearchButton placeholder="Search for a community or a person"/> 
						</li>
					</ul>
				</li>
				<hr/>
				<li style={{listStyle:"none",fontSize:"30px",marginLeft:"2%"}}>
					<b> Most Recent Posts </b>
				</li>
				<hr/>
				<li style={{listStyle:"none",marginBottom:"10%"}}>
					<ul style={{padding:"20px"}}>
						{isLoading==true?
							<LoadingScreen/>:
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