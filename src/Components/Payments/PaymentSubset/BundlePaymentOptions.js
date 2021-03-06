import React,{useEffect} from "react";
import styled from "styled-components";
import Checkout from "../PaymentSet/Modals-Portals/Checkout.js";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;

	@media screen and (max-width:1370px){
		flex-direction:column;
		#card{
			margin-bottom:5%;
			width:95% !important;
		}

		#cardHorizontalLine{
			display:block !important;
		}
	}
`;

const CardCSS={
	position:"relative",
	width:"60%",
	backgroundColor:"white",
	marginRight:"2%",
	borderRadius:"5px",
	boxShadow:"1px 1px 5px #6e6e6e",
	height:"50%",
	overflow:"hidden"
}


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const CardHorizontalLineCSS={
	...HorizontalLineCSS,
	display:"none"
}

const ProceedButton={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"50%",
	textAlign:"center"
}
const PaymentOptions=()=>{
	const options=[
		{
			tier:"Bronze",
			price:2.99,
			offers:[
				"50+ friends node avatars",
				"Increased friends gauge node maximum from 3 to 5"
			]
		},
		{
			tier:"Silver",
			price:4.99,
			offers:[
				"3 Free Ads",
				//"Payment option ability(Sympocia takes 15% of each donation you recieve",
				"Bronze offers included"
			]
		},
		{
			tier:"Gold",
			price:9.99,
			offers:[
				//"Payment option ability(Sympocia takes 5% of each donation you recieve)",
				"5 Free Ads",
				"Option to upload own friends node avatars",
				"Silver and Bronze offers included (Excluding the 3 free ads)"
			]
		}
	]

	useEffect(()=>{
		for(var i=0;i<options.length;i++){
			const element=document.getElementById("tier"+options[i].tier);
			const {offers}=options[i];
			const ulHTML=document.createElement("ol");
			for(let j=0;j<offers.length;j++){
				const textNodeLI=document.createElement("li");
				const textNode=document.createElement("span");
				textNode.innerText=offers[j];
				textNode.style.fontWeight="bold";
				textNodeLI.appendChild(textNode);
				textNodeLI.style.marginBottom="10%";
				ulHTML.appendChild(textNodeLI);
			}
			element.appendChild(ulHTML);
		}
	},[]);

	const displayCheckout=()=>{

	}

	const handleTokenCallback=(token)=>{
	}

	const paymentCard=({tier,offers,price})=>{
		return(
			<div id="card" style={CardCSS}>
				<div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"5%"}}>
					<p style={{color:"#C8B0F4",fontSize:"24px"}}>
						<b>{tier}</b>
					</p>
					<hr style={HorizontalLineCSS}/>
					<div id={"tier"+tier}/>
				</div>
				<div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",backgroundColor:"#1B1B1B",marginTop:"30%",height:"30%"}}>
					{/*
						<div style={ProceedButton}>
							Proceed
						</div>
					*/}
					<Checkout
						paymentValue={price*100}
						tokenTier={tier}
					/>
				</div>
			</div>
		)
	}
	return(
		<Container>
			{options.map(data=>
				<>
					{paymentCard(data)}
					<hr id="cardHorizontalLine" style={CardHorizontalLineCSS}/>
				</>
			)}
		</Container>
	)
}

export default PaymentOptions;