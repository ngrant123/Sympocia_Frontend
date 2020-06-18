import React,{useState} from "react";
import styled from "styled-components";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Icon, InlineIcon } from '@iconify/react';
import tiktokIcon from '@iconify/icons-simple-icons/tiktok';
import {UserConsumer} from "../../UserContext.js";
import {CompanyConsumer} from "../../../CompanyProfile/CompanyContext.js";
import {createCompanyChampion} from "../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPagePostRequests.js";
import {createChampion} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector} from "react-redux";

const BackButtonCSS={
	listStyle:"none",
	borderRadius:"5px",
	borderStyle:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px",
	color:"#5298F8",
	width:"20%",
	padding:"10px",
	marginBottom:"5%"
}

const ProfilePicture=styled.div`
	position:relative;
	width:115%;
	height:35%;
	border-radius:50%;
	background-color:red;
	border-style:solid;
	border-color:#5298F8;
	border-width:5px;
`;

const NameTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	width:130%;
`;

const DescriptionTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	height:50%;
	width:165%;
`;

const SubmitButton=styled.div`
	position:relative;
	color:white;
	padding:10px;
	width:50%;
	height:10%;
	background-color:#C8B0F4;
	border-radius:5px;

`;

const ShadowContainer= styled.div`
	position:fixed;
	width:40%;
	height:60%;
	background-color: rgba(0,0,0,0.4);
	top:95px;
	z-index:5;
`;

const SocialMediaUrlContainer=styled.div`
	position:absolute;
	width:60%;
	height:30%;
	background-color:white;
	top:0px;
	z-index:6;
	border-radius:5px;
	top:20%;
	left:20%;
	padding:20px;
`;

const InstagramUrlTextArea=styled.textarea`
	position:relative;
	width:300px;
	height:50px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	border-radius:5px;
`;

const SocialMediaSubmitButton=styled.div`
	position:relative;
	color:white;
	padding:10px;
	width:50%;
	height:30%;
	background-color:#5298F8;
	border-radius:5px;
	margin-top:10px;
`;


const TikTokUrlTextArea=styled.textarea`
	position:relative;
	width:300px;
	height:50px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	border-radius:5px;

`;


