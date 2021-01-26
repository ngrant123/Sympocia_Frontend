import React,{useState,useEffect} from "react";
import styled from "styled-components";
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

const Container=styled.div`
	padding:20px;
	@media screen and (max-width:600px){
		width:180% !important;
		#userPictureAndNameLI{
			width:90% !important;
		}
		#pictureLI{
			width:30% !important;
		}
		#nameLI{
			width:90% !important;
		}
		#descriptionAndSubmitLI{
			margin-left:-5% !important;
			border-style:none !important;
			border-left:none !important;
		}
	}

    @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
	 	#descriptionAndSubmitLI{
			margin-left:10% !important;
			border-style:none !important;
			border-left:none !important;
		}
		#pictureLI{
			width:10% !important;
			height:50% !important;
		}
    }
`;

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
	width:90%;
	margin-bottom:2%;

	@media screen and (max-width:600px){
		width:50% !important;
	}
`;

const DescriptionTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	height:140px;
	width:90%;
	margin-bottom:2%;

	@media screen and (max-width:700px){
		width:50% !important;
	}
`;

const SubmitButton=styled.div`
	position:relative;
	color:white;
	padding:10px;
	width:50%;
	height:10%;
	background-color:#C8B0F4;
	border-radius:5px;
	cursor:pointer;
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

const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
`;

const DescriptionModal=(props)=>{
	console.log("Testing sponsor modal");
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

	useEffect(()=>{
		debugger;
		if(isAccessTokenRefreshTriggered==true){
			dispatch(setPersonalProfileAccessToken(currentAccessToken));
			dispatch(setPersonalProfileRefreshToken(personalReduxInformation.refreshToken));
			handleSubmitButton(contextPersonalInformation,contextCompanyInformation);
		}
	},[currentAccessToken]);

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

	const handleSubmitButton=async(personalInformation,companyInformation)=>{
		debugger;
		changeIsProcessingSubmittion(true);
		const name=document.getElementById("name").value;
		const description=document.getElementById("description").value;

		const ChampionModalObject={
			name:name,
			imgUrl:props.imgData,
			description:description,
			tikTokUrl:tikTokUlr,
			instagramUrl:instagramUrl
		}
		personalInformation.displayChampionModal(ChampionModalObject);
		const {confirmation,data}=await createChampion(
											personalReduxInformation.id,
											ChampionModalObject,
											currentAccessToken
										);
		if(confirmation=="Success"){
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
	
	return(
		<UserConsumer>
			{personalInformation=>(
				<CompanyConsumer>
					{companyInformation=>(
						<Container>
							<ul style={{padding:"10px",paddingTop:"2px"}}>
								<li style={BackButtonCSS} onClick={()=>props.backButton()}>
									<a style={{textDecoration:"none"}} href="javascript:void(0);">
										Back
									</a>
								</li>

								<DescriptionContainer>
									<img id="pictureLI" src={props.imgData} style={{marginBottom:"2%",position:"relative",width:"30%",height:"40%",borderRadius:"50%"}}/>
									<NameTextArea id="name" placeholder="Enter a name here"/>
									<DescriptionTextArea id="description" placeholder="Enter a description"/>

									{isProcessingSubmittion==true?
										<p>Loading please wait...</p>:
										<SubmitButton onClick={()=>handleSubmitButton(personalInformation,companyInformation)}>
											Submit
										</SubmitButton>
									}
								</DescriptionContainer>
							</ul>
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