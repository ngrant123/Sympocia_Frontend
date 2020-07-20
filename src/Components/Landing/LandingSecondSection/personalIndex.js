import React,{useState,useEffect} from 'react';
import styled,{keyframes} from 'styled-components';
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
          IndustryDivContainer
        } from "./LandingSecondSectionCSS";
import INDUSTRIES from "../../../Constants/personalIndustryConstants.js";
import LandingImage from '../../../designs/img/SecondSectionImage.png';
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
    width:"5%",
    borderRadius:"50%"
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

  /*
    const [displayText,changeDisplay]=useState(false);
    const [displayFirstText,changeDisplayFirstText]=useState(false);
    const [displaySecondText,changeDisplaySecondText]=useState(false);
  */

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

  const displayFirstBulletHandle=()=>{
    
    document.getElementById('firstNumberModal').style.borderColor="#C8B0F4";
    document.getElementById('secondNumberModal').style.borderColor="#3898ec";
    document.getElementById('thirdNumberModal').style.borderColor="#3898ec";


    changeDisplay(true);
    changeFirstBulletDisplay(true);
    changeSecondBulletDisplay(false);
    changeThirdBulletDisplay(false);
  }

const displaySecondBulletHandle=()=>{
    document.getElementById('secondNumberModal').style.borderColor="#C8B0F4";
    document.getElementById('firstNumberModal').style.borderColor="#3898ec";
    document.getElementById('thirdNumberModal').style.borderColor="#3898ec";


    changeDisplay(true);
    changeFirstBulletDisplay(false);
    changeSecondBulletDisplay(true);
    changeThirdBulletDisplay(false);
}


const displayThirdBulletHandle=()=>{
    document.getElementById('thirdNumberModal').style.borderColor="#C8B0F4";
    document.getElementById('secondNumberModal').style.borderColor="#3898ec";
    document.getElementById('firstNumberModal').style.borderColor="#3898ec";


    changeDisplay(true);
    changeFirstBulletDisplay(false);
    changeSecondBulletDisplay(false);
    changeThirdBulletDisplay(true);
}

const closeModal=()=>{
  changeDisplay(false);
  
  document.getElementById('thirdNumberModal').style.borderColor="#3898ec";
  document.getElementById('secondNumberModal').style.borderColor="#3898ec";
  document.getElementById('firstNumberModal').style.borderColor="#3898ec";
}


/*
      const closeTextModal=()=>{
      changeDisplay(false);
      changeDisplayFirstText(false);
      changeDisplaySecondText(false);
    }
*/

	return (
		     <SecondContainer id="secondContainer"> 
            <img src={LandingImage} style={{zIndex:"-5",position:"absolute",top:"-5%",width:"40%",height:"50%",left:"5%"}} />
              {displayText==true?
                   <InformationCard>
                      <ul>
                        <li style={{listStyle:"none",marginLeft:"85p%"}}>
                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <HighlightOffIcon
                              style={{fontSize:"20"}}
                              onClick={()=>closeModal()}                           
                            />
                          </a>
                        </li>

                        <li style={{listStyle:"none"}}>
                           {displayFirstBulletModal==true?
                               <p style={{color:"#C8B0F4",fontSize:"15px"}}>
                                  Each post has a specific 
                                  algorithm that is tailored to the kind of post that you are watching.
                                  We believe each posts are different and requires different ways to be consumed and made.
                                  Interested in learning more about it? We give you a more detailed 
                                  rundown when you sign up :)
                                </p>:null
                            }

                            {displaySecondBulletModal==true?
                               <p style={{color:"#C8B0F4",fontSize:"15px"}}>
                                  Our new moderator system doesn’t give  moderators absolute power. 
                                  More of a temporary power. There are rules that they have to follow 
                                  and are voted by the people in their symposiums (communities). 

                                  <br/><br/>Copyright system is also different. No personal information is 
                                  swapped between two people. If the issue isn’t resolved with a couple 
                                  days we come in and judge using fair eyes
                                </p>:null
                            }

                            {displayThirdBulletModal==true?
                               <p style={{color:"#C8B0F4",fontSize:"15px"}}>
                                      We offer the ability for you to specifically decided where your post appear 
                                      and more importantly how they appeared there. Analytics is a very important
                                      part of uploading videos to us. Don’t like a post that you posted? Edit it
                                      after you uploaded it and change the filter or anything
                                </p>:null
                            }
                        </li>
                      </ul>
                              
                </InformationCard>:null
              }
            
            <ul style={{zIndex:"2",padding:"0px",marginTop:"5%"}}>
              <li style={{listStyle:"none",height:"70%"}}>

                  <ul style={{padding:"0px"}}>
                     <li style={{listStyle:"none",display:"inline-block",width:"35%",height:"50%",marginRight:"5%",marginLeft:"40%"}}>
                              <p style={{fontSize:"50px",width:"60%",borderTop:"5px solid #494949",marginLeft:"20%"}}> 
                                  <b>How are we different?</b>
                              </p>
                              <p style={{fontSize:"20px"}}> 
                                  <b>Click on the bullets below to find out</b>
                              </p>
                              <ul style={{padding:"0px",marginTop:"5%"}}> 
                                <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                                  <li onClick={()=>displayFirstBulletHandle()} style={{listStyle:"none"}}>
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
                                </a>

                                <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                                  <li onClick={()=>displaySecondBulletHandle()} style={{listStyle:"none"}}>
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
                                </a>

                                <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                                  <li onClick={()=>displayThirdBulletHandle()} style={{listStyle:"none"}}>
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
                                </a>
                              </ul>
                      </li>
                  {/*
                    <li style={{listStyle:"none",display:"inline-block",width:"35%",height:"50%",marginRight:"5%",marginLeft:"40%"}}>
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
                  */}
                    
                    </ul>
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
                <li style={{listStyle:"none",marginTop:"5%"}}>
                    <ArrowDownContainer>
                      <ArrowDownwardIcon
                        style={{fontSize:'20'}}
                      />
                    </ArrowDownContainer>
                </li>
            </ul>

         </SecondContainer>
	)
}

export default SecondSection;