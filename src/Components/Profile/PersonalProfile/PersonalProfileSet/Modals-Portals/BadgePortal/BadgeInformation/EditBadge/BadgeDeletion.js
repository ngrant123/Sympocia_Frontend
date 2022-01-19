import React,{useState} from "react";
import styled from "styled-components";
import {removeBadge} from "../../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

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
	marginLeft:"2%"
}


const BadgeDeletion=({displayAppropriateComponentName,badgeId,profileId,closeParentModal})=>{
	const [deletionStatus,changeDeletionStatus]=useState(false);	
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	const badgeDeletionHandler=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeDeletionStatus(true);
		const {confirmation,data}=await removeBadge(
											badgeId,
											profileId,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken);
		if(confirmation=="Success"){
			alert('Badge deleted');
			closeParentModal();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					badgeDeletionHandler,
					dispatch,
					{},
					false
				);
			}else{
				alert('Unfortunatley an error has occured when deleting this badge. Please try again');
			}
		}
		changeDeletionStatus(false);
	}
	return(
		<React.Fragment>
			<p>
				<b>Are you sure you want to delete this badge?</b>
			</p>
			<div style={{display:"flex",flexDirection:"row"}}>
				{deletionStatus==true?
					<p>Please wait...</p>:
					<>
						<div style={{...ButtonCSS,marginLeft:"0%"}} onClick={()=>badgeDeletionHandler({isAccessTokenUpdated:false})}>
							Yes
						</div>

						<div style={{...ButtonCSS,marginLeft:"0%",marginLeft:"2%"}}
							onClick={()=>displayAppropriateComponentName("information")}>
							No
						</div>
					</>
				}
			</div>
		</React.Fragment>
	)
}


export default BadgeDeletion;