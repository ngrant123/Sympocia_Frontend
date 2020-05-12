import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import {loadStripe} from "@stripe/stripe-js";

const DonateContainer=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:12;
	top:20%;
	border-radius:5px;
	left:40%;
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

const stripePromise=loadStripe('pk_test_OLEtDzV7lwtccHsmV9cn4DaP00a1U7RZqD');

const DonatePortal=(props)=>{

	const handleStripeToken=(token)=>{
		console.log("Stripe token");
		console.log(token);
	}

	return createPortal(
			<React.Fragment>
				<DonateContainer>
					<button onClick={()=>handleStripeToken()}type="button" class="btn btn-primary">Primary</button>
				</DonateContainer>
				<ShadowContainer onClick={()=>props.closeModal()}/>
			</React.Fragment>,
		document.getElementById("personalContainer")
	)
}

export default DonatePortal;