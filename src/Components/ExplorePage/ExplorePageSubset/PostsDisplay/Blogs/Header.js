import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
	HeaderBlogImageInformationContainer,
	SmallPostContainer
} from "./BlogPostCSS.js";
import {SmallProfilePictureAndVideoDescription} from "../PostDisplayGeneralComp.js";
import ExplorePageBlogPost from "../../../../GeneralComponents/PostComponent/BlogComponent/SymposiumAndExplorePageBlog.js";

const Container=styled.div`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		flex-direction:column;
	}
`;

const HeaderContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:60%;
	margin-right:2%;
	#headerBlogImage{
		height:350px !important;
		width:400px !important;
	}

	#smallProfilePicture{
		width:60px !important;
		height:55px !important;
	}

	@media screen and (max-width:1370px){
		flex-direction:column;
		#headerBlogImage{
			height:550px !important;
			width:650px !important;
		}

		#headerTextInformation{
			margin-top:2%;
			width:100% !important;
		}
	}

	@media screen and (max-width:650px){
		width:90%;
		margin-top:2%;

		#headerTitle{
			font-size:18px !important;
		}
		#headerTextInformation{
			margin-top:2%;
			width:90% !important;
		}
		#headerDescription{
			font-size:16px !important;
		}
		#headerBlogImage{
			height:220px !important;
			width:240px !important;
			margin-left:2%;
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
	width:50%;

	#video{
		width:700px !important;
		height:200px !important;

	}
	#videoTitle{
		font-size:15px !important;
	}
	@media screen and (max-width:1370px){
		width:100%;
	}

	@media screen and (max-width:650px){
		width:90%;
	}
`;



const HeaderBlogCSS={
	position:"relative",
	borderRadius:"5px",
	borderRadius:"5px",
	cursor:"pointer"
}


const Header=({posts,displayBlogModal,targetDom})=>{
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
				<div id="headerTextInformation" style={{display:"flex",flexDirection:"column",width:"50%",marginLeft:"2%"}}>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<SmallProfilePictureAndVideoDescription
							postData={highLightedPost}
						/>
						<p style={{fontSize:"20px",marginLeft:"5%"}}>
							{highLightedPost.owner.firstName}
						</p>
					</div>
					<p id="headerTitle" style={{fontSize:"25px",listStyle:"none",height:"80px",overflow:"hidden"}}>
						<b>{highLightedPost.title}dsvoisnv;odsinv;odsinvo;idsnvoi;dsnvoindsvoidns</b>
					</p>
					<p  id="headerDescription" style={{fontSize:"20px",color:"#8c8c8c",listStyle:"none",height:"80px",overflow:"hidden",marginTop:"2%"}}>
						{highLightedPost.description}o;ifne;osnvodinvo;dsnv;odsinv;sodnvooc;dincodisn...
					</p>
				</div>
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
		<Container>
			{isMounted==true &&(
				<>
					{headerPost()}
					{supportingPostsRender()}
				</>
			)}
		</Container>
	)
}

export default Header;