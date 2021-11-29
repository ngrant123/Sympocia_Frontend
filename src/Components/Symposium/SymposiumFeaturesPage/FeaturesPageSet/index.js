import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {GeneralNavBar} from "../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import SymposiumCommunityCreationPortal from "./Modals-Portals/SymposiumCommunity/QuestionStandings/CreationModal.js";

import {FeaturePosts} from "../FeaturesPageSubset/Posts/index.js";
import SideBar from "../FeaturesPageSubset/SideBar/index.js";
import SearchBar from "../FeaturesPageSubset/SearchBar.js";
import {FeaturesProvider} from "./FeaturesPageContext.js";
import {useSelector} from "react-redux";
import PortalHoc from "./Modals-Portals/PortalsHOC.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import BeaconsTagsCreationModal from "./Modals-Portals/Beacons/TagsCreationModal.js";
import TagExtendedInformationModal from "./Modals-Portals/Beacons/TagInformationExtended/index.js";
import {signUpGuestUser} from "../../../../Actions/Redux/Actions/PersonalProfile.js";
import{
	getSymposiumName,
	isOligarch,
	getBeaconsFeaturePage,
	getBeacons,
	getSymposiumUniversityPage,
	getCommunityFeaturesPage,
	retrieveCommunityPosts
} from "../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import MobileCreationButton from "./MobileUI/Creation.js";
import {useDispatch} from "react-redux";
import {generateAirPlane} from "../../../../Actions/Requests/AirPlaneRequests/AirPlanePostRequest.js"

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

	@media screen and (min-width:1920px){
		top:10%;
    }

	@media screen and (max-width:1370px){
		top:5%;
		flex-direction:column !important;
		#searchBarAndPosts{
			width:95% !important;
			margin-left:2% !important;
		}
		#desktopSearchBar{
			display:none !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:20%;
	}

	@media screen and (max-width:600px) and (max-height:350px) and (orientation: landscape) {
		top:-15%;
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


const SymposiumFeatures=(props)=>{
	const {history}=props;
	const dispatch=useDispatch();

	const [featuresType,changeFeaturesType]=useState();
	const [featuresPagePrimaryInformation,changePrimaryInformation]=useState();
	const [featuresPageSecondaryInformation,changeSecondaryInformation]=useState();
	const [loadingStatus,changeLoadingStatus]=useState(true);
	const [currentCreationCriteria,changeCurrentCreationCriteria]=useState();
	const personalInformation=useSelector(state=>state.personalInformation);

	const isGuestProfile=(personalInformation.id=="0" || personalInformation.isGuestProfile==true)==true?true:false;

	const [currentPostManagmentToken,changePostManagmentToken]=useState();
	const [displayBeaconsTagCreationModal,changeDisplayBeaconTagsModal]=useState(false);
	const [displayExtendedTagsInformationModal,changeDisplayExtendedTagsMOdal]=useState(false);
	const [isOligarchStatus,changeOligarchStatus]=useState(false);
	const [currentPostType,changeCurrentPostType]=useState("Images");
	const [isLoadingPosts,changeIsLoadingPostsStatus]=useState(false);
	const [loadingNewPostsIndicator,changeLoadingNewPostsIndicator]=useState(false);
	const [endOfPostIndicator,changeEndOfPostsIndicator]=useState(false);
	const [currentTagsSelection,changeCurrentTagSelection]=useState([]);
	const [currentBeaconSelectedPostType,changeBeaconSelectedPostType]=useState();
	const [componentMountedStatus,changeComponentMountedStatus]=useState(false);


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

	const retrieveOligarchStatus=async({isAccessTokenUpdated,updatedAccessToken,symposiumName})=>{
		const {confirmation,data}=await isOligarch(
										personalInformation.id,
										symposiumName,
										isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken
								);
		if(confirmation=="Success"){
			const {message}=data;
			changeOligarchStatus(message);
		}
	}


	useEffect(()=>{
		const fetchInitialData=async()=>{
			if(personalInformation.id=="0"){
				dispatch(signUpGuestUser());
			}
			const {confirmation,data}=await getSymposiumName(currentSymposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				changeSymposiumName(message);
				changeLoadingStatus(true);

				fetchData("Beacons")
				retrieveOligarchStatus({symposiumName:message});
				changeComponentMountedStatus(true);
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
			changeEndOfPostsIndicator(false);
		}else{
			alert('Unfortunately there was an error when retrieving the beacons page');
		}
	}

	const retrieveSymposiumUniversityPage=async(featuresPageGetParams)=>{
		
		const {confirmation,data}=await getSymposiumUniversityPage(featuresPageGetParams);

		if(confirmation=="Success"){
			const {message}=data;
			const {
				specialists,
				resources,
				posts
			}=message;

			if(posts==null){
				fetchData("Beacons",false,currentSymposiumId);
			}else{
				const {
					questions,
					currentPostQuestionReplies,
					totalPostCount
				}=posts;

				const symposiumUniversityPrimaryInformation={
					headerQuestions:questions,
					currentIndex:0,
					selectedTextKnowledgeLevel:"Beginner",
					currentPostQuestionReplies
				}
				changePrimaryInformation(symposiumUniversityPrimaryInformation);

				const symposiumUniversitySecondaryInformation={
					specialists,
					resources,
					totalPostCount
				}
				changeSecondaryInformation(symposiumUniversitySecondaryInformation);
			}

		}else{
			alert('Unfortunately there was an error retrieving the symposium university');
		}
	}


	const retrieveSymposiumCommunity=async(featuresPageGetParams)=>{
		const {confirmation,data}=await getCommunityFeaturesPage(featuresPageGetParams);
		if(confirmation=="Success"){
			const {message}=data;
			const {
				competitionEndDate,
				questions,
				responses,
				questionStandings,
				submissionCount
			}=message

			const symposiumCommunityPrimaryInformation={
				headerQuestions:questions,
				responses,
				currentIndex:0,
				competitionEndDate
			}
			changePrimaryInformation(symposiumCommunityPrimaryInformation);

			const symposiumCommunitySecondaryInformation={
				submissionCount,
				currentQuestionsStandings:questionStandings
			}
			changeSecondaryInformation(symposiumCommunitySecondaryInformation);

		}else{
			alert('Unfortunately there was an error retrieving the symposium community');
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
				await retrieveSymposiumCommunity(featuresPageGetParams);
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
		changeBeaconSelectedPostType(postType);
		
		let token=currentPostManagmentToken;
		if(currentPostType!=postType || isNextPostsRequest==false){
			token=postFeedTokenGenerator();
			changePostManagmentToken(token);
			if(currentPostType!=postType){
				changeEndOfPostsIndicator(false);
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
				if(isNextPostsRequest==false){
					updatePrimaryPosts([],isNextPostsRequest);
				}
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

		if(isNextPostsRequest==false){
			changeEndOfPostsIndicator(false);
		}


		changeCurrentPostType(postType);
	}

	const fetchCommunityPosts=async({currentQuestionId,postType,isNextPostsRequest})=>{
		
		let token=currentPostManagmentToken;
		if(isNextPostsRequest==false){
			token=postFeedTokenGenerator();
			changePostManagmentToken(token);
		}

		const communityGetParams={
			symposiumId:currentSymposiumId,
            parentQuestionId:currentQuestionId,
            ownerId:personalInformation.id,
            currentPostManagmentToken,
            postType
		}

		const {confirmation,data}=await retrieveCommunityPosts(communityGetParams);
		if(confirmation=="Success"){
			const {message}=data;
			if(message.length==0){
				if(isNextPostsRequest==false){
					updatePrimaryPosts([],false);
				}
				changeEndOfPostsIndicator(true);
			}else{
				updatePrimaryPosts(message,isNextPostsRequest);
			}
		}else{
			alert('Unfortunately there has been an error retrieving these community posts. Please try again');
		}
	}

	const fetchPosts=async(featurePostType,postRetrievalInformation)=>{
		
		if(postRetrievalInformation.isNextPostsRequest==false){
			changeLoadingNewPostsIndicator(true);
		}else{
			changeIsLoadingPostsStatus(true);
		}
		switch(featurePostType){
			case "Beacons":{
				await fetchBeaconPosts(postRetrievalInformation)
				break;
			}

			case "Community":{
				await fetchCommunityPosts(postRetrievalInformation);
				break;
			}
		}
		if(postRetrievalInformation.isNextPostsRequest==false){
			changeLoadingNewPostsIndicator(false);
		}else{
			changeIsLoadingPostsStatus(false);
		}
	}

	const updateSymposiumHandle=(newSymposiumName,newSymposiumId)=>{
		changeSymposiumName(newSymposiumName)
		changeSymposiumId(newSymposiumId);
		retrieveOligarchStatus({symposiumName:newSymposiumName});
		fetchData(featuresType,true,newSymposiumId);
	}

	const updateSymposiumFeatureType=(selectedFeaturesType)=>{
		fetchData(selectedFeaturesType);
	}

	const closeFeaturesPageCreationModal=()=>{
		changeDisplayBeaconTagsModal(false);
		changeDisplayExtendedTagsMOdal(false);
	}


	const updateCurrentBeaconPosts=(beaconPostType,beacon)=>{
		
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

	const mobileCreationPostButton=()=>{
		return(
			<React.Fragment>
				{isDesktop==false &&(
					<MobileCreationButton
						featurePageType={featuresType}
						isGuestProfile={isGuestProfile}
					/>
				)}
			</React.Fragment>
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
				let currentUniversityPrimaryInformation=featuresPagePrimaryInformation;
				let currentPosts=currentUniversityPrimaryInformation.currentPostQuestionReplies;
				let newUpdatedPosts;
				if(isNextPostsRequest==false){
					newUpdatedPosts=updatedPosts;
				}else{
					newUpdatedPosts=currentPosts.concat(updatedPosts);
				}
			
				currentUniversityPrimaryInformation={
					...currentUniversityPrimaryInformation,
					currentPostQuestionReplies:newUpdatedPosts
				}
				changePrimaryInformation(currentUniversityPrimaryInformation);

				break;
			}

			case "Community":{
				let currentCommunityPrimaryInformation=featuresPagePrimaryInformation;
				let currentPosts=currentCommunityPrimaryInformation.responses;
				let newUpdatedPosts;
				if(isNextPostsRequest==false){
					newUpdatedPosts=updatedPosts;
				}else{
					newUpdatedPosts=currentPosts.concat(updatedPosts);
				}
			
				currentCommunityPrimaryInformation={
					...currentCommunityPrimaryInformation,
					responses:newUpdatedPosts
				}
				changePrimaryInformation(currentCommunityPrimaryInformation);
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
				currentSymposiumName,
				isOligarchStatus,
				currentBeaconSelectedPostType,
				fetchPosts,
				isGuestProfile,
				currentPostType,
				loadingNewPostsIndicator,
				endOfPostIndicator,
				isDesktop,
				currentPostManagmentToken,
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
				updatePrimaryInformation:(updatedPrimaryInformation)=>{
					changePrimaryInformation(updatedPrimaryInformation);
				},
				updateSecondaryInformation:(updatedSecondaryInformation)=>{
					changeSecondaryInformation(updatedSecondaryInformation);
				},
				triggerGenerateAirPlane:(selectedDivId)=>{
					generateAirPlane({
					    pageType:"Symposium_Features",
				        pageTypeParamsId:props.match.params.symposiumId,
				        targetDivAccessed:selectedDivId,
				        profileIdAccessingDiv:personalInformation.id
					})
				}
			}}
		>
			<Container id="symposiumFeaturesPage">
				{mobileCreationPostButton()}
				{beaconsTagCreationModal()}
				{tagExtendedInformationModal()}

				<GeneralNavBar
					page={"Symposium_Features"}
					routerHistory={props.history}
					targetDom={"symposiumFeaturesPage"}
					componentMountedStatus={componentMountedStatus}
					paramsPageId={props.match.params.symposiumId}
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
								{/*
									<div id="desktopSearchBar">
										<SearchBar
											featuresType={featuresType}
										/>
									</div>
								*/}
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