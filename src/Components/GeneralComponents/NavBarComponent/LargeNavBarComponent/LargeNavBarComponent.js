import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'

const ProfileAndInvestorContainer = styled.div`
	position:absolute;
	width:100%;
	height:100%;
`;

const CompanyIcon = styled.div`
	position:absolute;
	width:5%;
	height:80%;
	background-color:red;
	left:47%;
	top:10%;

`;


const ProfileAndInvestorSearchBarTextArea = styled.textarea`
	
		position:absolute;
		background-color:#f9f9f9;
		height:60%;
		width:15%;
		left:77%;
		top:25%;
		border-radius:5px;
		resize:none;
		color:#383838;

		&:hover{
			border-style:solid;

		}

`;

const ProfileAndInvestorIndustryButton = styled.div`
	position:absolute;
	width:10%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:63%;
	padding:10px;
	font-size:100%;
	background-color:#5298F8;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	color:white;


`;

const ProfileAndInvestorSearchBarSubmit = styled(Link)`

		position:absolute;
		background-color:#C8B0F4;
   		color:white;
		height:60%; 
		width:5%;
		left:93%;
		top:25%;
		border-radius:5px;
		text-align:center;
		font-size:140%;
		transition: all ease 0.8s;

		&:hover{
			text-decoration:none;
      		color:white;
      		background-color:#6941E5;
		}
`;

const ProfileAndInvestorHomeLink = styled(Link)`
	position:absolute;
	width:7%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:15%;
	transition:.8s;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	text-decoration:none;
	background-color:white;
	color:#5298F8;
	transition:.8s;


	&:hover{

		background-color:#5298F8;
		color:white;
	}

`;

const ProfileAndInvestorProfileLink = styled(Link)`
	position:absolute;
	width:7%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:23%;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	background-color:white;
	color:#5298F8;
	transition:.8s;

		&:hover{

		background-color:#5298F8;
		color:white;
	}



`;

const ProfileAndInvestorMapLink = styled(Link)`
	position:absolute;
	width:7%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:7%;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	background-color:white;
	color:#5298F8;
	transition:.8s;

		&:hover{

		background-color:#5298F8;
		color:white;
	}

`;

const ProfileAndInvestorInvestorLink = styled(Link)`
	position:absolute;
	width:7%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:31%;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	background-color:white;
	color:#5298F8;
	transition:.8s;

		&:hover{

		background-color:#5298F8;
		color:white;
	}
`;

const ProfilePicture = styled.div`
	position:absolute;
	width:4%;
	height:85%;
	top:10%;
	left:2%;
	border-radius:50%;
	background-color:red;

`;

const MapAndHomeContainer = styled.div`
	position:absolute;
	width:100%;
	height:8%;
	background-color:#232323;
	border-radius:0px 0px 5px 5px;
`;




const MapAndHomeSearchBarTextArea = styled.textarea`
	
		position:absolute;
		background-color:	#cecece;
		height:60%;
		width:15%;
		left:77%;
		top:25%;
		border-radius:5px;
		resize:none;
		color:#383838;

		&:hover{
			border-style:solid;

		}

`;

const MapAndHomeIndustryButton = styled.div`
	position:absolute;
	width:10%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:63%;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:#5298F8;
	color:#5298F8;
	background-color:#3b3b3b;
	transition:.8s;

	&:hover{
		background-color:white;
		color:black;
	}


`;

const MapAndHomeSearchBarSubmit = styled(Link)`

		position:absolute;
		background-color:#C8B0F4;
   		color:white;
		height:60%; 
		width:5%;
		left:93%;
		top:25%;
		border-radius:5px;
		text-align:center;
		font-size:140%;
		transition: all ease 0.8s;

		&:hover{
			text-decoration:none;
      		color:white;
      		background-color:#6941E5;
		}
`;

const MapAndHomeHomeLink = styled(Link)`
	position:absolute;
	width:7%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:15%;
	transition:.8s;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	text-decoration:none;
	background-color:white;
	color:#5298F8;
	transition:.8s;


	&:hover{

		background-color:#5298F8;
		color:white;
	}

`;

const MapAndHomeProfileLink = styled(Link)`
	position:absolute;
	width:7%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:23%;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	background-color:white;
	color:#5298F8;
	transition:.8s;

		&:hover{

		background-color:#5298F8;
		color:white;
	}



`;

const MapAndHomeMapLink = styled(Link)`
	position:absolute;
	width:7%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:7%;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	background-color:white;
	color:#5298F8;
	transition:.8s;

		&:hover{

		background-color:#5298F8;
		color:white;
	}

`;

const MapAndHomeInvestorLink = styled(Link)`
	position:absolute;
	width:7%;
	height:60%;
	top:25%;
	border-radius:5px;
	left:31%;
	padding:10px;
	font-size:100%;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:black;
	background-color:white;
	color:#5298F8;
	transition:.8s;

		&:hover{

		background-color:#5298F8;
		color:white;
	}



`;

