import React,{useState,Component} from "react";
import styled from "styled-components";
import SmallVideosContainer from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/VideoPosts/SmallVideos.js";

const Container=styled.div`
	position:relative;
	width:350px;
	height:95%;
	border-radius:5px;
	box-shadow: 1px 1px 5px #d5d5d5;
	overflow-y:auto;
`;


const RecommendedVideos=()=>{

	const [videos,changeVideos]=useState([{},{},{},{},{}]);

	return(
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
						{videos.map(data=>
							<li style={{listStyle:"none",marginBottom:"10%",marginLeft:"10%"}}>
								<SmallVideosContainer/>

							</li>
						)}
					</ul>
				</li>
			</ul>

		</Container>
	)
}

export default RecommendedVideos;