import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {GeneralNavBar} from "../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import PeopleSearch from "./PeopleSearch.js";
import PostSearch from "./PostSearch.js";
import SymposiumSearch from "./SymposiumSearch.js";
import {useSelector} from "react-redux";
import {SearchProvider} from "./SearchContext.js";
import Confetti from 'react-confetti';


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

/*
	The plan down the road is to maybe have a cool game that the user can play when there are no
	search results. Something similar to maybe google chromes dino game
*/

const SearchPage=(props)=>{
	const [displayChatPage,changeDisplayChatPage]=useState(false);
	const [displayConfetti,changeDisplayConfetti]=useState(false);

	const state=useSelector(state=>state);

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
						isPersonalProfile={isPersonalProfile}
						postType={props.location.state==null?"Images":props.location.state.postType}
						displaySymposium={displaySymposiumHandle}
					/>
		}else if(params.searchType=="Symposiums"){
			return <SymposiumSearch
						searchQuery={params.string}
						userId={profileId}
						history={props.history}

					/>
		}else{
			return <PeopleSearch
						searchQuery={params.string}
						userId={profileId}
						displayProfile={displayProfile}
					/>
		}
	}

	const displayProfile=(userId)=>{
		props.history.push({
			pathname:`/profile/${userId}`
		})
	}

	const displayRecruitConfetti=(displayIndicator)=>{
		changeDisplayConfetti(true);

		setTimeout(()=>{
			changeDisplayConfetti(false);
		},5000);
	}

	const displaySymposiumHandle=(data)=>{
		props.history.push({
		  pathname:`/symposium/${data.selectedSymposiums.symposium}`,
		  state: {
		  	selectedSymposium:data.selectedSymposiums,
			symposiums:data.symposiums,
			profileId:state.personalInformation.id
		  }
		});
	}

	return(
		<SearchProvider
			value={{
					personalInformationState:{
						_id:profileId
					},
					isPersonalProfile:isPersonalProfile
			}}
		>
			<Container id="searchContainer">
				<GeneralNavBar
					displayChatPage={displayChatPageHandle}
					page={"Home"}
					routerHistory={props.history}
					targetDom={"searchContainer"}
				/>
				{displayConfetti==true &&(
					<Confetti
						style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
						 run={true}
					/>
				)}
				<SearchResults>
					{searchPostsResults()}
				</SearchResults>
			</Container>
		</SearchProvider>
	)
};

export default SearchPage;