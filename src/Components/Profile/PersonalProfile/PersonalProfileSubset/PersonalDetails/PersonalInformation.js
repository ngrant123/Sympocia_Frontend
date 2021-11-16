import React,{useState,useContext} from "react";
import styled from "styled-components";
import DonatePortal from "../../PersonalProfileSet/Modals-Portals/DonatePortal.js";
import ChampionPortal from "../../PersonalProfileSet/Modals-Portals/ChampionModalPortal/index.js";
import {useSelector,useDispatch} from "react-redux";
import {
	addRecruit,
	removeRecruitProfileIsFollowing
} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import FriendsPortal from "../../PersonalProfileSet/Modals-Portals/FriendsPortal.js";
import SymposiumPortal from "../../PersonalProfileSet/Modals-Portals/FollowedSymposiumsPortal.js";

import { Icon } from '@iconify/react';
import tiktokIcon from '@iconify/icons-simple-icons/tiktok';
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import GuestLockScreenHOC from "../../../../GeneralComponents/PostComponent/GuestLockScreenHOC.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ProfileSettingsModal from "../../PersonalProfileSet/Modals-Portals/PersonalPreferances/index.js";
import OligarchPortalDisplay from "../../PersonalProfileSet/Modals-Portals/OligarchPortal.js";
import PaymentButton from '@material-ui/icons/MonetizationOn';
import {adPageVerification} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

import {UserContext} from "../../UserContext.js";

const Container=styled.div`
	@media screen and (min-width:2500px){
		#personalInformationDisplayDiv{
			margin-top:5% !important;
			margin-bottom:10% !important;
		}
		#firstName{
			font-size:64px !important;
			max-height:90px !important;
		}
		#oligarchButtonIcon{
			width:50px !important;
			height:50px !important;
		}
		#settingsIcon{
			font-size:48px !important;
		}

		#editSocialMediaTitleText{
			font-size:24px !important;
		}

		#socialMediaTitleText{
			font-size:24px !important;
		}
	}
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

	@media screen and (min-width:2500px){
		font-size:24px;
	}


	@media screen and (max-width:1370px){
		margin-top:10%;
		border-style:none;
		color:#868686;
		text-align: left !important;
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
	margin-bottom:5%;
	cursor:pointer;


	@keyframes glowing {
      0% { background-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { background-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { background-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
	}

	@media screen and (min-width:2500px){
		font-size:24px;
		width:120px;
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

	@media screen and (min-width:2500px){
		font-size:24px !important;
	}

	@media screen and (max-width:1370px){
		border-color:#5298F8;
		background-color:white;
		color:#5298F8;
	}
`;

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none",
	marginLeft:"10%"
}

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
  marginBottom:"5%",
  cursor:"pointer"
}

const FirstNameCSS={
	position:"relative",
	fontSize:"30px",
	color:"#C8B0F4",
	fontSize:"20px",
	maxWidth:"60%",
	maxHeight:"50px",
	overflow:"hidden",
	marginRight:"5%"
}

/*
	Right now it works but it doesnt make logic sense for the personal information display rendering. 
	Should refactor later
*/



