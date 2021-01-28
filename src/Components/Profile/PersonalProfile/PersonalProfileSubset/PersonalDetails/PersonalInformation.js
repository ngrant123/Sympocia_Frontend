import React,{useState,Component} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../UserContext.js";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import FriendsAndIndustryInformation from "./FriendsAndIndustryInformation.js";
import DonatePortal from "../../PersonalProfileSet/Modals-Portals/DonatePortal.js";
import ChampionPortal from "../../PersonalProfileSet/Modals-Portals/ChampionModalPortal/index.js";
import {useSelector,useDispatch} from "react-redux";
import {addRecruit} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import FriendsPortal from "../../PersonalProfileSet/Modals-Portals/FriendsPortal.js";
import SymposiumPortal from "../../PersonalProfileSet/Modals-Portals/FollowedSymposiumsPortal.js";

import { Icon, InlineIcon } from '@iconify/react';
import tiktokIcon from '@iconify/icons-simple-icons/tiktok';
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {
	removeRecruitProfileIsFollowing,
	removeRecruitProfileIsntFollowing
} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import GuestLockScreenHOC from "../../../../GeneralComponents/PostComponent/GuestLockScreenHOC.js";


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

const RecruitButtonContainer=styled.div`
	position:relative;
	animation: glowing 1300ms infinite;
	position:relative;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;
	width:80px;


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

let TikTokCSS={
	position:"relative",
	borderStyle:"solid",
	padding:"5px",
	borderColor:"black",
	borderWidth:"3px",
	borderRadius:"5px",
	listStyle:"none",
	display:"inline-block",
	marginBottom:"15px",
	top:"-15px",
	textAlign:"center"
}

const EditSocialMediaUrlsCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginBottom:"5%"
}

const RecruitButton=({personalInformation,displayConfettiHandle,userId})=>{
	debugger;
	const {userProfile:{
		_id
	}}=personalInformation;

	const isOwnProfileRecruitButtonDecider=()=>{
		debugger;
		const {
			userProfile:{
				recruits
			}
		}=personalInformation;
		console.log(recruits);
		let isRecruit=false;

		recruits.forEach((data,index)=>{
			if(data._id==userId)
				isRecruit=true;
		})
		if(personalInformation.isOwnProfile || isRecruit){
			return true;
		}else{
			return false;
		}
	}

	const isRecruitOrOwner=isOwnProfileRecruitButtonDecider();
	const [isProfileARecruitOrOwner,changeIsProfileARecruitOrOwner]=useState(isRecruitOrOwner);
	const personalReduxInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	const recruitProfile=()=>{
		changeIsProfileARecruitOrOwner(true);
		handleRecruitButton({personalInformation,displayConfettiHandle,userId,isAccessTokenUpdated:false});
	}

	const unRecruitVisitor=async({isAccessTokenUpdated,updatedAccessToken,accessToken})=>{
		if(personalInformation.isOwnProfile==false){
			const {confirmation,data}=await removeRecruitProfileIsFollowing({
				personalProfileId:userId,
				targetProfile:_id,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
				personalReduxInformation.accessToken
			})
			if(confirmation=="Success"){
				changeIsProfileARecruitOrOwner(false);
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalReduxInformation.refreshToken,
							userId,
							unRecruitVisitor,
							dispatch,
							{},
							false
						);
				}else{
					alert('Unfortunately there has been an error adding this recruit. Please try again');
				}
			}
		}
	}

	const handleRecruitButton=async({personalInformation,displayConfettiHandle,userId,isAccessTokenUpdated,updatedAccessToken})=>{
	
		const profileId=personalInformation.userProfile._id;
		const {confirmation,data}=await addRecruit(
											userId,
											profileId,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalReduxInformation.accessToken
										);
		if(confirmation=="Success"){
			displayConfettiHandle();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalReduxInformation.refreshToken,
						userId,
						handleRecruitButton,
						dispatch,
						{
							personalInformation,
							displayConfettiHandle,
							userId
						},
						false
					);
			}else{
				alert('Unfortunately there has been an error adding this recruit. Please try again');
			}
		}
	}

	return <>
			{isProfileARecruitOrOwner==true?
				<li style={{listStyle:"none",marginTop:"2%",marginBottom:"10%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
							<a style={{textDecoration:"none"}} href="javascript:void(0);">
								<RecruitButtonContainer onClick={()=>unRecruitVisitor({isAccessTokenUpdated:false})}>
									- Recruit
								</RecruitButtonContainer>
							</a>
						</li>
					</ul>
				</li>
				:<li style={{listStyle:"none",marginTop:"2%",marginBottom:"10%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
							<a style={{textDecoration:"none"}} href="javascript:void(0);">
								<RecruitButtonContainer onClick={()=>recruitProfile({isAccessTokenUpdated:false})}>
									+ Recruit
								</RecruitButtonContainer>
							</a>
						</li>
						{/*
							<li style={{listStyle:"none",display:"inline-block"}}>
								<a style={{textDecoration:"none"}} href="javascript:void(0);">
									<DonateButton onClick={()=>handleDonateButton()}>
										Donate
									</DonateButton>
									
								</a>
							</li>
						*/}
					</ul>
				</li>
			}
		   </>
}


const PersonalInformation=(props)=>{

	const [displayFriendsAndIndustryContainer,changeIndicator]=useState(false);
	const [displayDonationModal,changeDisplayForDonationModal]=useState(false);
	const [displayChampionModal,changeDisplayChampionModal]=useState(false);
	const [displayFriendsPortal,changeDisplayFriendsPortal]=useState(false);
	const [displaySymposiumsPortal,changeDisplaySymposiumsPortal]=useState(false);

	
	const handleDonateButton=()=>{
		console.log("Download modal");
		changeDisplayForDonationModal(!displayDonationModal);

	}

	const handleChampionButton=()=>{
		console.log("Download modal");
		changeDisplayChampionModal(!displayChampionModal);

	}

	const socialMediaIcons=(socialMediaUrls)=>{
		
		let {
			instagramUrl,
			tikTokUrl
		}=socialMediaUrls

		let instagramIconColor;
		let tikTokIconColor;

		if(instagramUrl==null || instagramUrl==""){
			instagramIconColor="#A4A4A4";
			instagramUrl="javascript:void(0);";
		}else{
			instagramIconColor="#03A9F4";
		}

		if(tikTokUrl==null || tikTokUrl==""){
			tikTokIconColor="#A4A4A4";
			tikTokUrl="javascript:void(0);";
		}else{
			tikTokIconColor="#03A9F4";
		}

		TikTokCSS={
			...TikTokCSS,
			borderColor:tikTokIconColor
		}

		return <>
					<a style={{textDecoration:"none"}} href={instagramUrl}>
						<li style={{listStyle:"none",display:"inline-block",marginLeft:"30%",marginRight:"10%"}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" 
								width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke={instagramIconColor} fill="none" 
								stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <rect x="4" y="4" width="16" height="16" rx="4" />
								  <circle cx="12" cy="12" r="3" />
								  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
							</svg>
						</li>
					</a>
					<a style={{textDecoration:"none"}} href={tikTokUrl}>
						<li style={TikTokCSS}>
							<Icon icon={tiktokIcon} 
								style={{fontSize:15,color:tikTokIconColor}}
							/>
						</li>
					</a>
				</>
	}

	const closeFriendsPortal=()=>{
		changeDisplayFriendsPortal(false);
	}

	const closeFollowedSymposiumsPortal=()=>{
		changeDisplaySymposiumsPortal(false);
	}

	const userInformationComponent=(personalInformation)=>{
		return (
			<>
				<p style={{position:"relative",left:"20%",fontSize:"30px",color:"#C8B0F4",fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
					<b>{personalInformation.userProfile.firstName}</b>
				</p>
				<BioContainer>
					{personalInformation.userProfile.bio}
				</BioContainer>

				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",marginLeft:"35%",marginBottom:"10px"}}>
						Social Media
					</li>
					<li style={{listStyle:"none",marginTop:"5%"}}>
						{props.personalInformation.isOwnProfile==true?
							<ul style={{padding:"0px"}}>
								<a style={{textDecoration:"none"}} href="javascript:void(0);">	
									<li onClick={()=>alert('Option to add social media profiles coming soon')}
									style={EditSocialMediaUrlsCSS}>
										Edit Social Media
									</li>
								</a>
								{socialMediaIcons(props.personalInformation.userProfile.socialMediaUrls)}
								
							</ul>
							:
							<ul style={{padding:"0px"}}>
								{socialMediaIcons(props.personalInformation.userProfile.socialMediaUrls)}
							</ul>
						}
					</li>
					

					<li style={{listStyle:"none",marginBottom:"20px"}}>
						<a style={{textDecoration:"none"}} href="javascript:void(0);">
							<FriendsAndIndustryDisplayButton onClick={()=>changeDisplayFriendsPortal(true)}>
								View Recruits
							</FriendsAndIndustryDisplayButton>
						</a>
					</li>

					<li style={{listStyle:"none",marginBottom:"2%"}}>
						<a style={{textDecoration:"none"}} href="javascript:void(0);">
							<FriendsAndIndustryDisplayButton onClick={()=>changeDisplaySymposiumsPortal(true)}>
								View Interested Symposiums
							</FriendsAndIndustryDisplayButton>
						</a>
					</li>
					<RecruitButton
						personalInformation={personalInformation}
						displayConfettiHandle={props.displayConfetti}
						userId={props.userId}
					/>

					{personalInformation.isOwnProfile==true?
						<li style={{listStyle:"none",marginBottom:"20px",color:"white"}}>
							<a style={{textDecoration:"none"}} href="javascript:void(0)">
								<SponsorButton onClick={()=>handleChampionButton()}>
									Champion Someone
								</SponsorButton>
							</a>
						</li>:<React.Fragment></React.Fragment>}

				</ul>
			</>
		)
	}

	return(
		<UserConsumer>
			{personalInformation=>{
				return <React.Fragment>
						{personalInformation.isLoading==true?<p>Loading please wait</p>:
								<React.Fragment>
									{displayFriendsPortal==true &&(
										<FriendsPortal
											userId={props.personalInformation.userProfile._id}
											closeModal={closeFriendsPortal}
											isOwner={personalInformation.isOwnProfile}
										/>
									)}
									{displaySymposiumsPortal==true &&(
										<SymposiumPortal
											userId={props.personalInformation.userProfile._id}
											closeModal={closeFollowedSymposiumsPortal}
											isOwner={personalInformation.isOwnProfile}
										/>
									)}
									{displayFriendsAndIndustryContainer==false?
									<React.Fragment>
										{props.personalInformation.isGuestProfile==true?
											<GuestLockScreenHOC
												component={userInformationComponent(personalInformation)}
											/>:
											<>{userInformationComponent(personalInformation)}</>
										}
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
export{
	PersonalInformation,
	RecruitButton
};


