import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import AlterFirstNamePrompt from "./AlterProfileDetails/AlterFirstNamePrompt.js";
import AlterEmailPrompt from "./AlterProfileDetails/AlterEmailPrompt.js";
import AlterLastNamePrompt from "./AlterProfileDetails/AlterLastNamePrompt.js";
import DeleteProfilePrompt from "./DeleteProfilePrompt.js";
import MiscellaneousOptionsDisplay from "./AlterProfileDetails/MiscellaneousOptions.js";
import {
	disableScrolling,
	enableScrolling
} from "../../../../../../Actions/Tasks/DisableScrolling.js";

import {Link} from "react-router-dom";


const Container=styled.div`
	position:fixed;
	width:35%;
	height:60%;
	background-color:white;
	z-index:45;
	top:20%;
	border-radius:5px;
	left:35%;
	display:flex;
	flex-direction:column;
	padding:30px;
	overflow-y:scroll;

	@media screen and (min-width:2500px){
		height:50%;
		#settingsProfilePicture{
			height:150px !important;
		}
		#accountSettingsTitle{
			font-size:24px !important;
		}
		#profilePreferencesOption{
			font-size:30px !important;
		}
	}

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		overflow:scroll !important;
		#settingsProfilePicture{
			height:150px !important;
			width:170px !important;
		}
	}

	@media screen and (max-width:650px){
		width:100% !important;
		left:0% !important;
		height:100%;
		top:0%;

		#settingsContainer{
			width:110% !important;
		}
		#options{
			box-shadow:none !important;
		}
		#accountSettingsTitle{
			margin-left:15% !important;
		}
		#settingsProfilePicture{
			width:55px !important;
			height:50px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#settingsProfilePicture{
			width:10% !important;
			height:20% !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	#settingsProfilePicture{
			width:10% !important;
			height:35% !important;
		}
		#accountSettingsTitle{
			margin-left:7% !important;
		}
   	}

`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	margin:"0.5em auto",
	zIndex:"30",
	width:"100%",
	marginTop:"5%",
	marginBottom:"5%"
}

const Button={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"#C8B0F4",
  borderRadius:"5px",
  padding:"10px",
  color:"white",
  cursor:"pointer",
  width:"70%",
  cursor:"pointer",
  marginTop:"5%",
  marginBottom:"20px"
}

const UserSettingOptionsCSS={
	width:"70%",
	display:"flex",
	flexDirection:"column",
	justifyContent:"center",
	borderRadius:"5px",
	marginBottom:"5%",
	paddingBottom:"10px"
}

const SpecificSettingOptionCSS={
	display:"flex",
	flexDirection:"row",
	justifyContent:"space-between",
	cursor:"pointer",
	marginTop:"5%"
}


