import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import { 
         addCompanyId,
         updatefirstTimeUsage,
         loginCompanyPage
  } from "../../Actions/Redux/Actions/CompanyActions.js";
import {
  signInPersonalUser
} from '../../Actions/Redux/Actions/PersonalProfile';
import {loginProfile} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const Container=styled.div`
    @media screen and (max-width:600px){
        #loginBoxLI{
            display:none !important;
        }
    }
`;

const LoginBox=styled.textarea`
    position:relative;
    padding :.5em;
    width:110%;
    height:50px;
    font-size:15px;
    background-color:white;

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

    @media screen and (max-width:600px){
        width:190% !important;
        margin-left:-70% !important;
        margin-top:10% !important;
    }
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
          <li style={MobileButtonCSS} onClick ={() =>  handleLoginClick(
                                          document.getElementById("LoginEmail").value,
                                          document.getElementById("LoginPassword").value,
                                          dispatch,
                                          history
                                       )}>
                Login 
          </li>
        </a>
    </ul>
  )
}

const handleLoginClick=async(email,password,dispatch,history)=>{
  const loginResults=await loginProfile(email,password);

  if(typeof loginResults!='object'){ 
    alert(loginResults);
  }else{
    debugger;
    const {passWordIndicator,profileType,profile}=loginResults;
    const promises=[]

    promises.push(dispatch(signInPersonalUser(profile)));
    promises.push(dispatch(loginCompanyPage(false)));

    Promise.all(promises).then(result=>{
      history.push('/home');
    })
  }
}


const LoginUI=({history,displayMobileLoginTrigger})=>{
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
      <Container>
           <ul style={{padding:"0px"}}>
              <li id="loginBoxLI" style={{listStyle:"none",display:"inline-block"}}>
                  <LoginBox id="LoginEmail" placeholder="Email"/>
              </li>
              <li id="loginBoxLI" style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
                  <LoginBox id="LoginPassword" placeholder="Password"/>
              </li>
              {displayMobileLogin==true?
                <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                  <li style={{position:"relative",top:"-20px",listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
                      <Submit onClick={()=>displayMobileLoginTrigger()}>Login </Submit>
                  </li>
                </a>
                :<a href="javascript:void(0);" style={{textDecoration:"none"}}>
                  <li style={{position:"relative",top:"-20px",listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
                      <Submit onClick ={() =>  handleLoginClick(  
                                                document.getElementById("LoginEmail").value,
                                                document.getElementById("LoginPassword").value,
                                                dispatch,
                                                history
                                        )}>Login
                       </Submit>
                  </li>
                </a>
              }
          </ul>
      </Container>
  )
}
export{
 LoginUI,
 MobileLoginUI
};





