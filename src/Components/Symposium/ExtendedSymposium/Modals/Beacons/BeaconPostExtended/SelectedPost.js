import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";

const SelectedPostContainer=styled.div`
	height:350px;
	@media screen and (max-width:650px){
		#uploadVideoUrl{
			height:80% !important;
		}
	}
`;
const OwnerNameCSS={
	marginLeft:"2%",
	color:"#ADADAD",
	maxHeight:"20px",
	maxWidth:"30%",
	overflow:"hidden"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}

const ImageCSS={
	cursor:"pointer",
	width:"260px",
	height:"220px",
	borderRadius:"5px",
	marginBottom:"2%"
}
const SelectedPost=({post,postType,displayZoomedPost})=>{
	console.log(postType);
	console.log(post);
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const displayPost=()=>{
		switch(postType){
			case "Images":{
				return(
					<React.Fragment>
						<img src={post.imgUrl}
							onClick={()=>displayZoomedPost()}
							style={ImageCSS}
						/>
						<p>{post.caption}</p>
					</React.Fragment>
				)
				break;
			}
			case "Videos":{
				return(
					<React.Fragment>
						<video id="uploadVideoUrl" onClick={()=>displayZoomedPost()}
							style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
							position="relative" width="100%" height="80%" 
						 	key={uuidv4()}  autoplay loop autoBuffer muted playsInline>
							<source src={post.videoUrl} type="video/mp4"/>
						</video>
						<p>{post.title}</p>
					</React.Fragment>
				)
				break;
			}
			case "Regular":{
				return(
					<p>{post.post}</p>
				)
			}
		}
	}
	return(
		<React.Fragment>
			<p>Click on the post to zoom in </p>
			<hr/>
			<SelectedPostContainer>
				<div style={{display:"flex",flexDirection:"row",marginBottom:"2%"}}>
					<Link to={{pathname:`/profile/${post.owner._id}`}}>
						<img src={post.owner.profilePicture==null?NoProfilePicture:
									post.owner.profilePicture} style={{
													width:"50px",
													height:"40px",
													borderRadius:"50%"
												}}/>
					</Link>
					<p style={OwnerNameCSS}>
						{post.owner.firstName}
					</p>
				</div>
				{displayPost()}
			</SelectedPostContainer>
			<hr style={HorizontalLineCSS}/>
		</React.Fragment>
	)
}

export default SelectedPost;