const Container=styled.div`
	position:absolute;
	width:100%;
	height:8%;
	border-radius:0px 0px 5px 5px;
	z-index:3;


`;

const SearchButton=styled.textarea`
	position:relative;
	left:30%;
	height:60%;
	top:10px;
	width:40%;
	resize:none;
	border-radius:5px;
	border-style:none;
	text-align:center;
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

export function GeneralNavBar(pageProps){
	
	return(
		<Container>

			<SearchButton placeholder="Search for anyone nigga"/>

			<ul style={{position:"relative",left:"39%",top:"30%"}}>
				<li style={ButtonsListCSS}><Button variant="primary" style={{backgroundColor:"#5298F8"}}>Primary</Button> </li>
				<li style={ButtonsListCSS}><Button variant="primary" style={{backgroundColor:"#5298F8"}}>Primary</Button> </li>
				<li style={ButtonsListCSS}><Button variant="primary" style={{backgroundColor:"#5298F8"}}>Primary</Button> </li>
			</ul>

		
			<ul style={{position:"absolute",left:"80%",top:"10%"}}>
				<li style={ProfileDropDownListCSS}>
					<Dropdown>
						  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius:"50%",width:"60px",height:"55px"}}>
				 		  
						  </Dropdown.Toggle>

						  <Dropdown.Menu>
						
						    {displayProfileOptions("Company")}

						  </Dropdown.Menu>

					</Dropdown>

				</li>
				<li style={ProfileDropDownListCSS}>
					<Dropdown>
						  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius:"50%",width:"60px",height:"55px"}}>
						   
						  </Dropdown.Toggle>

						  <Dropdown.Menu>

							{displayProfileOptions("Personal")}
						    
						  </Dropdown.Menu>

					</Dropdown>

				</li>

			</ul>

		</Container>
	)
}

 function displayProfileOptions(props){
 	if(props=="Personal"){
 		return(
 			<React.Fragment>
 				<ul style={{listStyle:"none"}}>	
 					<li style={{marginBottom:"10px"}}>
 						<PersonalProfileChatContainer>

 						</PersonalProfileChatContainer>

 					</li>

 					<li>
 						<PersonalProfileNotificationsContainer>

 						</PersonalProfileNotificationsContainer>


 					</li>

 				</ul>
 			</React.Fragment>

 		)
 	}
 	else{
 		return(
 			<React.Fragment>
	 			<ul style={{listStyle:"none"}}>	
	 					<li style={{marginBottom:"10px"}}>
	 						<CompanyProfileChatContainer>

	 						</CompanyProfileChatContainer>

	 					</li>

	 					<li>
	 						<CompanyProfileNotificationsContainer>

	 						</CompanyProfileNotificationsContainer>


	 					</li>

	 				</ul>

 			</React.Fragment>
		
		) 
 	}


}



function MapOrHomeHeader(){
	return <MapAndHomeContainer>
					<ProfilePicture>

					</ProfilePicture>

					<CompanyIcon>

					</CompanyIcon>
					<MapAndHomeHomeLink to="/home">Home</MapAndHomeHomeLink>
					<MapAndHomeProfileLink to="/profile">Profile</MapAndHomeProfileLink>
					<MapAndHomeMapLink to="/map">Maps</MapAndHomeMapLink>
					<MapAndHomeInvestorLink to="/investor">Investors</MapAndHomeInvestorLink>

					<MapAndHomeIndustryButton>Explore Industry</MapAndHomeIndustryButton>

					<MapAndHomeSearchBarTextArea placeholder="Search By Name"></MapAndHomeSearchBarTextArea>
					<MapAndHomeSearchBarSubmit to="/">Search</MapAndHomeSearchBarSubmit>


			</MapAndHomeContainer>;
}

function ProfileOrInvestorHeader(){
	return <ProfileAndInvestorContainer>
					<ProfilePicture>

					</ProfilePicture>

					<CompanyIcon>

					</CompanyIcon>
					<ProfileAndInvestorHomeLink to="/home">Home</ProfileAndInvestorHomeLink>
					<ProfileAndInvestorProfileLink to="/profile">Profile</ProfileAndInvestorProfileLink>
					<ProfileAndInvestorMapLink to="/map">Maps</ProfileAndInvestorMapLink>
					<ProfileAndInvestorInvestorLink to="/investor">Investors</ProfileAndInvestorInvestorLink>

					<ProfileAndInvestorIndustryButton>Explore Industry</ProfileAndInvestorIndustryButton>

					<ProfileAndInvestorSearchBarTextArea placeholder="Search By Name"></ProfileAndInvestorSearchBarTextArea>
					<ProfileAndInvestorSearchBarSubmit to="/">Search</ProfileAndInvestorSearchBarSubmit>
		   </ProfileAndInvestorContainer>;

}


