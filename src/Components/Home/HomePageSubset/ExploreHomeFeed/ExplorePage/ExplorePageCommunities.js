import React,{ useState,useEffect } from "react";
import styled from "styled-components";



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
	overflow-x:scroll;
`;


const ExplorePageCommunities=(props)=>{
	console.log(props);

	/*
		<li style={{listStyle:"none",display:"inline-block"}}>PopularVideos</li>
		<li style={{listStyle:"none",display:"inline-block"}}>Testing</li>

	*/

	const [communityData,changeCommunityData]=useState([]);

	useEffect(()=>{
		changeCommunityData(props.communityData.popularVideos);
	},[])


	return(
		<React.Fragment>
			<ul>
							<li style={CommunityContainerCSS}><b><p style={{fontSize:"50px",color:"white",marginBottom:"50px"}}>{props.communityData.communityName}</p></b></li>
							<li style={CommunityContainerCSS}>
								<p style={{marginBottom:"10px",color:"white"}}>Popular videos</p>
							</li>
							<li style={{listStyle:"none"}}>
								<PopularVideosContainer>
									<ul>
										{communityData.map(data=>
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
	)
}


export default ExplorePageCommunities;