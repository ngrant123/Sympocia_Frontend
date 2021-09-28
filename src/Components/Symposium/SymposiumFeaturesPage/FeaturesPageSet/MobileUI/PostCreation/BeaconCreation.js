import React,{useState,useContext} from "react";
import {MobileUIContext} from "../MobileUIContext.js";
import styled from "styled-components";
import {BeaconPostCreation} from "../../../FeaturesPageSubset/SideBar/Beacons.js";


const BeaconCreation=({
	featuresPagePrimaryInformation,
	updatePrimaryPosts,
	currentSymposiumId,
	isDesktop,
	personalInformation,
	isGuestProfile})=>{

	const mobileUIContextInformation=useContext(MobileUIContext);
	const [selectedPostType,changeSelectedPostType]=useState();
	const [displayBeaconCreation,changeDisplayBeaconCreation]=useState(false);

	const triggerDisplayCreationModal=(selectedPostType)=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeSelectedPostType(selectedPostType);
			changeDisplayBeaconCreation(true);
		}
	}

	const closeFeaturesPageCreationModal=()=>{
		mobileUIContextInformation.unDoButtonClickedStatus();
		changeDisplayBeaconCreation(false);
	}
	return(
		<React.Fragment>	
			{displayBeaconCreation==true &&(
				<BeaconPostCreation
					featuresPagePrimaryInformation={featuresPagePrimaryInformation}
					updatePrimaryPosts={updatePrimaryPosts}
					closeFeaturesPageCreationModal={closeFeaturesPageCreationModal}
					selectedPostType={selectedPostType}
					currentSymposiumId={currentSymposiumId}
					personalInformation={personalInformation}
					isDesktop={isDesktop}
				/>
			)}		
			<li style={{listStyle:"none",cursor:"pointer"}}
				onClick={()=>triggerDisplayCreationModal("Images")}>
				Images
			</li>
			<hr/>

			<li style={{listStyle:"none",cursor:"pointer"}}
				onClick={()=>triggerDisplayCreationModal("Videos")}>
				Videos
			</li>
			<hr/>

			<li style={{listStyle:"none",cursor:"pointer"}}
				onClick={()=>triggerDisplayCreationModal("Regular")}>
				Regular
			</li>
			<hr/>
		</React.Fragment>
	)
}

export default BeaconCreation;