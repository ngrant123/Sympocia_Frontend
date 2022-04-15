import React,{useState,useEffect} from "react";
import 'react-calendar/dist/Calendar.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Icon, InlineIcon } from '@iconify/react';
import tiktokIcon from '@iconify/icons-simple-icons/tiktok';
import {UserConsumer} from "../../../UserContext.js";
import {CompanyConsumer} from "../../../../CompanyProfile/CompanyContext.js";
import {createCompanyChampion} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPagePostRequests.js";
import {createChampion} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {refreshTokenApi} from "../../../../../../Actions/Requests/JWTRequests.js";
import {
	setPersonalProfileAccessToken,
	setPersonalProfileRefreshToken,
	addName
} from "../../../../../../Actions/Redux/Actions/PersonalProfile.js"; 
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Calendar from 'react-calendar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
	Container,
	ProfilePicture,
	NameTextArea,
	SympociaProfileSearchTextArea,
	DescriptionTextArea,
	SubmitButton,
	ShadowContainer
} from "./DescriptionModalCSS.js";


const BackButtonCSS={
	listStyle:"none",
	borderRadius:"5px",
	borderStyle:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px",
	color:"#5298F8",
	width:"30%",
	padding:"10px",
	marginBottom:"5%",
	cursor:"pointer"
}

const ChampionPictureCSS={
	marginBottom:"2%",
	position:"relative",
	width:"30%",
	height:"140px",
	borderRadius:"5px"
}

