import React from 'react';
import styled from 'styled-components';
import LandingPageScrollDiv from '../../GeneralComponents/LandingPageComponent/LandingScrollPageIndicator';
import { useDispatch,useSelector } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
	addName,
	addLastName,
	addEmail
} from '../../../Actions/Redux/Actions/PersonalProfile';

import  {
        Container,
        SignInformation,
        FirstContainer,
        FirstStatue,
        NavBarContainer,
        NavEmail,
        NavPassword,
        NavSubmitButton,
        NameInput,
        LastInput,
        EmailInput,
        IntroMain, 
        IntroSec,
        SubmitButton,
        ActualSubmitButton,
        FloatDivScrollDownContainer,
        CompanyHeader,
        CreateAccountTitle,
        JoinFamily,
        TermsOfAgreement,
        ArrowDownContainer
        } from "./LandingFirstSectionCSS";




const handleClearTextAreaClick=(divId)=>{
	document.getElementById(divId).placeholder="";
}

const inspectLetterTyedName=(character)=>{

	if(!isNaN(character)){
		document.getElementById('Name').style.borderColor="red";
		alert('No numbers allowed in the Name section of the login form. Please change :)')
	}
}

const handleLoginClick=()=>{


}


const FirstSection=(props)=>{
	
	const dispatch=useDispatch();
	const state=useSelector(state=>state);
	console.log(props);

	const handleSignupClick=()=>{

		const firstName=document.getElementById('Name').value;
		const lastName=document.getElementById('LastName').value;
		const email=document.getElementById('Email').value;

		dispatch(addName(firstName));
		dispatch(addLastName(lastName));
		dispatch(addEmail(email));

		document.getElementById('ActualSubmitButton').click();
	
	}

	return(

		     <FirstContainer>

		     	<CompanyHeader>	
		     		<b>Sympocia</b>
		     	</CompanyHeader>

                  <NavBarContainer>

                    <NavEmail id="LoginId" placeholder="Email" onClick={() => handleClearTextAreaClick("LoginId")}></NavEmail>
                    <NavPassword id="LoginPassword" placeholder="Password" onClick={() => handleClearTextAreaClick("LoginPassword")}></NavPassword>
                    <NavSubmitButton onClick = {() =>  handleLoginClick()} to="/profile">Login </NavSubmitButton>
                  </NavBarContainer>

                  <FirstStatue></FirstStatue>

                  <IntroMain>

                    Built For Everyone
                  </IntroMain>

                  <IntroSec>
                    The first social entertainment platform made for people who are tired
                    of their data being used and being pushed an agenda
                  </IntroSec>

              		<SignInformation>

              				<JoinFamily>Join the family</JoinFamily>

              				<CreateAccountTitle>Create an account within minutes</CreateAccountTitle>

                        	<NameInput id="Name" placeholder="Firstname" onClick={() => handleClearTextAreaClick("Name")} onChange={e =>inspectLetterTyedName(e.target.value)}></NameInput>


                        	<LastInput id ="LastName" placeholder="Lastname" onClick={() => handleClearTextAreaClick("LastName")} onChange={e=>inspectLetterTyedName(e.target.value)}></LastInput>

                          <EmailInput id ="Email" placeholder="Email" onClick={() => handleClearTextAreaClick("Email")} ></EmailInput>

                          {/*

                          	Think of a better way of doing this with the signup SubmitButton.
                          	Instead of rendering two seperate divs and everything


                          */}
                          <SubmitButton onClick ={() => handleSignupClick()}> Sign Up  </SubmitButton>
                          <ActualSubmitButton id="ActualSubmitButton" to="/signup"> Sign Up  </ActualSubmitButton>

						<TermsOfAgreement>
							 By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.
							 We dont use your data or sell it without letting you know first.

						</TermsOfAgreement>

                  	</SignInformation>

                  	<FloatDivScrollDownContainer>

                  		Scroll down to hear about the company mission and 
                  		why joining our platform is a step in pursuing your dream 
                  		and joining a family

                  	</FloatDivScrollDownContainer>

                  	<ArrowDownContainer>
	                  	<ExpandMoreIcon
	                  		style={{color:"#C8B0F4",fontSize:170,zIndex:6}}
	                  	/>
	                  </ArrowDownContainer>
              </FirstContainer>
	)
}

export default FirstSection;