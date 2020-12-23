import React,{useState} from "react";
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
			width:5% !important;
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
	width:130%;
	@media screen and (max-width:600px){
		width:60% !important;
	}
`;

const DescriptionTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	height:50%;
	width:165%;

	@media screen and (max-width:600px){
		width:120% !important;
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


const DescriptionModal=(props)=>{
	console.log("Testing sponsor modal");
	const [instagramUrl,changeInstagramUrl]=useState();
	const [tikTokUlr,changeTikTokUrl]=useState();
	const personalReduxInformation=useSelector(state=>state.personalInformation);
	const [currentAccessToken,changeCurrentAccessToken]=useState(personalReduxInformation.accessToken);

	const dispatch=useDispatch();

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

	const handleSubmitButton=async({personalInformation,companyInformation})=>{
		debugger;
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
				const {confirmation,data}=await refreshTokenApi({
					userId:personalReduxInformation.id,
					refreshToken:personalReduxInformation.refreshToken
				})

				if(confirmation=="Success"){
					const {message:{
						accessToken,
						refreshToken
					}}=data;
					dispatch(setPersonalProfileAccessToken(accessToken));
					dispatch(setPersonalProfileRefreshToken(refreshToken));
					changeCurrentAccessToken(accessToken);
					handleSubmitButton({personalInformation,companyInformation});
				}else{
					alert('Unfortunately something has gone wrong. Please log out and sign back in again');
				}
			}else{
				alert('Unfortunately an error has occured when trying to update your champion. Please try again');
			}
		}
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
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"10px"}}>
										<li id="userPictureAndNameLI" style={{listStyle:"none",display:"inline-block",marginRight:"15%",width:"30%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",marginBottom:"30px"}}>
														<img id="pictureLI" src={props.imgData} style={{position:"relative",width:"110%",height:"35%",borderRadius:"50%"}}/>
												</li>
												<p><b>Name</b></p>
												<li id="nameLI" style={{listStyle:"none",marginBottom:"2%"}}>
													<NameTextArea id="name" placeholder="Enter a name here"/>
												</li>
											</ul> 
										</li>

										<li id="descriptionAndSubmitLI" style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",borderLeft:"solid",borderColor:"#D8D8D8"}}>
											<ul style={{paddingLeft:"25px"}}>
												<p>
													<b>Description</b>
												</p>
												<li style={{listStyle:"none",marginBottom:"5%"}}>
													<DescriptionTextArea id="description" placeholder="Start writing"/>
												</li>

												<li style={{listStyle:"none"}}>
													<SubmitButton onClick={()=>handleSubmitButton({personalInformation,companyInformation})}>
														Submit
													</SubmitButton>
												</li>
											</ul>
										</li>
									</ul>
								</li>
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