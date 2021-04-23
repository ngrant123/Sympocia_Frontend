import React,{useState} from "react";
import styled from "styled-components";
import Creation from "../Creation.js";
import SelectedPost from "./SelectedPost.js";
import Replies from "./Replies.js";
import ZoomedPostImageOrVideoPortal from "../../../../../GeneralComponents/PostComponent/ZoomedInPostImageOrVideo.js";
import {retrieveBeaconReplies} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";

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


const BeaconPostExtended=({closeExtendedBeaconModal,postData,postType,symposiumId,ownerId})=>{

	const [displaySelectedPost,changeDisplaySelectedPost]=useState(true);
	const [displayExtendReplyBeacon,changeDisplayReplyBeacon]=useState(false);
	const [displayZoomedInPostPortal,changeDisplayZoomedInPostPortal]=useState(false);
	const [selectedPostData,changeSelectedPostData]=useState(postData);
	const [replies,changeReplies]=useState([])
	const [beaconCounter,changeBeaconCounter]=useState(0);
	const [isLoadingReplies,changeIsLoadingReplies]=useState(false);
	const [endOfNewPosts,changeIsEndOfNewPosts]=useState(false);
	const [isFetchingNextPosts,changeIsFetchingNextPosts]=useState(false);



	const closeCreationModal=()=>{
		changeDisplaySelectedPost(true);
	}

	const updateBeaconPosts=(beaconPostType,beacon)=>{
		debugger;
		if(beaconPostType==postType){
			replies.splice(0,0,beacon);
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
		debugger;
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

	const fetchReplies=async(increaseCounterIndicator)=>{
		debugger;
		if(increaseCounterIndicator==null)
			changeIsLoadingReplies(true);

		changeIsFetchingNextPosts(true);
		let counter=beaconCounter;
		if(increaseCounterIndicator==true){
			counter+=1;
		}
		const {confirmation,data}=await retrieveBeaconReplies(
											symposiumId,
											postType,
											counter,
											postData.beaconId
										);
		if(confirmation=="Success"){
			const {message}=data;
			let newPosts;
			if(counter>0){
				if(message.length==0){
					changeIsEndOfNewPosts(true);
				}
				newPosts=replies.concat(message)
			}else{
				newPosts=message;
			}

			changeReplies([...newPosts]);
			changeBeaconCounter(counter);
		}else{
			alert("Error retrieving beacon replies");
		}
		changeIsLoadingReplies(false);
		changeIsFetchingNextPosts(false);
	}
	return(
		<Container>
			{displayZoomedInPostPortal==true &&(
				<ZoomedPostImageOrVideoPortal
					targetDom={"extendedSymposiumContainer"}
					closeModal={closeZoomedInPostModal}
					postUrl={postType!="Images"?
								selectedPostData.post.videoUrl:
								selectedPostData.post.imgUrl}
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
						post={selectedPostData.post}
						postType={postType}
						displayZoomedPost={displayZoomedPost}
					/>
					{displayExtendReplyBeacon==false &&(
						<Replies
							postType={postType}
							enableCreationPost={enableCreationPost}
							replies={replies}
							displayZoomedReplyPost={displayZoomedReplyPost}
							fetchReplies={fetchReplies}
							isLoadingReplies={isLoadingReplies}
							endOfNewPosts={endOfNewPosts}
							isFetchingNextPosts={isFetchingNextPosts}
						/>
					)}
				</React.Fragment>
				:<Creation
					closeCreationModal={closeCreationModal}
					updateBeaconPosts={updateBeaconPosts}
					beaconResponseDesignatedPostType={postType}
					beaconId={selectedPostData.beaconId}
					ownerId={ownerId}
					symposiumId={symposiumId}
				/>
			}
		</Container>
	)
}

export default BeaconPostExtended;
