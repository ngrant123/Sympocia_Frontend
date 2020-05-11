import React,{useState,Component} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../UserContext.js";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import FriendsAndIndustryInformation from "./FriendsAndIndustryInformation.js";
import DonatePortal from "../../PersonalProfileSet/DonatePortal.js";
import SponsorPortal from "../../PersonalProfileSet/SponsorModalPortal/index.js";


const BioContainer=styled.div`
	position:realtive;
	width:80%;
	margin-left:7%;
	background-color:white;
	margin-bottom:10px;
	color:#848484;

`;


const FriendsAndIndustryDisplayButton=styled.div`
	padding:10px;
	text-align:center;
	border-radius:5px;
	border-style:solid;
	border-color:#5298F8;
	border-width:1px;
	color:#5298F8;
	transition:.8s;


	&:hover{
		background-color:#5298F8;
		color:white;
	}
`;

const BackButton=styled.div`
	padding:10px;
	text-align:center;
	border-radius:5px;
	border-style:solid;
	border-color:#5298F8;
	border-width:1px;
	color:#5298F8;
	transition:.8s;


	&:hover{
		background-color:#5298F8;
		color:white;
	}
`;

const RecruitButton=styled.div`
	position:relative;
	animation: glowing 1300ms infinite;
	position:relative;
	color:white;
	padding:10px;
	background-color:white;
	border-radius:5px;


	@keyframes glowing {
      0% { background-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { background-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { background-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const DonateButton=styled.div`
	position:relative;
	border-color:#5298F8;
	border-style:solid;
	border-width:1px;
	color:#5298F8;
	padding:10px;
	background-color:white;
	border-radius:5px;
	transition:.8s;

	&:hover{
		box-shadow: 5px 5px 5px 5px #d5d5d5;
	}

`;

const SponsorButton=styled.div`
	padding:10px;
	text-align:center;
	border-radius:5px;
	border-style:solid;
	border-color:#5298F8;
	border-width:1px;
	transition:.8s;
	background-color:#5298F8;
	color:white;

	&:hover{
		background-color:#0101DF;
	}
`;

const PersonalInformation=()=>{

	const [displayFriendsAndIndustryContainer,changeIndicator]=useState(false);
	const [displayDonationModal,changeDisplayForDonationModal]=useState(false);
	const [displaySponsorModal,changeDisplaySponsorModal]=useState(false);

	const handleRecruitButton=()=>{

	}

	const handleDonateButton=()=>{
		console.log("Download modal");
			changeDisplayForDonationModal(!displayDonationModal);

	}

	const handleSponsorButton=()=>{
		console.log("Download modal");
			changeDisplaySponsorModal(!displaySponsorModal);

	}

	return(
		<UserConsumer>
			{personalInformation=>{
				return <React.Fragment>
						{personalInformation.isLoading==true?<p>Loading please wait</p>:
								<React.Fragment>
									{displayFriendsAndIndustryContainer==false?
									<React.Fragment>
										<p style={{position:"relative",left:"20%",fontSize:"30px",color:"#C8B0F4"}}><b>{personalInformation.userProfile.firstName}</b></p>
										<BioContainer>
											{personalInformation.userProfile.bio}
										</BioContainer>

										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"35%",marginBottom:"10px"}}>
												Social Media

											</li>
											<li style={{listStyle:"none",display:"inline-block",marginLeft:"30%",marginRight:"10%"}}>
												<ControlPointIcon
													style={{fontSize:40,color:"#5298F8"}}
												 />
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginBottom:"15px"}}>
												<ControlPointIcon
													style={{fontSize:40,color:"#5298F8"}}
												/>
											</li>

											<li style={{listStyle:"none",marginBottom:"20px"}}>
												<FriendsAndIndustryDisplayButton onClick={()=>changeIndicator(true)}>
													Views Friends
												</FriendsAndIndustryDisplayButton>

											</li>

											<li style={{listStyle:"none"}}>
												<FriendsAndIndustryDisplayButton onClick={()=>changeIndicator(true)}>
													View Interested Industries
												</FriendsAndIndustryDisplayButton>

											</li>
											<li style={{listStyle:"none",marginTop:"2%",marginBottom:"10%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
														<a style={{textDecoration:"none"}} href="javascript:void(0);">
															<RecruitButton onClick={()=>handleRecruitButton()}>
																+ Recruit
															</RecruitButton>
														</a>
													</li>
													<li style={{listStyle:"none",display:"inline-block"}}>
														<a style={{textDecoration:"none"}} href="javascript:void(0);">
															<DonateButton onClick={()=>handleDonateButton()}>
																Donate
															</DonateButton>
															
														</a>
													</li>
												</ul>
											</li>
											<li style={{listStyle:"none",marginBottom:"20px",color:"white"}}>
												<a style={{textDecoration:"none"}} href="javascript:void(0)">
													<SponsorButton onClick={()=>handleSponsorButton()}>
														Sponsor Someone
													</SponsorButton>
												</a>
											</li>
										</ul>
									</React.Fragment>
									:<React.Fragment>
										<BackButton onClick={()=>changeIndicator(false)}>
											Back
										</BackButton>
										<FriendsAndIndustryInformation/>

									 </React.Fragment>

								}

							</React.Fragment>

						}
						{displayDonationModal==true?
							<DonatePortal
								closeModal={handleDonateButton}
							/>:null
						}
						{displaySponsorModal==true?
							<SponsorPortal
								closeModal={handleSponsorButton}
							/>:null
						}
						</React.Fragment>
				}}
		</UserConsumer>
	)
}

export default PersonalInformation;