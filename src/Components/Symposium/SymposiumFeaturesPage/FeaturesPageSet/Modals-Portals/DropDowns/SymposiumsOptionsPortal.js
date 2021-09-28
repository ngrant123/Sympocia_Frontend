import React,{useContext} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import PERSONAL_INDUSTRIES from "../../../../../../Constants/personalIndustryConstants.js";
import {FeaturesContext} from "../../FeaturesPageContext.js";
import {getSymposiumId} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";


const Container=styled.div`
	position:fixed;
	left:10%;
	top:25%;
	height:60%;
	width:20%;
	background-color:white;
	z-index:30;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#9D9D9D;
	padding:5px;
	box-shadow: 1px 1px 5px #C1C1C1;
	overflow-y:auto;

	@media screen and (min-width:1920px){
		top:15%;
    }

	@media screen and (max-width:1370px){
		width:60%;
		top:15%;
		left:35%;
		padding:20px;
	}

	@media screen and (max-width:650px){
		height:60%;
		overflow-y:scroll;
		left:5%;
		width:90%;
		top:25%;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:30%;
	}

	@media screen and (max-width:600px) and (max-height:350px) and (orientation: landscape) {
		top:25%;
	}
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0);
	z-index:29;
	top:0px;
`;


const SymposiumOptions=({closeModal})=>{
	const featuresPageConsumer=useContext(FeaturesContext);

	const triggerChangeSymposium=async(desiredSymposium)=>{
		const {confirmation,data}=await getSymposiumId(desiredSymposium);
		if(confirmation=="Success"){
			const {message}=data;
			featuresPageConsumer.triggerCurrentSymposiumChange(desiredSymposium,message);
			closeModal();
		}else{
			alert('Unfortunately there has been an error when retrieving this symposium feature page. Please try again');
		}
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{PERSONAL_INDUSTRIES.INDUSTRIES.map(data=>
					<React.Fragment>
		                <li style={{listStyle:"none",cursor:"pointer"}} 
		                	onClick={()=>triggerChangeSymposium(data.industry)}>  
		                    {data.industry}
		                </li>
		                <hr/>
					</React.Fragment>
				)}
			</Container>
		</React.Fragment>
	,document.getElementById("symposiumFeaturesPage"))
}

export default SymposiumOptions;