import React from 'react';
import styled from 'styled-components';
import img2 from '../../../designs/background/SecondPageBackground.png';
import LandingPageScrollDiv from '../../GeneralComponents/LandingPageComponent/LandingScrollPageIndicator';


const FifthContainer=styled.div`
 position:relative;
  width:100%;
  height:100%;

  background-image:url(${img2});
  background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
  text-align:center;
  background-size: contain
  margin:auto;
  padding:0;

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

const ThirdSection=()=>{


	return(

			<FifthContainer>

				<LandingPageScrollBar>

					<LandingPageScrollDiv
						page="5"

					/>
				</LandingPageScrollBar>
			
			</FifthContainer>

	)
}

export default ThirdSection;