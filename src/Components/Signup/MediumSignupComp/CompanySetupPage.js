import React, { Component } from 'react';
import styled from 'styled-components';
import secondPageBackground from "../../../designs/background/SignupPageBackground.png";
import CompanyLocationBackground from "../../../designs/img/CompanyLocation.png";
import CompanyNameBackground from "../../../designs/img/CompanyName.png"
import PaymentOptionsScreen from "../MediumSignupComp/PaymentOptionsScreen.js";
import CompanyTypeBackground from "../../../designs/img/CompanyType.png"

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


class CompanySetupPage extends Component{

	constructor(props){
		console.log('Setup Page is accessed');
		super(props);
		this.state={};
	}


	handleSubmit(){

		//Update the state with all of the displayed user information 
		var companyName= document.getElementById("company").value;
		var Location= document.getElementById("location").value;

		this.setState({

			companyname:companyName,
			location:Location, 
		});

		//Make payment screen apppear
		document.getElementById("payment").style.opacity="1";
		document.getElementById("payment").style.pointerEvents="auto";
	}

	handleCompanyDivClick = () =>{

			this.setState({

				companynameDescrip:"Location Information",
				pageText:"This field will change for the user and is therefore option 1",
				backgroundURL:CompanyLocationBackground
			});
	}

	handleLocationDivClick =()=>{

			this.setState({

				companynameDescrip:"Option 2 Infromation",
				pageText:"This field will change for the user and is therefore option 2",
				backgroundURL:CompanyNameBackground

			});
	}

	handleCompanyTypeDivClick=()=>{
			this.setState({

				companynameDescrip:"Option 3 Information",
				pageText:"This field will chage for the user and is therefore option 3",
				backgroundURL:CompanyTypeBackground

			});
	}

	render(){

		return(
			<React.Fragment>

					<SignUp id="signup">

						<DescriptionCompany> Company 1 </DescriptionCompany>

						<CompanyName id="company" placeholder="Company Name" onClick={()=> this.handleCompanyDivClick()}></CompanyName>

						<DescriptionLocation> Location Company </DescriptionLocation>
						<LocationName id="location" placeholder="Location" onClick={()=> this.handleLocationDivClick()}></LocationName>

						<DescriptionCompanyType> Company Type </DescriptionCompanyType>
			
							<input list="startupcategories" name="startupcategories" style={divStyle} onClick={()=> this.handleCompanyTypeDivClick()}/>
								<datalist id="startupcategories">
									<option value="Fashion" />
									<option value= "Engineering" />
									<option value="Fashion" />
		
								</datalist>
				
					</SignUp>


	
						<SubmitInformation id="submit" onClick={()=> this.handleSubmit()}>Submit</SubmitInformation>
						<ImageContainer id="ImageContainer"style={{backgroundImage: 'url(' + this.state.backgroundURL + ')'}}></ImageContainer>

						<TitleAreaDiv id="titlearea"><b> {this.state.companynameDescrip} </b> </TitleAreaDiv>
						<TextAreaDiv id="textarea"> {this.state.pageText} </TextAreaDiv>


					<PaymentScreen id="payment">
						<PaymentOptionsScreen />
					</PaymentScreen>

			</React.Fragment>

		)
	}
}

export default CompanySetupPage;