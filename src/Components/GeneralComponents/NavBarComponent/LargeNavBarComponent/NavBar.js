import React,{useState,useEffect} from "react";
import styled,{keyframes,css} from "styled-components";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from "react-router-dom";
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MapIcon from '@material-ui/icons/Map';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {useSelector,useDispatch} from "react-redux";
import {loginPersonalPage} from "../../../../Actions/Redux/Actions/PersonalProfile.js";
import {loginCompanyPage} from "../../../../Actions/Redux/Actions/CompanyActions.js";
import SearchBarModal from "./SearchBarModal.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import AnonymousSuggestionPortal from "./AnonymousSuggestionPortal.js";
import SympociaStampIcon from "../../../../designs/img/StampIcon.png";
import SearchIcon from '@material-ui/icons/Search';

import {
	Container,
	SearchButton,
	NavBarButton,
	CreateButton,
	BackgroundContainer,
	SearchContainer,
	SearchTextArea
} from "./NavBarCSS.js";
import {
	getNotifications,
	notificationStatusCheck,
	clearNewNotifications
} from "../../../../Actions/Requests/NotificationsRequests.js";
import {getProfilePicture} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import Notifications from "../../NotificationComponent/index.js";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";
import {getPostCreationUpdateStatuses} from "../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {hasUserViewedCommunity} from "../../../../Actions/Requests/SympociaCommunity/SympociaCommunityRetrieval.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AirPlane from "../../Airplanes/index.js";

const glowing=keyframes`
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
`;

const SympociaLogoContainer=styled.div`
	display:flex;
	flex-direction:row;
	align-items:center;
	margin-left:5%;
	text-decoration:none;
	cursor:pointer;

	#sympociaTitleId{
		${({ displayNewSympociaCommunityIndicator }) =>
	    displayNewSympociaCommunityIndicator==false &&(
	    	css`
			    animation: ${glowing} 1300ms infinite;
			    color: #C8B0F4 !important;
	    	`
	    )}
	}
`;


const PersonalInformationContainer=styled.div`
	display:flex;
	width:228px;
	flex-direction:row;
	align-items:center;
	margin-right:2%;
	border-radius:5px;
	padding:5px;
	border-style:solid;
	border-width:1px;
	border-color:${({displayNotificationIndicator})=>(displayNotificationIndicator ?"#FFFFFF":"#C8B0F4")};

	${({ displayNotificationIndicator }) =>
    displayNotificationIndicator ?
    css`
	    animation: ${glowing} 1300ms infinite;
	    border-color: #C8B0F4;
    `:
	`
		border-color:#E2E2E2;
	`}
`;




const NotificationIconContainer=styled.div`
	border-radius:50%;
	background-color:${({displayNotificationIndicator})=>(displayNotificationIndicator ?"#FFFFFF":"#C8B0F4")};
	border-style:solid;
	border-width:5px;
	margin-right:5%;
	cursor:pointer;

	${({ displayNotificationIndicator }) =>
    displayNotificationIndicator ?
    css`
	    animation: ${glowing} 1300ms infinite;
	    background-color: #C8B0F4;
    `:
	`
		border-color:#A4A4A4;
		background-color:#BDBDBD;
	`}


  	@media screen and (max-width:1200px){
			width:60px !important;
			height:60px !important;
    }
    @media screen and (max-width:1080px){
			width:50px !important;
			height:50px !important;
    }
     @media screen and (max-width:1080px){
			width:70px !important;
			height:70px !important;
    }
`;



const ButtonsListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"110px"
}

const ProfileDropDownListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"40px"
	
}

const ViewMessagesCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"sol  did",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const RouteOptionsDropDown={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
}

const MobileChatOptionCSS={
	borderStyle:"none",
	backgroundColor:"white"
}

const MobileRouteOptionCSS={
	color:"#5298F8",
	borderStyle:"none",
	backgroundColor:"white",
	padding:"10px"
}

const RouteOptionCSS={
	color:"#5298F8",
	borderStyle:"none",
	backgroundColor:"5298F8",
	padding:"10px"
}

const MobileSearchButtonCSS={
	marginTop:"10px",
	marginLeft:"27%",
	marginRight:"-25%",
	width:"70%",
	listStyle:"none",
	display:"inline-block"
}

const TestContainaer=styled.div`
	display:flex;
	flex-direction:row;
	justify-content:center;
`;

