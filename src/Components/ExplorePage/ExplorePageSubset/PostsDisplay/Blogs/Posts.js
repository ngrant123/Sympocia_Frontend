import React from "react";
import styled from "styled-components";
import ExplorePageBlogPost from "../../../../GeneralComponents/PostComponent/BlogComponent/SymposiumAndExplorePageBlog.js";
import {SmallPostContainer} from "./BlogPostCSS.js";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;

`;


const Posts=({posts,targetDom,isSymposiumPostUI})=>{
	return(
		<Container>
			{posts.map(data=>
				<SmallPostContainer style={{width:"30%",marginRight:"2%"}}>
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