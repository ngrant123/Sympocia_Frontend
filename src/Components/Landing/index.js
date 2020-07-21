import React,{useState} from "react";
import styled,{keyframes} from "styled-components";
import FirstSection from "./LandingFirstSection/personalIndex.js";
import SecondSection from "./LandingSecondSection/personalIndex.js";
import ThirdSection from "./LandingThirdSection/personalIndex.js";

import CompanyFirstSection from "./LandingFirstSection/companyIndex.js";
import CompanySecondSection from "./LandingSecondSection/companyIndex.js";
import CompanyThirdSection from "./LandingThirdSection/companyIndex.js";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LandingImage from '../../designs/img/CompanySecondSection.png';


const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
`;

const ArrowPersonalContainer=styled.div`
	position:fixed;
	border-style:solid;
	border-width:2px;
	top:40%;
	padding:10px;
	animation: glowing 1300ms infinite;
	border-radius:50%;
	color:#C8B0F4;
	background-color:white;
	left:90%;
	z-index:8;
	text-align:center;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const ArrowCompanyContainer=styled.div`
	position:fixed;
	border-style:solid;
	border-width:2px;
	top:40%;
	padding:10px;
	animation: glowing 1300ms infinite;
	border-radius:50%;
	color:#C8B0F4;
	background-color:white;
	left:7%;
	z-index:8;
	text-align:center;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

/*
	We know that social media sucks. Thats why we’re building  Sympocia (highlight the word sympcia and make it redirect to official landing page) because we believe that it’’ change the way we connect forever. But that’s besides the point. We want to know how you (highlight) feel about social media platforms, any new innovations that you’ve always wanted to see come to fruition, or any fixes that you have for the current state of social media. We are giving out a total of $50 dollars right now. The rules are simple: 
	1.)Enter your email address when prompted
	2.) Leave a comment
	3.) Enjoy
	If your comment is selected you win $1. Keep on submitting comments before everyone else and you can potentially walk with an easy $20 or $30. Its simple :)   Lets get it started then 
*/
const LandingPage=(props)=>{

	const [currentPageCounter,changePageCounter]=useState(0);
	const [displayPersonalLanding,changeDisplayForPersonal]=useState(false);

	const increasePageCounter=()=>{
		debugger;
		var currentCounter=currentPageCounter;
		if(currentCounter==2){
			currentCounter=0;
		}else{
			currentCounter=currentCounter+1;
		}
		changePageCounter(currentCounter);
	}

	const decreasePageCounter=()=>{
		var currentCounter=currentPageCounter;
		if(currentPageCounter==0){
			currentCounter=0;
		}else{
			currentCounter=currentCounter-1;
		}
		changePageCounter(currentCounter);
	}

	const displaySelectedPage=(selectedPage)=>{
		changePageCounter(selectedPage);
	}

	const handleDisplayPages=()=>{
		debugger;
		if(currentPageCounter==0){
			return <FirstSection
						increaseCounter={increasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>;
		}else if(currentPageCounter==1){
			return <SecondSection
						increaseCounter={increasePageCounter}
						decreaseCounter={decreasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>;
		}else{
			return <ThirdSection
						decreaseCounter={decreasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>;
		}
	}

	return(
		<Container>
			<ul>
				{displayPersonalLanding==true?
					<React.Fragment>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<ArrowPersonalContainer onClick={()=>changeDisplayForPersonal(false)}>
								<ArrowForwardIosIcon/>
							</ArrowPersonalContainer>
						</a>

						<li style={{listStyle:"none"}}>
							<FirstSection
								increaseCounter={increasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>

						<li style={{listStyle:"none"}}>
							<SecondSection
								increaseCounter={increasePageCounter}
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>

						<li style={{listStyle:"none"}}>
							<ThirdSection
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>
					</React.Fragment>:
					<React.Fragment>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<ArrowCompanyContainer onClick={()=>changeDisplayForPersonal(true)}>
								<ArrowBackIosIcon/>
							</ArrowCompanyContainer>
						</a>

						<li style={{listStyle:"none"}}>
							<CompanyFirstSection
								increaseCounter={increasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>
						<li style={{listStyle:"none"}}>
							<img id="imageListContainer" src={LandingImage} style={{width:"40%",height:"50%"}} />
						</li>
						<li style={{listStyle:"none"}}>
							<CompanySecondSection
								increaseCounter={increasePageCounter}
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>

						<li style={{listStyle:"none"}}>
							<CompanyThirdSection
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>
					</React.Fragment>


				}
			</ul>
		</Container>
	)
}

export default LandingPage;