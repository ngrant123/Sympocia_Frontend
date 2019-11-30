import React from 'react';
import styled from 'styled-components';
import LandingPageScrollDiv from '../../GeneralComponents/LandingPageComponent/LandingScrollPageIndicator';
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
          SecondPageStatue

        } from "./LandingSecondSectionCSS";


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

const IndustryDivContainer=styled.div`
	position:absolute;
	overflow-y:scroll;
	width:90%;
	height:190px;
	top:60%;
	left:5%; 
	padding:20px;
	overflow:hidden;
	border-radius:5px;
	 box-shadow: 5px 5px 5px 5px #888888;
`;

const IndustryContainer=styled.div`
	position:relative;
	background-color:white;
	width:150px;
	height:130%;
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


const SecondSection=()=>{

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

                          <p>
                          	<b>Meet people in industry such as:</b>

                          </p>

                          <IndustryDivContainer>

                          	<ul>
                          		{arrayList.map(data=>
                          			<li style={{display:"inline-block",listStyle:"none",marginLeft:"10px",marginBottom:"40px"}}>

                          				<IndustryContainer>Testing</IndustryContainer>
                          			</li>
                          		)}
                 

                          	</ul>

                          </IndustryDivContainer>

                    </SecondPageDescrip>    


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