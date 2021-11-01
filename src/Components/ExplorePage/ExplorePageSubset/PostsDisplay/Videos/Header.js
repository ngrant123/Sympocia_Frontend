import React,{useState,useEffect} from "react";
import ExploreVideoDisplay from "../../../../GeneralComponents/PostComponent/VideoComponent/SymposiumAndExplorePageVideo.js";
import {
	Container,
	HeaderContainer,
	SupportingPosts
} from "./HeaderCSS.js";

const Header=({posts,targetDom,isSymposiumPostUI})=>{
	const [isMounted,changeMountStatus]=useState(false);
	const [highLightedPost,changeHighLightedPosts]=useState();
	const [supportingPosts,changeSupportingPosts]=useState([]);

	useEffect(()=>{
		const highLightedPost=posts[0];
		const supportedPosts=posts.splice(1,posts.length);

		changeHighLightedPosts(highLightedPost);
		changeSupportingPosts([...supportedPosts]);
		changeMountStatus(true);
	},[]);


	const video=(data)=>{
		return(
			<ExploreVideoDisplay
				videoInformation={data}
				targetDom={targetDom}
			/>
		)
	}


	const headerPost=()=>{
		const headerPostComponent=video(highLightedPost);
		return(
			<HeaderContainer>
				{headerPostComponent}
			</HeaderContainer>
		)
	}

	const supportingPostsRender=()=>{
		return(
			<SupportingPosts>
				{supportingPosts.map(data=>
					<>{video(data)}</>
				)}
			</SupportingPosts>
		)
	}
	return(
		<React.Fragment>
			{isMounted==true &&(
				<Container>
					{headerPost()}
					{supportingPostsRender()}
				</Container>
			)}
		</React.Fragment>
	)
}

export default Header;