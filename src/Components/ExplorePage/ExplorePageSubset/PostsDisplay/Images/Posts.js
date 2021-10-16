import React from "react";
import styled from "styled-components";
import ExploreImageDisplay from "../../../../GeneralComponents/PostComponent/ImageComponent/SymposiumAndExplorePageImage.js";
import {SupportingPostsContainer} from "./PostsCSS.js";

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