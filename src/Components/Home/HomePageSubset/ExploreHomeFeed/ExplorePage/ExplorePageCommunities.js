import React,{ useState,useEffect } from "react";
import styled from "styled-components";
import ReactCardFlip from 'react-card-flip';


const PopularVideosContainer=styled.div`
	position:relative;
	width:80%;
	height:35%;
	background-color:white;
	border-radius:5px;

`;

const CommunityContainerCSS={
	listStyle:"none"
}
const PopularVideos=styled.div`
	position:relative;
	width:60px;
	height:70%;
	background-color:red;
	top:10px;
	border-radius:5px;
	overflow:hidden;
`;


const ExplorePageCommunities=(props)=>{
	console.log(props);

	/*
		<li style={{listStyle:"none",display:"inline-block"}}>PopularVideos</li>
		<li style={{listStyle:"none",display:"inline-block"}}>Testing</li>

	*/
	const [popularVideos,changePopularVideosData]=useState([]);
	//TEST
	const [indicator,changeIndicator]=useState(false);
	useEffect(()=>{
		changePopularVideosData(props.communityData.popularVideos);
	},[])


	return(
		<React.Fragment>
			<ReactCardFlip isFlipped={indicator} flipDirection="horizontal">
				<React.Fragment>
					<ul>
									<li style={CommunityContainerCSS}><b><p style={{fontSize:"50px",color:"white",marginBottom:"50px"}}>{props.communityData.communityName}</p></b></li>
									<li style={CommunityContainerCSS}>
										<p style={{marginBottom:"10px",color:"white"}}>Popular videos</p>
									</li>
									<li style={{listStyle:"none"}}>
										<PopularVideosContainer onClick={()=>changeIndicator(true)}>
											<ul>
												{popularVideos.map(data=>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
														<PopularVideos>

														</PopularVideos>
												    </li>
												)}
											</ul>

										</PopularVideosContainer>
									</li>


					</ul>
				</React.Fragment>


				<React.Fragment>
				<p> Testing </p>	



				</React.Fragment>
			</ReactCardFlip>
		</React.Fragment>
	)
}


export default ExplorePageCommunities;