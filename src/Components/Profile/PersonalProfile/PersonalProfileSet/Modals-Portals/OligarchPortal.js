import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {
	retrieveSymposiumsProfileIsAnOligarch
} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:40;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
	padding:20px;
	@media screen and (max-width:1370px){
		width:60% !important;
		left:20% !important;
		height:60%;
    }

    @media screen and (max-width:700px){
		width:90% !important;
		left:5% !important;
		height:60%;
    }

     @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	height:60%;
    }
`;

const SymposiumsCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"3%"
}

const OligarchPortalDisplay=({closeOligarchModal,ownerFirstName,ownerId})=>{
	const [symposiums,changeSymposiums]=useState([]);
	const [isLoading,changeIsLoading]=useState(false);
	useEffect(()=>{
		const fetchData=async()=>{
			changeIsLoading(true);
			const {confirmation,data}=await retrieveSymposiumsProfileIsAnOligarch(ownerId);
			if(confirmation=="Success"){
				const {message}=data;
				changeSymposiums(message);
			}else{
				alert('Unfortunately there was an error recieving the symposiums the profile is an oligarch in. Please try again');
			}
			changeIsLoading(false);
		}
		fetchData();
	},[]);

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeOligarchModal()}
			/>
			<Container>
				<p style={{fontSize:"24px"}}>
					<b>Oligarched Symposium(s)</b>
				</p>
				<p>Here is a list of the symposiums <b>{ownerFirstName}</b> oligarchs over</p>
				<hr/>
				{isLoading==true?
					<p>Please wait...</p>:
					<div>
						{symposiums.map(data=>
							<div style={SymposiumsCSS}>
								{data.industry}
							</div>
						)}
					</div>
				}
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}

export default OligarchPortalDisplay;