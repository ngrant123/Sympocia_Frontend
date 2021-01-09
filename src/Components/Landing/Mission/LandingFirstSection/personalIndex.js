import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
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

import LandingImage from '../../../../designs/img/FirstSectionLandingPAgeImage.png'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
        LoginUI,
        MobileLoginUI
} from "../../LoginImplementation.js";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import EmailInformationModal from "../../EmailInformationModal.js";
import {
        recordEmail,
        getInterestedProfiles,
        verifyCode
      } from "../../../../Actions/Requests/MarketingRequests.js";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
    width:100%;
    top:5%;
    border-style:solid;
    border-width:2px;
    border-color:#d9d9d9;
`;

const UserImagePicture=styled.div`
    position:relative;
    width:80px;
    height:95%;
    background-color:black;
    border-radius:50%;
`;


const ShadowContainer = styled.div`
  position:fixed;
  width:200%;
  height:100%;
  left:-10%;
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  display:block;
  z-index:8;
`;

const MobileLoginContainer=styled.div`
  padding:20px;
  position:fixed;
  width:100%;
  left:1%;
  height:60%;
  background-color:white;
  border-radius:5px;
  top:20%;
 z-index:8;
`;

const FirstContainerContents=styled.div`
  display:flex;
  flex-direction:row;
  margin-left:10%;
  margin-top:-5%;
  align-items: flex-start;
  @media screen and (max-width:1370px){
    flex-direction:column;
  }
  @media screen and (max-width:700px){
      margin-left:5%;
      flex-direction:column;
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
    height:90%;
    #header1{
      font-size:20px !important;
    }
  }
