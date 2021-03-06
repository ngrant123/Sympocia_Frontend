import React,{useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import styled from "styled-components";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import FormatItalicOutlinedIcon from '@material-ui/icons/FormatItalicOutlined';
import FormatBoldOutlinedIcon from '@material-ui/icons/FormatBoldOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import {
		createRegularPost,
		editPost
	} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";


import SendIcon from '@material-ui/icons/Send';
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import IndustryPostOptions from "../../IndustryPostOptions.js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw} from 'draft-js';

import BorderColorIcon from '@material-ui/icons/BorderColor';
import MicIcon from '@material-ui/icons/Mic';
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';
import CrownPostModal from "../../CrownPost.js";

import {PostConsumer} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/PostsContext.js";
import AudioCreation from "./AudioCreation.js";
import TextCreation from "./TextCreation.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";

const Container = styled.div`
	position:fixed;
	padding:45px;
	width:70%;
	border-radius:5px;
	top:20%;
	left:20%;
	height:70%;
	background-color:white;
	overflow:scroll;
	z-index:35;

	#symposiumCategoryOptionsHR{
		display:none !important;
	}

	@media screen and (min-width:2500px){
		#postOption{
			font-size:36px !important;
		}
	}

	@media screen and (max-width:1370px){
		left: 10% !important;
    	width: 80% !important;

    	#symposiumPostOptions{
			margin-left:0% !important;
		}
	}


	@media screen and (max-width:650px){
		left:0% !important;
		width:100% !important;
		height:100%;
		top:0%;

		#closeModalButton{
			margin-left:-10% !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:750px) 
        and (min-height:600px) and (max-height:1039px){
        
		#symposiumPostOptions{
			margin-left:-5% !important;
		}
		#closeModalButton{
			margin-left:0% !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		left:0% !important;
		width:100% !important;
		height:100%;
		top:0%;
		#symposiumPostOptions{
			margin-left:0% !important;
		}
		#closeModalButton{
			margin-left:0% !important;
		}
    }
`;

const TextArea=styled.div`
	position:relative;
	width:100%;
	background-color:#fefdff;
	resize:none;
	outline:none;
	border-radius:5px;
	border-style:none;
	box-shadow:1px 1px 5px #9395a0;
	font-size:15px;
	padding:40px;
	overflow:hidden;
	z-index:1;
	display:flex-wrap;
`;

const ProfilePicture=styled.div`
	position:relative;
	width:70px;
	height:17%;
	background-color:blue;
	border-radius:50%;
	border-style:solid;
	border-color:#5298F8;
	border-width:3px;

`;

const CameraModal=styled.div`

	position:absolute;
	top:20%
	width:100%;
	height:100%;
	z-index:3;
	visibility:hidden;
`;

const PhotoButton=styled.div`
	position:absolute;
	z-index:3;
	width:5%;
	top:55%;
	left:45%;
	height:10%;
	border-radius:50%;
	background-color:red;

`;

const Photo=styled.div`
	position:absolute;
	top:20%
	width:100%;
	height:100%;
	z-index:3;
	visibility:hidden;
`;

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
  marginRight:"5%",
  marginBottom:"5%",
  cursor:"pointer"
}

