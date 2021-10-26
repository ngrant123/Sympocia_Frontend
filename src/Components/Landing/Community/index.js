import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {getSympociaInterviews} from "../../../Actions/Requests/SympociaInterviewRequests.js";
import News from "./News/index.js";
import Interviews from "./Interviews/index.js";
import SympociaNewsOptions from "./SympociaNewsOptionsToolBar.js";
import NavBar from "../NavBar/index.js";
import SympociaNewsAnnouncement from "./News/SympociaNewsAnnouncement.js";
import BeaconsAnnouncement from "./News/BeaconSympociaAnnouncement.js";

import AiyanahBuildABrand from "./News/AiyanahBuildingBrand.js";
import AiyanahTipsOnBecomingBetterPoet from "./News/AiyanahTipsOnBecomingBetterPoet.js";
import AiyanahFullInterview from "./News/AiyanahFullInterview.js";
import AiyanahFullInterviewImage from "../../../designs/background/AiyanahFullInterview.png";

import SympociaAnnouncementImage from "../../../designs/background/ThirdSectionBackground.png";
import BeaconsHeaderImage from "../../../designs/background/Beacons.png";
import AiyanahHeaderImage from "../../../designs/background/Aiyanah.png";
import AiyanahTipsOnBrand from "../../../designs/background/AiyanahTipsOnBrand.png";

import AlexAnifantisInterview from "../../../designs/background/AlexAnifantisInterview.png";
import AlexAnifantisWritingAboutGames from "../../../designs/background/AlexAnifantisWritingAboutGames.png";
import AlexAnifantisGrowingBrand from "../../../designs/background/AlexAnifantisGrowingBrand.png";
import AlexAnifantisBuildABrand from "./News/AlexGrowingBrand.js";
import AlexAnifantisTipsOnWriting from "./News/AlexTipsOnWritingAboutGames.js";
import AlexAnifantisFullInterview from "./News/AlexFullInterview.js";

import WhatDoWeOffer from "../../../designs/background/WhatDoWeOffer.png";
import HowDoesSympociaDiffer from "./News/HowDoesSympociaDiffer.js";
import SympociaRepresents from "./News/SympociaRepresents.js";
import WhatDoesSympociaRepresent from "../../../designs/background/WhatDoesSympociaRepresent.png";

import ExploreAndFeedRankingExplanation from "../../../designs/background/ExploreAndFeedRankingExplanation.png";
import RankingExplanation from "./News/ExploreFeedAndRankingExplanation.js";

import {addUserToCommunityViewedList} from "../../../Actions/Requests/SympociaCommunity/SympociaCommunityAdapter.js";
import {useSelector} from "react-redux";


const Container=styled.div`
	display:flex;
	flex-direction:column;
`;

const NewAndInterviewsContainer=styled.div`
	display:flex;
	flex-direction:column;
	padding:20px;
	margin-left:4%;

	@media screen and (max-width:1370px){	
		margin-left:10%;
	}

	@media screen and (max-width:650px){
		padding-top:0px !important;
		margin-left:4%;
	}
`;


const TitleContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const SearchOptions=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:none;
	width:20%;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;
	margin-left:2%;

	@media screen and (max-width:700px){
		width:95% !important;
	}
`;

const CommunityContainer=(props)=>{
	const [displayNews,changeDisplayNews]=useState(true);
	const [newsMapping,changeNewsMapping]=useState([
		{
			title:"News feed and ranking algorithm",
			description:"In this post I breakdown what the ranking system is and how your feed is created",
			component:<RankingExplanation/>,
			headerImage:ExploreAndFeedRankingExplanation
		},
		{	
			title:"How does Sympocia differ?",
			description:"Here we explain why sympocia is different and a better alternative",
			component:<HowDoesSympociaDiffer/>,
			headerImage:WhatDoWeOffer
		},
		{
			title:"What do we represent at Sympocia? ",
			description:"We answer the long await question: What do we represent at Sympocia?",
			component:<SympociaRepresents/>,
			headerImage:WhatDoesSympociaRepresent
		},	
		{
			title:"Growing your brand as a writer in the gaming industry",
			description:"Alex talks about starting out and growing your brand as a writer",
			component:<AlexAnifantisBuildABrand/>,
			headerImage:AlexAnifantisGrowingBrand
		},
		{
			title:"Tips for getting better at writing",
			description:"Alex gives tips on improving your writing",
			component:<AlexAnifantisTipsOnWriting/>,
			headerImage:AlexAnifantisWritingAboutGames
		},
		{
			title:"Alex Anyfantis Full Interview (Writing In Gaming)",
			description:"Alex talks about getting started as a writer in the game industry and more",
			component:<AlexAnifantisFullInterview/>,
			headerImage:AlexAnifantisInterview
		},
		{
			title:"Tips for growing your brand as a professional poet",
			description:"Aiyanah Rose talks about building a brand as a poet.",
			component:<AiyanahBuildABrand/>,
			headerImage:AiyanahTipsOnBrand
		},
		{
			title:"Tips for writing better poetry for anyone starting out",
			description:"Here Aiyanah Rose breaks down tips to becoming a better poet.",
			component:<AiyanahTipsOnBecomingBetterPoet/>,
			headerImage:AiyanahHeaderImage
		},
		{
			title:"Aiyanah Full Interview (Poet)",
			description:"Aiyanah Rose full interview where she gives her insights on poetry",
			component:<AiyanahFullInterview/>,
			headerImage:AiyanahFullInterviewImage
		},
		{
			title:"Beacons Announcement and Current Sprint Planning",
			description:"Hope you guys like the new beacons feature. Also what to talk about the current sprint planning",
			component:<BeaconsAnnouncement/>,
			headerImage:BeaconsHeaderImage
		},
		{
			title:"Sympocia News Announcement",
			description:"Here we talk about our new section Sympocia News and why we created it for you :)",
			component:<SympociaNewsAnnouncement/>,
			headerImage:SympociaAnnouncementImage
		}
	])
	const ownerId=useSelector(state=>state.personalInformation.id);

	useEffect(()=>{
		addUserToCommunityViewedList(ownerId);
	},[]);

	const changePostTypeOption=(indicator)=>{
		changeDisplayNews(indicator)
	}

	return(
		<Container id="parentContainer">
			<NavBar
				history={props.history}
				isMissionPage={false}
			/>
			<NewAndInterviewsContainer>
				<SympociaNewsOptions
					changePostTypeOption={changePostTypeOption}
				/>
				{displayNews==true?
					<News
						news={newsMapping}
					/>:<Interviews/>
				}
			</NewAndInterviewsContainer>
		</Container>
	)
}

export default CommunityContainer;