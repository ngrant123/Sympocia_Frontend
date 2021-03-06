import React,{useState} from "react";
import styled from "styled-components";
import {
		PersonalInformation,
		RecruitButton
	} from "../PersonalProfileSubset/PersonalDetails/PersonalInformation.js";
import {useSelector} from "react-redux";
import {UserConsumer} from "../UserContext.js";
import {createPortal} from "react-dom";
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ChampionEditPortal from "./Modals-Portals/ChampionModalPortal/index.js";
import {SponsorDisplayModal} from "./Modals-Portals/ChampionModalPortal/ChampionDisplayModal.js";
import {ChampionMobileUIButton} from "./PersonalProfileContainerCSS.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";

const OriginalShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:39;
	top:0px;
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;
const PersonalInformationContainer=styled.div`
	position:fixed;
	background-color:white;
	width:60%;
	height:60%;
	border-radius:5px; 
	padding:20px;
	z-index:40;
	left:20%;
	top:20%;
	overflow-y:scroll;

	@media screen and (max-width:550px){
		width:90% !important;
		left:5% !important;
    }
`;

const ProfileInformationContainer=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:39;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow:auto;
	padding:20px;

	@media screen and (min-width:2500px){
		height:50%;
		width:50%;
		left:25%;
		padding:2%;
		text-align:center;

		#friendsNodeOptions{
			font-size:36px !important;
			margin-left:-7%;
		}
	}


	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70%;
		top:15%;
    }
