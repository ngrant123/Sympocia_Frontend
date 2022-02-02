import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import {
	getSymposiumSpecialists,
	getProfileToSpecialistRankingInteractionStatus
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {
	incrementSpecialistRanking,
	decrementSymposiumSpecialistRanking,
	deleteSymposiumSpecialist
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";
import {useSelector,useDispatch} from "react-redux";
import {FeaturesContext} from "../../../../FeaturesPageSet/FeaturesPageContext.js";
import {refreshTokenApiCallHandle} from "../../../../../../../Actions/Tasks/index.js";

const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
`;


const InputContainer=styled.textarea`
	width:100%;
	resize:none;
	padding:5px;
	height:50px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
`;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"30%"
}
const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"30px",
 	marginRight:"5%",
 	marginLeft:"5%"
}



const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const ReputationButtonCSS={
	fontSize:"30",
	color:"#6e6e6e",
	cursor:"pointer"
}


const SymposiumSpecialistsExtended=(props)=>{
	const {
		closeModal,
		selectedSymposiumSpecialist,
		currentSymposiumId,
		isGuestProfile,
		removeSpecialist
	}=props;

	console.log(selectedSymposiumSpecialist);

	const [highlightedSpecialist,changeHighLightedSpecialist]=useState(selectedSymposiumSpecialist);
	const [hasProfilePreviouslyInteractedWithSpecialist,changeInteractionStatus]=useState(false);
	const [submitting,changeSubmittingStatus]=useState(false);
	const [displayDeleteSymposiumSpecialistOption,changeDisplayDeleteSymposiumSpecialist]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);
	const featuresPageConsumer=useContext(FeaturesContext);
	const dispatch=useDispatch();

	const {
		featuresPageSecondaryInformation,
		updateSecondaryInformation
	}=featuresPageConsumer;

	const {specialists}=featuresPageSecondaryInformation;


	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await getProfileToSpecialistRankingInteractionStatus(
												personalInformation.id,
												selectedSymposiumSpecialist._id
											);
			if(confirmation=="Success"){
				const {message}=data;
				changeInteractionStatus(message);
			}
		}
		fetchData();
	},[]);

	const triggerBackButton=()=>{
		if(selectedSymposiumSpecialist==null){
			changeHighLightedSpecialist(null);
		}else{
			closeModal();
		}
	}

	const incrementRanking=async()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeSubmittingStatus(true);
			const {confirmation,data}=await incrementSpecialistRanking(
												highlightedSpecialist._id,
												personalInformation.id);
			if(confirmation=="Success"){
				changeInteractionStatus(!hasProfilePreviouslyInteractedWithSpecialist);
			}else{
				alert('Unfortunately there has been an error adding the reputation. Please try again');
			}
			changeSubmittingStatus(false);
		}
	}


	const decrementRanking=async()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeSubmittingStatus(true);
			const {confirmation,data}=await decrementSymposiumSpecialistRanking(
												highlightedSpecialist._id,
												personalInformation.id);
			if(confirmation=="Success"){
				changeInteractionStatus(!hasProfilePreviouslyInteractedWithSpecialist);
			}else{
				alert('Unfortunately there has been an error removing this reputation. Please try again');
			}
			changeSubmittingStatus(false);
		}
	}

	const deleteSpecialist=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const {confirmation,data}=await deleteSymposiumSpecialist(
											currentSymposiumId,
											selectedSymposiumSpecialist._id,
											personalInformation.id,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken);

		if(confirmation=="Success"){
			for(var i=0;i<specialists.length;i++){
				if(specialists[i]._id==selectedSymposiumSpecialist._id){
					specialists.splice(i,1);
					break;
				}
			}
			updateSecondaryInformation({
				...featuresPageSecondaryInformation,
				specialists:[...specialists]
			});

			if(removeSpecialist!=null){
				removeSpecialist(selectedSymposiumSpecialist._id);
			}else{
				closeModal();
			}
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					deleteSpecialist,
					dispatch,
					{},
					false
				);
			}else{
				alert('Unfortunately there has been an error when creating your symposium specialist.Please try again');
			}

			changeSubmittingStatus(false);
		}
	}


	return(
		<Container>
			{displayDeleteSymposiumSpecialistOption==true?
				<React.Fragment>
					<div style={ButtonCSS} onClick={()=>changeDisplayDeleteSymposiumSpecialist(false)}>
						Back
					</div>

					<p style={{marginTop:"5%"}}>
						<b>Are you sure you want to delete your symposium specialist?</b>
					</p>
					<hr/>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={{...ButtonCSS,marginRight:"5%"}} onClick={()=>deleteSpecialist({isAccessTokenUpdated:false})}>
							Yes
						</div>
						<div style={ButtonCSS} onClick={()=>changeDisplayDeleteSymposiumSpecialist(false)}>
							No
						</div>
					</div>
				</React.Fragment>:
				<React.Fragment>
					<div style={ButtonCSS} onClick={()=>triggerBackButton()}>
						Back
					</div>
					<div style={{display:"flex",flexDirection:"column",marginTop:"10%"}}>
						<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
							<img src={highlightedSpecialist.profilePicture==null?NoProfilePicture:highlightedSpecialist.profilePicture}
								style={{width:"70px",height:"70px",borderRadius:"50%"}}
							/>
							<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",width:"50%"}}>
								<p>
									<b>{highlightedSpecialist.firstName}</b>
								</p>
							</div>
						</div>
						<hr style={HorizontalLineCSS}/>
						<p style={{maxHeight:"40px",overflow:"hidden"}}>
							{highlightedSpecialist.introduction}
						</p>
					</div>
					<hr/>
					{submitting==true?
						<p>Please wait...</p>:
						<div style={{display:"flex",flexDirection:"row"}}>
							{hasProfilePreviouslyInteractedWithSpecialist==true?
								<OfflineBoltIcon onClick={()=>decrementRanking()}
									style={ReputationButtonCSS}
								/>:
								<OfflineBoltOutlinedIcon onClick={()=>incrementRanking()}
									style={ReputationButtonCSS}
								/>
							}
							{selectedSymposiumSpecialist.profileId==personalInformation.id &&(
								<React.Fragment>
									<div style={VerticalLineCSS}/>

									<svg id="removePostOption" style={{cursor:"pointer"}}
										onClick={()=>changeDisplayDeleteSymposiumSpecialist(true)}
										xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
										width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
										stroke-linecap="round" stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
										<line x1="4" y1="7" x2="20" y2="7" />
										<line x1="10" y1="11" x2="10" y2="17" />
										<line x1="14" y1="11" x2="14" y2="17" />
										<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
										<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
									</svg>
								</React.Fragment>
							)}

						</div>
					}
				</React.Fragment>
			}
		</Container>
	)
}


export default SymposiumSpecialistsExtended;