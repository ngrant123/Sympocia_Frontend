import React,{useState,useMemo} from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Icon, InlineIcon } from '@iconify/react';
import tiktokIcon from '@iconify/icons-simple-icons/tiktok';
import DeletePostPortal from "../DeletePostConfirmationPortal.js";
import {Link} from "react-router-dom";
import {generateAirPlane} from "../../../../../../Actions/Requests/AirPlaneRequests/AirPlanePostRequest.js"

const SponsorExtendedModal=styled.div`
	position:fixed;
	width:30%;
	height:35%;
	background-color:white;
	top:0px;
	overflow-y:auto;
	z-index:40;
	border-radius:5px;
	box-shadow: 10px 10px 20px 	#9395a0;
	left:65%;
	top:60%;
	display:flex;
	flex-direction:column;
	padding:15px;

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
	padding:15px;
	justify-content:space-between;
	align-items:center;


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
	flex-direction:row;
	margin-bottom:5%;
	align-items:center;

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
	cursor:"pointer",
	marginRight:"5%"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	marginTop:"0%",
	marginBottom:"0%",
	width:"100%"
}


const ChampionImageCSS={
	position:"relative",
	width:"50px",
	height:"50px",
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
	const extendedChampionModal=()=>{
		return(
			<ExtendedChampionModalContainer id="extendedChampionModalUL">
				<ExtendedChampionInformation>
					<ProfileLink
						propsRendered={
							<img id="championImageLI" src={championData.imgUrl} 
								style={{width:"50px",height:"50px",borderRadius:"50%"}}
							/>
						}
						championData={championData}
					/>

					<p id="championName"
						style={{fontSize:"20px",maxWidth:"60%",overflow:"hidden",color:"#5298F8",marginTop:"2%",marginLeft:"5%"}}>
						<b>{championData.name}</b>
					</p>
				</ExtendedChampionInformation>
				<hr style={HorizontalLineCSS}/>
				<p id="championDescription">{championData.description}</p>
			</ExtendedChampionModalContainer>
		)
	}

	return(
		<>{extendedChampionModal()}</>
	)
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

	const championData=useMemo(()=>{
		return(
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
						{props.isOwnProfile==true &&(
							<div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
								<div style={{display:"flex",flexDirection:"row"}}>
									<div onClick={()=>changeDisplayDeletePortal(true)} style={DeleteChampionCSS}>
										Delete
									</div>
									<div onClick={()=>changeDisplayDeletePortal(true)} style={DeleteChampionCSS}>
										Edit
									</div>
								</div>
								{props.isMobile==false &&(
									<li style={{listStyle:"none",marginBottom:"5%"}}>
										<KeyboardArrowDownIcon
											style={{borderStyle:"solid",
													borderRadius:"50%",
													color:"#BDBDBD",
													fontSize:30,
													cursor:"pointer"}}
											onClick={()=>changeExtendedSponsorModal(false)}
										/>
									</li>
								)}
							</div>
						)}
						<div style={{listStyle:"none",marginTop:"5%"}}>
							{ExtendedChampionModal(props.championData)}
						</div>
					</SponsorExtendedModal>:
					<SponsorSimplifiedModal id="championModal" 
						onClick={()=>generateAirPlane({
							pageType:"Profile",
				            pageTypeParamsId:props.pageTypeParamsId,
				            targetDivAccessed:"championModal",
				            profileIdAccessingDiv:props.profileIdAccessingDiv
						})}>
						<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
							<ProfileLink
								propsRendered={
									<img src={props.championData.imgUrl} 
										style={ChampionImageCSS}
									/>
								}
								championData={props.championData}
							/>
							<p style={{marginLeft:"5%",fontSize:"18px"}}>
								<b>{props.championData.name}</b>
							</p>
						</div>
						<KeyboardArrowUpIcon
							style={{borderStyle:"solid",
									borderRadius:"50%",
									color:"#BDBDBD",
									fontSize:30,
									cursor:"pointer"}}
							onClick={()=>changeExtendedSponsorModal(true)}
						/>
					</SponsorSimplifiedModal>
				}

			</React.Fragment>
		)
	},[
		props.championData,
		displayExtendedSponsorModal,
		displayDeletePortal
	]);

	return (
		<>{championData}</>

	)
}

export{
	ExtendedChampionModal,
	SponsorDisplayModal
}