const StampIconCSS={
	width:"59px",
	height:"53px",
	borderRadius:"50%",
	marginRight:"10%"
}

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginLeft:"3%"
}

const PersonalPreferencesDropDownCSS={
	borderColor:"#5298F8",
	borderStyle:"none",
	textDecoration:"none",
	backgroundColor:"white",
	color:"#4E4E4E"
}

const PostUploadStatusNotificationCSS={
	backgroundColor:"#C8B0F4",
	width:"100%",
	height:"40%",
	padding:"10px",
	color:"white",
	justifyContent:"center",
	display:"flex",
	flexDirection:"row",
	transition:".8s"
}

const HorizontalLineCSS={
	marginLeft:"0",
	position:"relative",
	marginRight:"0",
	backgroundColor:"#272727",
	width:"2px",
	height:"30px"
}

const SignupButtonCSS={
	height:"15%",
	borderRadius:"5px",
	backgroundColor:"#272727",
	padding:"10px",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",
	fontSize:"16px",
	cursor:"pointer",
	boxShadow:"1px 1px 5px #6e6e6e"
}

const NavBar=(pageProps)=>{
	const dispatch=useDispatch();
	const {
		targetDom,
		page,
		componentMountedStatus,
		isTransparent,
		paramsPageId
	}=pageProps;
	const personalProfileState=useSelector(state=>state.personalInformation);
	const isGuestProfile=(personalProfileState.id=="0" || personalProfileState.isGuestProfile==true)==true?
					true:false;
	const companyProfileState=useSelector(state=>state.companyInformation);
	const [displayPersonalProfileIcon,changeDisplayPersonalProfileIcon]=useState(false);
	const [displayCompanyProfileIcon,changeDisplayCompanyProfileIcon]=useState(false);

	const [displaySearchModal,changeDisplaySearchModal]=useState(false);
	const [displayIpadUI,changeDisplayIpadUI]=useState(false);
	const [displayDesktopUI,changeDisplayDesktopUI]=useState(false);
	const [displayPhoneUI,changeDisplayPhoneUI]=useState(false);
	const [displayAnonymousTipsPortal,changeDispalyAnonymousTipsPortal]=useState(false);
	const [profilePicture,changeProfilePicture]=useState();

	const [displayNotificationIndicator,changeDisplayNotificationIndicator]=useState(false);
	const [displayNotifications,changeDisplayNotifications]=useState(false);
	const [notifications,changeNotifications]=useState();
	const [reloadNotificationAccessToken,changeReload]=useState(false);
	const [displayPostUploadStatus,changeDisplayUploadPostStatus]=useState(false);
	const [displayNewSympociaCommunityIndicator,changeDisplaySympociaCommunityIndicator]=useState(false);

	let {
			refreshToken,
			accessToken,
			id
		}=personalProfileState;

	const triggerUIChange=()=>{
		if(window.innerWidth<595){

			changeDisplayIpadUI(false);
			changeDisplayDesktopUI(false);
			changeDisplayPhoneUI(true);

		}else if(window.innerWidth<1370){

			changeDisplayIpadUI(true);
			changeDisplayDesktopUI(false);
			changeDisplayPhoneUI(false); 

		}else{
			changeDisplayIpadUI(false);
			changeDisplayDesktopUI(true);
			changeDisplayPhoneUI(false);
		}
	}

	const triggerSetTimeout=(seconds)=>{    
		return new Promise(resolve => setTimeout(resolve, seconds));
	}

	useEffect(()=>{
		const initialSetUp=async()=>{
			if(isGuestProfile==false){
				const statusCheck=statusCheckTrigger({id,isAccessTokenUpdated:false})
				const profilePictureRetrieval=profilePictureRetrievalTrigger(id);
				const postUpdateStatusesRetrieval=postCreationUpdateStatusesTrigger(id);
				userViewCommunityRecentlyTrigger(id);
			}
			changeDisplayPersonalProfileIcon(true);
			triggerUIChange();
			/*
				const notificationTriggerCheck=true;
				while(notificationTriggerCheck){
						await triggerSetTimeout(10000);
						const {confirmation,data}=await notificationStatusCheck(personalProfileState.id);
						if(confirmation=="Success"){
							if(data==true){
								changeDisplayNotificationIndicator(true);
							}
						}
					}

				let test;
				statusCheckTrigger({id,isAccessTokenUpdated:false})

				
				while(notificationTriggerCheck){
						
						
						await triggerSetTimeout(40000);
						const updatedToken=await statusCheckTrigger({accessToken,id,isAccessTokenUpdated:false});
						test=updatedToken;
				}
			*/
		}
		initialSetUp();
	},[])

	window.addEventListener('resize',triggerUIChange)

	const userViewCommunityRecentlyTrigger=async(id)=>{
		const {confirmation,data}=await hasUserViewedCommunity(id);
		if(confirmation=="Success"){
			const {message}=data;
			changeDisplaySympociaCommunityIndicator(message)
		}
	}
	const postCreationUpdateStatusesTrigger=async(id)=>{
		const {confirmation,data}=await getPostCreationUpdateStatuses(id);
		if(confirmation=="Success"){
			const {message}=data;
			if(message.length>0){
				changeDisplayUploadPostStatus(true);
				setTimeout(()=>{
					changeDisplayUploadPostStatus(false);
				},2000);	
			}
		}

	}
	const profilePictureRetrievalTrigger=async(id)=>{
		const {confirmation,data}=await getProfilePicture(id);
		if(confirmation=="Success"){
			changeProfilePicture(data);
		}
	}
	const statusCheckTrigger=async({id,isAccessTokenUpdated,updatedAccessToken})=>{
		
		const {confirmation,data}=await notificationStatusCheck(
											id,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalProfileState.accessToken
										);
		if(confirmation=="Success"){
			const {message}=data;
			if(message==true){
				changeDisplayNotificationIndicator(true);
			}else{
				changeDisplayNotificationIndicator(false);
			}
			return updatedAccessToken;
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalProfileState.refreshToken,
					id,
					statusCheckTrigger,
					dispatch,
					{
						id
					},
					false,
					personalProfileState.isTokenRefreshing
				);
			}
		}
	} 



	const displayChatContainerForPersonalPage=(pageProps)=>{
		pageProps.displayChatPage("personal");
	}

	const displayChatContainerForCompanyPage=(pageProps)=>{
		pageProps.displayChatPage("company");
	}

	const logInToCompanyProfile=()=>{
		dispatch(loginCompanyPage(true));
		dispatch(loginPersonalPage(false));
	}

	const loginToPersonalProfile=()=>{
		dispatch(loginCompanyPage(false));
		dispatch(loginPersonalPage(true));
	}

	const closeSearchModal=()=>{
		changeDisplaySearchModal(false);
	}

	const fetchNotificationData=async()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeDisplayNotifications(true);
		}
	}

	const MobileUI=()=>{
		return(
			<React.Fragment>
				<div id="mobileRoutesButton">
					<div class="dropdown">
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={MobileRouteOptionCSS}>
							<svg id="routeIcon" xmlns="http://www.w3.org/2000/svg" 
								class="icon icon-tabler icon-tabler-smart-home" width="44" height="35" viewBox="0 0 24 24" 
								stroke-width="1.5" stroke="#C8B0F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							  <path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105" />
							  <path d="M16 15c-2.21 1.333-5.792 1.333-8 0" />
							</svg>
						</button>

						<ul class="dropdown-menu" style={{marginLeft:"10px"}}>
							<li>
								{(personalProfileState.id==0 || personalProfileState.isGuestProfile)==true?
									<Link to='/signup'>Sign Up</Link>:
									<Link to={`/profile/${personalProfileState.id}`}>Me</Link>
								}
							</li>
							{NotificationPrompt()}
							<hr/>
							<li>
								<Link  to="/home">Home</Link>
							</li>

							<li>
								<Link to="/symposiumList">Symposiums</Link>
							</li>
							
							<hr/>
							<li>
								<Link to='/payment'>Payment Options</Link>
							</li>
							<li>
								<Link to='/ad'>Ads</Link>
							</li>
							

							<hr/>
							<li>
								<Link to={{pathname:`/logout`,state:{isLoggedOut:true}}}>
									Logout
								</Link>
							</li>

							<li style={{cursor:"pointer",paddingLeft:"12%",marginTop:"10%"}} onClick={()=>changeDispalyAnonymousTipsPortal(true)}>
								Send opinion
							</li>
							<hr/>
							{SympociaCommunityPrompt()}
						</ul>
					</div>
				</div>
				<div>
					<svg id="searchIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search"
						id="searchLIContainer" onClick={()=>changeDisplaySearchModal(!displaySearchModal)}
					  width="44" height="44" viewBox="0 0 24 24" stroke-width="2.5" stroke="#1C1C1C" 
					  fill="none" stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="10" cy="10" r="7" />
					  <line x1="21" y1="21" x2="15" y2="15" />
					</svg>
				</div>
			</React.Fragment>
		)
	}
	const SympociaCommunityPrompt=()=>{
		let sympociaCommunityStyle={
			cursor:"pointer",
			paddingLeft:"15%",
			marginTop:"15%",
			padding:"5px"
		}
		let prompt;
		if(displayNewSympociaCommunityIndicator==false){
			sympociaCommunityStyle={
				...sympociaCommunityStyle,
				backgroundColor:"#C8B0F4",
				color:"white"
			}
			prompt="(New) Sympocia Community"
		}else{
			sympociaCommunityStyle={
				...sympociaCommunityStyle,
				backgroundColor:"white",
				color:"black"
			}
			prompt="Sympocia Community"
		}
		return(
			<Link to={{pathname:`/sympociaCommunity`}}>
				<p style={sympociaCommunityStyle}>
					{prompt}
				 </p>
			</Link>
		)
	}


	const NotificationPrompt=()=>{
		let notificationStyle={
			cursor:"pointer",
			paddingLeft:"12%",
			marginTop:"5%"
		}
		let prompt;
		if(displayNotificationIndicator==true){
			notificationStyle={
				...notificationStyle,
				backgroundColor:"#C8B0F4",
				color:"white"
			}
			prompt="(New) Notifications"
		}else{
			notificationStyle={
				...notificationStyle,
				backgroundColor:"white",
				color:"black"
			}
			prompt="Notifications"
		}
		return(
			<li>
				<p style={notificationStyle}
				 	onClick={()=>fetchNotificationData()}>
					{prompt}
				 </p>
			</li>
		)
	}

	const desktopUI=()=>{
		const homeIconBackgroundFill=isTransparent==true?"#212121":"white";
		const sympociaTitleColor=isTransparent==true?"white":"#212121";
		return(
			<React.Fragment>
				<Link style={{textDecoration:"none"}} to={{pathname:`/sympociaCommunity`}}>
					<SympociaLogoContainer displayNewSympociaCommunityIndicator={displayNewSympociaCommunityIndicator}>
							<img src={SympociaStampIcon} style={StampIconCSS}/>
							<p style={{fontSize:"18px",color:sympociaTitleColor}}>
								<b>Sympocia</b>
							</p>
							{displayNewSympociaCommunityIndicator==false &&(
								<p id="sympociaTitleId" style={{padding:"5px",borderRadius:"5px",marginLeft:"5%",color:"#C8B0F4"}}>
									<b>New</b>
								</p>
							)}
					</SympociaLogoContainer>
				</Link>

				<div style={{display:"flex",alignItems:"center",cursor:"pointer",width:"50%",justifyContent:"space-between"}}>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
						<ExploreIcon
							style={{fontSize:"25",marginTop:"-10px"}}
						/>
						<p style={{fontSize:"16px"}}>
							<Link style={{color:"#151515",textDecoration:"none"}} to="/home">
								Explore
							</Link>
						</p>

					</div>
					<p style={{fontSize:"16px",color:"#151515",marginRight:"5%",marginLeft:"5%"}}>
						<Link style={{color:"#151515",textDecoration:"none"}} to="/symposiumList">
							Symposiums
						</Link>
					</p>

					<div class="dropdown">
						<button class="btn btn-primary dropdown-toggle" 
							type="button" data-toggle="dropdown" style={PersonalPreferencesDropDownCSS}>
							<MoreHorizIcon
								style={{fontSize:"36"}}
							/>
						</button>
					   	<ul class="dropdown-menu">
							<li>
								<Link to='/payment'>Payment Options</Link>
							</li>
							<hr/>
							<li>
								<Link to='/ad'>Ads</Link>
							</li>
						</ul>
					</div>

					<SearchContainer onClick={()=>changeDisplaySearchModal(!displaySearchModal)}>
		                <SearchTextArea
		                    placeholder="Search"
		                />
		                <SearchIcon
		                    style={{fontSize:30}}
		                />
		            </SearchContainer>
				</div>

				{(personalProfileState.id==0 || personalProfileState.isGuestProfile)==true?
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"10%",marginRight:"2%"}}>
						<p style={{fontSize:"16px",cursor:"pointer"}}>
							<Link style={{textDecoration:"none",color:"black"}}
								to={{pathname:`/logout`,state:{isLoggedOut:true}}}>
								Login
							</Link>
						</p>
						<div style={HorizontalLineCSS}/>
						<div style={SignupButtonCSS}>
							<Link style={{color:"white"}} to={{pathname:`/signup`}}>Signup</Link>
						</div>
					</div>:
					<PersonalInformationContainer displayNotificationIndicator={displayNotificationIndicator}>
						<div class="dropdown">
							<button class="btn btn-primary dropdown-toggle" 
								type="button" data-toggle="dropdown" style={PersonalPreferencesDropDownCSS}>
								<b>Me</b>
							</button>

						   	<span class="caret"></span>
						   	<ul class="dropdown-menu">
								<li>
									{(personalProfileState.id==0 || personalProfileState.isGuestProfile)==true?
										<Link to='/signup'>Sign Up</Link>:
										<Link to={`/profile/${personalProfileState.id}`}>Me</Link>
									}
								</li>
								{NotificationPrompt()}
								<hr/>
								<li> 
									<Link to={{pathname:`/logout`,state:{isLoggedOut:true}}}>
										{personalProfileState.isGuestProfile==true?
											<p>Log In</p>:
											<p>Logout</p>
										}
									</Link>
								</li>
								<hr/>
								<li style={{cursor:"pointer",paddingLeft:"12%",marginTop:"10%"}} onClick={()=>changeDispalyAnonymousTipsPortal(true)}>
									Send opinion
								</li>
							</ul>
						</div>
						<div style={VerticalLineCSS}/>
						<img src={profilePicture==null?NoProfilePicture:profilePicture} 
							style={{marginLeft:"50%",width:"39px",height:"36px",borderRadius:"50%"}}
						/>
					</PersonalInformationContainer>
				}

			</React.Fragment>
		)
	}

	const closeAnonymousTipPortals=()=>{
		changeDispalyAnonymousTipsPortal(false);
	}

	const closeNotificationsPortal=()=>{
		closeNotificationsPortalTrigger({isAccessTokenUpdated:false});
	}


	const closeNotificationsPortalTrigger=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const {confirmation,data}=await clearNewNotifications(
											personalProfileState.id,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalProfileState.accessToken
										);

		if(confirmation=="Success"){
			changeDisplayNotifications(false);
			changeDisplayNotificationIndicator(false);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalProfileState.refreshToken,
						id,
						closeNotificationsPortalTrigger,
						dispatch,
						{},
						false
					);
			}
		}
	}

	const postUploadStatusNotification=()=>{
		return(
			<React.Fragment>
				{displayPostUploadStatus==true &&(
					<div style={PostUploadStatusNotificationCSS}>
						<p>Awesome :) Your post and/or video description has been uploaded</p>
						<HighlightOffIcon
							style={{fontSize:"20",color:"white"}}
						/>
					</div>
				)}
			</React.Fragment>
		)
	}

	return(
		<Container isTransparent={isTransparent}>
			{displayNotifications==true &&(
				<Notifications
					targetDom={targetDom}
					closeModal={closeNotificationsPortal}
					userId={personalProfileState.id}
					history={pageProps.routerHistory}
					tokens={{
						accessToken:personalProfileState.accessToken,
						refreshToken:personalProfileState.refreshToken
					}}
				/>
			)}
			{displayAnonymousTipsPortal==true &&(
				<AnonymousSuggestionPortal
					closeModal={closeAnonymousTipPortals}
					targetDom={targetDom}
				/>
			)}
			{displaySearchModal==true?
				<React.Fragment>
					<BackgroundContainer onClick={()=>changeDisplaySearchModal(!displaySearchModal)}/>
					<SearchBarModal
						history={pageProps.routerHistory}
						closeSearchModal={closeSearchModal}
					/>
				</React.Fragment>:
				<React.Fragment></React.Fragment>
			}
			<AirPlane 
				currentPage={page}
				componentMountedStatus={componentMountedStatus}
				userId={id}
				paramsId={paramsPageId}
			/>
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:"5px"}}>
				{displayDesktopUI==true ?
					<>{desktopUI()}</>:
					<>{MobileUI()}</>
				}
			</div>
			{postUploadStatusNotification()}
		</Container>
	)

}

export default NavBar;