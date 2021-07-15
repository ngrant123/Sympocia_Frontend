import React,{useState} from "react";
import styled from "styled-components";
import {createRegularPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {PostConsumer} from "../../Posts/PostsContext.js";
import {getProfilePicture} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

const PrimaryInputContainer=styled.textarea`
	position:relative;
	resize:none;
	width:100%;
	height:200px;
	padding:10px;
	border-stlye:solid;
	border-width:1px;
	border-radius:5px;
	border-color:#E0E0E0;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
`;

const SubmitButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginTop:"5%",
  width:"30%"
}


const RegularPostUpload=({selectedCategoryType,currentSymposiumName,isMobileUi,closeModal})=>{
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isProcessing,changeIsProcessing]=useState(false);

	const submit=async({isAccessTokenUpdated,updatedAccessToken,pushToStackTrigger})=>{
		const post=document.getElementById("primaryTextValue").value;
		if(post==""){
			alert('Please fill in the post section to submit');
		}else{
			changeIsProcessing(true);
			let searchCriteriaObject={
				post,
				industryArray:[{
					industry:currentSymposiumName,
					subIndustry:[]
				}],
				videoCommentPool:[],
				regularCommentPool:[],
				isAudioPost:null,
				isCrownedPost:false,
				isPostAuthentic:{
					numOfApprove:[],
					numOfDisapprove:[]
				},
				symposiumUploadCategory:selectedCategoryType
			}

			const {confirmation,data}=await createRegularPost(
										personalInformation.id,
										searchCriteriaObject,
										"Personal",
										isAccessTokenUpdated==true?updatedAccessToken:
										personalInformation.accessToken
									);	
			if(confirmation=="Success"){
				const {message}=data;
				searchCriteriaObject={
					...searchCriteriaObject,
					_id:message,
					owner:{
						_id:personalInformation.id
					}
				}
				constructDummyPost(searchCriteriaObject,pushToStackTrigger);
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							submit,
							dispatch,
							{},
							false
						);
				}else{
					alert('Unfortunately there has been an error creating this post. Please try again');
				}
			}
			changeIsProcessing(false);
		}
	}

	const constructDummyPost=async(searchCriteriaObject,pushToStackTrigger)=>{
		const {confirmation,data}=await getProfilePicture(personalInformation.id);
		const date=new Date();
		const dateInMill=date.getTime();
		var newRegularObject={
			...searchCriteriaObject,
			industriesUploaded:searchCriteriaObject.industryArray.length==0?
			[{industry:"General",subIndustry:[]}]:searchCriteriaObject.industryArray,
			comments:{
				regularComments:[],
				videoComments:[]
			},
			owner:{
				_id:personalInformation.id,
				firstName:personalInformation.firstName,
				profilePicture:data
			},
			datePosted:dateInMill
		}	
		pushToStackTrigger(newRegularObject);
		closeModal();
	}

	return(
		<PostConsumer>
			{postsContext=>{
				return(
					<div style={{width:"100%"}}>
						<PrimaryInputContainer
							id="primaryTextValue"
							placeholder="Enter post"
						/>
						{isProcessing==true?
							<p>Processing...</p>:
							<div onClick={()=>submit({
								isAccessTokenUpdated:false,
								pushToStackTrigger:postsContext.pushDummyPlaceholderPostToStack
							})} style={SubmitButtonCSS}>
								Submit
							</div>
						}
					</div>
				)
			}}
		</PostConsumer>
	)
}


export default RegularPostUpload;