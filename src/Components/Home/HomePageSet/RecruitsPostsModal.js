import React,{useState} from "react";
import styled from "styled-components";
import ImageContainer from "../../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";
import RegularPostContainer from "../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import BlogPostContainer from "../../GeneralComponents/PostComponent/BlogComponent/BlogPostDisplay/BlogPostContainer.js";
import VideoPostContainer from "../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";
import ReactSnapScroll from 'react-snap-scroll';


const Container=styled.div`
	position:absolute;
	background-color:white;
	border-radius:5px;
	width:80%;
	height:65%;
	z-index:11;
	margin-left:15%;
	margin-top:10%;
	overflow-y:auto;
	padding:5px;
`;


const RecruitsProfileContainer=styled.div`
	position:relative;
	width:55px;
	height:50px;
	background-color:red;
	border-radius:50%;
	border-style:solid;
	border-color:#5298F8;
	border-width:2px;
	transition:8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070; 
	}
`;

const SearchButton=styled.textarea`
	position:relative;
	resize:none;
	border-radius:5px;
	border-style:none;
	text-align:center;
	z-index:5;
	width:300%;
	padding:6px;

	box-shadow: 1px 1px 5px #707070; 

`;

const ProfilePictures=styled.div`
	width:40%;
	height:50px;
	background-color:red;
	border-radius:50%;
	border-style:solid;
	border-color:#5298F8;
	border-width:2px;

`;


const ImagePostContainer=styled.div`
	height:80%;
	width:80%;

`;

const RecruitsPosts=()=>{
	const [recruitsPosts,changeRecruitsPosts]=useState([{},{},{}]);
	return(
		<Container>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li style={{position:"relative",top:"-20px",listStyle:"none",display:"inline-block",marginLeft:"3%"}}>
							<div class="dropdown">

													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														
														Filter By

													   	<span class="caret"></span>
													</button>

													<ul class="dropdown-menu" style={{height:"170px",overflow:"auto"}}>
														{recruitsPosts.map(data=>
															<li>
																<a>
																	<ProfilePictures>
																	</ProfilePictures>

																</a>
															</li>
														)}
													</ul>
							  	</div>
						</li>

						<li style={{position:"relative",top:"-20px",listStyle:"none",display:"inline-block",marginLeft:"2%"}}>
							<div class="dropdown">

													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														
														More Options

													   	<span class="caret"></span>
													</button>

													<ul class="dropdown-menu">
														<li ><a>Most popular</a></li>
														<li ><a>Most Commented</a></li>
														<li ><a>Recent</a></li>
													</ul>
							  	</div>
						</li>

						<li style={{listStyle:"none",display:"inline-block",marginTop:"2%",marginLeft:"3%"}}>
							<SearchButton placeholder="Search for a community or a person"/> 
						</li>
					</ul>
				</li>

				<li style={{listStyle:"none",marginBottom:"10%"}}>
					<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",height:"90%"}}>
								<ImagePostContainer>
									<ImageContainer/>
								</ImagePostContainer>
							</li>
							<hr/>
						

						<li style={{listStyle:"none",marginTop:"5%",marginBottom:"5%"}}>
							<BlogPostContainer/>
						</li>
							<hr/>

						<li style={{listStyle:"none",marginTop:"10%"}}>
							<VideoPostContainer/>
						</li>

							<hr/>

						<li style={{listStyle:"none",marginTop:"10%"}}>
							<VideoPostContainer/>
						</li>

						
		

					</ul>
		
				</li>

			</ul>

		</Container>
	)
}

export default RecruitsPosts;