const ProfileSettings=({closeModal,userProfilePicture})=>{

	const [displayFirstNameModalPrompt,changeDisplayFirstNamePrompt]=useState(false);
	const [displayLastNameModalPrompt,changeDisplayLastNamePrompt]=useState(false);
	const [displayEmailModalPrompt,changeEmailPrompt]=useState(false);
	const [displayDeleteProfilePrompt,changeDisplayDeleteProfilePrompt]=useState(false);
	const [displayInitialSettingsModal,changeInitialSettingsModal]=useState(true);
	const [displayMiscellaneousModal,changeMiscellaneousDisplayModal]=useState(false);

	useEffect(()=>{
		disableScrolling("personalContainer");
	},[]);

	const displayInitilaModal=()=>{
		changeDisplayFirstNamePrompt(false);
		changeDisplayLastNamePrompt(false);
		changeDisplayDeleteProfilePrompt(false);
		changeInitialSettingsModal(true);
		changeEmailPrompt(false);
		changeMiscellaneousDisplayModal(false);
	}

	const hanldeDisplayFirstNameModal=()=>{
		changeDisplayFirstNamePrompt(true);
		changeInitialSettingsModal(false);
	}

	const hanldeDisplayLastNameModal=()=>{
		changeDisplayLastNamePrompt(true);
		changeInitialSettingsModal(false);
	}


	const handleDisplayEmailModal=()=>{
		changeEmailPrompt(true);
		changeInitialSettingsModal(false);
	}

	const handleDisplayDeleteModal=()=>{
		changeDisplayDeleteProfilePrompt(true);
		changeInitialSettingsModal(false);
	}

	const handleDisplayMiscellaneousModal=()=>{
		changeMiscellaneousDisplayModal(true);
		changeInitialSettingsModal(false);
	}

	const closePortal=()=>{
		enableScrolling("personalContainer");
		closeModal();
	}

	const closeModalIcon=()=>{
		return(
			<div id="closeModalButton" 
				onClick={()=>closePortal()} style={{marginTop:"0%",cursor:"pointer"}}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
				 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
				 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}


	const initialDisplayModal=()=>{
		return(
			<React.Fragment>
				{displayInitialSettingsModal==true &&(
					<React.Fragment>
						{closeModalIcon()}
						<div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
							<img id="settingsProfilePicture" src={userProfilePicture==null?
										NoProfilePicture:userProfilePicture
									} 
									style={{width:"80px",height:"80px",borderRadius:"50%"}}
							/>
							<hr style={HorizontalLineCSS}/>
							<div id="settingsContainer" style={UserSettingOptionsCSS}>
								<p id="accountSettingsTitle" style={{color:"A4A4A4"}}>
									<b>Account Settings</b>
								</p>
								<div id="options" style={{borderRadius:"5px",marginTop:"5%"}}>
									<div id="profilePreferencesOption" onClick={()=>handleDisplayEmailModal()}
										style={SpecificSettingOptionCSS}>
										<p>
											<b>Update email addresses</b>
										</p>
										<ArrowDropDownCircleOutlinedIcon
											style={{marginLeft:"20%"}}
										/>
									</div>
									<hr/>

									<div id="profilePreferencesOption" onClick={()=>hanldeDisplayFirstNameModal()}
										style={SpecificSettingOptionCSS}>
										<p>
											<b>Update first name</b>
										</p>
										<ArrowDropDownCircleOutlinedIcon
											style={{marginLeft:"38%"}}
										/>
									</div>
									<hr/>

									<div id="profilePreferencesOption" style={SpecificSettingOptionCSS} 
										onClick={()=>hanldeDisplayLastNameModal()}>
										<p>
											<b>Update last name</b>
										</p>
										<ArrowDropDownCircleOutlinedIcon
											style={{marginLeft:"39%"}}
										/>
									</div>
									<hr/>

									<Link id="profilePreferencesOption"
										to={{pathname:'/emailreset'}} 
										style={{...SpecificSettingOptionCSS,textDecoration:"none",color:"black"}}>
										<p>
											<b>Update password</b>
										</p>
										<ArrowDropDownCircleOutlinedIcon
											style={{marginLeft:"39%"}}
										/>
									</Link>
									<hr/>

									<div id="profilePreferencesOption" style={SpecificSettingOptionCSS} 
										onClick={()=>handleDisplayMiscellaneousModal()}>
										<p>
											<b>Miscellaneous</b>
										</p>
										<ArrowDropDownCircleOutlinedIcon
											style={{marginLeft:"39%"}}
										/>
									</div>
								</div>
								{/*
									<div style={Button} onClick={()=>handleDisplayDeleteModal()}>
										Delete Profile
									</div>
								*/}
							</div>
						</div>

					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	const firstNameAlterPrompt=()=>{
		return(
			<React.Fragment>
				{displayFirstNameModalPrompt==true &&(
					<AlterFirstNamePrompt
						closeModal={displayInitilaModal}
					/>
				)}
			</React.Fragment>
		)
	}

	const lastNamePrompt=()=>{
		return(
			<React.Fragment>
				{displayLastNameModalPrompt==true &&(
					<AlterLastNamePrompt
						closeModal={displayInitilaModal}
					/>
				)}
			</React.Fragment>
		)
	}

	const emailPrompt=()=>{
		return(
			<React.Fragment>
				{displayEmailModalPrompt==true &&(
					<AlterEmailPrompt
						closeModal={displayInitilaModal}
					/>
				)}
			</React.Fragment>
		)
	}

	const deleteModal=()=>{
		return(
			<React.Fragment>
				{displayDeleteProfilePrompt==true &&(
					<DeleteProfilePrompt
						closeModal={displayInitilaModal}
					/>
				)}
			</React.Fragment>
		)
	}

	const miscellaneousOptionsModal=()=>{
		return(
			<React.Fragment>
				{displayMiscellaneousModal==true &&(
					<MiscellaneousOptionsDisplay
						closeModal={displayInitilaModal}
					/>
				)}
			</React.Fragment>
		)
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closePortal()}
			/>
			<Container>
				{initialDisplayModal()}
				{firstNameAlterPrompt()}
				{lastNamePrompt()}
				{emailPrompt()}
				{deleteModal()}
				{miscellaneousOptionsModal()}
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}


export default ProfileSettings;