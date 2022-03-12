import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

import BeaconFeaturePageOnboarding from "../../designs/img/BeaconFeaturePageOnboarding.png";
import SymposiumCommunityFeaturePageOnboarding from "../../designs/img/SymposiumCommunityFeaturePageOnboarding.png";
import UniversitySpecialistsOnboarding from "../../designs/img/UniversitySpecialistsOnboarding.png";
import UniversityResourcesOnboarding from "../../designs/img/UniversityResourcesOnboarding.png";

import {completeOnboardingSymposiumFeaturesPage} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:50;
	left:30%;
	top:20%;
	overflow-y:auto;

	@media screen  and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70% !important;
		 #beaconsImage{
    		width:60% !important;
    		height:20% !important;
    	}

		#closeOptionIconLI{
			display:none !important;
		}

		#firstOnboardingImage{
			height:20% !important;
		}
    }

    @media screen and (max-width:650px){
    	top:10%;
    	height:75% !important;
    	#firstOnboardingImage{
    		height:30% !important;
    		width:90% !important;
    		margin-left:0% !important;
    	}
    	#beaconsImage{
    		height:20% !important;
    		width:100% !important;
    		margin-left:0% !important;
    	}

    	#onboardingResources{
    		width:100% !important;
    	}

    	#onboardingSpecialists{
    		width:100% !important;
    	}
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#firstOnboardingImage{
    		height:30% !important;
    	}

    	#beaconsImage{
    		height:25% !important;
    	}

    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
      #firstOnboardingImage{
    		height:70% !important;
    	}

    	#beaconsImage{
    		height:70% !important;
    		width:100% !important;
    		margin-left:0% !important;
    	}
    }
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:50;
	top:0px;
