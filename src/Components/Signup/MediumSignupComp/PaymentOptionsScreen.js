import React, {Component} from "react";
import styled from "styled-components";
import Payment from "../SmallSignupComp/PaymentOption.js";
import Pay from "../SmallSignupComp/Payment.js";


const PaymentOptionContainer = styled.div`

	position:absolute;
	background-color:white;
	height:105%;
	width:100%;
	border-radius:5px;
	border-style:solid;
	border-color:black;
	display:inline;
	transition: all ease .2s;

	opacity:1;

`;

const Payment1 = styled.div`

	position:absolute;
	background-color:red;
	width:30%;
	height:85%;
	left:3%;
	top:8%;
	border-radius:5px;
`;


const P1PriceDescript = styled.div`

	position:absolute;
	background-color:blue;
	color:blue;
	width:50%;
	height:9%;
	left:25%;
	top:8%;
	border-radius:5px;

`;

const P1Number = styled.div`
	position:absolute;
	background-color:blue;
	color:blue;
	width:50%;
	height:21%;
	left:25%;
	top:20%;
	border-radius:5px;

`;

const P1Description = styled.div`
	position:absolute;
	background-color:blue;
	color:blue;
	width:70%;
	height:30%;
	left:15%;
	top:45%;
	border-radius:5px;

`;

const P1Submit = styled.div`
	position:absolute;
	background-color:blue;
	color:blue;
	width:50%;
	height:12%;
	left:25%;
	top:80%;
	border-radius:5px;

`;

const PaySection = styled.div`
	position:absolute;
	background-color:blue;
	width:100%;
	height:100%;
	opacity:0;
	transition: all ease 0.8s;
	z-index:3;

`;


const ExitPaymentOptionScreen=styled.div`
	position:absolute;
	background-color:white;
	width:20%;
	height:10%;
	left:10%;
	top:87%;
	border-radius:5px;
	color:#C8B0F4;	
	border-style:solid;
    border-color:#C8B0F4;
    text-align:center;
    font-size:30px;
    transition:.8s;
    z-index:3;

    &:hover{

    	background-color:#A57FEA;
    	color:white;
    }
`;


const paymentOptions = [

	{
		pricedescription:'Free',
		number: '$0',
		description: 'Free for everybody and anybody',
		id:1

	},
	{
		pricedescription:'Basic',
		number: '$14.99',
		description: 'Base Plan Affordable for Startups',
		id:2

	},
	{
		pricedescription:'Premium',
		number: '$14.99',
		description: 'Base Plan Affordable Plan for Startups',
		id:3

	}

	

	];

	const paymentStyleUL = 

	{
		margin:'10px 0'
	};

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
		z-index:3;

		  &:hover{

	      background-color:white;

	    color:#C8B0F4;
	   border-style:solid;
	   border-color: #C8B0F4;
	   transition: all ease 0.8s;
	   overflow:hidden;

	   }
	`;


//Could be just turned into a functional component later


class PaymentOptions extends Component{

//Wrapper this component around container then change containers opacity


constructor(props){

	super(props);
	this.state={

		paymentOption:paymentOptions,
		displayPaymentOptionsScreen:false,
		displayPaymentScreen:false
	}

	this.handleClick=this.handleClick.bind(this);
}

handleClick(){


	this.props.handleBackClick();

/*
	var object={
		pricedescription:'Tester',
		number: '$0',
		description: 'Free for everybody and anybody',
		id:4

	}

	paymentOptions.push(object);
	console.log(paymentOptions);
	this.setState({

		paymentOption:paymentOptions


	});
	console.log(this.state.paymentOption);
	*/

}

handleDisplayPaymentScreen=()=>{

	console.log("Payment Screen clicked");
	this.setState({
		displayPaymentScreen:true,
		displayPaymentOptionsScreen:false
	})
}

handleDisplayPaymentOptionsScreen=()=>{

	this.setState({
		displayPaymentScreen:false,
		displayPaymentOptionsScreen:true
	})

}

handleDisplayPaymentSCreenOrPaymentOptions=()=>{


	return this.state.displayPaymentScreen==false?
				<PaymentOptionContainer>

						<ul style={{paymentStyleUL}}>
							<li style={{display:"flex"}}>

									{ this.state.paymentOption.map(payment =>
								
											<Payment 
												pricedescription={payment.pricedescription}
												number={payment.number}
												description={payment.description}
												id={payment.id}
												key={payment.id}
												handleDisplayPaymentScreen={this.handleDisplayPaymentScreen}

											/>
										)
									}
							</li>
						</ul>
						<ExitPaymentOptionScreen onClick={()=>this.handleClick()}> Back </ExitPaymentOptionScreen>

					 </PaymentOptionContainer>:
					 <React.Fragment>
						<Pay/>
						<BackButton onClick={()=>this.handleDisplayPaymentOptionsScreen()}>Back</BackButton>
					</React.Fragment>

}


	render(){

		return (
			<React.Fragment>
				{this.handleDisplayPaymentSCreenOrPaymentOptions()}
			</React.Fragment> 
		)
	}
}


export default PaymentOptions;



