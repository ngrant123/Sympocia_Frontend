import React,{useState,useMemo,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import BlogHomeDisplayPortal from "../../../ExplorePageSet/Modals-Portals/BlogHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import Header from "./Header.js";
import Posts from "./Posts.js";

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

const PostsHorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const NextButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"10%"
}
const BlogPostModal=(props)=>{
	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);
	const [displayBlogDisplayPortal,changeBlogDisplay]=useState(false);
	const [selectedBlog,changeSelectedBlog]=useState();
	const [displayRecommendedBlogs,changeRecommendedBlogs]=useState();
	const [isInitializing,changeInitializingStatus]=useState(true);
	const [firstIndicator,changeFirstIndicator]=useState(false);
	const [headerPosts,changeHeaderPosts]=useState([]);
	const [blogs,changeBlogs]=useState([]);

	useEffect(()=>{
		if(firstIndicator==false){
			const splicedHeaderPosts=props.posts.slice(0,3);
			const splicedBlogs=props.posts.slice(3,props.posts.length);

			changeHeaderPosts(splicedHeaderPosts);
			changeBlogs([...splicedBlogs])
			changeInitializingStatus(false);
		}else{
			const currentBlogs=blogs;
			const updatedBlogs=currentBlogs.concat(props.posts);
			changeBlogs([...updatedBlogs])
			changeInitializingStatus(false);	
		}

	},[props.posts]);

	const closeModal=()=>{
		changeBlogDisplay(false)
	}

	const displayBlogModal=(data)=>{
		changeSelectedBlog(data);
		changeRecommendedBlogs(blogs);
		changeBlogDisplay(true);
	}

	const posts=()=>{
		return(
			<React.Fragment>
				<Header
					posts={headerPosts}
					targetDom={props.targetDom}
					isSymposiumPostUI={props.isSymposiumPostUI}
					displayBlogModal={displayBlogModal}
				/>
				<hr style={PostsHorizontalLineCSS}/>
				<Posts
					posts={blogs}
					targetDom={props.targetDom}
					isSymposiumPostUI={props.isSymposiumPostUI}
				/>
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
			</React.Fragment>	
		)
	}
	return(
		<Container>
			{isInitializing==false &&(
				<>{posts()}</>
			)}
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