import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import BlogHomeDisplayPortal from "../../../HomePageSet/BlogHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import {DisplayRecruitButton} from "./ImagePostsModal.js";
import {
	ConstructSuggestedSymposium,
	displayPersonalIndustryFeed
} from "./ConstructSuggestedSymposium.js";
import {Link} from "react-router-dom";

const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:row;

	@media screen and (max-width:1370px){
		width:120%;
		margin-left:-5% !important;
		margin-bottom:30% !important;
		flex-direction:column;

		#headerLI{
			display:block !important;
			margin-top:10% !important;
			width:120% !important;
			margin-left:-5% !important;
		}
		#headerBlogInformation{
			width:110% !important;
			height:50px !important;
			overflow:scroll !important;
			display:block !important;
			margin-top:10% !important;
			margin-left:5% !important;
		}
		#smallBlogInformation{
			display:block !important;
			margin-top:80% !important;
			top:10px !important;
		}
		#smallPostLI{
			width:95% !important;
			margin-top:20% !important;
		}
		#smallTitleAndDescription{
			height:30px !important;
			width:300px !important;
			overflow:scroll !important;
		}
		#image{
			width:280px;
			height:230px;
			margin-right:2%;
		}
		#suggestedSymposiumLI{
			top:-15% !important;
			width:70% !important;
		}
		#postLI{
			margin-right:2% !important;
		}
		#headerBlogOwnerInformation{
			width:110% !important;
		}
		#headerBlogImage{
			width:600px !important;
			height:55%;
		}
	}

	@media screen and (max-width:600px){
		margin-left:-5% !important;
		#headerBlogImage{
			width:200px !important;
			height:55%;
		}
		#headerLI{
			margin-top:5% !important;
			width:80% !important;
		}
		#image{
			width:120px !important;
			height:90px !important;
			margin-right:2%;
		}
	}

	@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		#headerLI{
			margin-top:25% !important;
		}
    }
`;

const HeaderBlog=styled.div`
	width:400px;
	height:55%;
	border-radius:5px;
	border-radius:5px;
`;

const HeaderBlogCSS={
	width:"400px",
	height:"300px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const BlogImageContainerCSS={
	position:"relative",
	width:"280px",
	height:"230px",
	borderRadius:"5px"
}

const VideosContainer=styled.div`
	position:relative;
	width:280px;
	height:230px;
	border-radius:5px;
	background-color:red;
`;

const ShadowContainer= styled.div`
	position:absolute;
	width:280px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
	@media screen and (max-width:740px) and (max-height:420px){
    	display:none !important;
    }

	@media screen and (max-width:450px){
		display:none !important;
		position:relative;
	}
`;

const ProfileImage=styled.div`
	position:relative;
	width:50px;
	height:50px;
	background-color:red;
	border-radius:50%;
`;

const VideoDesriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:60px;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;

const HeaderContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:50%;
	justify-content:center;
	align-items:center;
	flex-wrap:wrap;

	@media screen and (max-width:1370px){
		height:200%;
		width:70%;
		overflow-y:scroll;
	}
	@media screen and (max-width:600px){
		margin-top:-100px !important;
		#headerAudioTag{
			margin-left:10% !important;
		}
		#headerBlogImage{
			height:200px !important;
		}
    }

    @media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:10px !important;
    }
`;

const HeaderBlogImageInformationContainer=styled.div`
	display:flex;
	flex-direction:column;
`;
const PostsContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:50%;
	height:600px;
	overflow-y:scroll;
	margin-left:5%;

	@media screen and (max-width:1370px){
		width:90%;
		height:100%;
		margin-left:0%;
		margin-top:20%;
	}
`;

const SmallPostContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:100%;
`;

const SmallPostDescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:2;
	width:100%;
`;


const ProfileImageCSS={
	position:"relative",
	width:"50px",
	height:"50px",
	borderRadius:"50%"
}

const SymposiumLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const NextButtonCSS={
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	color:"#3898ec",
	height:"70px",
	width:"30%",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
}


const ProfilePictureLink=styled(Link)`
	position:relative;
