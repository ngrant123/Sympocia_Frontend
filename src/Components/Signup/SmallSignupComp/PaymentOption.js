import React, {Component} from "react";
import styled from "styled-components";
import { addPaymentPlan } from '../../../Actions/Redux/Actions/CompanyActions.js';
import { connect } from 'react-redux';
import {createProfile} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {createCompanyProfile} from "../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPagePostRequests";
import { Link } from "react-router-dom";

import {
	addCompanyId,
	updatefirstTimeUsage,
	loginCompanyPage
} from "../../../Actions/Redux/Actions/CompanyActions.js";


import {loginPersonalPage} from "../../../Actions/Redux/Actions/PersonalProfile.js";

const Payment1 = styled.div`

	position:relative;

	width:30%;
	height:400px;
	left:1%;
	top:40px;
	border-radius:5px;
	transition: all ease 3s;
	padding:10px 0;
	border-style:none;



	&:hover{

   background-color: #ded2f9;

   color:white;
   transition: all ease 0.8s;

   }
	
`;


const P1PriceDescript = styled.div`

	position:relative;
	color:black;
	width:50%;
	height:9%;
	left:25%;
	top:30px;
	border-radius:5px;
	text-align:center;
	font-size:30px;
	font-family:Helvetica;

`;

const P1Number = styled.div`
	position:absolute;

	color:#A57FEA;
	width:50%;
	height:21%;
	left:25%;
	top:20%;
	border-radius:5px;
	font-size:65px;
	text-align:center;

`;

const P1Description = styled.div`
	position:absolute;
	color:#727274;
	width:82%;
	height:17%;
	left:12%;
	top:40%;
	border-radius:5px;
	font-size:18px;
	font-family:Helvetica;

`;


const P1SecondDescription = styled.div`
	position:absolute;
	color:black;
	width:80%;
	height:20%;
	left:5%;
	top:60%;
	border-radius:5px;
	font-size:14px;
	text-align:center;
	font-family:Helvetica;
	overflow-y:scroll;
	transition:.8s;

	&:hover{
		background-color:white;
	}

`;




const P1Submit = styled.div`
	position:absolute;
	background-color:#C8B0F4;
	color:white;
	width:50%;
	height:10%;
	left:20%;
	top:80%;
	border-radius:5px;
	font-size:20px;

	text-align:center;
	font-family:Myriad Pro;
	padding:10px;
	   transition: all ease 0.8s;



	&:hover{

    background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   transition: all ease 0.8s;

   }

`;

const RedirectToHomePageButton = styled(Link)`
	position:absolute;
	background-color:#C8B0F4;
	color:white;
	width:50%;
	height:10%;
	left:20%;
	top:80%;
	border-radius:5px;
	font-size:20px;

	text-align:center;
	font-family:Myriad Pro;
	padding:10px;
	   transition: all ease 0.8s;



	&:hover{

    background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   transition: all ease 0.8s;

   }
`;

class PaymentOption extends Component {



	constructor(props){

		super(props);


		this.state = {

			pricedescription: props.pricedescription,
			number: props.number,
			description: props.description,
			id:props.id
		};
	}

	componentDidMount(){
		const CompanyInformation={
			companyName:this.props.companyName,
			companyIndustry:this.props.companyIndustry,
			companyLocation:this.props.companyLocation,
			paymentPlan:"Free",
		}

		const ReduxFunctions={
			addCompanyId:this.props.addCompanyId,
			updatefirstTimeUsage:this.props.updatefirstTimeUsage,
			loginCompanyPage:this.props.loginCompanyPage,
			loginPersonalPage:this.props.loginPersonalPage
		}

		this.setState({
			...this.state,
			companyInformation:CompanyInformation,
			reduxFunctions:ReduxFunctions
		})
	}


	handleHoverIn(){

		document.getElementById(this.state.id).style.color="#8b62ea";


	}

	handleHoverOut(){

		document.getElementById(this.state.id).style="black";

	}


	handleSendDataToDatabase=async(companyInformation,reduxFunctions)=>{
			const {
				addCompanyId,
				updatefirstTimeUsage,
				loginCompanyPage,
				loginPersonalPage
			}=reduxFunctions;

			const {
				companyName,
				companyIndustry,
				companyLocation,
				paymentPlan
			}=companyInformation;

			const personalData={
				companyName:companyName,
				companyIndustry:companyIndustry,
				companyLocation:companyLocation,
				paymentPlan:paymentPlan,
				firstTime:true
			}
			
			const profile=await createCompanyProfile(personalData);
			addCompanyId(profile._id);
			updatefirstTimeUsage(true);
			loginCompanyPage(true);
			loginPersonalPage(false);
			return profile;

			///Implement strip api on frontend
		}

	render(){
		return (
					<Payment1 id={this.state.id+"container"} onload= {()=> this.onLoad()}>
						<P1PriceDescript id={this.state.id+''}> {this.state.pricedescription} </P1PriceDescript> 
						<P1Number> {this.state.number} </P1Number>
						<P1Description> {this.state.description} </P1Description>


						<P1SecondDescription>
							<ul> 
								<li> Browse Startups </li>
								<li> Connect with Investors </li>
								<li> Connect with similar Startups</li>

							</ul>
						 </P1SecondDescription>
						{this.props.pricedescription!="Free"?
								<P1Submit 
									onMouseOver= {()=> this.handleHoverIn()}
									onMouseOut={()=> this.handleHoverOut()} 
									onClick={()=>this.props.handleDisplayPaymentScreen()}> 
										Choose Free 
								</P1Submit>:
								<RedirectToHomePageButton to={{pathname:`/home`,query:{createProfile:{
													handleSendDataToDatabase:this.handleSendDataToDatabase,
													companyInformation:this.state.companyInformation,
													reduxFunctions:this.state.reduxFunctions,
													isPersonalProfile:false
												}
										}}}>
											Choose Free
								</RedirectToHomePageButton>
						}
					</Payment1>	
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		firstName:state.personalInformation.firstName,
		lastName:state.personalInformation.lastName,
		email:state.personalInformation.email,
		companyName:state.companyInformation.companyName,
		companyLocation:state.companyInformation.companyLocation,
		companyIndustry:state.companyInformation.companyIndustry
	}
}


const mapDispatchToProps=dispatch=>{

	return{
		addCompanyId:(companyId)=>dispatch(addCompanyId(companyId)),
		updatefirstTimeUsage:(indicator)=>dispatch(updatefirstTimeUsage(indicator)),
		loginCompanyPage:(loginIndicator)=>dispatch(loginCompanyPage(loginIndicator)),
		loginPersonalPage:(loginIndicator)=>dispatch(loginPersonalPage(loginIndicator))
	}
}



export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PaymentOption);