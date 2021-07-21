import React,{useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const SignUpLoginContainer=styled.div`
	display:flex;
	flex-direction:row;

  @media screen and (max-width:650px){
    margin-top:5%;
  }
`;

const NavBarContainer=styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
  padding:50px;
  box-shadow:1px 1px 1px #d5d5d5;

  @media screen and (max-width:1370px){
  	#signUpButton{
  		display:none !important;
  	}
  	#forgotPassword{
  		display:none !important;
  	}
  }

	@media screen and (max-width:650px){
		#signUpButton{
			display:block !important;
		}

    flex-direction:column;
    padding:0px;
    margin-left:5%;
    #forgotPassword{
    	display:none !important;
    }
    padding:30px;
    width:90%;
    box-shadow:none;
  }
`;

const SignUpButton={
    listStyle:"none",
    display:"inline-block",
    backgroundColor:"#3898ec",
    borderRadius:"5px",
    padding:"10px",
    color:"white",
    marginRight:"2%",
    width:"80px",
    cursor:"pointer",
    textAlign:"center"
}

const LoginButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}


const LandingPageNavBar=({isMissionPage,displayCommunityMissionOption,history,displayLoginModalHandle})=>{
	const [displayMissionPage,changeDisplayMissionPage]=useState(true);
	//<p style={{color:displayMissionPage==false?"#5298F8":"#A4A4A4"}}>
	const communityButton=()=>{
		return <svg onClick={()=>displayCommunityMissionOption()}
				style={{cursor:"pointer",borderRadius:"50%",boxShadow:"1px 1px 10px #d5d5d5",padding:"5px"}} 
				xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-yin-yang" width="44" height="44" 
				viewBox="0 0 24 24" stroke-width="1.5" stroke="#5298F8"
				 fill="none" stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M12 3a4.5 4.5 0 0 0 0 9a4.5 4.5 0 0 1 0 9" />
				  <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
				  <circle cx="12" cy="16.5" r=".5" fill="currentColor" />
			</svg>
	}

	const missionButton=()=>{
		return <svg onClick={()=>displayCommunityMissionOption()}
				style={{cursor:"pointer",borderRadius:"50%",boxShadow:"1px 1px 10px #d5d5d5",padding:"5px"}} 
				xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rocket" width="44" 
				height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5298F8"
				 fill="none" stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
				  <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
				  <circle cx="15" cy="9" r="1" />
			</svg>
	}
	return (
		<NavBarContainer>
        <p onClick={()=>history.push({pathname:'/'})} style={{cursor:"pointer",fontSize:"30px",color:"#C8B0F4"}}>
            <b>Sympocia</b>
        </p>
        {isMissionPage==true?
        	<>{missionButton()}</>:
        	<>{communityButton()}</>
       	}
        <SignUpLoginContainer>
        	<p id="forgotPassword" onClick={()=>history.push({pathname:'/emailreset'})} 
        		style={{cursor:"pointer",color:"#5298F8"}}>
        		Forgot Password? 
        	</p>
        	<div id="signUpButton" onClick={()=>history.push({pathname:'/signup'})}style={SignUpButton}>
        		Sign Up
        	</div>
        	<div onClick={()=>displayLoginModalHandle()}style={LoginButton}>
        		Login
        	</div>
        </SignUpLoginContainer>
    </NavBarContainer>
	)
}

export default LandingPageNavBar;