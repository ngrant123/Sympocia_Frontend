import React from "react";
import AudioPostModal from "../FeaturesPosts/AudioPostModal.js";
import RegularPostModal from "../FeaturesPosts/RegularPostModal.js";
import VideoPostModal from "../FeaturesPosts/VideoPostModal.js";
import styled from "styled-components";
import ImagePostModal from "../FeaturesPosts/ImagePostModal.js";
import {createPortal} from "react-dom";
import {SymposiumConsumer} from "../../../SymposiumContext.js";
import {
	deleteSpecificSymposiumAnswer
} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useDispatch} from "react-redux";


const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:40;
	left:30%;
	top:20%;
	overflow-y:scroll;

	
	@media screen and (max-width:1370px){
		width:80%;
		left:10%;
	}
	@media screen and (max-width:600px){
		left:5%;
		height:80%;
		width:90%;
	}
`;


const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;


const ModalDecider=({closeModal,modalType,symposium,questionIndex,symposiumId,question,selectedPostId})=>{
	const dispatch=useDispatch();
	const modalDecider=(symposiumInformation)=>{
		console.log(symposiumInformation);
		debugger;
		const postModalProps={
			symposium,
			modalType,
			questionIndex,
			question,
			symposiumId,
			selectedPostId,
			isOligarch:symposiumInformation.isOligarch,
			deleteSpecificSymposiumAnswerTrigger
		}
		console.log(symposiumInformation.isOligarch);
		console.log(postModalProps.isOligarch)
		if(modalType=="Image"){
			return <ImagePostModal
						{...postModalProps}
					/>
		}else if(modalType=="Video"){
			return <VideoPostModal
						{...postModalProps}
					/>
		}else if(modalType=="RegularPost"){
			return <RegularPostModal
						{...postModalProps}
					/>
		}else{
			return <AudioPostModal
						{...postModalProps}
					/>
		}
	}

	const deleteSpecificSymposiumAnswerTrigger=async({
			selectedIndex,
			changePosts,
			posts,
			selectedPost,
			updatedAccessToken,
			isAccessTokenUpdated,
			postLevel,
			personalInformation})=>{

		const {_id}=selectedPost;
		const {confirmation,data}=await deleteSpecificSymposiumAnswer({
											postType:modalType,
											symposiumId,
											symposiumQuestionId:selectedPostId,
											symposiumAnswerId:_id,
											postAnswerLevel:postLevel,
											userId:personalInformation.id,
											accessToken:isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken
										})

		if(confirmation=="Success"){
			posts.splice(selectedIndex,1);
			changePosts([...posts]);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						deleteSpecificSymposiumAnswerTrigger,
						dispatch,
						{
							selectedIndex,
							changePosts,
							posts,
							selectedPost,
							postLevel,
							personalInformation
						},
						false
					);
			}else{
				alert('Unfortunately there has been an error when trying to add your post. Please try again');
			}
		}
	}
	return createPortal(
		<SymposiumConsumer>
			{symposiumInformation=>{
				return(
					<React.Fragment>
						<ShadowContainer
							onClick={()=>closeModal()}
						/>
						<Container>
							{modalDecider(symposiumInformation)}
						</Container>
					</React.Fragment>
				)
			}}
		</SymposiumConsumer>

	,document.getElementById("extendedSymposiumContainer"));
}
export default ModalDecider;