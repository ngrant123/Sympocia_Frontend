import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ArenaEnter from "../../designs/img/ArenaEnter.png";
import ExplorePagePostOptions from "../../designs/img/ExplorePagePostOptions.png";
import {completeOnboardingExplorePage} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:35;
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
`;


const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:35;
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

const ExplorePageOnboarding=({closeModal})=>{

	const personalInformationId=useSelector(state=>state.personalInformation.id);

	const [displayFirstPage,changeFirstDisplayPage]=useState(true);
	const [displaySecondPage,changeSecondDisplayPage]=useState(false);
	const [displayThirdPage,changesThirdDisplayPage]=useState(false);

	const displayFirstPageHandle=()=>{
		changeFirstDisplayPage(true);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(false);
	}

	const displaySecondPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(true);
		changesThirdDisplayPage(false);
	}

	const onBoardingCloseModal=async()=>{
		const {confirmation,data}=await completeOnboardingExplorePage(personalInformationId);
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
										<b>Beautiful isnt it?</b>
									</p>
								</li>
								<a href="javascript:void(0);" style={{textDecoration:"none",marginLeft:"50%"}}>
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
							</ul>
						</li>
						<hr/>
						<p> 
							Welcome to the <b> explore page</b>. Let us give 
							you a quick run down first
						</p>

						<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
							<b>Arena Entrance:</b>
						</p>
						<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px"}}> 
							The entrance to the arena. Where the best content wins. Interested in learning more about it? 
							Click on the button on the screen and find out :) But before you do that thats one more thing 
							we want to show you about the explore page. Click next to continue.
						</p>
						<img src={ArenaEnter} style={{marginLeft:"15%",width:"60%",height:"45%"}}/>
						<hr/>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
									Step 1 of 2
								</li>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>onBoardingCloseModal()} style={ButtonCSS}>
										Close
									</li>
								</a>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>displaySecondPageHandle()} style={ButtonCSS}>
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
									<b>Explore Post Options:</b>
								</p>
								<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px"}}>
									You've ever went on an explore page and saw content that was the complete opposite
									of what you like? Or maybe you're scrolling and see a promoted post for a "social media model".
									Annoying right? We'll not here. We only curate items that we think you would like to see 
									not what we want you to see. The post option button allows you to switch between different kinds of 
									posts. Pretty self explanatory right? 
								</p>

								<img src={ExplorePagePostOptions} style={{width:"90%"}}/>

								<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px",marginTop:"5%"}}> 
									And there you have it. Finished :)
								</p>

								<hr/>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
											Step 2 of 2
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayFirstPageHandle()} style={ButtonCSS}>
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
	,document.getElementById("homePageContainer"));
}

export default ExplorePageOnboarding;