const RecruitButton=({personalInformation,displayConfettiHandle,userId})=>{
	const _id=personalInformation._id;

	const isOwnProfileRecruitButtonDecider=()=>{
		const recruits=personalInformation.recruits;
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
		if(personalInformation.isGuestVisitorProfile==true){
			alert('Create your own profile so you can recruit this person :)');
		}else{
			handleRecruitButton({personalInformation,displayConfettiHandle,userId,isAccessTokenUpdated:false});
		}
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
	
		const profileId=personalInformation._id;
		const {confirmation,data}=await addRecruit(
											userId,
											profileId,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalReduxInformation.accessToken
										);
		if(confirmation=="Success"){
			const {statusCode}=data;
			if(statusCode==300){
				alert('You have reached the limit of 100 recruits. Please delete some to recruit this person');
			}else{
				changeIsProfileARecruitOrOwner(true);
				displayConfettiHandle();
			}
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

	return(
		<React.Fragment>
			{isProfileARecruitOrOwner==true?
				<RecruitButtonContainer onClick={()=>unRecruitVisitor({isAccessTokenUpdated:false})}>
					- Recruit
				</RecruitButtonContainer>
				:<RecruitButtonContainer onClick={()=>recruitProfile({isAccessTokenUpdated:false})}>
					+ Recruit
				</RecruitButtonContainer>
			}
		</React.Fragment>
	)
}


const PersonalInformation=(props)=>{
	const [displayDonationModal,changeDisplayForDonationModal]=useState(false);
	const [displayChampionModal,changeDisplayChampionModal]=useState(false);
	const [displayFriendsPortal,changeDisplayFriendsPortal]=useState(false);
	const [displaySymposiumsPortal,changeDisplaySymposiumsPortal]=useState(false);
	const [displayProfileSettingsPage,changeDisplayProfileSettingsPage]=useState(false);
	const [displayOligarchPage,changeDisplayOligarchPage]=useState(false);
	const [loadingPersonalInformationVerification,changePersonalInformationOptionLoadingStatus]=useState(true);
	const [isAdOptionAllowed,changeAdAvailablityStatus]=useState(false);

	const userInformation=useContext(UserContext);

	
	const handleDonateButton=()=>{
		changeDisplayForDonationModal(!displayDonationModal);

	}

	const handleChampionButton=()=>{
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
	
	const mobileUserInformation=(firstName,displayMobileProfileOptions,isOligarch)=>{
		const crownLogoMarginLeft=props.personalInformation.isOwnProfile==true?"10%":"0%"
		return(
			<React.Fragment>
				<div id="mobileUserInformation" style={{display:"flex",flexDirection:"row"}}>
					<p style={{maxWidth:"90%",maxHeight:"30px",marginRight:"10%",overflow:"hidden",fontSize:"20px"}}>
						<b>{firstName}</b>
					</p>
					<div style={{display:"flex",flexDirection:"row"}}>
						{editIcon()}
						{isOligarch==true &&(
							<div style={{cursor:"pointer",marginLeft:crownLogoMarginLeft}}>
								{crownLogo()}
							</div>
						)}
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
							style={ShadowButtonCSS}
							onClick={()=>displayMobileProfileOptions()}
							>
						   		<span class="caret"></span>
						</button>
					</div>
				</div>
			</React.Fragment>
		)
	}

	const editIcon=()=>{
		return(
			<React.Fragment>
				{props.personalInformation.isOwnProfile==true &&(
					<BorderColorIcon
						id="settingsIcon"
						onClick={()=>changeDisplayProfileSettingsPage(true)}
						style={{fontSize:25,color:"#C8B0F4",cursor:"pointer"}}
					/>
				)}
			</React.Fragment>
		)
	}

	const crownLogo=()=>{
		return(
			<svg id="oligarchButtonIcon" onClick={()=>changeDisplayOligarchPage(true)}
				xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crown" 
			  	width="30" height="30" viewBox="0 0 24 24" stroke-width="2.5" stroke="#FAE124" fill="none" 
		 	  	stroke-linecap="round" stroke-linejoin="round">
			  	<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  	<path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
			</svg>
		)
	}

	const verfiyAdPayment=async()=>{
		const {confirmation,data}=await adPageVerification(props.personalInformation._id);
		if(confirmation=="Success"){
			const {message}=data;
			changeAdAvailablityStatus(message);
		}
		changePersonalInformationOptionLoadingStatus(false);
	}

	const userInformationComponent=(personalInformation,displayDesktopUI,displayMobileProfileOptions)=>{
		return (
			<>
				{displayDesktopUI==false?
					<>
						{
							mobileUserInformation(
								personalInformation.firstName,
								displayMobileProfileOptions,
								personalInformation.isOligarch
							)
						}
					</>:
					<>
						<div id="personalInformationDisplayDiv" 
							style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
							<p id="firstName" style={FirstNameCSS}>
								<b>{personalInformation.firstName}</b>
							</p>
							{editIcon()}
							{personalInformation.isOligarch==true &&(
								<div style={{cursor:"pointer",marginLeft:"5%"}}>
									{crownLogo()}
								</div>
							)}
							<div class="dropdown">
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"
									style={{backgroundColor:"white",borderStyle:"none",color:"black",marginLeft:"10%"}}
									onClick={()=>verfiyAdPayment()}>
									<span style={{color:"#797979"}} class="caret"></span>
								</button>

								<ul id="nodeInformationDropDownMenu" class="dropdown-menu" 
									style={{width:"200px",height:"200px",overflow:"auto",padding:"10px"}}>
									{loadingPersonalInformationVerification==true?
										<p>Loading...</p>:
										<React.Fragment>
											{/*
												<li style={{listStyle:"none",cursor:"pointer"}}>
													Payment
												</li>
												<hr/>
											*/}
											<li style={{listStyle:"none",cursor:"pointer"}} 
												onClick={()=>userInformation.displayTokenLevelDetails()}>
												Tokens
											</li>
											<hr/>

											{isAdOptionAllowed==true &&(
												<li style={{listStyle:"none",cursor:"pointer"}} 
													onClick={()=>userInformation.displayTokenLevelDetails()}>
													Ads
												</li>
											)}
										</React.Fragment>
									}
								</ul>
						  	</div>
						</div>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",marginBottom:"20px"}}>
								<a style={{textDecoration:"none"}} href="javascript:void(0);">
									<FriendsAndIndustryDisplayButton onClick={()=>changeDisplayFriendsPortal(true)}>
										View Recruits
									</FriendsAndIndustryDisplayButton>
								</a>
							</li>
							<hr id="mobileDivider" style={{display:"none"}}/>
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


					}
			</>
		)
	}

	const closeProfileSettingsModal=()=>{
		changeDisplayProfileSettingsPage(false);
	}

	const profileSettingsDisplay=()=>{
		return(
			<React.Fragment>
				{displayProfileSettingsPage==true &&(
					<ProfileSettingsModal
						closeModal={closeProfileSettingsModal}
						userProfilePicture={props.personalInformation.profilePicture}
					/>
				)}
			</React.Fragment>
		)
	}

	const closeOligarchModal=()=>{
		changeDisplayOligarchPage(false);
	}

	const oligarchDisplayPage=()=>{
		return(
			<React.Fragment>
				{displayOligarchPage==true &&(
					<OligarchPortalDisplay
						closeOligarchModal={closeOligarchModal}
						ownerFirstName={props.personalInformation.firstName}
						ownerId={props.personalInformation._id}
					/>
				)}
			</React.Fragment>
		)
	}


	return(
		<Container>
			{profileSettingsDisplay()}
			{oligarchDisplayPage()}
			{props.isLoading==false &&(
				<React.Fragment>
					{displayFriendsPortal==true &&(
							<FriendsPortal
								userId={props.personalInformation._id}
								closeModal={closeFriendsPortal}
								isOwner={props.personalInformation.isOwnProfile}
							/>
						)}
					{displaySymposiumsPortal==true &&(
						<SymposiumPortal
							userId={props.personalInformation._id}
							closeModal={closeFollowedSymposiumsPortal}
							isOwner={props.personalInformation.isOwnProfile}
						/>
					)}
					{props.personalInformation.isGuestProfile==true?
						<GuestLockScreenHOC
							component={userInformationComponent(
									props.personalInformation,
									props.displayDesktopUI,
									props.displayMobileProfileOptionsTrigger
							)}
						/>:
						<>{userInformationComponent(
								props.personalInformation,
								props.displayDesktopUI,
								props.displayMobileProfileOptionsTrigger
							)}</>
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
			)}
		</Container>
	)
}
export{
	PersonalInformation,
	RecruitButton
};


