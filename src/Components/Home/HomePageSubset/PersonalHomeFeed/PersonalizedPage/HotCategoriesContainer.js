import React,{Component,useState,useEffect} from "react";
import styled from "styled-components";

const Container=styled.div`
	margin-top:20px;
	position:relative;
	width:80%;
	height:40%;
	left:7%;
	background-color:white;
	border-radius:5px;
	box-shadow: 1px 1px 5px 5px #d5d5d5;
	overflow:hidden;
`;

const OptionsContainer=styled.div`
	position:relative;
	background-color:white;
	padding:10px;
	transition:.8s;
	border-radius:5px;
	box-shadow:1px 1px 1px 1px #d5d5d5;

	&:hover{
		background-color:#5298F8;
		color:white;
	}
`;

const PopularVideos=styled.div`
	position:relative;
	background-color:red;
	border-radius:5px;
	width:310px;
	height:70%;
`;

const Communities=styled.div`
	position:relative;
	border-radius:5px;
	background-color:red;
	height:30%;
	width:300px;

`;

const HeaderOptionsCSS={
	listStyle:"none",
	display:"inline-block",
	fontSize:"15px",
	marginRight:"10px"
}

const HeaderLastOptionCSS={
	listStyle:"none",
	display:"inline-block",
	fontSize:"20px",
	marginLeft:"70%",
	color:"#5298F8"
	
}



const HotCategoriesContainer=()=>{

	const [displayPopularVideos,changePopularVideos]=useState(false);

	//Test Display
	const [popularVideos,changePopular]=useState([{},{},{}]);
	const [popularCommunities,changeCommunities]=useState([{},{},{},{},{},{},{},{},{}]);

	const displayPopularVidoesOrCommunities=()=>{

		return displayPopularVideos==false?
			<React.Fragment>
				{popularVideos.map(data=>
					<li style={{listStyle:"none",display:"inline-block",marginLeft:"10px",padding:"10px"}}>
						<PopularVideos>
						</PopularVideos>
					</li>


				)}
			</React.Fragment>:
			<React.Fragment>
				{popularCommunities.map(data=>
					<li style={{listStyle:"none",display:"inline-block",marginLeft:"10px",padding:"10px"}}>
						<Communities>
						</Communities>
					</li>
				)}
			</React.Fragment>;
	}


	return(
		<Container>
			<ul style={{paddingTop:"10px"}}>
				<li style={HeaderOptionsCSS}>
					<OptionsContainer onClick={()=>changePopularVideos(false)}>Popular Videos</OptionsContainer>
				</li>

				<li style={HeaderOptionsCSS} onClick={()=>changePopularVideos(true)}>
					<OptionsContainer>Popular Communities</OptionsContainer>
				</li>

				<li style={HeaderLastOptionCSS}>
					<p>See all </p>

				</li>
			</ul>
			<ul>
				{displayPopularVidoesOrCommunities()}

			</ul>


		</Container>


	)
}


export default HotCategoriesContainer;