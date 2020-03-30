import React,{useState} from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from "react-router-dom";
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {useSelector} from "react-redux";

const Container=styled.div`
	position:fixed;
	width:100%;
	height:14%;
	border-radius:0px 0px 5px 5px;
	z-index:6;
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
	z-index:5;
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


const NavBar=(pageProps)=>{
	const {color}=pageProps;
	console.log("Testing");
	const state=useSelector(state=>state.personalInformation);
	const {id}=state;
	const displayChatContainerForPersonalPage=(pageProps)=>{

			pageProps.displayChatPage("personal");
		}

	const displayChatContainerForCompanyPage=(pageProps)=>{
			pageProps.displayChatPage("company");
		}

	return(
		<Container style={{backgroundColor:color}}>

			<SearchButton placeholder="Search for anyone nigga"/>

			<ul style={{position:"fixed",left:"39%",top:"7%"}}>
				<li style={ButtonsListCSS}>
					<NavBarButton to={{
							pathname:"/profile",
							state:{
								personalId:id
							}
						}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<AccountCircleIcon/>
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								Me
							</li>

						</ul>
					</NavBarButton>
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
			</ul>

		
			<ul style={{position:"fixed",left:"80%",top:"2%"}}>
				<li style={ProfileDropDownListCSS}>
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

				</li>
				<li style={ProfileDropDownListCSS}>
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

				</li>

			</ul>

		</Container>
	)

}

export default NavBar;