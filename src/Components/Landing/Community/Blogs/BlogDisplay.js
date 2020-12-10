import React from "react";
import styled from "styled-components";
import {fileManager} from "../utilFileManager.js";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	align-items:center;
	justify-content:center;
	overflow:hidden;

	@media screen and (max-width:1370px){
		height:100% !important;
		overflow:hidden;
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
			<div id="blog" style={{padding:"50px",width:"40%",height:"90%",overflow:"scroll",marginLeft:"15%",marginRight:"5%"}}>
				{componentBlog}
			</div>

			<BlogDescription>
				<img src={headerImage} style={{marginRight:"2%",position:"relative",width:"200px",height:"200px",borderRadius:"50%"}}/>
				<Descriptions>
					<p style={{fontSize:"20px"}}>
						<b>{title}</b>
					</p>
					<p style={{color:"#A4A4A4"}}>
						{description}
					</p>
				</Descriptions>
			</BlogDescription>
		</Container>
	)
}

export default BlogDisplay;