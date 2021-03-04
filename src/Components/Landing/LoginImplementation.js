import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import { 
         addCompanyId,
         updatefirstTimeUsage,
         loginCompanyPage
  } from "../../Actions/Redux/Actions/CompanyActions.js";

import {
  signInPersonalUser,
  setPersonalProfileAccessToken,
  setPersonalProfileRefreshToken
} from '../../Actions/Redux/Actions/PersonalProfile';

import {loginProfile} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const Container=styled.div`
  z-index:8;
  position:fixed;
  height:50%;
  background-color:white;
  z-index:12;
  top:20%;
  border-radius:5px;
  width:30%;
  left:35%;
  padding:40px;
  display:flex;
  flex-direction:column;

  @media screen and (max-width:1370px){
    width:90% !important;
    left:5% !important;
  }
    @media screen and (max-width:600px){
        #loginBoxLI{
            display:none !important;
        }
    }
`;

const LoginBox=styled.textarea`
    position:relative;
    padding :.5em;
    width:90%;
    height:50px;
    font-size:15px;
    background-color:white;
    margin-bottom:5%;

    color:#848484;
    resize:none;
    border-radius:10px;
    outline:none;
    border-color:#e5e5e5;
    border-width:2px;

    @media screen and (max-width:760px){
    }
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
  margin-bottom:5%;
  cursor:pointer;

   z-index:2;
   &:hover{
      background-color:white;
      color:#C8B0F4;
      border-style:solid;
      border-color: #C8B0F4;
      text-decoration:none;

   }

    @media screen and (max-width:600px){
        width:190% !important;
        margin-left:-70% !important;
        margin-top:10% !important;
    }
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


const MobileButtonCSS={
   borderColor:"#C8B0F4",
   borderStyle:"solid",
   backgroundColor:"#C8B0F4",
   padding:"20px",
   listStyle:"none",
   width:"40%",
   color:"white",
   borderRadius:"5px"
}
const HorizontalLineCSS={
  marginLeft:"0",
  marginRight:"0"
}


const MobileLoginUI=({history})=>{
  const dispatch=useDispatch();
  return(
     <ul style={{padding:"0px"}}>
        <li id="loginBoxLI" style={{marginBottom:"5%",listStyle:"none",width:"90%"}}>
            <LoginBox id="LoginEmail" placeholder="Email"/>
        </li>

        <li id="loginBoxLI" style={{listStyle:"none",width:"90%"}}>
            <LoginBox  id="LoginPassword" placeholder="Password"/>
        </li>

        <a href="javascript:void(0);" style={{textDecoration:"none"}}>
          <li style={MobileButtonCSS} onClick={() =>  handleLoginClick(
                                          document.getElementById("LoginEmail").value,
                                          document.getElementById("LoginPassword").value,
                                          dispatch,
                                          history
                                       )}>
                Login 
          </li>
        </a>
        <li onClick={()=>triggerResetPasswordDisplay(history)} style={{listStyle:"none",width:"40%",color:"#5298F8",marginTop:"5%"}}>
           Forgot password?
        </li>
    </ul>
  )
}

const triggerResetPasswordDisplay=(history)=>{
  history.push({pathname:'/emailreset'})
}

const handleLoginClick=async(email,password,dispatch,history)=>{
  const {confirmation,data}=await loginProfile(email,password);

  if(confirmation=="Success"){
    const {message}=data;
    const {
      passWordIndicator,
      profileType,
      profile,
      accessToken,
      refreshToken
    }=message;

    const promises=[];

    promises.push(dispatch(signInPersonalUser(profile)));
    promises.push(dispatch(loginCompanyPage(false)));
    promises.push(dispatch(setPersonalProfileAccessToken(accessToken)));
    promises.push(dispatch(setPersonalProfileRefreshToken(refreshToken)));

    Promise.all(promises).then(result=>{
      history.push('/home');
    })

  }else{
    const {statusCode}=data;
    if(statusCode==400){
      alert('Incorrect password. Please try again');
    }else{
      alert('Unfortunately there has been an error trying to login. Please try again');
    }
  }
}


const LoginUI=({closeModal,history,displayMobileLoginTrigger})=>{
	const dispatch=useDispatch();
  const [displayMobileLogin,changeDisplayMobileLogin]=useState(false);

  const triggerUIChange=()=>{
    if(window.innerWidth<600){
        changeDisplayMobileLogin(true);
    }else{
        changeDisplayMobileLogin(false);
    }
  }

  useEffect(()=>{
    triggerUIChange();
  },[]);
  window.addEventListener('resize',triggerUIChange);


  return (
    <React.Fragment>
      <ShadowContainer
        onClick={()=>closeModal()}
      />
      <Container>
        <LoginBox id="LoginEmail" placeholder="Email"/>
        <LoginBox id="LoginPassword" placeholder="Password"/>
        <Submit onClick ={() =>  handleLoginClick(  
                                  document.getElementById("LoginEmail").value,
                                  document.getElementById("LoginPassword").value,
                                  dispatch,
                                  history
                          )}>Login
        </Submit>
        <hr style={HorizontalLineCSS}/>
        <p onClick={()=>triggerResetPasswordDisplay(history)} style={{cursor:"pointer",color:"#5298F8"}}>
          Forgot password?
        </p>
      </Container>
    </React.Fragment>

  )
}
export{
 LoginUI,
 MobileLoginUI
};





