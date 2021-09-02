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


const BEACONS_featuresPagePrimaryInformation={
		posts:[
			{},
			{},
			{},
			{},
			{},
			{}
		],
		symposiumName:"Engineering"
}

const BEACONS_featuresPageSecondaryInformation={
			progressBarValue:50,
		tags:[
			{
				_id:1,
				tagName:"Linear 1",
				currentNumOfTag2:6
			},
			{
				_id:2,
				tagName:"Linear 2",
				currentNumOfTag2:7
			},
			{
				_id:3,
				tagName:"Linear 3",
				currentNumOfTag2:9
			},
			{
				_id:4,
				tagName:"Linear 4",
				currentNumOfTag2:6
			},
			{
				_id:5,
				tagName:"Linear 5",
				currentNumOfTag2:6
			},
			{
				_id:6,
				tagName:"Linear 6",
				currentNumOfTag2:11
			},
			{
				_id:7,
				tagName:"Linear 7",
				currentNumOfTag2:12
			},
			{
				_id:8,
				tagName:"Linear 8",
				currentNumOfTag2:6
			},
			{
				_id:9,
				tagName:"Linear 9",
				currentNumOfTag2:6
			},
			{
				_id:10,
				tagName:"Linear 10",
				currentNumOfTag2:2
			}
		]
}

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

	const [isDesktop,changeIsDesktopStatus]=useState(false);


	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeIsDesktopStatus(false);
		}else{
			changeIsDesktopStatus(true);
		}
	}


	useEffect(()=>{
		changeLoadingStatus(true);
		fetchData("Beacons")
		changeLoadingStatus(false);
		triggerUIChange();
	},[]);



	const fetchData=(featurePageType)=>{
		//Placeholder
		changeLoadingStatus(true);
		switch(featurePageType){
			case "Beacons":{
				changePrimaryInformation({...BEACONS_featuresPagePrimaryInformation});
				changeSecondaryInformation({...BEACONS_featuresPageSecondaryInformation});
				break;
			}

			case "University":{
				changePrimaryInformation({...SYMPOSIUM_featuresPagePrimaryInformation});
				changeSecondaryInformation({...SYMPOSIUM_featuresPageSecondaryInformation});
				break;
			}

			case "Community":{
				changePrimaryInformation({...COMMUNITY_featuresPagePrimaryInformation});
				changeSecondaryInformation({...COMMUNITY_featuresPageSecondaryInformation});
				break;
			}
		}
		const newType=featurePageType;
		changeLoadingStatus(false);
		changeFeaturesType(newType);
	}

	const updateSymposiumHandle=(selectedSymposiumName)=>{
		let currentPrimarySymposiumInformation=featuresPagePrimaryInformation;
		currentPrimarySymposiumInformation={
			...currentPrimarySymposiumInformation,
			symposiumName:selectedSymposiumName
		}
		changePrimaryInformation({...currentPrimarySymposiumInformation});
	}

	const updateSymposiumFeatureType=(selectedFeaturesType)=>{
		fetchData(selectedFeaturesType);
	}

	const closeFeaturesPageCreationModal=()=>{
		changeDisplayBeaconCreation(false);
		changeSymposiumDisplayCreationModal(false);
	}


	const updateCurrentFeaturePagePosts=()=>{

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
								postType={currentCreationCriteria.postType}
								closeCreationModal={closeFeaturesPageCreationModal}
								updateBeaconPosts={updateCurrentFeaturePagePosts}
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

	return(
		<FeaturesProvider
			value={{
				featuresPageSecondaryInformation,
				featuresPagePrimaryInformation,
				featuresType,
				isDesktop,
				triggerCurrentSymposiumChange:(seletedSymposium)=>{
					updateSymposiumHandle(seletedSymposium);
				},
				triggerFeaturesTypeChange:(requestedSymposiumFeatureType)=>{
					updateSymposiumFeatureType(requestedSymposiumFeatureType);
				},
				displayCreationModal:(creationCriteria)=>{
					debugger;
					console.log(creationCriteria);
					console.log("Display Toggled");
					console.log(featuresType);
					switch(featuresType){
						case "Beacons":{
							changeCurrentCreationCriteria({...creationCriteria})
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
								symposiumName={featuresPagePrimaryInformation.symposiumName}
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