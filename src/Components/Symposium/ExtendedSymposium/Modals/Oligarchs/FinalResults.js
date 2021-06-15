import React,{useState} from "react";
import styled from "styled-components";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {BackgroundModalContainer} from "../../indexCSS.js";


const Container=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:70%;
	z-index:41;
	left:30%;
	top:15%;
	padding:20px;
	display:flex;
	flex-direction:column;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:20%;
		width:65%;
		left:15%;
	}
`;

const OligarchsContainer=styled.div`
	display:flex;
	flex-direction:row;
	height:100px;
	margin-bottom:5%;
	padding:20px;
	align-items:center;
	justify-content:space-between;
`;

const HorizontalLineCSS={
	marginLeft:"0",
	position:"relative",
	marginRight:"0"
}

const FinalResults=({closeModal,selectedSymposiumTitle})=>{
	const [newOligarchs,changeOligarchs]=useState([
		{
			firstName:"Nathan",
			score:26
		},
		{},
		{},
		{}]);

	const oligarchs=(oligarchData)=>{
		return(
			<OligarchsContainer>
				<div style={{display:"flex",flexDirection:"row"}}>
					<EmojiEventsIcon
						style={{fontSize:"40",color:"#F8D913",marginRight:"10%"}}
					/>
					<img src={oligarchData.profilePicture==null?
								NoProfilePicture:oligarchData.profilePicture}
						style={{marginLeft:"5%",width:"50px",height:"50px",borderRadius:"5px"}}
					/>
					<p style={{marginLeft:"5%",fontSize:"24px"}}>
						<b>{oligarchData.firstName}</b>
					</p>
				</div>
				<p style={{color:"#76D24C",fontSize:"18px"}}>
					<b>+ {oligarchData.score}</b>
				</p>

			</OligarchsContainer>
		)
	}
	return(
		<React.Fragment>
			<Container>
				<p style={{fontSize:"24px"}}>
					<b>{selectedSymposiumTitle} Oligarchs</b>
				</p>
				<hr style={HorizontalLineCSS}/>
				<div style={{display:"flex",flexDirection:"column"}}>
					{newOligarchs.map(data=>
						<>
							{oligarchs(data)}
							<hr style={HorizontalLineCSS}/>
						</>
					)}
				</div>
			</Container>
			<BackgroundModalContainer onClick={()=>closeModal()}/>
		</React.Fragment>
	)
}

export default FinalResults;