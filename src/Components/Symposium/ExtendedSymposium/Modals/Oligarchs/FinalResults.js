import React,{useState,useEffect} from "react";
import styled from "styled-components";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {BackgroundModalContainer} from "../../indexCSS.js";
import {getOligarchPerSymposium} from "../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import{
	addProfileToViewedOligarchNotification
} from "../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js"
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Container=styled.div`
	background-color:white;
	border-radius:5px;
	z-index:41;
	padding:20px;
	display:flex;
	flex-direction:column;
	overflow-y:scroll;
`;

const OligarchsContainer=styled(Link)`
	display:flex;
	flex-direction:row;
	height:100px;
	margin-bottom:5%;
	padding:20px;

	@media screen and (max-width:650px){
		padding:0px;
		#oligarchName{
			font-size:18px !important;
		}
	}
`;

const HorizontalLineCSS={
	marginLeft:"0",
	position:"relative",
	marginRight:"0"
}

const FinalResults=({closeModal,selectedSymposiumTitle,symposiumId})=>{
	const currentUserId=useSelector(state=>state.personalInformation.id);

	const addProfileIdToOligarchFinalResultViewed=async()=>{
		await addProfileToViewedOligarchNotification(symposiumId,currentUserId);
		closeModal();
	}

	const [newOligarchs,changeOligarchs]=useState([]);
	useEffect(()=>{
		const fetchOligarchsResults=async()=>{
			const {confirmation,data}=await getOligarchPerSymposium(symposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				if(message.length==0){
					closeModal();
				}else{
					changeOligarchs(message);
				}
			}else{
				alert('Unfortunately there has been an error retrieving oligarchs for this symposiums. Please try again');
			}
		}
		fetchOligarchsResults();
	},[]);
	const oligarchs=(oligarchData)=>{
		return(
			<OligarchsContainer to={{pathname:`/profile/${oligarchData.profileId}`}}>
				<img id="oligarchsProfilePicture" src={oligarchData.profilePicture==null?
							NoProfilePicture:oligarchData.profilePicture}
					style={{marginLeft:"5%",width:"50px",height:"50px",borderRadius:"50%"}}
				/>
				<div style={{display:"flex",flexDirection:"column"}}>
					<p id="oligarchName" style={{marginLeft:"20%",fontSize:"24px"}}>
						<b>{oligarchData.firstName}</b>
					</p>
					{/*
						<p style={{marginLeft:"5%",color:"#76D24C",fontSize:"18px"}}>
							<b>+ {oligarchData.score}</b>
						</p>
					*/}
				</div>
			</OligarchsContainer>
		)
	}
	return(
		<Container>
			<div>
				<div style={{display:"flex",flexDirection:"row"}}>
					<p style={{fontSize:"24px"}}>
						<b>{selectedSymposiumTitle} Oligarchs</b>
					</p>
					<EmojiEventsIcon
						style={{fontSize:"40",color:"#F8D913",marginLeft:"5%"}}
					/>
				</div>
				<hr style={HorizontalLineCSS}/>
			</div>
			<div style={{display:"flex",flexDirection:"column"}}>
				{newOligarchs.map(data=>
					<div>
						{oligarchs(data)}
						<hr style={HorizontalLineCSS}/>
					</div>
				)}
			</div>
		</Container>
	)
}

export default FinalResults;