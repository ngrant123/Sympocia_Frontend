import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {GeneralNavBar} from "../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import CreationBeaconPortal from "./Modals-Portals/Beacons/CreateBeaconPortal.js";
import SymposiumCreationPortal from "./Modals-Portals/SymposiumCommunity/CreationModal.js";

import {FeaturePosts} from "../FeaturesPageSubset/Posts/index.js";
import SideBar from "../FeaturesPageSubset/SideBar/index.js";
import SearchBar from "../FeaturesPageSubset/SearchBar.js";
import {FeaturesProvider} from "./FeaturesPageContext.js";
import {useSelector} from "react-redux";
import PortalHoc from "./Modals-Portals/PortalsHOC.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import BeaconsTagsCreationModal from "./Modals-Portals/Beacons/TagsCreationModal.js";
import TagExtendedInformationModal from "./Modals-Portals/Beacons/TagInformationExtended/index.js";
import{
	getSymposiumName,
	isOligarch,
	getBeaconsFeaturePage,
	getBeacons,
	getSymposiumUniversityPage
} from "../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";

const Container=styled.div`
	width:100%;
	height:100%;
	background-color:white;
	display:flex;
	flex-direction:column;
`;

const FeaturesContainer=styled.div`
	position:relative;
	display:flex;
	flex-direction:row;
	top:15%;
	width:100%;
	padding:10px;

	@media screen and (max-width:1370px){
		top:5%;
		flex-direction:column !important;
		#searchBarAndPosts{
			width:100% !important;
			margin-left:2% !important;
		}
		#desktopSearchBar{
			display:none !important;
		}
	}
`;
const CreatePostButton=styled.div`	
	width:70px;
	height:70px;
	border-radius:50%;
	background-color:white;
	border-color:white;
	border-style:solid;
	padding:15px;
	border-width:5px;
	animation: glowing 1300ms infinite;
	margin-left:280px;
	display:none;

	margin-top:530px;
	position:fixed;
	z-index:10;


	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  	}

  	@media screen and (min-width:2500px){
  		width:120px;
		height:120px;
		#postCreationIcon{
			font-size:50px !important;
			margin-left:15%; 
			margin-top:15%;
		}
  	}
  	@media screen and (max-width:1200px){
  		display:block;
		width:60px !important;
		height:60px !important;
		margin-left:85%;
		margin-top:120%;
    }
    @media screen and (max-width:1080px){
			width:50px !important;
			height:50px !important;
    }
     @media screen and (max-width:1080px){
			width:70px !important;
			height:70px !important;
    }

    @media screen and (max-width:650px){
    	margin-top:530px;
    	margin-left:280px;
    }
`;


const SYMPOSIUM_featuresPagePrimaryInformation={
			headerQuestions:[
			{
				question:"What’s something new that you learned about photography?",
				questionType:"Images",
				responses:[
					{},
					{},
					{},
					{},
					{},
					{}
				]		
			},
			{
				question:"What’s something n2?",
				questionType:"Videos",
				responses:[
					{},
					{},
					{}
				]
			},
			{
				question:"Whaoine felma lmao?",
				questionType:"Regular",
				responses:[
					{}
				]
			}
		],
		symposiumName:"Engineering"
}

const SYMPOSIUM_featuresPageSecondaryInformation={
			specialists:[
			{

			},
			{

			},
			{

			}
		],
		resources:[
			{

			},
			{

			},
			{

			}
		]
}

const COMMUNITY_featuresPagePrimaryInformation={
			headerQuestions:[
				{
					question:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					questionType:"Images",
					responses:[
						{},
						{},
						{},
						{},
						{},
						{}
					]		
				},
				{
					question:"What’s community omething n2?",
					questionType:"Videos",
					responses:[
						{},
						{},
						{}
					]
				},
				{
					question:"community Whaoine felma lmao?",
					questionType:"Regular",
					responses:[
						{}
					]
				}
			],
			competitionEndDate:1631246400000,
			symposiumName:"Engineering"
}


