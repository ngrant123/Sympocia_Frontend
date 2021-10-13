import React from "react";
import styled from "styled-components";
import ExploreImageDisplay from "../../../../GeneralComponents/PostComponent/ImageComponent/SymposiumAndExplorePageImage.js";

const SupportingPostsContainer=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;

	#smallImageContainer{
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
				<ExploreImageDisplay
					imageInformation={data}
					targetDom={targetDom}
				/>
			)}
		</SupportingPostsContainer>
	)
}

export default Posts;