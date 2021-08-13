import React, {Component} from 'react';
import styled from "styled-components";
import CompanySetupPage from "../MediumSignupComp/CompanySetupPage.js";
import PersonalSetupDisplayPage from "../MediumSignupComp/PersonalSetupDisplayPage.js";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Typed from "react-typed";
import COMPANY_INDUSTRIES from "../../../Constants/industryConstants.js";
import {
	addName,
	addLastName,
	addEmail,
	addPersonalIdentificationId,
	loginPersonalPage
} from "../../../Actions/Redux/Actions/PersonalProfile.js";
import {
	createProfile
} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import ReactMapGL ,{Marker,Popup } from 'react-map-gl';
import {loginCompanyPage} from "../../../Actions/Redux/Actions/CompanyActions.js";
import PersonalSignUp from "./PersonalSignUp.js";
import {
	BodyContainer,
	SignUp,
	TextAreaDiv,
	TitleAreaDiv,
	CompanyName,
	DescriptionCompany,
	LocationName,
	DescriptionLocation,
	CompanyType,
	DescriptionCompanyType,
	SubmitInformation,
	ImageContainer,
	InputContainer,
	PaymentScreen,
	PersonalSectionContainer,
	PersonalSectionCard,
	CompanySectionContainer,
	CompanySectionCard,
	TitleHeader,
	PersonalPageButton,
	CompanyPageButton,
	MapContainer,
	MarkerContainer,
	BottomNotificationContainer,
	Button,
	NextButton,
	AsisgnEveryIndustryButton,
	IndustryButton,
	SignUpButton,
	PersonalSignUpCard
} from "./LSignUpPageCSS.js";

//Entertainment Modal Icon
import PortraitIcon from '@material-ui/icons/Portrait';
//Company Modal Icon
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
//Investor Icon
import HowToRegIcon from '@material-ui/icons/HowToReg';
//Company/Business Icno
import BusinessIcon from '@material-ui/icons/Business';
import Particles from 'react-particles-js';

const CardContentContainer=styled.div`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		flex-direction:column;
		padding-bottom:10px !important;
		margin-bottom:10% !important;
	}
`;

const Card=styled.div`
	display:flex;
	flex-direction:column;
	margin-right:10%;
	width:50%;

	@media screen and (max-width:1370px){
		width:70%;
		margin-bottom:5%;
		font-size:20px !important;

		#headerContentText{
			font-size:15px !important;
		}
	}

	@media screen and (max-width:650px){
		width:130%;
		margin-left:-30% !important;
		border-style:none !important;
		margin-bottom:-15% !important;

		#companyCard{
			margin-top:-20% !important;
			margin-bottom:50% !important;
			width:160% !important;
		}
	}

`;
const CompanyCard=styled.div`
	display:flex;
	flex-direction:column;
	margin-right:10%;
	width:50%;

	@media screen and (max-width:1370px){
		width:70%;
		font-size:15px !important;
	}

	@media screen and (max-width:650px){
		width:130%;
		margin-left:-30% !important;
		border-style:none !important;
		margin-bottom:-15% !important;
		margin-top:40% !important;
	}
`;

