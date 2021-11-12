import React,{useState,useEffect} from "react";
import styled,{keyframes,css} from "styled-components";
import {Link} from "react-router-dom";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import RegularPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/Modals-Portals/RegularPostHomeDisplayPortal.js";
import AdIndicator from "../AdIndicator.js";

const ProfilePictureLink=styled(Link)`
	position:relative;
	border-radius:50% !important;
	${({swimmingStatus})=>
		swimmingStatus==true &&(
			css`
				animation: ${glowing} 1300ms infinite;
			`
		)
	}

	@media screen and (max-width:650px){
		#smallProfilePicture{
			height:30px !important;
			width:25px !important;
		}
	}
`;


const PostUserInformation=styled.div`
	display:flex;
	flex-direction:row;
	padding:10px;
	margin-right:10%;
	@media screen and (max-width:1370px){
		margin-left:0% !important;
	}
`;

const glowing=keyframes`
      0% { border-color: #D6C5F4; box-shadow: 0 0 10px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0px 0px 10px 5px #FFF52C; }
      100% { border-color: #B693F7; box-shadow: 0 0 10px #C8B0F4; }
`;

const TextAndAudioCSS={
	padding:"5px",
	fontSize:"20px",
	position:"relative",
	top:"70px",
	listStyle:"none",
	display:"inline-block",
	width:"100%",
	overflow:"hidden",
	marginLeft:"5%"
}

const headerPostNameCSS={
	display:"inline-block",
	fontSize:"20px",
	maxWidth:"60%",
	maxHeight:"50px",
	overflow:"hidden",
	marginLeft:"5%"
}



const SymposiumAndExplorePageDisplay=({regularPostInformation,targetDom})=>{
	const [selectedRegularPost,changeSelectedRegularPost]=useState();
	const [displayRegualrPostDisplayPortal,changeRegularPostDisplay]=useState(false);
	const [swimmingStatus,changeSwimmingStatus]=useState(false);

	useEffect(()=>{
		const {industriesUploaded}=regularPostInformation;
		for(var i=0;i<industriesUploaded.length;i++){
			if(industriesUploaded[i].isSwimmingTriggeredForPost==true){
				changeSwimmingStatus(true);
				break;
			}
		}
	},[]);

	const closeModal=()=>{
		changeRegularPostDisplay(false)
	}

	const displayPostModal=(data)=>{
		changeSelectedRegularPost(data);
		changeRegularPostDisplay(true);
	}

	return(
		<React.Fragment>
			{displayRegualrPostDisplayPortal==true &&(
				<RegularPostDisplayPortal
					closeModal={closeModal}
					selectedPost={selectedRegularPost}
					recommendedPosts={[]}
					targetDom={targetDom}
				/>
			)}
			<div style={{width:"30%"}}>
				<AdIndicator
					postData={regularPostInformation}
				/>
			</div>
			<PostUserInformation>
				<ProfilePictureLink swimmingStatus={swimmingStatus} 
					to={{pathname:`/profile/${regularPostInformation.owner._id}`}}
					style={{position:"relative",display:"inline-block",listStyle:"none",width:"20%",borderRadius:"5px"}}>
					<img src={regularPostInformation.owner.profilePicture!=null?
							  regularPostInformation.owner.profilePicture:
							  NoProfilePicture} 
					style={{height:"50px",width:"55px",borderRadius:"50%"}}/>
				</ProfilePictureLink>
				<p id="headerOwnerNameLI" style={headerPostNameCSS}>
					<b>{regularPostInformation.owner.firstName}</b>
				</p>
			</PostUserInformation>

			<p id="headerPostTextOrAudioContainerLI" style={TextAndAudioCSS}
				onClick={()=>displayPostModal(regularPostInformation)}>
				{regularPostInformation.isAudioPost==true?
					<audio id="audio" controls>
					 	<source src={regularPostInformation.post} type="audio/ogg"/>
					  	<source src={regularPostInformation.post} type="audio/mp4"/>
						Your browser does not support the audio element.
					</audio>
					:
					<>{regularPostInformation.post}</>
				}
			</p>
		</React.Fragment>
	)
}

export default SymposiumAndExplorePageDisplay;

