import React,{useState} from "react";
import styled from "styled-components";
import {useDispatch,useSelector} from "react-redux";
import {createVideoPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {PostConsumer} from "../../Posts/PostsContext.js";
import {getProfilePicture} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

const PrimaryInputContainer=styled.textarea`
	position:relative;
	resize:none;
	width:320px;
	height:70px;
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

const SecondaryInputContainer=styled.textarea`
	position:relative;
	margin-top:10px;
	resize:none;
	width:320px;
	height:180px;
	padding:10px;
	border-style:solid;

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
  marginTop:"5%"
}

const VideoDivCSS={
	height:"220px",
	width:"250px",
	backgroundColor:"#222222",
	paddingTop:"5px",
	paddingBottom:"5px",
	borderRadius:"5px"
}

const VideoPostUpload=({selectedCategoryType,currentSymposiumName,isMobileUi,closeModal})=>{
	const [videoUrl,changeVideoUrl]=useState();
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isProcessing,changeIsProcessing]=useState(false);

	const handeUploadVideo=()=>{
		const reader=new FileReader();
		const uploadedFile=document.getElementById("uploadVideoFile").files[0];
		const maxFileSize=15*1024*1024;
		if(uploadedFile.size>maxFileSize){
			alert('The file you selected is too large. As of right now we only accept files of size 15MB for videos. Sorry for the inconvenience.');
		}else{
			reader.onloadend=()=>{
				const videoBase64Url=reader.result;
				changeVideoUrl(videoBase64Url);
			}
			if(uploadedFile!=null){
				reader.readAsDataURL(uploadedFile);
			}
		}
	}
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
	const submit=async({isAccessTokenUpdated,updatedAccessToken,pushToStackTrigger})=>{
		const currentVideoTitle=document.getElementById("primaryTextValue").value;
		const currentVideoDescription=document.getElementById("secondaryTextValue").value;

		if(videoUrl==null){
			alert('Please enter a video url');
		}else{
			alert('Your video is processing. We wil notify via email and on here when your post is uploaded :). You can close this screen now');
			changeIsProcessing(true);
			let searchVideoResult={
				title:currentVideoTitle,
				description:currentVideoDescription,
				industriesUploaded:[{
					industry:currentSymposiumName,
					subIndustry:[]
				}],
				videoCommentPool:[],
				regularCommentPool:[],
				videoUrl,
				videoDescription:null,
				audioDescription:null,
				isCrownedPost:false,
				isPhoneUIEnabled:isMobileUi,
				symposiumUploadCategory:selectedCategoryType
			}

			const {confirmation,data}=await createVideoPost(
									personalInformation.id,
									searchVideoResult,
									"Personal",
									isAccessTokenUpdated==true?updatedAccessToken:
									personalInformation.accessToken
								);
			if(confirmation=="Success"){
				searchVideoResult={
					...searchVideoResult,
					isPostAuthentic:{
						numOfApprove:[],
						numOfDisapprove:[]
					},
					owner:{
						_id:personalInformation.id,
						firstName:personalInformation.firstName
					},
					_id:data.message,
					key:uuidv4()
				}
				constructPlaceHolderPost(searchVideoResult,pushToStackTrigger);

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

	const constructPlaceHolderPost=async(searchCriteriaObject,pushToStackTrigger)=>{
		const {confirmation,data}=await getProfilePicture(personalInformation.id);

		const dateInMill=new Date().getTime();
		let newVideoObject={
			...searchCriteriaObject,
			industriesUploaded:searchCriteriaObject.industriesUploaded.length==0?
			[{industry:"General",subIndustry:[]}]:searchCriteriaObject.industriesUploaded,
			comments:[],
			datePosted:dateInMill,
			owner:{
				...searchCriteriaObject.owner,
				profilePicture:data
			}
		}
		pushToStackTrigger(newVideoObject);
		closeModal();
	}
	return(
		<PostConsumer>
			{postsContext=>{
				return(
					<React.Fragment>
						<div style={{marginRight:"3%"}}>
							{videoUrl==null?
								<input type="file" accept="video/mp4,video/x-m4v,video/*" name="img" style={{marginBottom:"5%"}}
									 id="uploadVideoFile" onChange={()=>handeUploadVideo()}>
								</input>:
								<div id="videoDiv" style={VideoDivCSS}>
								    <video key={uuidv4()} width="100%" height="100%" borderRadius="50px" controls autoplay="true">
										<source src={videoUrl} type="video/mp4"/>
									</video>
								</div>
							}
						</div>
						<div style={{display:"flex",flexDirection:"column"}}>
							<PrimaryInputContainer id="primaryTextValue" placeholder="Enter title"/>
							<SecondaryInputContainer id="secondaryTextValue" placeholder="Enter description"/>

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
					</React.Fragment>
				)
			}}
		</PostConsumer>
	)
}


export default VideoPostUpload;