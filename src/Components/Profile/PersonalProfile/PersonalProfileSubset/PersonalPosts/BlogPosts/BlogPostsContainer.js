import React,{Component} from "react";
import styled from "styled-components";
import {getBlogFromUser} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getCompanyBlogs} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import NoPostsModal from "../NoPostsModal.js";
import {UserConsumer} from "../../../UserContext.js";
import {Link} from "react-router-dom";


const Container=styled.div`
	position:absolute;
	width:95%;
	height:125%;
	padding:10px;
	padding-right:10px;

	@media screen and (max-width:1370px){
		width:120% !important;
		#headerImageLI{
			display:block !important;
			#headerImage{
				width:350px !important;
				height:30% !important;
			}
		}
		#headerDescriptionLI{
			display:block !important;
			margin-top:10% !important;
			position:relative !important;
			margin-bottom:5% !important;
		}
	}

	@media screen and (max-width:600px){
		#searchSymposiumPostLI{
			display:none;
		}
		#datePostedLI{
			display:none;
		}
		#symposiumsLI{
			display:none;
		}
		#headerImage{
			width:100% !important;
			height:150px !important;
		}

		#headerConstructedDateLI{
			display:none;
		}
		#headerAudioLI{
			width:150px !important;
		}

		#smallAudio{
			width:250px !important;
		}
    }
`;

const ThumbnailBlogComponent=styled(Link)`
	position:relative;
	width:100%;
	height:45%;
	overflow:hidden;
	padding-bottom:10px;
	background-color:red;

	@media screen and (max-width:700px){
		width:70%;
		#headerImageLI{
			display:block !important;
			#headerImage{
				width:250px !important;
			}
		}
		#headerDescriptionLI{
			margin-left:-20% !important;
		}
	}

	@media screen and (max-width:740px) and (max-height:420px){
	 	#headerImageLI{
			#headerImage{
				height:60% !important;
			}
		}
    }
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

	@media screen and (max-width:700px){
		display:none;
	}

`;
const SmallBlogComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;
`;

const SmallBlog=styled.div`

	position:relative;
	height:50%;
	width:100%;
	border-radius:5px;
	overflow:hidden;

	@media screen and (max-width:420px){
		width:50% !important;
		height:50% !important;
    }

    @media screen  and (max-width:730px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	height:90% !important;
    	margin-top:60% !important;
    }
`;


const BlogContainer=styled(Link)`
`;

const VideoDesriptionContainer=styled.div`
	position:absolute;
	top:5%;
	width:30%;
	height:30%;
	border-radius:50%;
	z-index:40;


	@media screen and (max-width:600px){
		height:60px !important;
		width:60px !important;
    }
`;

const HeaderVideoDesriptionContainer=styled.div`
	width:20%;
	height:5%;
	border-radius:50%;
	z-index:30;

	@media screen and (max-width:1370px){
		#headerVideo{
			height:80px !important;
			width:80px !important;
		}
    }

	@media screen and (max-width:600px){
		height:10% !important;
		width:30% !important;
		#headerVideo{
			height:60px !important;
			width:60px !important;
		}
    }
