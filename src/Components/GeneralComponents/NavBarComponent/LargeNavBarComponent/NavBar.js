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
	backgroundColor:"white"
}

const MobileSearchButtonCSS={
	marginTop:"10px",
	marginLeft:"27%",
	marginRight:"-25%",
	width:"70%",
	listStyle:"none",
	display:"inline-block"
}

/*
So right now the nav bar is just explore, home page, and view messages
in the future I want to add the option of profile picture, notifications and other pages 
to it 
*/

const NavBar=(pageProps)=>{
	const dispatch=useDispatch();
	console.log(pageProps);
	const {
			pageProps:{
				targetDom
			}
		}=pageProps;

	const personalProfileState=useSelector(state=>state.personalInformation);
	const companyProfileState=useSelector(state=>state.companyInformation);
	const [displayPersonalProfileIcon,changeDisplayPersonalProfileIcon]=useState(false);
	const [displayCompanyProfileIcon,changeDisplayCompanyProfileIcon]=useState(false);

	const [displaySearchModal,changeDisplaySearchModal]=useState(false);
	const [displayIpadUI,changeDisplayIpadUI]=useState(false);
	const [displayDesktopUI,changeDisplayDesktopUI]=useState(false);
	const [displayPhoneUI,changeDisplayPhoneUI]=useState(false);
	const [displayAnonymousTipsPortal,changeDispalyAnonymousTipsPortal]=useState(false);


	const triggerUIChange=()=>{
		if(window.innerWidth<595){

			changeDisplayIpadUI(false);
			changeDisplayDesktopUI(false);
			changeDisplayPhoneUI(true);

		}else if(window.innerWidth<960){

			changeDisplayIpadUI(true);
			changeDisplayDesktopUI(false);
			changeDisplayPhoneUI(false); 

		}else{
			changeDisplayIpadUI(false);
			changeDisplayDesktopUI(true);
			changeDisplayPhoneUI(false);
		}
	}

	useEffect(()=>{
		if(personalProfileState.id!=null){
			changeDisplayPersonalProfileIcon(true);
		}
		if(companyProfileState.id!=null){
			changeDisplayCompanyProfileIcon(true);
		}
		triggerUIChange();
	},[])

	window.addEventListener('resize',triggerUIChange)


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
		console.log("Testing");
	}

	const personalProfileIpadPages=()=>{
		return(
			<>
				<li style={ButtonsListCSS}>
					{personalProfileState.loggedIn==true?
							<ul style={{padding:"0px"}}>
								<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={MobileRouteOptionCSS}>
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
							</ul>:
						<NavBarButton to={`/companyProfile/${companyProfileState.id}`}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<AccountCircleIcon/>
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								Me
							</li>
						</ul>
						</NavBarButton>
					}
				</li>
				<li style={ButtonsListCSS}>
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
					</li>
				<li style={ButtonsListCSS}>
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
				</li>
			</>
		)
	}

	const closeAnonymousTipPortals=()=>{
		changeDispalyAnonymousTipsPortal(false);
	}



	return(
		<Container>
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
					<ul id="ULContainer" style={{padding:"0px"}}>
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
												<Link  to="/home">Home</Link>
											</li>

											<li>
												<Link to="/symposiumList">Symposiums</Link>
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
				<ul style={{marginLeft:"35%",top:"7%"}}>
					{personalProfileIpadPages()}
				</ul>
			)}
		</Container>
	)

}

export default NavBar;