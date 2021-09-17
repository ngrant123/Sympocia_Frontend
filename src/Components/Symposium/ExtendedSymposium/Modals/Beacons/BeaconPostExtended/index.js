import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Creation from "../Creation.js";
import SelectedPost from "./SelectedPost.js";
import {retrieveBeaconReplies} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import BeaconPosts from "../BeaconPosts.js";

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


const BeaconPostExtended=({
	closeExtendedBeaconModal,
	postData,
	postType,
	symposiumId,
	ownerId,
	isGuestProfile,
	isOligarch,
	deletedBeacon,
	targetDom,
	updateBeaconAnsweredStatus,
	updateBeaconUpdatedStatus
})=>{

	debugger;
	const [displaySelectedPost,changeDisplaySelectedPost]=useState(true);
	const [displayExtendReplyBeacon,changeDisplayReplyBeacon]=useState(false);
	const [selectedPostData,changeSelectedPostData]=useState(postData);
	const [replies,changeReplies]=useState([])
	const [beaconCounter,changeBeaconCounter]=useState(0);
	const [isLoadingReplies,changeIsLoadingReplies]=useState(false);
	const [endOfNewPosts,changeIsEndOfNewPosts]=useState(false);
	const [isFetchingNextPosts,changeIsFetchingNextPosts]=useState(false);
	const [displayReplies,changeDisplayReplies]=useState(false);
	const [currentPostToken,changeCurrentPostToken]=useState();

	const props={
		postType,
		isOligarch,
		beaconOwnerId:selectedPostData.post.owner._id,
		symposiumId,
		beaconId:selectedPostData.beaconId
	}

	const uuidv4=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	useEffect(()=>{
		const postToken=uuidv4();
		changeCurrentPostToken(postToken);
	},[]);
	const closeCreationModal=()=>{
		changeDisplayReplies(true);
	}

	const updateBeaconPosts=(beaconPostType,beacon)=>{
		if(beaconPostType==postType){
			replies.splice(0,0,beacon);
			changeReplies([...replies]);
		}
		if(updateBeaconAnsweredStatus!=null){
			updateBeaconAnsweredStatus();
		}
		closeCreationModal();
	}

	const enableCreationPost=()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			changeDisplaySelectedPost(false);
		}
	}
	const triggerCloseModal=()=>{
		if(displayExtendReplyBeacon==true){
			changeSelectedPostData(postData);
			changeDisplayReplyBeacon(false);
			changeDisplayReplies(true);
		}else if(displayReplies==true){
			changeDisplayReplies(false);
		}else{
			closeExtendedBeaconModal()
		}
	}
	const displayZoomedReplyPost=(data)=>{
		changeSelectedPostData(data);
		changeDisplayReplyBeacon(true);
		changeDisplayReplies(false);
	}

	const fetchReplies=async(increaseCounterIndicator)=>{
		if(increaseCounterIndicator==null)
			changeIsLoadingReplies(true);

		changeIsFetchingNextPosts(true);
		let counter=beaconCounter;
		if(increaseCounterIndicator==true){
			counter+=1;
		}
		debugger;
		const {confirmation,data}=await retrieveBeaconReplies(
											symposiumId,
											postType,
											selectedPostData.beaconId,
											currentPostToken,
											ownerId
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
		changeDisplayReplies(true);
	}
	const deleteBeaconPost=()=>{
		deletedBeacon();
		triggerCloseModal();
	}

	const triggerBeaconUpdateStatus=(beaconId,beaconUpdateAcceptStatus)=>{
		debugger;
		let beaconReplies=replies;
		for(var i=0;i<beaconReplies.length;i++){

			if(beaconReplies[i].beaconId==selectedPostData.beaconId){
				beaconReplies[i]={
					...beaconReplies[i],
					acceptedAnswerStatus:beaconUpdateAcceptStatus
				}
				break;
			}
		}
		changeReplies([...beaconReplies])
		updateBeaconUpdatedStatus(beaconId,beaconUpdateAcceptStatus);
	}

	return(
		<Container>
			{displaySelectedPost==true &&(
				<div onClick={()=>triggerCloseModal()} style={BackButtonCSS}>
					Back
				</div>
			)}
			{displaySelectedPost==true?
				<React.Fragment>
					{displayReplies==false?
						<SelectedPost
							post={selectedPostData.post}
							acceptedStatus={selectedPostData.acceptedAnswerStatus}
							enableCreationPost={enableCreationPost}
							fetchReplies={fetchReplies}
							deleteBeaconPost={deleteBeaconPost}
							isReplyBeacon={displayExtendReplyBeacon}
							targetDom={targetDom}
							originalBeaconId={postData.beaconId}
							originalBeaconOwnerId={postData.post.owner._id}
							updateBeaconUpdatedStatus={triggerBeaconUpdateStatus}
							{...props}
						/>:
						<BeaconPosts
							posts={replies}
							displayExtendedPostModal={displayZoomedReplyPost}
							endOfNewPosts={endOfNewPosts}
							isFetchingNextPosts={isFetchingNextPosts}
							triggerAlterPosts={fetchReplies}
							isReplyBeacons={true}
							{...props}
						/>
					}
				</React.Fragment>
				:<Creation
					closeCreationModal={closeCreationModal}
					updateBeaconPosts={updateBeaconPosts}
					beaconResponseDesignatedPostType={postType}
					beaconId={selectedPostData.beaconId}
					ownerId={ownerId}
					symposiumId={symposiumId}
					beaconOwnerId={selectedPostData.post.owner._id}
					originalBeaconPostId={selectedPostData.post._id}
				/>
			}
		</Container>
	)
}

export default BeaconPostExtended;
