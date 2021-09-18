import React,{useState,useContext} from "react";
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
import SymposiumSpecialistsExtended from "../../FeaturesPageSet/Modals-Portals/SymposiumUniversity/ExtendedSpecialists.js";

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

	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		featuresPageSecondaryInformation:{
			specialists,
			resources
		}
	}=featuresPageConsumer;

	console.log(specialists);
	console.log(resources);

	const constructSpecialists=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",height:"60%",overflowY:"auto",padding:"20px"}}>
				{specialists.length==0?
					<p>No specialists</p>:
					<React.Fragment>
						{specialists.map(data=>
							<React.Fragment>
								<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
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

	const constructResources=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",height:"60%",overflowY:"auto",padding:"20px"}}>
				{resources.length==0?
					<p>No resources</p>:
					<React.Fragment>
						{resources.map(data=>
							<React.Fragment>
								<div style={{display:"flex",flexDirection:"row"}}>
									<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
										style={{height:"40px",width:"46px",borderRadius:"50%"}}
									/>
									<div style={{display:"flex",flexDirection:"column",marginLeft:"10%"}}>
										<p>
											<b>{data.firstName}</b>
										</p>
										<p>{data.resourcePost}</p>
									</div>
								</div>
								<hr/>
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
		closeDropDowns();
	}

	const specialistDropDown=()=>{
		return(
			<React.Fragment>
				{displaySpecialistDropDown==true &&(
					<SymposiumUniversitySpecialistsDropDown
						closeModal={closeDropDowns}
						retrieveSymposiumSpecialists={retrieveSymposiumSpecialists}
					/>
				)}
			</React.Fragment> 
		)
	}

	const resourcesDropDown=()=>{
		return(
			<React.Fragment>
				{displayResourcesDropDown==true &&(
					<SymposiumUniversityResourcesDropDown
						closeModal={closeDropDowns}
					/>
				)}
			</React.Fragment>
		)
	}

	const closeModalModal=()=>{
		changeSpecialistExtendedModalDisplay(false);
	}

	const SymposiumSpecialistsExtendedModal=()=>{
		return(
			<React.Fragment>
				{displaySpecialistExtendedModal==true &&(
					<PortalsHOC
						closeModal={closeModalModal}
						component={
							<SymposiumSpecialistsExtended
								closeModal={closeModalModal}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			{SymposiumSpecialistsExtendedModal()}
			{resourcesDropDown()}
			{specialistDropDown()}

			<div style={SymposiumSpecilistsCSS}>
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
			<div style={SymposiumResourcesCSS}>
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