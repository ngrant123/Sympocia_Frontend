import React, { Component } from 'react';
import styled from 'styled-components';
import secondPageBackground from "../../../designs/background/SignupPageBackground.png";
import CompanyLocationBackground from "../../../designs/img/CompanyLocation.png";
import CompanyNameBackground from "../../../designs/img/CompanyName.png"
import PaymentOptionsScreen from "../MediumSignupComp/PaymentOptionsScreen.js";
import CompanyTypeBackground from "../../../designs/img/CompanyType.png";
import STATES from "../../../Constants/locationConstants.js";
import INDUSTRIES from "../../../Constants/personalIndustryConstants.js";
import { connect } from "react-redux";
import { 
			addCompanyName,
			addCompanyType,
			addCompanyLocation 
		} from "../../../Actions/Redux/Actions/CompanyActions.js";
import ReactMapGL ,{Marker,Popup } from 'react-map-gl';

 
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
	color:#4a4a4a;


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

const InputContainer = styled.div`

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}

`;
//Change opacity back to what it was 
const PaymentScreen = styled.div`

	position:absolute;
	background-color:white;
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

const LocationChoiceModule=styled.div`
	position:absolute;
	background-color:white;
	top:35%;
	left:35%;
	width:30%;
	height:40%;
	font-size:20px;
	font-family:Helvetica;
	z-index:2;
	border-radius:5px;
	border-style:solid;
    border-color:#5298F8;
    overflow-y:scroll;
`;

const LocationContainer=styled.div`
	position:relative;
	background-color:#5298F8;
	width:160px;
	height:50px;
	border-radius:5px;
	transition:.8s;
	padding:10px;
	color:white;


	&:hover{
		background-color:#0a65e0;
		color:white;
	}

`;



const IndustryChoiceModule=styled.div`

	position:absolute;
	background-color:white;
	top:50%;
	left:35%;
	width:30%;
	height:30%;
	font-size:20px;
	font-family:Helvetica;
	z-index:2;
	border-radius:5px;
	border-style:solid;
    border-color:#5298F8;
    overflow-y:scroll;

`;

const IndustryName=styled.textarea`
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

const IndustryContainer=styled.div`
	position:relative;
	background-color:#5298F8;
	width:190px;
	height:70px;
	border-radius:5px;
	transition:.8s;
	padding:10px;
	color:white;


	&:hover{
		background-color:#0a65e0;
		color:white;
	}

`;

const MarkerContainer=styled.div`

	position:relative;
	background-color:white;
	width:70px;
	height:65px;
	border-radius:5px;
	padding:2px;
	overflow:hidden;
	box-shadow:2px 2px 5px #707070;

`;

const MAPBOX_TOKEN ="pk.eyJ1IjoibmdyYW50MTIzIiwiYSI6ImNrNzZzcjV3NTAwaGYza3BqbHZjNXJhZDkifQ.DsFpgYjX7ZUtOe7cFmylhQ"

class CompanySetupPage extends Component{

	constructor(props){
		console.log('Setup Page is accessed');
		super(props);
		this.state={
			viewport: {
		      width: "100%",
		      height:"100%",
		      latitude:40.730610,
		      longitude:-73.935242,
		      zoom: 8
		    },
			pageText:"Before we set up your profile, we need to know a few details about your company or hobby that you're are doing ",
			companynameDescrip:"Company Details",
			displayPaymentScreen:false,
			displayLocationChoiceDiv:false,
			displayIndustryChoiceDiv:false,
			searchLocationTyped:"",
			cityPicked:{},
			industryPicked:"",
			location:[],
			industries:INDUSTRIES.INDUSTRIES,
			displayMarker:false,
			long:0,
			lat:0
		};
	}

	handleSubmit(){
		const company=document.getElementById('company').value;
		//const location=document.getElementById('location').value;
		const industry=document.getElementById('industry').value;
		const locationObject={long:this.state.long,lat:this.state.lat};

		this.props.addCompanyName(company);
		this.props.addCompanyType(industry);
		this.props.addCompanyLocation(locationObject);
	
		document.getElementById("payment").style.opacity="1";
		document.getElementById("payment").style.pointerEvents="auto";
	}


	handleBackButtonEvent=()=>{
		console.log("Back event clicked");
		document.getElementById("payment").style.opacity="0";
		document.getElementById("payment").style.pointerEvents="none";
	}


	handleCompanyDivClick = () =>{

			this.setState({

				companynameDescrip:"Company Name",
				pageText:"Tell us the name of your idea or your company. It'll make people finding you easier ",
				backgroundURL:CompanyLocationBackground,
				displayLocationChoiceDiv:false,
				displayIndustryChoiceDiv:false
			});
	}

	handleLocationDivClick =()=>{

			this.setState({

				companynameDescrip:"Whats your location?",
				pageText:"We use this for a number of reasons. We use this to pair you up with other similiar minded people and it also helps us tailor the experience to your geographical location",
				backgroundURL:CompanyNameBackground,
				displayIndustryChoiceDiv:false,
				displayLocationChoiceDiv:true
			});
	}

	handleCompanyTypeDivClick=()=>{
			this.setState({

				companynameDescrip:"Option 3 Information",
				pageText:"This field will chage for the user and is therefore option 3",
				backgroundURL:CompanyTypeBackground,
				displayLocationChoiceDiv:false,
				displayIndustryChoiceDiv:true

			});
	}

	handleHideLocationDiv=(cityPicked)=>{

		this.setState({
			displayLocationChoiceDiv:false,
			cityPicked:cityPicked
		},function(){

			document.getElementById("location").value=this.state.cityPicked.city;

		});
	}