`;


class BlogsPostsContainer extends Component{

	constructor(props){
		super(props);
		this.state={
			isLoading:true,
			blogs:[],
			profileType:this.props.profileType
		}
	}

	async componentDidMount(){
		if(this.props.profileType=="Personal"){
			const {	confirmation,data}=await getBlogFromUser({userId:this.props.id,visitorId:this.props.visitorId});
			if(confirmation=="Success"){
				const {
					crownedBlog,
					blogArray
				}=data;

				console.log(crownedBlog);
				console.log(blogArray);
				this.setState({
					headerBlog:crownedBlog==={}?null:crownedBlog,
					blogs:blogArray,
					isLoading:false,
					blogUrl:`/createBlog`,
					profileType:"Personal"
				})
			}else{
				alert('Unfortunately there has been an error getting these blog posts. Please try again');
			}
		}else{				
		
			const {	headerBlog,blogPosts}=await getCompanyBlogs(this.props.id);
			
			this.setState({
				headerBlog:headerBlog,
				blogs:blogPosts,
				isLoading:false,
				blogUrl:`/blog/${this.props.id}`,
				profileType:"Company"
			})
		}
	}

	constructName=(personalInformation)=>{
		
		const firstName=personalInformation.userProfile.firstName;
		const lastName=personalInformation.userProfile.lastName;
		const fullName=firstName+" "+lastName
		return fullName;
	}
	constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;
	}

render(){
return(
	<UserConsumer>
		{personalInformation=>{
			return <Container>
			{this.state.isLoading==true?<p>Currently loading blog posts</p>:
				<React.Fragment>
					{this.state.blogs.length==0&&this.state.headerBlog==null?
						<NoPostsModal
							id="noPostsModalContainer"
							postType={"blog"}
							profilePageType={this.props.profile}
						/>:
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								{this.state.headerBlog==null?<React.Fragment></React.Fragment>:
									<ThumbnailBlogComponent to={{pathname:personalInformation.isOwnProfile==true?`/createBlog`:`/blog/${this.state.headerBlog._id}`,
																		state:{
																				...this.state.headerBlog,
																				profileType:this.state.profileType,
																				friendsNodes:this.props.friendsNodes
																		}}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<li style={{listStyle:"none",display:"inline-block"}}>
													{this.state.headerBlog.audioDescription!=null &&(
														<audio id="headerAudioLI" controls style={{width:"200px"}} >
														  <source src={this.state.headerBlog.audioDescription} type="audio/ogg"/>
														  <source src={this.state.headerBlog.audioDescription} type="audio/mpeg"/>
														  Your browser does not support the audio element.
														</audio>
													)}
												</li>
												<li style={{width:"20%",listStyle:"none",display:"inline-block"}}>
													<HeaderVideoDesriptionContainer>
														{this.state.headerBlog.videoDescription!=null &&(
															<video id="headerVideo" style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
																<source src={this.state.headerBlog.videoDescription} type="video/mp4"/>
															</video>
														)}
													</HeaderVideoDesriptionContainer>
												</li>
											</li>

											<li id="headerImageLI" style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
												<img  id="headerImage" src={this.state.headerBlog.blogImageUrl} style={{width:"450px",height:"40%"}}/>
											</li>

											<li id="headerDescriptionLI" style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",width:"300px"}}>
												<ul style={{paddging:"0px"}}>
													<li id="headerSymposiumsLI" style={{marginBottom:"5px",listStyle:"none",padding:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
														{this.state.headerBlog.industriesUploaded[0].industry}
													</li>
													<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px"}}>
														<b>{this.state.headerBlog.title}</b>
													</li>

													<li id="headerConstructedDateLI" style={{listStyle:"none",marginBottom:"5px"}}>
														<ul style={{padding:"0px",color:"#a6a6a7"}}>
															<li style={{listStyle:"none",display:"inline-block"}}>
																{this.constructDate(this.state.headerBlog.datePosted)}
															</li>
														</ul>
													</li>

													<li style={{listStyle:"none"}}>
														<Description>
															{this.state.headerBlog.description}
														</Description>

													</li>
												</ul>
											</li>
										</ul>
									</ThumbnailBlogComponent>
								}
							</li>
							<hr/>
							<li id="searchSymposiumPostLI" style={{listStyle:"none",marginTop:"5%"}}>
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
									{this.state.blogs.map(data=>
										<BlogContainer to={{pathname:personalInformation.isOwnProfile==true?`/createBlog`:`/blog/${data._id}`,
																		state:{
																				...data,
																				profileType:this.state.profileType,
																				friendsNodes:this.props.friendsNodes
																		}}}>
																		
											<li style={{listStyle:"none",display:"inline-block",marginRight:"8%",marginBottom:"-7%"}}>
												<SmallBlogComponent>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none"}}>
															{data.audioDescription!=null &&(
																<audio id="smallAudio" controls>
																  <source src={data.audioDescription} type="audio/ogg"/>
																  <source src={data.audioDescription} type="audio/mpeg"/>
																  Your browser does not support the audio element.
																</audio>
															)}
														</li>

														<li style={{listStyle:"none"}}>
															<SmallBlog>
																<img src={data.blogImageUrl} width="100%" height="100%"/>
																<VideoDesriptionContainer>
																	{data.videoDescription!=null &&(
																		<video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" muted>
																			<source src={data.videoDescription} type="video/mp4"/>
																		</video>
																	)}
																</VideoDesriptionContainer>
			
															</SmallBlog>
														</li>

														<li style={{listStyle:"none",fontSize:"15px"}}>
															<b> {data.title} </b>
														</li>
														<li style={{listStyle:"none",fontSize:"15px"}}>
															{data.description}
														</li>
														{/*
															<li style={{listStyle:"none"}}>
																{this.constructName(personalInformation)}
															</li>
														*/}

														<li id="datePostedLI" style={{listStyle:"none",color:"#8c8c8c"}}>
															<ul style={{padding:"0px"}}>

																<li style={{listStyle:"none",display:"inline-block"}}>
																	{this.constructDate(data.datePosted)}
																</li>
															</ul>
														</li>

														<li id="symposiumsLI" style={{listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
															{data.industriesUploaded[0].industry}
														</li>
													</ul>

												</SmallBlogComponent>
											</li>
										</BlogContainer>
										)}
									</ul>
								</li>
							</ul>
						}	
					</React.Fragment>
				}
			</Container>
		}}
	</UserConsumer>
		)
	}
}

export default BlogsPostsContainer;