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
	box-shadow: 10px 10px 20px 	#9395a0;
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
	return <ul id="extendedChampionModalUL">
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
			</ul>
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

						<li style={{listStyle:"none"}}>
							{ExtendedChampionModal(props.championData)}
						</li>
					</ul>
				</SponsorExtendedModal>:
				<SponsorSimpliedModal>
					<ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"10%",width:"80px"}}>
							<img src={props.championData.imgUrl} style={{position:"relative",top:"-30px",width:"80px",height:"80%",borderRadius:"50%"}}/>
						</li>

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
					</ul>
				</SponsorSimpliedModal>
			}

		</React.Fragment>

	)
}

export{
	ExtendedChampionModal,
	SponsorDisplayModal
}
