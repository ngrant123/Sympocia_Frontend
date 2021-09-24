import React,{useState,useContext,useEffect} from "react";
import styled from "styled-components";
import {PostsHeader} from "./index.js";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import Images from "./PostDisplay/Images.js";
import Videos from "./PostDisplay/Videos.js";
import RegularPosts from "./PostDisplay/RegularPosts.js";
import PortalsHOC from "../../FeaturesPageSet/Modals-Portals/PortalsHOC.js";
import UniversityPostCreation from "../../FeaturesPageSet/Modals-Portals/SymposiumUniversity/UniversityPostCreation.js";
import {getSymposiumUniversityPostsApi} from "../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector} from "react-redux";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ImagePostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/RegularPostHomeDisplayPortal.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:100%;

	@media screen and (max-width:650px){
		#universityResponsesDiv{
			width:90% !important;
		}
	}
`;

const PostsContainer=styled.div`
	background-color:green;
	margin-top:2%;
	width:100%;
`;

const PostTypeCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	borderColor:"#D8D8D8",
	display:"flex",
	alignItems:"center",
	flexDirection:"row",
	justifyContent:"center",
	padding:"10px",
	backgroundColor:"white",
	color:"#000000",
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer",
	marginLeft:"10%",
	padding:"2px",
	marginRight:"5px"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%",
	height:"1px"
}

const ResponsesCSS={
	backgroundColor:"#C8B0F4",
	justifyContent:"space-between",
	display:"flex",
	flexDirection:"row",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#B38AFF",
	color:"white",
	width:"40%",
	height:"40px",
	marginTop:"2%",
	cursor:"pointer"
}

const SelectedPostTypeCSS={
	display:"flex",
	alignItems:"center",
	flexDirection:"row",
	justifyContent:"center",
	padding:"1px",
	backgroundColor:"white",
	color:"#5298F8",
	borderRadius:"5px",
	minWidth:"70%",
	marginLeft:"10%"
}

const SymposiumUniversity=({featuresType})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const [currentQuestionIndex,changeCurrentQuestionIndex]=useState(0);
	const [displayUniversityPostUpload,changeUniversityUploadDisplay]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);
	const [selectedTextKnowledgeLevel,changeSelectedTextKnowledgeLevel]=useState("Beginner");
	const [displaySelectedPostPortal,changeDisplaySelectedPostPortal]=useState(false);
	const [selectedPost,changeSelectedPost]=useState();

	const {
		featuresPagePrimaryInformation:{
			headerQuestions,
			currentPostQuestionReplies
		},
		featuresPageSecondaryInformation:{
			totalPostCount
		},
		isDesktop,
		currentSymposiumId,
		updatePrimaryPosts
	}=featuresPageConsumer;
	console.log(totalPostCount);
	
	useEffect(()=>{
		fetchSymposiumUniversityPost();
	},[currentQuestionIndex,selectedTextKnowledgeLevel]);

	const postFeedTokenGenerator=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}


	const fetchSymposiumUniversityPost=async()=>{
		debugger;
		const symposiumFetchParams={
			questionId:headerQuestions[currentQuestionIndex].questionId,
            questionType:headerQuestions[currentQuestionIndex].questionType,
            questionLevel:headerQuestions[currentQuestionIndex].questionType!="Text"?null:selectedTextKnowledgeLevel,
            currentPostSessionManagmentToken:postFeedTokenGenerator(),
            ownerId:personalInformation.id
		}
		const {confirmation,data}=await getSymposiumUniversityPostsApi(symposiumFetchParams);
		if(confirmation=="Success"){
			const {message}=data;
			let currentReplies=message;
			updatePrimaryPosts(message,false);

		}else{	
			alert('Unfortunately there has been an error when retrieving these symposium posts. Please try again');
		}
	}

	const incrementQuestionIndex=()=>{
		debugger;
		let currentCounterIndex=currentQuestionIndex;
		currentCounterIndex++;
		changeCurrentQuestionIndex(currentCounterIndex);
	}

	const decrementQuestionIndex=()=>{
		let currentCounterIndex=currentQuestionIndex;
		currentCounterIndex--;
		changeCurrentQuestionIndex(currentCounterIndex);
	}

	const triggerDisplaySelectedPost=(selectedPostInformation)=>{
		changeSelectedPost(selectedPostInformation);
		changeDisplaySelectedPostPortal(true);
	}

	const postsDisplayFunctionality=()=>{
		debugger;
		const postProps={
			triggerDisplaySelectedPost,
			posts:currentPostQuestionReplies
		}
		switch(headerQuestions[currentQuestionIndex].questionType){
			case "Image":{
				return <Images {...postProps}/>
			}
			case "Video":{
				return <Videos {...postProps}/>
			}

			case "Text":
			case "Audio":{
				return <RegularPosts {...postProps}/>
			}
		}
	}

	const universityResponse=()=>{
		return(
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<div id="universityResponsesDiv" style={ResponsesCSS} onClick={()=>changeUniversityUploadDisplay(true)}>
					<div style={{backgroundColor:"#C8B0F4",display:"flex",alignItems:"center"}}>
						<p>{totalPostCount} Responses</p>
					</div>
					<div style={{backgroundColor:"#B38AFF",width:"15%",display:"flex",justifyContent:"center",alignItems:"center"}}>
						<KeyboardArrowDownIcon
							style={{fontSize:"25"}}
						/>	
					</div>
				</div>
				{headerQuestions[currentQuestionIndex].questionType=="Text" &&(
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<div class="dropdown">
							<button class="btn btn-primary dropdown-toggle" id="text"
								type="button" data-toggle="dropdown" style={PostTypeCSS}>
								<p>Text Type</p>
								<ArrowDropDownIcon
									style={{marginTop:"-10"}}
								/>
							</button>
							<ul class="dropdown-menu" style={{padding:"5px",height:"250px",overflowY:"auto",overflowX:"hidden"}}>
								<li style={{listStyle:"none",cursor:"pointer"}}
									onClick={()=>changeSelectedTextKnowledgeLevel("Beginner")}>
									Beginner
								</li>
								<hr/>

								<li style={{listStyle:"none",cursor:"pointer"}}
									onClick={()=>changeSelectedTextKnowledgeLevel("Intermediate")}>
									Intermediate
								</li>
								<hr/>

								<li style={{listStyle:"none",cursor:"pointer"}}
									onClick={()=>changeSelectedTextKnowledgeLevel("Advanced")}>
									Advanced
								</li>
								<hr/>
							</ul>
					  	</div>
					  	<div style={SelectedPostTypeCSS}>
					  		<p>{selectedTextKnowledgeLevel}</p>
					  		<HighlightOffIcon
					  			style={{marginLeft:"5%",marginTop:"-5px"}}
					  		/>
					  	</div>
					</div>
				)}
			</div>
		)
	}

	const desktopHeaders=()=>{
		return(
			<React.Fragment>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginTop:"2%"}}>
					<p style={{fontSize:"20px"}}>{headerQuestions[currentQuestionIndex].question}</p>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>

						{currentQuestionIndex>0 &&(
							<div style={DropDownCSS} onClick={()=>decrementQuestionIndex()}>
								<ArrowBackIosOutlinedIcon/>
							</div>
						)}

						{currentQuestionIndex<headerQuestions.length-1 &&(
							<div style={DropDownCSS} onClick={()=>incrementQuestionIndex()}>
								<ArrowForwardIosOutlinedIcon/>
							</div>
						)}
					</div>
				</div>

				{universityResponse()}
			</React.Fragment>
		)
	}

	const mobileHeaders=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",marginTop:"2%"}}>
				<p style={{fontSize:"20px"}}>{headerQuestions[currentQuestionIndex].question}</p>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					{currentQuestionIndex>0 &&(
						<div style={{...DropDownCSS,marginLeft:"0%",marginRight:"5%"}} 
							onClick={()=>decrementQuestionIndex()}>
							<ArrowBackIosOutlinedIcon/>
						</div>
					)}
					{currentQuestionIndex<headerQuestions.length-1 &&(
						<div style={{...DropDownCSS,marginRight:"5%"}} onClick={()=>incrementQuestionIndex()}>
							<ArrowForwardIosOutlinedIcon/>
						</div>
					)}

					{universityResponse()}
				</div>
			</div>
		)
	}

	const closeModal=()=>{
		changeUniversityUploadDisplay(false);
	}

	const UnversityPostUploadDisplay=()=>{
		return(
			<React.Fragment>
				{displayUniversityPostUpload==true &&(
					<PortalsHOC
						closeModal={closeModal}
						component={
							<UniversityPostCreation
								closeModal={closeModal}
								selectedUploadType={headerQuestions[currentQuestionIndex].questionType}
								symposiumId={currentSymposiumId}
								questionId={headerQuestions[currentQuestionIndex].questionId}
								selectedTextKnowledgeLevel={selectedTextKnowledgeLevel}
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
			<UnversityPostUploadDisplay/>
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
			{postsDisplayFunctionality()}
		</Container>
	)
}

export default SymposiumUniversity;