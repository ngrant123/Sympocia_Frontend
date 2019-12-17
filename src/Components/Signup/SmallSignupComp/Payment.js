import React, {Component} from "react"
import styled from "styled-components";
import { Link } from "react-router-dom";
import {createProfile}from "../../../Actions/Requests/ProfilePageAxiosRequests/ProfilePagePostRequests.js";
import {connect} from 'react-redux';
import {  
		  addCardDate,
		  addAccountNumber,
		  addCvv
		} from '../../../Actions/Redux/Actions/PersonalProfile.js';


const Container= styled.div`
	position:absolute;
	height:100%;
	width:100%;
	background-color:white;
	border-style:solid;
	transition: all ease 0.8s;


`;

const AccountNumber = styled.textarea`
	position:absolute;
	background-color:white;
	top:50%;
	height:15%;
	width:60%;
	left:5%;
	resize:none;
	border-radius:5px;
	color:#cfb2fb;
	font-size:20px;
	font-family:Helvetica;
	border-style:none;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color:#e1d0fd;
	  opacity: 1; /* Firefox */
	}
`;


const AccountDate = styled.textarea`
	position:absolute;
	background-color:white;
	top:75%;
	height:15%;
	left:30%;
	resize:none;
	border-radius:5px;
	width:20%;
	color:	#cfb2fb;
	font-family:Helvetica;
	border-style:none;


	font-size:20px;
	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #e1d0fd;
	  opacity: 1; /* Firefox */
	  font-family:Helvetica;
	}

`;

const PaymentDetails = styled.div`
	
	position:absolute;
	left:2%;
	height:12%;
	width:90%;
	top:5%;
	border-radius:5px;
	text-align:center;
	font-size:30px;
	color:	#4c415b;
	font-family:Helvetica;



`;

const Bankcontainer = styled.div`
	position:absolute;
	background:linear-gradient(to bottom, #c8b0f4 0%, #ff99ff 100%);
	top:25%;
	width:60%;
	height:55%;
	left:25%;
	border-radius:5px;
	z-index:0;

   transition: all ease .8s;


`;

const NextPage = styled.div`
	position:absolute;
	background-color:#C8B0F4;
	color:white;

	top:85%;
	width:20%;
	left:75%;
	border-radius:5px;
	height:10%;

	  &:hover{

      background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   transition: all ease 0.8s;
   overflow:hidden;

   }

   text-align:center;
	font-family:Myriad Pro;
	font-size:25px;

`;

const NextPageLink = styled(Link)`
	position:absolute;
	background-color:#C8B0F4;
	color:white;

	top:85%;
	width:20%;
	left:75%;
	border-radius:5px;
	height:10%;
	overflow:hidden;

	  &:hover{

      background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   transition: all ease 0.8s;
   text-decoration:none;

   }

   text-align:center;
	font-family:Myriad Pro;
	font-size:25px;

`;

const BankSymbol = styled.div`
	position:absolute;
	background-color:#423584;
	width:15%;
	height:20%;
	top:26%;
	left:5%;
	border-radius:5px;


`;

const BankDebit = styled.div`
	position:absolute;
	top:65%;
	height:10%;
	width:10%;
	left:85%;
	color:white;
	font-size:15px;
	font-family:Helvetica;

`;

const BankVisa = styled.div`
	position:absolute;
	top:78%;
	height:15%;
	width:15%;
	left:83%;
	font-size:25px;
	color:white;
	font-family:Helvetica;

`;
const GoodThru = styled.div`
	position:absolute;
	height:15%;
	width:10%;
	top:75%;
	color:white;
	left:17%;
	font-family:Helvetica;



`;

const BackBankcontainer = styled.div`
	position:absolute;
	background:linear-gradient(to bottom, #c8b0f4 0%, #ff99ff 100%);
	top:25%;
	width:60%;
	height:55%;
	left:25%;
	border-radius:5px;
   transition: all ease 2s;


`;

const BackLine = styled.div`
	position:absolute;
	background-color:#a26af6;
	width:100%;
	height:20%;
	top:7%;
`;

