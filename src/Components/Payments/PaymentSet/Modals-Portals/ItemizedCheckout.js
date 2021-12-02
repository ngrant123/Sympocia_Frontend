import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ClearIcon from '@material-ui/icons/Clear';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Checkout from "./Checkout.js";

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	border-radius:5px;
	background-color:white;
	z-index:50;
	bottom: 40;
	right: 0;
	padding:10px;
	margin-right:25px;
	border-style:solid;
	border-width:2px;
	border-color:#D0D0D0;
	display:flex;
	flex-direction:column;
	overflow-y:auto;


	@media screen and (max-width:1370px){
		width:60%;
	}

	@media screen and (max-width:650px){
		margin-right:0px;
		bottom:0;
		width:100%;
		height:100%;
	}
`;


const CloseTokenDisplay=styled.div`
	position:absolute;
	border-radius:50%;
	height:30px;
	width:30px;
	background-color:white;
	z-index:30;
	margin-left:-20%;
	display:flex;
	justify-content:center;
	align-items:center;
	cursor:pointer;
`;	

const MinifiedTokenDisplay=styled.div`
	position:fixed;
	background-color:white;
	z-index:100;
	bottom: 10;
	right: 0;
	padding:10px;
	margin-right:25px;
	border-radius:5px;
	cursor:pointer;
	box-shadow: 1px 1px 10px #707070;
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const ItemizedCheckout=({item,unMountItemCheckoutModal,isPhoneUIEnabled})=>{
	const [displayMinifiedToken,changeDisplayMinifiedToken]=useState(isPhoneUIEnabled);
	const [currentSelectedItems,changeCurrentSelectedItems]=useState([]);
	const [pricingTotal,changePricingTotal]=useState(0);

	useEffect(()=>{
		const currentItems=currentSelectedItems;
		currentItems.push(item);
		let currentPricingTotal=pricingTotal;
		currentPricingTotal+=item.price;

		changePricingTotal(currentPricingTotal);
		changeCurrentSelectedItems([...currentItems]);
	},[item]);

	const removeSelectedItem=(itemData)=>{
		const {offer,price}=itemData;
		const items=currentSelectedItems;
		for(var i=0;i<items.length;i++){
			if(items[i].offer==offer){
				items.splice(i,1);
				break;
			}
		}
		if(items.length==0){
			unMountItemCheckoutModal();
		}else{	
			changeCurrentSelectedItems([...items]);
		}
		changePricingTotal(pricingTotal-price);
	}


	const selectedItem=(item)=>{
		return(
			<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}>
				<div style={{display:"flex",flexDirection:"column"}}>
					<p>
						<b>{item.offer}</b>
					</p>
					<p>{item.price}</p>
				</div>
				<HighlightOffIcon 
					onClick={()=>removeSelectedItem(item)}
					style={{color:"#E30A0A",fontSize:"24"}}
				/>
			</div>
		)
	}

	return(
		<React.Fragment>	
			{displayMinifiedToken==true?
				<MinifiedTokenDisplay onClick={()=>changeDisplayMinifiedToken(false)}>
					<div style={{borderRadius:"50%",backgroundColor:"#F00404",display:"flex",justifyContent:"center",padding:"10px",color:"white"}}>
						{currentSelectedItems.length}
					</div>
					<ArrowLeftIcon
						style={{fontSize:"40"}}
					/>
				</MinifiedTokenDisplay>:
				<Container>
					<ClearIcon 
						style={{cursor:"pointer",marginBottom:"5%"}}
						onClick={()=>changeDisplayMinifiedToken(true)}
					/>
					<p style={{fontSize:"24"}}>
						<b>Checkout items:</b>
					</p>
					<hr style={HorizontalLineCSS}/>
					{currentSelectedItems.map(data=>
						<>
							{selectedItem(data)}
							<hr/>
						</>
					)}
					<hr style={HorizontalLineCSS}/>
					<Checkout
						paymentValue={pricingTotal*100}
						tokenTier={"Bronze"}
						unMountItemCheckoutModal={unMountItemCheckoutModal}
						itemizedIds={currentSelectedItems}
					/>
				</Container>
			}
		</React.Fragment>
	)
}


export default ItemizedCheckout;