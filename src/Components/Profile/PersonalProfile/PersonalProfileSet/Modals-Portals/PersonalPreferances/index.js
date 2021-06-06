import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import AlterFirstNamePrompt from "./AlterProfileDetails/AlterFirstNamePrompt.js";
import AlterEmailPrompt from "./AlterProfileDetails/AlterEmailPrompt.js";
import AlterLastNamePrompt from "./AlterProfileDetails/AlterLastNamePrompt.js";
import DeleteProfilePrompt from "./DeleteProfilePrompt.js";

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
	align-items:center;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		overflow:scroll !important;
	}

	@media screen and (max-width:650px){
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
			width:20% !important;
			height:13% !important;
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
	borderRadius:"5px",
	marginBottom:"5%",
	paddingBottom:"10px"
}

const SpecificSettingOptionCSS={
	display:"flex",
	flexDirection:"row",
	cursor:"pointer",
	marginTop:"5%"
}


const ProfileSettings=({closeModal,userProfilePicture})=>{

	const [displayFirstNameModalPrompt,changeDisplayFirstNamePrompt]=useState(false);
	const [displayLastNameModalPrompt,changeDisplayLastNamePrompt]=useState(false);
	const [displayEmailModalPrompt,changeEmailPrompt]=useState(false);
	const [displayDeleteProfilePrompt,changeDisplayDeleteProfilePrompt]=useState(false);
	const [displayInitialSettingsModal,changeInitialSettingsModal]=useState(true);

	const displayInitilaModal=()=>{
		changeDisplayFirstNamePrompt(false);
		changeDisplayLastNamePrompt(false);
		changeDisplayDeleteProfilePrompt(false);
		changeInitialSettingsModal(true);
		changeEmailPrompt(false);
	}

	const hanldeDisplayFirstNameModal=()=>{
		changeDisplayFirstNamePrompt(true);
		changeDisplayLastNamePrompt(false);
		changeDisplayDeleteProfilePrompt(false);
		changeInitialSettingsModal(false);
		changeEmailPrompt(false);
	}

	const hanldeDisplayLastNameModal=()=>{
		changeDisplayFirstNamePrompt(false);
		changeDisplayLastNamePrompt(true);
		changeDisplayDeleteProfilePrompt(false);
		changeInitialSettingsModal(false);
		changeEmailPrompt(false);
	}


	const handleDisplayEmailModal=()=>{
		changeDisplayFirstNamePrompt(false);
		changeDisplayLastNamePrompt(false);
		changeEmailPrompt(true);
		changeDisplayDeleteProfilePrompt(false);
		changeInitialSettingsModal(false);
	}

	const handleDisplayDeleteModal=()=>{
		changeDisplayFirstNamePrompt(false);
		changeDisplayLastNamePrompt(false);
		changeEmailPrompt(false);
		changeDisplayDeleteProfilePrompt(true);
		changeInitialSettingsModal(false);
	}


	const initialDisplayModal=()=>{
		return(
			<React.Fragment>
				{displayInitialSettingsModal==true &&(
					<React.Fragment>
						<CloseIcon
							onClick={()=>closeModal()}
							style={{color:"A4A4A4",marginLeft:"90%",cursor:"pointer"}}
						/>
						<img id="settingsProfilePicture" src={userProfilePicture==null?
									NoProfilePicture:userProfilePicture
								} 
								style={{width:"20%",height:"20%",borderRadius:"50%"}}
						/>
						<hr style={HorizontalLineCSS}/>
						<div id="settingsContainer" style={UserSettingOptionsCSS}>
							<p id="accountSettingsTitle" style={{color:"A4A4A4"}}>
								<b>Account Settings</b>
							</p>
							<div id="options" style={{padding:"40px",borderRadius:"5px",boxShadow:"2px 2px 10px #A4A4A4"}}>
								<div onClick={()=>handleDisplayEmailModal()}
									style={{display:"flex",flexDirection:"row",cursor:"pointer"}}>
									<p>
										<b>Update email addresses</b>
									</p>
									<ArrowDropDownCircleOutlinedIcon
										style={{marginLeft:"20%"}}
									/>
								</div>
								<hr/>

								<div onClick={()=>hanldeDisplayFirstNameModal()}
									style={SpecificSettingOptionCSS}>
									<p>
										<b>Update first name</b>
									</p>
									<ArrowDropDownCircleOutlinedIcon
										style={{marginLeft:"38%"}}
									/>
								</div>
								<hr/>

								<div style={SpecificSettingOptionCSS} onClick={()=>hanldeDisplayLastNameModal()}>
									<p>
										<b>Update last name</b>
									</p>
									<ArrowDropDownCircleOutlinedIcon
										style={{marginLeft:"39%"}}
									/>
								</div>
								<hr/>

								<Link to={{pathname:'/emailreset'}} style={{...SpecificSettingOptionCSS,textDecoration:"none",color:"black"}}>
									<p>
										<b>Update password</b>
									</p>
									<ArrowDropDownCircleOutlinedIcon
										style={{marginLeft:"39%"}}
									/>
								</Link>
								
							</div>
							{/*
								<div style={Button} onClick={()=>handleDisplayDeleteModal()}>
									Delete Profile
								</div>
							*/}
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

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{initialDisplayModal()}
				{firstNameAlterPrompt()}
				{lastNamePrompt()}
				{emailPrompt()}
				{deleteModal()}
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}


export default ProfileSettings;