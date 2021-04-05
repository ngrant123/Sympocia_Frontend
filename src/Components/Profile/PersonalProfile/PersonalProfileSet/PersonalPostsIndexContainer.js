import React,{useMemo} from "react";
import styled from "styled-components";

import PersonalPostsIndex from "../PersonalProfileSubset/PersonalPosts/index.js";

const PersonalPostsIndexContainer=(props)=>{
	const posts=useMemo(()=>{
		return <PersonalPostsIndex
					displayShadowOverlay={props.displayShadow}
					disappearShadow={props.disappearShadow}
					displayCreationPortal={props.displayCreationPortal}
					closeModal={props.closeModal}
					personalInformation={{
						_id:props.personalInformation._id,
						isGuestProfile:props.personalInformation.isGuestProfile,
						isOwnProfile:props.personalInformation.isOwnProfile,
						firstName:props.personalInformation.firstName,
						socialMediaUrls:{
							instagramUrl:"",
							tikTokUrl:""
						},
						profilePicture:props.personalInformation.profilePicture,
						crownedPost:props.personalInformation.crownedPost,
						imagePost:props.personalInformation.imagePost,
						isGuestVisitorProfile:props.personalInformation.isGuestVisitorProfile,
						recruits:props.personalInformation.recruits
					}}
					uiStatus={{
					    displayPhoneUI:props.uiStatus.displayPhoneUI,
						displayIpadUI:props.uiStatus.displayIpadUI,
						displayDesktopUI:props.uiStatus.displayDesktopUI,
					}}
					visitorId={props.personalInformation.isOwnProfile==true?null:props.visitorId}
					displayConfetti={props.displayConfetti}
					triggerPostReload={props.triggerPostReload}
					isPostReloading={props.isPostReloading}
					unTriggerReload={props.unTriggerReload}
					finalPostRecieved={props.finalPostRecieved}
					isGuestProfile={props.isGuestProfile}
					isGuestVisitorProfile={props.isGuestVisitorProfile}
					updateEndOfPostsDBIndicator={props.updateEndOfPostsDBIndicator}
					handleVideoPostModal={props.handleVideoPostModal}
				/>
	},[props.displayCreationPortal,props.uiStatus])

	return(
		<React.Fragment>
			{posts}
		</React.Fragment>
	)
}

export default PersonalPostsIndexContainer;