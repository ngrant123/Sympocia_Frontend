import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {BeaconSideBar} from "./Beacons.js";
import SymposiumUniversitySideBar from "./SymposiumUniversity.js";
import {SymposiumCommunity} from "./SymposiumCommunity.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SymposiumOptionsPortal from "../../FeaturesPageSet/Modals-Portals/DropDowns/SymposiumsOptionsPortal.js";


const Container=styled.div`
	position:fixed;
	width:25%;
	height:80%;
	display:flex;
	flex-direction:column;
	overflow-y:auto;
	overflow-x:visible;
	padding:15px;

	@media screen and (max-width:1370px){
		position:relative;
		width:100%;

		#sideBarComponentParentDiv{
			display:none !important;
		}
	}

	@media screen and (max-width:650px){
		margin-top:20% !important;
		width:120%;
	}
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}

const SideBar=({featuresType,symposiumName})=>{
	const [displaySymposiumOptionsDropDown,changeSymposiumOptionsDropDown]=useState(false);

	const closeOptionsPortal=()=>{
		changeSymposiumOptionsDropDown(false);
	}

	const sideBarComponent=()=>{
		let component;
		switch(featuresType){
			case 'Beacons':{
				component=<BeaconSideBar/>;
				break;
			}
			case 'University':{
				component=<SymposiumUniversitySideBar/>;
				break;
			}
			case 'Community':{
				component=<SymposiumCommunity/>;
				break;
			}
		}
		return component;
	}

	return(
		<Container>
			{displaySymposiumOptionsDropDown==true &&(
				<SymposiumOptionsPortal
					closeModal={closeOptionsPortal}
				/>
			)}
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
				<p style={{fontSize:"24px"}}>
					<b>{symposiumName}</b>
				</p>
				<div style={DropDownCSS} onClick={()=>changeSymposiumOptionsDropDown(true)}>
					<ExpandMoreIcon
						style={{fontSize:"24"}}
					/>
				</div>
			</div>
			<hr style={HorizontalLineCSS}/>
			<div id="sideBarComponentParentDiv">
				{sideBarComponent()}
			</div>
		</Container>
	)
}


export default SideBar;