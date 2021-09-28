import React,{useState} from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Icon, InlineIcon } from '@iconify/react';
import tiktokIcon from '@iconify/icons-simple-icons/tiktok';
import DeletePostPortal from "../DeletePostConfirmationPortal.js";
import {Link} from "react-router-dom";

const SponsorExtendedModal=styled.div`
	position:fixed;
	width:30%;
	height:35%;
	background-color:white;
	top:0px;
	overflow-y:scroll;
	z-index:40;
	border-radius:5px;
	box-shadow: 10px 10px 20px 	#9395a0;
	left:65%;
	top:60%;

	@media screen and (min-width:2500px){
		#championDescription{
			font-size:30px !important;
		}
		#championName{
			font-size:30px !important;
		}
		#championImageLI{
			width:150px !important;
			height:150px !important;
		}
	}

	@media screen and (max-width:1370px){
		left:5% !important;
		top:20%;
		width:90% !important;
		height:70%;
		padding:40px;
		overflow:scroll;

		#extendChampionDescriptionUL{
			top:10px !important;
		}
	}

	@media screen and (max-width:650px){
		top:15%;
		padding:20px;
		height:70%; 
	}

	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		height:50%;
    }
	 @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	 	top:15%;
	 	height:70%;
    }
`;

const SponsorSimplifiedModal=styled.div`
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


	@media screen and (min-width:2500px){
		height:5%;
		#championName{
			font-size:24px !important;
		}
  	}
`;

const ExtendedChampionModalContainer=styled.div`
	display:flex;
	flex-direction:column;
`;

const ExtendedChampionInformation=styled.div`
	display:flex;
	flex-direction:column;
	margin-bottom:5%;


	@media screen and (max-width:1370px){
		#championImageLI{
			width:100px !important;
			height:100px !important;
		}
	}

	@media screen and (max-width:650px){
		#championImageLI{
			width:50px !important;
			height:50px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#championImageLI{
			width:50px !important;
			height:50px !important;
		}
    }
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


const ChampionImageCSS={
	position:"relative",
	width:"70px",
	height:"70px",
	borderRadius:"50%"
}


const ChampionNameCSS={
	position:"relative",
	overflow:"hidden",
	listStyle:"none",
	display:"inline-block",
	width:"50%",
	fontSize:"20px",
	maxWidth:"80%",
	maxHeight:"50px"
}


const ExtendedChampionModal=(championData)=>{
	return  <ExtendedChampionModalContainer id="extendedChampionModalUL">
				<ExtendedChampionInformation>
					<ProfileLink
						propsRendered={
							<img id="championImageLI" src={championData.imgUrl} 
								style={{width:"70px",height:"70px",borderRadius:"50%"}}
							/>
						}
						championData={championData}
					/>

					<p id="championName"
						style={{fontSize:"20px",maxWidth:"60%",overflow:"hidden",color:"#5298F8",marginTop:"2%"}}>
						<b>{championData.name}</b>
					</p>
				</ExtendedChampionInformation>
				<p id="championDescription">{championData.description}</p>
			</ExtendedChampionModalContainer>
}

const ProfileLink=({propsRendered,championData})=>{
	if(championData.sympociaProfileLinkedId==null){
		return(
			<>{propsRendered}</>
		)
	}else{
		return(
			<Link to={{pathname:`/profile/${championData.sympociaProfileLinkedId}`}}>
				{propsRendered}
			</Link>
		)
	}
}

const SponsorDisplayModal=(props)=>{
	const [displayExtendedSponsorModal,changeExtendedSponsorModal]=useState(props.isMobile==true?true:false);
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
					targetDom={"personalContainer"}
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
						{props.isMobile==false &&(
							<li style={{listStyle:"none",marginBottom:"5%",marginLeft:"85%"}}>
								<KeyboardArrowDownIcon
									style={{borderStyle:"solid",
											borderRadius:"50%",
											color:"#BDBDBD",
											fontSize:30}}
									onClick={()=>changeExtendedSponsorModal(false)}
								/>
							</li>
						)}

						<li style={{listStyle:"none",marginTop:"10%"}}>
							{ExtendedChampionModal(props.championData)}
						</li>
					</ul>
				</SponsorExtendedModal>:
				<SponsorSimplifiedModal>
					<li style={{listStyle:"none",display:"inline-block",marginRight:"10%",width:"80px"}}>
						<ProfileLink
							propsRendered={
								<img src={props.championData.imgUrl} 
									style={ChampionImageCSS}
								/>
							}
							championData={props.championData}
						/>
					</li>
					<li id="championName" style={ChampionNameCSS}>
						<b>{props.championData.name}</b> 
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
				</SponsorSimplifiedModal>
			}

		</React.Fragment>

	)
}

export{
	ExtendedChampionModal,
	SponsorDisplayModal
}
