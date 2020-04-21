import React,{useState} from "react";
import styled from "styled-components";

const HeaderBlog=styled.div`
	width:400px;
	height:55%;
	border-radius:5px;
	background-color:red;
	border-radius:5px;
`;

const VideosContainer=styled.div`
	position:relative;
	width:300px;
	height:250px;
	border-radius:5px;
	background-color:red;
`;

const ShadowContainer= styled.div`
	position:absolute;
	width:300px;
	height:250px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
`;

const ProfileImage=styled.div`
	position:relative;
	width:50px;
	height:50px;
	background-color:red;
	border-radius:50%;

`;

const ImageLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const BlogPostModal=()=>{
	const [blogs,changeBlgos]=useState([{},{},{}]);
	return(
		<React.Fragment>
			<li style={{position:"relative",top:"-170px",listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",width:"120%",borderRadius:"5px",marginBottom:"2%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
									<HeaderBlog>
									</HeaderBlog>
								</li>
								<li style={{position:"relative",top:"-10px",listStyle:"none",display:"inline-block",width:"40%",fontSize:"25px",height:"55%",overflow:"hidden"}}>
									<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
									sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.	
									</b>
								</li>
							</ul>
						</li>
						<li style={{listStyle:"none",width:"80%"}}>
							<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"10%"}}>
											Nathan
										</li>
										<li style={ImageLabelCSS}>
											Engineering
										</li>

										<li style={ImageLabelCSS}>
											Follow
										</li>

							</ul>
						</li>
						<li style={{listStyle:"none",width:"90%",height:"10%",overflow:"hidden",color:"#A4A4A4"}}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
									sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
									nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
									reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
									 pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
									qui officia deserunt mollit anim id est laborum.
						</li>
					</ul>
				</li>

				<li style={{width:"60%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",height:"80%",overflowY:"auto",marginBottom:"20%"}}>
					<ul style={{padding:"0px"}}>

						{blogs.map(data=>
							<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginBottom:"1%",backgroundColor:"yellow",marginRight:"2%"}}>
										<ShadowContainer/>
										<VideosContainer/>
									</li>
									<li style={{position:"absolute",listStyle:"none",display:"inline-block",top:"0px",width:"75%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",height:"170px",overflow:"hidden",marginBottom:"2%",fontSize:"15px"}}>
												<b>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
													sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
													Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
													nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
													reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
													 pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
													qui officia deserunt mollit anim id est laborum.
												</b>

											</li>
											<li style={{listStyle:"none",position:"absolute"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block"}}>
																<ProfileImage>
																</ProfileImage>
															</li>
															<li style={{listStyle:"none",display:"inline-block",color:"#A4A4A4",fontSize:"20px"}}>
																Nathan

															</li>
														</ul>
													</li>
													<li style={ImageLabelCSS}>
														Engineering
													</li>
												</ul>

											</li>

										</ul>
									</li>
								</ul>
							</li>
						)}
					</ul>
				</li>
		</React.Fragment>
	)
}

export default BlogPostModal;