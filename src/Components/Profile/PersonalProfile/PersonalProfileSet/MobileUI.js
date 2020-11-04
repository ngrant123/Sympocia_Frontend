import React,{useState} from "react";
import styled from "styled-components";
import {
		PersonalInformation,
		recruitButton
	} from "../PersonalProfileSubset/PersonalDetails/PersonalInformation.js";
import {useSelector} from "react-redux";
import {UserConsumer} from "../UserContext.js";
import {createPortal} from "react-dom";
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ChampionEditPortal from "./Modals-Portals/ChampionModalPortal/index.js";
import {ExtendedChampionModal} from "./Modals-Portals/ChampionModalPortal/ChampionDisplayModal.js";

const OriginalShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:24;
	top:0px;
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:25;
	top:0px;
`;
const PersonalInformationContainer=styled.div`
	position:fixed;
	background-color:white;
	width:60%;
	height:60%;
	border-radius:5px; 
	padding:20px;
	z-index:25;
	left:20%;
	top:20%;
	overflow-y:scroll;
`;
const EditNodeContainer=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:24;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow:auto;
	padding:20px;

	 @media screen and (max-width:1030px){
		width:40% !important;
		left:30% !important;
    }
`;


const RecruitButton=styled.div`
	position:relative;
	animation: glowing 1300ms infinite;
	position:relative;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;


	@keyframes glowing {
      0% { background-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { background-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { background-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

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


const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none"
}

const FriendsNodeEditButtton={
  listStyle:"none",
  display:"inline-block",
  borderColor:"#5298F8",
  borderStyle:"solid",
  borderWidth:"1px",
  color:"#5298F8",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  marginLeft:"5%"
}

const MobilePersonalInformation=({closeModal,displayConfetti,personalInformation,displaySocialMediaModal})=>{
	return <>
				<ShadowContainer
					onClick={()=>closeModal()}
				/>
				<PersonalInformationContainer>
					<PersonalInformation
						displayConfetti={displayConfetti}
						personalInformation={personalInformation}
						displaySocialMediaModal={displaySocialMediaModal}
					/>

				</PersonalInformationContainer>
		   </>
}

const MobileChampionData=(championData)=>{
	return (
		<SponsorExtendedModal>
			{ExtendedChampionModal(championData)}
		</SponsorExtendedModal>
	)
}

const MobileProfileOptionsIpad=({closeModal,displayPersonalInformation,displayChampionsModal,championData,isIphoneDisplay})=>{
	const [displayChampionModal,changeDisplayChampionModal]=useState(false);
	const [editChampionModal,changeEditChampionModal]=useState(false);
	const [displayChampion,changeDisplayChampion]=useState(false);

	const closeChampionEditModal=()=>{
		changeEditChampionModal(false);
	}

	return createPortal(
			<>
				{editChampionModal==true &&(
					<ChampionEditPortal
						closeModal={closeChampionEditModal}
					/>
				)}
				{displayChampion==true &&(
					<>{MobileChampionData()}</>
				)}
				<OriginalShadowContainer
					onClick={()=>closeModal()}
				/>
				<EditNodeContainer>
					{displayChampionModal==false?
						<>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
				                <li onClick={()=>displayPersonalInformation()} style={{listStyle:"none"}}>
				                    Personal Information
				                </li>
				            </a>
				            <hr/>
				            <a href="javascript:void(0);" style={{textDecoration:"none"}}>
				                <li onClick={()=>changeDisplayChampionModal(true)} style={{listStyle:"none"}}>
				                    Champion
				                </li>
				            </a>
				            <hr/>
				            {isIphoneDisplay!=null &&(
				            	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					                <li onClick={()=>changeDisplayChampionModal(true)} style={{listStyle:"none"}}>
					                    Friends Gauge
					                </li>
					            </a>
				            )}
			            </>
						:<>
			            	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
				                <li onClick={()=>changeEditChampionModal(true)} style={{listStyle:"none"}}>
				                    Edit Champion
				                </li>
				            </a>
				            <hr/>
				            <a href="javascript:void(0);" style={{textDecoration:"none"}}>
				                <li onClick={()=>changeDisplayChampion(true)}style={{listStyle:"none"}}>
				                    View Champion
				                </li>
				            </a>
			            </>
					}
				</EditNodeContainer>
			</>
		,document.getElementById("personalContainer"));
}

const EditNodeModal=({closeModal,triggerActionTypeChange})=>{
	const closeAndEditActionType=(actionType)=>{
		triggerActionTypeChange(actionType);
		closeModal();
	}
	return createPortal(
			<>
				<OriginalShadowContainer
					onClick={()=>closeModal()}
				/>
				<EditNodeContainer>
					 <a href="javascript:void(0);" style={{textDecoration:"none"}}>
		                <li onClick={()=>closeAndEditActionType("Add")} style={{listStyle:"none"}}>
		                    Add level
		                </li>
		              </a>
		              <hr/>
		              <a href="javascript:void(0);" style={{textDecoration:"none"}}>
		                <li onClick={()=>closeAndEditActionType("Remove")} style={{listStyle:"none"}}>
		                    Remove level
		              </li>
		              </a>
		              <hr/>

		              <a href="javascript:void(0);" style={{textDecoration:"none"}}>
		                <li onClick={()=>closeAndEditActionType("Promote")} style={{listStyle:"none"}}>
		                    Promote Someone
		                </li>
		              </a>
				</EditNodeContainer>
			</>
		,document.getElementById("personalContainer"));
}

const MobileRecruitAndFriendsGaugeOptions=({editFriendNodeActionType})=>{
	const personalRedux=useSelector(state=>state.personalInformation);
	const [displayEditNodeOptions,changeDisplayEditNodeOptions]=useState(false);

	const closeNodeOptions=()=>{
		changeDisplayEditNodeOptions(false);
	}
	return <UserConsumer>
				{personalInformation=>{
					return <>
							{displayEditNodeOptions==true &&(
								<>{EditNodeModal({closeNodeOptions,editFriendNodeActionType})}</>
							)}
							<li style={{listStyle:"none",marginTop:"5%"}}>
				              <a href="javascript:void(0);" style={{textDecoration:"none"}}>
				                <li style={{listStyle:"none",display:"inline-block",marginLeft:"-5%"}}>
									{recruitButton(personalInformation,personalInformation.displayConfettiHandle,personalRedux.id)}
				                </li>
				              </a>

				              <a href="javascript:void(0);" style={{textDecoration:"none"}}>
				                <li onClick={()=>changeDisplayEditNodeOptions(true)} style={FriendsNodeEditButtton}>
									Edit Friends Nodes
				                </li>
				              </a>
				          </li>
				        </>
				}}
		   </UserConsumer>
}

const PhonePersonalInformationHeader=()=>{
	const [displayPhoneProfileOptions,changePhoneProfileOptions]=useState(false);
	const closeModal=()=>{
		changePhoneProfileOptions(false);
	}
	return <UserConsumer>
				{personalInformation=>{
					return <li style={{listStyle:"none",marginLeft:"-60%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"15%"}}>
								<b>Nathan</b>
							</li>
							<li id="mobilePersonalOptionCaret" style={{listStyle:"none",display:"inline-block",marginLeft:"40%"}}>
								<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
										style={ShadowButtonCSS}
										onClick={()=>changePhoneProfileOptions(true)}
									>
									   		<span class="caret"></span>
									</button>
									{displayPhoneProfileOptions==true &&(
										<MobileProfileOptionsIpad
											{...personalInformation.mobilePhoneUIParameters}
											closeModal={closeModal}
											isIphoneDisplay={true}
										/>
									)}
									
								</div>
							</li>
						</ul>
						<hr/>
				   </li>
				}}
		   </UserConsumer>
}

export{
	MobilePersonalInformation,
	MobileRecruitAndFriendsGaugeOptions,
	PhonePersonalInformationHeader,
	MobileProfileOptionsIpad,
	EditNodeModal
}
