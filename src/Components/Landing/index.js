import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import FirstSection from "./LandingFirstSection/personalIndex.js";
import SecondSection from "./LandingSecondSection/personalIndex.js";
import ThirdSection from "./LandingThirdSection/personalIndex.js";
import FourthSection from "./LandingFourthSection/index.js";

import CompanyFirstSection from "./LandingFirstSection/companyIndex.js";
import CompanySecondSection from "./LandingSecondSection/companyIndex.js";
import CompanyThirdSection from "./LandingThirdSection/companyIndex.js";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LandingImageFirstCompany from '../../designs/img/CompanyFirstSection.png';
import LandingImageSecondCompany from '../../designs/img/CompanySecondSection.png';

import LandingImageFirstPersonal from '../../designs/img/FirstSectionLandingPAgeImage.png';
import LandingImageSecondPersonal from '../../designs/img/SecondSectionImage.png';
import LandingImageThirdPersonal from '../../designs/img/ThirdSectionImage.png';
import {logOutUser} from "../../Actions/Redux/Actions/PersonalProfile.js";
import {useDispatch,useSelector} from "react-redux";


const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	overflow-x:hidden;

	@media screen and (max-width:650px){
		#mobileImageContainer1{
			visibility:visible;
			display:block;
		}

		#mobileImage1{
			width:80%;
			height:50%;
		}
		#mobileImageSecondCompany{
				width:80%;
				height:50%;
			}

		#mobileImageFirst{
			width:80%;
			height:50%;
		}
		
		#mobileImage2{
			width:80%;
			height:50%;
			margin-top:-40%;
		}
		#companyFourthSection{
			margin-top:90% !important;
		}

	}

	@media screen and (max-width:580px){
		#companyFourthSection{
			margin-top:190% !important;
		}
	}



	@media screen and (max-width:550px){
		#mobileImageFirst{
			margin-top:50% !important;
		}	
		#companyFourthSection{
			margin-top:210% !important;
		}
	}

	@media screen and (max-width:490px){
		#mobilePersonal1{
			margin-top:200% !important;
		}	
	}

	@media screen and (max-width:420px){
		#mobilePersonal1{
			margin-top:230% !important;
		}	
	}

	@media screen and (max-width:380px){
		#mobilePersonal1{
			margin-top:370% !important;
		}	
		#mobileImageFirst{
				margin-top:80% !important;
		}

		#mobileImageSecondCompany{
				margin-top:80% !important;
			}

		#mobileImageContainer2{
			margin-top:30% !important;
			margin-bottom:-40% !important;
		}
		#companyFourthSection{
			margin-top:270% !important;
		}
	}

	@media screen and (max-width:330px){
		#mobilePersonal1{
			margin-top:350% !important;
		}	
	}

	@media screen and (max-height:700px){
			#mobileImageFirst{
				margin-top:20%;
			}
	}
	@media screen and (max-height:640px){
			#mobileImageFirst{
				margin-top:40%;
			}
			#mobileImageSecondCompany{
				margin-top:40%;
				margin-bottom:20%;
			}
	}

	@media screen and (max-height:520px){
			#mobileImageFirst{
				margin-top:60%;
			}
	}
	@media screen and (max-height:430px){
			#mobileImageFirst{
				margin-top:90%;
				height:90%;
			}

			#secondSection{
				margin-top:-20%;
			}
	}

	@media screen and (max-height:430px){
			#mobileImageContainer2{
				margin-top:20%;
			}
			#mobileImage1{
				height:80%;
			}

	}

	@media screen and (max-height:400px){
			#mobileImageFirst{
				margin-top:90%;
				height:90%;
			}

			#secondSection{
				margin-top:-20%;
			}
	}
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

const ImageContainer=styled.div`
	display:none;
`;

const ImageOverlay=styled.div`
	position:absolute;
	z-index:5;
	width:80%;
	height:50%;
	border-radius:50%;
`;

/*

	Right now im setting it up so that when the breakpoints are reached then I add the 
	mobileImageContainer, which are images from the previous sections. I should figure out 
	how to make it so that when the breakpoints come then the image turns into a block style
	instead of the inline-block style that it is right now

*/
const LandingPage=(props)=>{

	const [currentPageCounter,changePageCounter]=useState(0);
	const [displayPersonalLanding,changeDisplayForPersonal]=useState(true);
	const dispatch=useDispatch();
	debugger;
	const isLoggedIn=useSelector(state=>state.personalInformation.loggedIn);
	useEffect(()=>{
		const {history}=props;
		console.log(history);
		
		if(history.location.pathname=='/logout'){
			dispatch(logOutUser());
		}else if(isLoggedIn==true){
			history.push('/home');
		}
	})

	const increasePageCounter=()=>{
		
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

						<li id="firstSection" style={{listStyle:"none"}}>
							<FirstSection
								increaseCounter={increasePageCounter}
								displaySelectedPage={displaySelectedPage}
								history={props.history}
							/>
						</li>
						<li  style={{zIndex:"-5",listStyle:"none"}}>
							<ImageContainer id="mobileImageContainer1">
								<img id="mobileImageFirst" src={LandingImageFirstPersonal}/>	
							</ImageContainer>
						</li>

						<li id="secondSection" style={{listStyle:"none"}}>
							<SecondSection
								increaseCounter={increasePageCounter}
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>
						<ImageContainer id="mobileImageContainer1">
							<li  id="mobileImageContainer2" style={{listStyle:"none"}}>
								<img id="mobileImage1" src={LandingImageSecondPersonal}/>
							</li>
						</ImageContainer>

						<li style={{listStyle:"none"}}>
							<ThirdSection
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>
						<li style={{zIndex:"-5",listStyle:"none"}}>
							<ImageContainer id="mobileImageContainer1">
								<li id="mobilePersonal1" style={{listStyle:"none",marginTop:"150%"}}>
									<img id="mobileImage1" src={LandingImageThirdPersonal}/>
								</li>
							</ImageContainer>
						</li>
						<li id="fourthSectionLI" style={{marginTop:"50%",listStyle:"none"}}>
							<FourthSection/>
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

						<ImageContainer id="mobileImageContainer1">
							<li  style={{listStyle:"none"}}>
								<img id="mobileImageFirst" src={LandingImageFirstCompany}/>
							</li>
						</ImageContainer>

						<li style={{listStyle:"none"}}>
							<CompanySecondSection
								increaseCounter={increasePageCounter}
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>

						<ImageContainer id="mobileImageContainer1">
							<li  style={{marginTop:"-230px",listStyle:"none"}}>
								<img id="mobileImageSecondCompany" src={LandingImageSecondCompany}/>
							</li>
						</ImageContainer>

						<li style={{listStyle:"none",padding:"20px",marginTop:"20%"}}>
							<CompanyThirdSection
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
						</li>
						<li id="companyFourthSection" style={{marginTop:"10%",listStyle:"none"}}>
							<FourthSection/>
						</li>
					</React.Fragment>
				}
			</ul>
		</Container>
	)
}

export default LandingPage;