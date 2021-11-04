import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import {createCharge} from "../../../../Actions/Requests/PaymentAxiosRequests/PaymentPostRequests.js";
import {useSelector} from "react-redux";

const StripePublishableKey=process.env.NODE=="production"?
	process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY:
	process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY;


const Checkout=({paymentValue,tokenTier,itemizedIds,unMountItemCheckoutModal})=>{
	debugger;
	const userId=useSelector(state=>state.personalInformation.id);

	const handleTokenCallback=async(tokenInformation)=>{
		const {
			email,
			id
		}=tokenInformation;
		const itemIds=[];
		for(var i=0;i<itemizedIds.length;i++){
			itemIds.push(itemizedIds[i]._id);
		}

		const chargeInformation={
			stripeConfirmationId:id,
			email,
			itemizedIds:itemIds,
            userId,
            tokenTier,
            paymentPrice:paymentValue
		}
		const {confirmation,data}=await createCharge(chargeInformation);
		if(confirmation=="Success"){
			unMountItemCheckoutModal();
			alert("Payment secured. Enjoy your features");
		}else{
			alert("Unfortunately there has been an error when processing your transaction. Please try again");
		}
	}

	return (
		<div>
			<StripeCheckout
				stripeKey={StripePublishableKey}
				token={handleTokenCallback}
				amount={paymentValue}
			/>
		</div>
	);
}

export default Checkout;