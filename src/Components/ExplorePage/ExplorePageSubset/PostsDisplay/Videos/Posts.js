import React from "react";
import ExploreVideoDisplay from "../../../../GeneralComponents/PostComponent/VideoComponent/SymposiumAndExplorePageVideo.js";
import {
	SupportingPostsContainer,
	VideoContainer
} from "./PostsCSS.js";

const Posts=({posts,targetDom,isSymposiumPostUI})=>{
	return(
		<SupportingPostsContainer>
			{posts.map(data=>
				<VideoContainer>
					<ExploreVideoDisplay
						videoInformation={data}
						targetDom={targetDom}
					/>
				</VideoContainer>
			)}
		</SupportingPostsContainer>
	)
}

export default Posts;