`;


const BlogPostModal=(props)=>{
	const headerBlog=props.posts[0];
	const blogs=props.posts.slice(1,props.posts.length);
	console.log(props);

	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);

	const [displayBlogDisplayPortal,changeBlogDisplay]=useState(false);
	const [selectedBlog,changeSelectedBlog]=useState();
	const [displayRecommendedBlogs,changeRecommendedBlogs]=useState();


	const closeModal=()=>{
		changeBlogDisplay(false)
	}

	const handleDisplayHeaderBlog=()=>{
		changeSelectedBlog(headerBlog);
		changeRecommendedBlogs(blogs);
		changeBlogDisplay(true);
	}

	const displayBlogModal=(data)=>{
		changeSelectedBlog(data);
		changeRecommendedBlogs(blogs);
		changeBlogDisplay(true);
	}

	const tester=()=>{
		console.log("Testing");
	}

	const constructSuggestedSymposium=(personalInformation,previousProps)=>{
		
		console.log(personalInformation);
		const {personalInformationState}=personalInformation;
		var symposiumContainer=new Map();
		var selectedSymposiums=[];
			var counter=0;
			while(counter<3){   
				if(previousProps.isPersonalProfile==true){
					const randomNum=Math.floor(Math.random() * ((PERSONAL_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}else{
					const randomNum=Math.floor(Math.random() * ((COMPANY_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}
				counter++;
			}

			return <ul style={{padding:"0px",position:"relative"}}>
						{selectedSymposiums.map(data=>
							<a href="javascript:void(0);">
								<li onClick={()=>displayPersonalIndustryFeed(personalInformation,data,selectedSymposiums,previousProps)} style={{fontSize:"15px",color:"white",background:data.backgroundColor,padding:"20px",listStyle:"none",borderRadius:"5px",marginBottom:"5%"}}>
									<b>{data.industry}</b>
								</li>
							</a>
						)}
				   </ul>
	}

	const detectEndOfPostContainer=(divElement)=>{
		if(	divElement.scrollHeight - divElement.scrollTop - divElement.clientHeight < 1
			 && props.endOfPostsDBIndicator==false && props.isLoadingReloadedPosts==false){
			props.triggerReloadingPostsHandle();
		}
	}
	return(
		<Container>
			{props.posts.length>=1?
				<React.Fragment>
					<HeaderContainer>
							<audio id="headerAudioTag" style={{marginLeft:"-55%",width:"200px"}} controls>
							  	<source src={headerBlog.audioDescription} type="audio/ogg"/>
							  	<source src={headerBlog.audioDescription} type="audio/mpeg"/>
								Your browser does not support the audio element.
							</audio>	
							<li id="headerBlogOwnerInformation" style={{listStyle:"none",width:"100%"}}>
								<ul style={{padding:"0px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={{listStyle:"none",display:"inline-block"}}>
											{headerBlog.videoDescription!=null?
												<li style={{listStyle:"none",display:"inline-block",marginRight:"4%"}}>
													<VideoDesriptionContainer>
														   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
																<source src={headerBlog.videoDescription} type="video/mp4"/>
															</video>
													</VideoDesriptionContainer>
												</li>:
												<ProfilePictureLink to={{pathname:`/profile/${headerBlog.owner._id}`}}>
														{headerBlog.owner.profilePicture!=null?
															<img src={headerBlog.owner.profilePicture} style={ProfileImageCSS}/>:
															<img src={NoProfilePicture} style={ProfileImageCSS}/>
														}
												</ProfilePictureLink>
											}
										</li>
									</a>
									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",marginRight:"5%"}}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
											incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
											exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
											dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
											Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
											anim id est laborum.
									</li>
									<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,headerBlog.industriesUploaded,props)} style={SymposiumLabelCSS}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											{headerBlog.industriesUploaded[0].industry}
										</a>
									</li>
									{props.isGuestProfileIndicator==false &&(
										<DisplayRecruitButton
											post={headerBlog}
											previousProps={props}
										/>
									)}
								</ul>
							</li>

							<HeaderBlogImageInformationContainer>
								<img   onClick={()=>handleDisplayHeaderBlog()} 
									id="headerBlogImage" src={headerBlog.blogImageUrl} style={HeaderBlogCSS}/>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",height:"60px",overflowY:"hidden"}}>
										<b>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
											incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
											exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
											dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
											Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
											anim id est laborum.
										</b>
									</li>

									<li style={{fontSize:"15px",color:"#8c8c8c",listStyle:"none",height:"80px",overflowY:"hidden"}}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
											incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
											exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
											dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
											Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
											anim id est laborum.
									</li>
								</ul>
							</HeaderBlogImageInformationContainer>
					</HeaderContainer>

					<PostsContainer>
							{blogs.map(data=>
								<React.Fragment>
										{data=="suggestedSymposium"?
											<ConstructSuggestedSymposium
												personalInformation={personalInformationRedux}
												previousProps={props}
											/>
										:
										<SmallPostContainer>
											<div onClick={()=>displayBlogModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%",cursor:"pointer"}}>
												<img id="image" src={data.blogImageUrl} style={BlogImageContainerCSS}/>
												<ul style={{padding:"0px",zIndex:"8",top:"10%"}}>
													{props.isGuestProfileIndicator==false &&(
														<li style={{listStyle:"none"}}>
															<DisplayRecruitButton
																post={data}
																previousProps={props}
															/>
														</li>
													)}
													<li style={{listStyle:"none"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block"}}>
																<img id="profilePicture" 
																	src={data.owner.profilePicture==null?
																			NoProfilePicture:
																			data.owner.profilePicture
																		} style={ProfileImageCSS}
																/>
																{/*
																	{data.videoDescription!=null?
																			<VideoDesriptionContainer>
																				   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
																						<source src={data.videoDescription} type="video/mp4"/>
																					</video>
																			</VideoDesriptionContainer>:
																	}
																*/}
															</li>
															<li style={{listStyle:"none",display:"inline-block",maxWidth:"70px",overflow:"hidden",maxHeight:"20px"}}>
																Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
														incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
														exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
														dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
														Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
														anim id est laborum.
															</li>
														</ul>
													</li>
													<li id="smallAudioDescription" style={{listStyle:"none"}}>
														<audio style={{width:"150px",height:"25px"}} controls muted>
														  	<source src={data.audioDescription} type="audio/ogg"/>
														  	<source src={data.audioDescription} type="audio/mpeg"/>
															Your browser does not support the audio element.
														</audio>
													</li>
												</ul>
											</div>
											<SmallPostDescriptionContainer>
												<li style={{listStyle:"none",height:"60px",overflowY:"hidden"}}>
													<b>
														Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
														incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
														exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
														dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
														Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
														anim id est laborum.
													</b>
												</li>

												<li style={{fontSize:"15px",color:"#8c8c8c",listStyle:"none",height:"50px",overflowY:"hidden"}}>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
														incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
														exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
														dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
														Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
														anim id est laborum.
												</li>
												<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} 
												style={{...SymposiumLabelCSS,marginTop:"2%"}}>
													{data.industriesUploaded[0].industry}
												</li>
											</SmallPostDescriptionContainer>
										</SmallPostContainer>

									}	
									<hr/>
								</React.Fragment>
							)}
							{props.endOfPostsDBIndicator==false && (
								<React.Fragment>
									{props.isLoadingReloadedPosts==true?
										<p>Loading please wait...</p>:
										<p onClick={()=>props.triggerReloadingPostsHandle("Blogs")} style={NextButtonCSS}>
											Next Page
										</p>
									}
								</React.Fragment>
							)}
					</PostsContainer>
					{displayBlogDisplayPortal==false?
						null:
						<BlogHomeDisplayPortal
							closeModal={closeModal}
							selectedBlog={selectedBlog}
							recommendedBlogs={displayRecommendedBlogs}
							targetDom={props.targetDom}
							personalId={personalInformationRedux.id}
						/>
					}
				</React.Fragment>
				:<p> No posts </p>
			}
		</Container>
	)
}

/*
									<li id="postLI" style={{list0Style:"none",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginBottom:"2%"}}>
												<ul style={{padding:"0px",zIndex:"8",marginBottom:"1%"}}>
													{data.audioDescription!=null?
														<li style={{llistStyle:"none",display:"inline-block"}}>
															<audio style={{width:"200px"}} controls>
															  	<source src={data.audioDescription} type="audio/ogg"/>
															  	<source src={data.audioDescription} type="audio/mpeg"/>
																Your browser does not support the audio element.
															</audio>
														</li>:null
													}
												</ul>
											</li>
											<li onClick={()=>displayBlogModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%",marginRight:"2%",backgroundColor:"blue"}}>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<img id="image" src={data.blogImageUrl} style={BlogImageContainerCSS}/>
												</a>
											</li>
											<li id="smallBlogInformation" style={{position:"relative",top:"0%",listStyle:"none",display:"inline-block"}}>
												<ul style={{padding:"0px",position:"absolute",top:"-100px"}}>
													<li id="smallTitleAndDescription" style={{listStyle:"none",height:"170px",width:"280px",overflow:"hidden",marginBottom:"2%",fontSize:"15px"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none"}}>
																<b>
																	{data.title}
																</b>
															</li>

															<li style={{color:"#8c8c8c",fontSize:"12px",listStyle:"none"}}>
																{data.description}
															</li>
														</ul>

													</li>
													<li style={{listStyle:"none"}}>
														<ul style={{padding:"0px"}}>
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"20%"}}>
																	{data.videoDescription!=null?
																		<li style={{listStyle:"none",display:"inline-block",marginRight:"4%"}}>
																			<VideoDesriptionContainer>
																				   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
																						<source src={data.videoDescription} type="video/mp4"/>
																					</video>
																			</VideoDesriptionContainer>
																		</li>:
																		<img id="profilePicture" 
																			src={data.owner.profilePicture==null?
																					NoProfilePicture:
																					data.owner.profilePicture
																				} style={ProfileImageCSS}
																		/>
																	}
																</li>
															</a>
															<li style={{position:"relative",listStyle:"none",display:"inline-block",top:"-20px"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none"}}>
																		{data.owner.firstName}
																	</li>
																	<DisplayRecruitButton
																		post={data}
																		previousProps={props}
																	/>

																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} style={SymposiumLabelCSS}>
																			{data.industriesUploaded[0].industry}
																		</li>
																	</a>
																</ul>
															</li>
														</ul>
													</li>
												</ul>
											</li>

										</ul>
									</li>
*/
export default BlogPostModal;