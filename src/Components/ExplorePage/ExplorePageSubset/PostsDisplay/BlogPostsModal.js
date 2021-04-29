import React,{useState,useMemo} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import BlogHomeDisplayPortal from "../../ExplorePageSet/BlogHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import PERSONAL_INDUSTRIES from "../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../Constants/industryConstants.js";
import {
	ConstructSuggestedSymposium,
	displayPersonalIndustryFeed
} from "./ConstructSuggestedSymposium.js";
import {Link} from "react-router-dom";
import {HeaderOwnerAndSymposiumInformation} from "./PostDisplayGeneralComp.js";

const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:row;

	@media screen and (max-width:1370px){
		width:100%;
		margin-bottom:30% !important;
		flex-direction:column;

		#horizontalSeperator{
			display:block !important;
		}
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
			width:240px !important;
			height:180px !important;
		}
	}

	@media screen and (max-width:650px){
		margin-left:-5% !important;
		#headerLI{
			margin-top:5% !important;
			width:80% !important;
		}
		#image{
			width:120px !important;
			height:90px !important;
			margin-right:2%;
		}
		#videoDescriptionContainer{
			top:80% !important;
			left:0% !important;
			width:50px !important;
			height:20% !important;
		}
		#headerAudioLI{
			width:200px !important;
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
	width:40%;
	flex-wrap:wrap;
	cursor:pointer;
	@media screen and (max-width:1370px){
		width:90%;
		margin-top:5%;
		#headerBlogImage{
			height:450px !important;
			width:550px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1400px) {
    	#headerPostProfilePictureLIInformation{
			top:60% !important;
		}
    }

	@media screen and (max-width:650px){
		width:100%;
		margin-bottom:-5%;
		#headerAudioTag{
			margin-left:0% !important;
		}
		#headerBlogImage{
			height:200px !important;
			width:90% !important;
		}

		#headerSymposiumSubmitted{
			margin-top:2% !important;
			margin-bottom:2% !important;
			width:90% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#headerBlogImage{
			width:700px !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    	#headerBlogImage{
    		height:400px !important;
			width:90% !important;
		}
		#videoDescriptionContainer{
			top:25% !important;
			left:0% !important;
			width:100px !important;
			height:20% !important;
		}
    }
`;

const PostUserAndSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:2%;
	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:600px){
		#postOwner{
			font-size:15px !important;
			margin-right:2% !important;
		}
	}
`;

const PostUserInformation=styled.div`
	display:flex;
	flex-direction:row;
	padding:10px;
	margin-right:10%;

	@media screen and (max-width:1370px){
		margin-left:0% !important;
	}
`;

const HeaderBlogImageInformationContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-top:2%;
	width:100%;

	@media screen and (max-width:650px){
		margin-top:2% !important;
	}
`;
const PostsContainer=styled.div`
	display:flex;
	flex-direction:row; 
	width:70%;
	height:600px;
	margin-left:5%;
	overflow:scroll;
	flex-wrap: wrap;
	margin-bottom:5%;
	@media screen and (max-width:1370px){
		width:90%;
		overflow:visible !important;
	}
	@media screen and (max-width:1024px) and (max-height:1366px) {
    	height:100%;
    }

	@media screen and (max-width:600px){
		margin-left:-5% !important;
		width:100% !important;
		#smallAudioDescription{
			display:none !important;
		}
	}
`;

const SmallPostContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:95%;
	margin-top:10% !important;
	cursor:pointer;
	padding:10px;
	border-radius:10px;
	border-style:solid;
	border-width:2px;
	border-color:#EFEFEF;

	@media screen and (max-width:650px){
		width:100%;
		margin-top:15% !important;
		margin-bottom:5%;

		#smallImageAndOwnerContainer{
			margin-right:-30px !important;
		}
		#smallPostTitleAndDescription{
			width:50%;
		}
		#smallPostTitle{
			font-size:15px !important;
		}
		#smallPostDescription{

		}
		#smallVideoDescriptionContainer{
			width:50px !important;
			height:40% !important;
		}

		#smallImageContainer{
			height:100px !important;
		}
	}
`;

const SmallPostDescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:5%;
	width:100%;
`;


const ProfileImageCSS={
	position:"relative",
	width:"40px",
	height:"40px",
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
	color:"#3898ec",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
}

const HeaderBlogCSS={
	position:"relative",
	width:"425px",
	height:"276px",
	borderRadius:"5px",
	borderRadius:"5px",
	boxShadow:"1px 1px 10px #707070",
	cursor:"pointer"
}

const SmallBlogImageCSS={
	position:"relative",
	width:"160px",
	height:"123px",
	borderRadius:"5px",
	marginBottom:"5%"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	display:"none"
}

const BlogImageContainerCSS={
	position:"relative",
	width:"100%",
	height:"100%",
	borderRadius:"5px"
}


const ProfilePictureLink=styled(Link)`
	position:relative;
