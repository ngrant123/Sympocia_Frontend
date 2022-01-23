import React,{useContext} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {FeaturesContext} from "../../FeaturesPageContext.js";
// top:35%;

const Container=styled.div`
	position:fixed;
	${({featuresType})=>
		featuresType=="University"?
		`left:50%;`:
		`left:30%;`
	}

	top:25%;
	height:30%;
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
		top:20%;
    }
	@media screen and (min-width:2500px){
		top:17%;
    }


	@media screen and (max-width:1370px){
		width:40%;
		top:30%;
		left:10%;
	}

	@media screen and (max-width:650px){
		height:40%;
		overflow-y:scroll;
		left:5%;
		width:90%;
		top:50%;
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

const SymposiumFeaturesOptionPortal=({closeModal,featuresType})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const {currentSymposiumName}=featuresPageConsumer;
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container featuresType={featuresType}>
				<li style={{listStyle:"none",cursor:"pointer"}}
					onClick={()=>featuresPageConsumer.triggerFeaturesTypeChange("Beacons")}>
					Beacons
				</li>
				<hr/>

				<li style={{listStyle:"none",cursor:"pointer"}}
					onClick={()=>featuresPageConsumer.triggerFeaturesTypeChange("Community")}>
					Symposium Community
				</li>

				<hr/>
				{(currentSymposiumName=="General"||
					currentSymposiumName=="Religion"||
					currentSymposiumName=="Gaming"||
					currentSymposiumName=="Philosophy")==false &&(
					<React.Fragment>
						<li style={{listStyle:"none",cursor:"pointer"}}
							onClick={()=>featuresPageConsumer.triggerFeaturesTypeChange("University")}>
							Symposium University
						</li>
						<hr/>
					</React.Fragment>
				)}
			</Container>
		</React.Fragment>
	,document.getElementById("symposiumFeaturesPage"))
}


export default SymposiumFeaturesOptionPortal;


