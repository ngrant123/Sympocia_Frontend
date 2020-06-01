import React from 'react';
import styled from 'styled-components';
import { Redirect } from "react-router-dom";
import LandingPageScrollDiv from '../../GeneralComponents/LandingPageComponent/LandingScrollPageIndicator';
import { useDispatch,useSelector } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { 
         addCompanyId,
         updatefirstTimeUsage,
         loginCompanyPage
  } from "../../../Actions/Redux/Actions/CompanyActions.js";
import {
	addName,
	addLastName,
	addEmail,
  addPersonalIdentificationId,
  loginPersonalPage
} from '../../../Actions/Redux/Actions/PersonalProfile';
import {loginProfile} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
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
        ArrowDownContainer,
        InputTextArea
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

const handleLoginClick=async(event,props,dispatch)=>{
  event.preventDefault();
  const email=document.getElementById("LoginEmail").value;
  const password=document.getElementById("LoginPassword").value;

  const loginResults=await loginProfile(email,password);
 
  debugger;
  if(typeof loginResults!='object'){
    alert(loginResults);
  }else{
     const {passWordIndicator,profileType,profile}=loginResults;
    if(profileType=="Personal"){
      const {_id,firstName,lastName,email}=profile;

      dispatch(addName(firstName));
      dispatch(addLastName(lastName));
      dispatch(addEmail(email));

      dispatch(addPersonalIdentificationId(_id));
      dispatch(loginPersonalPage(true));
      dispatch(loginCompanyPage(false));

    }else{
      const {_id}=profile;
      dispatch(addCompanyId(_id));
      dispatch(updatefirstTimeUsage(true));
      dispatch(loginCompanyPage(true));
      dispatch(loginPersonalPage(false));

    }
    props.history.push('/home');
  }
}


const FirstSection=(props)=>{
	
	const dispatch=useDispatch();
	const state=useSelector(state=>state);
	console.log(props);

	const handleSignupClick=(props)=>{

		const firstName=document.getElementById('firstName').value;
		const lastName=document.getElementById('lastName').value;
		const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    //make api call to database and check if email already exists

    if(firstName==''||lastName==''||email==''||password==''){
      alert('Please fill out the necessary blank fields')
      props.preventDefault();
    }
	}

	return(

		     <FirstContainer>
  		     	<CompanyHeader>	
  		     		<b>Sympocia</b>
  		     	</CompanyHeader>

                  <NavBarContainer>

                    <NavEmail id="LoginEmail" placeholder="Email"></NavEmail>
                    <NavPassword id="LoginPassword" placeholder="Password"></NavPassword>
                    <NavSubmitButton onClick = {e =>  handleLoginClick(e,props,dispatch)} to="/profile">Login </NavSubmitButton>
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

                     <ul style={{position:"relative",left:"-50%",top:"-40%",padding:"0px",width:"200%"}}>
                        <JoinFamily>
                          <b>Join the family</b>
                        </JoinFamily>
                        <CreateAccountTitle>Create an account within minutes</CreateAccountTitle>

                        <p> Click here to begin </p>
                        <SubmitButton to="/signup"> Sign up </SubmitButton>

                      </ul>
                     {/*

                      <li style={{listStyle:"none",marginBottom:"5%"}}>
                          <ul style={{padding:"0px"}}>
                            <li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
                                <InputTextArea id="firstName" placeholder="First Name"/>
                            </li>
                             <li style={{listStyle:"none",display:"inline-block"}}>
                                <InputTextArea id="lastName" placeholder="Last Name"/>
                            </li>
                          </ul>
                      </li>

                      <li style={{listStyle:"none"}}>
                          <InputTextArea id="password" style={{paddingRight:"45%"}} placeholder="Password"/>
                      </li>

                        <SubmitButton to="/signup" onClick={e=>handleSignupClick(e)}> Submit </SubmitButton>

                        <TermsOfAgreement>
                           By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy.
                           We dont use your data or sell it without letting you know first.

                        </TermsOfAgreement>
                    </ul>

                   
              				<JoinFamily>Join the family</JoinFamily>

              				<CreateAccountTitle>Create an account within minutes</CreateAccountTitle>
                            <ul style={{padding:"0px",backgroundColor:"blue"}}>
                              <li style={{listStyle:"none"}}>
                                <InputTextArea placeholder="Email" />
                              </li>

                              <li style={{listStyle:"none"}}>
                                  <ul style={{padding:"0px"}}>
                                    <li style={{listStyle:"none",display:"inline-block"}}>
                                        <InputTextArea placeholder="First Name"/>
                                    </li>

                                    <li style={{listStyle:"none",display:"inline-block"}}>
                                        <InputTextArea placeholder="Last Name"/>
                                    </li>
                                  </ul>
                              </li>

                              <li style={{listStyle:"none"}}>
                                <InputTextArea placeholder="Password"/>
                              </li>

                              <li style={{listStyle:"none"}}>

                              </li>
                            </ul>

                           

                                <EmailInput id ="Email" placeholder="Email" onClick={() => handleClearTextAreaClick("Email")} ></EmailInput>

                              	<NameInput id="Name" placeholder="Firstname" onClick={() => handleClearTextAreaClick("Name")} onChange={e =>inspectLetterTyedName(e.target.value)}></NameInput>


                              	<LastInput id ="LastName" placeholder="Lastname" onClick={() => handleClearTextAreaClick("LastName")} onChange={e=>inspectLetterTyedName(e.target.value)}></LastInput>

                                

                              

                                	Think of a better way of doing this with the signup SubmitButton.
                                	Instead of rendering two seperate divs and everything


                                
                                <SubmitButton onClick ={() => handleSignupClick()}> Sign Up  </SubmitButton>
                                <ActualSubmitButton id="ActualSubmitButton" to="/signup"> Sign Up  </ActualSubmitButton>

                          */}
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