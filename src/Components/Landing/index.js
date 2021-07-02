import React,{useState,useEffect} from "react";
import styled from "styled-components";
import FirstSection from "./Mission/FirstSection/index.js";
import SecondSection from "./Mission/SecondSection/index.js";
import ThirdSection from "./Mission/ThirdSection/index.js";
import FourthSection from './Mission/FourthSection/index.js';

import {logOutUser} from "../../Actions/Redux/Actions/PersonalProfile.js";
import {useDispatch,useSelector} from "react-redux";
import NavBar from "./NavBar/index.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	overflow:hidden;
	width:100%;
`;

const LandingPage=(props)=>{
	const [currentPageCounter,changePageCounter]=useState(0);
	const [displayPersonalLanding,changeDisplayForPersonal]=useState(true);
	const [displayMobileUI,changeDisplayMobileUI]=useState(false);

	const dispatch=useDispatch();
	
	const isLoggedIn=useSelector(state=>state.personalInformation.loggedIn);
	const ownerId=useSelector(state=>state.personalInformation.id);

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeDisplayMobileUI(true); 
		}else{
			changeDisplayMobileUI(false);
		}
	}

	useEffect(()=>{
		
		const {history}=props;
		
		if(history.location.pathname=='/logout'){
			dispatch(logOutUser());
			history.push('/');
		}else if(isLoggedIn==true && ownerId!=""){
			history.push('/home');
		}
		triggerUIChange()
	},[])

	const increasePageCounter=()=>{
		
		var currentCounter=currentPageCounter;
		if(currentCounter==2){
			currentCounter=0;
		}else{
			currentCounter=currentCounter+1;
		}
		changePageCounter(currentCounter);
	}

	const decreasePageCounter=()=>{
		var currentCounter=currentPageCounter;
		if(currentPageCounter==0){
			currentCounter=0;
		}else{
			currentCounter=currentCounter-1;
		}
		changePageCounter(currentCounter);
	}

	const displaySelectedPage=(selectedPage)=>{
		changePageCounter(selectedPage);
	}
	return(
		<Container>
			<NavBar
				history={props.history}
				isMissionPage={true}
			/>
			<hr/>
			<FirstSection
				history={props.history}
			/>
			<SecondSection/>
			<ThirdSection/>
			<FourthSection
				history={props.history}
			/>
		</Container>
	)
}

export default LandingPage;