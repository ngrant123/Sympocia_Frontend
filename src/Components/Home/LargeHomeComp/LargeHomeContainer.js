import React,{Component} from "react";
import styled from "styled-components";
import NavBar from "../../Profile/MediumProfileComp/NavBar.js"
import MediumPostContainer from "../MediumHomeContainer/MediumPostContainer.js"
import MediumCompanyDetailsContainer from "../MediumHomeContainer/MediumCompanyDetailsContainer.js"
import MediumNotificationContainer from "../MediumHomeContainer/MediumNotificationContainer.js";

const Container= styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:white;

`;

const NavContainer = styled.div`
	position:absolute;
	width:100%;
	height:7%;

`;

const PostCreationContainer= styled.div`
	position:absolute;
	width:40%;
	height:30%;
	background-color:blue;
	top:15%;
	left:30%;
	border-radius:5px;
	overflow:hidden;
	border-radius:5px;
	box-shadow: 1px 1px 2px 2px #999a9b;

`;

const CompanyDetailsContainer = styled.div`
	position:fixed;
	background-color:blue;
	width:23%;
	height:80%;
	border-radius:5px;
	top:15%;
	left:5%;
	overflow:hidden;
	box-shadow: 1px 1px 1px 1px #999a9b;

`;

const NotificationContainer = styled.div`
	position:absolute;
	background-color:blue;
	border-radius:blue;
	height:30%;
	width:26%;
	left:72%;
	top:15%;
	border-radius:5px;

`;

//Re structure posts in order of popularity 
//comments/likes etc 
const PostDivider = styled.div`

	position:absolute;
	background-color:#4d5050;
	height:1%;
	width:40%;
	top:52%;
	left:30%;
	border-radius:5px;

`;


class LargeHomeContainer extends Component{

	render(){


		return(
			<Container>
				<NavContainer>
					<NavBar/>
				</NavContainer>

				<PostCreationContainer>
					<MediumPostContainer/>
				</PostCreationContainer>

				<CompanyDetailsContainer>
					<MediumCompanyDetailsContainer/>
				</CompanyDetailsContainer>

				<NotificationContainer>
					<MediumNotificationContainer/>
				</NotificationContainer>

				<div class="dropdown" style={{position:"absolute", height:"4%",width:"7%",left:"63%",top:"47%", zIndex:"2"}}>
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor:"#5298F8",width:"100%",left:"2%",top:"2%",height:"100%",color:"white"}}>Industry
						    <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
						    <li><a href="#">Fashion</a></li>
						    <li><a href="#">Health</a></li>
						    <li><a href="#">Consulting</a></li>
						</ul>
  				 </div>

  				 <div class="dropdown" style={{position:"absolute", height:"4%",width:"7%",left:"55%",top:"47%", zIndex:"2"}}>
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor:"#5298F8",width:"100%",left:"2%",top:"2%",height:"100%",color:"white"}}>Order By
						    <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
						    <li><a href="#">Fashion</a></li>
						    <li><a href="#">Health</a></li>
						    <li><a href="#">Consulting</a></li>
						</ul>
  				 </div>

				<PostDivider/>
				
			</Container>
		)
	}
}

export default LargeHomeContainer;