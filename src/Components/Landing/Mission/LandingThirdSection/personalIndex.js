import React,{useEffect} from 'react';
import styled,{keyframes} from 'styled-components';
import img2 from '../../../../designs/background/ThirdSectionBackground.png';
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
import LandingImage from "../../../../designs/img/ThirdSectionImage.png";
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

const ThirdContainerContents=styled.div`
  display:flex;
  flex-direction:row;
  margin-left:10%;
  margin-top:10%;

  @media screen and (max-width:1370px){
    flex-direction:column;
  }

`;

const ThirdContainerInformational=styled.div`
  display:flex;
  flex-direction:column;
  margin-left:0%;
  margin-top:5%;
 	margin-right:5%;
  width:100%;
  @media screen and (max-width:1370px){
      width:90%;
      margin-left:-7%;
    #header1{
      font-size:20px !important;
    }
  }

  @media screen and (max-width:600px){
  	margin-left:0%;
  }
`;


const PageImageContainer=styled.div`
  display:flex;
  flex-direction:column;
  @media screen and (max-width:1370px){
  	#image{
  		height:70% !important;
  		width:70% !important;
  	}
  	margin-left:10%;
    #amountOfUsersText{
      margin-top:7%;
      margin-left:-20% !important;
    }
  }

  @media screen and (max-width:600px){
  	margin-left:0%;
    #amountOfUsersText{
      margin-top:0%;
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
				<ThirdContainerContents>
					<ThirdContainerInformational>
						<p id="textHeader" style={{fontSize:"40px",marginLeft:"10%",marginBottom:"5%",borderTop:"5px solid #494949"}}> 
							<b>Why should you care?</b> 
						</p>
						<p style={{marginLeft:"10%",fontSize:"20px",marginBottom:"2%",color:"#b3b3b3"}}> 
							That's the million dollar question right?
					    </p>
						<p style={{marginLeft:"10%"}}>
							Whether we like it or not, we’re all addicted to social media. We love connecting 
							with people, learning, and growing from each other. But currently we live 
							In an era where misinformation is the new normal. Where being fake is the new
							normal. Where getting clout is the main goal not authenticity. 
							Sympocia allows you to truly be authentic and doesn’t force you to fit into this 
							mold that other platforms have. 
							<br/>
							<b>
								Just be yourself :)
							</b>
						</p>

					</ThirdContainerInformational>
					<PageImageContainer>
			   			<img id="image" src={LandingImage} style={{width:"80%",height:"80%"}} />
					</PageImageContainer>
				</ThirdContainerContents>
				<li id="footerIcons" style={{listStyle:"none",marginLeft:"50%"}}>
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
			</ThirdContainer>
	)
}

export default ThirdSection;