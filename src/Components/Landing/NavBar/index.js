import React,{useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import NavBar from "./NavBar.js";
import {LoginUI} from "./LoginImplementation.js";

const ChoicesContainer=styled.div`
	position:fixed;
	height:50%;
	background-color:white;
	z-index:12;
	top:20%;
	border-radius:5px;
	width:30%;
	left:35%;
	padding:40px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}
`;


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;


const NavBarIndex=({history,isMissionPage})=>{
	const [displayPageChoicesModal,changeMobileChoicesModal]=useState(false);
	const [displayLoginModal,changeDisplayLoginModal]=useState(false);

	const displayCommunityMissionOption=()=>{
		changeMobileChoicesModal(true);
	}
	const displayLoginModalHandle=()=>{
		changeDisplayLoginModal(true);
	}

	const closeLoginModal=()=>{
		changeDisplayLoginModal(false);
	}


	const MissionAndCommunityChoiceContainer=()=>{
		return <>
			{displayPageChoicesModal==true &&(
				<>
					<ChoicesContainer>
						<Link to={{pathname:"/"}} style={{cursor:"pointer"}}>
							<b>Our Mission</b>
						</Link>
						<hr/>
						<Link to={{pathname:"/sympociaNews"}} style={{cursor:"pointer"}}>	
							<b> Sympocia Community</b>
					    </Link>
					</ChoicesContainer>
					<ShadowContainer 
						onClick={()=>changeMobileChoicesModal(false)}
					/>
				</>
			)}
		</>
	}
	return(
		<React.Fragment>
			{MissionAndCommunityChoiceContainer()}
			<NavBar
				displayCommunityMissionOption={displayCommunityMissionOption}
				history={history}
				displayLoginModalHandle={displayLoginModalHandle}
				isMissionPage={isMissionPage}
			/>
			{displayLoginModal &&(
				<LoginUI
					history={history}
					closeModal={closeLoginModal}
				/>
			)} 
		</React.Fragment>
	)
}

export default NavBarIndex;