`;

const SponsorExtendedModal=styled.div`
	position:fixed;
	width:30%;
	height:35%;
	background-color:white;
	z-index:40;
	border-radius:5px;
	box-shadow: 10px 10px 20px 	#9395a0;
	left:65%;
	top:60%;
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

	@media screen and (max-width:550px){
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

const MobileChampionContainer=styled.div`

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		display:none !important;
	}
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

const MobilePersonalInformation=({closeModal,displayConfetti,personalInformation,displaySocialMediaModal,userId})=>{
	return <>
				<ShadowContainer
					onClick={()=>closeModal()}
				/>
				<PersonalInformationContainer>
					<PersonalInformation
						displayConfetti={displayConfetti}
						personalInformation={personalInformation}
						displaySocialMediaModal={displaySocialMediaModal}
						userId={userId}
					/>

				</PersonalInformationContainer>
		   </>
}


const MobileProfileOptions=({
	closeModal,
	displayPersonalInformation,
	displayChampionsModalMobileRemoteTrigger,
	championModalData,
	isIphoneDisplay,
	isOwner})=>{

	const [displayChampionModal,changeDisplayChampionModal]=useState(false);
	const [editChampionModal,changeEditChampionModal]=useState(false);
	const [displayChampion,changeDisplayChampion]=useState(displayChampionsModalMobileRemoteTrigger); 

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
			<OriginalShadowContainer
				onClick={()=>closeModal()}
			/>
			{displayChampion==true ?
				<SponsorDisplayModal
					isMobile={true}
					championData={championModalData}
					isOwnProfile={isOwner}
				/>:
				<React.Fragment>
					<ProfileInformationContainer>
						{displayChampionModal==false?
							<>
								<p style={{fontSize:"24px"}}>
									<b>Profile Additional Information</b>
								</p>
								<hr/>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					                <li onClick={()=>displayPersonalInformation()} 
					                	style={{listStyle:"none",fontSize:"18px"}}>
					                    Personal Information
					                </li>
					            </a>
					            <hr/>
					            <a href="javascript:void(0);" style={{textDecoration:"none"}}>
					                <li onClick={()=>changeDisplayChampionModal(true)} 
					                	style={{listStyle:"none",fontSize:"18px"}}>
					                    Champion
					                </li>
					            </a>
					            <hr/>
				            </>
							:<>
								{isOwner==true && (
					            	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						                <li onClick={()=>changeEditChampionModal(true)} 
						                	style={{listStyle:"none",fontSize:"18px"}}>
						                    Edit Champion
						                </li>
						            </a>
								)}
					            <hr/>
					            {(championModalData!=null && championModalData.name!="")==true && (
					            	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					            		<li onClick={()=>changeDisplayChampion(true)}
					            			style={{listStyle:"none",fontSize:"18px"}}>
						                    View Champion
						                </li>
						            </a>
					            )}
				            </>
						}
					</ProfileInformationContainer>
				</React.Fragment>
			}
		</>
	,document.getElementById("personalContainer"));
}

const EditNodeModal=({closeNodeOptions,editFriendNodeActionType})=>{
	const closeAndEditActionType=(actionType)=>{
		editFriendNodeActionType(actionType);
		closeNodeOptions();
	}
	return createPortal(
			<>
				<OriginalShadowContainer
					onClick={()=>closeNodeOptions()}
				/>
				<ProfileInformationContainer>
					 <a href="javascript:void(0);" style={{textDecoration:"none"}}>
		                <li id="friendsNodeOptions" onClick={()=>closeAndEditActionType("Add")} style={{listStyle:"none"}}>
		                    Add level
		                </li>
		              </a>
		              <hr/>
		              <a href="javascript:void(0);" style={{textDecoration:"none"}}>
		                <li id="friendsNodeOptions" onClick={()=>closeAndEditActionType("Remove")} style={{listStyle:"none"}}>
		                    Remove level
		              </li>
		              </a>
		              <hr/>

		              <a href="javascript:void(0);" style={{textDecoration:"none"}}>
		                <li id="friendsNodeOptions" onClick={()=>closeAndEditActionType("Promote")} style={{listStyle:"none"}}>
		                    Promote Someone
		                </li>
		              </a>
						<hr/>

						
		               <a href="javascript:void(0);" style={{textDecoration:"none"}}>
			                <li id="friendsNodeOptions" onClick={()=>closeAndEditActionType("Demote")} style={{listStyle:"none"}}>
			                    Demote Someone
			                </li>
			            </a>
				</ProfileInformationContainer>
			</>
		,document.getElementById("personalContainer"));
}

const MobileRecruitAndFriendsGaugeOptions=({editFriendNodeActionType,isOwner})=>{
	const personalRedux=useSelector(state=>state.personalInformation);
	const [displayEditNodeOptions,changeDisplayEditNodeOptions]=useState(false);

	const closeNodeOptions=()=>{
		changeDisplayEditNodeOptions(false);
	}

	const displayNodeOptions=()=>{
		changeDisplayEditNodeOptions(true);
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
									<RecruitButton
										personalInformation={{
											_id:personalInformation.userProfile._id,
											isGuestProfile:personalInformation.isGuestProfile,
											isOwnProfile:personalInformation.isOwnProfile,
											isGuestVisitorProfile:personalInformation.isGuestVisitorProfile,
											recruits:personalInformation.userProfile.recruits
										}}
									/>
				                </li>
				              </a>
				              {isOwner==true && (
					              <a href="javascript:void(0);" style={{textDecoration:"none"}}>
					                <li onClick={()=>displayNodeOptions()} style={FriendsNodeEditButtton}>
										Edit Friends Nodes
					                </li>
					              </a>
				              )}
				          </li>
				        </>
				}}
		   </UserConsumer>
}

const MobileChampionsDisplay=({
	championProfilePicture,
	displayChampionsExtendedMobileDisplay,
	isOwner})=>{
	return(	
		<MobileChampionContainer isOwner={isOwner}
			id="championIcon" onClick={()=>displayChampionsExtendedMobileDisplay()}
			style={{listStyle:"none",zIndex:"50"}}>
			<ChampionMobileUIButton>
				<img src={championProfilePicture==null?
					NoProfilePicture:championProfilePicture}
					style={{width:"30px",height:"30px",borderRadius:"50%"}}
				/>
			</ChampionMobileUIButton>
		</MobileChampionContainer>
	)
}

export{
	MobilePersonalInformation,
	MobileRecruitAndFriendsGaugeOptions,
	MobileProfileOptions,
	EditNodeModal,
	MobileChampionsDisplay
}
