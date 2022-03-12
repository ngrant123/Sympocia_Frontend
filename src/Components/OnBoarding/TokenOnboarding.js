import React from "react";
import styled from "styled-components";
import TokenInformationIcon from "../../designs/img/TokenInformationIcon.png";
import {completeOnboardingTokenInformationPage} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const ShadowContainer=styled.div`
	position:fixed;
	width:110%;
	left:-5%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:52;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:52;
	left:30%;
	top:20%;
	overflow-y:auto;
	overflow-x:hidden;

	@media screen  and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70% !important;
    }

`;
const IconContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:150%;

	@media screen and (max-width:1370px){
		#iconInformation{
			flex-direction:column !important;
		}
		#text{
			width:60% !important;
		}
	}
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

const IconsInformationCSS={
	marginBottom:"5%",
	display:"flex",
	flexDirection:"row"
}


const TokenOnboarding=({closeModal,profileId})=>{
	const onBoardingCloseModal=async()=>{
		const {confirmation,data}=await completeOnboardingTokenInformationPage(profileId);
		if(confirmation=="Success")
			closeModal();
		else
			alert('Sorry there has been an error. Please try again ');
	}


	return(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>onBoardingCloseModal()}
			/>
			<Container>
				<hr/>
				<ul style={{padding:"30px"}}>
					<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
						<b>Token Information:</b>
					</p>
					<p id="text">
						Tokens are basically points that you get for interacting with someone's post. 
						After you ascend to the next level you unlock certain features of the website 
						that were previously behind a paywall. After each month everyone's token level is reset back to zero.
					</p>
					<img src={TokenInformationIcon} style={{width:"80px",height:"80px"}}/>
					<hr/>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"10px"}}>
							<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
								Step 1 of 1
							</li>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>onBoardingCloseModal()} style={ButtonCSS}>
									Close
								</li>
							</a>
						</ul>
					</li>
				</ul>
			</Container>
		</React.Fragment>
	)
}

export default TokenOnboarding;