import React,{useState,useEffect} from "react";
import styled,{keyframes,css} from "styled-components";
import {Link} from "react-router-dom";
import {SmallProfilePictureAndVideoDescription} from "../../../ExplorePage/ExplorePageSubset/PostsDisplay/PostDisplayGeneralComp.js";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ImagePostDisplayPortal from "../../../ExplorePage/ExplorePageSet/Modals-Portals/ImageHomeDisplayPortal.js";

const glowing=keyframes`
      0% { border-color: #D6C5F4; box-shadow: 0 0 10px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0px 0px 10px 5px #FFF52C; }
      100% { border-color: #B693F7; box-shadow: 0 0 10px #C8B0F4; }
`;

const ProfilePictureLink=styled(Link)`
	position:relative;

	@media screen and (max-width:650px){
		#smallProfilePicture{
			height:30px !important;
			width:30px !important;
		}
	}
`;

const Container=styled.div`
	cursor:pointer;
	${({swimmingStatus})=>
		swimmingStatus==true &&(
			css`
				animation: ${glowing} 1300ms infinite;
			`
		)
	}
`;

const ImageCSS={
	position:"relative",
	width:"100%",
	height:"180px",
	borderRadius:"10px"
}

const SmallImageArrowDownCSS={
	borderRadius:"50%",
	display:"flex",
	justifyContent:"center",
	backgroundColor:"#7A7A7A",
	padding:"5px",
	width:"30px",
	height:"25px",
	marginTop:"15%",
	marginLeft:"15%"
}

const SymposiumAndExplorePageDisplay=({imageInformation,targetDom})=>{
	const [swimmingStatus,changeSwimmingStatus]=useState(false);

	useEffect(()=>{
		const {industriesUploaded}=imageInformation;
		for(var i=0;i<industriesUploaded.length;i++){
			if(industriesUploaded[i].isSwimmingTriggeredForPost==true){
				changeSwimmingStatus(true);
				break;
			}
		}
	},[]);
	const [selectedImage,changeSelectedImage]=useState();
	const [displayImageDisplayPortal,changeImageDisplay]=useState(false);
	const closeModal=()=>{
		changeImageDisplay(false)
	}

	const displayImageModal=(data)=>{
		changeSelectedImage(data);
		changeImageDisplay(true);
	}
	return(
		<React.Fragment>
			{displayImageDisplayPortal==true &&(
				<ImagePostDisplayPortal
					closeModal={closeModal}
					selectedImage={selectedImage}
					recommendedImages={[]}
					targetDom={targetDom}
				/>
			)}
			<Container swimmingStatus={swimmingStatus} id="smallImageContainer" 
				onClick={()=>displayImageModal(imageInformation)} style={ImageCSS}>
				<img id="image" src={imageInformation.imgUrl} style={{
					width:"100%",height:"100%",borderRadius:"10px"
				}}/>
				<div style={{position:"absolute",display:"flex",flexDirection:"column",top:"5%",left:"75%"}}>
					<ProfilePictureLink to={{pathname:`/profile/${imageInformation.owner._id}`}}>
						<SmallProfilePictureAndVideoDescription
							postData={imageInformation}
						/>
					</ProfilePictureLink>
					<div id="smallImageArrowDownCSS" style={SmallImageArrowDownCSS}>
						<KeyboardArrowDownIcon
							style={{color:"#FFFFFF"}}
						/>
					</div>
				</div>
			</Container>
			{/*
				<p id="smallPostCaption" style={{visibility:"hidden",maxHeight:"15%",overflow:"hidden"}}>
					<b>{imageInformation.caption}</b>
				</p>
			*/}
		</React.Fragment>
	)
}

export default SymposiumAndExplorePageDisplay;