	updateLatLongMarker=(props)=>{
		const {lngLat}=props;
		const long=lngLat[0];
		const lat=lngLat[1];

		this.setState({
			long:long,
			lat:lat,
			displayMarker:true
		})
	}


	handleDisplayLocationDiv=()=>{
		return this.state.displayLocationChoiceDiv==true ?
					<LocationChoiceModule>
						<ReactMapGL
							{...this.state.viewport}
							mapboxApiAccessToken={MAPBOX_TOKEN}
							mapStyle="mapbox://styles/ngrant123/ck78412jk0v5s1io79mvz3etw"
							onClick={(e)=>this.updateLatLongMarker(e)}
							onViewportChange={(viewport) => this.setState({viewport})}
							style={{height:"100%",width:"100%"}}>

							{this.state.displayMarker && (
								<Marker latitude={this.state.lat} longitude={this.state.long} offsetLeft={-20} offsetTop={-10}>
						          <MarkerContainer>
						          </MarkerContainer>
						        </Marker>
							)}
						</ReactMapGL>
					</LocationChoiceModule>:
					<React.Fragment>
					</React.Fragment>
		}


	handleDisplayAndSearchLocation=(searchCharacters)=>{

		if(this.state.displayLocationChoiceDiv==false){

			this.setState({
				displayLocationChoiceDiv:true
			})
		}

		console.log(searchCharacters)
		if(searchCharacters==""){
			this.setState({
				location:[]
			})
		}else{
			const cities=this.searchForCities(searchCharacters);

			this.setState({
				location:cities
			},function(){
				
			})
		}
	}


	searchForCities=(searchCharacters)=>{

		const states=STATES.STATES;
		console.log(states);
		const returnCities=[];

		for(var i=0;i<states.length;i++){
			const selectedState=states[i].state;
			
			if(selectedState.includes(searchCharacters)==true){
				const city=states[i].cities;
				for(var j=0;j<city.length;j++){
					const selectedCity=city[j];
					returnCities.push(selectedCity);

				}
			}
		}
		return returnCities;
	}

	handleSearchIndustry=(character)=>{
		const industries=this.state.industries;

		console.log(character);
		if(character==""){
			this.setState({
				industries:INDUSTRIES.INDUSTRIES
			})
		}
		else{
			const displaySearchIndustries=[];

			for(var i=0;i<industries.length;i++){

				const selectedIndustries=industries[i].industry;
				console.log(selectedIndustries);

				if(selectedIndustries.includes(character)==true){
					console.log("Accessed");
					const industry={industry:selectedIndustries};
					displaySearchIndustries.push(industry);
				}
			}

			this.setState({
				industries:displaySearchIndustries
			})

		}

	}

	handleHideIndustryDiv=(data)=>{

		this.setState({
			displayIndustryChoiceDiv:false,
			industryPicked:data
		},function(){
			document.getElementById("industry").value=this.state.industryPicked;
		});


	}

	handleDisplayIndustryDiv=()=>{

		return this.state.displayIndustryChoiceDiv==true ?
			<IndustryChoiceModule>
				<ul style={{padding:"5px"}}>
						{this.state.industries.map(data=>(
							<li>
								<li style={{display:"inline-block",listStyle:"none",marginLeft:"20px",marginBottom:"40px"}}>
										<IndustryContainer onClick={()=>this.handleHideIndustryDiv(data.industry)}>
											{data.industry}
										</IndustryContainer>
								</li>
							</li>
								)
							)
						}

				</ul>
			</IndustryChoiceModule>:
			<React.Fragment>
			</React.Fragment>
	}  




	render(){

		return(
			<React.Fragment>

					<SignUp id="signup">

						<p style={{fontSize:"30px",position:"absolute",left:"15%",top:"5%"}}><b>Background Information</b></p>

						<DescriptionCompany> Company Name</DescriptionCompany>

						<CompanyName id="company" placeholder="Enter your company name" onClick={()=> this.handleCompanyDivClick()}></CompanyName>

						<DescriptionLocation> Location </DescriptionLocation>
						<LocationName id="location" placeholder="Start typing a location" onClick={()=> this.handleLocationDivClick()}></LocationName>

						<DescriptionCompanyType> Company Type </DescriptionCompanyType>
						<IndustryName id="industry" placeholder="Enter your company type"  onClick={()=> this.handleCompanyTypeDivClick()} onChange={event=>this.handleSearchIndustry(event.target.value)}></IndustryName>

					</SignUp>

						<SubmitInformation id="submit" onClick={()=> this.handleSubmit()}>Submit</SubmitInformation>
						<ImageContainer id="ImageContainer"style={{backgroundImage: 'url(' + this.state.backgroundURL + ')'}}></ImageContainer>

						<TitleAreaDiv id="titlearea"><b> {this.state.companynameDescrip} </b> </TitleAreaDiv>
						<TextAreaDiv id="textarea"> {this.state.pageText} </TextAreaDiv>

					<PaymentScreen id="payment">
						<PaymentOptionsScreen 
							handleBackClick={this.handleBackButtonEvent}
						/>
					</PaymentScreen>

					{this.handleDisplayLocationDiv()}
					{this.handleDisplayIndustryDiv()}

			</React.Fragment>

		)
	}
}


const mapDispatchToProps=(dispatch)=>{

	return{
		addCompanyName:(companyName)=>dispatch(addCompanyName(companyName)),
		addCompanyType:(companyType)=>dispatch(addCompanyType(companyType)),
		addCompanyLocation:(location)=>dispatch(addCompanyLocation(location))
	}
}
export default connect(
				null,
				mapDispatchToProps )(CompanySetupPage);