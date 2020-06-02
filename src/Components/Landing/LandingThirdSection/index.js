import React,{useEffect} from 'react';
import styled from 'styled-components';
import img2 from '../../../designs/background/ThirdSectionBackground.png';
import LandingPageScrollDiv from '../../GeneralComponents/LandingPageComponent/LandingScrollPageIndicator';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typed from "react-typed";
import {
	ThirdContainer,
	LandingPageScrollBar,
	HeaderTitleContainer,
	ArrowDownContainer,
	InformationBubble1,
	InformationContainer
} from "./LandingThirdSectionCSS.js";
import NavBar from "../NavBarImplementation.js";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import LandingImage from "../../../designs/img/ThirdSectionImage.png";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const SpanCssStyle={
	color:"white",
	backgroundColor:"#E18DFD",
	borderRadius:"5px",
	padding:"5px"
}

const InformationCard=styled.div`
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

`;

const ExploreButton={
  listStyle:"none",
  marginTop:"20%",
  marginLeft:"15%",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"20px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const QuestionCardsCSS={

}

const ThirdSection=(props)=>{

	useEffect(()=>{
	    setTimeout(()=>{
	        const container=document.getElementById("thirdContainer");
	        container.style.opacity="1";
	    },100);
	  },[]);
	return(
			<ThirdContainer id="thirdContainer">
			    <img src={LandingImage} style={{zIndex:"-5",left:"65%",position:"absolute",top:"-5%",width:"40%",height:"60%"}} />
				<ul style={{padding:"50px"}}>
					<li style={{listStyle:"none",marginLeft:"50%",position:"relative",top:"10px"}}>
		                <NavBar 
		                  props={props}
		                />
		            </li>
		            <li style={{listStyle:"none"}}>
		            	<ul style={{padding:"0px"}}>
		            		<li style={{listStyle:"none"}}>
									<p style={{fontSize:"40px",marginLeft:"10%",marginBottom:"2%"}}> 
										<b>Heres a more in depth look at what we are trying to accomplish if you're not convinced yet</b> 
									</p>
								</li>
								<p style={{marginLeft:"25%",fontSize:"20px",marginBottom:"2%",color:"#b3b3b3"}}> Click the cards below to learn about what we are doing here at Sympocia </p>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"10%",marginLeft:"5%"}}>
											<InformationCard style={{marginRight:"5%",marginLeft:"10%"}}>
												<ul style={{padding:"0px"}}>
															<p style={{fontSize:"20px",color:"#3898ec"}}><b>New improved algorithm for images, videos, blogs, and regular posts</b> </p>
															<p style={{color:"#C8B0F4",fontSize:"15px"}}>
																Each post has a specific 
																algorithm that is tailored to the kind of post that you are watching.
																We believe each posts are different and requires different ways to be consumed and made.
																Interested in learning more about it? We give you a more detailed 
																rundown when you sign up :)
															</p>
													
												</ul>
											</InformationCard>
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
											<InformationCard>
												<ul style={{padding:"0px"}}>
														<p style={{marginLeft:"2%",color:"#3898ec",fontSize:"20px"}}><b>New moderator system and copyright system</b> </p>
														<p style={{color:"#C8B0F4",fontSize:"15px"}}> 
															Our new moderator system doesn’t give  moderators absolute power. 
															More of a temporary power. There are rules that they have to follow 
															and are voted by the people in their symposiums (communities). 

															<br/><br/>Copyright system is also different. No personal information is 
															swapped between two people. If the issue isn’t resolved with a couple 
															days we come in and judge using fair eyes


														</p>

												</ul>
											</InformationCard>
										</li>

										<li style={{listStyle:"none",display:"inline-block"}}>
											<InformationCard>
												<ul style={{padding:"0px"}}>
														<p style={{color:"#3898ec",fontSize:"20px"}}><b>More control over posts than you ever had before</b> </p>
														<p style={{color:"#C8B0F4",fontSize:"15px"}}> 
															We offer the ability for you to specifically decided where your post appear 
															and more importantly how they appeared there. Analytics is a very important
															part of uploading videos to us. Don’t like a post that you posted? Edit it
															after you uploaded it and change the filter or anything
														</p>
													
												</ul>
											</InformationCard>
										</li>
									</ul>
								</li>
		            	</ul>
		            </li>
					<li style={{listStyle:"none",marginLeft:"50%",marginTop:"2%"}}>
	                    <ul style={{padding:"0px"}}>
	                        <li onClick={()=>props.displaySelectedPage(0)} style={{listStyle:"none",display:"inline-block"}}>
	                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
	                            <RadioButtonUncheckedIcon/>
	                          </a>
	                        </li>

	                        <li onClick={()=>props.displaySelectedPage(1)} style={{listStyle:"none",display:"inline-block"}}>
	                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
	                            <RadioButtonUncheckedIcon/>
	                          </a>
	                        </li>

	                        <li style={{listStyle:"none",display:"inline-block"}}>
	                          <a href="javascript:void(0);" style={{textDecoration:"none"}}>
	                            <FiberManualRecordIcon/>
	                          </a>
	                        </li>
	                    </ul>
	                </li>
				</ul>	
			</ThirdContainer>
	)
}

export default ThirdSection;