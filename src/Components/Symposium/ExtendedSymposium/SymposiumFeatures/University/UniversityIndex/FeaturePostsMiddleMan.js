import React from "react";
import {AudioPostModal} from "../UniversityPosts/AudioPostModal.js";
import {RegularPostModal} from "../UniversityPosts/RegularPostModal.js";
import {VideoPostModal} from "../UniversityPosts/VideoPostModal.js";
import styled from "styled-components";
import {ImagePostModal} from "../UniversityPosts/ImagePostModal.js";
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
	@media screen and (max-width:650px){
		top:0%;
		left:0%;
		height:100%;
		width:100%;

		#closeIcon{
			display:block !important;
		}
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


const ModalDecider=({closeModal,modalType,symposiumId,selectedQuestion})=>{
	debugger;
	const dispatch=useDispatch();
	const modalDecider=(symposiumInformation)=>{
		const postModalProps={
			modalType,
			selectedQuestion,
			symposiumId,
			isOligarch:symposiumInformation.isOligarch,
			deleteSpecificSymposiumAnswerTrigger
		}
		if(modalType=="Image"){
			return <ImagePostModal
						{...postModalProps}
					/>
		}else if(modalType=="Video"){
			return <VideoPostModal
						{...postModalProps}
					/>
		}else if(modalType=="RegularPost" || modalType=="Text"){
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
											symposiumQuestionId:selectedQuestion.questionId,
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
							<div id="closeIcon" onClick={()=>closeModal()} style={{display:"none",cursor:"pointer",marginBottom:"5%"}}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
								 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
								 stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <circle cx="12" cy="12" r="9" />
								  <path d="M10 10l4 4m0 -4l-4 4" />
								</svg>
							</div>
							{modalDecider(symposiumInformation)}
						</Container>
					</React.Fragment>
				)
			}}
		</SymposiumConsumer>

	,document.getElementById("extendedSymposiumContainer"));
}
export default ModalDecider;