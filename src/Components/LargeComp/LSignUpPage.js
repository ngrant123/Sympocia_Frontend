import React, {Component} from 'react';
import styled from "styled-components";
import secondPageBackground from "/Users/nathangrant/Desktop/company/src/designs/background/SignupPageBackground.png";
import CompanyLocationBackground from "/Users/nathangrant/Desktop/company/src/designs/img/CompanyLocation.png";
import CompanyNameBackground from "/Users/nathangrant/Desktop/company/src/designs/img/CompanyName.png"
import CompanyTypeBackground from "/Users/nathangrant/Desktop/company/src/designs/img/CompanyType.png"
import Particles from 'react-particles-js';
import PaymentOptionsScreen from "/Users/nathangrant/Desktop/company/src/Components/MediumComp/MediumSignupComp/PaymentOptionsScreen.js"

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

class LSignupPage extends Component {


	constructor(props){

		super(props);
		//Passes in the information from the first page then adds newly defined information 

		this.state= {

			pageText:"Description about what the website does and what the user is going to be doing now",
			companynameDescrip:"Information",
			personalInformation:props,
			companyname:"",
			location:"",
			companytype:"",
			backgroundURL:""
			  /*

			  Previous Prop Information

		      firstname:"",
		      lastname:"",
		      email:"",
		      password:"",
		      username:""

		      */
  
		};
	}


//Changes the state of the descriptions and background img
	handleDivClick(param){

		console.log("Function works");
		console.log(param);
		console.log(this.state.pageText);

		if(param==1){
			console.log("First method is being acceessed");

			this.setState({

				companynameDescrip:"Location Information",
				pageText:"This field will change for the user and is therefore option 1",
				backgroundURL:CompanyLocationBackground
			});
		}
		else if(param==2){

			this.setState({

				companynameDescrip:"Option 2 Infromation",
				pageText:"This field will change for the user and is therefore option 2",
				backgroundURL:CompanyNameBackground

			});
		}
		else{
			this.setState({

				companynameDescrip:"Option 3 Information",
				pageText:"This field will chage for the user and is therefore option 3",
				backgroundURL:CompanyTypeBackground

			});
			
		}
		console.log(this.state.pageText);

	}

	handleSubmit(){

		//Update the state with all of the displayed user information 
		var companyName= document.getElementById("company").value;
		var Location= document.getElementById("location").value;
		

		//Test
		console.log(companyName);
		console.log(Location);


		this.setState({

			companyname:companyName,
			location:Location, 
		

		});

		//Make payment screen apppear
		document.getElementById("payment").style.opacity="1";
		document.getElementById("payment").style.pointerEvents="auto";



	}


	render(){

		return (


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
					
					<SignUp id="signup">

						<DescriptionCompany> Company 1 </DescriptionCompany>

						<CompanyName id="company" placeholder="Company Name" onClick={()=> this.handleDivClick(1)}></CompanyName>

						<DescriptionLocation> Location Company </DescriptionLocation>
						<LocationName id="location" placeholder="Location" onClick={()=> this.handleDivClick(2)}></LocationName>

						<DescriptionCompanyType> Company Type </DescriptionCompanyType>
			
							<input list="startupcategories" name="startupcategories" style={divStyle} onClick={()=> this.handleDivClick(3)}/>
								<datalist id="startupcategories">
									<option value="Fashion" />
									<option value= "Engineering" />
								</datalist>
				
					</SignUp>


	
						<SubmitInformation id="submit" onClick={()=> this.handleSubmit()}>Submit</SubmitInformation>
						<ImageContainer id="ImageContainer"style={{backgroundImage: 'url(' + this.state.backgroundURL + ')'}}></ImageContainer>

						<TitleAreaDiv id="titlearea"><b> {this.state.companynameDescrip} </b> </TitleAreaDiv>
						<TextAreaDiv id="textarea"> {this.state.pageText} </TextAreaDiv>


					<PaymentScreen id="payment">

						<PaymentOptionsScreen />

					</PaymentScreen>


				</BodyContainer>

		)
	}
}

export default LSignupPage;