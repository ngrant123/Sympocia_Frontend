import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {retrieveBadgeInformation} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import EditBadge from "./EditBadge.js";
import BadgeCreation from "./BadgeCreation.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:45;
	top:0px;
	left:0%;
`;

const Container=styled.div`
	position:fixed;
	width:40%;
	height:75%;
	background-color:white;
	z-index:50;
	top:10%;
	border-radius:5px;
	left:30%;
	overflow-y:auto;
	padding:2%;

	@media screen and (min-width:2500px){
		height:50%;
		width:50%;
		left:25%;
	}


	@media screen and (max-width:1370px){
		width:60% !important;
		left:20% !important;
    }
    @media screen and (max-width:650px){
		width:100% !important;
		left:0% !important;
		top:0% !important;
		height:100% !important;

		#closeModalButton{
			display:block !important;
		}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:65%;
    }
`;


const VerticalLineCSS={
	borderStyle:"solid",
	position:"relative",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"400%",
 	marginRight:"5%",
 	marginLeft:"5%"
}


const BadgePortal=({closeModal,profileId})=>{
	const [displayEditModal,changeDisplayEditModal]=useState(false);
	const [badgeInformation,changeBadgeInformation]=useState();

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveBadgeInformation(profileId);
			if(confirmation=="Success"){
				const {message}=data;
				if(message!=null){
					changeBadgeInformation(message);
				}
			}else{
				alert('Unfortunately there has been an error retrieving this badge information. Please try again');
			}
		}	
		fetchData();
	},[]);

	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>closeModal()}/>
			<Container>
				{displayEditModal==true?
					<EditBadge
						badgeInformation={badgeInformation}
						profileId={profileId}
					/>:
					<BadgeCreation
						profileId={profileId}
					/>
				}
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}



export default BadgePortal;