import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NonMiscellaneousRelatedFeatures from "./NonMiscellaneousRelatedFeatures.js";
import GamingFeatures from "./GamingFeatures.js";
import MiscellaneousFeatures from "./MiscellaneousFeatures.js";
import MusicFeatures from "./MusicFeatures.js";
import NewsAndTravelFeatures from "./NewsAndTravelFeatures.js";
import STEMRelatedFeatures from "./STEMRelatedFeatures.js";
import SYMPOSIUM_FEATURES from "../../../../../Constants/featureSymposiumConstants.js";
import {FeatureProvider} from "./FeatureContext.js";

const Container=styled.div`
	z-index:10;
	@media screen and (max-width:1370px){
    	height:90% !important;
    	display:flex;
    	justify-content:center;
    	#symposiumFeatureContainerUL{
    		top:20% !important;
    		height:90% !important;
    		padding-top:40px !important;
    		width:70% !important;
    	}
    }
`;

const ChatOption={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

/*
	Right now because of time constraints Im not doing anything special
	for Gaming,Religion, and General but will do something in the future

	So the structure of this is that it decides which category 
	the symposium is in then sends it the featuresIndex where it decides which 
	feature the user clicked on  and then sends it to the features section.
	Waste of time, should just refactor the features into a portal and then just delete
	featuresindex


	Don't know if this is even necessary the way its implemented below. Could probably 
	be refactored in the near distant future
*/

const SpecificFeatureSymposium=({symposium,symposiumId,questions,isGuestProfile})=>{
	const [artMap,changeArtMap]=useState(new Map);
	const [stemMap,changeStemMap]=useState(new Map);
	const [musicMap,changeMusicMap]=useState(new Map);
	const [newstravelMap,changeNewsTravelMap]=useState(new Map);
	const [gamingMap,changeGamingMap]=useState(new Map);
	const [isLoadingFeatureSymposiums,changeLoadStatus]=useState(true);




	useEffect(()=>{
		const {
			ART_SYMPOSIUMS,
			STEM_SYMPOSIUM,
			GAMING_SYMPOSIUM,
			MUSIC_SYMPOSIUM,
			NEWS_TRAVEL_SYMPOSIUM
		}=SYMPOSIUM_FEATURES;

		for(var i=0;i<ART_SYMPOSIUMS.length;i++){
			artMap.set(ART_SYMPOSIUMS[i],1);
		}

		for(var i=0;i<STEM_SYMPOSIUM.length;i++){
			stemMap.set(STEM_SYMPOSIUM[i],1);
		}

		for(var i=0;i<MUSIC_SYMPOSIUM.length;i++){
			musicMap.set(MUSIC_SYMPOSIUM[i],1);
		}

		for(var i=0;i<NEWS_TRAVEL_SYMPOSIUM.length;i++){
			newstravelMap.set(NEWS_TRAVEL_SYMPOSIUM[i],1);
		}

		for(var i=0;i<GAMING_SYMPOSIUM.length;i++){
			gamingMap.set(GAMING_SYMPOSIUM[i],1);
		}
		changeLoadStatus(false);
	},[]);

	const featureDecider=()=>{
		if(artMap.has(symposium) || stemMap.has(symposium)|| musicMap.has(symposium)
		 || newstravelMap.has(symposium) || gamingMap.has(symposium)){

			return <NonMiscellaneousRelatedFeatures
						symposium={symposium}
						questions={questions}
					/>;

		}else{
			return <MiscellaneousFeatures
						symposium={symposium}
						questions={questions}
					/>
		}
	}
	return(
		<FeatureProvider
			value={{
				symposiumId:symposiumId,
				isGuestProfile
			}}
		>
			{isLoadingFeatureSymposiums==false?
				<Container>
					<ul id="symposiumFeatureContainerUL" style={{padding:"0px",position:"fixed"}}>
						{/*
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={ChatOption}>
									Show chat 
								</li>
							</a>
							<hr/>
						*/}

						<li style={{listStyle:"none"}}>
							{featureDecider()}
						</li>
					</ul>
				</Container>:
				null
			}
		</FeatureProvider>
	)
}

export default SpecificFeatureSymposium;