const DescriptionModal=(props)=>{
	const [currentCalendarTimeStamp,changeCalendarTimeStamp]=useState(new Date());
	const [instagramUrl,changeInstagramUrl]=useState();
	const [tikTokUlr,changeTikTokUrl]=useState();
	const personalReduxInformation=useSelector(state=>state.personalInformation);
	const [currentAccessToken,changeCurrentAccessToken]=useState(personalReduxInformation.accessToken);
	const [isAccessTokenRefreshTriggered,changeIsAccessTokenTriggered]=useState(false);
	const [isProcessingSubmittion,changeIsProcessingSubmittion]=useState(false);

	const [contextPersonalInformation,changeContextPersonalInformation]=useState();
	const [contextCompanyInformation,changeContextCompanyInformation]=useState();
	const dispatch=useDispatch();
	const [displayIGUrlPrompt,changeDisplayIGUrlPrompt]=useState(false);
	const [displayTikTokUrlPrompt,changeDisplayTikTokUrlPrompt]=useState(false);
	const [displayChampionExpirationDate,changeChampionExpirationDateDisplay]=useState(false);
	const [displayProfileTagModal,changeProfileTagModalDisplay]=useState(false);

	const [selectedDisplayDate,changeDisplayDate]=useState();
	const [loadingProfilesPrompt,changeLoadingProfilesPrompt]=useState(false);
	const [searchProfiles,changeSearchedProfiles]=useState();

	const [championName,changeChampionName]=useState();
	const [championDescription,changeChampionDescription]=useState();

	useEffect(()=>{
		if(isAccessTokenRefreshTriggered==true){
			dispatch(setPersonalProfileAccessToken(currentAccessToken));
			dispatch(setPersonalProfileRefreshToken(personalReduxInformation.refreshToken));
			handleSubmitButton(contextPersonalInformation,contextCompanyInformation);
		}

		const {selectedSympociaProfile}=props;
		if(selectedSympociaProfile!=null){
			const {firstName}=selectedSympociaProfile;
			document.getElementById("name").value=firstName;
		}
	},[currentAccessToken]);

	useEffect(()=>{
		if(displayChampionExpirationDate==false){
			displayPreviouslyEnteredValues();
		}
	},[displayChampionExpirationDate]);

	useEffect(()=>{
		const {previousChampionInformation}=props;
		if(previousChampionInformation!=null){
		}
	},[]);

	const handleSubmitButton=async(personalInformation,companyInformation)=>{
		
		changeIsProcessingSubmittion(true);
		const name=document.getElementById("name").value;
		const description=document.getElementById("description").value;

		if(name==""){
			alert('Please enter minimum a name for your champion');
			changeIsProcessingSubmittion(false);
		}else{
			const ChampionModalObject={
				name:name,
				imgUrl:props.imgData,
				description:description, 
				expirationDate:new Date(selectedDisplayDate).getTime(),
				sympociaProfileLinkedId:props.selectedSympociaProfile!=null?
				props.selectedSympociaProfile._id:null
			}
			const {confirmation,data}=await createChampion(
												personalReduxInformation.id,
												ChampionModalObject,
												currentAccessToken
											);
			if(confirmation=="Success"){
				personalInformation.displayChampionModal(ChampionModalObject);
				props.closeModal();
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					const refreshTokenResponse=await refreshTokenApi({
						userId:personalReduxInformation.id,
						refreshToken:personalReduxInformation.refreshToken
					})

					const refreshTokenConfirmation=refreshTokenResponse.confirmation;
					const refreshTokenData=refreshTokenResponse.data;


					if(refreshTokenConfirmation=="Success"){
						const {message:{
							accessToken,
							refreshToken
						}}=refreshTokenData;
						changeContextPersonalInformation(personalInformation)
						changeIsAccessTokenTriggered(true);
						changeCurrentAccessToken(accessToken);
					}else{
						alert('Unfortunately something has gone wrong. Please log out and sign back in again');
					}
				}else{
					alert('Unfortunately an error has occured when trying to update your champion. Please try again');
				}
			}
			changeIsProcessingSubmittion(false);
		}
	}

	const triggerOnChangeTimeStamp=(timeStampEvent)=>{
		changeCalendarTimeStamp(timeStampEvent);
		var date = new Date(timeStampEvent.toString());
		var newDate= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
		changeDisplayDate(newDate);
		changeChampionExpirationDateDisplay(false);
	}

	const resetSelectedDisplayDate=()=>{
		changeDisplayDate(null);
		changeCalendarTimeStamp(new Date());
	}
	const displayInitialScreen=()=>{
		changeChampionExpirationDateDisplay(false);
	}

	const displayPreviouslyEnteredValues=()=>{
		if(championName!=null){
			document.getElementById("name").value=championName;
		}

		if(championDescription!=null){
			document.getElementById("description").value=championDescription;
		}
	}

	const triggerAccessExpirationOptions=()=>{
		const currentName=document.getElementById("name").value;
		const currentDescription=document.getElementById("description").value;
		if(currentName!=""){
			changeChampionName(currentName);
		}

		if(currentDescription!=""){
			changeChampionDescription(currentDescription);
		}
		changeChampionExpirationDateDisplay(true);
	}

	return(
		<UserConsumer>
			{personalInformation=>(
				<CompanyConsumer>
					{companyInformation=>(
						<Container>
							{displayChampionExpirationDate==false?
								<React.Fragment>
									<div id="backButton" style={BackButtonCSS} onClick={()=>props.backButton()}>
										Back
									</div>
									<div id="selectedChampionImageAndDate" 
										style={{display:"flex",flexDirection:"row"}}>
										<img id="pictureLI" src={props.imgData} style={ChampionPictureCSS}/>

										<hr id="mobileHorizontalDivider" style={{width:"100%",display:"none"}}/>

										<div style={{display:"flex",flexDirection:"column",marginLeft:"2%"}}>
											<div style={{marginBottom:"10%"}}>
												{selectedDisplayDate==null ?
													<AccessTimeIcon
														style={{fontSize:"30",cursor:"pointer"}}
														onClick={()=>triggerAccessExpirationOptions()}
													/>
													:<div style={{display:"flex",flexDirection:"column"}}>
														{selectedDisplayDate}
														<HighlightOffIcon
															style={{fontSize:"20",cursor:"pointer"}}
															onClick={()=>resetSelectedDisplayDate()}
														/>
													</div>
												}
											</div>
										</div>
									</div>
									<hr id="mobileHorizontalDivider" style={{display:"none"}}/>
									<NameTextArea id="name" placeholder="Enter a name here"/>
									<DescriptionTextArea id="description" placeholder="Enter a description"/>

									{isProcessingSubmittion==true?
										<p id="loadingText">Loading please wait...</p>:
										<SubmitButton onClick={()=>handleSubmitButton(personalInformation,companyInformation)}>
											Submit
										</SubmitButton>
									}
								</React.Fragment>:
								<React.Fragment>
									<div id="backButton" style={BackButtonCSS} 
										onClick={()=>displayInitialScreen()}>
										Back
									</div>
									<p>
										<b>Choose an expiration date for your champion:</b>
									</p>
									<Calendar
										id="reactCalendarDiv"
								        onChange={triggerOnChangeTimeStamp}
								        value={currentCalendarTimeStamp}
			    					/>
								</React.Fragment>
							}
						</Container>
							)
						}
					</CompanyConsumer>
				)
			}

		</UserConsumer>
	)
}

export default DescriptionModal;