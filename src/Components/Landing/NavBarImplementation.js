import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import { 
         addCompanyId,
         updatefirstTimeUsage,
         loginCompanyPage
  } from "../../Actions/Redux/Actions/CompanyActions.js";
import {
	addName,
	addLastName,
	addEmail,
  addPersonalIdentificationId,
  loginPersonalPage
} from '../../Actions/Redux/Actions/PersonalProfile';
import {loginProfile} from "../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";


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

const NavBar=(props)=>{
	const dispatch=useDispatch();
  console.log(props);
	var {props}=props.props;
	const handleLoginClick=async(event,props,dispatch)=>{
		debugger;
	  event.preventDefault();
	  const email=document.getElementById("LoginEmail").value;
	  const password=document.getElementById("LoginPassword").value;
	  const loginResults=await loginProfile(email,password);
	
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


	return (
      <ul style={{padding:"0px"}}>
        <li style={{listStyle:"none",display:"inline-block"}}>
            <LoginBox id="LoginEmail" placeholder="Email"></LoginBox>
        </li>
        <li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
            <LoginBox id="LoginPassword" placeholder="Password"></LoginBox>
        </li>
        <li style={{position:"relative",top:"-20px",listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
            <Submit onClick = {e =>  handleLoginClick(e,props,dispatch)} to="/profile">Login </Submit>
        </li>
      </ul>
	)
}
export default NavBar;





