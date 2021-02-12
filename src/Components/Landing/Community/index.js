import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {fileManager} from "./utilFileManager.js";
import InterviewMetadata from "./Interviews/interviewMetadata.js";
import {BlogsData} from "./Blogs/BlogData/index.js";

import IntereviewDisplay from "./Interviews/InterviewDisplay.js";
import BlogDisplay from "./Blogs/BlogDisplay.js";
import {getSympociaInterviews} from "../../../Actions/Requests/SympociaInterviewRequests.js";


const Container=styled.div`
	position:absolute;
	display:flex;
	flex-direction:column;
	width:100%;
	height:100%;
	opacity:0;
	transition:2s;
`;

const BlogsVideosContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:100%;
	height:100%;

	@media screen and (max-width:1370px){
		flex-direction:column !important;
		padding-top:5%;
	}
`;

const BlogContainer=styled.div`
	position:absolute
	display:flex;
	flex-direction:column;
	margin-left:15%;
	height:95%;
	background-color:white;
	padding:30px;
	width:60%;

	@media screen and (max-width:1370px){
		width:90%;
		margin-left:5% !important;
		height:900px !important;
		margin-top:10%;

		#videoElement{
			height:200px !important;
			width:300px !important;
		}
	}

	@media screen and (max-width:600px){
		margin-top:0%;
	}


`;

const VideoThumbnail=styled.div`
	cursor:pointer;
`;

const BlogThumbnail=styled.div`
	display:flex;
	flex-direction:row;
	cursor:pointer;
	border-style:solid;
	border-width:1px;
	border-color:#E6E6E6;
	border-radius:5px;
	margin-bottom:3%;
	padding:10px;

	@media screen and (max-width:1370px){
		flex-direction:column;
		width:120% !important;
	}

	@media screen and (max-width:600px){
		margin-left:-10%;
	}

	@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		margin-left:0%;
    }
`;

const BlogDescriptions=styled.div`
	display:flex;
	flex-direction:column;
`;

const HeaderTitle=styled.div`
	display:flex;
	align-items:center;
	justify-content:center;
`;


/*
const BlogContainer=styled.div`
	width:35%;
	height:95%;
	overflow:scroll;
	display:flex;
	flex-direction:column;
	padding-left:5%;

	@media screen and (max-width:1370px){
		width:80%;
		overflow:visible !important;
		height:40% !important;
		margin-top:10% !important;
	}
	@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		height:20% !important;
    }
`;
*/

const BackButton=styled.div`
  list-style:none;
  display:inline-block;
  background-color:white;
  border-radius:5px;
  padding:10px;
  color:#3898ec;
  border-style:solid;
  border-width:2px;
  border-color:#3898ec;
  cursor:pointer;
  width:20%;
  margin-left:20%;

  @media screen and (max-width:1370px){
  	margin-left:5% !important;
  	margin-top:10%;
  }

  @media screen and (max-width:600px){
  	margin-left:5% !important;
  	margin-top:0%;
  }
`;

const DisplayContainer=styled.div`
	display:flex;
	flex-direction:column;
	justify-content:center;
 @media screen and (max-width:1370px){
	height:100%;
  }
`;


const CommunityContainer=()=>{
	const [videoFiles,changeVideoFiles]=useState([]);
	const [blogFiles,changeBlogFiles]=useState([]);
	const [displayDisplayPage,changeDisplayPage]=useState(false);
	const [displayInterviewDisplay,changeDisplayInterviewDisplay]=useState(false);
	const [selectedPost,changeSelectedPosts]=useState();

	useEffect(()=>{
		
		const fetchData=async()=>{
			//let {confirmation,data}=await getSympociaInterviews({interviewMetaData:InterviewMetadata.interviews});
			const confirmation="Success";
			if(confirmation=="Success"){
				//changeVideoFiles([...data]);
				const blogData=BlogsData();
				changeBlogFiles([...blogData]);

				setTimeout(()=>{
					document.getElementById("parentContainer").style.opacity=1;
				},200);
			}else{
				alert('Unfortunately there has been an error when trying to get the interviews. Please try again');
			}
		}

		fetchData();
	},[]);

	const selectInterview=(data,index)=>{
		
		const {title,description}=InterviewMetadata.interviews[index];
		const video=data.default;
		const selectedInterview={
			title,
			description,
			video
		}
		changeSelectedPosts(selectedInterview);
		changeDisplayInterviewDisplay(true);
		changeDisplayPage(true);
	}



	const selectBlog=(data,index)=>{

		changeSelectedPosts({
			...data,
			headerImage:data.headerImage.default,
			index
		});
		changeDisplayPage(true);
		changeDisplayInterviewDisplay(false);
	}

	const videoThumbnail=(data,index)=>{
		const {title,description}=InterviewMetadata.interviews[index];
		return <>
				 	<video id="videoElement" width="500" height="300">
						<source src={data.default}/>
					</video>
					<p>
						<b>{title}</b>
					</p>
					<p style={{color:"#A4A4A4"}}>{description}</p>
			   </>
	}

	const blogThumbnail=(data)=>{}

	return(
		<Container id="parentContainer">
			<HeaderTitle>
				<p style={{fontSize:"40px",color:"#C8B0F4"}}>
					<b> Sympocia </b>
				</p>
			</HeaderTitle>
			<BlogsVideosContainer>
				{displayDisplayPage==true?
					<DisplayContainer>
						<BackButton onClick={()=>changeDisplayPage(false)}>
							Back
						</BackButton>
						{displayInterviewDisplay==true?
							<IntereviewDisplay
								{...selectedPost}
							/>:
							<BlogDisplay
								{...selectedPost}
							/>
						}
					</DisplayContainer>
					:<>
							<BlogContainer>
								<p style={{fontSize:"20px"}}>
								<b>Blogs</b>
								</p>
								<p style={{color:"#848484"}}>
									Here are any blogs that have written. I hope this gives you some insight into what Sympocia is and what we 
									represent. If you would like to be feature here please email us at nathan@sympocia.com 
								</p>
								<hr/>
								{blogFiles.map((data,index)=>
									<BlogThumbnail onClick={()=>selectBlog(data,index)}>
										<img src={data.headerImage.default} style={{marginRight:"2%",position:"relative",width:"200px",height:"200px",borderRadius:"50%"}}/>
										<BlogDescriptions>
											<p style={{fontSize:"20px"}}>
												<b>{data.title}</b>
											</p>
											<p style={{color:"#A4A4A4"}}>
												{data.description}
											</p>
										</BlogDescriptions>
									</BlogThumbnail>
								)}
							</BlogContainer>
					</>
				}
			</BlogsVideosContainer>
		</Container>
	)
}

export default CommunityContainer;