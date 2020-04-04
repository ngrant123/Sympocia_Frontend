import React,{Component} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../../UserContext.js";


const SmallVideoComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;
`;


const SmallVideo=styled.div`

	position:relative;
	height:65%;
	width:100%;
	background-color:red;
	border-radius:5px;
`;

const SmallVideoContainer=(videoData)=>{

	return(
		<UserConsumer>
			{personalInformation=>{
				return <SmallVideoComponent>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none"}}>
													<SmallVideo>
														<video width="100%" height="100%" controls autoplay>
																<source src={videoData.videoUrl} type="video/mp4"/>
														</video>
													</SmallVideo>
												</li>

												<li style={{listStyle:"none",fontSize:"15px"}}>
													<b>{videoData.title} </b>
												</li>

												<li style={{listStyle:"none"}}>
													{personalInformation.userProfile.firstName}
												</li>

												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
															{videoData.views} views
														</li>

														<li style={{listStyle:"none",display:"inline-block"}}>
															{videoData.datePosted} days ago
														</li>
													</ul>
												</li>

												<li style={{listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
													{videoData.industry}
												</li>
											</ul>

						</SmallVideoComponent>
			}}
		</UserConsumer>

	)
}

export default SmallVideoContainer;