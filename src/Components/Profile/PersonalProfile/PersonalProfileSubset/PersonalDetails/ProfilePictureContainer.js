import React from "react";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import CameraIcon from '@material-ui/icons/Camera';

import {
	ProfilePictureContainer,
	ChangePictureButton
} from "./ProfilePictureContainerCSS.js";


const ProfilePicture=({
	state,
	displayCreatePostOptionTrigger,
	handleChangeProfilePicture,
	diplayMobileChampionTrigger})=>{

	const displayMobileUserInformationnModal=()=>{
		return <ul style={{maxHeight:"20px",position:"relative",padding:"0px",top:"80%",marginTop:"2%"}}>
					{/*
						<MediumMobileScreenUserInformation>
							<p style={{maxWidth:"90%",maxHeight:"20px",overflow:"hidden"}}>
								<b>{this.state.userProfile.firstName}</b>
							</p>
							{this.state.isGuestProfile==false && (
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
									style={ShadowButtonCSS}
									onClick={()=>this.setState({displayMobileUIProfileOptions:true})}
									>
								   		<span class="caret"></span>
								</button>
							)}
						</MediumMobileScreenUserInformation>

					*/}
			   </ul>
	}

	return(
		<ProfilePictureContainer>
			{(state.displayDesktopUI==false && state.isOwnProfile==true)? 
				<>
					<div id="postAndChampionMobileCreationContainer"
						style={{position:"relative",display:"flex",flexDirection:"column"}}>
						{state.isGuestProfile==false && (
							<>{displayCreatePostOptionTrigger()}</>
						)}
						{diplayMobileChampionTrigger()}
					</div>
					<div id="profilePicture" style={{position:"absolute"}}>
						<img 
							onClick={()=>handleChangeProfilePicture()}
							src={state.profilePicture==null?
									NoProfilePicture:
									state.profilePicture
								} style={{width:"100%",height:"100%",borderRadius:"50%"}}
						/>
					</div>
				</>:
				<>
					{diplayMobileChampionTrigger()}
					<img id="profilePicture" 
						src={state.profilePicture==null?
								NoProfilePicture:
								state.profilePicture
							} style={{position:"absolute",width:"250px",height:"250px",borderRadius:"50%"}}
					/>
					
					{state.isLoading==true &&(
						<p style={{position:"relative",marginTop:"110%"}}>Loading...</p>
					)}
				</>
			}
			{state.displayPhoneUI==false &&(
				<>
					{state.displayIpadUI==true?
						<>{displayMobileUserInformationnModal()}</>:
						<>
							{state.isOwnProfile==true &&(
								<ChangePictureButton style={{cursor:"pointer"}} onClick={()=>handleChangeProfilePicture()}>
									<CameraIcon
										style={{fontSize:"24"}}
									/>
								</ChangePictureButton>
							)}
						</>
					}
				</>
			)}
		</ProfilePictureContainer>
	)
}

export default ProfilePicture;