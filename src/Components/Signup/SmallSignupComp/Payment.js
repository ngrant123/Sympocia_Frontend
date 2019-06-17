import React, {Component} from "react"
import styled from "styled-components";
import { Link } from "react-router-dom";


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
	background-color:#8849FA;
	top:50%;
	height:15%;
	width:60%;
	left:5%;
	resize:none;
	border-radius:5px;
	color:black;
	font-size:20px;
	font-family:Helvetica;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #5337A9;
	  opacity: 1; /* Firefox */
	}
`;


const AccountDate = styled.textarea`
	position:absolute;
	background-color:#8849FA;
	top:75%;
	height:15%;
	left:30%;
	resize:none;
	border-radius:5px;
	width:20%;
	color:black;
	font-family:Helvetica;

	font-size:20px;
	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #5337A9;
	  opacity: 1; /* Firefox */
	  font-family:Helvetica;
	}

`;

const PaymentDetails = styled.div`
	
	position:absolute;
	left:2%;
	height:12%;
	width:60%;
	top:5%;
	border-radius:5px;
	text-align:center;
	font-size:22px;
	font-family:Helvetica;



`;

const Bankcontainer = styled.div`
	position:absolute;
	background-color:#C8B0F4;
	top:25%;
	width:60%;
	height:55%;
	left:25%;
	border-radius:5px;
	border-style:solid;
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
	font-family:Helvetica;

`;
const GoodThru = styled.div`
	position:absolute;
	height:15%;
	width:10%;
	top:75%;
	left:17%;
	font-family:Helvetica;



`;

const BackBankcontainer = styled.div`
	position:absolute;
	background-color:#C8B0F4;
	top:25%;
	width:60%;
	height:55%;
	left:25%;
	border-radius:5px;
	border-style:solid;
	z-index:-1;
	opacity:0;

   transition: all ease 2s;


`;

const BackLine = styled.div`
	position:absolute;
	background-color:black;
	width:100%;
	height:20%;
	top:7%;


`;

const CVVBackBar= styled.textarea`

	position:absolute;
	background-color:#8849FA;
	top:35%;
	width:40%;
	height:17%;
	left:5%;
	border-radius:5px;
	resize:none;

	color:black;
	font-family:Helvetica;

	font-size:20px;
	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #5337A9;
	  opacity: 1; /* Firefox */
	  font-family:Helvetica;
	}



`;



class Payment extends Component {

	constructor(props){
		super(props);

		this.state = {

			paymentdetails1:'Step 1: Enter you Account Number and Account Date',
			counter:1
		}
	}

	handleOnClick(){
			var counter=this.state.counter;

			if(counter==1){

				this.setState({

					paymentdetails1:'Step 2: Please enter you CVV',
					counter:2

				})
				document.getElementById("backbank").style.zIndex=1;
				document.getElementById("backbank").style.opacity=1;


			}
			else{

				console.log("Next page will be accessed here");



			}
		}



	render(){

		var ButtonLink;
		console.log(typeof this.state.paymentdetails1);

		if(this.state.paymentdetails1 === 'Step 1: Enter you Account Number and Account Date'){
			ButtonLink = <NextPage onClick= {()=> this.handleOnClick()}>
							Continue 
					 	 </NextPage>;

			}
			else{
				ButtonLink = <NextPageLink to="/profile">
								Submit
					 		 </NextPageLink>;

			}
		return(

			<Container>

				<PaymentDetails>
					{this.state.paymentdetails1} 
				</PaymentDetails>


				<Bankcontainer>

					<GoodThru> 
						<b> Good Thru </b>
					</GoodThru>
					<BankSymbol> </BankSymbol>
					<AccountNumber placeholder="Account Number"></AccountNumber>
					<AccountDate placeholder="Date"></AccountDate>
					<BankDebit onClick= {()=> this.handleOnClick()}> DEBIT</BankDebit>

					<BankVisa>
						 <b> VISA </b>
					</BankVisa>


				</Bankcontainer>

				<BackBankcontainer id="backbank">
					<BackLine> </BackLine>
					<CVVBackBar placeholder="CVV"></CVVBackBar>
					

				</BackBankcontainer>

				{ButtonLink}



			</Container>



			)
	}

}

export default Payment;