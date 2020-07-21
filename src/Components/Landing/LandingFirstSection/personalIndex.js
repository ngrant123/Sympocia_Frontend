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
        InputTextArea
     } from "./LandingFirstSectionCSS";
import LandingImage from '../../../designs/img/FirstSectionLandingPAgeImage.png'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import NavBarLogin from "../NavBarImplementation.js";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


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


const ArrowDownContainer=styled.div`
  animation: bounce 2s infinite;
  @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-30px);
        }
        60% {
          transform: translateY(-15px);
        }
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

const MobileLoginButton={
  listStyle:"none",
  display:"none",
  backgroundColor:"#C8B0F4",
  borderRadius:"5px",
  padding:"10px",
  color:"white"
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
                          <li style={{listStyle:"none",display:"inline-block",fontSize:"100px",color:"#C8B0F4"}}>
                            <p id="header">
                                <b>Sympocia</b>
                            </p>
                          </li>
                          <li style={{listStyle:"none"}} id="navBarLogin">
                            <NavBarLogin
                              props={props}
                            /> 
                          </li>
                      </ul>
                  </li>
                  <li style={{listStyle:"none",display:"inline-block",width:"90%",height:"60%"}}>
                      <ul style={{padding:"0px"}}>
                        <li id="listOpeningTextContainer" style={{listStyle:"none",display:"inline-block",width:"50%",height:"50%"}}>
                          <ul id="openingTextContainer" style={{padding:"0px"}}>
                            <li style={{listStyle:"none",display:"inline-block"}}>
                                <ul style={{padding:"0px"}}>
                                    <li style={{listStyle:"none",fontSize:"40px",marginBottom:"10%"}}>
                                         <p id="header1">
                                            <b>Finally.... a platform where you can just be yourself</b>
                                        </p>
                                    </li>

                                    <li style={{listStyle:"none"}}>
                                        <p>
                                            We've all been there. You've asked yourself "I really like this photo but will 
                                            it get likes?" or "Will anyone care about my hobbies". You've also asked yourself,
                                            "Why do I feel so alone after using social media". We've asked these question also. 
                                            Which is why we built <b>Sympocia</b>
                                        </p>
                                    </li>

                                    <li style={{listStyle:"none"}}>
                                        <p>
                                           Introducing the first social entertainment platform focused on you expressing yourself
                                           regardless of whether people like it or not
                                        </p>
                                    </li>
                                </ul>
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
                                  <a  href="javascript:void(0);" style={{textDecoration:"none"}}>
                                    <li style={{listStyle:"none"}}>
                                        Login In
                                    </li>
                                  </a>
                                </ul>
                            </li>
                          </ul>
                        </li>

                        <li id="imageListContainer" style={{position:"relative",top:"-100px",listStyle:"none",display:"inline-block",width:"40%"}}>
                            <img id="imageContainer" src={LandingImage} style={{position:"relative",width:"95%",height:"80%"}}/>
                        </li>
                      </ul>
                  </li>
                  <li id="footerIcons" style={{listStyle:"none"}}>
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
                  <li id="floatingArrowFunction" style={{listStyle:"none",marginTop:"5%"}}>
                    <ArrowDownContainer>
                      <ArrowDownwardIcon
                        style={{fontSize:'20'}}
                      />
                    </ArrowDownContainer>
                  </li>
               </ul>
        </FirstContainer>
	)
}

export default FirstSection;