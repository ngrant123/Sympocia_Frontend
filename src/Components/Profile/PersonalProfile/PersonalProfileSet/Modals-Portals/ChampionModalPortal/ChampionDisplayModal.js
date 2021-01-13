import React,{useState} from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Icon, InlineIcon } from '@iconify/react';
import tiktokIcon from '@iconify/icons-simple-icons/tiktok';
import DeletePostPortal from "../DeletePostConfirmationPortal.js";

const SponsorExtendedModal=styled.div`
	position:fixed;
	width:30%;
	height:35%;
	background-color:white;
	top:0px;
	overflow-y:scroll;
	z-index:25;
	border-radius:5px;
	box-shadow: 10px 10px 20px 	#9395a0;
	left:65%;
	top:60%;
`;

const SponsorSimpliedModal=styled.div`
	position:fixed;
	width:30%;
	height:10%;
	background-color:white;
	border-radius:5px;
	overflow:hidden;
	display:flex;
	flex-direction:row;
	box-shadow: 10px 10px 20px 	#9395a0;
	padding:10px;
`;

const ExtendedChampionModalContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const ExtendedChampionInformation=styled.div`
	display:flex;
	flex-direction:column;
`;

const ExtendedProfilePicture=styled.div`
	position:relative;
	width:120%;
	height:35%;
	border-radius:50%;
	background-color:red;
	border-style:solid;
	border-color:#5298F8;
	border-width:5px;
`;

const SimpliedProfilePicture=styled.div`
	position:relative;
	width:80px;
	height:80%;
	border-radius:50%;
	background-color:red;
	border-style:solid;
	border-color:#5298F8;
	border-width:5px;
`;

const DeleteChampionCSS={
	listStyle:"none",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	marginBottom:"2%",
	cursor:"pointer"
}



const ExtendedChampionModal=(championData)=>{
	return <ExtendedChampionModalContainer id="extendedChampionModalUL">
				<ExtendedChampionInformation>
					<img id="championImageLI" src={championData.imgUrl} 
					style={{width:"70%",height:"40%",borderRadius:"50%"}}/>

					<li style={{fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",color:"#5298F8"}}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
					exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
					dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
					anim id est laborum.
					</li>
				</ExtendedChampionInformation>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
					exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
					dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
					anim id est laborum.
				</p>
				{/*
				<li style={{width:"40%",listStyle:"none",display:"inline-block",marginRight:"10%"}}>
					<ul style={{padding:"0px"}}>

						<li style={{listStyle:"none",fontSize:"30px",color:"#5298F8"}}>
						</li>
					</ul>
				</li>
				<li id="extendChampionDescriptionUL" style={{height:"40%",position:"relative",top:"-60px",listStyle:"none",display:"inline-block",width:"50%"}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
					exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
					dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
					anim id est laborum.
				</li>
					<li style={{width:"40%",listStyle:"none",display:"inline-block",marginRight:"10%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",marginBottom:"3%",width:"40%"}}>
									<img id="championImageLI" src={championData.imgUrl} style={{width:"170%",height:"35%",borderRadius:"50%"}}/>
							</li>

							<li style={{listStyle:"none",fontSize:"30px",color:"#5298F8"}}>
								<b>{championData.name}</b>
							</li>
						</ul>
					</li>
					<li id="extendChampionDescriptionUL" style={{height:"40%",overflowY:"auto",position:"relative",top:"-60px",listStyle:"none",display:"inline-block",width:"50%"}}>
						{championData.description}
					</li>
				*/}
			</ExtendedChampionModalContainer>
}

const SponsorDisplayModal=(props)=>{
	console.log(props);
	const [displayExtendedSponsorModal,changeExtendedSponsorModal]=useState(false);
	const [displayDeletePortal,changeDisplayDeletePortal]=useState(false);

	const closeDeletePortal=()=>{
		changeDisplayDeletePortal(false);
	}
	return (
		<React.Fragment>
			{displayDeletePortal &&(
				<DeletePostPortal
					postType="Champion"
					closeModal={closeDeletePortal}
				/>
			)}
			{displayExtendedSponsorModal==true?
				<SponsorExtendedModal>
					<ul style={{padding:"15px"}}>
						{props.isOwnProfile==true &&(
							<li onClick={()=>changeDisplayDeletePortal(true)} style={DeleteChampionCSS}>
								Delete Champion
							</li>

						)}
						<li style={{listStyle:"none",marginBottom:"5%",marginLeft:"85%"}}>
							<KeyboardArrowDownIcon
								style={{borderStyle:"solid",
										borderRadius:"50%",
										color:"#BDBDBD",
										fontSize:30}}
								onClick={()=>changeExtendedSponsorModal(false)}
							/>
						</li>

						<li style={{listStyle:"none",marginTop:"10%"}}>
							{ExtendedChampionModal(props.championData)}
						</li>
					</ul>
				</SponsorExtendedModal>:
				<SponsorSimpliedModal>
					<li style={{listStyle:"none",display:"inline-block",marginRight:"10%",width:"80px"}}>
						<img src={props.championData.imgUrl} style={{position:"relative",width:"80px",height:"100%",borderRadius:"50%"}}/>
					</li>
					<li style={{position:"relative",top:"-5px",overflow:"hidden",listStyle:"none",display:"inline-block",width:"50%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",fontSize:"20px",maxWidth:"80%",maxHeight:"50px",overflow:"hidden"}}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
							dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
							anim id est laborum.
							</li>
						</ul>
					</li>
					<li style={{listStyle:"none",display:"inline-block"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<KeyboardArrowUpIcon
								style={{borderStyle:"solid",
										borderRadius:"50%",
										color:"#BDBDBD",
										fontSize:30}}
								onClick={()=>changeExtendedSponsorModal(true)}
							/>
						</a>
					</li>

						{/*
							<li style={{position:"relative",top:"-5px",overflow:"hidden",listStyle:"none",display:"inline-block",width:"50%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",fontSize:"20px"}}>
										<b>{props.championData.name}</b> 
									</li>
									<li style={{listStyle:"none",width:"70%",height:"45%",color:"#BDBDBD"}}>
										{props.championData.description}
									</li>
								</ul>
							</li>
						*/}
				</SponsorSimpliedModal>
			}

		</React.Fragment>

	)
}

export{
	ExtendedChampionModal,
	SponsorDisplayModal
}
