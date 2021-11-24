import React,{useState} from "react";
import styled from "styled-components";
import {
	editBadgeCaption,
	removePostFromBadge,
	removeBadge
} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";


const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:80%;
	height:50px;
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
	marginLeft:"2%"
}

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const EditBadge=({badgeInformation,profileId})=>{
	const [currentBadgeType,changeBadgeType]=useState("Images");
	const [badgesPosts,changeBadgesPosts]=useState([]);
	const [badgeDescription,changeBadgeDescription]=useState();

	const postsDecider=(data)=>{
		switch(currentBadgeType){
			case "Images":{
				return(
					<img src={data.imgUrl} 
						style={{position:"relative",width:"120px",height:"120px",borderRadius:"5px"}}
					/>
				)
			}
			case "Videos":{
				return(
					<video id="videoElement"
						style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
						 position="relative" width="100%" height="100%"
					 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
						<source src={data.videoUrl} type="video/mp4"/>
					</video>
				)
			}
			case "Text":{
				return(
					<>
						{data.isAudioPost==true?
							<audio id="audio" controls>
							 	<source src={data.post} type="audio/ogg"/>
							  	<source src={data.post} type="audio/mp4"/>
								Your browser does not support the audio element.
							</audio>
							:
							<>{data.post}</>
						}
					</>
				)
			}

			case "Blog":{
				return(
					<img id="headerBlogLI"
						src={data.blogImageUrl} style={{borderRadius:"5px",position:"relative",width:"100%",height:"100%"}}
					/>
				)
			}
		}
	}
	return(
		<React.Fragment>
			<p style={{fontSize:"24px"}}>
				<b>Badge Settings</b>
			</p>
			<hr style={HorizontalLineCSS}/>
			<div>
				<p>
					<b>Badge Caption:</b>
				</p>
				<div style={{display:"flex",flexDirection:"row"}}>
					<InputContainer placeholder="Enter Badge Caption here"/>
					<div style={ButtonCSS}>
						Edit
					</div>
				</div>
			</div>

			<div style={{marginTop:"10%"}}>
				<p>
					<b>Posts:</b>
				</p>
				<div style={{display:"flex",flexDirection:"row"}}>
					{badgesPosts.map(data=>
					 	<>{postsDecider()}</>
					)}
				</div>
			</div>
		</React.Fragment>
	)
}

export default EditBadge;