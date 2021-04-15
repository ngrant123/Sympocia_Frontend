import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {fileManager} from "./utilFileManager.js";
import InterviewMetadata from "./Interviews/interviewMetadata.js";
import {BlogsData} from "./Blogs/BlogData/index.js";

import IntereviewDisplay from "./Interviews/InterviewDisplay.js";
import BlogDisplay from "./Blogs/BlogDisplay.js";
import {getSympociaInterviews} from "../../../Actions/Requests/SympociaInterviewRequests.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	padding:20px;
`;

const TitleContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const SearchOptions=styled.div`

`;


const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"5px",
	borderStyle:"none",
	marginRight:"5%",
	marginBottom:"2%",
	cursor:"pointer"
}





const CommunityContainer=()=>{
	return(
		<Container id="parentContainer">
			<TitleContainer>
				<p style={{fontSize:"20px",marginRight:"5%"}}>
					<b>Sympocia News</b>
				</p>
				<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
						style={ShadowButtonCSS}>
							Blogs
					   		<span class="caret"></span>
					</button>
					<ul class="dropdown-menu">
						<li style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>
							<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
								Blogs
							</a>
						</li>
						<li style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>
							<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
								Videos
							</a>
						</li>
					</ul>
				</div>
			</TitleContainer>

			<SearchOptions>
			</SearchOptions>

		</Container>
	)
}

export default CommunityContainer;