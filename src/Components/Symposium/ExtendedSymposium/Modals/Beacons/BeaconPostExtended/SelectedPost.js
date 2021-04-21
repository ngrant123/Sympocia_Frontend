import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";

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
							key={uuidv4()} width="100%" height="40%" 
							borderRadius="5px" controls autoplay>
							<source src={post.videoUrl} type="video/mp4"/>
						</video>
						<p>{post.title}</p>
					</React.Fragment>
				)
				break;
			}
			case "Regular":{
				break;
			}
		}
	}
	return(
		<React.Fragment>
			<div style={{display:"flex",flexDirection:"row",marginBottom:"2%"}}>
				<img src={NoProfilePicture} style={{
											width:"50px",
											height:"40px",
											borderRadius:"50%"
										}}/>
				<p style={OwnerNameCSS}>
					{post.firstName}
				</p>
			</div>
			{displayPost()}
			<hr style={HorizontalLineCSS}/>
		</React.Fragment>
	)
}

export default SelectedPost;