const COMMUNITY_featuresPageSecondaryInformation={
			submissionCount:55,
			currentQuestionsStandings:[
				{
					question:"What do you think about pizza?",
					postType:"Images",
					votes:"23 votes"
				},
				{
					question:"What do you think about pizza1?",
					postType:"Videos",
					votes:"2 votes"
				}
			]
		}

const SymposiumFeatures=(props)=>{
	const {history}=props;
	const [featuresType,changeFeaturesType]=useState();
	const [featuresPagePrimaryInformation,changePrimaryInformation]=useState();
	const [featuresPageSecondaryInformation,changeSecondaryInformation]=useState();
	const [loadingStatus,changeLoadingStatus]=useState(true);
	const [displayBeaconCreation,changeDisplayBeaconCreation]=useState(false);
	const [currentCreationCriteria,changeCurrentCreationCriteria]=useState();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [displaySymposiumCreationModal,changeSymposiumDisplayCreationModal]=useState(false);
	const [currentPostManagmentToken,changePostManagmentToken]=useState();
	const [displayBeaconsTagCreationModal,changeDisplayBeaconTagsModal]=useState(false);
	const [displayExtendedTagsInformationModal,changeDisplayExtendedTagsMOdal]=useState(false);
	const [isOligarch,changeOligarchStatus]=useState(false);
	const [currentPostType,changeCurrentPostType]=useState("Images");
	const [isLoadingPosts,changeIsLoadingPostsStatus]=useState(false);
	const [loadingNewPostsIndicator,changeLoadingNewPostsIndicator]=useState(false);
	const [endOfPostIndicator,changeEndOfPostsIndicator]=useState(false);
	const [currentTagsSelection,changeCurrentTagSelection]=useState([]);


	const [currentSymposiumName,changeSymposiumName]=useState();
	const [currentSymposiumId,changeSymposiumId]=useState(props.match.params.symposiumId);

	const [isDesktop,changeIsDesktopStatus]=useState(false);


	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeIsDesktopStatus(false);
		}else{
			changeIsDesktopStatus(true);
		}
	}


	useEffect(()=>{
		const fetchInitialData=async()=>{
			debugger;
			const {confirmation,data}=await getSymposiumName(currentSymposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				changeSymposiumName(message);
				changeLoadingStatus(true);

				fetchData("Beacons")
				triggerUIChange();

			}else{
				alert('Unfortunately there has been an error retrieving this symposiums features page');
			}
		}
		fetchInitialData();
	},[]);

	const postFeedTokenGenerator=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const retrieveBeaconsFeaturePage=async(featuresPageGetParams)=>{
		debugger;
		const {confirmation,data}=await getBeaconsFeaturePage(featuresPageGetParams);

		if(confirmation=="Success"){
			const {message}=data;
			const {
				beacons,
				tags,
				progressBar
			}=message;

			const beaconsPrimaryInformation={
				posts:beacons,
				symposiumName:currentSymposiumName
			}
			changePrimaryInformation(beaconsPrimaryInformation);

			const beaconsSecondaryInformation={
				progressBarInformation:progressBar,
				tags
			}
			changeSecondaryInformation(beaconsSecondaryInformation);
		}else{
			alert('Unfortunately there was an error when retrieving the beacons page');
		}
	}

	const retrieveSymposiumUniversityPage=async(featuresPageGetParams)=>{
		debugger;
		const {confirmation,data}=await getSymposiumUniversityPage(featuresPageGetParams);

		if(confirmation=="Success"){
			const {message}=data;
			const {
				specialists,
				resources,
				posts
			}=message;

			const {
				questions,
				currentPostQuestionReplies
			}=posts;

			const symposiumUniversityPrimaryInformation={
				headerQuestions:questions,
				currentPostQuestionReplies
			}
			changePrimaryInformation(symposiumUniversityPrimaryInformation);

			const symposiumUniversitySecondaryInformation={
				specialists,
				resources
			}
			changeSecondaryInformation(symposiumUniversitySecondaryInformation);
		}else{
			alert('Unfortunately there was an error retrieving the symposium university');
		}
	}


	const fetchData=async(featurePageType,isNewSymposiumRequest,newSymposiumId)=>{

		if(isNewSymposiumRequest==true){
			changeIsLoadingPostsStatus(true);
		}else{
			changeLoadingStatus(true);
		}

		const {id}=personalInformation;


		let token=currentPostManagmentToken;
		if(featuresType!=featurePageType || isNewSymposiumRequest==true){
			token=postFeedTokenGenerator();
			changePostManagmentToken(token);
		}

		const featuresPageGetParams={
			symposiumId:isNewSymposiumRequest==true?newSymposiumId:currentSymposiumId,
	        postType:currentPostType,
	        currentPostSessionManagment:token,
	        ownerId:id
		}
		debugger;
		changeFeaturesType(featurePageType);
		switch(featurePageType){
			case "Beacons":{
				await retrieveBeaconsFeaturePage(featuresPageGetParams);
				break;
			}

			case "University":{
				await retrieveSymposiumUniversityPage(featuresPageGetParams);
				break;
			}

			case "Community":{
				changePrimaryInformation({...COMMUNITY_featuresPagePrimaryInformation});
				changeSecondaryInformation({...COMMUNITY_featuresPageSecondaryInformation});
				break;
			}
		}
		if(isNewSymposiumRequest==true){
			changeIsLoadingPostsStatus(false);
		}else{
			changeLoadingStatus(false);
		}
		
	}

	const fetchBeaconPosts=async({postType,tags,isNextPostsRequest})=>{
		const {id}=personalInformation;
		debugger;
		let token=currentPostManagmentToken;
		if(currentPostType!=postType || isNextPostsRequest==false){
			token=postFeedTokenGenerator();
			changePostManagmentToken(token);
			if(currentPostType!=postType){
				changeEndOfPostsIndicator(false);
				changeLoadingNewPostsIndicator(true);
			}
		}


		const featuresPageGetParams={
			symposiumId:currentSymposiumId,
	        postType,
	        currentPostSessionManagment:token,
	        ownerId:id,
	        tags:tags==null?((currentTagsSelection==null || currentTagsSelection.length==0)?null:currentTagsSelection):tags
		}
		const {confirmation,data}=await getBeacons(featuresPageGetParams);
		if(confirmation=="Success"){
			const {message}=data;
			if(message.length==0){
				changeEndOfPostsIndicator(true);
			}else{
				updatePrimaryPosts(message,isNextPostsRequest);
			}
		}else{
			alert('Unfortunately there has been an error retrieving these beacon posts. Please try again');
		}

		if(tags!=null){
			changeCurrentTagSelection(tags);
			if(tags.length==0 && endOfPostIndicator==true && data.message.length>0){
				changeEndOfPostsIndicator(false);
			}else if(tags.length>0 && data.message.length>0){
				changeEndOfPostsIndicator();
			}
		}


		changeCurrentPostType(postType);
		changeLoadingNewPostsIndicator(false);
	}

	const fetchPosts=async(featurePostType,postRetrievalInformation)=>{
		changeIsLoadingPostsStatus(true);
		switch(featurePostType){
			case "Beacons":{
				await fetchBeaconPosts(postRetrievalInformation)
				break;
			}
		}
		changeIsLoadingPostsStatus(false);
	}

	const updateSymposiumHandle=(newSymposiumName,newSymposiumId)=>{
		changeSymposiumName(newSymposiumName)
		changeSymposiumId(newSymposiumId);
		fetchData(featuresType,true,newSymposiumId);
	}

	const updateSymposiumFeatureType=(selectedFeaturesType)=>{
		fetchData(selectedFeaturesType);
	}

	const closeFeaturesPageCreationModal=()=>{
		changeDisplayBeaconCreation(false);
		changeSymposiumDisplayCreationModal(false);
		changeDisplayBeaconTagsModal(false);
		changeDisplayExtendedTagsMOdal(false);
	}


	const updateCurrentBeaconPosts=(beaconPostType,beacon)=>{
		debugger;
		let currentBeaconPrimaryInformation=featuresPagePrimaryInformation;
		if(beaconPostType==currentPostType){
			const {posts}=currentBeaconPrimaryInformation;
			posts.splice(0,0,beacon);
			currentBeaconPrimaryInformation={
				...currentBeaconPrimaryInformation,
				posts
			}
			changePrimaryInformation(currentBeaconPrimaryInformation);
		}
		closeFeaturesPageCreationModal();
	}

	const updateSymposiumCommunityQuestionStandings=(userSubmittedQuestion)=>{
		let communitySecondaryInformation=featuresPageSecondaryInformation;
		let {
			currentQuestionsStandings,
			submissionCount
		}=communitySecondaryInformation;

		currentQuestionsStandings.splice(0,0,userSubmittedQuestion);
		submissionCount+=1;

		communitySecondaryInformation={
			...communitySecondaryInformation,
			currentQuestionsStandings,
			submissionCount
		}
		changeSecondaryInformation(communitySecondaryInformation);
	}

	const beaconCreationModals=()=>{
		return(
			<React.Fragment>
				{displayBeaconCreation==true &&(
					<PortalHoc
						closeModal={closeFeaturesPageCreationModal}
						component={
							<CreationBeaconPortal
								preSelectedPostType={currentCreationCriteria.postType}
								closeCreationModal={closeFeaturesPageCreationModal}
								updateBeaconPosts={updateCurrentBeaconPosts}
								symposiumId={props.match.params.symposiumId}
								ownerId={personalInformation.id}
								isDesktop={isDesktop}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const symposiumCommunityCreationModal=()=>{
		return(
			<React.Fragment>
				{displaySymposiumCreationModal==true &&(
					<PortalHoc
						closeModal={closeFeaturesPageCreationModal}
						component={
							<SymposiumCreationPortal
								closeModal={closeFeaturesPageCreationModal}
								updateStandings={updateSymposiumCommunityQuestionStandings}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const mobileCreationPostButton=()=>{
		return(
			<CreatePostButton>
				<BorderColorIcon
					id="postCreationIcon"
					style={{fontSize:"30",color:"#C8B0F4"}}
				/>
			</CreatePostButton>
		)
	}



















	const insertTagIntoQueue=(newlyCreatedTag)=>{
		let secondaryInformation=featuresPageSecondaryInformation;
		const currentTagList=secondaryInformation.tags.symposiumTags;
		currentTagList.splice(0,0,newlyCreatedTag);

		secondaryInformation={
			...secondaryInformation,
			tags:{
				...secondaryInformation.tags,
				symposiumTags:currentTagList
			}
		}

		changeSecondaryInformation(secondaryInformation);
	}


	const editTagHandle=(editedTag)=>{
		let secondaryInformation=featuresPageSecondaryInformation;
		const currentTagList=secondaryInformation.tags.symposiumTags;
		for(var i=0;i<currentTagList.length;i++){
			if(currentTagList[i]._id==editedTag._id){
				currentTagList[i]=editedTag;
				break;
			}
		}

		secondaryInformation={
			...secondaryInformation,
			tags:{
				...secondaryInformation.tags,
				symposiumTags:currentTagList
			}
		}

		changeSecondaryInformation(secondaryInformation);
	}

	const deleteTagHandle=(idTag)=>{
		debugger;
		let secondaryInformation=featuresPageSecondaryInformation;
		const currentTagList=secondaryInformation.tags.symposiumTags;
		for(var i=0;i<currentTagList.length;i++){
			if(currentTagList[i]._id==idTag){
				currentTagList.splice(i,1);
				break;
			}
		}
		secondaryInformation={
			...secondaryInformation,
			tags:{
				...secondaryInformation.tags,
				symposiumTags:currentTagList
			}
		}

		changeSecondaryInformation(secondaryInformation);
	}












	const beaconsTagCreationModal=()=>{
		return(
			<React.Fragment>
				{displayBeaconsTagCreationModal==true &&(
					<PortalHoc
						closeModal={closeFeaturesPageCreationModal}
						component={
							<BeaconsTagsCreationModal
								closeModal={closeFeaturesPageCreationModal}
								symposiumId={currentSymposiumId}
								ownerId={personalInformation.id}
								insertTagIntoQueue={insertTagIntoQueue}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const tagExtendedInformationModal=()=>{
		return(
			<React.Fragment>
				{displayExtendedTagsInformationModal==true &&(
					<PortalHoc
						closeModal={closeFeaturesPageCreationModal}
						component={
							<TagExtendedInformationModal
								closeModal={closeFeaturesPageCreationModal}
								symposiumId={currentSymposiumId}
								ownerId={personalInformation.id}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}


	const updatePrimaryPosts=(updatedPosts,isNextPostsRequest)=>{
		debugger;
		switch(featuresType){
			case "Beacons":{
				let currentBeaconPrimaryInformation=featuresPagePrimaryInformation;
				let currentPosts=currentBeaconPrimaryInformation.posts;
				let newUpdatedPosts;
				if(isNextPostsRequest==false){
					newUpdatedPosts=updatedPosts;
				}else{
					newUpdatedPosts=currentPosts.concat(updatedPosts);
				}
			
				currentBeaconPrimaryInformation={
					...currentBeaconPrimaryInformation,
					posts:newUpdatedPosts
				}
				changePrimaryInformation(currentBeaconPrimaryInformation);
				break;
			}

			case "University":{
				break;
			}

			case "Community":{
				break;
			}
		}
	}

	return(
		<FeaturesProvider
			value={{
				featuresPageSecondaryInformation,
				featuresPagePrimaryInformation,
				featuresType,
				currentSymposiumId,
				isOligarch,
				fetchPosts,
				currentPostType,
				loadingNewPostsIndicator,
				endOfPostIndicator,
				isDesktop,
				triggerCurrentSymposiumChange:(seletedSymposium,newSymposiumId)=>{
					updateSymposiumHandle(seletedSymposium,newSymposiumId);
				},
				triggerFeaturesTypeChange:(requestedSymposiumFeatureType)=>{
					updateSymposiumFeatureType(requestedSymposiumFeatureType);
				},
				triggerBeaconTagsCreationDisplay:()=>{
					changeDisplayBeaconTagsModal(true);
				},
				triggerDisplayExtendedTagsModal:()=>{
					changeDisplayExtendedTagsMOdal(true);
				},
				editTag:(editedTag)=>{
					editTagHandle(editedTag);
				},
				deleteTag:(tagId)=>{
					deleteTagHandle(tagId);
				},
				updatePrimaryPosts:(symposiumFeaturesPageType,updatedPosts)=>{
					updatePrimaryPosts(symposiumFeaturesPageType,updatedPosts);
				},
				updateSecondaryInformation:(updatedSecondaryInformation)=>{
					changeSecondaryInformation(updatedSecondaryInformation);
				},
				displayCreationModal:(creationCriteria)=>{
					debugger;
					console.log(creationCriteria);
					console.log("Display Toggled");
					console.log(featuresType);
					switch(featuresType){
						case "Beacons":{
							changeCurrentCreationCriteria(creationCriteria)
							changeDisplayBeaconCreation(true);
							break;
						}

						case "University":{
							break;
						}

						case "Community":{
							changeSymposiumDisplayCreationModal(true);
							break;
						}
					}
				}
			}}
		>
			<Container id="symposiumFeaturesPage">

				{mobileCreationPostButton()}
				{beaconCreationModals()}
				{symposiumCommunityCreationModal()}
				{beaconsTagCreationModal()}
				{tagExtendedInformationModal()}

				<GeneralNavBar
					page={"SymposiumFeatures"}
					routerHistory={props.history}
					targetDom={"symposiumFeaturesPage"}
				/>
				<FeaturesContainer>
					{loadingStatus==true?
						<p>Loading...</p>:
						<React.Fragment>
							<SideBar
								id="desktopSideBar"
								featuresType={featuresType}
								symposiumName={currentSymposiumName}
							/>
							<div id="searchBarAndPosts" 
								style={{display:"flex",flexDirection:"column",marginLeft:"30%",width:"65%"}}>
								<div id="desktopSearchBar">
									<SearchBar
										featuresType={featuresType}
									/>
								</div>
								<FeaturePosts
									featuresType={featuresType}
									isLoading={isLoadingPosts}
								/>
							</div>
						</React.Fragment>
					}
				</FeaturesContainer>
			</Container>
		</FeaturesProvider>
	)
}

export default SymposiumFeatures;