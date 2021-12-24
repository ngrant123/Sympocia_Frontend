import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import RegularPostDisplayPortal from "../../../ExplorePageSet/Modals-Portals/RegularPostHomeDisplayPortal.js";
import {Link} from "react-router-dom";
import ConstructSuggestedSymposium from "../../ConstructSuggestedSymposium.js";
import ExplorePageRegularPost from "../../../../GeneralComponents/PostComponent/RegularPostComponent/SymposiumAndExplorePageRegularPost.js";

import {
	Container,
	PostsContainer,
	Post,
	ProfileHeaderImage,
	ImagesContainer,
	ProfilePicture,
	ProfilePictureLink,
	PostUserInformation
} from "./TextPostCSS.js";
import NextButton from "../NextButton.js";

const RegularPostLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const BorderCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#D8D8D8",
	padding:"10px"
}

const RegularPostModal=(props)=>{
	const [textOrAudioPosts,changeTextOrAudioPosts]=useState(props.posts);
	const personalInformationRedux=useSelector(state=>state.personalInformation);

	const [displayRegualrPostDisplayPortal,changeRegularPostDisplay]=useState(false);
	const [selectedRegularPost,changeSelectedRegularPost]=useState();
	const [displayRecommendedPosts,changeRecommendedPosts]=useState();

	useEffect(()=>{
		const currentPosts=textOrAudioPosts;
		const updatedTextOrAudioPosts=currentPosts.concat(props.posts);
		changeTextOrAudioPosts([...updatedTextOrAudioPosts]);
	},[props.posts]);

	const closeModal=()=>{
		changeRegularPostDisplay(false)
	}

	const displayPostModal=(data)=>{
		changeSelectedRegularPost(data);
		changeRecommendedPosts(textOrAudioPosts);
		changeRegularPostDisplay(true);
	}
	const detectEndOfPostContainer=(divElement)=>{
		if(	divElement.scrollHeight - divElement.scrollTop - divElement.clientHeight < 1
			 && props.endOfPostsDBIndicator==false && props.isLoadingReloadedPosts==false){
			props.triggerReloadingPostsHandle();
		}
	}

	return(
		<Container>
			{textOrAudioPosts.map(data=>
				<React.Fragment>
					{data=="suggestedSymposium"?
						<ConstructSuggestedSymposium
							personalInformation={personalInformationRedux}
							previousProps={props}
							currentHeight={"30%"}
						/>:
						<PostsContainer style={BorderCSS}>
							<ExplorePageRegularPost
								regularPostInformation={data}
								targetDom={props.targetDom}
							/>
						</PostsContainer>
					}
				</React.Fragment>
			)}
			<NextButton
				endOfPostsDBIndicator={props.endOfPostsDBIndicator}
				isLoadingReloadedPosts={props.isLoadingReloadedPosts}
				triggerReloadingPostsHandle={props.triggerReloadingPostsHandle}
				postType={"RegularPosts"}
			/>
		</Container>
	)
}

export default RegularPostModal;