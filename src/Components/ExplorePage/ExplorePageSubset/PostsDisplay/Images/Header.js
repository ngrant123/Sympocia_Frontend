import React,{useRef,useState,useEffect} from "react";
import styled from "styled-components";
import ExploreImageDisplay from "../../../../GeneralComponents/PostComponent/ImageComponent/SymposiumAndExplorePageImage.js";
import{
	Container,
	HeaderContainer,
	SupportingPostsContainer
} from "./HeaderCSS.js";


const Header=({posts,targetDom,isSymposiumPostUI})=>{
	const [highLightedPost,changeHighLightedPosts]=useState();
	const [supportingPosts,changeSupportingPosts]=useState([]);
	const [isMounted,changeMountStatus]=useState(false);

	useEffect(()=>{
		debugger;
		const highLightedPost=posts[0];
		const supportedPosts=posts.splice(1,posts.length);

		changeHighLightedPosts(highLightedPost);
		changeSupportingPosts([...supportedPosts]);
		changeMountStatus(true);
	},[]);

	const image=(data)=>{
		return(
			<ExploreImageDisplay 
				imageInformation={data}
				targetDom={targetDom}
			/>
		)
	}
	const supportingPostsRender=()=>{
		return(
			<SupportingPostsContainer>
				{supportingPosts.map(data=>
					<>{image(data)}</>
				)}
			</SupportingPostsContainer>
		)
	}

	const headerPost=()=>{
		const headerPostComponent=image(highLightedPost);
		return(
			<HeaderContainer>
				{headerPostComponent}
			</HeaderContainer>
		)
	}

	return(
		<Container>
			{isMounted==true &&(
				<React.Fragment>
					{headerPost()}
					{supportingPostsRender()}
				</React.Fragment>
			)}
		</Container>
	)
}


export default Header;