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

	const [displaySelectedPost,changeDisplaySelectedPost]=useState(true);
	const [displayExtendReplyBeacon,changeDisplayReplyBeacon]=useState(false);
	const [displayZoomedInPostPortal,changeDisplayZoomedInPostPortal]=useState(false);
	const [selectedPostData,changeSelectedPostData]=useState(postData);
	const [replies,changeReplies]=useState([
		{
			firstName:"Lu",
			caption:"yessir lol"
		}
	])

	const closeCreationModal=()=>{
		changeDisplaySelectedPost(true);
	}

	const updateBeaconPosts=(beaconPostType,beacon)=>{
		if(beaconPostType==postType){
			replies.splice(0,1,beacon);
			changeReplies([...replies]);
			
		}
		closeCreationModal();
	}

	const displayZoomedPost=()=>{
		changeDisplayZoomedInPostPortal(true);
	}

	const closeZoomedInPostModal=()=>{
		changeDisplayZoomedInPostPortal(false);
	}

	const enableCreationPost=()=>{
		changeDisplaySelectedPost(false);
	}
	const triggerCloseModal=()=>{
		if(displayExtendReplyBeacon==true){
			changeSelectedPostData(postData);
			changeDisplayReplyBeacon(false);
		}else{	
			closeExtendedBeaconModal()
		}
	}
	const displayZoomedReplyPost=(data)=>{
		changeSelectedPostData(data);
		changeDisplayReplyBeacon(true);
	}
	return(
		<Container>
			{displayZoomedInPostPortal==true &&(
				<ZoomedPostImageOrVideoPortal
					targetDom={"extendedSymposiumContainer"}
					closeModal={closeZoomedInPostModal}
					postUrl={postType!="Images"?selectedPostData.videoUrl:selectedPostData.imgUrl}
					postType={postType}
				/>
			)}
			{displaySelectedPost==true &&(
				<div onClick={()=>triggerCloseModal()} style={BackButtonCSS}>
					Back
				</div>
			)}
			{displaySelectedPost==true?
				<React.Fragment>
					<SelectedPost
						post={selectedPostData}
						postType={postType}
						displayZoomedPost={displayZoomedPost}
					/>
					{displayExtendReplyBeacon==false &&(
						<Replies
							postType={postType}
							enableCreationPost={enableCreationPost}
							replies={replies}
							displayZoomedReplyPost={displayZoomedReplyPost}
						/>
					)}
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
