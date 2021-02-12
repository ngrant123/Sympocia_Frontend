import React,{Component} from "react";
import styled from "styled-components";
import {ImagePostsModal} from './ImagePostsModal.js';
import VideosPostsModal from './VideoPostsModal.js';
import BlogsPostsModal from './BlogPostsModal.js';
import RegularPostsModal from './RegularPostsModal.js';

import {HomeConsumer} from "../../../HomeContext.js";
import {SearchConsumer} from "../../../../SearchPage/SearchContext.js";

const Container=styled.div`
	position:absolute;
	width:85%;
	height:60%;
	background-color:blue;

	@media screen and (max-width:1300px){
		#headerTitleLI{
			display:none !important;
		}
	}
`;

const PostsContainer=styled.div`
	position:absolute;
	width:90%;
	height:90%;
	margin-top:10%;

	@media screen and (max-width:1370px){
		margin-top:60% !important;
	}

	@media screen and (max-width:600px){
		margin-top:-10% !important;
	}
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

	handleDisplayImages=(homePageInformation,searchPageInformation)=>{
		homePageInformation=homePageInformation==null?searchPageInformation:homePageInformation;
		
		return this.state.displayImagePosts==true?
			<ImagePostsModal
				posts={this.props.posts}
				_id={homePageInformation.personalInformationState._id}
				confettiAnimation={homePageInformation.displayRecruitConfetti}
				isPersonalProfile={homePageInformation.isPersonalProfile}
				displaySymposium={homePageInformation.displaySymposium}
				targetDom={"homePageContainer"}
			/>:
			<React.Fragment></React.Fragment>
	}

	handleDisplayVideos=(homePageInformation,searchPageInformation)=>{
		return this.state.displayVideoPosts==true?
			<VideosPostsModal
				posts={this.props.posts}
				_id={homePageInformation.personalInformationState._id}
				confettiAnimation={homePageInformation.displayRecruitConfetti}
				isPersonalProfile={homePageInformation.isPersonalProfile}
				displaySymposium={homePageInformation.displaySymposium}
				targetDom={"homePageContainer"}
			/>:
			<React.Fragment></React.Fragment>
	}
	handleDisplayBlogs=(homePageInformation,searchPageInformation)=>{
		return this.state.displayBlogPosts==true?
			<BlogsPostsModal
				posts={this.props.posts}
				_id={homePageInformation.personalInformationState._id}
				confettiAnimation={homePageInformation.displayRecruitConfetti}
				isPersonalProfile={homePageInformation.isPersonalProfile}
				displaySymposium={homePageInformation.displaySymposium}
				targetDom={"homePageContainer"}
			/>:
			<React.Fragment></React.Fragment>
	}
	handleDisplayRegularPosts=(homePageInformation,searchPageInformation)=>{
		return this.state.displayRegularPosts==true?
			<RegularPostsModal
				posts={this.props.posts}
				_id={homePageInformation.personalInformationState._id}
				confettiAnimation={homePageInformation.displayRecruitConfetti}
				isPersonalProfile={homePageInformation.isPersonalProfile}
				displaySymposium={homePageInformation.displaySymposium}
				targetDom={"homePageContainer"}
			/>:
			<React.Fragment></React.Fragment>
	}

	displayImages=()=>{                                        
		
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
			<HomeConsumer>
				{homePageInformation=>(
					<SearchConsumer>
						{searchPageInformation=>(
							<Container>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<li id="headerTitleLI" style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"50px"}}>
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
											{this.handleDisplayImages(homePageInformation,searchPageInformation)}
											{this.handleDisplayVideos(homePageInformation,searchPageInformation)}
											{this.handleDisplayBlogs(homePageInformation,searchPageInformation)}
											{this.handleDisplayRegularPosts(homePageInformation,searchPageInformation)}
										</ul>
									</PostsContainer>
								</ul>
							</Container>
						)}
					</SearchConsumer>
				)}
			</HomeConsumer>
		)
	}
}

export default SearchExplorePosts;