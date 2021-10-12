import React,{useState} from "react";
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

const NextButtonCSS={
	color:"#3898ec",
	height:"70px",
	width:"30%",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
}

const RegularPostModal=(props)=>{
	const headerRegularPost=props.posts[0];
	const regularPosts=props.posts;
	const personalInformationRedux=useSelector(state=>state.personalInformation);

	const [displayRegualrPostDisplayPortal,changeRegularPostDisplay]=useState(false);
	const [selectedRegularPost,changeSelectedRegularPost]=useState();
	const [displayRecommendedPosts,changeRecommendedPosts]=useState();

	const closeModal=()=>{
		changeRegularPostDisplay(false)
	}

	const handleDisplayHeaderPost=()=>{
		changeSelectedRegularPost(headerRegularPost);
		changeRecommendedPosts(regularPosts);
		changeRegularPostDisplay(true);
	}

	const displayPostModal=(data)=>{
		changeSelectedRegularPost(data);
		changeRecommendedPosts(regularPosts);
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
			{regularPosts.map(data=>
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
			{props.endOfPostsDBIndicator==false && (
				<React.Fragment>
					{props.isLoadingReloadedPosts==true?
						<p>Loading please wait...</p>:
						<p onClick={()=>props.triggerReloadingPostsHandle("RegularPosts")} style={{...NextButtonCSS,marginLeft:"2%",marginTop:"20%"}}>
							Next
						</p>
					}
				</React.Fragment>
			)}
		</Container>
	)
}

export default RegularPostModal;