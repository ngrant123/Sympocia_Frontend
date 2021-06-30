import React from "react";
import styled from "styled-components";
import{PersonalInformation} from "./PostContainerCSS.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ChatIcon from '@material-ui/icons/Chat';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {Link} from "react-router-dom";
import {PostDisplayConsumer} from "../../../Symposium/ExtendedSymposium/Posts/PostDisplay/PostDisplayContext.js";

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"5%",
	marginBottom:"2%",
	cursor:"pointer"
}



const userActionsContainer=({
						actions,
						isOwnProfile,
						displayPostModal,
						profileType,
						symposiumPostInformation,
						postData})=>{
	console.log(symposiumPostInformation);
	console.log(postData);
	const{
		createOrRemoveStampEffect,
		displayComments,
		changeDisplayPollingOptions,
		handleRemoveImagePost,
		changeDisplayPost,
		promoteModal
	}=actions;

	const crownLogo=()=>{
		return(
			<svg id="oligarchButtonIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crown" 
			  width="30" height="30" viewBox="0 0 24 24" stroke-width="2.5" stroke="#6e6e6e" fill="none" 
		 	  stroke-linecap="round" stroke-linejoin="round">
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
			</svg>
		)
	}

	return(
		<React.Fragment>
			<LoyaltyIcon
				style={{fontSize:50,...ShadowButtonCSS}}
				onClick={()=>createOrRemoveStampEffect({isAccessTokenUpdated:false})}
			/>
			<ChatIcon
				style={{fontSize:50,...ShadowButtonCSS}}
				onClick={()=>displayComments()}
			/>

			<AssessmentIcon
				style={{fontSize:50,...ShadowButtonCSS}}
				onClick={()=>changeDisplayPollingOptions(true)}
			/>

			{(symposiumPostInformation!=null && symposiumPostInformation.isOligarch==true)==true &&(
				<div style={ShadowButtonCSS} 
					onClick={()=>symposiumPostInformation.displayOligarchPostSettings(
															postData._id,
															postData.symposiumUploadCategory)}>
					{crownLogo()}
				</div>
			)}

				
			{(profileType=="personalProfile" && isOwnProfile==true) &&(
				<>
					<BorderColorIcon
						style={{fontSize:50,...ShadowButtonCSS}}
						onClick={()=>changeDisplayPost(!displayPostModal)}
					/>

					<svg id="removePostOption" onClick={()=>handleRemoveImagePost()}
						 xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
						width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
						stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <line x1="4" y1="7" x2="20" y2="7" />
					  <line x1="10" y1="11" x2="10" y2="17" />
					  <line x1="14" y1="11" x2="14" y2="17" />
					  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
					  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
					</svg>
					<svg id="promotePostOption" onClick={()=>promoteModal()}
						xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" 
						  width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e"
						  fill="none" stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
						  <path stroke="none" d="M0 0h24v24H0z"/>
						  <circle cx="12" cy="9" r="6" />
						  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
						  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
					</svg>
				</>
			)}
		</React.Fragment>
	)
}


const OwnerInformationAndPostOptions=(props)=>{
	const {
		displayMobileUI,
		postData,
		userActions,
		isOwnProfile,
		displayPostModal,
		profileType,
		triggerDisplayPostDescriptionAndCaption,
		targetDom,
		postType
	}=props;
	return(
		<PostDisplayConsumer>
			{symposiumPostInformation=>{
				return(
					<PersonalInformation>
						{targetDom!="personalContainer" &&(
							<React.Fragment>
								<img id="ownerProfilePicture" 
									src={postData.owner.profilePicture==null?
									NoProfilePicture:postData.owner.profilePicture}
								 style={{borderRadius:"50%",width:"7%",height:"50px"}}
								/>
								<Link style={{marginLeft:"4%",fontSize:"20px",width:"80%",height:"30px",maxWidth:"80%",maxHeight:"30px",overflow:"hidden",textDecoration:"none",color:"black",marginRight:"10%"}}
									to={{pathname:`/profile/${postData.owner._id}`}}
								>	
									<p>
										<b>{postData.owner.firstName}</b>
									</p>
								</Link>
							</React.Fragment>
						)}
						{displayMobileUI==false ?
							<React.Fragment>
								{userActionsContainer({
									...userActions,
									symposiumPostInformation,
									postData
								})}
							</React.Fragment>:
							<KeyboardArrowDownIcon
								id="keyBoardDownLI"
								onClick={()=>triggerDisplayPostDescriptionAndCaption(true)}
								style={{borderRadius:"50%",fontSize:"40",boxShadow:"1px 1px 5px #dbdddf"}}
							/>
						}
					</PersonalInformation>
				)
			}}
		</PostDisplayConsumer>
	)
}

export{
	OwnerInformationAndPostOptions,
	userActionsContainer
};





