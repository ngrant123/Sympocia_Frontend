import React from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {Link} from "react-router-dom";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";


const PostUserAndSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:5%;
	@media screen and (max-width:1370px){
		flex-direction:row;
		#postOwner{
			font-size:15px !important;
			margin-right:2% !important;
		}
	}

	@media screen and (max-width:650px){
		#headerAudioLI{
			width:90px !important;
		}
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    		flex-direction:row;
		#postOwner{
			font-size:15px !important;
			margin-right:2% !important;
		}
    }
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

const HeaderArrowDownCSS={
	borderRadius:"50%",
	display:"flex",
	justifyContent:"center",
	padding:"5px",
	width:"30px",
	marginLeft:"40%",
	height:"25px",
	marginTop:"2%",
	boxShadow:"1px 1px 10px #707070"
}


export const HeaderOwnerAndSymposiumInformation=({headerPost})=>{
	return(
		<PostUserAndSymposiumInformation>
			<ProfilePictureLink style={{marginRight:"5%"}} to={{pathname:`/profile/${headerPost.owner._id}`}}>
				<img src={headerPost.owner.profilePicture==null?NoProfilePicture:
					headerPost.owner.profilePicture}
					style={{height:"40px",width:"46px",borderRadius:"50%"}}
				/>
			</ProfilePictureLink>
			<div id="ownerInformationAndSymposiumAudio" 
				style={{display:"flex",flexDirection:"column"}}>
				<Link to={{pathname:`/profile/${headerPost.owner._id}`}}
					id="postOwner" style={{fontSize:"15px",maxWidth:"60%",maxHeight:"50px"}}>
					<b>{headerPost.owner.firstName}</b>
				</Link>
				{headerPost.audioDescription!=null &&(
					<audio id="headerAudioLI" style={{width:"120px",height:"30px",marginBottom:"2%"}} id="headerAudioLI" controls muted>
					  	<source src={headerPost.audioDescription} type="audio/ogg"/>
					  	<source src={headerPost.audioDescription} type="audio/mp4"/>
						Your browser does not support the audio element.
					</audio>
				)}
			</div>
			<div style={HeaderArrowDownCSS}>
				<KeyboardArrowDownIcon
					style={{color:"#7A7A7A"}}
				/>
			</div>
		</PostUserAndSymposiumInformation>
	)
}
