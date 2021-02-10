import React from "react";
import styled from "styled-components";
import {fileManager} from "../utilFileManager.js";

const Container=styled.div`
	position:relative;
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;

	@media screen and (max-width:1370px){
		height:100% !important;
		#blog{
			overflow:visible;
			width:90% !important;
			margin-left:1% !important;
			height:90% !important;
			padding:0px !important;
		}
	}

	@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		#blog{
			height:90% !important;
		}
    }
`;

const BlogDescription=styled.div`
	display:flex;
	flex-direction:row;
	@media screen and (max-width:1370px){
		display:none;
	}
`;
const Descriptions=styled.div`
	display:flex;
	flex-direction:column;
`;

const BlogDisplay=({headerImage,title,description,index})=>{
	let {blogFiles}=fileManager();
	blogFiles=blogFiles.reverse();
	const blogFile=blogFiles[index];
	const componentBlog=blogFile.default();

	return (
		<Container>
			<BlogDescription>
				<img src={headerImage} style={{marginRight:"2%",width:"200px",height:"200px",borderRadius:"50%"}}/>
				<Descriptions>
					<p style={{fontSize:"20px"}}>
						<b>{title}</b>
					</p>
					<p style={{color:"#A4A4A4"}}>
						{description}
					</p>
				</Descriptions>
			</BlogDescription>
			<div id="blog" style={{padding:"50px",marginLeft:"15%",marginRight:"5%"}}>
				{componentBlog}
			</div>

		</Container>
	)
}

export default BlogDisplay;