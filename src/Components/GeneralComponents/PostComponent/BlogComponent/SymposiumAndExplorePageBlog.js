import React,{useState} from "react";
import styled from "styled-components";
import {SmallProfilePictureAndVideoDescription} from "../../../ExplorePage/ExplorePageSubset/PostsDisplay/PostDisplayGeneralComp.js";
import {useSelector} from "react-redux";
import BlogHomeDisplayPortal from "../../../ExplorePage/ExplorePageSet/BlogHomeDisplayPortal.js";

const BlogImageContainerCSS={
	position:"relative",
	width:"100%",
	height:"100%",
	borderRadius:"5px"
}

const SmallBlogImageCSS={
	position:"relative",
	width:"160px",
	height:"123px",
	borderRadius:"5px",
	marginBottom:"5%"
}

const SymposiumAndExplorePageDisplay=({blogPostInformation,targetDom})=>{
	const [selectedBlog,changeSelectedBlog]=useState();
	const [displayBlogDisplayPortal,changeBlogDisplay]=useState(false);
	const personalInformationRedux=useSelector(state=>state.personalInformation);

	const closeModal=()=>{
		changeBlogDisplay(false)
	}

	const displayBlogModal=(data)=>{
		changeSelectedBlog(data);
		changeBlogDisplay(true);
	}

	return(
		<React.Fragment>
			{displayBlogDisplayPortal==true &&(
				<BlogHomeDisplayPortal
					closeModal={closeModal}
					selectedBlog={selectedBlog}
					recommendedBlogs={[]}
					targetDom={targetDom}
					personalId={personalInformationRedux.id}
				/>
			)}
			<div onClick={()=>displayBlogModal(blogPostInformation)} id="smallImageAndOwnerContainer" 
				style={{marginRight:"3%",display:"flex",flexDirection:"column"}}>
				<div id="smallImageContainer" style={SmallBlogImageCSS}>
					<img id="image" src={blogPostInformation.blogImageUrl} style={BlogImageContainerCSS}/>
				</div>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<SmallProfilePictureAndVideoDescription
						postData={blogPostInformation}
					/>
					<p style={{marginLeft:"2%",maxWidth:"90px",overflow:"hidden",maxHeight:"20px"}}>
						{blogPostInformation.owner.firstName}
					</p>
				</div>
			</div>
			<div onClick={()=>displayBlogModal(blogPostInformation)} id="smallPostTitleAndDescription"
			 	style={{display:"flex",flexDirection:"column"}}>
				<p id="smallPostTitle" style={{fontSize:"20px",height:"60px",overflowY:"hidden",marginBottom:"2%"}}>
					<b>
						{blogPostInformation.title}
					</b>
				</p>

				<p id="smallPostDescription" style={{fontSize:"13px",color:"#8c8c8c",height:"50px",overflowY:"hidden"}}>
					{blogPostInformation.description}
				</p>
			</div>
		</React.Fragment>
	)
}


export default SymposiumAndExplorePageDisplay;