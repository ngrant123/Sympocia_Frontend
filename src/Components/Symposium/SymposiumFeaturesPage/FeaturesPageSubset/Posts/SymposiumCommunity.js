import React,{useContext,useState} from "react";
import styled from "styled-components";
import {PostsHeader} from "./index.js";
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Images from "./PostDisplay/Images.js";
import Videos from "./PostDisplay/Videos.js";
import RegularPosts from "./PostDisplay/RegularPosts.js";
import {CountDownTimer} from "../SideBar/SymposiumCommunity.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CommunityPostCreation from "../../FeaturesPageSet/Modals-Portals/SymposiumCommunity/CommunityPostCreation.js";
import PortalsHOC from "../../FeaturesPageSet/Modals-Portals/PortalsHOC.js";

import ImagePostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/RegularPostHomeDisplayPortal.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:"100%"
`;

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	cursor:"pointer",
	padding:"2px",
	marginRight:"5px"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%",
	height:"1px"
}

const CurrentQuestion=styled.div`
	display:flex;
	flexDirection:row;
	margin-right:5%;
	font-size:20px;

	${({currentQuestionIndex})=>
		currentQuestionIndex==0?
		`margin-left:0%;`:`margin-left:5%;`
	}
`;



const SymposiumCommunity=({featuresType})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const [currentQuestionIndex,changeCurrentQuestionIndex]=useState(0);
	const [displayCommunityPostCreation,changeDisplayCommunityPostCreation]=useState(false);
	const [displaySelectedPostPortal,changeDisplaySelectedPostPortal]=useState(false);
	const [selectedPost,changeSelectedPost]=useState();

	const {
		featuresPagePrimaryInformation:{
			headerQuestions,
			competitionEndDate,
			responses
		},
		isDesktop,
		currentSymposiumId
	}=featuresPageConsumer;



	const incrementQuestionIndex=()=>{
		let currentCounterIndex=currentQuestionIndex;
		currentCounterIndex++
		changeCurrentQuestionIndex(currentCounterIndex);
	}

	const decrementQuestionIndex=()=>{
		let currentCounterIndex=currentQuestionIndex;
		currentCounterIndex--
		changeCurrentQuestionIndex(currentCounterIndex);
	}

	const triggerDisplaySelectedPost=(selectedPostInformation)=>{
		changeSelectedPost(selectedPostInformation);
		changeDisplaySelectedPostPortal(true);
	}

	const postsDisplayFunctionality=({questionType})=>{
		debugger;
		const postProps={
			triggerDisplaySelectedPost,
			posts:responses
		}
		switch(questionType){
			case "Image":{
				return <Images {...postProps}/>
			}
			case "Video":{
				return <Videos {...postProps}/>
			}

			case "Text":{
				return <RegularPosts {...postProps}/>
			}
		}
	}

	const mobileHeaders=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",marginTop:"2%"}}>
				<p style={{fontSize:"20px"}}>
					{headerQuestions[currentQuestionIndex].question}
				</p>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					{currentQuestionIndex>0 &&(
						<div style={{...DropDownCSS,marginRight:"5%"}} onClick={()=>decrementQuestionIndex()}>
							<ArrowBackIosOutlinedIcon/>
						</div>
					)}
					{currentQuestionIndex<headerQuestions.length-1 &&(
						<div style={{...DropDownCSS,marginRight:"5%"}} onClick={()=>incrementQuestionIndex()}>
							<ArrowForwardIosOutlinedIcon/>
						</div>
					)}
					<CountDownTimer
						countDownDateMilliSeconds={competitionEndDate}
					/>
				</div>
			</div>
		)
	}

	const desktopHeaders=()=>{
		return(
			<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginTop:"2%"}}>
				{currentQuestionIndex>0 &&(
					<div style={DropDownCSS} onClick={()=>decrementQuestionIndex()}>
						<ArrowBackIosOutlinedIcon/>
					</div>
				)}

				<CurrentQuestion currentQuestionIndex={currentQuestionIndex}>
					<p>
						{headerQuestions[currentQuestionIndex].question}
					</p>
					<BorderColorIcon
						onClick={()=>changeDisplayCommunityPostCreation(true)}
						id="postCreationIcon"
						style={{fontSize:"30",color:"#C8B0F4",marginLeft:"2%",cursor:"pointer"}}
					/>
				</CurrentQuestion>

				{currentQuestionIndex<headerQuestions.length-1 &&(
					<div style={DropDownCSS} onClick={()=>incrementQuestionIndex()}>
						<ArrowForwardIosOutlinedIcon/>
					</div>
				)}
			</div>
		)
	}

	const closeModal=()=>{
		changeDisplayCommunityPostCreation(false);
	}

	const communityPostCreationModal=()=>{
		return(
			<React.Fragment>
				{displayCommunityPostCreation==true &&(
					<PortalsHOC
						closeModal={closeModal}
						component={
							<CommunityPostCreation
								closeModal={closeModal}
								symposiumId={currentSymposiumId}
								questions={headerQuestions}
								questionId={headerQuestions[currentQuestionIndex]._id}
								currentQuestionType={headerQuestions[currentQuestionIndex].questionType}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}
	const closePostDisplayModal=()=>{
		changeDisplaySelectedPostPortal(false);
	}


	const selectedPostDisplay=()=>{
		debugger;
		let postPortalComponent;
		switch(headerQuestions[currentQuestionIndex].questionType){
			case "Image":{
				postPortalComponent=<ImagePostDisplayPortal
											closeModal={closePostDisplayModal}
											selectedImage={selectedPost}
											recommendedImages={[]}
											targetDom={"symposiumFeaturesPage"}
									/>;
				break;
			}
			case "Video":{
				postPortalComponent=<VideoPostDisplayPortal
										closeModal={closePostDisplayModal}
										selectedVideo={selectedPost}
										recommendedVideos={[]}
										targetDom={"symposiumFeaturesPage"}
									/>;
				break;
			}

			case "Text":
			case "Audio":{
				postPortalComponent=<RegularPostDisplayPortal
										closeModal={closePostDisplayModal}
										selectedPost={selectedPost}
										recommendedPosts={[]}
										targetDom={"symposiumFeaturesPage"}
									/>;
				break;
			}
		}

		return(
			<React.Fragment>
				{displaySelectedPostPortal==true &&(
					<>{postPortalComponent}</>
				)}
			</React.Fragment>
		)
	}

	return(
		<Container>
			{selectedPostDisplay()}
			{communityPostCreationModal()}
			<PostsHeader
				featuresType={featuresType}
			/>
			{isDesktop==true?
				<React.Fragment>
					{desktopHeaders()}
				</React.Fragment>:
				<React.Fragment>
					{mobileHeaders()}
				</React.Fragment>
			}
			
			<hr style={HorizontalLineCSS}/>
			{postsDisplayFunctionality(headerQuestions[currentQuestionIndex])}
		</Container>
	)
}

export default SymposiumCommunity;