import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import AddEmployees from "../CompanyProfileSubset/CompanyDetails/CompanyEmployees/AddEmployees.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:15;
	top:0px;
`;


const Container=styled.div`
	position:fixed;
	width:70%;
	height:60%;
	background-color:red;
	top:0px;
	z-index:15;
`;


const AddEmployeesPortal=(props)=>{
	debugger;
	console.log(props);
	console.log("Add employee portal");
	return createPortal(
			<React.Fragment>
				<ShadowContainer
					onClick={props.closeModal}
				/>
				<Container>
					<AddEmployees
						closeModal={props.closeModal}
					/>
				</Container>
			</React.Fragment>
		,document.getElementById("companyProfileContainer"));
}

export default AddEmployeesPortal;