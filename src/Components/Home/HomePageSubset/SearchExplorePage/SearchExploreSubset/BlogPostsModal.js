import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";

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


const ProfileImageCSS=styled.div`
	position:"relative",
	width:"50px",
	height:"50px",
	backgroundColor:"red",
	borderRadius:"50%"
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

const BlogPostModal=(props)=>{
	const headerBlog=props.posts[0];
	const blogs=props.posts.slice(1,props.posts.length);
	console.log(props);
	return(
		<React.Fragment>
			<li style={{position:"relative",top:"-170px",listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",width:"120%",borderRadius:"5px",marginBottom:"2%"}}>
							<ul style={{padding:"0px",height:"55%",width:"100%"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",backgroundColor:"red"}}>
									<img src={headerBlog.blogImageUrl} style={HeaderBlogCSS}/>
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
										<li style={ImageLabelCSS}>
											{headerBlog.industriesUploaded[0].industry}
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
							<li style={{list0Style:"none",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginBottom:"1%",marginRight:"2%"}}>
										<ShadowContainer/>
										<img src={data.blogImageUrl} style={VideoContainerCSS}/>
									</li>
									<li style={{position:"relative",top:"0%",listStyle:"none",display:"inline-block"}}>
											<ul style={{padding:"0px",position:"absolute",top:"-230px"}}>
													<li style={{listStyle:"none",height:"170px",width:"280px",overflow:"hidden",marginBottom:"2%",fontSize:"15px"}}>
														<b>
															{data.description}
														</b>

													</li>
													<li style={{listStyle:"none"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block"}}>
		
																	</li>
																	<li style={{listStyle:"none",display:"inline-block",color:"#A4A4A4",fontSize:"20px"}}>
																		{data.firtsName}
																	</li>
																</ul>
															</li>
															<li style={ImageLabelCSS}>
																{data.industriesUploaded[0].industry}
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