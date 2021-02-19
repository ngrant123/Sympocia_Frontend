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
		width:100%;
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
	borderRadius:"5px",
	cursor:"pointer"
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
	flex-wrap:wrap;
	@media screen and (max-width:1370px){
		width:90%;
		margin-top:5%;
		#headerBlogImage{
			height:400px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1400px) {
    	#headerPostProfilePictureLIInformation{
			top:60% !important;
		}
    }

	@media screen and (max-width:650px){
		margin-top:-130px !important;
		#headerAudioTag{
			margin-left:0% !important;
		}
		#headerBlogImage{
			height:200px !important;
		}

		#headerSymposiumSubmitted{
			margin-top:2% !important;
			margin-bottom:2% !important;
			width:90% !important;
		}
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    	#headerBlogImage{
			height:300px !important;
		}
    }
`;

const HeaderBlogImageInformationContainer=styled.div`
	display:flex;
	flex-direction:column;
`;
const PostsContainer=styled.div`
	display:flex;
	flex-direction:row; 
	width:50%;
	height:600px;
	margin-left:5%;
	overflow:scroll;
	flex-wrap: wrap;
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
	width:100%;
	margin-top:5% !important;
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
	
	}

	const constructSuggestedSymposium=(personalInformation,previousProps)=>{
		

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
						{headerBlog.audioDescription!=null &&(
							<audio id="headerAudioTag" style={{width:"200px"}} controls>
							  	<source src={headerBlog.audioDescription} type="audio/ogg"/>
							  	<source src={headerBlog.audioDescription} type="audio/mp4"/>
								Your browser does not support the audio element.
							</audio>	
						)}
						<li id="headerBlogOwnerInformation" style={{listStyle:"none",width:"100%"}}>
							<ul style={{padding:"0px"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
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
									{headerBlog.owner.firstName}
								</li>
								<li id="headerSymposiumSubmitted" onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,headerBlog.industriesUploaded,props)} style={SymposiumLabelCSS}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										{headerBlog.industriesUploaded[0].industry}
									</a>
								</li>
								{props.isGuestProfileIndicator==false &&(
									<DisplayRecruitButton
										post={headerBlog}
										previousProps={props}
										personalInformationRedux={personalInformationRedux}
									/>
								)}
							</ul>
						</li>

						<HeaderBlogImageInformationContainer>
							<img   onClick={()=>handleDisplayHeaderBlog()} 
								id="headerBlogImage" src={headerBlog.blogImageUrl} style={HeaderBlogCSS}/>
							<ul style={{padding:"0px"}}>
								<li style={{fontSize:"20px",listStyle:"none",height:"60px",overflowY:"hidden"}}>
									<b>{headerBlog.title}</b>
								</li>

								<li style={{fontSize:"13px",color:"#8c8c8c",listStyle:"none",height:"80px",overflowY:"hidden"}}>
									{headerBlog.description}
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
																personalInformationRedux={personalInformationRedux}
															/>
														</li>
													)}
													<li style={{listStyle:"none"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block"}}>
																{data.videoDescription!=null?
																	<VideoDesriptionContainer>
																		   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
																				<source src={data.videoDescription} type="video/mp4"/>
																			</video>
																	</VideoDesriptionContainer>:
																	<img id="profilePicture" 
																		src={data.owner.profilePicture==null?
																				NoProfilePicture:
																				data.owner.profilePicture
																			} style={ProfileImageCSS}
																	/>
																}
															</li>
															<li style={{listStyle:"none",display:"inline-block",maxWidth:"70px",overflow:"hidden",maxHeight:"20px"}}>
																{data.owner.firstName}
															</li>
														</ul>
													</li>
													{data.audioDescription!=null &&(
														<li id="smallAudioDescription" style={{listStyle:"none"}}>
															<audio style={{width:"150px",height:"25px"}} controls muted>
															  	<source src={data.audioDescription} type="audio/ogg"/>
															  	<source src={data.audioDescription} type="audio/mp4"/>
																Your browser does not support the audio element.
															</audio>
														</li>
													)}
												</ul>
											</div>
											<SmallPostDescriptionContainer>
												<li style={{listStyle:"none",height:"60px",overflowY:"hidden"}}>
													<b>
														{data.title}
													</b>
												</li>

												<li style={{fontSize:"13px",color:"#8c8c8c",listStyle:"none",height:"50px",overflowY:"hidden"}}>
													{data.description}
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
											Next
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
export default BlogPostModal;