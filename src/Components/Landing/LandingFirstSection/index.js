import React from 'react';
import styled from 'styled-components';
import LandingPageScrollDiv from '../../GeneralComponents/LandingPageComponent/LandingScrollPageIndicator';
import { useDispatch,useSelector } from 'react-redux';

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
        ActualSubmitButton
        } from "./LandingFirstSectionCSS";


const FloatDivScrollDownContainer=styled.div`
	position:absolute;
	height:20%;
	width:20%;
	text-align:center;
	font-size:15px;
	top:75%;
	background-color:white;
	left:70%;
	padding:40px;
	border-radius:5px;
	box-shadow: 5px 10px 7px 5px #888888;
`;


const CompanyHeader = styled.div`

	position:absolute;
	top:-5%;
	left:2%;
	height:15%;
	width:45%;
	z-index:2;
	font-size:130px;
	color:#C8B0F4;

`;

const CreatAccountTitleCSS={

	position:"relative",
	top:"-60%",
	fontSize:"95%",
	width:"160%",
	height:"20%",
	color:"black",
	left:"-35%"


}

const JoinFamilyTitleCSS={

	position:"relative",
	top:"-60%",
	fontSize:"170%",
	width:"120%",
	height:"20%",
	color:"black",
	left:"-10%"

}

const TermsOfAgreementsCSS={

	color:"black",
	position:"relative",
	height:"30%",
	width:"170%",
	top:"92%",
	left:"-40%",
	fontSize:"10px"

}

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


const FirstSection=()=>{
	
	const dispatch=useDispatch();
	const state=useSelector(state=>state);

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

                    Built For Startups
                  </IntroMain>

                  <IntroSec>
                    The first social media platform made for startups to help
                    them excel and reach their true potential
                  </IntroSec>

              		<SignInformation>

              				<p style={JoinFamilyTitleCSS}>Join the family</p>

              				<p style={CreatAccountTitleCSS}>Create an account within minutes</p>

                        	<NameInput id="Name" placeholder="Firstname" onClick={() => handleClearTextAreaClick("Name")} onChange={e =>inspectLetterTyedName(e.target.value)}></NameInput>


                        	<LastInput id ="LastName" placeholder="Lastname" onClick={() => handleClearTextAreaClick("LastName")} onChange={e=>inspectLetterTyedName(e.target.value)}></LastInput>

                          <EmailInput id ="Email" placeholder="Email" onClick={() => handleClearTextAreaClick("Email")} ></EmailInput>

                          {/*

                          	Think of a better way of doing this with the signup SubmitButton.
                          	Instead of rendering two seperate divs and everything


                          */}
                          <SubmitButton onClick ={() => handleSignupClick()}> Sign Up  </SubmitButton>
                          <ActualSubmitButton id="ActualSubmitButton" to="/signup"> Sign Up  </ActualSubmitButton>

						<p style={TermsOfAgreementsCSS}>
							 By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.
							 We dont use your data or sell it without letting you know first.

						</p>

                  	</SignInformation>

                  	<FloatDivScrollDownContainer>

                  		Scroll down to hear about the company mission and 
                  		why joining our platform is a step in pursuing your dream 
                  		and joining a family

                  	</FloatDivScrollDownContainer>
              </FirstContainer>
	)
}

export default FirstSection;