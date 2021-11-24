import React,{useEffect,useState} from "react";
import styled from "styled-components";
import BadgeInformation from  "./BadgeInformation.js";
import BadgeDeletion from "./BadgeDeletion.js";
import PostTypeChange from "./PostTypeChangeModal.js";

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const SwitchComponents=({currentActiveComponentName,children})=>{
	return children.filter(child=>child.props.activeName==currentActiveComponentName);
}

const EditBadge=({badgeInformation,profileId,closeParentModal})=>{
	const [currentActiveComponentName,changeCurrentActiveComponentName]=useState("information");

	const displayAppropriateComponentName=(appropriateName)=>{
		changeCurrentActiveComponentName(appropriateName);
	}

	return(
		<React.Fragment>
			<p style={{fontSize:"24px"}}>
				<b>Badge Settings</b>
			</p>
			<hr style={HorizontalLineCSS}/>
			<SwitchComponents currentActiveComponentName={currentActiveComponentName}>
				<BadgeInformation
					activeName={"information"}
					badgeInformation={badgeInformation}
					displayAppropriateComponentName={displayAppropriateComponentName}
					closeParentModal={closeParentModal}
					profileId={profileId}
				/>
				<BadgeDeletion
					activeName={"deletion"}
					displayAppropriateComponentName={displayAppropriateComponentName}
					closeParentModal={closeParentModal}
					badgeId={badgeInformation._id}
					profileId={profileId}
				/>
				<PostTypeChange
					activeName={"postTypeChange"}
					displayAppropriateComponentName={displayAppropriateComponentName}
					closeParentModal={closeParentModal}
					profileId={profileId}
					badgeId={badgeInformation._id}
				/>
			</SwitchComponents>
		</React.Fragment>
	)
}

export default EditBadge;