const DescriptionModal=(props)=>{
	console.log("Testing sponsor modal");
	const [instagramUrl,changeInstagramUrl]=useState();
	const [tikTokUlr,changeTikTokUrl]=useState();
	const reduxInformation=useSelector(state=>state);

	const [displayIGUrlPrompt,changeDisplayIGUrlPrompt]=useState(false);
	const [displayTikTokUrlPrompt,changeDisplayTikTokUrlPrompt]=useState(false);

	const handleSubmitIGUrl=()=>{
		const instagramUrl=document.getElementById("igUrl").value;
		changeInstagramUrl(instagramUrl);
		changeDisplayIGUrlPrompt(false);
	}

	const handleSubmitTikTokUrl=()=>{
		const tikTokUrl=document.getElementById("tikTokUrl").value;
		changeTikTokUrl(tikTokUrl);
		changeDisplayTikTokUrlPrompt(false);
	}

	const handleSubmitButton=(personalInformation,companyInformation)=>{
		const name=document.getElementById("name").value;
		const description=document.getElementById("description").value;

		debugger;
		const ChampionModalObject={
			name:name,
			imgUrl:props.imgData,
			description:description,
			tikTokUrl:tikTokUlr,
			instagramUrl:instagramUrl
		}
		console.log("Testig")
		if(props.profileType=="Company"){
			companyInformation.displayChampionModal(ChampionModalObject);
			createCompanyChampion(reduxInformation.companyInformation.id,ChampionModalObject);
		}
		else{
			personalInformation.displayChampionModal(ChampionModalObject);
			createChampion(reduxInformation.personalInformation.id,ChampionModalObject);
		}
		
		props.closeModal();
	}
	
	return(
		<UserConsumer>
			{personalInformation=>(
				<CompanyConsumer>
					{companyInformation=>(
						<React.Fragment>
									<ul style={{padding:"10px",paddingTop:"2px"}}>
										<li style={BackButtonCSS} onClick={()=>props.backButton()}>
											<a style={{textDecoration:"none"}} href="javascript:void(0);">
												<ArrowBackIcon
													style={{color:"#5298F8"}}
												/> Back
											</a>
										</li>
										<li style={{listStyle:"none"}}>
											<ul style={{padding:"10px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"15%",width:"30%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",marginBottom:"30px"}}>
																<img src={props.imgData} style={{position:"relative",width:"110%",height:"35%",borderRadius:"50%"}}/>
														</li>
														<p><b>Name</b></p>
														<li style={{listStyle:"none",marginBottom:"2%"}}>
															<NameTextArea id="name" placeholder="Enter a name here"/>
														</li>
														<p><b>Social Media</b></p>
														<li style={{listStyle:"none"}}>
															<ul>
																<li onClick={()=>changeDisplayIGUrlPrompt(!displayIGUrlPrompt)} style={{listStyle:"none",display:"inline-block",marginRight:"35%"}}>
																	<InstagramIcon
																		style={{fontSize:45,
																			color:(instagramUrl!=null?"#5298F8":"black")}}
																	/>
																</li>

																<li onClick={()=>changeDisplayTikTokUrlPrompt(!displayTikTokUrlPrompt)} style={{listStyle:"none",display:"inline-block"}}>
																	<Icon icon={tiktokIcon} 
																		style={{fontSize:40,
																			color:(tikTokUlr!=null?"#5298F8":"black")}}
																	/>
																</li>

															</ul>
														</li>

													</ul> 
												</li>

												<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",borderLeft:"solid",borderColor:"#D8D8D8"}}>
													<ul style={{paddingLeft:"25px"}}>
														<p><b>Description</b></p>
														<li style={{listStyle:"none",marginBottom:"5%"}}>
															<DescriptionTextArea id="description" placeholder="Start writing"/>
														</li>

														<li style={{listStyle:"none"}}>
															<SubmitButton onClick={()=>handleSubmitButton(personalInformation,companyInformation)}>
																Submit
															</SubmitButton>
														</li>
													</ul>
												</li>
											</ul>

										</li>

									</ul>
								{/*Could below could be refactored in a better way later on as its just the same could 
								but switched based on which social media indicator is true*/}

									{
										displayIGUrlPrompt==false?
										<React.Fragment></React.Fragment>:
										<React.Fragment>
											<ShadowContainer
												onClick={()=>changeDisplayIGUrlPrompt(!displayIGUrlPrompt)}
											/>
											<SocialMediaUrlContainer>
												<InstagramUrlTextArea
													placeholder="Enter the instagram url here"
													id="igUrl"
												/>
												<SocialMediaSubmitButton onClick={()=>handleSubmitIGUrl()}>
													Submit
												</SocialMediaSubmitButton>


											</SocialMediaUrlContainer>

										</React.Fragment>
									}

									{
										displayTikTokUrlPrompt==false?
										<React.Fragment></React.Fragment>:
										<React.Fragment>
											<ShadowContainer
												onClick={()=>changeDisplayTikTokUrlPrompt(!displayTikTokUrlPrompt)}
											/>
											<SocialMediaUrlContainer>
												<TikTokUrlTextArea
													placeholder="Enter the tik tok url here"
													id="tikTokUrl"
												/>
												<SocialMediaSubmitButton onClick={()=>handleSubmitTikTokUrl()}>
													Submit
												</SocialMediaSubmitButton>


											</SocialMediaUrlContainer>

										</React.Fragment>
									}
								</React.Fragment>
							)
						}
					</CompanyConsumer>
				)
			}

		</UserConsumer>
	)
}

export default DescriptionModal;