`;


const BlogPostModal=(props)=>{
	const headerBlog=props.posts[0];
	const blogs=props.posts.slice(1,props.posts.length);


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

	const detectEndOfPostContainer=(divElement)=>{
		if(	divElement.scrollHeight - divElement.scrollTop - divElement.clientHeight < 1
			 && props.endOfPostsDBIndicator==false && props.isLoadingReloadedPosts==false){
			props.triggerReloadingPostsHandle();
		}
	}

	const posts=useMemo(()=>{
		return(
			<React.Fragment>
				{props.posts.length>=1?
					<React.Fragment>
						<HeaderContainer>
							<HeaderOwnerAndSymposiumInformation
								headerPost={headerBlog}
							/>
							<div id="headerBlogImage" style={HeaderBlogCSS}>
								<img  onClick={()=>handleDisplayHeaderBlog()}  id="headerBlogLI"
									src={headerBlog.blogImageUrl} style={{borderRadius:"5px",position:"relative",width:"100%",height:"100%"}}
								/>
								{headerBlog.videoDescription!=null &&(
									<video id="videoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
										style={{position:"absolute",top:"72%",left:"0%",borderRadius:"50%",width:"90px",height:"80px",
												backgroundColor:"#151515",
												borderStyle:"solid",
												borderColor:"white",
												borderWidth:"5px"}} width="200px" height="60%">
										<source src={headerBlog.videoDescription} type="video/mp4"/>
									</video>
								)}
							</div>

							<HeaderBlogImageInformationContainer>
								<p style={{fontSize:"20px",listStyle:"none",height:"60px",overflowY:"hidden"}}>
									<b>{headerBlog.title}</b>
								</p>

								<p style={{fontSize:"13px",color:"#8c8c8c",listStyle:"none",height:"80px",overflowY:"hidden"}}>
									{headerBlog.description}
								</p>
							</HeaderBlogImageInformationContainer>
						</HeaderContainer>
						<hr id="horizontalSeperator" style={HorizontalLineCSS}/>
						<PostsContainer>
								{blogs.map(data=>
									<React.Fragment>
											{data=="suggestedSymposium"?
												<ConstructSuggestedSymposium
													personalInformation={personalInformationRedux}
													previousProps={props}
													isBlogPost={true}
													currentHeight={"30%"}
												/>
											:
											<SmallPostContainer onClick={()=>displayBlogModal(data)}>
												<div id="smallImageAndOwnerContainer" 
													style={{marginRight:"3%",display:"flex",flexDirection:"column"}}>
													<div id="smallImageContainer" style={SmallBlogImageCSS}>
														<img id="image" src={data.blogImageUrl} style={BlogImageContainerCSS}/>
													</div>
													<ul style={{padding:"0px",zIndex:"8"}}>
														<li style={{listStyle:"none",display:"inline-block"}}>
															<img id="profilePicture" 
																src={data.owner.profilePicture==null?
																		NoProfilePicture:
																		data.owner.profilePicture
																	} style={ProfileImageCSS}
															/>
														</li>
														<li style={{listStyle:"none",display:"inline-block",maxWidth:"90px",overflow:"hidden",maxHeight:"20px",marginLeft:"2%"}}>
															{data.owner.firstName}
														</li>
													</ul>
												</div>
												<div id="smallPostTitleAndDescription"
												 	style={{display:"flex",flexDirection:"column"}}>
													<p id="smallPostTitle" style={{fontSize:"20px",height:"60px",overflowY:"hidden",marginBottom:"2%"}}>
														<b>
															{data.title}
														</b>
													</p>

													<p id="smallPostDescription" style={{fontSize:"13px",color:"#8c8c8c",height:"50px",overflowY:"hidden"}}>
														{data.description}
													</p>
												</div>
												{/*
													{data.audioDescription!=null &&(
														<li id="smallAudioDescription" style={{listStyle:"none"}}>
															<audio style={{width:"150px",height:"25px"}} controls muted>
															  	<source src={data.audioDescription} type="audio/ogg"/>
															  	<source src={data.audioDescription} type="audio/mp4"/>
																Your browser does not support the audio element.
															</audio>
														</li>
													)}
													<div onClick={()=>displayBlogModal(data)} style={{display:"flex",flexDirection:"row",marginBottom:"1%",cursor:"pointer"}}>
														<div id="smallImageContainer" style={SmallBlogImageCSS}>
															<img id="image" src={data.blogImageUrl} style={BlogImageContainerCSS}/>
															{data.videoDescription!=null &&(
																<video id="smallVideoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
																	style={{position:"absolute",top:"40%",left:"0%"}} width="100px" height="40%">
																	<source src={data.videoDescription} type="video/mp4"/>
																</video>
															)}
														</div>

														<SmallPostDescriptionContainer>
															<li style={{fontSize:"20px",listStyle:"none",height:"60px",overflowY:"hidden",marginBottom:"2%"}}>
																<b>
																	{data.title}
																</b>
															</li>

															<li style={{fontSize:"13px",color:"#8c8c8c",listStyle:"none",height:"50px",overflowY:"hidden"}}>
																{data.description}
															</li>
														</SmallPostDescriptionContainer>
													</div>
													<ul style={{padding:"0px",zIndex:"8",top:"10%"}}>
														<li style={{listStyle:"none"}}>
															<ul style={{padding:"0px"}}>
																<img id="profilePicture" 
																	src={data.owner.profilePicture==null?
																			NoProfilePicture:
																			data.owner.profilePicture
																		} style={ProfileImageCSS}
																/>
																<li style={{listStyle:"none",display:"inline-block",maxWidth:"90px",overflow:"hidden",maxHeight:"20px",marginLeft:"2%"}}>
																	{data.owner.firstName}
																</li>
															</ul>
														</li>
													</ul>
												*/}
											</SmallPostContainer>

										}	
										<hr/>
									</React.Fragment>
								)}
								{props.endOfPostsDBIndicator==false && (
									<React.Fragment>
										{props.isLoadingReloadedPosts==true?
											<p>Loading please wait...</p>:
											<p onClick={()=>props.triggerReloadingPostsHandle("Blogs")} style={{...NextButtonCSS,marginTop:"5%"}}>
												Next
											</p>
										}
									</React.Fragment>
								)}
						</PostsContainer>
					</React.Fragment>:
					<p> No posts </p>
				}
			</React.Fragment>
		)
	},[props.posts.length,props.isLoadingReloadedPosts,props.endOfPostsDBIndicator]);

	return(
		<Container>
			{posts}
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
		</Container>
	)
}
export default BlogPostModal;