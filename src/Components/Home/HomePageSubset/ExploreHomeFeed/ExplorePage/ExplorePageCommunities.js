import React,{ useState,useEffect } from "react";
import styled from "styled-components";
import StampIcon from "../../../../../designs/img/StampIcon.png";


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
	width:130px;
	height:40%;
	background-color:red;
	top:10px;
	border-radius:5px;
	overflow:hidden;
`;

const CommunityContainer=styled.div`
	position:relative;
	width:450px;
	height:50%;
	paddding-left:5px;
	transition: transform 300ms ease-in-out;
	box-shadow: 10px 20px 20px  #BDBDBD;
	border-radius:5px;
	overflow-y:auto;
`;

const FollowCSSButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}


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
		changePopularVideosData([{},{},{}]);
	},[]);


	return(
		<CommunityContainer>
			{popularVideos==null?null:
					<ul style={{padding:"0px"}}>
						<li style={{position:"relative",listStyle:"none",background:props.communityData.backgroundColor}}>
							<ul style={{padding:"20px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"20%"}}>
									<p style={{color:"white",fontSize:"30px"}}><b>{props.communityData.industry}</b></p>
									<p style={{color:"white"}}>Popular Videos</p>
								</li>
								<li style={FollowCSSButton}>
									Follow +
								</li>
							</ul>
						</li>
						<li style={{listStyle:"none"}}>
							{props.communityData.popularPosts.length==0?
								<ul>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<img src={StampIcon} style={{position:"relative",width:"40%",height:"50%"}}/>
									</li>
									<li style={{listStyle:"none",display:"inline-block"}}>

									</li>

								</ul>:
								<ul>
									{popularVideos.map(data=>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"10px",marginBottom:"3%"}}>
											<PopularVideos>

											</PopularVideos>
										 </li>
									)}
								</ul>
							}
						</li>
					</ul>
				}		
		</CommunityContainer>
	)
}


export default ExplorePageCommunities;