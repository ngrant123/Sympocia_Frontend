import React from 'react';
import styled from 'styled-components';
import img2 from '../../../designs/background/ThirdSectionBackground.png';
import LandingPageScrollDiv from '../../GeneralComponents/LandingPageComponent/LandingScrollPageIndicator';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typed from "react-typed";


const ThirdContainer=styled.div`
 position:absolute;
  width:100%;
  height:100%;

  background-image:url(${img2});
  background-size: cover; /* or contain depending on what you want */
  background-repeat: no-repeat;

`;


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

const HeaderTitleContainer= styled.div`
	position:absolute;
	color:white;
	width:60%;
	height:20%;
	top:10%;
	left:20%;
	font-size:80px;



`;


const InformationBubble1= styled.div`
	position:absolute;
	border-radius:5px;
	width:20%;
	height:30%;
	top:45%;
	left:10%;
	color:white;
	font-size:160%;



`;

const InformationBubble2= styled.div`
	position:absolute;
	border-radius:5px;
	width:23%;
	height:30%;
	top:45%;
	transition:.8s;
	left:40%;
	color:white;
	font-size:160%;

`;


const InformationBubble3= styled.div`
	position:absolute;
	border-radius:5px;
	width:20%;
	height:30%;
	top:45%;
	left:70%;
	color:white;
	font-size:160%;


`;

const SpanCssStyle={
	color:"white",
	backgroundColor:"#E18DFD",
	borderRadius:"5px",
	padding:"5px"
}


const ThirdSection=()=>{


	return(

			<ThirdContainer>

				<HeaderTitleContainer>

					<b> Meet  <Typed 
		                    strings={['investors' ,
		                    'similar-minded startups',
		                    'a supportive group of friends']} 
		                    typeSpeed={110} 
		                    backSpeed={30} />
		            </b>

                </HeaderTitleContainer>

                <InformationBubble1>
                	<p style={{fontSize:"130%"}}><b>Investors</b></p>
	                	Connect with <span style={SpanCssStyle}>investors</span>
	                	who are interested in investing in the industry you specialize in.
	                	<span style={SpanCssStyle}>No more guessing required see who's interested when and where.</span>

                </InformationBubble1>

                <InformationBubble2>
                	<p style={{fontSize:"130%"}}><b>Startups</b></p>
                	Meet great and inspiring <span style={SpanCssStyle}> startups </span> who are eager to break out and take over the industry with you. 
                	Learn from companies who are more experienced and build and grow. <span style={SpanCssStyle}>There is enough money to go around
                	for everyone.</span>
                	
                </InformationBubble2>


                <InformationBubble3>
                	<p style={{fontSize:"130%"}}><b>Friends</b></p>
                	Get introduced to people who you normally wouldnt meet. <span style={SpanCssStyle}>Smart, motivated, and similar-minded people.</span>
                	Create lasting friendships and  strive for a greater purpose. Or just have fun with the <span style={SpanCssStyle}>journey.</span>

                	
                </InformationBubble3>

                 <ExpandLessIcon
                  		style={{position:"absolute",left:"45%",top:"80%",color:"#C8B0F4",fontSize:200,zIndex:6}}
                  	/>


				{/*
					<LandingPageScrollBar>

						<LandingPageScrollDiv
							page="3"

						/>
					</LandingPageScrollBar>
				*/}
			
			</ThirdContainer>

	)
}

export default ThirdSection;