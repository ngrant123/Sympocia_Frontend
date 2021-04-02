import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";

import {
	ProfilePictureContainer,
	ChangePictureButton
} from "../../PersonalProfileSet/PersonalProfileContainerCSS.js";


const ProfilePicture=({state,displayCreatePostOptionTrigger,handleChangeProfilePicture,displayIpadUserInformationModal})=>{
	return(
		<ProfilePictureContainer>
			{(state.displayDesktopUI==false && state.isOwnProfile==true)? 
				<>
					{state.isGuestProfile==false && (
						<>{displayCreatePostOptionTrigger()}</>
					)}
					<img id="profilePicture" 
						onClick={()=>handleChangeProfilePicture()}
						src={state.profilePicture==null?
								NoProfilePicture:
								state.profilePicture
							} style={{position:"absolute",width:"100%",height:"100%",borderRadius:"50%"}}
					/>
				</>:
				<>
					<img id="profilePicture" 
						src={state.profilePicture==null?
								NoProfilePicture:
								state.profilePicture
							} style={{position:"absolute",width:"70%",height:"80%",borderRadius:"50%"}}
					/>
					
					{state.isLoading==true &&(
						<p style={{position:"relative",marginTop:"110%"}}>Loading...</p>
					)}
				</>
			}
			{state.displayPhoneUI==false &&(
				<>
					{state.displayIpadUI==true?
						<>{displayIpadUserInformationModal()}</>:
						<>
							{state.isOwnProfile==true?
								<React.Fragment>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<ChangePictureButton onClick={()=>handleChangeProfilePicture()}>
											Change Profile Picture
										</ChangePictureButton>
									</a>
								</React.Fragment>:
								<React.Fragment></React.Fragment>
							}
						</>
					}
				</>
			)}
		</ProfilePictureContainer>
	)
}

export default ProfilePicture;