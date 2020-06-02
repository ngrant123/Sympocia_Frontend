import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import LandingPageScrollDiv from '../../GeneralComponents/LandingPageComponent/LandingScrollPageIndicator';
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
          IndustryDivContainer,
          ArrowDownContainer
        } from "./LandingSecondSectionCSS";
import INDUSTRIES from "../../../Constants/personalIndustryConstants.js";
import LandingImage from '../../../designs/img/SecondSectionImage.png';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import NavBar from "../NavBarImplementation.js";

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


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

const DisplayTextButton={
    ...MoreDetailsButton,
    width:"80%"
}

const SecondSection=(props)=>{

  const [displayText,changeDisplay]=useState(false);
  const [displayFirstText,changeDisplayFirstText]=useState(false);
  const [displaySecondText,changeDisplaySecondText]=useState(false);

  useEffect(()=>{
    setTimeout(()=>{
        const container=document.getElementById("secondContainer");
        container.style.opacity="1";
    },100);
  },[]);

  const displayFirstTextHandle=()=>{
    changeDisplay(true);
    changeDisplayFirstText(true);
    changeDisplaySecondText(false);
  }

  const displaySecondTextHandle=()=>{
    changeDisplay(true);
    changeDisplaySecondText(true);
    changeDisplayFirstText(false);
  }

  const closeTextModal=()=>{
    changeDisplay(false);
    changeDisplayFirstText(false);
    changeDisplaySecondText(false);
  }

	return (
		     <SecondContainer id="secondContainer"> 
            <img src={LandingImage} style={{zIndex:"-5",position:"absolute",top:"20%",width:"40%",height:"50%"}} />
            <ul style={{zIndex:"2",padding:"0px",marginTop:"5%"}}>
              <li style={{listStyle:"none",marginLeft:"50%",position:"relative",top:"-60px"}}>
                <NavBar 
                  props={props}
                />
              </li>
              <li style={{listStyle:"none",height:"70%"}}>
                        <li onClick={()=>props.increaseCounter()} style={{listStyle:"none",display:"inline-block"}}>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <ArrowBackIosIcon style={{marginRight:"3%"}}/>
                          </a>
                        </li>
                    
                    <li style={{listStyle:"none",display:"inline-block",width:"35%",height:"50%",marginRight:"5%"}}>
                            <p style={{fontSize:"50px"}}> 
                                <b>Where did the name Sympocia come from?</b>
                            </p>
                            <p>
                              In ancient greece, a symposium was part of a banquet that took place
                              after a meal where people would celebrate play music and have a great time. Symposia's 
                              on the other hand where used to celebrate special activities and victories which
                              is what I want this platform to represent. A group of people celebrating together 
                              over crushing their goals and having a goad time.
                            </p>
                    </li>

                    <li style={{width:"40%",height:"80%",listStyle:"none",display:"inline-block",position:"relative",top:"-80px",marginLeft:"7%"}}> 
                        <ul style={{padding:"0px"}}>
                            <p>Here are some question we hope describe the platform better</p>
                            <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                              <li onClick={()=>displayFirstTextHandle()} style={MoreDetailsButton}>
                                  What is this platform?
                              
                              </li>
                            </a>

                            <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                              <li onClick={()=>displaySecondTextHandle()} style={MoreDetailsButton}>
                                  What from the surface level are we doing different?
                              </li>
                            </a>
                            
                            {displayText==true?
                              <li style={DisplayTextButton}>
                                  <li  onClick={()=>closeTextModal()} style={{listStyle:"none"}}>
                                    <HighlightOffIcon
                                      style={{marginLeft:"70%"}}
                                    />
                                  </li>
                                    {displayFirstText==true?
                                      <p>
                                        Our main goal for this platform is to make you feel like you're the priority.
                                        A place where authenticity is the main goal not the amount of likes or views. Connect
                                        with people who you are actually interested in being friends with and finally have a place
                                        where you're comfortable to be you.
                                      </p>:
                                      <React.Fragment>
                                      <p>How are we different? You've asked and here are the answeres:</p>
                                          <ul>
                                            <li>
                                              No like count
                                            </li>
                                            <li>
                                              No followers count
                                            </li>
                                            <li>
                                              A better algorithm for videos that we believe always you're videos to get the views
                                              and attention is deserves (plus we let you know what it is)
                                            </li>
                                            <li>
                                              Improved home algorithm that actually shows you what you're interested in instead of showing you 
                                              ads and random stuff
                                            </li>
                                            <li>
                                              More control over your posts and where its going and whos seeing it
                                            </li>
                                          </ul>
                                      </React.Fragment>
                                    }
                              </li>:<React.Fragment></React.Fragment>
                            }
                        </ul>
                    </li>
                    <li onClick={()=>props.increaseCounter()} style={{listStyle:"none",display:"inline-block"}}>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <ArrowForwardIosIcon/>
                          </a>
                    </li>
                </li>
                <li style={{listStyle:"none"}}>
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
            </ul>

         </SecondContainer>
	)
}

export default SecondSection;