import React,{useState,useEffect} from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ItemizedCheckoutModal from "../PaymentSet/Modals-Portals/ItemizedCheckout.js";
import {retrieveItemizedOptions} from "../../../Actions/Requests/PaymentAxiosRequests/PaymentGetRequests.js";

const Container=styled.div`
	width:100%;
	height:100%;
	overflow-y:auto;
	display:flex;
	flex-direction:row;
	margin-top:2%;
	border-color:#D0D0D0;
	border-style:solid;
	border-width:1px;
	border-radius:5px;
	flex-wrap:wrap;
	padding:5%;

	@media screen and (max-width:1370px){
		#itemizedPaymentOption{
			width:250px !important;
		}
	}

	@media screen and (max-width:650px){
		background-color:white;
		#itemizedPaymentOption{
			width:95% !important;
		}
	}
`;

const ItemizedResultCSS={
	display:"flex",
	flexDirection:"row",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5%",
	padding:"2%",
	marginBottom:"5%",
	borderRadius:"5px",
	width:"300px",
	alignItems:"center",
	justifyContent:"space-between",
	cursor:"pointer"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const ItemizedCheckout=()=>{
	const [displayCheckoutModal,changeDisplayCheckoutModal]=useState(false);
	const [currentSelectedItem,changeCurrentSelectedItem]=useState();
	const [itemizedOptions,changeItemizedOptions]=useState([]);
	const [isPhoneUIEnabled,changePhoneUIStatus]=useState(false);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveItemizedOptions();
			if(confirmation=="Success"){
				const {message}=data;
				changeItemizedOptions([...message]);
			}else{	
				alert("Unfortunately there has been an error retrieving these items. Please try again");
			}
		}
		fetchData();
		triggerUIChange();
	},[]);

	const triggerUIChange=()=>{
		if(window.innerWidth<670){
			changePhoneUIStatus(true);
		}
	}



	const triggerAddItemToCheckout=(selectedItem)=>{
		changeCurrentSelectedItem(selectedItem);
		if(displayCheckoutModal==false){
			changeDisplayCheckoutModal(true);
		}
	}

	const unMountItemCheckoutModal=()=>{
		changeDisplayCheckoutModal(false);
	}


	return(
		<React.Fragment>
			{displayCheckoutModal==true &&(
				<ItemizedCheckoutModal
					item={currentSelectedItem}
					unMountItemCheckoutModal={unMountItemCheckoutModal}
					isPhoneUIEnabled={isPhoneUIEnabled}
				/>
			)}
			<Container>
				{itemizedOptions.map(data=>
					<div id="itemizedPaymentOption" style={ItemizedResultCSS} onClick={()=>triggerAddItemToCheckout(data)}>
						<div style={{display:"flex",flexDirection:"column"}}>
							<p>{data.offer}</p>
							<hr style={HorizontalLineCSS}/>
							<p style={{fontSize:"24px",color:"#C8B0F4"}}>
								<b>${data.price}</b>
							</p>
						</div>
						<AddCircleOutlineIcon
							style={{marginLeft:"2%",fontSize:"24"}}
						/>
					</div>
				)}
			</Container>
		</React.Fragment>
	)
}


export default ItemizedCheckout;
