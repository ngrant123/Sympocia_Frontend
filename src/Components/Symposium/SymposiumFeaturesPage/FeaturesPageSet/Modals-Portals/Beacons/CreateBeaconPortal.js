import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import Creation from "../../../../../Symposium/ExtendedSymposium/Modals/Beacons/Creation.js";

const BackgroundModalContainer= styled.div`
	position:fixed;
	width:100%;
	height:140%;
	background: rgba(0, 0, 0, 0.5);
	z-index:40;
	top:0%;
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:70%;
	z-index:41;
	left:30%;
	top:15%;
	padding:10px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;
	overflow-x:auto;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}

	@media screen and (max-width:650px){
		width:100% !important;
		left:0% !important;;
		top:0% !important;;
		height:100% !important;

		#mobileBeaconCloseIcon{
			display:block !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:20%;
		width:65%;
		left:15%;
	}
`;

const CreateBeaconPortal=(props)=>{
	const {closeCreationModal}=props;
	console.log(props);
	return createPortal(
		<React.Fragment>
			<BackgroundModalContainer
				onClick={()=>closeCreationModal()}
			/>
			<Container>
				<Creation
					{...props}
				/>
			</Container>
		</React.Fragment>
	,document.getElementById("symposiumFeaturesPage"))
};

export default CreateBeaconPortal;

