import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {GeneralNavBar} from "../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import PeopleSearch from "./PeopleSearch.js";
import PostSearch from "./PostSearch.js";
import SymposiumSearch from "./SymposiumSearch.js";
import {useSelector} from "react-redux";
import {SearchProvider} from "./SearchContext.js";



const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:white;
`;

const SearchResults=styled.div`
	position:absolute;
	width:100%;
	top:15%;
`;

const SearchPage=(props)=>{
	const [displayChatPage,changeDisplayChatPage]=useState(false);
	const [displayConfetti,changeDisplayConfetti]=useState(false);

	const state=useSelector(state=>state);
	console.log(state);
	var profileId=(state.personalInformation.loggedIn==true)?state.personalInformation.id:state.companyInformation.id;
	var isPersonalProfile=(state.personalInformation.loggedIn==true)?true:false;
	const displayChatPageHandle=(pageIndicator)=>{
		changeDisplayChatPage(true);

		/*
			this.setState(prevState=>({

				...prevState,
				displayChatPage:true,
				chatPageIndicator:pageIndicator
			}))
		*/
	}

	const searchPostsResults=()=>{
		const {params}=props.match;
		if(params.searchType=="Posts"){
			return <PostSearch
						searchQuery={params.string}
						userId={profileId}
						displayRecruitConfetti={displayRecruitConfetti}
						displaySymposium={displaySymposium}
						isPersonalProfile={isPersonalProfile}
					/>
		}else if(params.searchType=="Symposiums"){
			return <SymposiumSearch
						searchQuery={params.string}
						userId={profileId}
					/>
		}else{
			return <PeopleSearch
						searchQuery={params.string}
						userId={profileId}
					/>
		}
	}

	const displayRecruitConfetti=(displayIndicator)=>{
		changeDisplayConfetti(true);

		setTimeout(()=>{
			changeDisplayConfetti(false);
		},5000);
	}

	const displaySymposium=(data)=>{
		props.history.push({
		  pathname:`/symposium/${data.selectedSymposiums}`,
		  state: {
		  	selectedSymposium:data.selectedSymposiums,
			symposiums:data.symposiums,
			profileId:profileId
		  }
		});
	}

	return(
		<SearchProvider
			value={{
					personalInformationState:{
						_id:profileId
					},
					isPersonalProfile:isPersonalProfile,
			}}
		>
			<Container>
				<GeneralNavBar
					displayChatPage={displayChatPageHandle}
					page={"Home"}
					routerHistory={props.history}
				/>
				<SearchResults>
					{searchPostsResults()}
				</SearchResults>
			</Container>
		</SearchProvider>
	)
};

export default SearchPage;