const Container=styled.div`
	@media screen and (max-width:650px){
		#particlesJS{
			display:none !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#particlesJS{
			display:none !important;
		}
    }
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

const BackButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginBottom:"2%"
}


const HeaderCSS={
	position:"relative",
	left:"5%",
	fontSize:"40px",
	color:"#5298F8"
}

const HeaderDescriptionCSS={
	position:"relative",
	left:"5%",
	fontSize:"15px",
	color:"	#383838",
	marginTop:"10%",
	marginBottom:"5%"
}

const StartuptypeStyle ={
	position:'relative',
	padding:"10px",
	textAlign:'center',
	borderRadius:'5px'
}

const PersonalCardContainerCSS={
	backgroundColor:"white",
	borderRadius:"5px",
	borderStyle:"solid",
    borderColor:"#5298F8",
    padding:"20px"
}

const CompanyCardContainerCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	width:"40%",
	height:"60%",
	borderRadius:"5px",
	borderStyle:"solid",
    borderColor:"#5298F8",
    padding:"20px",
    marginLeft:"5%"
}

const MAPBOX_TOKEN ="pk.eyJ1IjoibmdyYW50MTIzIiwiYSI6ImNrNzZzcjV3NTAwaGYza3BqbHZjNXJhZDkifQ.DsFpgYjX7ZUtOe7cFmylhQ";

/*
	Right now its set up where if the user is an investor then the creation is done 
	in this class. Should later be made into a module and then seperately done
*/

class LSignupPage extends Component {

	constructor(props){
		super(props);
		//Below code is mainly used when we have the "code" authentication thing for certain users
		
		this.state= {
			viewport: {
		      width: "100%",
		      height:"100%",
		      latitude:40.730610,
		      longitude:-73.935242,
		      zoom: 8
		    },
			displayPersonalSetupPage:false,
			displayCompanySetupPage:false,
			displayPersonalInvestorPage:false,
			hideInitialScreen:false,
			displayInvestorMapScreen:true,
			selectedIndustries:[],
			long:0,
			lat:0,
			displayMarker:false,
			displayPersonalSignupModal:false,
			displayInvestorPersonalSignUpFinalModal:false
		};
	}
	
	DisplayPersonalSetupPage=()=>{

		return this.state.displayPersonalSetupPage==false?
				<React.Fragment>
				</React.Fragment>:
				<PersonalSetupDisplayPage/>

	}


	DisplayCompanySetupPage=()=>{
		if(this.state.displayCompanySetupPage==false)
			return <React.Fragment/>;
		else 
			return <CompanySetupPage/>
	}

	TitleDisplayNameHeader=()=>{
		return <TitleHeader>
					<b>
						What are you looking for on here?
					</b>
					<hr id="mobileDivider" />
			   </TitleHeader>
	}

	handleDisplayGeneralSetupPage=()=>{
		this.setState({
			displayPersonalSignupModal:false
		})
	}


	DisplayPersonalOrCompanyChoices=()=>{

		return this.state.hideInitialScreen==true?
			<React.Fragment>
				{this.DisplayPersonalSetupPage()}
				{this.DisplayCompanySetupPage()}
			</React.Fragment>: 
			<React.Fragment>
				<PersonalSignUpCard id="personalSignInCard">
					<PersonalSignUp
						history={this.props.history}
					/>
				 </PersonalSignUpCard>
			</React.Fragment>
	}

	handleDisplayInvestorSetUpPage=()=>{
		this.setState({
			hideInitialScreen:true,
			displayCompanySetupPage:false,
			displayPersonalSetupPage:false,
			displayPersonalInvestorPage:true
		})
	}

	handleDisplayPersonalSetupPage=()=>{
		document.getElementById("titleHeader").style.visibility="hidden";
		this.setState({displayPersonalSignupModal:true})
	} 


	handleDisplayCompanySetupPage=()=>{
		this.setState({
			displayCompanySetupPage:true,
			hideInitialScreen:true
		})
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



	displayPersonalInvestorSection=()=>{
		return this.state.displayPersonalInvestorPage==false?
			<React.Fragment></React.Fragment>:
			<React.Fragment>
				{this.displayMapScreenOrIndustryScreen()}
			</React.Fragment>
	}



setInvestorInformation=async(e)=>{
//NOT USED


		const locationObject={long:this.state.long,lat:this.state.lat};
		const industries=this.state.selectedIndustries;
		const isInvestor=true;

			this.setState({
				investorInformation:{
					isInvestor:true,
					industries:industries,
					location:locationObject
				},
				displayInvestorPersonalSignUpFinalModal:true
			})
}

handleNextPageClick=(e)=>{
	e.preventDefault();
	if(this.state.lat==0&&this.state.long==0){
		alert('Please tell us your location to continue the process');
	}else{
		this.setState({
			displayInvestorMapScreen:false
		})
	}
}

addIndustry=(props)=>{
	const currentSelectedIndustries=this.state.selectedIndustries;
	if(currentSelectedIndustries.length>0){
		var addIndustryIndicator=false;
		for(var i=0;i<currentSelectedIndustries.length;i++){
		const industry=currentSelectedIndustries[i];

			if(props==industry){
				addIndustryIndicator=true;
			}
		}

		if(addIndustryIndicator==false)
			currentSelectedIndustries.push(props);
	}else{
		currentSelectedIndustries.push(props);
	}
	this.setState({
		selectedIndustries:currentSelectedIndustries
	})
}


	displayMapScreenOrIndustryScreen=()=>{
		return this.state.displayInvestorMapScreen==true? 
			<ul style={{listStyle:"none"}}>
						<TitleHeader style={{fontSize:"60px"}}>
							<b>You indicated that you were interested in investing in other people</b>
						</TitleHeader>
				
						<MapContainer>
							<ReactMapGL
									{...this.state.viewport}
									mapboxApiAccessToken={MAPBOX_TOKEN}
									mapStyle="mapbox://styles/ngrant123/ck78412jk0v5s1io79mvz3etw"
									onClick={(e)=>this.updateLatLongMarker(e)}
									onViewportChange={(viewport) => this.setState({viewport})}
									style={{height:"100%",width:"100%"}}
									center={this.state.center}>

									{this.state.displayMarker && (
										<Marker latitude={this.state.lat} longitude={this.state.long} offsetLeft={-20} offsetTop={-10}>
								          <MarkerContainer>
								          </MarkerContainer>
								        </Marker>
									)}
							</ReactMapGL>
						</MapContainer>

						<p style={{zIndeX:"2",position:"absolute",left:"57%",top:"35%",fontSize:"25px"}}>
							Tell us where you're most located. We need this information so that we can easily match you
							with similar minded startups. Additionally it also helps people find you easier if they 
							are just looking for investors in a certain geographical location. 
						</p>

						<Button to="/home" onClick={e=>this.handleNextPageClick(e)}>
							Next
						</Button>
			</ul>:
			<ul style={{listStyle:"none"}}>
				<TitleHeader style={{fontSize:"60px"}}>
							<b>You indicated that you were interested in investing in other people</b>
				</TitleHeader>

				<ul style={{backgroundColor:"white",width:"30%",position:"absolute",top:"45%",left:"10%",padding:"0px",borderRadius:"5px"}}>
					<li style={{listStyle:"none",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{display:"inline-block",listStyle:"none"}}>
								<AsisgnEveryIndustryButton>
									Pick every industry
								</AsisgnEveryIndustryButton>
							</li>

							<li style={{display:"inline-block",listStyle:"none",marginLeft:"10%"}}>
								<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"#5298F8",
																															backgroundColor:"white"}}>
										Industries
									   	<span class="caret"></span>
									</button>
									<ul class="dropdown-menu" style={{height:"250px",overflowY:"auto"}}>
										{COMPANY_INDUSTRIES.INDUSTRIES.map(data=>
											<li onClick={()=>this.addIndustry(data.industry)}><a href="javascript:;">{data.industry}</a></li>
										)}
										
									</ul>
			  				 	</div>
							</li>
						</ul>
					</li>

					<li style={{listStyle:"none"}}>
						 <ul style={{padding:"0px"}}>
						 	<li style={{listStyle:"none",fontSize:"25px"}}>
						 		<b>Selected Industries</b>
						 	</li>

						 	<li style={{listStyle:"none"}}>
							 	{this.state.selectedIndustries.map(industry=>
							 		<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
							 			<IndustryButton>
							 				{industry}
							 			</IndustryButton>
							 		</li>
							 	)}
						 	</li>
						 </ul>
					</li>
				</ul>

				<ul style={{position:"absolute",top:"45%",left:"50%",width:"45%"}}>
					<li style={{listStyle:"none",marginBottom:"10%",fontSize:"17px"}}>
						We use this informaation to help you connect with other people who are also interested in the 
						same thing that you are interested in. Additionally, it also helps people find you when they 
						are looking for people in specific industries to talk to
					</li>

					<li style={{listStyle:"none"}}>
						<NextButton onClick={()=>this.setInvestorInformation()}>
							Next
						</NextButton> 
					</li>
				</ul>
			</ul>
	}


	render(){
		return (
			<Container>
				<div id="particlesJS" stlye={{width:"200%"}}>	
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
				</div>
				<BodyContainer> 
					<PersonalSignUp
						history={this.props.history}
					/>
				</BodyContainer>
			</Container>
		)
	}
}


const mapStateToProps=(state)=>{
	return{
		firstName:state.personalInformation.firstName,
		lastName:state.personalInformation.lastName,
		email:state.personalInformation.email,
		isLoggedIn:state.personalInformation.loggedIn
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		addFirstName:(firstName)=>dispatch(addName(firstName)),
		addLastName:(lastName)=>dispatch(addLastName(lastName)),
		addEmail:(email)=>dispatch(addEmail(email)),
		addPersonalIdentificationId:(id)=>dispatch(addPersonalIdentificationId(id)),
		loginPersonalPage:(loginIndicator)=>dispatch(loginPersonalPage(loginIndicator)),
		loginCompanyPage:(loginIndicator)=>dispatch(loginCompanyPage(loginIndicator))
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LSignupPage);