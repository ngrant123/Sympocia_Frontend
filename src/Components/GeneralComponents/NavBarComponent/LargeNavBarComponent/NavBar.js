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
	backgroundColor:"white",
	borderLeft:"5px solid #D8D8D8",
	borderRight:"5px solid #D8D8D8",
	borderRadius:"0px"
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
	console.log(pageProps);
	const dispatch=useDispatch();

	const {color}=pageProps;
	const personalProfileState=useSelector(state=>state.personalInformation);
	const companyProfileState=useSelector(state=>state.companyInformation);
	const [displayPersonalProfileIcon,changeDisplayPersonalProfileIcon]=useState(false);
	const [displayCompanyProfileIcon,changeDisplayCompanyProfileIcon]=useState(false);

	const [displaySearchModal,changeDisplaySearchModal]=useState(false);
	const [displayIpadUI,changeDisplayIpadUI]=useState(false);
	const [displayDesktopUI,changeDisplayDesktopUI]=useState(false);
	const [displayPhoneUI,changeDisplayPhoneUI]=useState(false);

	const triggerUIChange=()=>{
		console.log(window.innerWidth)
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

	const personalProfileIpadPages=()=>{
		return(
			<>
				<li style={ButtonsListCSS}>
					{personalProfileState.loggedIn==true?
						<NavBarButton to={`/profile/${personalProfileState.id}`}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<AccountCircleIcon/>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									Me
								</li>
							</ul>
						</NavBarButton>:
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



	return(
		<Container style={{backgroundColor:color}}>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",width:"100%",}}>
					<ul style={{backgroundColor:"white",padding:"0px"}}>

						<li id="searchLIContainer" 
							onClick={()=>changeDisplaySearchModal(!displaySearchModal)} 
							style={{marginRight:"4%",width:"70%",listStyle:"none",display:"inline-block"}}
						>
							{displayPhoneUI==true?
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search"
									width="44" height="44" viewBox="0 0 24 24" stroke-width="2.5" stroke="#1C1C1C" 
									fill="none" stroke-linecap="round" stroke-linejoin="round">
									  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									  <circle cx="10" cy="10" r="7" />
									  <line x1="21" y1="21" x2="15" y2="15" />
								</svg>:
								<SearchButton 
									placeholder="Search"
								/>
							}
						</li>
						{(displayPhoneUI==true || displayIpadUI) &&(
							<>
								{displayPhoneUI==true?
									<>
										<li id="mobileRoutesButton" style={{marginLeft:"20%",marginRight:"1%",listStyle:"none",display:"inline-block"}}>
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
												<li><a>Create</a></li>

												<li>
													<Link to="/symposiumList">Symposiums</Link>
												</li>
											</ul>
										</div>
									</li>
									<li style={ProfileDropDownListCSS} onClick={()=>loginToPersonalProfile()}>
										<Dropdown>
												<Dropdown.Toggle variant="success" id="dropdown-basic" style={MobileChatOptionCSS}
												  	onClick={()=>displayChatContainerForPersonalPage(pageProps)}
												  >
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-dots" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C1C1C" fill="none" stroke-linecap="round" stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
													  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
													  <line x1="12" y1="11" x2="12" y2="11.01" />
													  <line x1="8" y1="11" x2="8" y2="11.01" />
													  <line x1="16" y1="11" x2="16" y2="11.01" />
													</svg>
												</Dropdown.Toggle>
											  <Dropdown.Menu>
												
												<Dropdown.Item>
											    	<PersonalProfileChatContainer onClick={()=>displayChatContainerForPersonalPage(pageProps)}/>
											    </Dropdown.Item>
					 					
					 							<Dropdown.Item>
					 								<PersonalProfileNotificationsContainer/>
					 							</Dropdown.Item>
											  </Dropdown.Menu>
										</Dropdown>
									</li>
									</>:
									<>
										{personalProfileIpadPages()}
									</>
								}
							</>
						)}
					</ul>
				</li>
			</ul>

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
			{displayDesktopUI==true && (
				<ul style={{position:"fixed",left:"33%",top:"7%"}}>
					{personalProfileIpadPages()}
				</ul>
			)}
		</Container>
	)

}

export default NavBar;