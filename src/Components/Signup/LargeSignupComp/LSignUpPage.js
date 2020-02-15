import React, {Component} from 'react';
import styled from "styled-components";
import CompanySetupPage from "../MediumSignupComp/CompanySetupPage.js";
import PersonalSetupDisplayPage from "../MediumSignupComp/PersonalSetupDisplayPage.js";
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Typed from "react-typed";

import {
	addName,
	addLastName,
	addEmail
} from "../../../Actions/Redux/Actions/PersonalProfile.js";
import {
	createProfile
} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const BodyContainer= styled.div`

	position:absolute;
	height:100%;
	width:100%;
	top:0%;
	left:0%;
	background-color:white;

	#particles-js {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  background-color: #2c2e43;
	  background-repeat: no-repeat;
	  background-size: cover;
	  background-position: 50% 50%;
	  z-index: -1
	} 
	`;

const SignUp = styled.div`

	position:absolute;
	background-color:white;
	width:35%;
	height:100%;
	left:5%;
	top:0%;


	border-radius:5px;
	opacity:.99;
	transition: all ease 0.8s;


`;

const TextAreaDiv = styled.div`
	position:absolute; 
	height:20%; 
	width:40%;
	top:35%;
	background-color:white;
	left:55%;
	border-radius:5px;
	font-size:30px;
	font-family:Helvetica;
	opacity:0.7;

`;

const TitleAreaDiv = styled.div`
		position:absolute; 
		height:20%; 
		width:40%;
		top:20%;
		background-color:white;
		left:55%;
		border-radius:5px;
		font-size:50px;
		font-family:Helvetica;
		opacity:0.7;

`;

const CompanyName = styled.textarea`

	position:absolute;
	background-color:#4D4C4D;
	resize:none;
	width:60%;
	height:8%;
	left:17%;
	top:20%;
	font-size:20px;
	border-radius:5px;
	color:white;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}

	 transition: all ease 0.8s;

`;

const DescriptionCompany = styled.div`

	position:absolute;
	top:15%;
	left:17%;
	width:60;
	height:8%;
	font-size:20px;
	font-family:Helvetica;


`;
 
const LocationName = styled.textarea`

	position:absolute;
	background-color:#4D4C4D;
	resize:none;
	width:60%;
	height:8%;
	left:17%;
	top:40%;
	font-size:20px;
	border-radius:5px;
	color:white;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}


`;

const DescriptionLocation = styled.div`

	position:absolute;
	top:35%;
	left:17%;
	width:60;
	height:8%;
	font-size:20px;
	font-family:Helvetica;

`;


const CompanyType = styled.textarea`

	position:absolute;
	background-color:#4D4C4D;
	resize:none;
	width:60%;
	height:8%;
	left:17%;
	top:60%;
	font-size:20px;
	border-radius:5px;
	color:white;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}

`;



const DescriptionCompanyType = styled.div`

	position:absolute;
	top:55%;
	left:17%;
	width:60;
	height:8%;
	font-size:20px;
	font-family:Helvetica;


`;


const SubmitInformation = styled.div`

	position:absolute;
	background-color:#C8B0F4;
	color:white;
	width:10%;
	top:80%;
	left:16%;
	border-radius:5px;
	height:6%;
	text-align:center;
	padding:10px;
	font-family:Myriad Pro;
	font-size:25px;

	   &:hover{

      background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   transition: all ease 0.8s;

   }
`;

const ImageContainer = styled.div`

	position:absolute;
	width:20%;
	height:35%;
	left:60%;
	top:55%;
	border-radius:5px;
	background-repeat: no-repeat;
	transition: all ease 1s;


`;
const divStyle = {
  	position:'absolute',
	backgroundColor:'#4D4C4D',
	resize:'none',
	width:'60%',
	height:'8%',
	left:'17%',
	top:'60%',
	fontSize:'20px',
	borderRadius:'5px',
	color:'white'
  
};

const InputContainer = styled.div`

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}

`;
//Change opacity back to what it was 
const PaymentScreen = styled.div`

	position:absolute;
	background-color:red;
	width:60%;
	height:60%;
	left:20%;
	top:20%;
	border-radius:5px;
	transition: all ease 3s;
	opacity:0;
	display:inline-block;
	pointer-events: none;

`;

const Payment1Container = styled.div`
	
	position:absolute;
	background-color:blue;
	left:15%;
	width:10%;

`;


const PersonalSectionContainer=styled.div`
	position:absolute;
	background-color:white;
	width:30%;
	height:50%;
	left:15%;
	top:35%;
	border-radius:5px;
	border-style:solid;
    border-color: #5298F8;

`;

const PersonalSectionCard=styled.div`
	position:absolute;
	background-color:white;
	width:90%;
	height:90%;
	left:5%;
	transition:.8s;
	top:5%;
	border-radius:5px;
	padding:5px;

    &:hover{
    	box-shadow: 5px 5px 5px 5px #c4c4c4;
    }
`;

const CompanySectionContainer=styled.div`
	position:absolute;
	background-color:white;
	width:30%;
	height:50%;
	left:55%;
	top:35%;
	border-radius:5px;
	border-style:solid;
    border-color:#5298F8;
`;

