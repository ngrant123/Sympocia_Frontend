import React from "react";
import styled from "styled-components";
import ExploreVideoDisplay from "../../../../GeneralComponents/PostComponent/VideoComponent/SymposiumAndExplorePageVideo.js";

const SupportingPostsContainer=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;

	#video{
		width:250px !important;
		height:200px !important;
		margin-right:7%;
		margin-bottom:15px;
	}
`;


const Posts=({posts,targetDom,isSymposiumPostUI})=>{
	return(
		<SupportingPostsContainer>
			{posts.map(data=>
				<div style={{display:"flex",flexDirection:"column",marginRight:"7%"}}>
					<ExploreVideoDisplay
						videoInformation={data}
						targetDom={targetDom}
					/>
				</div>
			)}
		</SupportingPostsContainer>
	)
}

export default Posts;