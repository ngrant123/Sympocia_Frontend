import React,{Component} from "react";
import styled from "styled-components";

import {ImagePostsModal} from './ImagePostsModal.js';
import VideosPostsModal from './VideoPostsModal.js';
import BlogsPostsModal from './BlogPostsModal.js';
import RegularPostsModal from './RegularPostsModal.js';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {getPostsForHomePage} from "./../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

const Container=styled.div`
	position:absolute;
	width:85%;
	height:60%;
`;

const PostsContainer=styled.div`
	position:absolute;
	width:95%;
	height:97%;
	margin-top:1%;
`;


class SearchExplorePosts extends Component{

	constructor(props){

		super(props);
		this.state={
			displayImagePosts:true,
			displayVideoPosts:false,
			displayBlogPosts:false,
			displayRegularPosts:false,
			postOptionHeader:"Images"
		}
	}

	handleDisplayImages=()=>{
		return this.state.displayImagePosts==true?
			<ImagePostsModal
				posts={this.props.posts}
			/>:
			<React.Fragment></React.Fragment>
	}

	handleDisplayVideos=()=>{
		return this.state.displayVideoPosts==true?
			<VideosPostsModal
				posts={this.props.posts}
			/>:
			<React.Fragment></React.Fragment>
	}
	handleDisplayBlogs=()=>{
		return this.state.displayBlogPosts==true?
			<BlogsPostsModal
				posts={this.props.posts}
			/>:
			<React.Fragment></React.Fragment>
	}
	handleDisplayRegularPosts=()=>{
		return this.state.displayRegularPosts==true?
			<RegularPostsModal
				posts={this.props.posts}
			/>:
			<React.Fragment></React.Fragment>
	}

	displayImages=()=>{                                        
		console.log("TEsting calls");
		this.setState({
			displayImagePosts:true,
			displayVideoPosts:false,
			displayBlogPosts:false,
			displayRegularPosts:false,
			postOptionHeader:"Images"
		})

		this.props.changePostOption("Images");
	}

	displayVideos=()=>{
		this.setState({
			displayImagePosts:false,
			displayVideoPosts:true,
			displayBlogPosts:false,
			displayRegularPosts:false,
			postOptionHeader:"Videos"
		})

		this.props.changePostOption("Videos");
	}

	displayBlogs=()=>{
		this.setState({
			displayImagePosts:false,
			displayVideoPosts:false,
			displayBlogPosts:true,
			displayRegularPosts:false,
			postOptionHeader:"Blogs"
		})

		this.props.changePostOption("Blogs");
	}

	displayRegularPosts=()=>{
		this.setState({
			displayImagePosts:false,
			displayVideoPosts:false,
			displayBlogPosts:false,
			displayRegularPosts:true,
			postOptionHeader:"Posts"
		})

		this.props.changePostOption("RegularPosts");
	}
	render(){
		return(
			<Container>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"50px"}}>
								<b>{this.state.postOptionHeader}</b>
							</li>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
								<div class="btn-group">
										<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																					borderColor:"#5298F8",
																																					borderStyle:"solid",
																																					borderWidth:"1px",
																																					color:"#5298F8",
																																					backgroundColor:"white"}}>
											Post Options
											<span class="caret"></span>
										</button>
											<ul class="dropdown-menu">
													<li onClick={()=>this.displayImages()}><a href="javascript:;">Images</a></li>	
													<li onClick={()=>this.displayVideos()}><a href="javascript:;">Videos</a></li>	
													<li onClick={()=>this.displayBlogs()}><a href="javascript:;">Blogs</a></li>	
													<li onClick={()=>this.displayRegularPosts()}><a href="javascript:;">Posts</a></li>		
											</ul>
								</div>
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																				borderColor:"#5298F8",
																																				borderStyle:"solid",
																																				borderWidth:"1px",
																																				color:"#5298F8",
																																				backgroundColor:"white"}}>
										Options
										<span class="caret"></span>
									</button>
										<ul class="dropdown-menu">
											<li><a href="javascript:;">Most Popular</a></li>
											<li><a href="javascript:;">Newest</a></li>
											<li><a href="javascript:;">Popular</a></li>						
										</ul>
								</div>
							</li>
						</ul>
					</li>
						<PostsContainer>
							<ul style={{padding:"0px"}}>
								{this.handleDisplayImages()}
								{this.handleDisplayVideos()}
								{this.handleDisplayBlogs()}
								{this.handleDisplayRegularPosts()}
								<li style={{position:"relative",listStyle:"none",display:"inline-block",marginTop:"-15px",top:"-80px",marginLeft:"15%",paddingTop:"10px",marginTop:"40%"}}>
									<li style={{listStyle:"none",display:"inline-block"}}> 
										Industry:
									</li>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<ul style={{padding:"5px"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												<NavigateBeforeIcon
													style={{ fontSize: 40 }}
												/>
											</li>
											<li style={{position:"relative",listStyle:"none",display:"inline-block",fontSize:"40px",top:"-10px"}}>	
												Testing
											</li>
											<li style={{listStyle:"none",display:"inline-block"}}>
												<NavigateNextIcon
													style={{ fontSize: 40 }}
												/>
											</li>

										</ul>
									</li>
								</li>
							</ul>
						</PostsContainer>
				</ul>
			</Container>
		)
	}
}

export default SearchExplorePosts;