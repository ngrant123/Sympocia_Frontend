import React,{useState,useMemo,useRef,useEffect} from "react";
import styled from "styled-components";
import ImagePostDisplayPortal from "../../../ExplorePageSet/Modals-Portals/ImageHomeDisplayPortal.js";
import {useSelector,useDispatch} from "react-redux";

import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {addRecruit} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

import {removeRecruitProfileIsFollowing} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import {HeaderOwnerAndSymposiumInformation} from "../PostDisplayGeneralComp.js";
import ExploreImageDisplay from "../../../../GeneralComponents/PostComponent/ImageComponent/SymposiumAndExplorePageImage.js";
import{
	Container,
	HeaderContainer,
	PostsContainer,
	ShadowContainer,
	HeaderDescriptionContainer,
	SmallPostContainer,
	DescriptionContainer,
	HeaderInformationContainer,
	SmallPostOwnerContainer,
	VideoDesriptionContainer,
	PostUserAndSymposiumInformation,
	PostUserInformation,
	SuggestedSymposiumsContainer
} from "./ImagePostCSS.js";
import Header from "./Header.js";
import Posts from "./Posts.js";

const HeaderImageCSS={
	position:"relative",
	width:"382px",
	height:"269px",
	borderRadius:"5px",
	borderRadius:"5px",
	cursor:"pointer"
}

const ImageLabelCSS={
	listStyle:"none",
	  display:"inline-block",
	  backgroundColor:"white",
	  borderRadius:"5px",
	  padding:"10px",
	  color:"#3898ec",
	  borderStyle:"solid",
	  borderWidth:"2px",
	  borderColor:"#3898ec",
	  width:"90%",
	  maxWidth:"30%",
	  maxHeight:"50px",
	  overflow:"hidden",
	  cursor:"pointer"
}

const ProfileProfileCSS={
	height:"40px",
	width:"45px",
	borderRadius:"50%",
	borderStyle:"solid",
	borderColor:"white",
	borderWidth:"5px"
}

const RecruitButtonLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#C8B0F4",
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"50%",
	color:"white",
	width:"20%",
	backgroundColor:"#a076e6",
	padding:"10px",
	marginRight:"2%",
	textAlign:"center"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	display:"none"
}

const PostsHorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const HeaderArrowDownCSS={
	borderRadius:"50%",
	display:"flex",
	justifyContent:"center",
	padding:"5px",
	width:"30px",
	marginLeft:"40%",
	height:"25px",
	marginTop:"2%",
	boxShadow:"1px 1px 10px #707070"
}

const SmallImageArrowDownCSS={
	borderRadius:"50%",
	display:"flex",
	justifyContent:"center",
	backgroundColor:"#7A7A7A",
	padding:"5px",
	width:"30px",
	height:"25px",
	marginTop:"15%",
	marginLeft:"15%"
}


const ImagePostsModal=(props)=>{
	const isMobileUI=props.isMobileUI;

	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);

	const [headerPosts,changeHeaderPosts]=useState([]);
	const [images,changeImages]=useState([]);
	const [displayImageDisplayPortal,changeImageDisplay]=useState(false);
	const [selectedImage,changeSelectedImage]=useState();
	const [displayRecommendedImages,changeRecommendedImages]=useState();
	const [isInitializing,changeInitializingStatus]=useState(true);
	const imageComponents=[];

	useEffect(()=>{
		debugger;
		const splicedHeaderPosts=props.posts.splice(0,7);
		const splicedImages=props.posts.splice(7,props.posts.length);

		changeHeaderPosts([...splicedHeaderPosts]);
		changeImages([...splicedImages])
		changeInitializingStatus(false);

	},[]);

	const closeModal=()=>{
		changeImageDisplay(false)
	}

	const displayImageModal=(data)=>{
		changeImageDisplay(true);
		changeSelectedImage(data);
		changeRecommendedImages([]);
	}

	{/*
		const posts=useMemo(()=>{
			return(
				<React.Fragment>
					{props.posts.length>=1?
						<React.Fragment>
							<HeaderContainer>
								<HeaderOwnerAndSymposiumInformation
									headerPost={headerImage}
									displayPostTrigger={displayImageModal}
								/>
								<div id="headerImageLI" style={HeaderImageCSS} onClick={()=>displayImageModal(headerImage)}>
										<img id="headerImageLI"
											src={headerImage.imgUrl} style={{borderRadius:"5px",position:"relative",width:"100%",height:"100%"}}
										/>
										{headerImage.videoDescription!=null &&(
											<video id="videoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
												style={{position:"absolute",top:"72%",left:"0%",borderRadius:"50%",width:"90px",height:"80px",
														backgroundColor:"#151515",
														borderStyle:"solid",
														borderColor:"white",
														borderWidth:"5px"}} width="200px" height="60%">
												<source src={headerImage.videoDescription} type="video/mp4"/>
											</video>
										)}
									</div>
								<HeaderDescriptionContainer> 
									<p style={{fontSize:"20px"}}>
										<b>{headerImage.caption}</b>
									</p>
									<p id="headerImageDescription">
										{headerImage.description}
									</p>
								</HeaderDescriptionContainer>

							</HeaderContainer>

							<PostsContainer>
								{postDisplaySystem()}
								{props.endOfPostsDBIndicator==false && (
									<React.Fragment>
										{props.isLoadingReloadedPosts==true?
											<p>Loading please wait...</p>:
											<p onClick={()=>props.triggerReloadingPostsHandle("Images")} style={{color:"#3898ec",cursor:"pointer",marginLeft:"2%"}}>
												Next
											</p>
										}
									</React.Fragment>
								)}
							</PostsContainer>
						</React.Fragment>
					:<p>No posts </p>
					}
				</React.Fragment>
			)
		},[props.posts.length,props.isLoadingReloadedPosts,props.endOfPostsDBIndicator]);
	*/}

	const posts=()=>{
		return(
			<React.Fragment>
				<Header
					posts={headerPosts}
					targetDom={props.targetDom}
					isSymposiumPostUI={props.isSymposiumPostUI}
				/>
				<hr style={PostsHorizontalLineCSS}/>
				<Posts
					posts={images}
					targetDom={props.targetDom}
					isSymposiumPostUI={props.isSymposiumPostUI}
				/>
				{props.endOfPostsDBIndicator==false && (
					<React.Fragment>
						{props.isLoadingReloadedPosts==true?
							<p>Loading please wait...</p>:
							<p onClick={()=>props.triggerReloadingPostsHandle("Images")} style={{color:"#3898ec",cursor:"pointer",marginLeft:"2%"}}>
								Next
							</p>
						}
					</React.Fragment>
				)}
			</React.Fragment>	
		)
	}

	return(
		<Container>
			{displayImageDisplayPortal==false?
				null:
				<ImagePostDisplayPortal
					closeModal={closeModal}
					selectedImage={selectedImage}
					recommendedImages={displayRecommendedImages}
					targetDom={props.targetDom}
				/>
			}
			{isInitializing==false &&(
				<React.Fragment>
					{posts()}
				</React.Fragment>
			)}
		</Container>
	)
}

export{
	ImagePostsModal
};





