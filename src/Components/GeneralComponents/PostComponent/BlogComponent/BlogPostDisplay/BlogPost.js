import React,{Component} from "react";
import styled from "styled-components";


const BlogContainer=styled.div`
	position:relative;
	height:90%;
	width:800px;

`;

const BlogPostImage=styled.div`
	position:relative;
	width:370px;
	height:250px;
	background-color:green;
	border-radius:5px;

`;

const ProfilePicture=styled.div`
	position:relative;
	height:60px;
	width:70px;
	background-color:blue;
	border-radius:50%;

	border-style:solid;
	border-width:2px;
	border-color:#5298F8;


`;

const Container1=styled.div`
	position:relative;
	width:400px;
	height:350px;


`;

const Container2=styled.div`
	position:relative;
	width:350px;
	height:350px;
`;

const Blog=styled.div`
	position:absolute;
	height:250px;
	width:300px;
	overflow-y:auto;
`;


const BlogPost=()=>{

	return(

		<BlogContainer>
			<ul style={{padding:"0px"}}>
				<li style={{position:"relative",listStyle:"none",display:"inline-block",marginRight:"-2 %"}}>
					<Container1>

				
						<ul style={{padding:"0px",position:"absolute"}}>
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<ul style={{position:"relative",padding:"0px",left:"5%"}}>
									<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
										<ProfilePicture>

										</ProfilePicture>

									</li>

									<li style={{position:"relative",listStyle:"none",display:"inline-block",marginRight:"10%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",fontSize:"30px",color:"#C8B0F4"}}>	
												<b>Nathan</b>
											</li>

											<li style={{listStyle:"none",width:"200px"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
														24 stamps
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														3 comments
													</li>

												</ul>

											</li>
										</ul>

									</li>
								</ul>
							</li>

							<li style={{listStyle:"none",position:"relative"}}>
								<BlogPostImage>

								</BlogPostImage>

							</li>

						</ul>
					</Container1>
				</li>

				<li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
					<Container2>
						<ul>
							<li style={{listStyle:"none",color:"#5298F8"}}>
								Engineering

							</li>

							<li style={{listStyle:"none",fontSize:"20px",marginBottom:"2%"}}>
								<b>Engineering 2 Engineering 2Engineering 2</b>

							</li>

							<li style={{listStyle:"none",position:"relative"}}>
								<Blog>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit,
									sed do eiusmod tempor incididunt ut labore et dolore 
									magna aliqua. Ut enim ad minim veniam, quis nostrud 
									exercitation ullamco laboris nisi ut aliquip ex ea commodo 
									consequat. Duis aute irure dolor in reprehenderit in voluptate 
									velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
									occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
									mollit anim id est laborum.

								</Blog>

							</li>


						</ul>

					</Container2>
					
				</li>

			</ul>
		</BlogContainer>

	)
}

export default BlogPost;