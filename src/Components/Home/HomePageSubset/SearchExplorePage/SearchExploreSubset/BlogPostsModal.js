import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import BlogHomeDisplayPortal from "../../../HomePageSet/BlogHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import {
	displayRecruitButton,
	displayPersonalIndustryFeed
} from "./ImagePostsModal.js";

import {Link} from "react-router-dom";

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

const VideoDesriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:60px;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
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


const ProfilePictureLink=styled(Link)`
	position:relative;
`;


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

	const constructSuggestedSymposium=(personalInformation,previousProps)=>{
		debugger;
		console.log(personalInformation);
		const {personalInformationState}=personalInformation;
		var symposiumContainer=new Map();
		var selectedSymposiums=[];
			var counter=0;
			while(counter<3){   
				if(previousProps.isPersonalProfile==true){
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
								<li onClick={()=>displayPersonalIndustryFeed(personalInformation,data,selectedSymposiums,previousProps)} style={{fontSize:"15px",color:"white",background:data.backgroundColor,padding:"20px",listStyle:"none",borderRadius:"5px",marginBottom:"5%"}}>
									<b>{data.industry}</b>
								</li>
							</a>
						)}
				   </ul>
	}
	return(
	<React.Fragment>
	{props.posts.length>=1?
		<React.Fragment>
		<li style={{position:"relative",top:"-170px",listStyle:"none",display:"inline-block",width:"50%"}}>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px",zIndex:"8",marginBottom:"1%"}}>
						{headerBlog.videoDescription!=null?
							<li style={{listStyle:"none",display:"inline-block",marginRight:"4%"}}>
								<VideoDesriptionContainer>
									   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true">
											<source src={headerBlog.videoDescription} type="video/mp4"/>
										</video>
								</VideoDesriptionContainer>
							</li>:null
						}
						
						{headerBlog.audioDescription!=null?
							<li style={{llistStyle:"none",display:"inline-block"}}>
								<audio style={{width:"200px"}} controls>
								  	<source src={headerBlog.audioDescription} type="audio/ogg"/>
								  	<source src={headerBlog.audioDescription} type="audio/mpeg"/>
									Your browser does not support the audio element.
								</audio>
							</li>:null
						}
					</ul>
					</li>
					<li style={{listStyle:"none",width:"120%",borderRadius:"5px",marginBottom:"2%"}}>
						<ul style={{padding:"0px",height:"55%",width:"100%"}}>
							<li onClick={()=>handleDisplayHeaderBlog()} style={{listStyle:"none",display:"inline-block",marginRight:"2%",backgroundColor:"red"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<img src={headerBlog.blogImageUrl} style={HeaderBlogCSS}/>
								</a>
							</li>
							<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",width:"40%",fontSize:"25px",height:"55%",overflow:"hidden"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<b>
											{headerBlog.title}
										</b>
									</li>

									<li style={{fontSize:"15px",color:"#8c8c8c",listStyle:"none"}}>
										{headerBlog.description}
									</li>
								</ul>
								
							</li>
						</ul>
					</li>
					<li style={{listStyle:"none",width:"80%"}}>
						<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<ProfilePictureLink to={{pathname:`/profile/${headerBlog.owner._id}`}}>
												{headerBlog.owner.profilePicture!=null?
													<img src={headerBlog.owner.profilePicture} style={ProfileImageCSS}/>:
													<img src={NoProfilePicture} style={ProfileImageCSS}/>
												}
										</ProfilePictureLink>
									</li>
									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"10%"}}>
										{headerBlog.owner.firstName}
									</li>
									<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,headerBlog.industriesUploaded,props)} style={ImageLabelCSS}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											{headerBlog.industriesUploaded[0].industry}
										</a>
									</li>
									{displayRecruitButton(headerBlog,props)}
						</ul>
					</li>
				</ul>
			</li>

			<li style={{width:"60%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",height:"80%",overflowY:"auto",marginBottom:"20%"}}>
				<ul style={{padding:"0px"}}>
					{blogs.map(data=>
						<React.Fragment>
								{data=="suggestedSymposium"?
									<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"4%"}}>
										{constructSuggestedSymposium(personalInformationRedux,props)}
									</li>
								:<li style={{list0Style:"none",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none"}}>
											<ul style={{padding:"0px",zIndex:"8",marginBottom:"1%"}}>
												{data.videoDescription!=null?
													<li style={{listStyle:"none",display:"inline-block",marginRight:"4%"}}>
														<VideoDesriptionContainer>
															   <video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true">
																	<source src={data.videoDescription} type="video/mp4"/>
																</video>
														</VideoDesriptionContainer>
													</li>:null
												}
												
												{data.audioDescription!=null?
													<li style={{llistStyle:"none",display:"inline-block"}}>
														<audio style={{width:"200px"}} controls>
														  	<source src={data.audioDescription} type="audio/ogg"/>
														  	<source src={data.audioDescription} type="audio/mpeg"/>
															Your browser does not support the audio element.
														</audio>
													</li>:null
												}
											</ul>
										</li>
										<li onClick={()=>displayBlogModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%",marginRight:"2%"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<ShadowContainer/>
												<img src={data.blogImageUrl} style={VideoContainerCSS}/>
											</a>
										</li>
										<li style={{position:"relative",top:"0%",listStyle:"none",display:"inline-block"}}>
												<ul style={{padding:"0px",position:"absolute",top:"-100px"}}>
														<li style={{listStyle:"none",height:"170px",width:"280px",overflow:"hidden",marginBottom:"2%",fontSize:"15px"}}>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none"}}>
																	<b>
																		{data.title}
																	</b>
																</li>

																<li style={{color:"#8c8c8c",fontSize:"12px",listStyle:"none"}}>
																	{data.description}
																</li>
															</ul>

														</li>
														<li style={{listStyle:"none"}}>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"20%"}}>
																	{data.owner.profilePicture==null?
																		<img id="profilePicture" src={NoProfilePicture} style={ProfileImageCSS}/>:
																		<img id="profilePicture" src={data.owner.profilePicture} style={ProfileImageCSS}/>
																	}
																</li>
																<li style={{listStyle:"none",display:"inline-block"}}>
																	<ul style={{padding:"0px"}}>
																		<li style={{listStyle:"none"}}>
																			{data.owner.firstName}
																		</li>
																		{displayRecruitButton(data,props)}

																		<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} style={ImageLabelCSS}>
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
	)
}

export default BlogPostModal;