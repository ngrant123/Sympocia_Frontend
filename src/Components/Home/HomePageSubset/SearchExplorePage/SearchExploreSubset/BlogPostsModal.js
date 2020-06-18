import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import BlogHomeDisplayPortal from "../../../HomePageSet/BlogHomeDisplayPortal.js";
import {displayPersonalIndustryFeed} from "./ImagePostsModal.js";
import {useSelector} from "react-redux";
import {HomeConsumer} from "../../../HomeContext.js";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";

const HeaderBlog=styled.div`
	width:400px;
	height:55%;
	border-radius:5px;
	background-color:red;
	border-radius:5px;
`;

const HeaderBlogCSS={
	width:"400px",
	height:"100%",
	borderRadius:"5px",
	borderRadius:"5px"
}

const VideoContainerCSS={
	position:"relative",
	width:"280px",
	height:"230px",
	borderRadius:"5px"
}

const VideosContainer=styled.div`
	position:relative;
	width:280px;
	height:230px;
	border-radius:5px;
	background-color:red;
`;

const ShadowContainer= styled.div`
	position:absolute;
	width:280px;
	height:230px;
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

const ProfileImageCSS={
	position:"relative",
	width:"50px",
	height:"50px",
	backgroundColor:"red",
	borderRadius:"50%"
}

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

const BlogPostModal=(props)=>{
	const headerBlog=props.posts[0];
	const blogs=props.posts.slice(1,props.posts.length);
	console.log(props);

	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);

	const [displayBlogDisplayPortal,changeBlogDisplay]=useState(false);
	const [selectedBlog,changeSelectedBlog]=useState();
	const [displayRecommendedBlogs,changeRecommendedBlogs]=useState();


	const closeModal=()=>{
		changeBlogDisplay(false)
	}

	const handleDisplayHeaderBlog=()=>{
		changeSelectedBlog(headerBlog);
		changeRecommendedBlogs(blogs);
		changeBlogDisplay(true);
	}

	const displayBlogModal=(data)=>{
		changeSelectedBlog(data);
		changeRecommendedBlogs(blogs);
		changeBlogDisplay(true);
	}

	const tester=()=>{
		console.log("Testing");
	}

	const constructSuggestedSymposium=(personalInformation,homePageInformation)=>{
		debugger;
		console.log(personalInformation);
		const {personalInformationState}=personalInformation;
		var symposiumContainer=new Map();
		var selectedSymposiums=[];
			var counter=0;
			while(counter<3){   
				if(homePageInformation.isPersonalProfile==true){
					const randomNum=Math.floor(Math.random() * ((PERSONAL_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}else{
					const randomNum=Math.floor(Math.random() * ((COMPANY_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}
				counter++;
			}

			return <ul style={{padding:"0px",position:"relative"}}>
						{selectedSymposiums.map(data=>
							<a href="javascript:void(0);">
								<li onClick={()=>displayPersonalIndustryFeed(personalInformation,homePageInformation,data,selectedSymposiums)} style={{fontSize:"15px",color:"white",background:data.backgroundColor,padding:"20px",listStyle:"none",borderRadius:"5px",marginBottom:"5%"}}>
									<b>{data.industry}</b>
								</li>
							</a>
						)}
				   </ul>
	}
	return(
		<HomeConsumer>
				{homePageInformation=>{
					return <React.Fragment>
								{props.posts.length>=1?
									<React.Fragment>
									<li style={{position:"relative",top:"-170px",listStyle:"none",display:"inline-block",width:"50%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",width:"120%",borderRadius:"5px",marginBottom:"2%"}}>
													<ul style={{padding:"0px",height:"55%",width:"100%"}}>
														<li onClick={()=>handleDisplayHeaderBlog()} style={{listStyle:"none",display:"inline-block",marginRight:"2%",backgroundColor:"red"}}>
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<img src={headerBlog.blogImageUrl} style={HeaderBlogCSS}/>
															</a>
														</li>
														<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",width:"40%",fontSize:"25px",height:"55%",overflow:"hidden"}}>
															<b>{headerBlog.title}
															</b>
														</li>
													</ul>
												</li>
												<li style={{listStyle:"none",width:"80%"}}>
													<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"10%"}}>
																	{headerBlog.firstName}
																</li>
																<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,homePageInformation,null,headerBlog.industriesUploaded)} style={ImageLabelCSS}>
																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		{headerBlog.industriesUploaded[0].industry}
																	</a>
																</li>

																<li style={ImageLabelCSS}>
																	Follow
																</li>
													</ul>
												</li>
												<li style={{listStyle:"none",width:"90%",height:"10%",overflow:"hidden",color:"#A4A4A4"}}>
															{headerBlog.description}
												</li>
											</ul>
										</li>

										<li style={{width:"60%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",height:"80%",overflowY:"auto",marginBottom:"20%"}}>
											<ul style={{padding:"0px"}}>
												{blogs.map(data=>
													<React.Fragment>
															{data=="suggestedSymposium"?
																<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"4%"}}>
																	{constructSuggestedSymposium(personalInformationRedux,homePageInformation)}
																</li>
															:<li style={{list0Style:"none",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
																<ul style={{padding:"0px"}}>
																	<li onClick={()=>displayBlogModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%",marginRight:"2%"}}>
																		<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																			<ShadowContainer/>
																			<img src={data.blogImageUrl} style={VideoContainerCSS}/>
																		</a>
																	</li>
																	<li style={{position:"relative",top:"0%",listStyle:"none",display:"inline-block"}}>
																			<ul style={{padding:"0px",position:"absolute",top:"-100px"}}>
																					<li style={{listStyle:"none",height:"170px",width:"280px",overflow:"hidden",marginBottom:"2%",fontSize:"15px"}}>
																						<b>
																							{data.description}
																						</b>

																					</li>
																					<li style={{listStyle:"none"}}>
																						<ul style={{padding:"0px"}}>
																							<li style={{listStyle:"none",display:"inline-block",marginRight:"20%"}}>
																								{data.ownerImgUrl==null?
																									<img id="profilePicture" src={NoProfilePicture} style={ProfileImageCSS}/>:
																									<img id="profilePicture" src={data.ownerImgUrl} style={ProfileImageCSS}/>
																								}
																							</li>
																							<li style={{listStyle:"none",display:"inline-block"}}>
																								<ul style={{padding:"0px"}}>
																									<li style={{listStyle:"none"}}>
																										{data.firstName}
																									</li>

																									<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,homePageInformation,null,data.industriesUploaded)} style={ImageLabelCSS}>
																										{data.industriesUploaded[0].industry}
																									</li>
																								</ul>
																							</li>
																						</ul>
																					</li>
																				</ul>
																		</li>
																	</ul>
																</li>
														}	
														</React.Fragment>
													)}
											</ul>
										</li>
										{displayBlogDisplayPortal==false?
													null:
													<BlogHomeDisplayPortal
														closeModal={closeModal}
														selectedBlog={selectedBlog}
														recommendedBlogs={displayRecommendedBlogs}
													/>
											}
									</React.Fragment>
								:<p> No posts </p>
								}
							</React.Fragment>
		}}
	</HomeConsumer>
	)
}

export default BlogPostModal;