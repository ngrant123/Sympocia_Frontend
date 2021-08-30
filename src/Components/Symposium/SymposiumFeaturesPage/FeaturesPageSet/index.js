import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {GeneralNavBar} from "../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import CreationBeaconPortal from "./Modals-Portals/Beacons/CreateBeaconPortal.js";

import {FeaturePosts} from "../FeaturesPageSubset/Posts/index.js";
import SideBar from "../FeaturesPageSubset/SideBar/index.js";
import SearchBar from "../FeaturesPageSubset/SearchBar.js";
import {FeaturesProvider} from "./FeaturesPageContext.js";
import {useSelector} from "react-redux";


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
					question:"What’s scommunity yessir ?",
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
			symposiumName:"Engineering"
}


const COMMUNITY_featuresPageSecondaryInformation={
				submissionCount:55,
			currentQuestionsStandings:[
				{
					question:"What do you think about pizza?",
					votes:23
				},
				{
					question:"What do you think about pizza1?",
					votes:2
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
	}


	const updateCurrentFeaturePagePosts=()=>{

	}

	const featuresPageCreationModals=()=>{
		return(
			<React.Fragment>
				{displayBeaconCreation==true &&(
					<CreationBeaconPortal
						postType={currentCreationCriteria.postType}
						closeCreationModal={closeFeaturesPageCreationModal}
						updateBeaconPosts={updateCurrentFeaturePagePosts}
						symposiumId={props.match.params.symposiumId}
						ownerId={personalInformation.id}
						isDesktop={isDesktop}
					/>
				)}
			</React.Fragment>
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
						break;
					}
				}
				}
			}}
		>
			<Container id="symposiumFeaturesPage">
				{featuresPageCreationModals()}
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