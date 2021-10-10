import React,{useState,useContext} from "react";
import {SymposiumContext} from "../SymposiumContext.js";
import styled from "styled-components";
import {createPortal} from "react-dom";
import PortalHOC from "./PortalHOC.js";
import {Link} from "react-router-dom";

const Container=styled.div`
	position:fixed;
	left:60%;
	top:25%;
	width:20%;
	height:60%;
	overflow-y:auto;
	background-color:white;
	z-index:30;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#9D9D9D;
	box-shadow: 1px 1px 5px #C1C1C1;

	@media screen and (max-width:1370px){
		width:40%;
		left:40%;
		top:17%;
	}

	@media screen and (max-width:800px){
		top:25%;
	}

	@media screen and (max-width:650px){
		height:60%;
		overflow-y:scroll;
		left:5%;
		width:50%;
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

const SymposiumAndChatInformationCSS={
	color:"#5298F8",
	borderRadius:"5px",
	padding:"10px",
	marginRight:"2px",
	cursor:"pointer",
	height:"20%",
	width:"100%"
}


const SymposiumOptionsPortal=({
		closeModal,
		symposiumInformation,
		changeDisplayHighLightQuesition,
		selectedSymposiumTitle,
		changeDisplaySpecficSymposiumFeatures
	})=>{
	const symposiumConsumer=useContext(SymposiumContext);
	const [component,changeComponent]=useState();
	const [displayPortalHOC,changeDisplayPortalHOC]=useState(false);
    const isUserFollowingSymposium=(followingIndicator)=>{
    	return(
    		<React.Fragment>
    			{followingIndicator==false?
			 		<p>Follow {selectedSymposiumTitle} Symposium</p>:
			 		<p>Unfollow Symposium</p>
			 	}
    		</React.Fragment>
    	)
    }

    const featureDisplay=(displayChat,symposiumFeatureType)=>{
    	let targetComponent;
    	if(displayChat==true){

    	}else{
    		targetComponent=symposiumConsumer.specificSymposiumFeaturesComponent(symposiumFeatureType,true)
    	}
    	changeComponent(targetComponent);
    	changeDisplayPortalHOC(true);
    }

    const closePortalModal=()=>{
    	changeDisplayPortalHOC(false);
    }

	return createPortal(
		<React.Fragment>
			<Container>
				{displayPortalHOC==true &&(
					<PortalHOC
						component={component}
						closeModal={closePortalModal}
					/>
				)}
				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>symposiumInformation.handleFollowSymposium()}>
					{isUserFollowingSymposium(symposiumInformation.isUserFollowingSymposium())}
				</div>

				<hr/>
				<div style={SymposiumAndChatInformationCSS}>
					<Link style={{textDecoration:"none"}} to={{pathname:`/symposiumFeatures/${symposiumInformation.symposiumId}`}}>
						<p>Symposium Features</p>
					</Link>
				</div>

				<hr/>
				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>symposiumInformation.triggerDisplayOligarchsModal()}>
					Oligarchs
				</div>
				<hr/>

				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>featureDisplay(false,"Community")}>
					Community Posts
				</div>

				<hr/>
				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>featureDisplay(false,"Beacon")}>
					Beacons
				</div>

				<hr/>
				{/*
					{
						selectedSymposiumTitle=="General"||
						selectedSymposiumTitle=="Religion"||
						selectedSymposiumTitle=="Gaming"||
						selectedSymposiumTitle=="Philosophy"?
						<div style={SymposiumAndChatInformationCSS} 
							onClick={()=>featureDisplay(true,"Chat")}>
							<p>Chat </p>
						</div>:
						<div style={SymposiumAndChatInformationCSS} 
							onClick={()=>featureDisplay(false,"University")}>
							<p> Symposium University </p>
						</div>
					}	
				*/}

				{
					(selectedSymposiumTitle=="General"||
					selectedSymposiumTitle=="Religion"||
					selectedSymposiumTitle=="Gaming"||
					selectedSymposiumTitle=="Philosophy")==false &&(
						<React.Fragment>
							<div style={SymposiumAndChatInformationCSS} 
								onClick={()=>featureDisplay(false,"University")}>
								<p> Symposium University </p>
							</div>
							<hr/>
						</React.Fragment>
					)
				}
				
				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>symposiumInformation.displayPopularVideos()}>
					Popular videos
				</div>

				<hr/>

				<div style={SymposiumAndChatInformationCSS} 
					onClick={()=>symposiumInformation.handleSeeAllPeopleActiveModal()}>
					Active people
				</div>

				<hr/>
			</Container>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
		</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"))
}


export default SymposiumOptionsPortal;