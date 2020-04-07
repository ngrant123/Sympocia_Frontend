import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import {PostConsumer} from "./PostsContext.js";
import SympociaIcon from "../../../../../designs/img/SympociaIcon.jpg"

const SympociaStampIconContainer=styled.div`
	position:relative;
	border-radius:50%;
	width:65%;
	height:35%;
	background-color:red;
`;

const CreatePostContainer=styled.div`
	position:relative;
	padding:15px;
	width:500px;
	border-radius:5px;
	transition:.8s;
	box-shadow:1px 1px 5px #9395a0;

	&:hover{
		box-shadow:5px 5px 5px #9395a0;
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
	 width:110px;
	 height:100px;
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


const NoPostsModal=(props)=>{
	console.log("No posts modal testing");
	const postContext=useContext(PostConsumer);
	console.log(postContext);
	useEffect(()=>{

	},[]);

	const createPostModal=()=>{
		if(props!=null){

			return <li style={{marginRight:"20%",listStyle:"none",display:"inline-block"}}>
						<CreatePostContainer>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginLeft:"20%",marginBottom:"2%"}}>
									<SympociaStampIconContainer>
										<img position="relative" src={SympociaIcon} width="100%" height="100%"/>
									</SympociaStampIconContainer>
								</li>
								<p style={{fontSize:"20px",marginLeft:"10%"}}><b>Upload a picture of your own to get started</b></p>
								<p>Show people your story through images and start sharing your story to others </p>
								<li onClick={()=>postContext.updatePostComponent(props.postType)}style={{marginLeft:"33%",listStyle:"none",display:"inline-block",padding:"5px",color:"white",backgroundColor:"#C8B0F4",borderRadius:"5px",padding:"10px",fontSize:"15px"}}>
									{props.postType=="blog"?
										<p><a style={{textDecoration:"none",color:"white"}} href="/blog">Upload a {props.postType}</a></p>:
										<p>Upload a {props.postType}</p>
									}
								</li>
								</ul>
						</CreatePostContainer>
				</li>
		}
	}
	 
	const postTypeNoModal=()=>{
		console.log("Testing");

		if(props.postType=="image"&&props.postType!=null){
			const [recommendedImage,changeRecommendedImages]=useState([{}]);
			return <ul style={{padding:"0px"}}>
					{createPostModal()}

					<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",marginLeft:"-15%"}}>	
						<RecommendedContainer>
							<ul style={{position:"relative",padding:"0px"}}>
									<p style={{fontSize:"20px"}}>
										<b>Recommended {props.postType}</b>
								    </p>
									<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any images here are 
										a list of recommended images that we could find 
									</p>

									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											{recommendedImage.map(data=>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%"}}>
													<RecommendedImage>

													</RecommendedImage>
												</li>
											)}
										</ul>

									</li>
							</ul>
						</RecommendedContainer>
						
					</li>
				</ul>

			}else if(props.postType=="video"&&props.postType!=null){	
				const [recommendedVideo,changeRecommendedVideos]=useState([{},{},{}]);
				return <ul style={{padding:"0px"}}>
							{createPostModal()}


							<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",marginLeft:"-15%"}}>	
								<RecommendedContainer>
									<ul style={{position:"relative",padding:"0px"}}>
											<p style={{fontSize:"20px"}}>
												<b>Recommended {props.postType}</b>
										    </p>
											<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any videos here are 
												a list of recommended videos that we could find 
											</p>

											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													{recommendedVideo.map(data=>
														<React.Fragment>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%"}}>
																<RecommnededVideo>

																</RecommnededVideo>
															</li>
															<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block"}}>
																<p style={{fontSize:"20px"}}><b> Video title is this titel you feel me  Video title is this titel you feel me  Video title is this titel you feel me </b></p>
																<p> Nathan Grant </p>
																<p>	June 34 2019</p>
																<p style={IndustryButtonCSS}> Testing </p>
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
				const [recommendedBlogs,changeRecommendedBlogs]=useState([{},{},{}]);
				return <ul style={{padding:"0px"}}>
							{createPostModal()}

							<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",marginLeft:"-15%"}}>	
								<RecommendedContainer>
										<ul style={{position:"relative",padding:"0px"}}>
												<p style={{fontSize:"20px"}}>
													<b>Recommended {props.postType}</b>
											    </p>
												<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any blogd here are 
													a list of recommended blogs that we could find 
												</p>

												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														{recommendedBlogs.map(data=>
															<React.Fragment>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%"}}>
																	<RecommnededBlogImage>

																	</RecommnededBlogImage>
																</li>
																<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block"}}>
																	<p style={{fontSize:"20px"}}><b> Blog title is this titel you feel me  Video title is this titel you feel me  Video title is this titel you feel me </b></p>
																	<p> Nathan Grant </p>
																	<p>	June 34 2019</p>
																	<p style={IndustryButtonCSS}> Testing </p>
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
				const [recommendedRegularPosts,changeRecommendedRegularPosts]=useState([{},{},{}]);
				return <ul style={{padding:"0px"}}>
							{createPostModal()}

							<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",marginLeft:"-15%"}}>	
								<RecommendedContainer>
									<ul style={{position:"relative",padding:"0px"}}>
											<p style={{fontSize:"20px"}}>
												<b>Recommended Image</b>
										    </p>
											<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any posts here are 
												a list of recommended posts that we could find 
											</p>

											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													{recommendedRegularPosts.map(data=>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%"}}>
															<RecommendedImage>

															</RecommendedImage>
														</li>
													)}
												</ul>

											</li>
									</ul>
								</RecommendedContainer>
							</li>
						</ul>
				}
		}

	return(
			<React.Fragment>
				<p>Currently there are no videos available here</p>
					{postTypeNoModal()}
			</React.Fragment>
	)
}

export default NoPostsModal;