import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ExploreVideoDisplay from "../../../../GeneralComponents/PostComponent/VideoComponent/SymposiumAndExplorePageVideo.js";

const HeaderContainer=styled.div`
	width:600px !important;
	height:400px !important;
	margin-right:2%;

	#video{
		width:600px !important;
		height:400px !important;
	}

	#videoTitle{
		font-size:18px !important;
	}
`;

const SupportingPosts=styled.div`
	display:flex;
	flex-direction:column;
	flex-wrap:wrap;
	width:100%;

	#video{
		width:700px !important;
		height:200px !important;

	}
	#videoTitle{
		font-size:15px !important;
	}
`;

const Header=({posts,targetDom,isSymposiumPostUI})=>{
	console.log(posts);
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
		<div style={{display:"flex",flexDirection:"row"}}>
			{isMounted==true &&(
				<>
					{headerPost()}
					{supportingPostsRender()}
				</>
			)}
		</div>
	)
}

export default Header;