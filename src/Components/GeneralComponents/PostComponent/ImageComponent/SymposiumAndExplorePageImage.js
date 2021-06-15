import React,{useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {SmallProfilePictureAndVideoDescription} from "../../../ExplorePage/ExplorePageSubset/PostsDisplay/PostDisplayGeneralComp.js";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ImagePostDisplayPortal from "../../../ExplorePage/ExplorePageSet/ImageHomeDisplayPortal.js";

const ProfilePictureLink=styled(Link)`
	position:relative;

	@media screen and (max-width:650px){
		#smallProfilePicture{
			height:30px !important;
			width:30px !important;
		}
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
			<div id="smallImageContainer" onClick={()=>displayImageModal(imageInformation)} style={ImageCSS}>
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
				</div>
				<p id="smallPostCaption" style={{visibility:"hidden",maxHeight:"15%",overflow:"hidden"}}>
					<b>{imageInformation.caption}</b>
				</p>
		</React.Fragment>
	)
}

export default SymposiumAndExplorePageDisplay;
