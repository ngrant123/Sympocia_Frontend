import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';


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
  width:"70%"
}

const UserSettingOptionsCSS={
	width:"70%",
	display:"flex",
	flexDirection:"column",
	borderRadius:"5px",
	marginBottom:"5%"
}


const ProfileSettings=({closeModal,userProfilePicture})=>{
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<CloseIcon
					onClick={()=>closeModal()}
					style={{color:"A4A4A4",marginLeft:"90%",cursor:"pointer"}}
				/>
				<img src={userProfilePicture} style={{width:"20%",height:"20%",borderRadius:"50%"}}/>
				<hr style={HorizontalLineCSS}/>
				<div style={UserSettingOptionsCSS}>
					<p style={{color:"A4A4A4"}}>
						<b>Account Settings</b>
					</p>
					<div style={{padding:"40px",borderRadius:"5px",boxShadow:"2px 2px 10px #A4A4A4"}}>
						<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}>
							<p>
								<b>Update email addresses</b>
							</p>
							<ArrowDropDownCircleOutlinedIcon
								style={{marginLeft:"20%"}}
							/>
						</div>

						<div style={{display:"flex",flexDirection:"row",cursor:"pointer",marginTop:"5%"}}>
							<p>
								<b>Update first name</b>
							</p>
							<ArrowDropDownCircleOutlinedIcon
								style={{marginLeft:"38%"}}
							/>
						</div>

						<div style={{display:"flex",flexDirection:"row",cursor:"pointer",marginTop:"5%"}}>
							<p>
								<b>Update last name</b>
							</p>
							<ArrowDropDownCircleOutlinedIcon
								style={{marginLeft:"39%"}}
							/>
						</div>
					</div>
				</div>

				<div style={Button}>
					Delete Profile
				</div>
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}


export default ProfileSettings;