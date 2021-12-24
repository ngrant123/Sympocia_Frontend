import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {retrieveBadgeInformation} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {addPostBadge} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {
	disableScrolling,
	enableScrolling
} from "../../../../../../../Actions/Tasks/DisableScrolling.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:45;
	top:0px;
	left:0%;
`;

const Container=styled.div`
	position:fixed;
	width:40%;
	height:75%;
	background-color:white;
	z-index:50;
	top:10%;
	border-radius:5px;
	left:30%;
	overflow-y:auto;
	padding:2%;

	@media screen and (min-width:2500px){
		height:50%;
		width:50%;
		left:25%;
	}


	@media screen and (max-width:1370px){
		width:60% !important;
		left:20% !important;
    }
    @media screen and (max-width:650px){
		width:100% !important;
		left:0% !important;
		top:0% !important;
		height:100% !important;

		#closeModalButton{
			display:block !important;
		}
	}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:65%;
    }
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
	marginLeft:"2%"
}

const PostBadgeAddition=({profileId,closeModal,postType,postId})=>{
	const [displayBadgeCreationRequest,changeBadgeCreationRequestDisplay]=useState(false);
	const [badgeId,changeBadgeId]=useState();
	const [postBadgeSubmittingStatus,changePostBadgeSubmittingStatus]=useState(false);
	const [maximumBadgePostsIndicator,changeMaximumBadgePostsIndicator]=useState(false);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveBadgeInformation(profileId);
			if(confirmation=="Success"){
				const {message}=data;
				if(message==null){
					changeBadgeCreationRequestDisplay(true);
				}else{
					const {
						badgePostType,
						_id,
						badgePosts
					}=message;
					if(badgePostType!=postType){
						alert('Unfortunately you can only add the same post-type on your badge');
						closePortal();
					}else{
						if(badgePosts.length>=5){
							changeMaximumBadgePostsIndicator(true);
						}else{
							changeBadgeId(_id);
						}
					}
				}
			}else{
				alert('Unfortunately there has been an error retrieving this badge information. Please try again');
			}
			disableScrolling("personalContainer");
		}	
		fetchData();
	},[]);

	const closePortal=()=>{
		enableScrolling("personalContainer");
		closeModal();
	}


	const addPostToBadgeHandler=async()=>{
		changePostBadgeSubmittingStatus(true);
		const badgeInformation={
			badgeId,
			postId,
			profileId,
			postType
		}
		const {confirmation,data}=await addPostBadge(badgeInformation);
		if(confirmation=="Success"){
			alert('Post added to badge');
			closePortal();
		}else{
			alert('Unfortunately there has been an error when adding this post to your badge. Please try again');
		}
		changePostBadgeSubmittingStatus(false);
	}


	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>closePortal()}/>
			<Container>
				<div style={{marginBottom:"2%",cursor:"pointer"}} onClick={()=>closePortal()}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
						 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
						 stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <circle cx="12" cy="12" r="9" />
						  <path d="M10 10l4 4m0 -4l-4 4" />
					</svg>
				</div>
				{maximumBadgePostsIndicator==true?
					<p>Maximum badge posts is 5. Please delete one to continue </p>:
					<React.Fragment>
						{displayBadgeCreationRequest==true?
							<p>In order to add this post to your badge, you have to first create one. So create one :) </p>:
							<div>
								<p>
									<b>Are you sure you want to add this post to your badge?</b>
									<hr/>
									<div style={{display:"flex",flexDirection:"row"}}>
										{postBadgeSubmittingStatus==true?
											<p>Please wait...</p>:
											<React.Fragment>
												<div style={{...ButtonCSS,marginLeft:"0%"}} onClick={()=>addPostToBadgeHandler()}>
													Yes
												</div>

												<div style={{...ButtonCSS,marginLeft:"0%",marginLeft:"2%"}}
													onClick={()=>closePortal()}>
													No
												</div>
											</React.Fragment>
										}
									</div>
								</p>
							</div>
						}
					</React.Fragment>
				}
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}

export default PostBadgeAddition;