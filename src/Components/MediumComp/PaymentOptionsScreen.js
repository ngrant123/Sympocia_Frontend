import React, {Component} from "react";
import styled from "styled-components";
import Payment from "/Users/nathangrant/Desktop/company/src/Components/SmallComp/PaymentOption.js";
import Pay from "/Users/nathangrant/Desktop/company/src/Components/SmallComp/Payment.js";


const PaymentOptionContainer = styled.div`

	position:absolute;
	background-color:white;
	height:100%;
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
	z-index:-1;
	transition: all ease 0.8s;

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





class PaymentOptions extends Component{

//Wrapper this component around container then change containers opacity


handleClick(){
	console.log("This functions been accessed through the child component");
	document.getElementById("paysectionid").style.zIndex=1;
	document.getElementById("paysectionid").style.opacity=1;



}
	render(){

//Fix spacing between ul li elements
		return (
			<div>
					<PaymentOptionContainer>

						<ul style={{paymentStyleUL}}>
							<li style={{display:"flex"}}>

									{ paymentOptions.map(payment =>
								
											<Payment 
												pricedescription={payment.pricedescription}
												number={payment.number}
												description={payment.description}
												id={payment.id}
												key={payment.id}
												handleClick={this.handleClick}

											/>
										)
									}
							</li>
						</ul>
					

					 </PaymentOptionContainer>

					 <PaySection id="paysectionid">

						<Pay />



					 </PaySection>

			 </div>
		)
	}
}


export default PaymentOptions;



