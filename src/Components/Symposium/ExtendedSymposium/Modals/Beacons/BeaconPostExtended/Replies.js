import React,{useState} from "react";
import styled from "styled-components";
import BeaconPosts from "../BeaconPosts.js";
import {deleteBeacon} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";


const Container=styled.div`
	position:relative;
`;
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

const DropDownCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
}

const Replies=({
				postType,
				enableCreationPost,
				replies,
				displayZoomedReplyPost,
				fetchReplies,
				isLoadingReplies,
				endOfNewPosts,
				isFetchingNextPosts,
				isOligarch,
				deleteBeaconPost,
				symposiumId,
				beaconId,
				ownerId
			})=>{
	const [isRepliesSelectionSelected,changeIsRepliesSelected]=useState(replies.length>0?true:false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	const displayExtendedPostModal=(postData)=>{
		displayZoomedReplyPost(postData);
	}
	const triggerFetchReplies=(increaseCounterIndicator)=>{
		fetchReplies(increaseCounterIndicator);
		changeIsRepliesSelected(true);
	}

	const fetchNextPosts=()=>{
		triggerFetchReplies(true)
	}

	const triggerBeaconDeletion=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const {confirmation,data}=await deleteBeacon({
			symposiumId,
			beaconId,
			beaconType:postType,
			ownerId:personalInformation.id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
			personalInformation.accessToken
		});
		if(confirmation=="Success"){
			deleteBeaconPost();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					triggerBeaconDeletion,
					dispatch,
					{},
					false
				);
			}
		}
	}

	return(
		<Container>
			{isLoadingReplies==true?
				<p>Loading...</p>:
				<React.Fragment>
					<div style={{marginLeft:"2%"}} class="dropdown">
						<button class="btn btn-primary dropdown-toggle"
						 	type="button" data-toggle="dropdown" style={DropDownCSS}>
							<p>
								<b>Beacon Actions:</b>
							</p>
						   	<span class="caret"></span>
						</button>
						<ul class="dropdown-menu" style={{padding:"10px",height:"170px",overflow:"auto"}}>
							<li style={{cursor:"pointer"}} onClick={()=>enableCreationPost()}>
								Create Response to Beacon
							</li>
							<hr/>
							<li style={{cursor:"pointer"}} onClick={()=>triggerFetchReplies()}>
								View Replies
							</li>
							<hr/>
							{(isOligarch==true || ownerId==personalInformation.id)==true &&(
								<li style={{cursor:"pointer"}} onClick={()=>triggerBeaconDeletion({isAccessTokenUpdated:false})}>
									Delete Beacon
								</li>
							)}
						</ul>
				  	</div>
				  	{isRepliesSelectionSelected==true &&(
				  		<React.Fragment>
						  	{replies.length==0?
						  		<p>No beacon replies</p>:
								<BeaconPosts
									posts={replies}
									postType={postType}
									displayExtendedPostModal={displayExtendedPostModal}
									endOfNewPosts={endOfNewPosts}
									isFetchingNextPosts={isFetchingNextPosts}
									triggerAlterPosts={fetchNextPosts}
									isReplyBeacons={true}
									isOligarch={isOligarch}
									symposiumId={symposiumId}
									beaconId={beaconId}
									ownerId={ownerId}
								/>
						  	}
				  		</React.Fragment>
				  	)}
				</React.Fragment>
			}
		</Container>
	)
}

export default Replies;
