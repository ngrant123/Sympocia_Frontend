import React,{useState} from "react";
import styled from "styled-components";
import {createBadge} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:100%;
	height:70px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
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
	marginTop:"5%"
}

const BadgePostOptions={
	padding:"2%",
	cursor:"pointer",
	listStyle:"none"
}

const Creation=({profileId,closeParentModal})=>{
	const [selectedPostBadgeType,changeSelectedPostBadgeType]=useState("Images");
	const [submittingBadgeStatus,changeSubmittingBadgeStatus]=useState(false);

	const triggerBadgeCreation=async()=>{
		changeSubmittingBadgeStatus(true);
		const caption=document.getElementById("badgeCaption").value;
		if(caption==""){
			alert('Please create a badge caption');
		}else{		
			const badgeInformation={
				profileId,
				caption,
				postReferenceId:null,
				badgePostType:selectedPostBadgeType
			}
			const {confirmation,data}=await createBadge(badgeInformation);
			if(confirmation=="Success"){
				alert('Badge Created');
				closeParentModal();
			}else{
				alert('Unfortunately an error has occured when creating badge. Please try again');
			}
		}
		changeSubmittingBadgeStatus(false);
	}
	return(
		<React.Fragment>
			<p>
				<b>Create a badge caption here</b>
			</p>
			<InputContainer
				id="badgeCaption"
				placeholder="Enter a badge caption"
			/>
			<hr/>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<p style={{marginRight:"2%"}}>
					<b>Select badge post-type:</b>
				</p>
				<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" 
							type="button" data-toggle="dropdown" style={ButtonCSS}>
						{selectedPostBadgeType}
						<span class="caret"></span>
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
			</div>
			<hr/>
			{submittingBadgeStatus==true?
				<p>Loading...</p>:
				<div style={ButtonCSS} onClick={()=>triggerBadgeCreation()}>
					Create
				</div>
			}
		</React.Fragment>
	)
}

export default Creation;