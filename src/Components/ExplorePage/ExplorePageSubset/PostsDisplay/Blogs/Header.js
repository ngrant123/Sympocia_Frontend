import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
	HeaderBlogImageInformationContainer,
	SmallPostContainer
} from "./BlogPostCSS.js";
import {SmallProfilePictureAndVideoDescription} from "../PostDisplayGeneralComp.js";
import ExplorePageBlogPost from "../../../../GeneralComponents/PostComponent/BlogComponent/SymposiumAndExplorePageBlog.js";

const HeaderContainer=styled.div`
	display:flex;
	flex-direction:row;
	#headerBlogImage{
		height:350px !important;
		width:550px !important;
	}

	#smallProfilePicture{
		width:60px !important;
		height:55px !important;
	}

	@media screen and (max-width:1370px){
		#headerBlogImage{
			height:550px !important;
			width:650px !important;
		}
	}

	@media screen and (max-width:650px){
		#headerBlogImage{
			height:200px !important;
			width:90% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#headerBlogImage{
			width:700px !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#headerBlogImage{
    		height:400px !important;
			width:90% !important;
		}
    }
`;

const SupportingPosts=styled.div`
	display:flex;
	flex-direction:column;
	flex-wrap:wrap;
	width:100%;

	#video{
		width:700px !important;
		height:200px !important;

	}
	#videoTitle{
		font-size:15px !important;
	}
`;



const HeaderBlogCSS={
	position:"relative",
	borderRadius:"5px",
	borderRadius:"5px",
	boxShadow:"1px 1px 10px #707070",
	cursor:"pointer"
}


const Header=({posts,displayBlogModal,targetDom})=>{
	console.log(posts);
	const [isMounted,changeMountStatus]=useState(false);
	const [highLightedPost,changeHighLightedPosts]=useState();
	const [supportingPosts,changeSupportingPosts]=useState([]);

	useEffect(()=>{
		const highLightedPost=posts[0];
		const supportedPosts=posts.splice(1,posts.length);

		changeHighLightedPosts(highLightedPost);
		changeSupportingPosts([...supportedPosts]);
		changeMountStatus(true);
	},[]);

	const headerPost=()=>{
		return(
			<HeaderContainer>
				<div id="headerBlogImage" style={HeaderBlogCSS}>
					<img  onClick={()=>displayBlogModal()}  id="headerBlogLI"
						src={highLightedPost.blogImageUrl} style={{borderRadius:"5px",position:"relative",width:"100%",height:"100%"}}
					/>
					{highLightedPost.videoDescription!=null &&(
						<video id="headerVideoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
							style={{position:"absolute",top:"72%",left:"0%",borderRadius:"50%",width:"90px",height:"80px",
									backgroundColor:"#151515",
									borderStyle:"solid",
									borderColor:"white",
									borderWidth:"5px"}} width="200px" height="60%">
							<source src={highLightedPost.videoDescription} type="video/mp4"/>
						</video>
					)}
				</div>
				<HeaderBlogImageInformationContainer style={{marginLeft:"5%",width:"60%"}}>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<SmallProfilePictureAndVideoDescription
							postData={highLightedPost}
						/>
						<p style={{fontSize:"20px"}}>
							<b>{highLightedPost.owner.firstName}</b>
						</p>
					</div>
					<p style={{fontSize:"25px",listStyle:"none",height:"65px",overflowY:"hidden"}}>
						<b>{highLightedPost.title}</b>
					</p>

					<p style={{fontSize:"20px",color:"#8c8c8c",listStyle:"none",height:"80px",overflowY:"hidden",marginTop:"2%"}}>
						{highLightedPost.description}
					</p>
				</HeaderBlogImageInformationContainer>
			</HeaderContainer>
		)
	}

	const supportingPostsRender=()=>{
		return(
			<SupportingPosts>
				{supportingPosts.map(data=>
					<SmallPostContainer>
						<ExplorePageBlogPost
							blogPostInformation={data}
							targetDom={targetDom}
						/>
					</SmallPostContainer>
				)}
			</SupportingPosts>
		)
	}

	return(
		<div style={{display:"flex",flexDirection:"row"}}>
			{isMounted==true &&(
				<>
					{headerPost()}
					{supportingPostsRender()}
				</>
			)}
		</div>
	)
}

export default Header;