const CompanySectionCard=styled.div`
	position:absolute;
	background-color:white;
	width:90%;
	height:90%;
	left:5%;
	transition:.8s;
	top:5%;
	border-radius:5px;

    &:hover{
    	box-shadow: 5px 5px 5px 5px #c4c4c4;
    }
`;

const TitleHeader=styled.div`
	position:absolute;
	width:70%;
	height:20%;
	top:3%;
	left:17%;
	font-size:80px;

`;

const HeaderCSS={
	position:"relative",
	left:"18%",
	fontSize:"40px",
	color:"#5298F8"
}

const HeaderDescriptionCSS={
	position:"relative",
	left:"5%",
	fontSize:"15px",
	color:"	#383838"

}



const PersonalPageButton=styled(Link)`
	position:absolute;
	background-color:#5298F8;
	color:white;
	width:50%;
	height:15%;
	top:80%;
	left:20%;
	transition:.8s;
	border-radius:5px;
	text-align:center;
	padding:5px;
	font-size:15px;

	&:hover{
		background-color:#0b6cef;
	}



`;

const CompanyPageButton=styled.div`
	position:absolute;
	background-color:#5298F8;
	color:white;
	width:50%;
	height:15%;
	top:80%;
	left:20%;
	transition:.8s;
	border-radius:5px;
	text-align:center;
	padding:5px;
	font-size:15px;

	&:hover{
		background-color:#0b6cef;
	}


`;

const BottomNotificationContainer=styled.div`
	position:absolute;
	


`;

class LSignupPage extends Component {


	constructor(props){
		super(props);

		this.state= {
			displayPersonalSetupPage:false,
			displayCompanySetupPage:false,
			hideInitialScreen:false
		};
	}


	DisplayPersonalSetupPage=()=>{

		return this.state.displayPersonalSetupPage==false?
				<React.Fragment>
				</React.Fragment>:
				<PersonalSetupDisplayPage/>

	}


	DisplayCompanySetupPage=()=>{

		console.log(this.state);
		if(this.state.displayCompanySetupPage==false)
			return <React.Fragment/>;
		else 
			return <CompanySetupPage/>
	}

	TitleDisplayNameHeader=()=>{
		return <TitleHeader>
					<b>
						What are you looking for on here {this.props.firstName}?
					</b>
			   </TitleHeader>
	}


	DisplayPersonalOrCompanyChoices=()=>{



		return this.state.hideInitialScreen==true?
			<React.Fragment>

				{this.DisplayPersonalSetupPage()}
				{this.DisplayCompanySetupPage()}
				
			</React.Fragment>: 
			<React.Fragment>
				{this.TitleDisplayNameHeader()}

				<PersonalSectionContainer>
						<PersonalSectionCard>
							<p style={HeaderCSS}><b>Entertainment</b></p>
							<p style={HeaderDescriptionCSS}>Interested in viewing videos, posts, and images
							from your friends and people you are interested in? Click on the button below</p>


							<PersonalPageButton to="/home" onClick={()=>this.handleDisplayPersonalSetupPage()}>Click here</PersonalPageButton>

						</PersonalSectionCard>

				</PersonalSectionContainer>

				<CompanySectionContainer>
						<CompanySectionCard>
							<p style={HeaderCSS}><b>Business</b></p>
							<p style={HeaderDescriptionCSS}> Ready to show the world your hobby that you're 
								proud of? Or maybe you have a startup or business and you want to connect with people
								who you think would want to see it? Click on the button below to get started
							</p>


							<CompanyPageButton onClick={()=>this.handleDisplayCompanySetupPage()}>Click here</CompanyPageButton>

						</CompanySectionCard>

				</CompanySectionContainer>


			</React.Fragment>

	}



	handleDisplayPersonalSetupPage=()=>{

		this.props.addFirstName(this.props.firstName);
		this.props.addLastName(this.props.lastName);
		this.props.addEmail(this.props.email);

		createProfile({
			firstName:this.props.firstName,
			lastName:this.props.lastName,
			email:this.props.email
		});

		this.setState({
			displayPersonalSetupPage:true,
			hideInitialScreen:true
		})
	} 


	handleDisplayCompanySetupPage=()=>{

		this.setState({
			displayCompanySetupPage:true,
			hideInitialScreen:true
		})
	}




	render(){

		return (
			<React.Fragment>
				<BodyContainer id="particles-js"> 
						<Particles
						    params={{
							    "particles": {
							        "number": {
							            "value": 100
							        },
							        "size": {
							            "value": 3
							        },
							        "color": {
								      "value": "#000000"
								    },
								    "line_linked": {
     
							      "color": "#000000",
							   
							    	}
							    },
							    "interactivity": {
							        "events": {
							            "onhover": {
							                "enable": true,
							                "mode": "repulse"
							            }
							        }
							    },
							}}
						/>
				</BodyContainer>

				{this.DisplayPersonalOrCompanyChoices()}
			</React.Fragment>


		)
	}
}


const mapStateToProps=(state)=>{
	return{
		firstName:state.personalInformation.firstName,
		lastName:state.personalInformation.lastName,
		email:state.personalInformation.email
	}
}

const mapDispatchToProps=dispatch=>{

	return{
		addFirstName:(firstName)=>dispatch(addName(firstName)),
		addLastName:(lastName)=>dispatch(addLastName(lastName)),
		addEmail:(email)=>dispatch(addEmail(email))
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LSignupPage);