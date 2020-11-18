import React,{useState,Component} from "react";
import styled from "styled-components";
import SmallVideosContainer from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/VideoPosts/SmallVideos.js";

const Container=styled.div`
	position:relative;
	width:400px;
	height:95%;
	border-radius:5px;
	box-shadow: 1px 1px 5px #d5d5d5;
	overflow-y:auto;
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

const ShadowContainer= styled.div`
	position:absolute;
	height:290px;
	width:370px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
`;


const RecommendedVideos=(props)=>{
	const [videos,changeVideos]=useState([{},{},{},{},{}]);

	return(
		<React.Fragment>
			{props.videos!=null?
				<Container>
					<ul style={{padding:"0px",position:"relative"}}>
						<li style={{listStyle:"none",position:"relative",width:"100%",marginTop:"5%",marginBottom:"2%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",color:"#5298F8",fontSize:"15px",marginRight:"5%",marginLeft:"5%"}}>
									View videos from:
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
								{props.videos.map(data=>
									<React.Fragment>
										{data.videoUrl !=null?
											<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
																<ShadowContainer/>
																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<video id="smallVideo" key={data.videoUrl} position="relative" height="290px" width="370px" controls autoplay>
																		<source src={data.videoUrl} type="video/mp4"/>
																	</video>
																</a>
															</li>
															<li style={{listStyle:"none",marginBottom:"1%"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",width:"150%"}}>
																		<b> 
																			{data.title}
																		</b>
																	</li>
																	<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																		<b>{data.firstName}</b>
																	</li>

																	<li style={ImageLabelCSS}>
																		{data.industriesUploaded[0].industry}
																	</li>
																</ul>
															</li>
														</ul>
											</li>:null
										}
									</React.Fragment>
								)}
							</ul>
						</li>
						
					</ul>
				</Container>:null

			}
		</React.Fragment>
	)
}

export default RecommendedVideos;