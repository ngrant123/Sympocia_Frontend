import React,{useState,useEffect} from "react";
import styled from "styled-components";

const Recommendation=styled.div`
	position:relative;
	background-color:red;
	height:55%;
	width:150px;
	border-radius:5px;
	text-align:center;
	word-break:break-all;
	padding-top:40px;
	padding-left:10px;
	overflow:hidden;

`;

const NameContainer=styled.div`
	position:absolute;
	height:20%;
	width:90%;


`;


const RecommendedContainer=(props)=>{

	const [recommendation,changeRecommendation]=useState([
		{backgroundColor:"linear-gradient(to left, #9933ff 0%, #ff99ff 100%)",communityName:"Sportsaewliunvliraejbviur"},
		{backgroundColor:"linear-gradient(to right, #ff9933 0%, #ffff00 100%)",communityName:"Sports"},
		{backgroundColor:"linear-gradient(to right, #00ccff 0%, #00ffff 100%)",communityName:"Sports"},
		{backgroundColor:"linear-gradient(to right, #ffff66 0%, #ffffcc 100%)",communityName:"Sports"}]);

	useEffect(()=>{



	})

	return(
		<React.Fragment>
			<p style={{fontSize:"30px",fontFamily:"'Fredoka One', cursive",color:"white"}}>Recommended Communities</p>
			<p style={{fontSize:"15px",fontFamily:"'Fredoka One', cursive",color:"white"}}>Here are recommended communities</p>

			{recommendation.map(data=>
				<li style={{listStyle:"none",display:"inline-block",paddingLeft:"50px"}}>
					<Recommendation style={{background:data.backgroundColor}}>
						<NameContainer>
							<p style={{color:"white",fontSize:"20px"}}><b>{data.communityName}</b></p>
						</NameContainer>
					</Recommendation>
				</li>
			)}


		</React.Fragment>
	)
}

export default RecommendedContainer;