import React,{Component} from "react";
import styled from "styled-components";

const BackgroundContainer=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	z-index:8;
`;

const AdditionalInformationContainer=styled.div`
	position:absolute;
	width:50%;
	height:80%;
	background-color:white;
	z-index:8;
	left:25%;
	top:10%;
	border-radius:5px;
	box-shadow: 1px 1px 10px #d5d5d5;

`;


const AdditionalInformation=(props)=>{
	return(
		<React.Fragment>
			<BackgroundContainer onClick={()=>props.hideDisplayPage()}>
			</BackgroundContainer>

			<AdditionalInformationContainer>

			</AdditionalInformationContainer>



		</React.Fragment>
	)
}

export default AdditionalInformation;