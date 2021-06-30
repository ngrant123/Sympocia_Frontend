import React,{useState} from "react";
import styled from "styled-components";
import {deletePost} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";
import {PostConsumer} from "../../../Posts/PostsContext.js";

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"4%",
  cursor:"pointer",
  width:"30%"
}

const DeletePost=({closeModal,postId,postType,selectedSymposiumCategory,triggerCloseModalCompletely})=>{
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isProcessing,changeIsProcessing]=useState(false);

	console.log(closeModal);
	console.log(postId);

	const handleDeletePost=async({isAccessTokenUpdated,updatedAccessToken,removePostFromStack})=>{
		/*
			Right now since Im not querying by industries but by the actual post schema itself there is no need
			to remove it by symposium should be refactored as a whole later though
		*/
		changeIsProcessing(true);
		const removedPost={
			postType,
			postId,
			industriesUploaded:[],
			profileId:personalInformation.id,
			isCrownedPost:false,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}

		const {confirmation,data}=await deletePost(removedPost); 
		if(confirmation=="Success"){
			alert('The post has been deleted. Please close the post screen.');
			removePostFromStack(postId,selectedSymposiumCategory);
			triggerCloseModalCompletely();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						handleDeletePost,
						dispatch,
						{
							removePostFromStack
						},
						false
					);
			}else{
				alert('Unfortunately there has been an error deleting this post. Please try again');
			}
		}
		changeIsProcessing(false);
	}

	return(
		<PostConsumer>
			{symposiumPostInformation=>{
				return(
					<React.Fragment>
						<div onClick={()=>closeModal()} style={ButtonCSS}>
							Back
						</div>
						<div style={{marginTop:"5%"}}>
							<p>Are you sure you want to delete this post?</p>
							{isProcessing==true?
								<p>Processing...</p>:
								<div style={{display:"flex",flexDirection:"row"}}>
									<div onClick={()=>handleDeletePost({
														isAccessTokenUpdated:false,
														removePostFromStack:symposiumPostInformation.removePostFromStack
													})} style={ButtonCSS}>
										Yes
									</div>

									<div onClick={()=>closeModal()} style={ButtonCSS}>
										No
									</div>
								</div>
							}
						</div>
					</React.Fragment>
				)
			}}
		</PostConsumer>
	)
}


export default DeletePost;