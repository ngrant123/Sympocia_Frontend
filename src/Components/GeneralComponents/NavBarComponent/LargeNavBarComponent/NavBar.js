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

const Container=styled.div`
	position:fixed;
	width:100%;
	height:14%;
	border-radius:0px 0px 5px 5px;
	z-index:10;
	background-color:white;
`;

const SearchButton=styled.textarea`
	position:fixed;
	left:30%;
	height:5%;
	top:10px;
	width:40%;
	resize:none;
	border-radius:5px;
	border-style:none;
	text-align:center;
	z-index:6;

	border-style:solid;
	border-width:2px;
	border-color:#BDBDBD;
`;

const ButtonsListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"110px"
}

const ProfileDropDownListCSS={

	display:"inline-block",
	listStyle:"none",
	marginRight:"20px"
	
}

const PersonalProfileChatContainer=styled.div`
	position:relative;
	background-color:red;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;

	&:hover{

		box-shadow: 5px 5px 10px 	#9395a0;
	}
`;


const PersonalProfileNotificationsContainer=styled.div`

	position:relative;
	background-color:red;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;

	&:hover{

		box-shadow: 5px 5px 10px 	#9395a0;
	}
`;

const CompanyProfileChatContainer=styled.div`
	position:relative;
	background-color:red;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;
	
	&:hover{

		box-shadow: 5px 5px 10px 	#9395a0;
	}
`;


const CompanyProfileNotificationsContainer=styled.div`

	position:relative;
	background-color:red;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;

	&:hover{

		box-shadow: 5px 5px 10px 	#9395a0;
	}
`;

const SearchIcon=styled(Link)`
	position:absolute;
	maring-top:5%;
	left:30%;
	z-index:7;
`;

const NavBarButton=styled(Link)`
	position:absolute;
	background-color:#5298F8;
	padding:10px;
	color:white;
	border-radius:5px;

&:hover{
		color:white;
		text-decoration:none;
	}
`;

const SearchContainer=styled.div`
	position:relative;
	width:45%;
	height:250%;
	background-color:white;
	border-radius:5px;
	left:28%;
	top:39%;
	box-shadow: 1px 1px 10px #d5d5d5;
	z-index:7;
	overflow-y:auto;
`;


const BackgroundContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	z-index:7;
`;


const PostSearchOptions={  
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"5%"
}


const NavBar=(pageProps)=>{
	console.log(pageProps);
	const dispatch=useDispatch();

	const {color}=pageProps;
	const personalProfileState=useSelector(state=>state.personalInformation);
	const companyProfileState=useSelector(state=>state.companyInformation);
	const [displayPersonalProfileIcon,changeDisplayPersonalProfileIcon]=useState(false);
	const [displayCompanyProfileIcon,changeDisplayCompanyProfileIcon]=useState(false);
	const [searchType,changeSearchType]=useState();

	const [displaySearchModal,changeDisplaySearchModal]=useState(false);


	useEffect(()=>{
		if(personalProfileState.id!=null){
			changeDisplayPersonalProfileIcon(true);
		}
		if(companyProfileState.id!=null){
			changeDisplayCompanyProfileIcon(true);
		}
	},[])


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

	const handleSearch=(searchType)=>{
		debugger;
		console.log(pageProps.pageProps.routerHistory);

		const searchValue=document.getElementById("searchCriteria").value;
		if(searchValue!=""){
			var history=pageProps.pageProps.routerHistory;
			history.push(`/search/${searchValue}/${searchType}`);
		}
	}

	return(
		<Container style={{backgroundColor:color}}>
			<a href="javascript:void(0);" style={{textDecoration:"none"}}>
				<SearchIcon to={{pathname:'/search',state:{
						searchType:searchType,
						searchCriteria:document.getElementById("searchCriteria")==null?"":document.getElementById("searchCriteria").value
					}
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-compass" 
										  width="35" height="35" viewBox="0 0 24 24" stroke-width="2"
										  stroke="#08fd00" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z"/>
						  <polyline points="8 16 10 10 16 8 14 14 8 16" />
						  <circle cx="12" cy="12" r="9" />
					</svg>
				</SearchIcon>
			</a>
			<SearchButton id="searchCriteria" onClick={()=>changeDisplaySearchModal(!displaySearchModal)} placeholder="Search for a community or a person"/>
			{displaySearchModal==true?
				<React.Fragment>
					<BackgroundContainer onClick={()=>changeDisplaySearchModal(!displaySearchModal)}/>
					<SearchContainer>	
						<ul style={{padding:"20px"}}>
							<li style={{listStyle:"none"}}>
								If you want you could help us narrow down you're search by choosing one of the following 
								below. Or you can just finish typing and hit the compass icon to search

								<ul style={{padding:"0px",marginTop:"5%"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>handleSearch("People")} style={PostSearchOptions}>
											People
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>handleSearch("Posts")} style={PostSearchOptions}>
											Posts
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>handleSearch("Symposiums")} style={PostSearchOptions}>
											Symposiums
										</li>
									</a>
								</ul>
							</li>
						</ul>
					</SearchContainer>
				</React.Fragment>:
				<React.Fragment></React.Fragment>
			}
			<ul style={{position:"fixed",left:"33%",top:"7%"}}>
				{personalProfileState.loggedIn!=true?
							<li style={ButtonsListCSS}>
								<NavBarButton  to={`/investor/${companyProfileState.id}`}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<HowToRegIcon/>
										</li>

										<li style={{listStyle:"none",display:"inline-block"}}>
											Investor
										</li>
									</ul>
								</NavBarButton>
							</li>:null
				}
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
				{
					/*
						Do something special with the creation Button	
					*/
				}
				<li style={ButtonsListCSS}>
					<NavBarButton  to="/demo" style={{backgroundColor:"#C8B0F4"}}>
						<ul style={{padding:"0px"}}>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<AddCircleIcon
									/>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									Create
								</li>
						</ul>
					</NavBarButton>
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
				{personalProfileState.loggedIn!=true?
						<li style={ButtonsListCSS}>
							<NavBarButton  to={`/map/${companyProfileState.id}`}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<MapIcon/>
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										Map
									</li>
								</ul>
							</NavBarButton>
						</li>
					:null
				}
			</ul>

		
			<ul style={{position:"fixed",left:"80%",top:"2%"}}>
				{personalProfileState.loggedIn==true || displayPersonalProfileIcon==true?
					<li style={ProfileDropDownListCSS} onClick={()=>loginToPersonalProfile()}>
						<Dropdown>
							  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius:"50%",width:"60px",height:"55px"}}>
					 		  
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
					</li>:<React.Fragment></React.Fragment>
				}
	
				{companyProfileState.loggenIn==true || displayCompanyProfileIcon==true?
					<li style={ProfileDropDownListCSS} onClick={()=>logInToCompanyProfile()}>
						<Dropdown>
							  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius:"50%",width:"60px",height:"55px"}}>
							   
							  </Dropdown.Toggle>

							  <Dropdown.Menu>

							  	<Dropdown.Item>
									<CompanyProfileChatContainer onClick={()=>displayChatContainerForCompanyPage(pageProps)}/>
								</Dropdown.Item>

								<Dropdown.Item>
									<CompanyProfileNotificationsContainer/>
								</Dropdown.Item>
							    
							  </Dropdown.Menu>

						</Dropdown>

					</li>:<React.Fragment></React.Fragment>
				}

			</ul>

		</Container>
	)

}

export default NavBar;