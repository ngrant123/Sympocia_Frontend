import React,{Component} from "react";
import styled from "styled-components";
import {getBlogFromUser} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";


const Container=styled.div`
	position:absolute;
	width:95%;
	height:80%;
`;

const ThumbnailBlogComponent=styled.div`
	position:relative;
	width:100%;
	height:45%;
	overflow:hidden;
`;
const ThumbnailBlog=styled.div`
	position:relative;
	width:450px;
	height:100%;
	background-color:blue;
	border-radius:5px;
`;

const Description=styled.div`
	position:absolute;
	width:85%;
	height:240%;
	overflow:hidden;
	color:#767677;

`;
const SmallBlogComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;
`;

const SmallBlog=styled.div`

	position:relative;
	height:65%;
	width:100%;
	background-color:red;
	border-radius:5px;
`;




class BlogsPostsContainer extends Component{

	constructor(props){
		super(props);
		this.state={
			videos:[
				{},{},{},{},{},{}
			],
			firstVideo:{},
			isLoading:true,
			blogs:[],
			headerBlog:{}
		}
	}

	async componentDidMount(){
		const {	headerBlog,blogs}=await getBlogFromUser(this.props.id);

		this.setState({
			headerBlog:headerBlog,
			blogs:blogs,
			isLoading:false
		})
	}

	render(){
		return(

			<Container>
				{this.state.isLoading==true?<p>Currently loading blog posts</p>:
					<React.Fragment>
						{this.state.blogs.length==0&&this.state.headerBlog==null?
							<p>Currently there are no posts available here</p>:
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<ThumbnailBlogComponent>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
													<ThumbnailBlog/>
												</li>

												<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block"}}>
													<ul style={{paddging:"0px"}}>
														<li style={{marginBottom:"5px",listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
															Testing

														</li>
														<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px"}}>
															<b> Test main video description container with this components </b>
														</li>

														<li style={{listStyle:"none",marginBottom:"5px"}}>
															<ul style={{padding:"0px",color:"#a6a6a7"}}>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
																	20,000 views
																</li>

																<li style={{listStyle:"none",display:"inline-block"}}>
																	6 days ago
																</li>

															</ul>

														</li>

														<li style={{listStyle:"none"}}>
															<Description>
																Lorem ipsum dolor sit amet, consectetur adipiscing elit,
																 sed do eiusmod tempor incididunt ut labore et dolore 
																 magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
																  ullamco laboris nisi ut aliquip ex ea commodo consequat. 
																  Duis aute irure dolor in reprehenderit in voluptate velit 
																  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
																   occaecat cupidatat non proident, sunt in culpa qui officia 
																   deserunt mollit anim id est laborum.

															</Description>

														</li>
													</ul>
												</li>
											</ul>

										</ThumbnailBlogComponent>
									</li>
									<li style={{listStyle:"none",marginTop:"2%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",color:"#C8B0F4"}}>
												<b>Search By Industry:</b>
											</li>

											<li style={{listStyle:"none",display:"inline-block"}}>
												<div class="dropdown">
													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														Industries
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

									<li style={{listStyle:"none",marginTop:"5%"}}>	
										<ul style={{padding:"0px"}}>
											{this.state.videos.map(data=>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"1%",marginBottom:"5%"}}>
													<SmallBlogComponent>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none"}}>
																<SmallBlog/>
															</li>

															<li style={{listStyle:"none",fontSize:"15px"}}>
																<b> Title of small video  Title of small video  </b>
															</li>

															<li style={{listStyle:"none"}}>
																Nathan Grant
															</li>

															<li style={{listStyle:"none"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
																		127k views
																	</li>

																	<li style={{listStyle:"none",display:"inline-block"}}>
																		6 days ago
																	</li>
																</ul>
															</li>

															<li style={{listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
																Industry Button
															</li>
														</ul>

													</SmallBlogComponent>
												</li>
											)}
										</ul>
									</li>
								</ul>

						}
							
					</React.Fragment>

				}
			</Container>


		)
	}
}

export default BlogsPostsContainer;