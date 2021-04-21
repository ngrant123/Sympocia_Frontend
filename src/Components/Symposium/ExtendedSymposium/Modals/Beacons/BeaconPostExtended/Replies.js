import React,{useState} from "react";
import styled from "styled-components";
import BeaconPosts from "../BeaconPosts.js";


const Replies=({postType})=>{
	const [replies,changeReplies]=useState([
		{
			firstName:"Lu",
			caption:"yessir lol"
		}
	])
	const displayExtendedPostModal=()=>{

	}
	return(
		<React.Fragment>
			<p>
				<b>Beacon Replies:</b>
			</p>
			<BeaconPosts
				posts={replies}
				postType={postType}
				displayExtendedPostModal={displayExtendedPostModal}
			/>
		</React.Fragment>
	)
}

export default Replies;
