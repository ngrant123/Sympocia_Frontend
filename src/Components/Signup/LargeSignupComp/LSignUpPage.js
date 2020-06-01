import React, {Component} from 'react';
import styled from "styled-components";
import CompanySetupPage from "../MediumSignupComp/CompanySetupPage.js";
import PersonalSetupDisplayPage from "../MediumSignupComp/PersonalSetupDisplayPage.js";
import Particles from 'react-particles-js';
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
	SubmitButton,
	AsisgnEveryIndustryButton,
	IndustryButton,
	SignUpButton,
	PersonalSignUpCard
} from "./LSignUpPageCSS.js";


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

const StartuptypeStyle ={
	position:'relative',
	padding:"10px",
	textAlign:'center',
	borderRadius:'5px'
}

const MAPBOX_TOKEN ="pk.eyJ1IjoibmdyYW50MTIzIiwiYSI6ImNrNzZzcjV3NTAwaGYza3BqbHZjNXJhZDkifQ.DsFpgYjX7ZUtOe7cFmylhQ"

class LSignupPage extends Component {

	constructor(props){
		super(props);

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
			displayPersonalSignupModal:false
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
						What are you looking for on here?
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

							<ul>
								<li style={{listStyle:"none"}}>
									 <div class="custom-control custom-checkbox mb-3">
									    <input type="checkbox" class="custom-control-input" id="investorCheckbox" required/>
									    <label class="custom-control-label" for="investorCheckbox">Check this checkbox if you plan on investing now or the future (dont worry if you dont know how we'll try our best to teach you)</label>
									    <div class="invalid-feedback"></div>
									  </div>

								</li>
							</ul>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<SignUpButton onClick={()=>this.handleDisplayPersonalSetupPage()}>Click here</SignUpButton>
							</a>

						</PersonalSectionCard>
				</PersonalSectionContainer>

				{this.state.displayPersonalSignupModal==false?
					<CompanySectionContainer>
							<CompanySectionCard>
								<p style={HeaderCSS}><b>Business</b></p>
								<p style={HeaderDescriptionCSS}> Ready to show the world your hobby that you're 
									proud of? Or maybe you have a startup or business and you want to connect with people
									who you think would want to see it? Click on the button below to get started
								</p>
								<SignUpButton onClick={()=>this.handleDisplayCompanySetupPage()}>Click here</SignUpButton>

							</CompanySectionCard>
					</CompanySectionContainer>

					:<PersonalSignUpCard>
						<PersonalSignUp/>
					</PersonalSignUpCard>
				}	
			</React.Fragment>

	}



	handleDisplayPersonalSetupPage=async(e)=>{

		const checkbox=document.getElementById("investorCheckbox");
		const valueOfCheckbox=checkbox.checked;
		if(valueOfCheckbox==true){
			this.setState({
				hideInitialScreen:true,
				displayCompanySetupPage:false,
				displayPersonalSetupPage:false,
				displayPersonalInvestorPage:true
			})

		}else{
			this.setState({displayPersonalSignupModal:true})
		}
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
		console.log("Testing sign up page");
		return this.state.displayPersonalInvestorPage==false?
			<React.Fragment></React.Fragment>:
			<React.Fragment>
				{this.displayMapScreenOrIndustryScreen()}
			</React.Fragment>
	}



handleCreateInvestorProfileClick=async(e)=>{

			this.props.addFirstName(this.props.firstName);
			this.props.addLastName(this.props.lastName);
			this.props.addEmail(this.props.email);

			const locationObject={long:this.state.long,lat:this.state.lat};
			const industries=this.state.selectedIndustries;
			const isInvestor=true;
			debugger;
			const profileId=await createProfile({
				firstName:this.props.firstName,
				lastName:this.props.lastName,
				email:this.props.email,
				isInvestor:true,
				industries:industries,
				location:locationObject
			});
			this.props.addPersonalIdentificationId(profileId);
			this.props.loginPersonalPage(true);
			this.props.loginCompanyPage(false);
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

						<SubmitButton to="/home" onClick={e=>this.handleCreateInvestorProfileClick(e)}>
							Submit
						</SubmitButton> 
					</li>
				</ul>

			</ul>

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
				{this.displayPersonalInvestorSection()}

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