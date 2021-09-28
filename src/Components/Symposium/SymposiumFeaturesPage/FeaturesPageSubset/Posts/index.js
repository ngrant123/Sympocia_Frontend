import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {BeaconPosts} from "./Beacons.js";
import SymposiumUnivesity from "./SymposiumUniversity.js";
import SymposiumCommunity from "./SymposiumCommunity.js";
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SymposiumFeaturesOptionPortal from "../../FeaturesPageSet/Modals-Portals/DropDowns/SymposiumFeaturesOptionsPortal.js";


const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"5%",
	cursor:"pointer",
	padding:"5px"
}

const PostsHeader=({featuresType})=>{
	const [displaySymposiumFeaturesOptions,changeDisplaySymposiumFeatures]=useState(false);
	let headerText;
	switch(featuresType){
		case "University":{
			headerText="Symposium University Questions";
			break;
		}

		case "Beacons":{
			headerText="Beacons";
			break;
		}

		case "Community":{
			headerText="Symposium Community Questions";
			break;
		}
	}

	const closeModalFeaturesOptionsPortal=()=>{
		changeDisplaySymposiumFeatures(false);
	}

	return(
		<React.Fragment>
			{displaySymposiumFeaturesOptions==true &&(
				<SymposiumFeaturesOptionPortal
					closeModal={closeModalFeaturesOptionsPortal}
					featuresType={featuresType}
				/>
			)}
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<p id="headerText" style={{fontSize:"18px"}}>
					<b>{headerText}</b>
				</p>
				<div style={{display:"flex",flexDirection:"row"}}>				
					<div style={DropDownCSS} onClick={()=>changeDisplaySymposiumFeatures(true)}>
						<KeyboardArrowDownIcon
							style={{fontSize:"20"}}
						/>	
					</div>

					{/*
						Later down the road will implement most popular and recent
						
						<div style={DropDownCSS}>
							<SettingsIcon
								style={{fontSize:"20"}}
							/>	
						</div>
					*/}
				</div>
			</div>
		</React.Fragment>
	)
}



const FeaturePosts=({featuresType,isLoading})=>{
	const component=()=>{
		switch(featuresType){
			case "Beacons":{
				return <BeaconPosts
							featuresType={featuresType}
							isLoading={isLoading}
						/>
			}
			case "University":{
				return <SymposiumUnivesity
							featuresType={featuresType}
							isLoading={isLoading}
							firstAccessStatus={true}
						/>
			}

			case "Community":{
				return  <SymposiumCommunity
							featuresType={featuresType}
							isLoading={isLoading}
						/>
			}
		}
	}

	return(
		<div style={{width:"100%"}}>
			{component()}
		</div>
	)
}


export{
	FeaturePosts,
	PostsHeader
};