`;


const PageImageContainer=styled.div`
  display:flex;
  flex-direction:column;

  @media screen and (max-width:1370px){
    margin-left:15%;
    #amountOfUsersText{
      margin-top:7%;
      margin-left:-20%;
    }
  }


  @media screen and (max-width:700px){
    height:50%;
    width:80%;

    #amountOfUsersText{
      margin-top:0%;
    }
  }

    @media screen and (max-width:900px) and (max-height:420px) and (orientation: landscape) {
         margin-left:20%;
      #headerImage{
        width:192px !important;
        height:225px!important;
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

const JoinMovementContainer={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  width:"90%",
  marginTop:"5%"
}

const MobileLoginButton={
  listStyle:"none",
  display:"none",
  backgroundColor:"#C8B0F4",
  borderRadius:"5px",
  padding:"10px",
  color:"blue"
}

const BackButtonCSS={
  borderStyle:"solid",
  borderWidth:"2px",
  padding:"10px",
  borderRadius:"50%",
  color:"#C8B0F4",
  backgroundColor:"white",
  textAlign:"center",
  boxShadow: "0 0 5px #C8B0F4",
  listStyle:"none",
  display:"inline-block",
  marginRight:"2%"
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
  const [usersInterested,changeUsersInterested]=useState([]);
  const [numberOfUserInTotalInterested,changeTotalAmountInterested]=useState(0);
  const [userId,changeUserId]=useState();
  const [displaySignUpPrompt,changeDisplaySignUpPrompt]=useState(false);
  const [displayEnterCodePrompt,changeDisplayEnterCodePrompt]=useState(false);
  const [displayMobileLogin,changeDisplayMobileLogin]=useState(false);
  
	const dispatch=useDispatch();
	const state=useSelector(state=>state);

  useEffect(()=>{
    setTimeout(()=>{
        const container=document.getElementById("firstContainer");
        container.style.opacity="1";
    },200);

    const getInterestedApi=async()=>{
        const {confirmation,data}=await getInterestedProfiles(1);
        if(confirmation=="Success"){
          const {
            numberOfPeopleInterested,
            responses
          }=data;

          changeTotalAmountInterested(numberOfPeopleInterested);
          changeUsersInterested([...responses]);
        }else{
          alert('There has been an error with our database. Please try again later');
        }
    }

    getInterestedApi();
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

  const pushProfileObject=(userObject)=>{
    const currentProfilePictures=usersInterested;
    currentProfilePictures.splice(0,0,userObject);
    changeUsersInterested([...currentProfilePictures]);
    changeDisplayState(false);
  }

  const triggerConfirmation=async()=>{
    
    const email=document.getElementById("email").value;
      if(email!=""){
        const {confirmation,data}=await recordEmail(email);
        if(confirmation=="Success"){
          changeUserId(data._id);
          changeDisplayState(true)
        }else{
          alert('Unfortunately we experienced an error. Please submit your information again');
        }
      }else{
        alert('Please enter your email :)')
      }
  }

  const verifyCodeCall=async()=>{
      const code=document.getElementById("code").value;
      
      if(code!=''){
        const {confirmation,data}=await verifyCode(code);
        if(confirmation=="Success"){
          const {history}=props;
          dispatch(loginPersonalPage(true));
          history.push({
            pathname:'/signup'
          })
        }else{
          alert('Wrong code :(. You would have thought you was getting early access LMAO Email nathan@sympocia.com to get the code though :)');
        }
      }else{
        alert('Please enter a code');
      }
  }

  const closeSignUpOrCodePrompt=()=>{
    changeDisplaySignUpPrompt(false);
    changeDisplayEnterCodePrompt(false);
  }

  const codeOrEmailModalPrompt=()=>{
      if(displaySignUpPrompt==false && displayEnterCodePrompt==false){
          return <li style={{listStyle:"none"}}>
                   <ul style={{padding:"0px"}}>
                      <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                        <li onClick={()=>changeDisplaySignUpPrompt(true)} style={SignUpButton}>
                            Join
                        </li>
                      </a>
                      <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                        <li onClick={()=>changeDisplayEnterCodePrompt(true)} style={ExploreButton}>
                            Enter Code
                        </li>
                      </a>
                      {/*
                        <a  href="javascript:void(0);" style={{textDecoration:"none"}}>
                          <li style={{listStyle:"none"}}>
                              Login In
                          </li>
                        </a>
                      */}
                    </ul>
                </li>
      }else{
          if(displaySignUpPrompt==true){
              return <li style={JoinMovementContainer}>
                       <ul style={{padding:"0px"}}>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <li onClick={()=>closeSignUpOrCodePrompt()} style={BackButtonCSS}>
                              <ArrowBackIosIcon/>
                            </li>
                          </a>

                          <li style={{width:"60%",listStyle:"none",display:"inline-block",marginRight:"5%"}}> 
                              <JoinMovementTextContainer id="email" placeholder="Enter your email" placeholderTextColor='red'/>
                          </li>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <li onClick={()=>triggerConfirmation()} style={{listStyle:"none",display:"inline-block"}}>
                                Join the movement 
                            </li>
                          </a>
                       </ul>
                    </li>
          }else{
              return <li style={JoinMovementContainer}>
                       <ul style={{padding:"0px"}}>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <li onClick={()=>closeSignUpOrCodePrompt()} style={BackButtonCSS}>
                              <ArrowBackIosIcon/>
                            </li>
                          </a>

                          <li style={{width:"60%",listStyle:"none",display:"inline-block",marginRight:"5%"}}> 
                              <JoinMovementTextContainer id="code" placeholder="Enter the code here" placeholderTextColor='red'/>
                          </li>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <li onClick={()=>verifyCodeCall()} style={{listStyle:"none",display:"inline-block"}}>
                                Enter :) 
                            </li>
                          </a>
                       </ul>
                    </li>
          }
      }
  }

  const displayMobileLoginTrigger=()=>{
      changeDisplayMobileLogin(true);
  }

  const closeMobileLogin=()=>{
    changeDisplayMobileLogin(false);
  }

  const mobileLoginUI=()=>{
    return <div>
            {displayMobileLogin==true &&(
              <>
                <ShadowContainer
                  onClick={()=>changeDisplayMobileLogin()}
                />
                <MobileLoginContainer>
                     <MobileLoginUI
                        history={props.history}
                        displayMobileLoginTrigger={changeDisplayMobileLogin}
                      /> 
                </MobileLoginContainer>
              </>
            )}
          </div>
  }

	return(
		     <FirstContainer id="firstContainer">
              {displayEmailInformation==false?null:
                <EmailInformationModal
                  id={userId}
                  closeModal={closeModal}
                  pushProfileObject={pushProfileObject}
                  profileType={null}
                />
              }
              {mobileLoginUI()}
              <ul style={{padding:"0px"}}>
                  <li style={{position:"relative",top:"-25px",listStyle:"none",marginBottom:"2%"}}>
                      <ul style={{padding:"0px"}}>
                          <li id="header" style={{listStyle:"none",display:"inline-block",fontSize:"100px",color:"#C8B0F4"}}>
                            <p>
                                <b>Sympocia</b>
                            </p>
                          </li>
                           <li style={{listStyle:"none"}} id="navBarLogin">
                            <LoginUI
                              history={props.history}
                              displayMobileLoginTrigger={displayMobileLoginTrigger}
                            /> 
                          </li>
                      </ul>
                  </li>
                  <FirstContainerContents>
                      <FirstContainerInformational>
                            <p  id="header1" style={{fontSize:"40px",marginBottom:"10%"}}>
                                <b>Finally.... a platform where you can just be yourself</b>
                            </p>
                            <p>
                                We've all been there. You've asked yourself "I really like this photo but will 
                                it get likes?" or "Will anyone care about my hobbies?". You've also asked yourself,
                                "Why do I feel so alone after using social media?". We've asked ourselves these question also. 
                                Which is why we built <b>Sympocia</b>
                            </p>

                             <p>
                                 Introducing the first social entertainment platform focused on you expressing yourself
                                 regardless of whether people like it or not
                              </p>
                              {codeOrEmailModalPrompt()} 
                      </FirstContainerInformational>

                      <PageImageContainer>
                          <img id="headerImage" src={LandingImage} style={{width:"70%",height:"70%"}}/>
                          <p id="amountOfUsersText">
                             So far <b>{numberOfUserInTotalInterested}</b> users have signed up. What are you waiting for? :) 
                          </p>
                          <li style={{listStyle:"none"}}>
                                      <ul style={{padding:"5px",width:"70%",height:"80px",borderRadius:"5px",overflowX:"auto",boxShadow:"1px 5px 5px 5px #d5d5d5"}}>
                                        {usersInterested.map(data=>
                                            <>
                                              {data.profilePicture==null?
                                                <a href={data.link} style={{textDecoration:"none"}}>
                                                  <li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
                                                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user"  width="80px" height="95%" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                          <path stroke="none" d="M0 0h24v24H0z"/>
                                                          <circle cx="12" cy="7" r="4" />
                                                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                      </svg>
                                                  </li>
                                                </a>:
                                                <a href={data.link} style={{textDecoration:"none"}}>
                                                  <li style={{position:"relative",top:"-30%",listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
                                                    <img src={data.profilePicture} style={{width:"50px",height:"70%",borderRadius:"50%"}}/>
                                                  </li>
                                                </a>
                                              }
                                            </>
                                        )}
                                      </ul>
                                  </li>
                      </PageImageContainer>
                  </FirstContainerContents>

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
               </ul>
        </FirstContainer>
	)
}

export default FirstSection;