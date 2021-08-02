import React,{memo} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
	Container,
	ProfilePicture,
	SmallProfileCommentPicture,
	ColorPatchContainer
} from "./SmallRegularPostsContainerCSS.js";


const RegularPostCSS={
	cursor:"pointer",
	width:"30%",
	height:"30%",
	listStyle:"none",
	display:"inline-block",
	marginBottom:"3%"
}

const ProfilePictureCSS={
	position:"relative",
	borderRadius:"50%",
	height:"50px",
	width:"55px",
	marginTop:"2%",
	overflow:"hidden",
	borderRadius:"50%",
	marginBottom:"15%"
}

const CommentButtonCSS={
	textAlign:"center",
	listStyle:"none",
	padding:"5px",
	width:"60%",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px"	
}

const SmallRegularPosts=({posts,profilePicture,displayPostModal,friendsColorNodesMap})=>{
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const regularPost=(data)=>{
		const colorCode=friendsColorNodesMap.get(data.levelNode);
		return 	<Container>
					<ColorPatchContainer colorCode={colorCode}/>
					<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
						<img id="smallRegularPostProfilePicture" 
							src={profilePicture==null?
									NoProfilePicture:profilePicture} 
							style={ProfilePictureCSS}
						/>
						{data.isAudioPost==true?
							<audio key={uuidv4()} style={{width:"150px"}} controls>
										<source src={data.post} type="audio/ogg"/>
										<source src={data.post} type="audio/mp4"/>
										Your browser does not support the audio element.
							</audio>:
							<React.Fragment>
								<p id="post" style={{color:"#A4A4A4"}}>{data.post}</p>
							</React.Fragment>
						}
					</div>
				</Container>
	}
	
	return(
		<li style={{listStyle:"none"}}>
			<ul style={{padding:"0px"}}>
				{posts.map(data=>
					<React.Fragment>
						<li id="smallContainerLI"  onClick={()=>displayPostModal(data)}
						 	style={RegularPostCSS}>
								{regularPost(data)}
						</li>
						<hr id="regularPostHorizontalLine" style={{display:"none",width:"90%"}}/>
					</React.Fragment>
				)}
			</ul>
		</li>
	)
}

export default memo(SmallRegularPosts);