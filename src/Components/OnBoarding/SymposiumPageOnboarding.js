import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

import SymposiumFeatures from "../../designs/img/SymposiumFeatures.png";
import SymposiumPostOptions from "../../designs/img/SymposiumPostOptions.png";
import SymposiumHighlightedQuestions from "../../designs/img/SymposiumHighlightedQuestions.png";

import {completeOnboardingSymposiumPage} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
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
	overflow-y:scroll;

	@media screen  and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70% !important;
		#closeOptionIconLI{
			display:none !important;
		}
    }

    @media screen and (max-width:700px){
    	#firstOnboardingImage{
    		height:70% !important;
    		width:90% !important;
    		margin-left:0% !important;
    	}
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#firstOnboardingImage{
    		height:80% !important;
    	}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
      #firstOnboardingImage{
    		height:120% !important;
    	}
    }
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
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

	const displayFirstPageHandle=()=>{
		changeFirstDisplayPage(true);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(false);
		changeFourthDisplayPage(false);
	}

	const displaySecondPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(true);
		changesThirdDisplayPage(false);
		changeFourthDisplayPage(false);
	}

	const displayThirdPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(true);
		changeFourthDisplayPage(false);
	}

	const displayFourthPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(false);
		changeFourthDisplayPage(true);
	}

	const onBoardingCloseModal=async()=>{
		const {confirmation,data}=await completeOnboardingSymposiumPage(personalInformationId);
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
										The bread and butter of Sympocia. Welcome to the <b>Symposium</b>
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
							What is the symposium? We envisioned it as a place where you can join and be welcomed by a group of people 
							immediately. There are numerous symposiums but the goal is for you to join a select few and get the most out of it. 
							Learn something new and most importantly
							connect with everyone there. 
						</p>
						<br/>
						<p>Now we know its hard to connect with randoms so we've added a few features to help out</p>
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
									<li onClick={()=>displaySecondPageHandle
										()} style={ButtonCSS}>
										Next
									</li>
								</a>
							</ul>
						</li>
					</ul>
				)}

				{displaySecondPage && (
					<ul style={{padding:"30px"}}>
						<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
							<b>Symposium Specific Features:</b>
						</p>
						<p style={{marginBottom:"5%",fontSize:"15px"}}> 
							Other sites post cookie cutter templates for all of their "communities". Not us. Each symposium has different 
							features that allows you to express yourself in different ways. Here's an example of a the photography symposium 
							features
						</p>
						<img id="firstOnboardingImage" 
							src={SymposiumFeatures} style={{width:"60%",height:"60%",marginLeft:"15%"}}
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
									<li onClick={()=>displayThirdPageHandle
										()} style={ButtonCSS}>
										Next
									</li>
								</a>
							</ul>
						</li>
					</ul>
				)}

				{displayThirdPage && (
					<ul style={{padding:"30px"}}>

						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
									<b>Addition Features:</b>
								</p>
								<p style={{marginBottom:"5%",fontSize:"15px"}}> 
									You thought we were done? Nope. Another one. You can also find highlighted questions 
									that allows you to show off your best stuff to others. Great for exposure or starting 
									a conversation with other people who catches your interest.
								</p>
								<img src={SymposiumHighlightedQuestions} style={{width:"90%"}}/>
						
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
						</li>
					</ul>
				)}

				{displayFourthPage &&(
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
									<b>Post Options:</b>
								</p>
								<p style={{marginBottom:"5%",fontSize:"15px"}}> 
									And finally we got post options. Want to see only blogs for this symposium? Easy 
									click the blog option button. What about videos? Got that also. We honestly got it all :)
								</p>
								<img src={SymposiumPostOptions} style={{width:"90%"}}/>

								<p style={{marginBottom:"5%",fontSize:"15px",marginTop:"5%"}}> 
									And there you have it. Finished :)
								</p>

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
	,document.getElementById("extendedSymposiumContainer"));
}

export default SymposiumPageOnboarding;


