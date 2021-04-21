import React,{useState} from "react";
import styled from "styled-components";
import BeaconPosts from "../BeaconPosts.js";

const CreateButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginBottom:"5%",
  cursor:"pointer",
  marginLeft:"2%"
}


const Replies=({postType,enableCreationPost,replies,displayZoomedReplyPost})=>{
	const displayExtendedPostModal=(postData)=>{
		displayZoomedReplyPost(postData);
	}
	return(
		<React.Fragment>
			<div style={{display:"flex",flexDirection:"row"}}>
				<p>
					<b>Beacon Replies:</b>
				</p>
				<div onClick={()=>enableCreationPost()} style={CreateButtonCSS}>
					Creation Response to Beacon
				</div>
			</div>
			<BeaconPosts
				posts={replies}
				postType={postType}
				displayExtendedPostModal={displayExtendedPostModal}
			/>
		</React.Fragment>
	)
}

export default Replies;
