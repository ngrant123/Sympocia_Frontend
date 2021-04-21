import React,{useState} from "react";
import styled from "styled-components";
import Creation from "../Creation.js";
import SelectedPost from "./SelectedPost.js";
import Replies from "./Replies.js";
import ZoomedPostImageOrVideoPortal from "../../../../../GeneralComponents/PostComponent/ZoomedInPostImageOrVideo.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
`;

const BackButtonCSS={
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
  cursor:"pointer"
}


const BeaconPostExtended=({closeExtendedBeaconModal,postData,postType})=>{
	console.log(postData);
	const [displaySelectedPost,changeDisplaySelectedPost]=useState(true);
	const [displayZoomedInPostPortal,changeDisplayZoomedInPostPortal]=useState(false);

	const closeCreationModal=()=>{
		changeDisplaySelectedPost(true);
	}

	const updateBeaconPosts=()=>{

	}

	const displayZoomedPost=()=>{
		changeDisplayZoomedInPostPortal(true);
	}

	const closeZoomedInPostModal=()=>{
		changeDisplayZoomedInPostPortal(false);
	}
	return(
		<Container>
			{displayZoomedInPostPortal==true &&(
				<ZoomedPostImageOrVideoPortal
					targetDom={"extendedSymposiumContainer"}
					closeModal={closeZoomedInPostModal}
					postUrl={postType!="Images"?postData.videoUrl:postData.imgUrl}
					postType={postType}
				/>
			)}
			<div onClick={()=>closeExtendedBeaconModal()} style={BackButtonCSS}>
				Back
			</div>
			{displaySelectedPost==true?
				<React.Fragment>
					<SelectedPost
						post={postData}
						postType={postType}
						displayZoomedPost={displayZoomedPost}
					/>
					<Replies
						postType={postType}
					/>
				</React.Fragment>
				:<Creation
					closeCreationModal={closeCreationModal}
					updateBeaconPosts={updateBeaconPosts}
				/>
			}
		</Container>
	)
}

export default BeaconPostExtended;
