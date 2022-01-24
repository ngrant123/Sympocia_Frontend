import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {retrieveBadgeInformation} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import EditBadge from "./EditBadge/index.js";
import BadgeCreation from "./BadgeCreation.js";
import {
	disableScrolling,
	enableScrolling
} from "../../../../../../../Actions/Tasks/DisableScrolling.js";


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
		top:20%;
		height:50%;
    }
    @media screen and (max-width:550px){
		width:100% !important;
		left:0% !important;
		top:0% !important;
		height:100% !important;

		#closeModalButton{
			display:block !important;
		}
	}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:100% !important;
		left:0% !important;
		top:0% !important;
		height:100% !important;
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
	const [isLoading,changeIsLoadingStatus]=useState(true);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveBadgeInformation(profileId);
			if(confirmation=="Success"){
				const {message}=data;
				if(message!=null){
					changeBadgeInformation(message);
					changeDisplayEditModal(true);
				}
			}else{
				alert('Unfortunately there has been an error retrieving this badge information. Please try again');
			}
			changeIsLoadingStatus(false);
			disableScrolling("personalContainer");
		}	
		fetchData();
	},[]);

	const closePortal=()=>{
		enableScrolling("personalContainer");
		closeModal();
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>closePortal()}/>
			<Container>
				<div style={{marginBottom:"2%",cursor:"pointer"}} onClick={()=>closePortal()}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
						 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
						 stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <circle cx="12" cy="12" r="9" />
						  <path d="M10 10l4 4m0 -4l-4 4" />
					</svg>
				</div>
				{isLoading==true ?
					<p>Loading...</p>:
					<React.Fragment>
						{displayEditModal==true?
							<EditBadge
								badgeInformation={badgeInformation}
								profileId={profileId}
								closeParentModal={closePortal}
							/>:
							<BadgeCreation
								profileId={profileId}
								closeParentModal={closePortal}
							/>
						}
					</React.Fragment>
				}
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}



export default BadgePortal;