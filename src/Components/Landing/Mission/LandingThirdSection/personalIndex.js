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
  flex-direction:column;
  margin-left:10%;
  margin-top:10%;

  @media screen and (max-width:1370px){
    flex-direction:column;
    margin-left:20%;
  }

  @media screen and (max-width:650px){
    margin-left:10%;
  }

`;

const ThirdContainerInformational=styled.div`
  display:flex;
  flex-direction:row;
  margin-left:0%;
  margin-top:5%;
 	margin-right:5%;
  width:100%;
  justify-content:space-between;
  font-size:18px;
  @media screen and (max-width:1370px){
      width:90%;
      margin-left:-7%;
      font-size:20px;
      #header1{
        font-size:20px !important;
      }
  }

  @media screen and (max-width:1370px){

  	margin-left:0%;
    font-size:15px;
    flex-direction:column;
    #informationDiv{
    	width:90% !important;
    }
  }
`;


const PageImageContainer=styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:5%;
   height:50%;
  @media screen and (max-width:1370px){
  	#image{
  		height:70% !important;
  		width:70% !important;
  	}
    #amountOfUsersText{
      margin-top:7%;
      margin-left:-20% !important;
    }
  }

  @media screen and (max-width:1370px){
  	align-items:normal;
  	margin-left:15%;
    #amountOfUsersText{
      margin-top:0%;
    }
    #image{
      width:240px !important;
      height:225px!important;
    }
  }

  @media screen and (max-width:650px){
  	margin-left:0%;
  }

    @media screen and (max-width:900px) and (max-height:420px) and (orientation: landscape) {
       margin-left:20%;
      #image{
        width:192px !important;
        height:225px!important;
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

const QuestionCardsCSS={}

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
					<p style={{color:"#C8B0F4",fontSize:"24px"}}>
	                   <b>Purpose</b>
	                </p>
	                <p style={{fontSize:"36px"}}>
	                  <b>Why should you care?</b>
	                </p>
	                <ThirdContainerInformational>
	                	<div id="informationDiv" style={{width:"20%"}}>
	                		<p>
	                			<b>Addiction</b>
	                		</p>
	                		<p style={{color:"#5B5B5B"}}>
	                			Whether we like it or not, we’re all addicted to social media.
	                			We love connecting with people, learning, and growing from each other. 
	                		</p>
	                	</div>

	                	<div id="informationDiv" style={{width:"20%"}}>
	                		<p >
	                			<b>Normality</b>
	                		</p>
	                		<p style={{color:"#5B5B5B"}}>
	                			But currently we live in an era where misinformation is the new normal.
	                			Where being fake is the new normal. Where getting clout is the main goal not authenticity.
	                		</p>
	                	</div>

	                	<div id="informationDiv" style={{width:"20%"}}>
	                		<p>
	                			<b>Solution</b>
	                		</p>
	                		<p style={{color:"#5B5B5B"}}>
	                			Sympocia allows you to truly be authentic and doesn’t force you to fit into this mold that other platforms have.
								Just be yourself :) 
	                		</p>
	                	</div>
	                </ThirdContainerInformational>
                	<PageImageContainer>
			   			<img id="image" src={LandingImage} style={{borderRadius:"50%",boxShadow:"1px 1px 2px #d5d5d5",width:"427px",height:"435px"}} />
					</PageImageContainer>
					{/*
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
								in an era where misinformation is the new normal. Where being fake is the new
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
					*/}
				</ThirdContainerContents>
				{/*
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
				*/}
			</ThirdContainer>
	)
}

export default ThirdSection;