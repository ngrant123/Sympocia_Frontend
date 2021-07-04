import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import OligarchOnboarding from "../../designs/img/OligarchOnboarding.png";
import {
	completeOnboardingOligarchPage
} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

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
	padding:20px;


	@media screen  and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70% !important;

		#oligarchOnboardingImage{
			width:100% !important;
			height:45% !important;
		}
    }

    @media screen and (max-width:650px){
    	top:10% !important;
    	height:80% !important;

		#oligarchOnboardingImage{
			height:30% !important;
		}
    }
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#oligarchOnboardingImage{
			height:70% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#oligarchOnboardingImage{
    		height:120% !important;
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




const OligarchOnboardingModal=({closeModal,profileId})=>{

	const triggerCloseModal=()=>{
		completeOnboardingOligarchPage(profileId);
		closeModal();
	}
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>triggerCloseModal()}
			/>
			<Container>
				<p style={{fontSize:"36px"}}>
					<b>Oligarchs</b>
				</p>
				<hr/>
				<p style={{fontSize:"15px"}}>
					We know that other platforms have moderators (basically dictators) right?
					But nobody likes dicatators so we made it much more fair 
				</p>
				<p style={{marginTop:"5%",fontSize:"24px"}}>
					<b>Oligarch Competition:</b>
				</p>
				<p style={{fontSize:"15px"}}>
					Each symposium is essentially maintained by oligarchs who have the ability
					to remove comments, move posts, and other stuff. At the end of each month 
					on the 28th at 6:00pm the oligarch competition ends. 
				</p>
				<br/>
				<br/>
				<p style={{fontSize:"15px"}}>
					Each submittion is basically a speech and people can either sponsor you or not.
					The top five people with the most votes are selected as oligarchs and at the end
					 of each month the competition starts over. Fair right?
				</p>

				<img src={OligarchOnboarding} id="oligarchOnboardingImage"
					style={{marginTop:"5%",width:"80%",height:"40%"}}
				/>
				<hr/>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
							Step 1 of 1
						</li>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li onClick={()=>closeModal()} style={ButtonCSS}>
								Close
							</li>
						</a>
					</ul>
				</li>
			</Container>
		</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"))
}

export default OligarchOnboardingModal;