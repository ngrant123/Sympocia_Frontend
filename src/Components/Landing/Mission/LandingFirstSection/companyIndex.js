import React,{useEffect,useState} from 'react';
import styled,{keyframes} from 'styled-components';
import { Redirect } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { 
         addCompanyId,
         updatefirstTimeUsage,
         loginCompanyPage
  } from "../../../../Actions/Redux/Actions/CompanyActions.js";
import {
	addName,
	addLastName,
	addEmail,
  addPersonalIdentificationId,
  loginPersonalPage
} from '../../../../Actions/Redux/Actions/PersonalProfile';
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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LandingImage from '../../../../designs/img/CompanyFirstSection.png';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import EmailInformationModal from "../../EmailInformationModal.js";


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

const JoinMovementTextContainer=styled.input`
    border: none;
    overflow: auto;
    outline: none;
    resize:none;
    border-radius:5px;
    width:150%;
    top:5%;
    border-style:solid;
    border-width:2px;
    border-color:#d9d9d9;
`;



const FirstContainerContents=styled.div`
  display:flex;
  flex-direction:row;
  margin-left:10%;
  margin-top:0%;

  @media screen and (max-width:1370px){
    flex-direction:column;
  }
  @media screen and (max-width:600px){
      margin-left:5%;
  }
`;

const FirstContainerInformational=styled.div`
  width:70%;
  height:50%;
  margin-top:5%;
  display:flex;
  flex-direction:column;
  margin-right:10%;

  @media screen and (max-width:1370px){
    width:90%;
    font-size:20px;
    #header1{
      font-size:20px !important;
    }
  }

  @media screen and (max-width:700px){
    font-size:15px;
    #headerText{
      font-size:20px !important;
    }
  }
`;


const PageImageContainer=styled.div`
  display:flex;
  flex-direction:column;
  @media screen and (max-width:1370px){
      margin-left:5%;
    #amountOfUsersText{
      margin-top:7%;
      margin-left:-20% !important;
    }
  }

  @media screen and (max-width:600px){
    margin-left:15%;
    #amountOfUsersText{
      margin-top:0%;
    }
  }

    @media screen and (max-width:900px) and (max-height:420px) and (orientation: landscape) {
         margin-left:20%;
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

const JoinMovementButton={
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

const JoinMovementContainer={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  marginTop:"5%"
}

const ComingSoonButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginTop:"2%"
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
	
   const [displayEmailInformation,changeDisplayState]=useState(false);

	const dispatch=useDispatch();
	const state=useSelector(state=>state);

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

  const closeModal=()=>{
    changeDisplayState(false);
  }

  const triggerConfirmation=async()=>{
   
    /*
     const email=document.getElementById("email").value;
      if(email!=""){
        const {confirmation,data}=await recordEmailCompany(email);
        if(confirmation=="Success"){ 
          changeDisplayState(true)
        }else{
          alert('Unfortunately we experienced an error. Please submit your information again');
        }
      }else{
        alert('Please enter your email :)')
      }
    */
  }

	return(

		     <FirstContainer id="firstContainer" style={{marginLeft:"5%",flexDirection:"column"}}>
              {displayEmailInformation==false?null:
                <EmailInformationModal
                  closeModal={closeModal}
                  profileType="Company"
                />
              }
              <li style={{position:"relative",listStyle:"none",marginBottom:"2%"}}>
                  <ul style={{padding:"0px"}}>
                      <li style={{listStyle:"none",display:"inline-block"}}>
                        <p id="headerCompany" style={{fontSize:"100px",color:"#C8B0F4",marginLeft:"-20%"}}>
                            <b>Sympocia</b>
                        </p>
                      </li>
                  </ul>
              </li>

              <FirstContainerContents>
                <FirstContainerInformational>
                     <p id="headerText" style={{fontSize:"40px",marginBottom:"10%"}}>
                        <b>Introducing Sympocia Business</b>
                     </p>
                      <p>
                          So you’re starting out your very own business? Or maybe you have an idea
                          and you need a little help with it. 
                          Don’t worry, we built <b>Sympocia</b> just for you also :)
                      </p>
                      <p>
                         Starting a business is hard. But now you don’t have to do it all alone
                      </p>
                      <li style={ComingSoonButton}>
                        Coming soon
                      </li>
                </FirstContainerInformational>
                <PageImageContainer>
                   <img src={LandingImage} style={{width:"80%",height:"80%"}}/>
                </PageImageContainer>

              </FirstContainerContents>
              <li id="footerIcons" style={{listStyle:"none",marginLeft:"-10%"}}>
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

        </FirstContainer>
	)
}

export default FirstSection;