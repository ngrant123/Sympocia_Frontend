import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import FriendsGaugeImage from "../../designs/img/FriendsGaugeOnboarding.png";
import ChampionImage from "../../designs/img/ChampionOnboarding.png";
import CrownInitialImage from "../../designs/img/CrownInitialImage.png";
import CrownFinalImage from "../../designs/img/CrownFinalImage.png";
import {completeOnboardingPersonalPage} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
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

const PersonalProfileOnboarding=({closeModal})=>{

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

	const displayThirdPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(true);
	}

	const onBoardingCloseModal=async()=>{
		const {confirmation,data}=await completeOnboardingPersonalPage(personalInformationId);
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
										<b> Hold on...wait a minute slow down a bit</b>
									</p>
								</li>
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
							</ul>
						</li>
						<hr/>
						<p> 
							We both know how excited you are to check out your <b> profile page</b> but lets us give 
							you a quick run down first
						</p>

						<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
							<b>Friends Gauge:</b>
						</p>
						<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px"}}> 
							We've all been in that situation before... You have a picture but you want to upload it to only 
							certain people right? Maybe you dont want people to know that you collect rocks on the side. Now theres 
							a way to do this. Add levels and allow only certain people access to you secrets :)
						</p>
						<img src={FriendsGaugeImage} style={{width:"90%"}}/>
						<hr/>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
									Step 1 of 3
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
									<b>Champion:</b>
								</p>
								<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px"}}> 
									Have you have wanted to show appreciation for someone other than temporary shoutouts? 
									Now you can by championing someone. Upload a picture of someone you want to champion then 
									add a description and their sympocia,tik tok, or ig page.
								</p>
								<img src={ChampionImage} style={{width:"90%"}}/>
								<hr/>
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
							</ul>
						</li>
					</ul>
				)}

				{displayThirdPage && (
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
									<b>Crowned Post:</b>
								</p>
								<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px"}}> 
									Maybe you feel like an image represents your whole persona well and you want 
									everybody to see it when they first enter your page. We got you. By crowning a
									post it becomes the first thing on your page that people see. Just click the 
									crown on the edit post page
								</p>
								<img src={CrownInitialImage} style={{width:"90%"}}/>

								<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px",marginTop:"5%"}}> 
									And then your post becomes crowned. Pretty easy right? We know ;)
									Check out the example of how it looks below
								</p>
								<img src={CrownFinalImage} style={{width:"90%"}}/>

								<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px",marginTop:"5%"}}> 
									And there you have have. Finished :)
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
	,document.getElementById("personalContainer"));
}

export default PersonalProfileOnboarding;