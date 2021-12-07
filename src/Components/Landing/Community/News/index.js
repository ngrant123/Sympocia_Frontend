import React,{useState,useEffect} from "react";
import styled from "styled-components";
import InitialNewsDisplaySpread from "./SmallNewsContainers.js";

const Container=styled.div`
	width:100%;
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;

	@media screen and (max-width:650px){
		flex-direction:column;
	}
`;

const ExtendedBlog=styled.div`
	display:flex;
	flex-direction:column;
	margin-bottom:10%;
`;

const BackButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginBottom:"5%",
  maxWidth:"60px"
}


const News=({news,displayMobileUI})=>{
	const [displayCurrentNews,changeDisplayCurrentNews]=useState(true);
	const [selectedNews,changeSelectedNews]=useState();

	useEffect(()=>{
		window.scrollTo({ top: 0, behavior: "smooth" });
	},[displayCurrentNews]);

	const displaySelectedBlog=(blogData)=>{
		changeSelectedNews(blogData);
		changeDisplayCurrentNews(false);
	}
	return(
		<Container>
			{displayCurrentNews==true?
				<InitialNewsDisplaySpread 
					news={news}
					displaySelectedBlog={displaySelectedBlog}
					displayMobileUI={displayMobileUI}
				/>:
				<ExtendedBlog>
					<div onClick={()=>changeDisplayCurrentNews(true)} style={BackButtonCSS}>
						Back
					</div>
					{selectedNews.component}
				</ExtendedBlog>
			}
		</Container>
	)
}

export default News;