import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ArenaEnter from "../../designs/img/ArenaEnter.png";
import ExplorePagePostFeedEditOptions from "../../designs/img/ExplorePageFeedEditOptions.png";
import MobileHomeButton from "../../designs/img/MobileHomeButton.png";
import SymposiumListButton from "../../designs/img/SymposiumListButton.png";
import ExplorePageButton from "../../designs/img/ExplorePageButton.png";

import {completeOnboardingExplorePage} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:40;
	left:30%;
	top:20%;
	overflow-y:auto;



	@media screen  and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70% !important;
		#closeOptionIconLI{
			display:none !important;
		}
    }

    @media screen  and (max-width:700px){
    	#firstPageOnboarding{
    		margin-left:0% !important;
    		padding:20px !important;
    		align-items:normal !important;
    	}
    	#arenaIcon{
    		width:110% !important;
    		margin-left:-5% !important;
    	}

    	#parentOptionsContainer{
    		flex-direction:column !important;
    	}
    	#optionsDiv{
    		margin-left:0% !important;
    	}
    	#specificImageOptionsDiv{
    		flex-direction:column !important;
    	}
    	#text{
    		width:90% !important;
    	}

    	#explorePageOnboarding{
    		width:100% !important;
    	}
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#arenaIcon{
    		width:40% !important;
    		margin-left:30% !important;
    	}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#arenaIcon{
    		height:70% !important;
    	}
    }
`;


const ShadowContainer=styled.div`
	position:fixed;
	width:110%;
	left:-5%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:40;
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
  marginRight:"2%",
  cursor:"pointer"
}

const CloseButtonCSS={
	listStyle:"none",
	display:"inline-block",
	marginLeft:"50%",
	cursor:"pointer"
}
const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}

const ExplorePageOnboarding=({closeModal})=>{

	const personalInformationId=useSelector(state=>state.personalInformation.id);
	const personalFirstName=useSelector(state=>state.personalInformation.firstName);

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

	const displayThirdPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(true);
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
					<div id="firstPageOnboarding" style={{marginTop:"20%",display:"flex",alignItems:"center",flexDirection:"column",marginLeft:"-2%"}}>
						<p style={{fontSize:"40px"}}>
							<b>Welcome to Sympocia</b>
						</p>
						<hr/>
						<p>
							<b>I'm so glad that you made a profile {personalFirstName}</b>
						</p>	
						<p>Click on the start onboarding button below to get started </p>
						<hr/>
						<p onClick={()=>displaySecondPageHandle()} style={ButtonCSS}> Start Onboarding</p>
					</div>
				)}

				{displaySecondPage && (
					<div style={{padding:"30px",display:"flex",flexDirection:"column"}}>
						<p style={{fontSize:"30px"}}>
							<b>Beautiful isnt it?</b>
						</p>
						<hr style={HorizontalLineCSS}/>
						<p>Welcome to the explore page and to sympocia. Let us give you a quick run down first</p>
						<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%",marginTop:"5%"}}>
							<b>Navigation Options:</b>
						</p>	
						<div id="parentOptionsContainer" style={{display:"flex",flexDirection:"row"}}>
							<p>Desktop</p>
							<div id="optionsDiv" style={{display:"flex",flexDirection:"column",marginLeft:"20%"}}>
								<div id="specificImageOptionsDiv" style={{display:"flex",flexDirection:"row"}}>
									<img src={ExplorePageButton} style={{width:"70px",height:"70px"}}/>
									<p id="text" style={{width:"40%",marginLeft:"10%"}}>
										This option directs you to the explore page and will in later features allow
										you to refresh you current explore page posts
									</p>
								</div>

								{/*
									<div id="specificImageOptionsDiv" style={{display:"flex",flexDirection:"row"}}>
										<img src={SymposiumListButton} style={{width:"70px",height:"70px"}}/>
										<p id="text" style={{width:"40%",marginLeft:"10%"}}>
											Shows you a list of you’re followed symposiums and also ones you haven’t followed yet
										</p>
									</div>
								*/}
							</div>
						</div>

						<div id="parentOptionsContainer" style={{display:"flex",flexDirection:"row",marginTop:"10%"}}>
							<p>Mobile</p>
							<div id="optionsDiv" style={{display:"flex",flexDirection:"column",marginLeft:"20%"}}>
								<div id="specificImageOptionsDiv" style={{display:"flex",flexDirection:"row"}}>
									<img src={MobileHomeButton} style={{width:"80px",height:"70px"}}/>
									<p  id="text" style={{width:"40%",marginLeft:"10%"}}>
										Displays a drop down of all you options: profile,home,notifications etc etc
									</p>
								</div>
							</div>
						</div>


						<hr style={HorizontalLineCSS}/>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
									Step 2 of 3
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

					</div>
				)}

				{displayThirdPage &&(
					<ul style={{padding:"30px"}}>
						<li onClick={()=>onBoardingCloseModal()} id="closeOptionIconLI" style={{...CloseButtonCSS,marginLeft:"85%"}}>
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
									We only curate items that we think you would like to see not what we want you to see. 
									The folder icon allows you to edit your feed and personally curate it so that it is more tailored for you.
								</p>

								<img id="explorePageOnboarding" src={ExplorePagePostFeedEditOptions} style={{width:"40%"}}/>

								<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px",marginTop:"5%"}}> 
									And there you have it. Finished :)
								</p>

								<hr/>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
											Step 3 of 3
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displaySecondPageHandle()} style={ButtonCSS}>
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