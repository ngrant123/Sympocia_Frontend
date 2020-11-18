import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import {PostContext} from "./PostsContext.js";
import {UserContext} from "../../UserContext.js";
import {CompanyPostsContext} from "../../../CompanyProfile/CompanyPostsContext.js";
import {CompanyContext} from "../../../CompanyProfile/CompanyContext.js";
import SympociaIcon from "../../../../../designs/img/SympociaIcon.jpg";
import {useSelector} from "react-redux";
import {
		getImagesPosts,
		getVideosPosts,
		getBlogPosts
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const SympociaStampIconContainer=styled.div`
	position:relative;
	border-radius:50%;
	width:65%;
	height:40%;
	background-color:red;
`;

const CreatePostContainer=styled.div`
	position:relative;
	padding:15px;
	width:500px;
	border-radius:5px;
	transition:.8s;
	box-shadow:1px 1px 5px #9395a0;
	padding-top:20px;
	height:60%;

	&:hover{
		box-shadow:5px 5px 5px 5px #9395a0;
	}
`;

const RecommendedContainer=styled.div`
	position:relative;
	padding:15px;
	border-radius:5px;
	transition:.8s;

	&:hover{
		box-shadow:1px 1px 5px #9395a0;
	}
`;


const RecommendedImage=styled.div`
	 position:relative;
	 width:150px;
	 height:120px;
	 border-radius:5px;
	 background-color:red;
`;

const RecommnededBlogImage=styled.div`
	position:relative;
	 width:350px;
	 height:200px;
	 border-radius:5px;
	 background-color:red;

`;

const RecommnededVideo=styled.div`
	 position:relative;
	 width:350px;
	 height:200px;
	 border-radius:5px;
	 background-color:red;
`;

const IndustryButtonCSS={
	listStyle:"none",
	display:"inline-block",
	padding:"10px",
	color:"white",
	backgroundColor:"#5298F8",
	borderRadius:"5px",
	padding:"5px"
}

const RecommendedImageCSS={
	 position:"relative",
	 width:"150px",
	 height:"120px",
	 borderRadius:"5px",
	 backgroundColor:"red"
}

const RecommendedVideoCSS={
	 position:"relative",
	 width:"350px",
	 height:"200px",
	 borderRadius:"5px"
}

const RecommendedBlogCSS={
	position:"relative",
	width:"350px",
	height:"250px",
	borderRadius:"5px",
	backgroundColor:"red"
}

const BlogCreationButton=styled(Link)`
	position:relative;

`;

const NoPostsModal=(props)=>{
	const [recommendedPosts,changeRecommendedPosts]=useState([]);
	var profileContext;
	var postContext;
	if(props.profilePageType=="Company"){
		postContext=useContext(CompanyPostsContext);
		profileContext=useContext(CompanyContext);
	}else{
		 postContext=useContext(PostContext);
		 profileContext=useContext(UserContext);
	}

	useEffect(()=>{
		const getData=async()=>{

			if(props.postType=="image"){
				const imageData=await getImagesPosts("General",1);
				
				changeRecommendedPosts(imageData);
				console.log(imageData);
			}else if(props.postType=="video"){
				const videoData=await getVideosPosts("General",1);
				changeRecommendedPosts(videoData);
				console.log(videoData);
			}else if(props.postType=="blog"){
				const blogData=await getBlogPosts("General",1);
				changeRecommendedPosts(blogData);
				console.log(blogData);
			}else{

			}
		}
		getData();
	},[]);

	const createPostModal=()=>{
		console.log(props);
		if(props!=null){
			var displayCreatePostIndicator;
			if(props.profilePageType=="Company"){
				displayCreatePostIndicator=profileContext.state.isOwnProfile;
			}else{
				displayCreatePostIndicator=profileContext.isOwnProfile
			}
			return	<React.Fragment>
						{displayCreatePostIndicator==true?
							 <li style={{marginRight:"5%",listStyle:"none",display:"inline-block"}}>
									<CreatePostContainer id="createPostContainer">
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"20%",marginBottom:"2%"}}>
												<SympociaStampIconContainer>
													<img position="relative" src={SympociaIcon} width="100%" height="100%"/>
												</SympociaStampIconContainer>
											</li>
											<p style={{fontSize:"20px",marginLeft:"10%"}}><b>Upload a {props.postType} of your own to get started</b></p>
											<p>Show people your story through {props.postType}s and start sharing your story to others </p>

											<a href="javascript:void(0);" style={{textDecoration:"none",color:"white"}}>
												<li onClick={()=>postContext.updatePostComponent(props.postType)}style={{marginLeft:"33%",listStyle:"none",display:"inline-block",padding:"5px",color:"white",backgroundColor:"#C8B0F4",borderRadius:"5px",padding:"10px",fontSize:"15px"}}>
													{props.postType=="blog"?
														<BlogCreationButton style={{textDecoration:"none",color:"white"}} to={{pathname:`/blog/${props._id}`,state:{postType:"Creation"}}}>
															<p>
																Upload a {props.postType}
															</p>
														</BlogCreationButton>
														:
														<p> Upload a {props.postType} </p>
													}
												</li>
											</a>
											</ul>
									</CreatePostContainer>
									<hr/>
								</li>:null
						}
					</React.Fragment>
				}
			}
	 
	const postTypeNoModal=()=>{
		if(props.postType=="image"&&props.postType!=null){
			return <ul style={{padding:"0px"}}>
					{createPostModal()}

					<li id="recommendedPostsLI" style={{position:"relative",top:"0%",listStyle:"none",display:"inline-block",marginTop:"1%"}}>	
						<RecommendedContainer>
							<ul style={{position:"relative",padding:"0px"}}>
									<p style={{fontSize:"20px"}}>
										<b>Recommended {props.postType}</b>
								    </p>
									<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any images here are 
										a list of recommended images that we could find 
									</p>

									<li style={{listStyle:"none",height:"270px",overflowY:"auto"}}>
										<ul style={{padding:"0px"}}>
											{recommendedPosts!=null?
												<React.Fragment>
													{recommendedPosts.map(data=>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%",marginBottom:"10%"}}>
															<img src={data.imgUrl} style={RecommendedImageCSS}/>
														</li>
													)}
												</React.Fragment>:null
										}
											
										</ul>
									</li>
							</ul>
						</RecommendedContainer>
						
					</li>
				</ul>

			}else if(props.postType=="video"&&props.postType!=null){	
				return <ul style={{padding:"0px"}}>
							{createPostModal()}

							<li id="recommendedPostsLI" style={{position:"relative",top:"0%",listStyle:"none",display:"inline-block",marginTop:"10%"}}>	
								<RecommendedContainer>
									<ul style={{position:"relative",padding:"0px"}}>
											<p style={{fontSize:"20px"}}>
												<b>Recommended {props.postType}</b>
										    </p>
											<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any videos here are 
												a list of recommended videos that we could find 
											</p>

											<li style={{listStyle:"none",height:"400px",overflowY:"auto"}}>
												<ul style={{padding:"0px"}}>
													{recommendedPosts.map(data=>
														<React.Fragment>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%"}}>
																<video style={RecommendedVideoCSS} controls>
																	<source src={data.videoUrl} type="video/mp4"/>
																</video>
															</li>
															<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block"}}>
																<p style={{fontSize:"20px"}}><b>{data.title}</b></p>
																{/*
																	<p> Nathan Grant </p>
																	<p>	June 34 2019</p>
																*/}
																<p style={IndustryButtonCSS}>{data.industriesUploaded[0].industry} </p>
															</li>
														</React.Fragment>
													)}
												</ul>

											</li>
									</ul>
								</RecommendedContainer>
							</li>
						</ul>

			}else if(props.postType=="blog"&&props.postType!=null){
				return <ul style={{padding:"0px",height:"650px",width:"100%",overflow:"scroll"}}>
							{createPostModal()}

							<li id="recommendedPostsLI" style={{position:"relative",listStyle:"none",display:"inline-block"}}>	
								<RecommendedContainer>
										<ul style={{position:"relative",padding:"0px"}}>
												<p style={{fontSize:"20px"}}>
													<b>Recommended {props.postType}</b>
											    </p>
												<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any blogs here are 
													a list of recommended blogs that we could find 
												</p>

												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														{recommendedPosts.map(data=>
															<React.Fragment>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%"}}>
																	<img src={data.blogImageUrl} style={RecommendedBlogCSS}/>
																</li>
																<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block"}}>
																	<p style={{fontSize:"20px"}}><b>{data.title}</b></p>
																	{/*
																	 	<p> Nathan Grant </p>
																		<p>	June 34 2019</p>
																	*/}
																	<p style={IndustryButtonCSS}>{data.industriesUploaded[0].industry}</p>
																</li>
															</React.Fragment>
														)}
													</ul>

												</li>
										</ul>
								</RecommendedContainer>
								
							</li>
						</ul>
						
			}else{
				return <ul style={{padding:"0px"}}>

							<li id="recommendedPostsLI" style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",marginTop:"10%"}}>	
								<ul style={{padding:"0px"}}>
									{createPostModal()}
									<li style={{listStyle:"none"}}>
										<RecommendedContainer>
											<ul style={{position:"relative",padding:"0px"}}>
													<p style={{fontSize:"20px"}}>
														<b>Recommended {props.postType}</b>
												    </p>
													<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any posts here are 
														a list of recommended posts that we could find 
													</p>

													<li style={{listStyle:"none"}}>
														<ul style={{padding:"0px"}}>
															{recommendedPosts.map(data=>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%"}}>
																	<ul style={{padding:"0px"}}>
																		<li style={{listStyle:"none",display:"inline-block"}}>
																			<ul style={{padding:"0px"}}>
																				<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
																					<RecommendedImage>

																					</RecommendedImage>
																				</li>
																				<li style={{listStyle:"none",display:"inline-block"}}>
																					<ul style={{padding:"0px"}}>
																						<li style={{listStyle:"none",fontSize:"25px"}}>
																							<b>Nathan</b>
																						</li>
																						<li style={{color:"#A4A4A4"}}>
																							Short bio about user etc etc etc
																						</li>
																					</ul>

																				</li>

																			</ul>
																		</li>

																		<li style={{listStyle:"none",display:"inline-block"}}>
																			
																			Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
																					 sed do eiusmod tempor incididunt ut labore et dolore magna
																					 aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
																					 ullamco laboris nisi ut aliquip ex ea commodo consequat. 
																					 Duis aute irure dolor in reprehenderit in voluptate velit 
																					 esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
																					 occaecat cupidatat non proident, sunt in culpa qui officia 
																					 deserunt mollit anim id est laborum.
																		</li>
																	</ul>
																</li>
															)}
														</ul>
													</li>
											</ul>
										</RecommendedContainer>
									</li>
								</ul>
							</li>
						</ul>
				}
		}

	return(
			<React.Fragment>
				<p>Currently there are no posts available here</p>
					{postTypeNoModal()}
			</React.Fragment>
	)
}

const mapStateToProps=state=>{
	return {
		_id:state.personalInformation.id
	}
}

export default connect(
	mapStateToProps,
	null
)(NoPostsModal);