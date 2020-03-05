import React from 'react';
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



const arrayList=[
	{
		industry:"Web"

	},
	{
		industry:"Frontend"
	},
	{
		industry:"Web"

	},
	{
		industry:"Frontend"
	},
	{
		industry:"Web"

	},
	{
		industry:"Frontend"
	}

]


const SecondSection=(props)=>{

	const disableScroll=()=>{
		props.preventScroll();
	}

	const enableScroll=()=>{
		props.enableScroll()
	}
	return (
		     <SecondContainer>
                    <SecondPageStatue></SecondPageStatue>
                    

                    <SecondPageHead>

                      Why <span style={{color:"#E18DFD"}}>Sympocia</span>?

                    </SecondPageHead>

                    <SecondPageDescrip>

                          In ancient greece, a symposium was part of a banquet that took place
                          after a meal where people would celebrate play music and have a great time. Symposia's 
                          on the other hand where used to celebrate special activities and victories which
                          is what I want this platform to represent. A group of people celebrating together 
                          over crushing their goals and having a goad time.

                          <br/>
                          <br/>

                          <IndustriesCaption>
                          	<b>Meet people in industries such as:</b>

                          </IndustriesCaption>

                          <IndustryDivContainer onMouseEnter={()=>disableScroll()} onMouseLeave={()=>enableScroll()}>

                          	<ul>
                          		{INDUSTRIES.INDUSTRIES.map(data=>
                          			<li style={{display:"inline-block",listStyle:"none",marginLeft:"10px",marginBottom:"40px"}}>

                          				<IndustryContainer>{data.industry}</IndustryContainer>
                          			</li>
                          		)}
                 

                          	</ul>

                          </IndustryDivContainer>

                    </SecondPageDescrip>    


                    <ArrowDownContainer>
	                    <ExpandMoreIcon
	                  		style={{position:"absolute",left:"45%",top:"80%",color:"#C8B0F4",fontSize:200,zIndex:6}}
	                  	/>
	                </ArrowDownContainer>
                    {/*
                    <LandingPageScrollBar>

                    	<LandingPageScrollDiv 
                    		page="2"
                    	/>

                    </LandingPageScrollBar>

                    */
                    } 

                </SecondContainer>
	)
}

export default SecondSection;