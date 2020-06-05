import React,{useEffect} from 'react';
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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LandingImage from '../../../designs/img/FirstSectionLandingPAgeImage.png'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import NavBarLogin from "../NavBarImplementation.js";


const LoginBox=styled.textarea`
    position:relative;
    padding :.5em;
    width:110%;
    height:50px;
    font-size:15px;
    background-color:white;

    color:#DBDADC;
    resize:none;
    border-radius:10px;
    outline:none;
    border-color:#e5e5e5;
    border-width:2px;
`;

const Submit=styled.div`
   width:70%;
   height:50px;
   border-color: #C8B0F4;
   border-style:solid;
   background-color:#C8B0F4;
   color:white;
   text-decoration:none;

   display: flex;
   align-items: center;
   justify-content: center;
   transition:8s;
  border-radius:5px;
  padding:20px;
  margin-left:30%;
  margin-bottom:5%;

   z-index:2;
   &:hover{

      background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   text-decoration:none;

   }
`;


const SignUpButton={
    listStyle:"none",
    display:"inline-block",
    backgroundColor:"#3898ec",
    borderRadius:"5px",
    padding:"10px",
    color:"white",
    marginRight:"2%"
}

const ExploreButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
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




const FirstSection=(props)=>{
	
	const dispatch=useDispatch();
	const state=useSelector(state=>state);
	console.log(props);

  useEffect(()=>{
    setTimeout(()=>{
        const container=document.getElementById("firstContainer");
        container.style.opacity="1";
    },200);
  },[]);

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

		     <FirstContainer id="firstContainer">
              <ul style={{padding:"0px"}}>
                   <li style={{position:"relative",top:"-25px",listStyle:"none",marginBottom:"2%"}}>
                      <ul style={{padding:"0px"}}>
                          <li style={{listStyle:"none",display:"inline-block"}}>
                            <p style={{fontSize:"100px",color:"#C8B0F4",marginLeft:"-20%"}}>
                                <b>Sympocia</b>
                            </p>
                          </li>
                          <NavBarLogin
                            props={props}
                          /> 
                      </ul>
                  </li>
                  <li style={{listStyle:"none"}}>
                    <ul style={{padding:"0px"}}>
                        <li style={{listStyle:"none",display:"inline-block",width:"90%",height:"60%"}}>
                            <ul style={{padding:"0px"}}>
                              <li style={{listStyle:"none",display:"inline-block",width:"50%",height:"50%"}}>
                                <ul style={{padding:"0px"}}>
                                  <li style={{listStyle:"none",display:"inline-block"}}>
                                      <p style={{fontSize:"40px",marginBottom:"10%"}}>
                                          <b>Finally.... a platform where you can just be yourself</b>
                                      </p>
                                      <p>
                                          We've all been there. You've asked yourself "I really like this photo but will 
                                          it get likes?" or "Will anyone care about my hobbies". You've also asked yourself,
                                          "Why do I feel so alone after using social media". We've asked these question also. 
                                          Which is why we built <b>Sympocia</b>
                                      </p>

                                      <p>
                                         Introducing the first social entertainment platform focused on you expressing yourself
                                         regardless of whether people like it or not
                                      </p>
                                  </li>
                                  <li style={{listStyle:"none"}}>
                                      <ul style={{padding:"0px"}}>
                                        <a href="/signup" style={{textDecoration:"none"}}>
                                          <li style={SignUpButton}>
                                              Sign Up
                                          </li>
                                        </a>
                                        <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                                          <li style={ExploreButton}>
                                              Explore
                                          </li>
                                        </a>
                                      </ul>
                                  </li>
                                </ul>
                              </li>

                              <li style={{position:"relative",top:"-100px",listStyle:"none",display:"inline-block",width:"40%"}}>
                                  <img src={LandingImage} style={{width:"95%",height:"80%"}}/>
                              </li>
                            </ul>
                        </li>
                        <li onClick={()=>props.increaseCounter()} style={{listStyle:"none",display:"inline-block"}}>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <ArrowForwardIosIcon/>
                          </a>
                        </li>
                    </ul>
                  </li>
                  <li style={{listStyle:"none"}}>
                    <ul style={{padding:"0px"}}>
                        <li style={{listStyle:"none",display:"inline-block"}}>
                            <FiberManualRecordIcon/>
                        </li>

                        <li onClick={()=>props.displaySelectedPage(1)} style={{listStyle:"none",display:"inline-block"}}>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <RadioButtonUncheckedIcon/>
                          </a>
                        </li>

                        <li onClick={()=>props.displaySelectedPage(2)} style={{listStyle:"none",display:"inline-block"}}>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <RadioButtonUncheckedIcon/>
                          </a>
                        </li>
                    </ul>
                  </li>
               </ul>



        </FirstContainer>
	)
}

export default FirstSection;