/*
	 Right now the plan for the future is to incorporate the blog post options into the text field 
	 but right now a simple textfield will have to do
*/

 const RegularPostCreation=(props)=>{

	const [selectecIndustry,changeSelectedIndustry]=useState("");
	const [subCommunities,changeSubCommunity]=useState([]);
	const [selectedSubCommunity,changeSelectedSubCommunity]=useState("");

	const [industriesSelected,changeIndustriesSelected]=useState([]);
	const [subIndustriesSelected,changeSubIndustriesSelected]=useState([]);
	const dispatch=useDispatch();
	const {personalInformation}=useSelector(state=>state);


	const [displayAudioORTextScreen,changeAudioOrTextScreenChoice]=useState(true);
	const [displayAudioPostOption,changeDisplayAudioPostOption]=useState(false);

	const [audioDescription,changeAudioDescription]=useState();
	const [textDescription,changeTextDescription]=useState();

	const [createRegularPostDescription,changeRegularPostDescription]=useState();
	const [isCrownedPost,changeIsPostCrowned]=useState(false);
	const [displayCrownModalIndicator,changeCrownIndicatorModal]=useState(false);
	const [isPreviousDataLoaded,changeIsPreviousDataLoaded]=useState(false);

	const [crownPostColor,changeCrownPostColor]=useState("#D6C5F4");
	const [crownPostBackgroundColor,changeCrownPostBackgroundColor]=useState("white");
	const [contextInformation,changeContextInformation]=useState();
	const [isSubmittedAndProcessing,changeIsSubmittedAndProcessing]=useState(false);
	const [isSymposiumsAltered,changeIsSymposiumsAltered]=useState(false);
	const [symposiumCategoryUploaded,changeSymposiumCategoryUploaded]=useState();

	useEffect(()=>{
		
		if(isPreviousDataLoaded==true)
			sendRegularPost({contextInformation,isAccessTokenUpdated:false});
	},[audioDescription,textDescription]);

	useEffect(()=>{
		
		const {previousData}=props;
		if(previousData!=null){
			var {
				post,
				isAudioPost,
				isCrownedPost
			}=previousData;
			changeAudioOrTextScreenChoice(false);
			changeIsPostCrowned(isCrownedPost);

			if(isAudioPost==false || isAudioPost==null){
				changeRegularPostDescription(true);
			}else{
				changeRegularPostDescription(false);
			}
		}
		changeIsPreviousDataLoaded(true);

	},[]);

	const alterSelectedIndustry=(selectedIndustries)=>{
		changeIsSymposiumsAltered(true);
		changeIndustriesSelected(selectedIndustries);
	}

	const alterSelectedSubCommunities=(selectedSubCommunities)=>{
		changeSubIndustriesSelected(selectedSubCommunities);
	}

	const sendRegularPost=async({profilePostInformation,isAccessTokenUpdated,updatedAccessToken})=>{
		
		changeIsSubmittedAndProcessing(true);
		const searchCriteriaIndustryArray=[];
		let currentPost=audioDescription!=null?audioDescription:textDescription
		const industries=industriesSelected;
		const isPostCrowned=isCrownedPost==undefined?false:isCrownedPost;
		const selectedSubCommunities=subIndustriesSelected; 
		const currentSymposiumUploadCategory=symposiumCategoryUploaded==null?"The Grind":symposiumCategoryUploaded;


		var counter=0;
		for(var i=0;i<industries.length;i++){
			var {subCommunity}=industries[i];
			var addIndustryOrIndustryObject=false;
			var subCommunitiyArray=[];
			var subCommunityCounter=0;

			if(subCommunity!=null){
				while(subCommunityCounter<subCommunity.length){
					const targetedSubCommunity=subCommunity[subCommunityCounter];
					if(targetedSubCommunity.industry==selectedSubCommunities[counter]){
						subCommunitiyArray.push(selectedSubCommunities[counter]);
						counter++;
						subCommunityCounter=0;
					}else{
						subCommunityCounter++;
					}
				}
			}
			const searchObject={
				industry:industries[i].industry,
				subIndustry:subCommunitiyArray,
				isSwimmingTriggeredForPost:false,
				isSymposiumUploadedToViaSwimming:false
			}
			searchCriteriaIndustryArray.push(searchObject);
		}
		let searchCriteriaObject={
			post:currentPost,
			industryArray:searchCriteriaIndustryArray,
			isAudioPost:(audioDescription==null)?null:true,
			isCrownedPost:isCrownedPost,
			isPostAuthentic:{
				numOfApprove:[],
				numOfDisapprove:[]
			},
			videoCommentPool:[],
			regularCommentPool:[],
			symposiumUploadCategory:currentSymposiumUploadCategory,
			key:uuidv4()
		}

		if(props.previousData==null){
			const {id}=personalInformation;
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
				pushDummyRegularPostObjectToProfile(contextInformation,searchCriteriaObject);
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							sendRegularPost,
							dispatch,
							{profilePostInformation},
							false
						);
				}else{
					alert('Unfortunately there has been an error creating this post. Please try again');
					changeIsSubmittedAndProcessing(false);
				}
			}
		}else{
			
			const {previousData}=props;
			let currentAudioDescription;
			let {
				post,
				isAudioPost,
				audioDescription,
				isCrownedPost,
				industriesUploaded,
				_id,
				symposiumUploadCategory
			}=previousData;

			const editedRegularPost={
				postType:"RegularPosts",
				postId:_id,
				post:{
					industriesUploaded:isSymposiumsAltered==true?searchCriteriaIndustryArray:null,
					isCrownedPost:isPostCrowned!=isCrownedPost?isPostCrowned:null,
					post:currentPost!=post?currentPost:null,
					symposiumUploadCategory:currentSymposiumUploadCategory!=symposiumUploadCategory?currentSymposiumUploadCategory:null
				},
				postS3:[
					{
						optionType:'audioPost',
						newUrl:isAudioPost==true?(currentPost!=audioDescription?currentPost:null):null
					}
				],
				ownerId:personalInformation.id,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
				personalInformation.accessToken
			}

 			const {confirmation,data}=await editPost(editedRegularPost);
 			
			if(confirmation=="Success"){
				alert('Your post has been edited. Please reload your profile to see your updated post.')
				props.previousData.contextLocation.editPost(editedRegularPost);
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							sendRegularPost,
							dispatch,
							{profilePostInformation},
							false
						);
				}else{
					alert('Unfortunately there has been an error editing this post. Please try again');
					changeIsSubmittedAndProcessing(false);
				}
			}
		}
	}

	const isArrayEqual=(arr1,arr2)=>{
		
		let isArrayEqualIndicator=true;

		if(arr1.length!=arr2.length)
			return false;
		else{
			let arr1Map=new Map();

			arr1.forEach((iteratedIndustry,i)=>{
				const {industry,subIndustry}=iteratedIndustry;
				let subArr1Map=new Map();

				subIndustry.forEach((selectedSubIndustry,j)=>{
					subArr1Map.set(selectedSubIndustry,1);
				})
				arr1Map.set(industry,subArr1Map);
			});

			arr2.forEach((selectedIndustry,index)=>{
				
				var testing=arr1Map.has(selectedIndustry.industry);
				if(arr1Map.has(selectedIndustry.industry)==undefined || arr1Map.has(selectedIndustry.industry)==false)
					isArrayEqualIndicator=false
				else{
					
					const {subIndustry}=selectedIndustry;

					subIndustry.forEach((selectedSubIndustry,i)=>{
						const selectedIndustryArr1=arr1Map.get(selectedSubIndustry.industry);
						if(selectedIndustryArr1.get(selectedSubIndustry.industry)==undefined)
							isArrayEqualIndicator=false
					})
				}
			})
		}
		return isArrayEqualIndicator;
	}

	const pushDummyRegularPostObjectToProfile=(profilePostInformation,searchCriteriaObject)=>{
		
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
			datePosted:dateInMill
		}
		const {isCrownedPost}=searchCriteriaObject;
		if(isCrownedPost==true){
			var regularPost=newRegularObject;
			newRegularObject={
				post:regularPost,
				isCrownedPost:true
			}
		}
		profilePostInformation.updateRegularPost(newRegularObject);
	}

	const closeModal=()=>{
		changeAudioOrTextScreenChoice(true);
	}

	const handleCreateAudioDescription=(audioDescriptionSrc)=>{
		changeAudioDescription(audioDescriptionSrc);
		changeAudioOrTextScreenChoice(true);
	}

	const diplayRegularPostCreation=()=>{
		changeAudioOrTextScreenChoice(false);
		changeRegularPostDescription(true);

	}

	const displayAudioPostCreation=()=>{
		if(props.isPhoneUIEnabled==true){
			alert('Unfortunately you can only upload voice posts on a desktop/laptop. Please switch to that to continue');
		}else{
			changeAudioOrTextScreenChoice(false);
			changeDisplayAudioPostOption(true);
		}
	}

	const closeCrownModal=()=>{
		changeIsPostCrowned(false);
		changeCrownIndicatorModal(false);
	}

	const crownPost=()=>{
		
		changeIsPostCrowned(true);
		changeCrownIndicatorModal(false);
	}

	const unCrownPost=()=>{
		

		changeIsPostCrowned(false);
		changeCrownIndicatorModal(false);
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const displayAudioORTextScreenHandle=()=>{
		changeAudioOrTextScreenChoice(true);
		changeRegularPostDescription(false);
		changeDisplayAudioPostOption(false);
	}


	const displayCrownModal=()=>{
		changeCrownIndicatorModal(true);
	}

	const sendAudioDataToParent=(response)=>{
		changeAudioDescription(response);
	}


	const sendTextDataToParent=(response)=>{
		changeTextDescription(response);
	}

	const alterSymposiumUploadedCategory=(selectedCategory)=>{
		changeSymposiumCategoryUploaded(selectedCategory);
	}


	return(
		<PostConsumer>
			{userPostsInformation=>{
				changeContextInformation(userPostsInformation);
				return <Container>
							<div id="closeModalButton" 
								onClick={()=>props.closeModal()} style={{marginTop:"0%",cursor:"pointer"}}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
								 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
								 stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <circle cx="12" cy="12" r="9" />
								  <path d="M10 10l4 4m0 -4l-4 4" />
								</svg>
							</div>
							{displayCrownModalIndicator==true?
								<CrownPostModal
									closeModal={closeCrownModal}
									parentCrownPost={crownPost}
									parentUnCrownPost={unCrownPost}
									previousData={props.previousData}
									isPostCrowned={isCrownedPost}
								/>
								:null
							}
							<ul id="postOptions" style={{padding:"10px"}}>		
								{displayAudioORTextScreen==false &&(
									<React.Fragment>
										<ul id="symposiumPostOptions" style={{padding:"0px"}}>
											<IndustryPostOptions
												alterSelectedIndustry={alterSelectedIndustry}
												alterSelectedSubCommunities={alterSelectedSubCommunities}
												symposiumsUploaded={props.previousData==null?[]:props.previousData.industriesUploaded}				
												uploadedCategorySection={props.previousData==null?null:props.previousData.symposiumUploadCategory}
												alterSymposiumUploadedCategory={alterSymposiumUploadedCategory}
											/>
										</ul>
										<hr/>
									</React.Fragment>
								)}

								<li style={{listStyle:"none",marginTop:"5%"}}>
									{displayAudioORTextScreen==true?
										<ul style={{padding:"0px"}}>
											<p id="headerCreationText" style={{fontSize:"25px"}}>
												<b>Create your own text or audio post here.</b>
											</p>
											<p id="secondaryCreationText" style={{fontSize:"15px",color:"#b3b3b3"}}>
												Everyone loves to read or listen to stuff. Everything you invent is true to you.
											</p>
											<hr style={{marginBottom:"5%"}}/>
											<li id="postOption" style={ButtonCSS} onClick={()=>diplayRegularPostCreation()}>
												<BorderColorIcon/> Write Post
											</li>
											<li id="postOption" style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												Or
											</li>
											<li id="postOption" onClick={()=>displayAudioPostCreation()} style={ButtonCSS}>
												<MicIcon/> Say Post
											</li>
										</ul>:
										<React.Fragment>
											{createRegularPostDescription==true?
												<TextCreation
													isPostCrowned={isCrownedPost}
													displayTextOrAudioScreen={displayAudioORTextScreenHandle}
													sendDataToParent={sendTextDataToParent}
													displayCrownPostModal={displayCrownModal}
													previousPost={props.previousData!=null?props.previousData.post:null}
													isSubmittedAndProcessing={isSubmittedAndProcessing}
												/>:
												<AudioCreation
													sendDataToParent={sendAudioDataToParent}
													isPostCrowned={isCrownedPost}
													displayCrownPostModal={displayCrownModal}
													displayTextOrAudioScreen={displayAudioORTextScreenHandle}
													isSubmittedAndProcessing={isSubmittedAndProcessing}
													isPreviousDataLoaded={isPreviousDataLoaded}
													audio={props.previousData!=null?props.previousData.post:null}
												/>
											}
										</React.Fragment>
									}
								</li>
							</ul>
							
						</Container>
					}}
				</PostConsumer>
			)
		}

export default RegularPostCreation;
