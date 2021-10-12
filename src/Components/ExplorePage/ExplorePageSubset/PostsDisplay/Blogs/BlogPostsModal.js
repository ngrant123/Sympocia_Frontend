import React,{useState,useMemo} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import BlogHomeDisplayPortal from "../../../ExplorePageSet/Modals-Portals/BlogHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import {
	ConstructSuggestedSymposium,
	displayPersonalIndustryFeed
} from "../ConstructSuggestedSymposium.js";
import {Link} from "react-router-dom";
import {
	HeaderOwnerAndSymposiumInformation,
	SmallProfilePictureAndVideoDescription
} from "../PostDisplayGeneralComp.js";
import ExplorePageBlogPost from "../../../../GeneralComponents/PostComponent/BlogComponent/SymposiumAndExplorePageBlog.js";

import {
	Container,
	HeaderBlog,
	VideosContainer,
	ShadowContainer,
	ProfileImage,
	VideoDesriptionContainer,
	HeaderContainer,
	PostUserAndSymposiumInformation,
	PostUserInformation,
	HeaderBlogImageInformationContainer,
	PostsContainer,
	SmallPostContainer,
	SmallPostDescriptionContainer
} from "./BlogPostCSS.js";


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
								displayPostTrigger={handleDisplayHeaderBlog}
							/>
							<div id="headerBlogImage" style={HeaderBlogCSS}>
								<img  onClick={()=>handleDisplayHeaderBlog()}  id="headerBlogLI"
									src={headerBlog.blogImageUrl} style={{borderRadius:"5px",position:"relative",width:"100%",height:"100%"}}
								/>
								{headerBlog.videoDescription!=null &&(
									<video id="headerVideoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
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
											<SmallPostContainer>
												<ExplorePageBlogPost
													blogPostInformation={data}
													targetDom={props.targetDom}
												/>
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