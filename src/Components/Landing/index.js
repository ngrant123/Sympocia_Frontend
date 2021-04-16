import React,{useState,useEffect} from "react";
import styled from "styled-components";
import FirstSection from "./Mission/LandingFirstSection/personalIndex.js";
import SecondSection from "./Mission/LandingSecondSection/personalIndex.js";
import ThirdSection from "./Mission/LandingThirdSection/personalIndex.js";
import FourthSection from "./Mission/LandingFourthSection/index.js";

import CompanyFirstSection from "./Mission/LandingFirstSection/companyIndex.js";
import CompanySecondSection from "./Mission/LandingSecondSection/companyIndex.js";
import CompanyThirdSection from "./Mission/LandingThirdSection/companyIndex.js";
import {logOutUser} from "../../Actions/Redux/Actions/PersonalProfile.js";
import {useDispatch,useSelector} from "react-redux";
import NavBar from "./NavBar/index.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
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
			{displayPersonalLanding==true?
				<React.Fragment>
					<FirstSection
						increaseCounter={increasePageCounter}
						displaySelectedPage={displaySelectedPage}
						history={props.history}
					/>
					<SecondSection
						increaseCounter={increasePageCounter}
						decreaseCounter={decreasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>
					<ThirdSection
						decreaseCounter={decreasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>
					<FourthSection
						history={props.history}
					/>

				</React.Fragment>:
				<React.Fragment>
					{/*
						<ArrowCompanyContainer onClick={()=>changeDisplayForPersonal(true)}>
							<ArrowBackIosIcon/>
						</ArrowCompanyContainer>
					*/}
					<CompanyFirstSection
						increaseCounter={increasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>
					<CompanySecondSection
						increaseCounter={increasePageCounter}
						decreaseCounter={decreasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>
					<CompanyThirdSection
						decreaseCounter={decreasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>
					<FourthSection/>
				</React.Fragment>
			}
		</Container>
	)
}

export default LandingPage;