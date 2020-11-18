import React,{useEffect} from 'react';
import styled,{keyframes} from 'styled-components';
import img2 from '../../../designs/background/ThirdSectionBackground.png';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typed from "react-typed";
import {
	ThirdContainer,
	LandingPageScrollBar,
	HeaderTitleContainer,
	InformationBubble1,
	InformationContainer
} from "./LandingThirdSectionCSS.js";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import LandingImage from "../../../designs/img/ThirdSectionImage.png";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';



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
			    <img id="imageListContainer" src={LandingImage} style={{zIndex:"-5",left:"65%",position:"absolute",top:"-10%",width:"40%",height:"60%"}} />
				<ul id="textULContainer" style={{padding:"50px"}}>
		            <li id="textContainer" style={{listStyle:"none"}}>
		            	<ul style={{padding:"0px"}}>
		            			<li style={{listStyle:"none"}}>
									<p id="textHeader" style={{fontSize:"40px",marginLeft:"10%",width:"30%",marginBottom:"2%",borderTop:"5px solid #494949"}}> 
										<b>Why should you care?</b> 
									</p>
								</li>
								<p style={{marginLeft:"10%",fontSize:"20px",marginBottom:"2%",color:"#b3b3b3"}}> 
									That's the million dollar question right?
							    </p>
								<li id="thirdSectionText" style={{listStyle:"none",width:"50%",marginLeft:"10%",lineheight:"200%"}}>
									<p>
										Whether we like it or not, we’re all addicted to social media. We love connecting 
										with people, learning, and growing from each other. But currently we live 
										In an era where misinformation is the new normal. Where being fake is the new
										normal. Where getting clout is the main goal not authenticity. 
										Sympocia allows you to truly be authentic and doesn’t force you to fit into this 
										mold that other platforms have. 
										<br/>
										<span style={{padding:"5px",borderRadius:"5px",color:"white",backgroundColor:"#3898ec"}}>
											Just be yourself :)
										</span>
									</p>
								</li>
		            	</ul>
		            </li>
					<li id="footerIcons" style={{listStyle:"none",marginLeft:"50%",marginTop:"15%"}}>
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
	                <li style={{listStyle:"none",marginTop:"5%",marginLeft:"50%"}}>
	                    <ArrowDownContainer>
	                      <ArrowDownwardIcon
	                        style={{fontSize:'20'}}
	                      />
	                    </ArrowDownContainer>
	                </li>
				</ul>	
			</ThirdContainer>
	)
}

export default ThirdSection;