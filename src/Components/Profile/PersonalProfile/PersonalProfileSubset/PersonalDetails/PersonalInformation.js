import React,{useState,Component} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../UserContext.js";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import FriendsAndIndustryInformation from "./FriendsAndIndustryInformation.js";
import DonatePortal from "../../PersonalProfileSet/DonatePortal.js";
import ChampionPortal from "../../PersonalProfileSet/ChampionModalPortal/index.js";
import {useSelector} from "react-redux";
import {addRecruit} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";



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

const PersonalInformation=(props)=>{

	const [displayFriendsAndIndustryContainer,changeIndicator]=useState(false);
	const [displayDonationModal,changeDisplayForDonationModal]=useState(false);
	const [displayChampionModal,changeDisplayChampionModal]=useState(false);
	const personalRedux=useSelector(state=>state.personalInformation);

	const handleUnRecruitButton=()=>{

	}

	const handleRecruitButton=(personalInformation)=>{
		props.displayConfetti();
		console.log(personalInformation);
		debugger;
		const profileId=personalInformation.userProfile._id;
		addRecruit(personalRedux.id,profileId);
	}

	const handleDonateButton=()=>{
		console.log("Download modal");
			changeDisplayForDonationModal(!displayDonationModal);

	}

	const handleChampionButton=()=>{
		console.log("Download modal");
			changeDisplayChampionModal(!displayChampionModal);

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

											<li style={{listStyle:"none",marginBottom:"2%"}}>
												<FriendsAndIndustryDisplayButton onClick={()=>changeIndicator(true)}>
													View Interested Industries
												</FriendsAndIndustryDisplayButton>

											</li>
											{personalInformation.isOwnProfile==true?
													<li style={{listStyle:"none",marginTop:"2%",marginBottom:"10%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																<a style={{textDecoration:"none"}} href="javascript:void(0);">
																	<RecruitButton onClick={()=>handleUnRecruitButton()}>
																		- Recruit
																	</RecruitButton>
																</a>
															</li>
														</ul>
													</li>
													:<li style={{listStyle:"none",marginTop:"2%",marginBottom:"10%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																<a style={{textDecoration:"none"}} href="javascript:void(0);">
																	<RecruitButton onClick={()=>handleRecruitButton(personalInformation)}>
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
											</li> }
								
											

											{personalInformation.isOwnProfile==true?
												<li style={{listStyle:"none",marginBottom:"20px",color:"white"}}>
													<a style={{textDecoration:"none"}} href="javascript:void(0)">
														<SponsorButton onClick={()=>handleChampionButton()}>
															Champion Someone
														</SponsorButton>
													</a>
												</li>:<React.Fragment></React.Fragment>}
						
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
						{displayChampionModal==true?
							<ChampionPortal
								closeModal={handleChampionButton}
							/>:null
						}
						</React.Fragment>
				}}
		</UserConsumer>
	)
}

export default PersonalInformation;