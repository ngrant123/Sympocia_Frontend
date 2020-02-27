import React,{useState,Component} from "react";
import styled from "styled-components";
import CreateAPostComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";


const PostCreationContainer=styled.div`
	position:absolute;
	background-color:blue;
	height:40%;
	left:1%;
	width:85%;
	box-shadow: 10px 10px 20px 	#dbdddf;
	transition:.8s;		
	border-radius:5px;
	overflow:hidden;

	&:hover{
		box-shadow: 10px 10px 20px 	#9395a0;

	}
`;


const CommentCreationContainer=styled.div`
	position:absolute;
	width:50%;
	height:7%;
	top:0%;
	background-color:white;
	border-radius:10px;
	border-style:solid;
	border-width:1px;
	border-color:#a2a2a2;
`;


const ProfilePicture=styled.div`
	position:relative;
	width:45px;
	height:87%;
	background-color:red;
	border-radius:50%;

`;

const CommentTextArea=styled.textarea`
	resize:none;
	border-style:none;
	height:90%;
`;
const SearchPostsTextArea=styled.textarea`
	resize:none;


`;


const PersonalPostsIndex=()=>{
	const [displayImages,changeDisplayForImages]=useState(true);
	const [displayVideos,changeDisplayForVideos]=useState(true);
	const [displayBlogs,changeDisplayForBlogs]=useState(true);
	const [displayRegularPosts,changeDisplayForRegularPosts]=useState(true);

	return (
		<React.Fragment>
			<ul>
				<li style={{listStyle:"none",marginBottom:"5%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"5%",color:"#C8B0F4"}}>
							<b>Create a post</b>
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
								<CommentCreationContainer >
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
											<ProfilePicture>

											</ProfilePicture>
										</li>

										<li style={{listStyle:"none",display:"inline-block"}}>
											<CommentTextArea placeholder="Enter a comment">

											</CommentTextArea>

										</li>
									</ul>
							</CommentCreationContainer>
						</li>
					</ul>
				</li>

				<li style={{listStyle:"none",marginBottom:"20px"}}>
					<ul style={{padding:"0px"}}>
						<li style={{backgroundColor:"red",listStyle:"none",display:"inline-block"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<SearchPostsTextArea/>
								</li>

							</ul>
						</li>

						<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",padding:"10px"}}>
							Images
						</li>

						<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",padding:"10px"}}>
							Videos
						</li>


						<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",padding:"10px"}}>
							Regular Posts
						</li>

						<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",padding:"10px"}}>
							Blogs
						</li>




					</ul>

				</li>
				<PostCreationContainer>
					<CreateAPostComponent/>
				</PostCreationContainer>

				<li style={{listStyle:"none"}}>

				</li>
			</ul>


		</React.Fragment>
	)
}

export default PersonalPostsIndex;