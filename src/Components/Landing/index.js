import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import FirstSection from "./Mission/LandingFirstSection/personalIndex.js";
import SecondSection from "./Mission/LandingSecondSection/personalIndex.js";
import ThirdSection from "./Mission/LandingThirdSection/personalIndex.js";
import FourthSection from "./Mission/LandingFourthSection/index.js";

import CompanyFirstSection from "./Mission/LandingFirstSection/companyIndex.js";
import CompanySecondSection from "./Mission/LandingSecondSection/companyIndex.js";
import CompanyThirdSection from "./Mission/LandingThirdSection/companyIndex.js";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LandingImageFirstCompany from '../../designs/img/CompanyFirstSection.png';
import LandingImageSecondCompany from '../../designs/img/CompanySecondSection.png';

import LandingImageFirstPersonal from '../../designs/img/FirstSectionLandingPAgeImage.png';
import LandingImageSecondPersonal from '../../designs/img/SecondSectionImage.png';
import LandingImageThirdPersonal from '../../designs/img/ThirdSectionImage.png';
import {logOutUser} from "../../Actions/Redux/Actions/PersonalProfile.js";
import {useDispatch,useSelector} from "react-redux";
import Community from "./Community/index.js";
import NavBar from "./NavBar.js";
import {LoginUI} from "./LoginImplementation.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:100%;
	height:100%;

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
	cursor:pointer;

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
	cursor:pointer;


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

const MissionCommunityChoiceContainer=styled.div`
	position:fixed;
	top:10%;
	left:2%;
	height:30%;
	width:10%;
	background-color:white;
	border-radius:5px;
	z-index:7;
	display:flex;
	flex-direction:column;
	padding:20px;
	box-shadow: 1px 1px 1px #d5d5d5;
	align-items: center;
 	justify-content: center;

 	@media screen and (max-width:1370px){
 		top:2% !important;
		height:10%;
 	}
`;


const MissionButtonContainer=styled.div`
	display:flex;
	flex-direction:column;
	align-items: center;
 	justify-content: center;
 	cursor:pointer;
`;

const CommunityButtonContainer=styled.div`
	display:flex;
	flex-direction:column;
	align-items: center;
 	justify-content: center;
 	cursor:pointer;
`;

const ChoicesContainer=styled.div`
	position:fixed;
	height:50%;
	background-color:white;
	z-index:12;
	top:20%;
	border-radius:5px;
	width:30%;
	left:35%;
	padding:40px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}
`;


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;
const SignUpButton={
    listStyle:"none",
    display:"inline-block",
    backgroundColor:"#3898ec",
    borderRadius:"5px",
    padding:"10px",
    color:"white",
    marginRight:"2%",
    width:"80px",
    cursor:"pointer"
}

const LoginButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}


const LandingPage=(props)=>{
	const [currentPageCounter,changePageCounter]=useState(0);
	const [displayPersonalLanding,changeDisplayForPersonal]=useState(true);
	const [displayMissionPage,changeDisplayMissionPage]=useState(true);
	const [displayMobileUI,changeDisplayMobileUI]=useState(false);
	const [displayMobilePageChoicesModal,changeMobilePageChoicesModal]=useState(false);
	const [displayLoginModal,changeDisplayLoginModal]=useState(false);

	const dispatch=useDispatch();
	
	const isLoggedIn=useSelector(state=>state.personalInformation.loggedIn);
	const ownerId=useSelector(state=>state.personalInformation.id);

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeDisplayMobileUI(true); 
		}else{
			changeDisplayMobileUI(false);
		}
	}

	useEffect(()=>{
		
		const {history}=props;
		
		if(history.location.pathname=='/logout'){
			dispatch(logOutUser());
			history.push('/');
		}else if(isLoggedIn==true && ownerId!=""){
			history.push('/home');
		}
		triggerUIChange()
	},[])

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
	const displayMissionPageFromMobile=()=>{
		changeDisplayMissionPage(true)
		changeMobilePageChoicesModal(false)
	}

	const displaySympociaCommunityFromMobile=()=>{
		changeDisplayMissionPage(false)
		changeMobilePageChoicesModal(false)
	}

	const MissionAndCommunityChoiceContainer=()=>{
		return <>
					{displayMobilePageChoicesModal==true &&(
						<>
							<ChoicesContainer>
								<p onClick={()=>displayMissionPageFromMobile()} style={{cursor:"pointer"}}>
									<b>Our Mission</b>
								</p>
								<hr/>
								<p onClick={()=>alert('Sympocia Community Coming Soon')} style={{cursor:"pointer"}}>	
									<b> Sympocia Community</b>
							    </p>
							</ChoicesContainer>
							<ShadowContainer 
								onClick={()=>changeMobilePageChoicesModal(false)}
							/>
						</>
					)}
				</>
	}

	const displayCommunityMissionOption=()=>{
		changeMobilePageChoicesModal(true);
	}
	const displayLoginModalHandle=()=>{
		changeDisplayLoginModal(true);
	}

	const closeLoginModal=()=>{
		changeDisplayLoginModal(false);
	}


	return(
		<Container>
			{MissionAndCommunityChoiceContainer()}
			<NavBar
				displayCommunityMissionOption={displayCommunityMissionOption}
				history={props.history}
				displayLoginModalHandle={displayLoginModalHandle}
			/>
			{displayLoginModal &&(
				<LoginUI
					history={props.history}
					closeModal={closeLoginModal}
				/>
			)}

			{displayMissionPage==true?
				<>
					{displayPersonalLanding==true?
						<React.Fragment>
							{/*
								<ArrowPersonalContainer onClick={()=>changeDisplayForPersonal(false)}>
									<ArrowForwardIosIcon/>
								</ArrowPersonalContainer>
							*/}

							<FirstSection
								increaseCounter={increasePageCounter}
								displaySelectedPage={displaySelectedPage}
								history={props.history}
							/>
							<SecondSection
								increaseCounter={increasePageCounter}
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
							<ThirdSection
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
							<FourthSection
								history={props.history}
							/>

						</React.Fragment>:
						<React.Fragment>
							{/*
								<ArrowCompanyContainer onClick={()=>changeDisplayForPersonal(true)}>
									<ArrowBackIosIcon/>
								</ArrowCompanyContainer>
							*/}
							<CompanyFirstSection
								increaseCounter={increasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
							<CompanySecondSection
								increaseCounter={increasePageCounter}
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
							<CompanyThirdSection
								decreaseCounter={decreasePageCounter}
								displaySelectedPage={displaySelectedPage}
								props={props}
							/>
							<FourthSection/>
						</React.Fragment>
					}
				</>:
				<Community
				/>
			}
		</Container>
	)
}

export default LandingPage;