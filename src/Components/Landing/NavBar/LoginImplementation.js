import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";

import {
  signInPersonalUser,
  setPersonalProfileAccessToken,
  setPersonalProfileRefreshToken
} from '../../../Actions/Redux/Actions/PersonalProfile';

import {loginProfile} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const Container=styled.div`
  position:fixed;
  height:60%;
  background-color:white;
  z-index:12;
  top:20%;
  border-radius:5px;
  width:30%;
  left:35%;
  padding:40px;
  display:flex;
  overflow:hidden;
  flex-direction:column;

  @media screen and (min-width:2500px){
    height:25%;
  }

  @media screen and (max-width:1370px){
    width:90% !important;
    left:5% !important;
  }
    @media screen and (max-width:600px){
        #loginBoxLI{
            display:none !important;
        }
    }
    @media screen and (max-width:1370px) and (max-height:900px) and (orientation: landscape) {
        height:70%;
    }
`;

const LoginBox=styled.input`
  position:relative;
  border-radius:5px;
  width:95%;
  border-style:solid;
  border-width:1px;
  border-color:#D8D8D8;
  resize:none;
  padding:5px;
  margin-bottom:2%;
  margin-right:2%;
  height:50px;
  @media screen and (max-width:700px){
    width:95% !important;
  }
`;

const Submit=styled.div`
   width:95%;
   height:50px;
   border-color: #C8B0F4;
   border-style:solid;
   background-color:#C8B0F4;
   color:white;
   text-decoration:none;

  display: flex;
  align-items: center;
  justify-content: center;
  transition:.8s;
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

    @media screen and (max-width:650px){
        width:100% !important;
        margin-top:10% !important;
    }
`;

const ShadowContainer = styled.div`
  position:fixed;
  width:200%;
  height:100vh;
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
  debugger;
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
    setWebTextSecurity();
  },[]);
  window.addEventListener('resize',triggerUIChange);


  const setWebTextSecurity=()=>{
    debugger;
    var x = document.getElementById('LoginPassword');
    var style = window.getComputedStyle(x);
    if(style.webkitTextSecurity){
    }else{
        x.setAttribute("type","password");
    }
       
  }

  const inspectKeyCodeEntered=(event)=>{
    if(event.key==" "){
      event.preventDefault();
    }
  }


  return (
    <React.Fragment>
      <ShadowContainer
        onClick={()=>closeModal()}
      />
      <Container>
        <div>
          <LoginBox autocomplete="off" 
            autocorrect="off" 
            autocapitalize="off" 
            spellcheck="false" id="LoginEmail" placeholder="Email"
            onKeyPress={event=>inspectKeyCodeEntered(event)}
          />
          <LoginBox 
            autoComplete="off" 
            autoCorrect="off" 
            autoCapitalize="off" 
            spellCheck="false" 
            id="LoginPassword"
            placeholder="Password"
            style={{webkitTextSecurity:"circle"}}
          />
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
        </div>
      </Container>
    </React.Fragment>

  )
}
export{
 LoginUI,
 MobileLoginUI
};