const CVVBackBar= styled.textarea`

	position:absolute;
	top:35%;
	width:40%;
	height:17%;
	left:5%;
	border-radius:5px;
	resize:none;
	border-style:none;
	color:#cfb2fb;
	font-family:Helvetica;

	font-size:20px;
	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #cfb2fb;
	  opacity: 1; /* Firefox */
	  font-family:Helvetica;
	}



`;

const BackButton=styled.div`
		position:absolute;
		background-color:#C8B0F4;
		color:white;
  		text-align:center;
		font-family:Myriad Pro;
		font-size:25px;
		top:85%;
		width:20%;
		left:15%;
		border-radius:5px;
		height:10%;
		z-index:4;

		  &:hover{

	      background-color:white;

	    color:#C8B0F4;
	   border-style:solid;
	   border-color: #C8B0F4;
	   transition: all ease 0.8s;
	   overflow:hidden;

	   }
	`;
//Could be a functional Component in the future


class Payment extends Component {

	constructor(props){
		super(props);

		this.state = {

			paymentdetails1:'Step 1: Enter you Account Number and Account Date',
			displayFirstCardPage:true,
			counter:1
		}
	}


		handleSendDataToDatabase=()=>{

			const accountCvv=document.getElementById('accountCvv').value;
			this.props.addCvv(accountCvv);

			const personalData={
				firstName:this.props.firstName,
				lastName:this.props.lastName,
				email:this.props.email,
				accountNumber:this.props.accountNumber,
				accountDate:this.props.dateOnCard,
				accountCvv:this.props.cvv
			} 

			///Implement strip api on frontend


			//console.log(createProfile(personalData));
		}

		handleFirstPageContinueClick=()=>{


			const accountNumber=document.getElementById('accountNumber').value;
			const accountDate=document.getElementById('accountDate').value;

			this.props.addAccountNumber(accountNumber);
			this.props.addCardDate(accountDate);

			this.setState({
				displayFirstCardPage:false
			})
		}

		handleSecondPageBackButton=()=>{
			this.setState({
				displayFirstCardPage:true
			})
		}



		handleDisplayFirstOrSecondCardPage=()=>{

			return this.state.displayFirstCardPage==true?
				<React.Fragment>
					<PaymentDetails>
						<p><b>Step 1: Enter you Account Number and Account Date</b></p>
					</PaymentDetails>

					<Bankcontainer>

						<GoodThru> 
							<b> Good Thru </b>
						</GoodThru>
						<AccountNumber id="accountNumber" placeholder="Account Number"></AccountNumber>
						<AccountDate id="accountDate" placeholder="Date"></AccountDate>
						<BankDebit> DEBIT</BankDebit>

						<BankVisa>
							 <b> VISA </b>
						</BankVisa>
					</Bankcontainer>

					<NextPage onClick= {()=> this.handleFirstPageContinueClick()}>
							Continue 
					 </NextPage>
				</React.Fragment>:
				<React.Fragment>
					<PaymentDetails>
						<p>Step 2: Please enter you CVV</p>
					</PaymentDetails>

					<BackBankcontainer>
						<BackLine> </BackLine>
						<CVVBackBar id="accountCvv" placeholder="CVV"></CVVBackBar>
					</BackBankcontainer>

					<NextPageLink to="/profile" onClick={()=>this.handleSendDataToDatabase()}>
								Submit
					</NextPageLink>

					<BackButton onClick={()=>this.handleSecondPageBackButton()}>
						Back
					</BackButton>
				</React.Fragment>

		}



	render(){
		return(

			<Container>
				{this.handleDisplayFirstOrSecondCardPage()}
			</Container>
			)
		}
}


const mapStateToProps=(state)=>{

	return {
		firstName:state.personalInformation.firstName,
		lastName:state.personalInformation.lastName,
		email:state.personalInformation.email,
		accountNumber:state.personalInformation.accountNumber,
		accountDate:state.personalInformation.dateOnCard,
		accountCvv:state.personalInformation.cvv
	}

}

const mapDispatchToProps =(dispatch)=>{

	return{
		addCardDate: (cardDate)=> dispatch(addCardDate(cardDate)),
		addAccountNumber:(accountNumber)=>dispatch(addAccountNumber(accountNumber)),
		addCvv:(cvv)=>dispatch(addCvv(cvv))
	}

}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Payment);