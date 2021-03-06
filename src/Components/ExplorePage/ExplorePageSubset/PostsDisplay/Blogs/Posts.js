import React from "react";
import styled from "styled-components";
import ExplorePageBlogPost from "../../../../GeneralComponents/PostComponent/BlogComponent/SymposiumAndExplorePageBlog.js";
import {SmallPostContainer} from "./BlogPostCSS.js";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;

	@media screen and (max-width:1370px){
		flex-direction:column;
		#blogContainer{
			width:95% !important;
		}
		#smallImageContainer{
			width:140px !important;
		}
	}

	@media screen and (max-width:650px){
		#blogContainer{
			width:90% !important;
		}
		#smallImageContainer{
			width:123px !important;
		}
	}
`;


const Posts=({posts,targetDom,isSymposiumPostUI})=>{
	return(
		<Container>
			{posts.map(data=>
				<SmallPostContainer id="blogContainer" style={{width:"30%",marginRight:"2%"}}>
					<ExplorePageBlogPost
						blogPostInformation={data}
						targetDom={targetDom}
					/>
				</SmallPostContainer>
			)}
		</Container>
	)
}

export default Posts;