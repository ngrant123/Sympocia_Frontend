import React,{useState,Component} from "react";
import styled from "styled-components";


const RecommededBlogsContainer=styled.div`
	position:relative;
	height:90%;
	width:400px;
	border-radius:5px;
	box-shadow: 1px 1px 5px #d5d5d5;
	overflow-y:auto;
`;


const BlogContainer=styled.div`
	position:relative;
	left:2%;
	width:90%;
	height:30%;
`;

const BlogPicture=styled.div`
	position:relative;
	width:90px;
	height:70%;
	border-radius:5px;
	background-color:blue;

`;


const BlogInformation=styled.div`
	position:relative;
	height:90%;
	width:245px;
	left:2%;

`;

const Name=styled.div`
	position:relative
	width:90px;
	overflow:hidden;
	height:25px;

`;

const RecommendedBlogPosts=()=>{

	const [blogs,changeBlogs]=useState([{},{},{},{},{}]);

	return(
		<RecommededBlogsContainer>
			<ul style={{padding:"0px",position:"relative"}}>
				<li style={{listStyle:"none",position:"relative",width:"100%",marginTop:"5%",marginBottom:"2%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",color:"#5298F8",fontSize:"15px",marginRight:"5%",marginLeft:"5%"}}>
							View blogs from:
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"#5298F8",
																															backgroundColor:"white"}}>
										Engineering
									   	<span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li><a href="">Most Popular</a></li>
										<li><a href="">Most Recent</a></li>
										
									</ul>
			  				 </div>
						</li>
					</ul>
				</li>

				<li style={{listStyle:"none",position:"relative"}}>
					<ul style={{padding:"0px"}}>
						{blogs.map(data=>
							<li style={{listStyle:"none",marginBottom:"2%"}}>
								<BlogContainer>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none"}}>
													<BlogPicture>
													</BlogPicture>
												</li>

												<li style={{listStyle:"none"}}>
													<Name>
														Nathan Nathan Nathan
													</Name>
												</li>

											</ul>
										</li>

										<li style={{listStyle:"none",display:"inline-block",position:"absolute"}}>
											<BlogInformation>
												<ul style={{padding:"0px",position:"relative"}}>
													<li style={{listStyle:"none",marginBottom:"2%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",color:"#5298F8"}}>
																24 stamps
															</li>

															<li style={{listStyle:"none",display:"inline-block",color:"#5298F8"}}>
																34 Comments
															</li>


														</ul>

													</li>

													<li style={{listStyle:"none"}}>
														This is a header about what the blog is a about and it is valuable information

													</li>


													

											</ul>


											</BlogInformation>
										</li> 

									</ul>
								</BlogContainer>

							</li>
						)}
					</ul>
				</li>
			</ul>

		</RecommededBlogsContainer>
	)
}

export default RecommendedBlogPosts;