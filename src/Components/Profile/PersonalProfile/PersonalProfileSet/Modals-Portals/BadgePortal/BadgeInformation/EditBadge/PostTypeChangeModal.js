import React,{useState} from "react";
import styled from "styled-components";
import {editBadgePostType} from "../../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../../../../Actions/Tasks/index.js";

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


const BadgePostOptions={
	padding:"2%",
	cursor:"pointer",
	listStyle:"none"
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


const PostTypeChange=({displayAppropriateComponentName,closeParentModal,profileId,badgeId})=>{
	const [selectedPostBadgeType,changeSelectedPostBadgeType]=useState("Images");    
	const [postTypeChangeVerification,changePostTypeVerification]=useState(false);
	const [postTypeSubmittingStatus,changePostTypeSubmittingStatus]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	const editBadgePostTypeHandle=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changePostTypeSubmittingStatus(true);
		const {confirmation,data}=await editBadgePostType(
											badgeId,
											selectedPostBadgeType,
											profileId,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken);
		if(confirmation=="Success"){
			alert('Badge Post-Type altered');
			closeParentModal();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					editBadgePostTypeHandle,
					dispatch,
					{},
					false
				);
			}else{
				alert('Unfortunately an error has occured when changing post-type. Please try again');
			}
		}
		changePostTypeSubmittingStatus(false);
	}
	return(
		<React.Fragment>
			{postTypeChangeVerification==true?
				<React.Fragment>
					<p>
						<b>Select when type of post you want to change you badge post-type:</b>
					</p>
					<div class="dropdown">
						<button class="btn btn-primary dropdown-toggle" 
								type="button" data-toggle="dropdown" style={{...ButtonCSS,width:"40%"}}>
							<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
								<p>Current selected: {selectedPostBadgeType}</p>
								<div style={VerticalLineCSS}/>
								<span class="caret"></span>
							</div>
						</button>
						<ul class="dropdown-menu">
							<li style={BadgePostOptions}
								onClick={()=>changeSelectedPostBadgeType("Images")}>
								Images
							</li>
							<hr/>

							<li style={BadgePostOptions}
								onClick={()=>changeSelectedPostBadgeType("Videos")}>
								Videos
							</li>
							<hr/>

							<li style={BadgePostOptions}
								onClick={()=>changeSelectedPostBadgeType("Blogs")}>
								Blogs
							</li>	
							
							<hr/>

							<li style={BadgePostOptions}
								onClick={()=>changeSelectedPostBadgeType("Text")}>
								Text
							</li>						
						</ul>
					</div>
					<hr/>
					{postTypeSubmittingStatus==true?
						<p>Please wait...</p>:
						<div style={{...ButtonCSS,marginTop:"5%"}} onClick={()=>editBadgePostTypeHandle({isAccessTokenUpdated:false})}>
							Edit post-type
						</div>
					}
				</React.Fragment>:
				<React.Fragment>
					<div style={{...ButtonCSS,marginLeft:"0%",marginTop:"5%"}}
						onClick={()=>displayAppropriateComponentName("information")}>
						Back
					</div>
					<p style={{marginTop:"2%"}}>
						<b>Are you sure you want to change badge post-type?</b>
					</p>
					<p>
						Changing the badge post type will clear previous posts and start 
						you with a clean slate. Would you like to still continue?
					</p>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={{...ButtonCSS,marginLeft:"0%"}} onClick={()=>changePostTypeVerification(true)}>
							Yes
						</div>

						<div style={{...ButtonCSS,marginLeft:"0%",marginLeft:"2%"}}
							onClick={()=>displayAppropriateComponentName("information")}>
							No
						</div>
					</div>
				</React.Fragment>
			}
		</React.Fragment>

	)
}

export default PostTypeChange;


