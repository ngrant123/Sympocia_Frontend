import React from "react";
import styled from "styled-components";

const Container=styled.div`
	@media screen and (max-width:650px){
		#headerTitle{
			font-size:20px !important;
		}
		#coreContent{
			font-size:15px !important;
			width:90% !important;
		}
	}
`;

const PaymentExplanation=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> Payment features <span style={{color:"#C8B0F4"}}>breakdown</span></b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				As of right now, there are two options for payment plans. You can either pick a bundle plan or an itemized
				plan.

				<br/>
				<br/>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 1: <span style={{color:"#C8B0F4"}}>Bundle Plan</span></b>
				</p>
				<p> 
					Essentially the bundle plan allows you to get a certain number of features for a fixed price. There are three
					bundle plans and each of them builds up on top of each other. Now this is the unique part. Since with the 
					bundle plan you are getting a decent amount of features cheaper then if you were to buy them itemized, the
					bundle plan resets each month. So for example of you get the first bundle plan and you unlock all those 
					features then at the end of the month you will have to purchase that bundle again in order to keep on using 
					those features. The itemized plan offers a more permanent option.
				</p>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 2: <span style={{color:"#C8B0F4"}}>Itemized Plan</span></b>
				</p>
				<p>
					The itemized plan offers all of the features that the bundle plans offer but each of them are a standalone 
					item. Additionally, the pricing is a little bit higher for these also. What makes the itemized plan more
					interesting is that unlike the bundle plan, these items don't reset after a month. 
					They are one time purchases. 
				</p>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 3: <span style={{color:"#C8B0F4"}}>Free Unlock</span></b>
				</p>
				<p>
					If you have read my previous post about tokens, you would know that depending on your token score you can reach 
					the status of gold,silver, or bronze. This status also is connected with the payment features unlocked also. 
					For example, if you reach the bronze level through slowly increasing your token score you then unlock the 
					bronze bundle payment features. The same goes for silver and gold.
				</p>
				<br/>
				<br/>
				<p style={{fontSize:"24px",color:"#C8B0F4"}}>
				 	<b>Conclusion</b>
				</p>
				Hopefully, this post was a little helpful for you. Me explaining how the payment features work will 
				remove any ambiguity. Or maybe increase more confusion. Who knows....Email me @ nathan.sympocia.com.
				<br/>
				<br/>
			</p>
			<p style={{fontSize:"20px",marginTop:"5%"}}>
				Sincerly, the team at 
			</p>
			<p style={{fontSize:"20px"}}>
				<span style={{color:"#C8B0F4"}}>Sympocia</span>
			</p>
		</Container>
	)

}

export default PaymentExplanation; 