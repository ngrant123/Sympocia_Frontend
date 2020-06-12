import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

const AddNewsPortal=(props)=>{
	
	return createPortal(
			<React.Fragment>
				<ShadowContainer
					onClick={props.closeModal}
				/>
			</React.Fragment>
		,document.getElementById("companyProfileContainer"));
}

export default AddNewsPortal;