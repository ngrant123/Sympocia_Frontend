import React,{useState,useMemo} from "react";
import styled from "styled-components";
import ImagePostDisplayPortal from "../../../ExplorePageSet/Modals-Portals/ImageHomeDisplayPortal.js";
import {useSelector,useDispatch} from "react-redux";

import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {addRecruit} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

import {removeRecruitProfileIsFollowing} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {
	ConstructSuggestedSymposium,
	displayPersonalIndustryFeed
} from "../ConstructSuggestedSymposium.js";
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

const DisplayRecruitButton=({post,previousProps,personalInformationRedux})=>{
	const {isUserFollowing}=post;
	const postOwnerId=post.owner._id;
	const personalId=previousProps._id;
	const dispatch=useDispatch();
	const [isUserFollowingProfile,changeDisplayRecruitButton]=useState(isUserFollowing);

	const unRecruitButton=async({previousProps,post,changeDisplayRecruitButton,isAccessTokenUpdated,updatedAccessToken})=>{
		const {_id}=previousProps;

		const {confirmation,data}=await removeRecruitProfileIsFollowing({
			personalProfileId:_id,
			targetProfile:post.owner._id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
			personalInformationRedux.accessToken
		})
		if(confirmation=="Success"){
			changeDisplayRecruitButton(false);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle( 
					personalInformationRedux.refreshToken,
					_id,
					unRecruitButton,
					dispatch,
					{
						previousProps,
						post,
						changeDisplayRecruitButton				
					},
					false
				);
			}else{
				alert('Unfortunately there has been an error adding this recruit. Please try again');
			}
			alert('Unfortunately something has gone wrong when unrecruiting this person. Please try again');
		}
	}

	const handleRecruitButton=async({previousProps,post,changeDisplayRecruitButton,isAccessTokenUpdated,updatedAccessToken})=>{
		const {_id,confettiAnimation}=previousProps;
		const {confirmation,data}=await addRecruit(
												_id,
												post.owner._id,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformationRedux.accessToken
											);
		if(confirmation=="Success"){
			const {statusCode}=data;
			if(statusCode==300){
				alert('You have reached the limit of 100 recruits. Please delete some to recruit this person');
			}else{
				confettiAnimation();
				changeDisplayRecruitButton(true);
			}
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformationRedux.refreshToken,
						_id,
						handleRecruitButton,
						dispatch,
						{
							previousProps,
							post,
							changeDisplayRecruitButton
						},
						false
					);
			}else{
				alert('Unfortunately there has been an error adding this recruit. Please try again');
			}
		}
	} 

	return <>
				{(personalId!=postOwnerId) &&(
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						{isUserFollowingProfile==true?
							<li onClick={()=>unRecruitButton({
												previousProps,
												post,
												changeDisplayRecruitButton,
												isAccessTokenUpdated:false,
												dispatch,
												personalInformationRedux
											})} 
								style={RecruitButtonLabelCSS}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" 
									width="25" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none"
									stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <path d="M5 12l5 5l10 -10" />
								</svg>
							</li>:
							<li onClick={()=>handleRecruitButton({
												previousProps,
												post,
												changeDisplayRecruitButton,
												isAccessTokenUpdated:false,
												dispatch,
												personalInformationRedux
											})} style={RecruitButtonLabelCSS}>
								+ 
							</li>
						}
					</a>
				)}
			</>
}



const ImagePostsModal=(props)=>{
	const headerImage=props.posts[0];
	const images=props.posts.slice(1,props.posts.length);
	const isMobileUI=props.isMobileUI;

	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);


	const [displayImageDisplayPortal,changeImageDisplay]=useState(false);
	const [selectedImage,changeSelectedImage]=useState();
	const [displayRecommendedImages,changeRecommendedImages]=useState();

	const closeModal=()=>{
		changeImageDisplay(false)
	}

	const displayImageModal=(data)=>{
		changeImageDisplay(true);
		changeSelectedImage(data);
		changeRecommendedImages(images);
	}
	const smallImageComponent=(data)=>{
		return(
			<React.Fragment>
			{data.owner==null?
				<ConstructSuggestedSymposium
					personalInformation={personalInformationRedux}
					previousProps={props}
					currentHeight={"30%"}
				/>
				:<SmallPostContainer isSymposiumPostUI={props.isSymposiumPostUI}>
					<ExploreImageDisplay
						imageInformation={data}
						targetDom={props.targetDom}
					/>
				</SmallPostContainer>
			}	
		</React.Fragment>
		)
	}

	const postDisplaySystem=()=>{
		const components=[];
		let counter=0;

		while(counter<images.length){
			if(counter%3==0 && counter>0 && isMobileUI==false){
				const horizontalLine=<hr style={PostsHorizontalLineCSS}/>;
				components.push(horizontalLine);
			}
			const component=smallImageComponent(images[counter]);
			components.push(component)
			counter++;
		}
		return(
			<React.Fragment>
				{components.map(data=>
					<>{data}</>
				)}
			</React.Fragment>
		)
	}

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

						<hr id="horizontalSeperator" style={HorizontalLineCSS}/>
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


	return(
		<Container>
			{posts}
			{displayImageDisplayPortal==false?
				null:
				<ImagePostDisplayPortal
					closeModal={closeModal}
					selectedImage={selectedImage}
					recommendedImages={displayRecommendedImages}
					targetDom={props.targetDom}
				/>
			}
		</Container>
	)
}

export{
	ImagePostsModal,
	DisplayRecruitButton
};





