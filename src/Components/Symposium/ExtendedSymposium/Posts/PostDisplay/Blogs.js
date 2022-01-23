import React from "react";
import styled from "styled-components";
import SymposiumBlogDisplay from "../../../../GeneralComponents/PostComponent/BlogComponent/SymposiumAndExplorePageBlog.js"; 

const Container=styled.div`
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
	overflow:hidden;

	#smallImageContainer{
		width:150px !important;
	}

	@media screen and (max-width:1370px){	
		margin-bottom:5%;
	}
	@media screen and (max-width:650px){
		width:100%;
		margin-top:15% !important;
		margin-bottom:5%;

		#smallImageAndOwnerContainer{
			margin-right:0px !important;
			width:150px !important;
		}
		#smallPostTitleAndDescription{
			width:50%;
		}
		#smallPostTitle{
			font-size:15px !important;
		}
		#smallPostDescription{

		}

		#smallImageContainer{
			height:100px !important;
			width:110px !important;
		}
	}

	@media screen and (min-width:250px) and (max-width:370px) 
		and (min-height:800px) and (max-height:1400px){
		flex-direction:column;
	}
`;


const Blog=({blogInformation})=>{
	return(
		<Container>
			<SymposiumBlogDisplay
				blogPostInformation={blogInformation}
				targetDom={"extendedSymposiumContainer"}
			/>
		</Container>
	)
}


export default Blog;