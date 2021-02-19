import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from "react-router-dom";
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MapIcon from '@material-ui/icons/Map';
import HowToRegIcon from '@material-ui/icons/HowToReg';

import {useSelector,useDispatch} from "react-redux";
import {loginPersonalPage} from "../../../../Actions/Redux/Actions/PersonalProfile.js";
import {loginCompanyPage} from "../../../../Actions/Redux/Actions/CompanyActions.js";
import SearchBarModal from "./SearchBarModal.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import AnonymousSuggestionPortal from "./AnonymousSuggestionPortal.js";

import {
	Container,
	SearchButton,
	PersonalProfileChatContainer,
	PersonalProfileNotificationsContainer,
	CompanyProfileChatContainer,
	CompanyProfileNotificationsContainer,
	NavBarButton,
	CreateButton,
	BackgroundContainer
} from "./NavBarCSS.js";
import {
	getNotifications,
	notificationStatusCheck,
	clearNewNotifications
} from "../../../../Actions/Requests/NotificationsRequests.js";
import Notifications from "../../NotificationComponent/index.js";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";

const NotificationIconContainer=styled.div`
	border-radius:50%;
	background-color:${({displayNotificationIndicator})=>(displayNotificationIndicator ?"red":"#C8B0F4")}
	border-color:white;
	border-style:solid;
	border-width:5px;
	margin-right:2%;
	cursor:pointer;

	${({ displayNotificationIndicator }) =>
    displayNotificationIndicator ?
    `
    animation: glowing 1300ms infinite;
     background: #C8B0F4;
     @keyframes glowing {
	      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
	      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
	      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
	  }
    `:
	`
	border-color:#A4A4A4;
	background:#BDBDBD;
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
`;
/*
	So right now the nav bar is just explore, home page, and view messages
	in the future I want to add the option of profile picture, notifications and other pages 
	to it 

	Component will have to be refactored later cause it lowkey dont make sense 
*/

const NavBar=(pageProps)=>{
	const dispatch=useDispatch();
	
	const {
			pageProps:{
				targetDom
			}
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

	const [displayNotificationIndicator,changeDisplayNotificationIndicator]=useState(false);
	const [displayNotifications,changeDisplayNotifications]=useState(false);
	const [notifications,changeNotifications]=useState();
	const [reloadNotificationAccessToken,changeReload]=useState(false);
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
				statusCheckTrigger({id,isAccessTokenUpdated:false})
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
			pageProps.pageProps.displayChatPage("personal");
	}

	const displayChatContainerForCompanyPage=(pageProps)=>{
			pageProps.pageProps.displayChatPage("company");
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

	const logoutUser=()=>{
		
	}

	const fetchNotificationData=async()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeDisplayNotifications(true);
		}
	}

	const personalProfileIpadPages=()=>{
		return(
			<>
				<TestContainaer> 
					<NotificationIconContainer displayNotificationIndicator={displayNotificationIndicator} onClick={()=>fetchNotificationData()}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-urgent" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
						  <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
						  <rect x="6" y="16" width="12" height="4" rx="1" />
						</svg>
					</NotificationIconContainer>
					<div style={{marginLeft:"5%"}}>
						<ul style={{padding:"0px"}}>
							<div class="dropdown">
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={RouteOptionCSS}>
									<NavBarButton>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<AccountCircleIcon/>
										</li>

										<li style={{listStyle:"none",display:"inline-block"}}>
											Me
										</li>
									</NavBarButton>
								</button>

								<ul class="dropdown-menu">
									<li>
										<Link to={`/profile/${personalProfileState.id}`}>Me</Link>
									</li>
									<li>
										<Link onClick={()=>logoutUser()} to={{pathname:`/logout`,state:{isLoggedOut:true}}}>
											Logout
										</Link>
									</li>
									<hr/>
									<li style={{cursor:"pointer",paddingLeft:"10px"}} onClick={()=>changeDispalyAnonymousTipsPortal(true)}>
										Send opinion
									</li>
								</ul>
							</div>
						</ul>
					</div>
					<CreateButton>
						<ul style={{padding:"0px"}}>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<AddCircleIcon
									/>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									Create
								</li>
						</ul>
					</CreateButton>

					<NavBarButton  to="/home">
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<ExploreIcon/>
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								Explore
							</li>
						</ul>
					</NavBarButton>

					<div>
					</div>
				</TestContainaer>
			</>
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

	return(
		<Container>
			{displayNotifications==true &&(
				<Notifications
					targetDom={targetDom}
					closeModal={closeNotificationsPortal}
					userId={personalProfileState.id}
					history={pageProps.pageProps.routerHistory}
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
						history={pageProps.pageProps.routerHistory}
						closeSearchModal={closeSearchModal}
					/>
				</React.Fragment>:
				<React.Fragment></React.Fragment>
			}
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",width:"100%",}}>
					<ul id="ULContainer" style={{padding:"0px",marginBottom:"2%"}}>
						{(displayPhoneUI==true || displayIpadUI==true)?
							<>
								<li id="mobileRoutesButton" style={{position:"relative",top:"-15px",marginLeft:"200px",marginRight:"1%",listStyle:"none",display:"inline-block"}}>
									<div class="dropdown">
										<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={MobileRouteOptionCSS}>
											<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-smart-home" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#C8B0F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
											  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
											  <path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105" />
											  <path d="M16 15c-2.21 1.333-5.792 1.333-8 0" />
											</svg>
										</button>

										<ul class="dropdown-menu">
											<li>
												<Link to={`/profile/${personalProfileState.id}`}>Me</Link>
											</li>
											<li>
												<p style={{cursor:"pointer",paddingLeft:"12%",marginTop:"5%"}}
												 	onClick={()=>fetchNotificationData()}>
													Notifications
												 </p>
											</li>
											<hr/>
											<li>
												<Link  to="/home">Home</Link>
											</li>

											<li>
												<Link to="/symposiumList">Symposiums</Link>
											</li>
											
											<hr/>
											<li>
												<Link onClick={()=>logoutUser()} to={{pathname:`/logout`,state:{isLoggedOut:true}}}>
													Logout
												</Link>
											</li>

											<li style={{cursor:"pointer",paddingLeft:"12%",marginTop:"10%"}} onClick={()=>changeDispalyAnonymousTipsPortal(true)}>
												Send opinion
											</li>
										</ul>
									</div>
								</li>
								<li id="searchLIContainer" 
									onClick={()=>changeDisplaySearchModal(!displaySearchModal)} 
									style={{marginLeft:"50%",width:"70%",listStyle:"none",display:"inline-block"}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search"
									  width="44" height="44" viewBox="0 0 24 24" stroke-width="2.5" stroke="#1C1C1C" 
									  fill="none" stroke-linecap="round" stroke-linejoin="round">
									  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									  <circle cx="10" cy="10" r="7" />
									  <line x1="21" y1="21" x2="15" y2="15" />
									</svg>
								</li>
							</>:
							<li id="searchLIContainer" 
								onClick={()=>changeDisplaySearchModal(!displaySearchModal)} 
								style={{marginRight:"4%",width:"70%",listStyle:"none",display:"inline-block"}}
							>
								<SearchButton 
									placeholder="Search"
								/>
							</li>
						}
					</ul>
				</li>
			</ul>

			{displayDesktopUI==true && (
				<ul style={{marginLeft:"27%",top:"7%"}}>
					{personalProfileIpadPages()}
				</ul>
			)}
		</Container>
	)

}

export default NavBar;