import React,{useState} from "react";
import styled from "styled-components";
import { GeneralNavBar } from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import BundlePaymentOptions from "../PaymentSubset/BundlePaymentOptions.js";
import Checkout from "./Modals-Portals/Checkout.js";
import ItemizedCheckout from "../PaymentSubset/ItemizedCheckout.js";
import Particles from 'react-particles-js';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
`;
const PaymentOptionsContainer=styled.div`
	width:100%;
	height:80%;
	margin-top:5%;
	padding:5%;
`;

const PaymentOptionCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer"
}

const VerticalLineCSS={
	position:"relative",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"40px",
 	marginLeft:"3%",
 	marginRight:"3%"
}

const ClearPaymentOptionDropDownCSS={
	borderColor:"#D0D0D0",
	borderStyle:"none",
	borderWidth:"1px",
	borderRadius:"5px",
	padding:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer",
	backgroundColor:"white",
	color:"#000000",
	marginBottom:"2%",
	marginLeft:"15%"
}


const Payment=(props)=>{
	const [displayCheckoutPage,changeDisplayCheckoutPage]=useState(false);
	const [selectedTier,changeSelectedTier]=useState();
	const [displayBundleOption,changeDisplayBundleOption]=useState(true);

	const triggerCheckoutDisplay=(selectedTier)=>{
		changeSelectedTier(selectedTier);
		changeDisplayCheckoutPage(true);
	}

	const closeCheckoutDisplay=()=>{
		changeDisplayCheckoutPage(false);
	}

	const checkoutModal=()=>{
		return(
			<React.Fragment>
				{displayCheckoutPage==true &&(
					<Checkout
						closeCheckoutDisplay={closeCheckoutDisplay}
						selectedTier={selectedTier}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<Container id="paymentPage">
			<div id="particlesJS" stlye={{position:"absolute",width:"200%",zIndex:"-2"}}>	
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
			<div style={{position:"absolute",top:"0%"}}>
				<GeneralNavBar
					page={"PaymentPage"}
					routerHistory={props.history}
					targetDom={"paymentPage"}
				/>
				{checkoutModal()}
				<PaymentOptionsContainer>
					<p>
						<b>Choose your payment plan:</b>
					</p>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
							<div style={PaymentOptionCSS} onClick={()=>changeDisplayBundleOption(true)}>
								Bundle
							</div>
							<div class="btn-group">
								<button class="btn btn-primary dropdown-toggle" type="button" 
									data-toggle="dropdown" style={ClearPaymentOptionDropDownCSS}>
									<HelpOutlineIcon
										style={{fontSize:"24"}}
									/>
								</button>
								<ul class="dropdown-menu" style={{padding:"25px",width:"300px"}}>
									<li style={{cursor:"pointer"}}>
										Bundles give you an opportunity  to purchase items at a more cheaper cost 
										than if you were to buy them standalone but after a month these features you
										previously bought are reset.
									</li>
								</ul>
							</div>	
						</div>
						<div style={VerticalLineCSS}/>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
							<div style={PaymentOptionCSS} onClick={()=>changeDisplayBundleOption(false)}>
								Select Items
							</div>
							<div class="btn-group">
								<button class="btn btn-primary dropdown-toggle" type="button" 
									data-toggle="dropdown" style={ClearPaymentOptionDropDownCSS}>
									<HelpOutlineIcon
										style={{fontSize:"24"}}
									/>
								</button>
								<ul class="dropdown-menu" style={{padding:"25px",width:"300px"}}>
									<li style={{cursor:"pointer"}}>
										Each selected item is a one time fee for unlimited time for now. Ads have a duration
										of a week.
									</li>
								</ul>
							</div>	
						</div>
					</div>
					{displayBundleOption==true ?
						<BundlePaymentOptions
							triggerCheckoutDisplay={triggerCheckoutDisplay}
						/>:
						<ItemizedCheckout/>
					}
				</PaymentOptionsContainer>
			</div>
		</Container>
	)
}


export default Payment;