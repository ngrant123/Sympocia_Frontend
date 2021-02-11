import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import LandingImage from '../../../../designs/img/CompanyThirdSection.png';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {ThirdContainer} from "./LandingThirdSectionCSS.js";


import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


const InformationCard=styled.div`
  width:300px;
  height:100%;
  border-radius:5px;
  overflow-y:auto;
  border-radius:5px;
  padding:20px;
  color:#3898ec;
  z-index:5;

  @media screen and (max-width:1370px){
  	width:90% !important;
  	#informationalCardText{
  		font-size:20px !important;
  	}
  }

  @media screen and (max-width:700px){
  	width:100% !important;
  	overflow-y:visible !important;
  	overflow:visible;
  	#informationalCardText{
  		font-size:15px !important;
  	}
  }
`;


const ThirdContainerContents=styled.div`
	display:flex;
	flex-direction:row;
	height:100%;
	margin-left:10%;
	padding-left:5%;

	@media screen and (max-width:1370px){
		flex-direction:column;
		margin-left:15%;
		width:80%;

		#thirdSectionCompanyImage{
			display:none !important;
		}
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



const ThirdSection=(props)=>{
	  useEffect(()=>{
	    setTimeout(()=>{
	        const container=document.getElementById("thirdContainerCompany");
	        container.style.opacity="1";
	    },100);
	  },[]);

	return (
		<ThirdContainer id="thirdContainerCompany" style={{marginTop:"5%"}}>
			<ThirdContainerContents>
				<InformationCard>
					<p style={{fontSize:"20px",color:"#1f1f1f",borderTop:"5px solid #494949"}}>
						<b>Starting a company is similar to jumping into a lake when you don’t know how to swim.</b>
					</p>
					<p id="informationalCardText" style={{fontSize:"15px",marginTop:"3%"}}>
						You  may feel like you don’t know what you’re doing. You’re flailing around trying
						to survive and it all seems pointless.Using our platform gives
						you the necessary life vest that you absolutely need. The journey 
						doesn’t have to be lonely and now you have a group of people who 
						are doing similar things to you who can offer you advice in the field that you’re interested in. 
					</p>
				</InformationCard> 

				<img id="thirdSectionCompanyImage" src={LandingImage} style={{width:"35%",height:"80%"}}/>

				{/*
					<SectionImageContainer>	
					</SectionImageContainer>
				*/}

				<InformationCard>
					<p style={{fontSize:"20px",color:"#1f1f1f",borderTop:"5px solid #494949"}}>
						<b> I know what you’re also asking yourself. Will Sympocia also help people 
						    with established companies?
						</b>
					</p>
					<p id="informationalCardText" style={{fontSize:"15px",marginTop:"3%"}}>
						We allow you to connect with investors who
						are actually interested in the industry you’re specialized in. No more guessing 
						required. Paranoid about what you post online and if investors are going to see it? 
						We give the option of hiding certain posts from investors and only let companies in 
						you industry see it and much more 
					</p>
				</InformationCard>
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