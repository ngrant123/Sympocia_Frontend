import React,{useState,useContext} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";
import {useSelector,useDispatch} from "react-redux";
import {
	deleteSymposiumResource
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import {FeaturesContext} from "../../../../FeaturesPageSet/FeaturesPageContext.js";
import {refreshTokenApiCallHandle} from "../../../../../../../Actions/Tasks/index.js";

const Container=styled.div``;

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
	width:"20%"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const SelectedResource=({closeModal,highlightedSpecialist,removeResource,symposiumId})=>{

	const [displayDeleteSymposiumResourceOption,changeDisplayDeleteResource]=useState(false);
	const ownerId=useSelector(state=>state.personalInformation.id);
	const dispatch=useDispatch();
	const featuresPageConsumer=useContext(FeaturesContext);
	const personalInformation=useSelector(state=>state.personalInformation);
	const [submitting,changeSubmittingStatus]=useState(false);

	const {
		featuresPageSecondaryInformation,
		updateSecondaryInformation
	}=featuresPageConsumer;

	const {resources}=featuresPageSecondaryInformation;


	const deleteSpecialist=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const {confirmation,data}=await deleteSymposiumResource({
											symposiumId,
								            resourceId:highlightedSpecialist._id,
								            profileId:ownerId,
								            accessToken:isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken
										});

		if(confirmation=="Success"){
			for(var i=0;i<resources.length;i++){
				if(resources[i]._id==highlightedSpecialist._id){
					resources.splice(i,1);
					break;
				}
			}
			updateSecondaryInformation({
				...featuresPageSecondaryInformation,
				resources:[...resources]
			});

			if(removeResource!=null){
				removeResource(highlightedSpecialist._id);
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
			{displayDeleteSymposiumResourceOption==true?
				<React.Fragment>
					<div style={ButtonCSS} onClick={()=>changeDisplayDeleteResource(false)}>
						Back
					</div>

					<p style={{marginTop:"5%"}}>
						<b>Are you sure you want to delete your symposium resource?</b>
					</p>
					<hr/>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={{...ButtonCSS,marginRight:"5%"}} onClick={()=>deleteSpecialist({isAccessTokenUpdated:false})}>
							Yes
						</div>
						<div style={ButtonCSS} onClick={()=>changeDisplayDeleteResource(false)}>
							No
						</div>
					</div>
				</React.Fragment>:
				<React.Fragment>
					<div style={ButtonCSS} onClick={()=>closeModal()}>
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
							{highlightedSpecialist.resourcePost}
						</p>
					</div>
					<hr/>
					{submitting==true?
						<p>Please wait...</p>:
						<React.Fragment>
							{ownerId==highlightedSpecialist.profileId &&(
								<svg id="removePostOption" style={{cursor:"pointer"}}
									onClick={()=>changeDisplayDeleteResource(true)}
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
							)}
						</React.Fragment>
					}
				</React.Fragment>
			}

		</Container>
	)
}

export default SelectedResource;