import React, {Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const NavContainer = styled.div`
	position:absolute;
	background-color:red;
	left:0%;
	width:100%;
	height:100%;
	background-color:#242424;


`;

const SearchBar = styled.div`
	
	position:absolute;
	background-color:red;
	height:45%;
	width:20%;
	left:75%;
	top:20%;
	border-radius:5px;
	overflow:hidden;

`;

const SearchBarTextArea = styled.textarea`
	
		position:absolute;
		background-color:#f9f9f9;
		height:60%;
		width:15%;
		left:70%;
		top:25%;
		border-radius:5px;
		resize:none;
		color:#383838;

`;

const SearchBarSubmit = styled(Link)`

		position:absolute;
		background-color:#C8B0F4;
   		color:white;
		height:60%; 
		width:5%;
		left:87%;
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


const HomeButton = styled(Link)`
	position:absolute;
	height:80%;
	left:15%;
	width:4%;
	top:10%;
	text-align:center; 
	font-family:Myriad Pro;
	padding:5px 0px 0px 0px;
	color:#0000f3;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#313131;


	&:hover{

		background-color:#6941E5;

	}



`;

const MessageButton = styled(Link)`
	position:absolute;
	height:80%;
	left:20%;
	width:4%;
	top:10%;
	text-align:center; 
	font-family:Myriad Pro;
	padding:5px 0px 0px 0px;
	color:#0000f3;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#313131;


	&:hover{

		background-color:#6941E5;

	}


`;


const NotificationButton = styled(Link)`
	position:absolute;
	height:80%;
	left:25%;
	width:4%;
	top:10%;
	text-align:center; 
	font-family:Myriad Pro;
	padding:5px 0px 0px 0px;
	color:#0000f3;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:	#313131;


	&:hover{

		background-color:#6941E5;

	}

`;


const CompanyIcon = styled(Link)`

	position:absolute;
	background-color:red;
	left:1%;
	width:4%;
	height:75%;
	top:5%;
	border-radius:5px;



`;



const NavBarSytle = {

	display:'inline'

}

class NavBar extends Component{

	HomeButtonClick() {


	}

	render(){


		return(

			<NavContainer>
			
					<HomeButton to="/"> </HomeButton>
					<MessageButton to="/">  </MessageButton>
					<NotificationButton to="/"> </NotificationButton>
					<SearchBarTextArea></SearchBarTextArea>
					<SearchBarSubmit to="/">Search</SearchBarSubmit>

			</NavContainer>

		)
	}

}

export default NavBar;