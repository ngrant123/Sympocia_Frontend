import React,{useState} from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'

const Container=styled.div`
	position:fixed;
	width:100%;
	height:12%;
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
	marginRight:"10px"
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

const NavBar=(pageProps)=>{
	const {color}=pageProps;
	console.log("Teste");
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
					<Button variant="primary" style={{backgroundColor:"#5298F8"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Testing
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								ME
							</li>

						</ul>
					</Button>
				</li>


				{
					/*
						Do something special with the creation Button	
					*/
				}
				<li style={ButtonsListCSS}><Button variant="primary" style={{backgroundColor:"#C8B0F4"}}>
					<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
									Testing
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									Create
								</li>

							</ul>
					</Button></li>
				<li style={ButtonsListCSS}><Button variant="primary" style={{backgroundColor:"#5298F8"}}>
					<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Testing
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								Explore
							</li>

						</ul>
				</Button></li>
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