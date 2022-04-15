import React,{useState,useContext,useEffect} from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import {
	SymposiumUniversitySpecialistsDropDown,
	SymposiumUniversityResourcesDropDown
} from "../../FeaturesPageSet/Modals-Portals/DropDowns/SymposiumUniversitySideBarOptionsPortal.js";
import PortalsHOC from "../../FeaturesPageSet/Modals-Portals/PortalsHOC.js";
import SymposiumSpecialist from "../../FeaturesPageSet/Modals-Portals/SymposiumUniversity/Specialists/index.js";
import SymposiumResources from "../../FeaturesPageSet/Modals-Portals/SymposiumUniversity/Resources/index.js";
import {useSelector} from "react-redux";

const SymposiumSpecilistsCSS={
	boxShadow:"1px 1px 5px #dbdddf",
	display:"flex",
	flexDirection:"column",
	marginTop:"2%",
	borderRadius:"5px",
	width:"95%",
	height:"250px"
}

const SymposiumResourcesCSS={
	boxShadow:"1px 1px 5px #dbdddf",
	display:"flex",
	flexDirection:"column",
	marginTop:"5%",
	borderRadius:"5px",
	width:"95%",
	height:"250px"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}

const SymposiumUniversity=()=>{
	const [displayResourcesDropDown,changeDisplayResourcesDropDown]=useState(false);
	const [displaySpecialistDropDown,changeDisplaySpecialistDropDown]=useState(false);
	const [displaySpecialistExtendedModal,changeSpecialistExtendedModalDisplay]=useState(false);
	const [displayResourcesModal,changeDisplayResourcesModal]=useState(false);
	const [selectedSymposiumSpecialist,changeSelectedSymposiumSpecialist]=useState();
	const [selectedResource,changeSelectedResource]=useState()
	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		featuresPageSecondaryInformation,
		currentSymposiumId,
		isGuestProfile,
		triggerGenerateAirPlane
	}=featuresPageConsumer;

	const {
		uploadStatuses:{
			resourceUploadStatus,
			specialistUploadStatus
		}
	}=featuresPageSecondaryInformation
	const [specialists,changeSpecialist]=useState(featuresPageSecondaryInformation.specialists);
	const [resources,changeResources]=useState(featuresPageSecondaryInformation.resources);
	const [profileSpecificSpecialistRequest,changeProfileSpecificSpecialistRequest]=useState(false);
	const [profileSpecificResourcesRequest,changeProfileSpecificResourcesRequest]=useState(false);
	const ownerId=useSelector(state=>state.personalInformation.id);

	useEffect(()=>{
		changeSpecialist([...featuresPageSecondaryInformation.specialists]);
		changeResources([...featuresPageSecondaryInformation.resources]);
	},[
		featuresPageSecondaryInformation.specialists,
		featuresPageSecondaryInformation.resources
	])

	const triggerDisplaySelectedSpecialist=(specialistData)=>{
		changeSelectedSymposiumSpecialist(specialistData);
		changeSpecialistExtendedModalDisplay(true);
	}

	const constructSpecialists=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",height:"60%",overflowY:"auto",padding:"20px"}}>
				{specialists.length==0?
					<p>No specialists</p>:
					<React.Fragment>
						{specialists.map(data=>
							<React.Fragment>
								<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}
									onClick={()=>triggerDisplaySelectedSpecialist(data)}>
									<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
										<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
											style={{height:"40px",width:"46px",borderRadius:"50%"}}
										/>
										<p style={{marginLeft:"10%"}}>{data.firstName}</p>
									</div>
									<OfflineBoltOutlinedIcon
										style={{fontSize:"24"}}
									/>
								</div>
								<hr style={HorizontalLineCSS}/>
							</React.Fragment>
						)}
					</React.Fragment>
				}
			</div>
		)
	}

	const triggerDisplaySelectedResources=(resourceData)=>{
		changeSelectedResource(resourceData);
		changeDisplayResourcesModal(true);
	}

	const constructResources=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",height:"60%",overflowY:"auto",padding:"20px"}}>
				{resources.length==0?
					<p>No resources</p>:
					<React.Fragment>
						{resources.map(data=>
							<React.Fragment>

								<div style={{padding:"10px",display:"flex",flexDirection:"row",alignItems:"center",cursor:"pointer"}}
									onClick={()=>triggerDisplaySelectedResources(data)}>
									<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
										style={{height:"40px",width:"46px",borderRadius:"50%"}}
									/>
									<div style={{display:"flex",flexDirection:"column",marginLeft:"10%"}}>
										<div>
											<p>
												<b>{data.firstName}</b>
											</p>
										</div>
										<p style={{maxHeight:"20px",overflow:"hidden"}}>{data.resourcePost}</p>
									</div>
								</div>
								<hr style={HorizontalLineCSS}/>
							</React.Fragment>
						)}
					</React.Fragment>
				}
			</div>
		)
	}

	const closeDropDowns=()=>{
		changeDisplayResourcesDropDown(false);
		changeDisplaySpecialistDropDown(false);
	}

	const retrieveSymposiumSpecialists=()=>{
		changeSpecialistExtendedModalDisplay(true);
		closeDropDowns();
	}

	const retrieveOwnerSubmittedSpecialists=()=>{
		changeProfileSpecificSpecialistRequest(true);
		changeSpecialistExtendedModalDisplay(true);
	}

	const specialistDropDown=()=>{
		return(
			<React.Fragment>
				{displaySpecialistDropDown==true &&(
					<SymposiumUniversitySpecialistsDropDown
						closeModal={closeDropDowns}
						retrieveSymposiumSpecialists={retrieveSymposiumSpecialists}
						currentSymposiumId={currentSymposiumId}
						specialistUploadStatus={specialistUploadStatus}
						retrieveOwnerSubmittedSpecialists={retrieveOwnerSubmittedSpecialists}
					/>
				)}
			</React.Fragment> 
		)
	}

	const retrieveSymposiumResources=()=>{
		changeDisplayResourcesModal(true);
		closeDropDowns();
	}

	const retrieveOwnerSubmittedResources=()=>{
		changeProfileSpecificResourcesRequest(true);
		changeDisplayResourcesModal(true);
	}

	const resourcesDropDown=()=>{
		return(
			<React.Fragment>
				{displayResourcesDropDown==true &&(
					<SymposiumUniversityResourcesDropDown
						closeModal={closeDropDowns}
						currentSymposiumId={currentSymposiumId}
						retrieveSymposiumResources={retrieveSymposiumResources}
						resourceUploadStatus={resourceUploadStatus}
						retrieveOwnerSubmittedResources={retrieveOwnerSubmittedResources}
					/>
				)}
			</React.Fragment>
		)
	}

	const closeModal=()=>{
		changeSpecialistExtendedModalDisplay(false);
		changeSelectedSymposiumSpecialist(null);
		changeSelectedResource(null);
		changeDisplayResourcesModal(false);
		changeProfileSpecificResourcesRequest(false);
		changeProfileSpecificSpecialistRequest(false);
	}

	const SymposiumSpecialistsExtendedModal=()=>{
		return(
			<React.Fragment>
				{displaySpecialistExtendedModal==true &&(
					<PortalsHOC
						closeModal={closeModal}
						component={
							<SymposiumSpecialist
								closeModal={closeModal}
								selectedSymposiumSpecialist={selectedSymposiumSpecialist}
								currentSymposiumId={currentSymposiumId}
								isGuestProfile={isGuestProfile}
								profileSpecificSpecialistRequest={profileSpecificSpecialistRequest}
								ownerId={ownerId}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const SymposiumResourcesDisplay=()=>{
		return(
			<React.Fragment>
				{displayResourcesModal==true &&(
					<PortalsHOC
						closeModal={closeModal}
						component={
							<SymposiumResources
								closeModal={closeModal}
								symposiumId={currentSymposiumId}
								selectedResource={selectedResource}
								isGuestProfile={isGuestProfile}
								profileSpecificResourcesRequest={profileSpecificResourcesRequest}
								ownerId={ownerId}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const generateAirPlanes=(selectedDivId)=>{
		triggerGenerateAirPlane(selectedDivId);
	}

	return(
		<React.Fragment>
			{SymposiumSpecialistsExtendedModal()}
			{SymposiumResourcesDisplay()}
			{resourcesDropDown()}
			{specialistDropDown()}

			<div style={SymposiumSpecilistsCSS} id="symposiumSpecialists"
				onClick={()=>generateAirPlanes("symposiumSpecialists")}>
				<div style={{padding:"10px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
					<p style={{color:"#565656"}}>
						<b>Symposium Specialists</b>
					</p>
					<div style={DropDownCSS} onClick={()=>changeDisplaySpecialistDropDown(true)}>
						<ExpandMoreIcon
							style={{fontSize:"24"}}
						/>
					</div>
				</div>
				<hr style={HorizontalLineCSS}/>
				{constructSpecialists()}
			</div>
			<div style={SymposiumResourcesCSS} id="symposiumResources"
				onClick={()=>generateAirPlanes("symposiumResources")}>
				<div style={{padding:"10px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
					<p style={{color:"#565656"}}>
						<b>Symposium Resources</b>
					</p>
					<div style={DropDownCSS} onClick={()=>changeDisplayResourcesDropDown(true)}>
						<ExpandMoreIcon
							style={{fontSize:"24"}}
						/>
					</div>
				</div>
				<hr style={HorizontalLineCSS}/>
				{constructResources()}
			</div>

		</React.Fragment>
	)
}


export default SymposiumUniversity;