`;

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

const SymposiumPageOnboarding=({closeModal})=>{
	const personalInformationId=useSelector(state=>state.personalInformation.id);
	const [displayFirstPage,changeFirstDisplayPage]=useState(true);
	const [displaySecondPage,changeSecondDisplayPage]=useState(false);
	const [displayThirdPage,changesThirdDisplayPage]=useState(false);
	const [displayFourthPage,changeFourthDisplayPage]=useState(false);
	const [displayFifthPage,changeFifthDisplayPage]=useState(false);

	const displayFirstPageHandle=()=>{
		changeFirstDisplayPage(true);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(false);
		changeFourthDisplayPage(false);
		changeFifthDisplayPage(false);
	}

	const displaySecondPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(true);
		changesThirdDisplayPage(false);
		changeFourthDisplayPage(false);
		changeFifthDisplayPage(false);
	}

	const displayThirdPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(true);
		changeFourthDisplayPage(false);
		changeFifthDisplayPage(false);
	}

	const displayFourthPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(false);
		changeFourthDisplayPage(true);
		changeFifthDisplayPage(false);
	}

	const displayFifthPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(false);
		changeFourthDisplayPage(false);
		changeFifthDisplayPage(true);
	}

	const onBoardingCloseModal=async()=>{
		const {confirmation,data}=await completeOnboardingSymposiumFeaturesPage(personalInformationId);
		if(confirmation=="Success")
			closeModal();
		else
			alert('Sorry there has been an error. Please try again ');
	}


	return createPortal(
		<>
			<ShadowContainer
				onClick={()=>onBoardingCloseModal()}
			/>
			<Container>
				{displayFirstPage && (
					<ul style={{padding:"30px"}}>
						<li style={{listStyle:"none"}}> 
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<p style={{fontSize:"30px"}}>
										Welcome to the <b>Symposium Feature Page</b>
									</p>
								</li>
								{/*
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li id="closeOptionIconLI" style={{listStyle:"none",display:"inline-block"}}>
											<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" 
												width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3"
												fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z"/>
												<circle cx="12" cy="12" r="9" />
												<path d="M10 10l4 4m0 -4l-4 4" />
											</svg>
										</li>
									</a>
								*/}
							
							</ul>
						</li>
						<hr/>
						<p style={{fontSize:"15px"}}> 
							The symposium feature page is a child of the symposium page. Here we took the features of 
							beacons,community questions,and unversity questions and made them into their own separate 
							"pages". 
						</p>
						<br/>
						<p>In the next screens we will dissect what each of those things are.</p>

						<hr/>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
									Step 1 of 4
								</li>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>onBoardingCloseModal()} style={ButtonCSS}>
										Close
									</li>
								</a>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>displaySecondPageHandle()} 
										style={ButtonCSS}>
										Next
									</li>
								</a>
							</ul>
						</li>
					</ul>
				)}

				{displaySecondPage && (
					<ul style={{padding:"30px"}}>
						<li id="closeOptionIconLI" style={{listStyle:"none",marginLeft:"85%"}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" 
								width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3"
								fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z"/>
								<circle cx="12" cy="12" r="9" />
								<path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</li>

						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
									<b>Beacons:</b>
								</p>
								<p style={{marginBottom:"5%",fontSize:"15px"}}> 
									Have you ever wished that there was a way for you to request a specific type of post? 
									For example lets say you're working out a math problem and you want a specific video to help you or maybe an 
									image?
									<br/>
									<br/>
									Thats why we introduced beacons and thats what they accomplish. Simply upload a post explaining
									what you want and people will respond back in that specific post type. Your progress is 
									recorded and the more your answer questions and the more you posts get accepted as the 
									answer the higher your progress increases.
								</p>
								<img id="beaconsImage" 
									src={BeaconFeaturePageOnboarding} style={{width:"40%",height:"20%"}}
								/>
								<hr/>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
											Step 2 of 4
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayFirstPageHandle()} style={ButtonCSS}>
												Previous
											</li>
										</a>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayThirdPageHandle()} style={ButtonCSS}>
												Next
											</li>
										</a>
									</ul>
								</li>


							</ul>
						</li>
					</ul>
				)}


				{displayThirdPage && (
					<ul style={{padding:"30px"}}>
						<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
							<b>Symposium Community:</b>
						</p>
						<p style={{marginBottom:"5%",fontSize:"15px"}}> 
							The symposium community is exactly what it says it is. We wanted a section that truly felt like 
							a community and not just a place you visited. A section where you can influence what actually happens 
							in it. Here you can vote on monthly questions that you want to see up or you can even create 
							your own question and have it voted for. Your voice makes an impact here.
						</p>

						<img id="firstOnboardingImage" 
							src={SymposiumCommunityFeaturePageOnboarding} style={{width:"60%",height:"25%"}}
						/>

						<hr/>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
									Step 3 of 4
								</li>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>displaySecondPageHandle()} style={ButtonCSS}>
										Previous
									</li>
								</a>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>displayFourthPageHandle()} style={ButtonCSS}>
										Next
									</li>
								</a>
							</ul>
						</li>
					</ul>
				)}

				{displayFourthPage && (
					<ul style={{padding:"30px"}}>

						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
									<b>Symposium University:</b>
								</p>

								<p>
									You can think of the symposium university section like an actual school. 
									Here people can upload any resources that they find and truly learn from 
									each other.
								</p>
								<p style={{color:"#585858",fontSize:"24px",marginBottom:"7%"}}>
									<b>Specialists</b>
								</p>


								<p style={{marginBottom:"5%",fontSize:"15px"}}> 
									Specialists are people who are skilled in the symposium topic. If you believe
									that you are a specialist, you can even create your own and have people
									check you out here.
								</p>
								<img id="onboardingSpecialists" src={UniversitySpecialistsOnboarding} 
									style={{width:"50%",borderRadius:"5px"}}
								/>
						
								<hr/>

								<p style={{color:"#585858",fontSize:"24px",marginBottom:"7%"}}>
									<b>Resources</b>
								</p>


								<p style={{marginBottom:"5%",fontSize:"15px"}}> 
									Resources are information (could be articles/links/anything) that 
									people in the symposium have collected. You can find
									anything here but the main idea of this section is for it to be a bank
									of information.
								</p>
								<img id="onboardingResources" src={UniversityResourcesOnboarding} 
									style={{width:"50%",borderRadius:"5px"}}
								/>
								<hr/>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
											Step 4 of 4
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayThirdPageHandle()} style={ButtonCSS}>
												Previous
											</li>
										</a>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>onBoardingCloseModal()} style={ButtonCSS}>
												Close
											</li>
										</a>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				)}
			</Container>
		</>
	,document.getElementById("symposiumFeaturesPage"));
}

export default SymposiumPageOnboarding;