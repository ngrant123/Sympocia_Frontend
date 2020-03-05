import React from 'react';
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

                <InformationContainer>

	                <ul style={{position:"relative",paddingLeft:"5%",top:"35%"}}>
	                
			            <li style={{listStyle:"none",display:"inline-block",marginLeft:"2%",marginBottom:"1%"}}>
			        			<InformationBubble1>
			        					<p style={{fontSize:"130%"}}><b>Startups</b></p>
					                	Meet great and inspiring <span style={SpanCssStyle}> startups </span> who are eager to break out and take over the industry with you. 
					                	Learn from companies who are more experienced and build and grow. <span style={SpanCssStyle}>There is enough money to go around
					                	for everyone.</span>

			        			</InformationBubble1>
			            </li>
			            <li style={{listStyle:"none",display:"inline-block",marginLeft:"2%",marginBottom:"5%"}}>
			        			<InformationBubble1>
			        				<p style={{fontSize:"130%"}}><b>Friends</b></p>
	                				Get introduced to people who you normally wouldnt meet. <span style={SpanCssStyle}>Smart, motivated, and similar-minded people.</span>
	                				Create lasting friendships and  strive for a greater purpose. Or just have fun with the <span style={SpanCssStyle}>journey.</span>


			        			</InformationBubble1>
			            </li>

			            <li style={{position:"relative",top:"-65px",listStyle:"none",display:"inline-block",marginLeft:"2%",marginBottom:"2%",paddingBottom:"70%"}}>

			        			<InformationBubble1>
					        		<p style={{fontSize:"130%"}}><b>Investors</b></p>
				                	Connect with <span style={SpanCssStyle}>investors</span>
				                	who are interested in investing in the industry you specialize in.
				                	<span style={SpanCssStyle}>No more guessing required see who's interested when and where.</span>



			        			</InformationBubble1>
			            </li>


		             </ul>
	            </InformationContainer>

	            <ArrowDownContainer>

	                 <ExpandLessIcon
	                  		style={{position:"absolute",left:"45%",top:"80%",color:"#C8B0F4",fontSize:200,zIndex:6}}
	                  	/>
	            </ArrowDownContainer>


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