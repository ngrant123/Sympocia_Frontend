import React,{Component} from "react";
import styled from "styled-components";
import BlogPost from "./BlogPost.js";
import RecommendedBlogs from "./RecommedBlogPosts.js";
 
const Container=styled.div`
	position:relative;
	width:90%;
	height:50%;
	z-index:3;
	border-radius:5px;
	padding:5px;
`;



const RecommededBlogsContainer=styled.div`
	position:relative;
	height:90%;
	width:400px;
	border-radius:5px;
	box-shadow: 1px 1px 5px #d5d5d5;
`;


const BlogPostContainer=()=>{

	return(

		<Container>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
						<BlogPost/>
				</li>

				<li style={{listStyle:"none",display:"inline-block"}}>
					<RecommendedBlogs/>
				</li>
			</ul>


		</Container>

	)
}

export default BlogPostContainer;