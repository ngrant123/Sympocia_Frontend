import React,{useState,useEffect} from 'react';
import styled,{keyframes} from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

  import {

          SecondContainer,
          SecondPageHead,
          SecondPageDescrip,
          SeperationDiv,
          SecondLogin, 
          SecondPassword, 
          SecondPageLogin,
          SecondNavBarContainer, 
          SecondBottomNav, 
          SecondPageStatue,
          IndustriesCaption,
          IndustryDivContainer
        } from "./LandingSecondSectionCSS";
import INDUSTRIES from "../../../../Constants/personalIndustryConstants.js";
import LandingImage from '../../../../designs/img/SecondSectionImage.png';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const LandingPageScrollBar= styled.div`
	position:relative;
	width:20%;
	height:7%;
	left:45%;
	top:85%;
	background-color:white;
	border-style:solid;
	border-color:red;
	padding:5px;

`;


const IndustryContainer=styled.div`
	position:relative;
	background-color:white;
	width:150px;
	font-size:15px;
	height:35%;
	border-radius:5px;
	border-style:solid;
	border-widht:2px;
	border-color:#5298F8;
`;

const InformationCard=styled.div`
  position:absolute;
  width:300px;
  height:50%;
  border-radius:5px;
  overflow-y:auto;
  background-color:white;
  border-radius:5px;
  padding:20px;
  color:#3898ec;
  border-style:solid;
  border-width:2px;
  border-clor:#3898ec;
  left:15%;

  @media screen and (max-width:1370px){
    left:15% !important;
    width:400px !important;
    top:20% !important;
  }


  @media screen and (max-width:630px){
    left:5% !important;
    width:200px !important;
    top:20% !important;
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


const SecondContainerContents=styled.div`
  display:flex;
  flex-direction:row;
  @media screen and (max-width:1370px){
    flex-direction:column-reverse;
  }
`;

const SecondContainerInformational=styled.div`
  width:70%;
  height:50%;
  margin-top:5%;
  display:flex;
  flex-direction:column;
  margin-right:10%;

  @media screen and (max-width:1370px){
      width:100%;
      margin-left:0%;
    #PageHeader{
      font-size:20px !important;
    }
  }

  @media screen and (max-width:600px){
     width:90%; 
     margin-left:5%;
  }

    @media screen and (max-width:900px) and (max-height:420px) and (orientation: landscape) {
       margin-left:5%;
    }
`;


const PageImageContainer=styled.div`
  display:flex;
  flex-direction:column;
  margin-left:5%;
  @media screen and (max-width:1370px){
    margin-left:30%;
  }
  @media screen and (max-width:600px){
    margin-left:15%;
    #image{
      width:80% !important;
      height:100%!important;
    }
  }
`;


const MoreDetailsButton={
    listStyle:"none",
    display:"inline-block",
    backgroundColor:"white",
    borderRadius:"5px",
    padding:"20px",
    color:"#3898ec",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#3898ec",
    marginBottom:"5%",
    width:"60%"
}

const NumberBulletsIcon={
    listStyle:"none",
    display:"inline-block",
    backgroundColor:"white",
    borderRadius:"5px",
    color:"#3898ec",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#3898ec",
    marginBottom:"5%",
    borderRadius:"50%",
    padding:"10px"
}

const DisplayTextButton={
    ...MoreDetailsButton,
    width:"80%"
}

/*
  Something about this solution looks naive and amateurish to me 
  so later in the future i'll change it but for now it is what it is 
*/
const SecondSection=(props)=>{



  const [displayFirstBulletModal,changeFirstBulletDisplay]=useState(false);
  const [displaySecondBulletModal,changeSecondBulletDisplay]=useState(false);
  const [displayThirdBulletModal,changeThirdBulletDisplay]=useState(false);
  const [displayText,changeDisplay]=useState(false);


  useEffect(()=>{
    setTimeout(()=>{
        const container=document.getElementById("secondContainer");
        container.style.opacity="1";
    },100);
  },[]);



	return (
		     <SecondContainer id="secondContainer"> 
            <SecondContainerContents>
                <PageImageContainer>
                   <img id="image" src={LandingImage} 
                    style={{zIndex:"-5",width:"70%",height:"90%",left:"5%"}}
                   />
                </PageImageContainer>
                <SecondContainerInformational>
                  <p id="PageHeader" style={{fontSize:"50px",width:"60%",borderTop:"5px solid #494949",marginLeft:"20%"}}> 
                      <b>How are we different?</b>
                  </p>
                  <ul style={{padding:"0px",marginTop:"5%"}}> 
                      <li id="firstListContainer" style={{listStyle:"none"}}>
                          <ul style={{padding:"0px"}}>
                              <li id="firstNumberModal" style={NumberBulletsIcon}>
                                1
                              </li>
                              <li style={{listStyle:"none",display:"inline-block",width:"60%"}}>
                                <p style={{color:"#3898ec"}}>
                                  <b>New improved algorithm for images, videos, blogs, and regular posts </b>
                                </p>
                              </li>
                          </ul>
                      </li>

                      <li style={{listStyle:"none"}}>
                         <ul style={{padding:"0px"}}>
                              <li id="secondNumberModal" style={NumberBulletsIcon}>
                                2
                              </li>
                              <li style={{listStyle:"none",display:"inline-block",width:"60%"}}>
                                <p style={{marginLeft:"2%",color:"#3898ec"}}>
                                  <b>New moderator system and copyright system</b>
                                </p>
                              </li>
                          </ul>
                      </li>

                      <li style={{listStyle:"none"}}>
                         <ul style={{padding:"0px"}}>
                              <li id="thirdNumberModal" style={NumberBulletsIcon}>
                                3
                              </li>
                              <li style={{listStyle:"none",display:"inline-block",width:"60%"}}>
                                <p style={{color:"#3898ec"}}>
                                  <b>More control over posts than you ever had before</b>
                                </p>
                              </li>
                          </ul>
                      </li>
                    </ul>
                </SecondContainerInformational>
            </SecondContainerContents>

             <li id="footerIcons" style={{listStyle:"none"}}>
                <ul style={{padding:"0px"}}>
                    <li onClick={()=>props.displaySelectedPage(0)} style={{listStyle:"none",display:"inline-block"}}>
                      <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                        <RadioButtonUncheckedIcon/>
                      </a>
                    </li>

                    <li style={{listStyle:"none",display:"inline-block"}}>
                      <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                        <FiberManualRecordIcon/>
                      </a>
                    </li>

                    <li onClick={()=>props.displaySelectedPage(2)} style={{listStyle:"none",display:"inline-block"}}>
                      <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                        <RadioButtonUncheckedIcon/>
                      </a>
                    </li>
                </ul>
            </li>
         </SecondContainer>
	)
}

export default SecondSection;