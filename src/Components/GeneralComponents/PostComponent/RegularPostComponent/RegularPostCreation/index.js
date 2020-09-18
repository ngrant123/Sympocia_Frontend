import React,{useState,useEffect} from "react";
import {useSelector} from "react-redux";
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
import {createRegularPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";


import SendIcon from '@material-ui/icons/Send';
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import IndustryPostOptions from "../../IndustryPostOptions.js";
import {connect} from "react-redux";
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

const Container = styled.div`
	position:fixed;
	padding:40px;
	width:70%;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:20%;

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

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:60%;
	height:150px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const CrownIconContainer=styled.div`
	border-style:solid;
	border-width:2px;
	border-color:red;
	animation: glowing 1300ms infinite;
	border-radius:50%;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
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
  marginRight:"5%"
}

const RegularPostBackButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"5%",
  width:"30%",
  marginBottom:"3%"
}



/*
	 Right now the plan for the future is to incorporate the blog post options into the text field 
	 but right now a simple textfield will have to do
*/

 const RegularPostCreation=(props)=>{
	const [displayCameraModal,changeDisplayCameraModal]=useState(false);
	const [postContents,changePostContents]=useState("");

	const  [firstTimeClickIndicator,changeClickIndicator]=useState(true);
	const [displayBold,changeBold]=useState(false);
	const [displayItalics,changeItalics]=useState(false);
	const [displayCodingBlock,changeCodingBlockDisplay]=useState(false);
	const [codingBlockCounter,changeCodingBlockCounter]=useState(1);

	const [displayBulletList,changeBulletListDisplay]=useState(false);
	const[firstTimeClickBulletList,changeFirstTimeClickBullet]=useState(false);
	const [bulletListContent,changeBulletListContent]=useState({content:"",index:0,maxIndex:0,ulElement:{}});
	const[bulletListParentNode,changeBulletListParentNode]=useState();


	const [displayNumberedList,chnageNumberedBulletList]=useState(false);
	const[firstTimeClickNumberList,changeFirstTimeClickNumber]=useState(false);
	const [numberListContent,changeNumberListContent]=useState("");

	const [selectecIndustry,changeSelectedIndustry]=useState("");
	const [subCommunities,changeSubCommunity]=useState([]);
	const [selectedSubCommunity,changeSelectedSubCommunity]=useState("");

	const [industriesSelected,changeIndustriesSelected]=useState([]);
	const [subIndustriesSelected,changeSubIndustriesSelected]=useState([]);

	const {personalInformation}=useSelector(state=>state);
	const [editorState,changeEditorState]=useState();


	const [displayAudioORTextScreen,changeAudioOrTextScreenChoice]=useState(true);
	const [displayAudioPostOption,changeDisplayAudioPostOption]=useState(false);
	const [audioDescription,changeAudioDescription]=useState();

	const [createRegularPostDescription,changeRegularPostDescription]=useState();
	const [isCrownedPost,changeIsPostCrowned]=useState(false);
	const [displayCrownModalIndicator,changeCrownIndicatorModal]=useState(false);
	const [isPreviousDataLoaded,changeIsPreviousDataLoaded]=useState(false);

	console.log(props);

	useEffect(()=>{
		debugger;
		const {previousData}=props;
		if(previousData!=null){
			var {
				post,
				isAudioPost,
				isCrownedPost
			}=previousData;
			changeAudioOrTextScreenChoice(false);
			const postElement=document.getElementById("textContainer");

			if(isPreviousDataLoaded==true && audioDescription!=null){
				changeAudioOrTextScreenChoice(true);
			}else{
				if(isAudioPost!=null){
					changeDisplayAudioPostOption(true);
				}else{
					changeDisplayAudioPostOption(false);
				}

				if(postElement!=null)
					postElement.value=post;

				if(displayAudioPostOption==true)
					changeAudioDescription(previousData.audioDescription);
			}

			if(isCrownedPost==true){
				const crownElement=document.getElementById("crownIcon");
				crownElement.style.backgroundColor="#D6C5F4";
				crownElement.style.color="white";
			}
			changeIsPreviousDataLoaded(true);
		}

	})

	/*

	const displayCamera=()=>{
		if(displayCameraModal==true){
				var video=document.getElementById("video");

				if (navigator.mediaDevices.getUserMedia) {
					  navigator.mediaDevices.getUserMedia({ video: true })
					    .then(function (stream) {
					      video.srcObject = stream;
					     
					    })
				    .catch(function (error) {
				      console.log("Something went wrong!");
				    });
				}	
			}
		}

	const displayCameraModalIndicator=()=>{
			if(displayCameraModal==true){
				displayCamera();
				document.getElementById("cameraModal").style.visibility="visible";
			}
			else{
				return <React.Fragment></React.Fragment>;
			}
		}

	const stopRecording=()=>{

		var video=document.getElementById("video");
		var stream=video.srcObject;
		video.srcObject=null;
	}
	const photo=()=>{
		debugger;
		document.getElementById("cameraModal").style.visibility="hidden";

		var canvas = document.getElementById('canvas');
		 const video=document.getElementById("video");
        canvas.width  = video.offsetWidth;
        canvas.height = video.offsetHeight;

        var tempcontext = canvas.getContext("2d");
         var tempScale = (canvas.height/canvas.width);

        tempcontext.drawImage(
            video,
            0, 0,
            video.offsetWidth, video.offsetHeight
        );

        stopRecording();
        changeDisplayCameraModal(false);
        var canvasDataUrl=canvas.toDataURL();
        const canvasImage='<img src="' + canvasDataUrl + '">';
	}

	const insertPhotoIntoText=()=>{ 

	}

	const addItalics=(props)=>{
		var textArea=document.getElementById("textAreaContainer");
		var italicTextHolder=document.createElement("I");
		var textContainer;

		if(props.key=="Enter"){
			textContainer=document.createElement("br");
		}else if(props.key==" "){
			textContainer=document.createTextNode(' ');
		}
		else{
			textContainer=document.createTextNode(""+props.key);
		}

		italicTextHolder.appendChild(textContainer);
		textArea.appendChild(italicTextHolder);
		setCursorLocation(textArea,textArea.innerText.length);

	}

	const addBold=(props)=>{
		debugger;
		var textArea=document.getElementById("textAreaContainer");
        var boldTextHolder= document.createElement("strong");
        var textContainer;
        var setNewLineIndicator=false;
		if(props.key=="Enter"){
			textContainer=document.createElement("br");
			setNewLineIndicator=true;
		}else if(props.key==" "){
			textContainer=document.createTextNode('\u00A0');
		}
		else{
			textContainer=document.createTextNode(props.key);
		}

        boldTextHolder.appendChild(textContainer);
        insertTextAtCaretPosition(boldTextHolder);
		var currentCaretPosition=getCaretPosition(textArea);
		console.log(currentCaretPosition);
		setCursorLocation(textArea,currentCaretPosition,setNewLineIndicator);
	}

	const insertTextAtCaretPosition=(textNode)=>{
		debugger;
		const selection=window.getSelection();
		var range;
		if (selection.getRangeAt && selection.rangeCount){
            range = selection.getRangeAt(0);
            range.insertNode(textNode);
        }
        //textNode.focus();
	}

	const setCursorLocation=(textArea,position,newLineIndicator)=>{
		debugger;
		textArea.focus();
		var range = document.createRange();
	    var sel = window.getSelection();
	    if(newLineIndicator==false){
	    	if(position!=textArea.innerText.length && textArea.innerText.length>1){
		    	var newPosition=position;
		    	range.setStart(textArea,newPosition);
		    }
		    else{
		    	range.setStart(textArea,position);
		    }
	    }else{
	   		position+=1;
	    	range.setStart(textArea,position);
	    }

	    range.collapse(true);
	    sel.removeAllRanges();
	    sel.addRange(range);
	    textArea.focus();
	}

	const getCaretPosition=(element)=> {
	     var caretOffset = 0;
		    var doc = element.ownerDocument || element.document;
		    var win = doc.defaultView || doc.parentWindow;
		    var sel;
		    if (typeof win.getSelection != "undefined") {
		        sel = win.getSelection();
		        if (sel.rangeCount > 0) {
		            var range = win.getSelection().getRangeAt(0);
		            var preCaretRange = range.cloneRange();
		            preCaretRange.selectNodeContents(element);
		            preCaretRange.setEnd(range.endContainer, range.endOffset);
		            caretOffset = preCaretRange.toString().length;
		        }
		    } else if ( (sel = doc.selection) && sel.type != "Control") {
		        var textRange = sel.createRange();
		        var preCaretTextRange = doc.body.createTextRange();
		        preCaretTextRange.moveToElementText(element);
		        preCaretTextRange.setEndPoint("EndToEnd", textRange);
		        caretOffset = preCaretTextRange.text.length;
		    }
		    return caretOffset;
	}

	const addCodingBlock=(props)=>{
		var textArea=document.getElementById("textAreaContainer");
		var codeBlockContainer=document.createElement("span");


					if(props.key=="Enter"){
						var newLineContainer=document.createElement("br");
						var newLine=document.createTextNode(' ');
						newLineContainer.appendChild(newLine);
						textArea.appendChild(newLineContainer);
						return;

					}else{

						if(codingBlockCounter==1 || codingBlockCounter==30){


									if(codingBlockCounter==1){
										var currentCodingCounter=codingBlockCounter+1;
										changeCodingBlockCounter(currentCodingCounter);
									}else if(codingBlockCounter==30){

										changeCodingBlockCounter(2);
									}

									var newLineContainer=document.createElement("br");
									var newLine=document.createTextNode(' ');
									newLineContainer.appendChild(newLine);
									textArea.appendChild(newLineContainer);
									return;
							}
							
							else{
								var currentCodingCounter=codingBlockCounter+1;
								changeCodingBlockCounter(currentCodingCounter);

							}
					}

					var code=document.createTextNode(""+props.key);
					codeBlockContainer.style.backgroundColor="#E3CEF6";
					codeBlockContainer.style.color="white";
					
					codeBlockContainer.style.paddingTop="5px";
					codeBlockContainer.style.paddingLeft="5px";
					codeBlockContainer.style.paddingBottom="5px";

					codeBlockContainer.appendChild(code);
					textArea.appendChild(codeBlockContainer);

		 setCursorLocation(textArea,textArea.innerText.length);

	}

	Problem now is that the cursor blinknin thing is not working and 
	when a user types something it places it on the end no matter the
	location

	const addBulletList=(props)=>{
		var textArea=document.getElementById("textAreaContainer");
		var liItem;
		if(props.key=="Enter" || firstTimeClickBulletList==true){

				var textNode;
				var ulList;
				if(firstTimeClickBulletList==true){
					changeFirstTimeClickBullet(false);
				    textNode=document.createTextNode(""+props.key);
				    ulList=document.createElement('ul');
				    changeBulletListContent({...bulletListContent,content:props.key,index:0,ulElement:ulList});
				}
				else{

					textNode=document.createTextNode("");
					var nextMax=bulletListContent.maxIndex;
					nextMax+=1;
					changeBulletListContent({...bulletListContent,content:"",index:nextMax,maxIndex:nextMax});
					ulList=bulletListContent.ulElement;
				}
				
				liItem=document.createElement('li');
				liItem.appendChild(textNode);
				liItem.addEventListener("click",function(){
					console.log("Test");
					const currentIndex=getBulletLiIndex(this);
					changeBulletListContent({...bulletListContent,content:liItem.innerText,index:currentIndex});
				})

				ulList.appendChild(liItem);
				console.log("LI item parent node");
				console.log(liItem.parentNode);
				textArea.append(ulList);
				changeBulletListParentNode(liItem.parentNode);

		}else{
			var liElement=bulletListContent.ulElement.childNodes[bulletListContent.index];
			if(props.key==" "){
				changeBulletListContent({...bulletListContent,content:bulletListContent.content+"&#160;"});
				liElement.innerHTML="<li>"+bulletListContent.content+"&#160; </li>";
			}else{
				changeBulletListContent({...bulletListContent,content:bulletListContent.content+props.key});
				liElement.innerHTML="<li>"+bulletListContent.content+props.key+"</li>";
			}

			liElement.addEventListener("click",function(){		
					const currentIndex=getBulletLiIndex(this);
					changeBulletListContent({...bulletListContent,content:liElement.innerText,index:currentIndex});
				})
			}

		setCursorLocation(textArea,textArea.innerText.length);
	}

	const getBulletLiIndex=(element)=>{

		var child=element.parentNode.childNodes;
		//changeBulletListParentNode(element.parentNode);

		console.log("LI item parent node");
		console.log(element.parentNode);
		var currentIndex;

		for(var i=0;i<child.length;i++){
			if(child[i]==element){
				return i;
			}
		}
		return null;
	}

	const updatedBulletListContent=(props)=>{
		console.log("Test bullet list");
		console.log(props);

	}

	const addNumberedList=(props)=>{

		var textArea=document.getElementById("textAreaContainer");

		if(props.key=="Enter" || firstTimeClickNumberList==false){				
				var textNode;
				if(firstTimeClickNumberList==true){
					changeFirstTimeClickNumber(false);
				    textNode=document.createTextNode(""+props.key);
				}
				else{
					textNode=document.createTextNode("");
					 changeNumberListContent(numberListContent);
				}

				var ulList=document.createElement("OL");
				var liItem=document.createElement("LI");
				liItem.appendChild(textNode);
				ulList.appendChild(liItem);
				textArea.append(ulList);

		}else{
			var liElement=textArea.lastChild;
			changeNumberListContent(numberListContent+props.key);
			liElement.innerHTML="<li>"+numberListContent+props.key+"</li>";
		}
		setCursorLocation(textArea,textArea.innerText.length);
	}


	const regardLetters=(props)=>{

			if(props.key!="Enter"){
				if(displayBold==true && displayItalics==true){
					props.preventDefault();
					addBold(props);
					addItalics(props);
				}
				else if(displayItalics==true && displayBold==false){
					props.preventDefault();
					addItalics(props);

				}
				else if(displayItalics==false&& displayBold==true){
					props.preventDefault();
					addBold(props);
				}else if(displayCodingBlock==true){
					props.preventDefault();
					addCodingBlock(props);
				}else if(displayBulletList==true){
					props.preventDefault();
					addBulletList(props);
				}else if(displayNumberedList==true){
					props.preventDefault();
					addNumberedList(props);
				}
			}
			else{
				var textArea=document.getElementById("textAreaContainer");
				const currentCaretPosition=getCaretPosition(textArea);
				if(textArea.firstChild!=null){

				}
				debugger;

				//removeFontVariations(props);
				changeFirstTimeClickBullet(false);
			}
			return true;
	}
//Contains a bug where for some reason it creates a newline after the user presses enter fix later
	const removeFontVariations=(props)=>{
		var textArea=document.getElementById("textAreaContainer");

        if(props.key!="Enter"){
        	var TextHolder= document.createElement("span");
			var textContainer=document.createTextNode(""+props.key);
			TextHolder.appendChild(textContainer);
	        textArea.appendChild(TextHolder);
	    }else{
	     	var newLineHolder=document.createElement("P");
			newLineHolder.innerHTML=" &#160;"
			textArea.appendChild(newLineHolder);

		}
	}

	const enableCodingBlock=()=>{
		changeCodingBlockDisplay(!displayCodingBlock);
		changeItalics(false);
		changeBold(false);
	}

	const enableBulletList=()=>{

		changeBulletListDisplay(!displayBulletList);
		changeFirstTimeClickBullet(!firstTimeClickBulletList);
		chnageNumberedBulletList(false);
		changeItalics(false);
		changeBold(false);
		changeCodingBlockDisplay(false);
	}

	const enableNumberedLst=()=>{
		changeBulletListDisplay(false);
		chnageNumberedBulletList(!displayNumberedList);
		changeItalics(false);
		changeBold(false);
		changeCodingBlockDisplay(false);

	}

	const emptyTextArea=()=>{
		if(firstTimeClickIndicator==true){
			document.getElementById("textAreaContainer").innerHTML="";
			changeClickIndicator(false);
		}	
	}

	const setIndustry=(industry)=>{

		changeSelectedIndustry(industry);
		const industries=PERSONAL_INDUSTRIES.INDUSTRIES;
		for(var i=0;i<industries.length;i++){
			if(industry==industries[i].industry){
				const subCommunities=industries[i].subCommunity;
				changeSubCommunity(subCommunities);
				break;
			}
		}
	}
*/
	const alterSelectedIndustry=(selectedIndustries)=>{
		changeIndustriesSelected(selectedIndustries);
	}

	const alterSelectedSubCommunities=(selectedSubCommunities)=>{
		changeSubIndustriesSelected(selectedSubCommunities);
	}

const sendRegularPost=async(profilePostInformation)=>{
		console.log("REgular Post test");
		debugger;
		//this could be done in a better way but... niggas is on a time crunch and stressed soooooo.....
		const searchCriteriaIndustryArray=[];
		//const content=editorState;
		//const rawDraftContentState = JSON.stringify(convertToRaw(content.getCurrentContent()));
		let currentPost=audioDescription!=null?audioDescription:document.getElementById("textContainer").value
		const industries=industriesSelected;
		const isPostCrowned=isCrownedPost==undefined?false:isCrownedPost;
		const selectedSubCommunities=subIndustriesSelected; 

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
						subIndustry:subCommunitiyArray
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
			key:uuidv4()
		}

		if(props.previousData==null){
			const {id}=personalInformation;
			const {confirmation,data}=await createRegularPost(props.personalProfileId,searchCriteriaObject,"Personal");
			debugger;
			if(confirmation=="Success"){
				searchCriteriaObject={
					...searchCriteriaObject,
					_id:data
				}
				pushDummyRegularPostObjectToProfile(profilePostInformation,searchCriteriaObject)
			}else{
				alert('Unfortunately there has been an error creating this post. Please try again');
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
				_id
			}=previousData;
			if(isAudioPost==true){
				currentPost=post;
				currentAudioDescription=currentPost
			}else{
				currentAudioDescription=audioDescription;
			}

			const editedRegularPost={
				postType:"RegularPosts",
				postId:_id,
				post:{
					industriesUploaded:isArrayEqual(industriesUploaded,searchCriteriaIndustryArray)==false
						?searchCriteriaIndustryArray:null,
					isCrownedPost:isPostCrowned!=isCrownedPost?isPostCrowned:null,
					post:currentPost!=post?currentPost:null
				},
				postS3:[
					{
						optionType:'audioDescription',
						newUrl:currentAudioDescription!=audioDescription?currentAudioDescription:null
					}
				],
				ownerId:props.personalProfileId
			}

 		//	const {confirmation,data}=await editPost(editedRegularPost);
 			debugger;
 			const confirmation="Success";
			if(confirmation=="Success"){
				props.previousData.contextLocation.editPost(editedRegularPost);
			}else{
				alert('Unfortunately there has been an error editing this post. Please try again');
			}
		}
		debugger;
		/*
			if(profilePostType=="Company"){
				createRegularPost(props.companyProfileId,searchCriteriaObject,profilePostType);
			}else{
				createRegularPost(props.personalProfileId,searchCriteriaObject,profilePostType);
			}
		*/
	}

	const isArrayEqual=(arr1,arr2)=>{
		debugger;
		let isArrayEqualIndicator;

		if(arr1.length!=arr2.length)
			return false;
		else{
			let arr1Map=new Map();

			arr1.forEach((industry,i)=>{
				const {subIndustry}=industry;
				let subArr1Map=new Map();

				subIndustry.forEach((selectedSubIndustry,j)=>{
					subArr1Map.set(selectedSubIndustry,1);
				})
				arr1Map.set(industry,subArr1Map);
			});

			arr2.forEach((selectedIndustry,index)=>{
				debugger;
				var testing=arr1Map.get(selectedIndustry.industry);
				if(arr1Map.get(selectedIndustry.industry)==undefined)
					isArrayEqualIndicator=false
				else{
					const {subIndustry}=selectedIndustry;

					selectedIndustry.forEach((selectedSubIndustry,i)=>{
						const selectedIndustryArr1=arr1Map.get(selectedSubIndustry.industry);
						if(selectedIndustryArr1.get(selectedSubIndustry.industry)=="" ||
						 selectedIndustryArr1.get(selectedSubIndustry.industry)==null)
							isArrayEqualIndicator=false
					})
				}
			})
		}
		return isArrayEqualIndicator;
	}

	const pushDummyRegularPostObjectToProfile=(profilePostInformation,searchCriteriaObject)=>{
		debugger;
		const date=new Date();
		const dateInMill=date.getTime();
		var newRegularObject={
			...searchCriteriaObject,
			industriesUploaded:searchCriteriaObject.industryArray,
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


	const onEditorStateChange=(editorState)=>{
		changeEditorState(editorState);
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
		changeAudioOrTextScreenChoice(false);
		changeDisplayAudioPostOption(true);
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

	return(
		<PostConsumer>
			{userPostsInformation=>{
				return <Container>
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
							<ul style={{padding:"10px"}}>			
								<li style={{listStyle:"none"}}>	
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<IndustryPostOptions
												alterSelectedIndustry={alterSelectedIndustry}
												alterSelectedSubCommunities={alterSelectedSubCommunities}
											/>
										</li>
									</ul>
								</li>

								<li style={{listStyle:"none",marginTop:"5%"}}>
									{displayAudioORTextScreen==true?
										<ul style={{padding:"0px"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li style={ButtonCSS} onClick={()=>diplayRegularPostCreation()}>
													<BorderColorIcon/> Write Post
												</li>
											</a>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												Or
											</li>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>displayAudioPostCreation()} style={ButtonCSS}>
													<MicIcon/> Say Post
												</li>
											</a>

											<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
												{audioDescription!=null?
														<audio key={uuidv4()} controls>
															<source src={audioDescription} type="audio/ogg"/>
															<source src={audioDescription} type="audio/mpeg"/>
															Your browser does not support the audio element.
														</audio>:null
												}
											</li>
										</ul>:
										<React.Fragment>
											{displayAudioPostOption==true?
												<VoiceDescriptionPortal
													closeModal={closeModal}
													createAudioDescription={handleCreateAudioDescription}
												/>
												:<React.Fragment>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none"}}>
															<ul style={{padding:"0px"}}>

																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<li style={RegularPostBackButton} onClick={()=>changeAudioOrTextScreenChoice(true)}>	
																		<ul>
																			<li style={{listStyle:"none",display:"inline-block"}}>
																				<ArrowBackIosIcon
																					style={{fontSize:"20"}}
																				/>
																			</li>
																			<li style={{listStyle:"none",display:"inline-block"}}>
																				Back
																			</li>
																		</ul>
																	</li>
																</a>

																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<li style={{listStyle:"none",display:"inline-block"}}>
																		<CrownIconContainer onClick={()=>changeCrownIndicatorModal(true)}>
																			<Icon 
																				id="crownIcon"
																				icon={crownIcon}
																				style={{borderRadius:"50%",zIndex:"8",backgroundColor:"white",
																				fontSize:"40px",color:"#C8B0F4"}}
																			/>
																		</CrownIconContainer>
																	</li>
																</a>
															</ul>
														</li>
													
														<li style={{listStyle:"none"}}>
															<InputContainer id="textContainer" placeholder="Create your post here"/>
														</li>
													</ul>

												</React.Fragment>
											}
										</React.Fragment>
									}
									
									{/*
										<Editor
										  editorState={editorState}
										  toolbarClassName="toolbarClassName"
										  wrapperClassName="wrapperClassName"
										  editorClassName="editorClassName"
										  onEditorStateChange={onEditorStateChange}
										/>
									*/}
								</li>
							{/*
								<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",marginRight:"-1%"}}>
											<div class="dropdown">
													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														Post Option
													   	<span class="caret"></span>
													</button>

													<ul class="dropdown-menu">
														<li onClick={()=>props.displayProps("ImagePosts")}><a>Image</a></li>
														<li onClick={()=>props.displayProps("VideoPosts")}><a>Video</a></li>
														<li onClick={()=>props.displayProps("RegularPost")}><a>Post</a></li>
														<li onClick={()=>props.displayProps("RegularPost")}><a href={"/blog"}>Blog</a></li>
													</ul>
							  				 </div>
								</li>
							*/}
								
								<li style={{marginTop:"5%",listStyle:"none",backgroundColor:"#C8B0F4",width:"20%",textAlign:"center",fontSize:"15px",borderRadius:"5px"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<ul onClick={()=>sendRegularPost(userPostsInformation)} style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
													<SendIcon
														style={{fontSize:20,color:"white"}}
													/>
												</li>

												<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"white"}}>
													Send
												</li>
											</ul>
										</a>
								</li>
							</ul>
						{/*
							{displayCameraModalIndicator()}
							<CameraModal id="cameraModal">
											<PhotoButton id="photoButton" onClick={()=>photo()}/>
											<video id="video" height="70%" width="100%" autoplay="true">
												
											</video>
							</CameraModal>

							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginLeft:"2%",marginTop:"1%",marginBottom:"1%"}}>
											<ProfilePicture>
											
											</ProfilePicture> 
										</li>

										<li style={{position:"relative",top:"5px",listStyle:"none",display:"inline-block",marginRight:"2%"}}>
											<ul style={{padding:"5px",borderRadius:"5px",boxShadow:"1px 1px 5px 	#9395a0"}}>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<ImageOutlinedIcon
														style={{fontSize:30}}
														onClick={()=>changeDisplayCameraModal(true)}
													/>
												</li>

												<li style={{listStyle:"none",display:"inline-block"}}>
													<FormatBoldOutlinedIcon
														style={{fontSize:30}}
														onClick={()=>changeBold(!displayBold)}
													/>
												</li>

												<li style={{listStyle:"none",display:"inline-block"}}>
													<FormatItalicOutlinedIcon
														style={{fontSize:30}}
														onClick={()=>changeItalics(!displayItalics)}
													/>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<CodeOutlinedIcon
														style={{fontSize:30}}
														onClick={()=>enableCodingBlock()}
													/>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<FormatListBulletedOutlinedIcon
														style={{fontSize:30}}
														onClick={()=>enableBulletList()}
													/>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<FormatListNumberedOutlinedIcon
														style={{fontSize:30}}
														onClick={()=>enableNumberedLst()}
													/>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<FormatQuoteRoundedIcon
														style={{fontSize:30}}
													/>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<FunctionsRoundedIcon
														style={{fontSize:30}}
													/>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<EmojiEmotionsOutlinedIcon
														style={{fontSize:30}}
														/>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<GifIcon	
														style={{fontSize:30}}
													/>
												</li>
											</ul>

										</li>

										<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",marginRight:"-1%"}}>
											<div class="dropdown">
													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														Post Option
													   	<span class="caret"></span>
													</button>

													<ul class="dropdown-menu">
														<li onClick={()=>props.displayProps("ImagePosts")}><a>Image</a></li>
														<li onClick={()=>props.displayProps("VideoPosts")}><a>Video</a></li>
														<li onClick={()=>props.displayProps("RegularPost")}><a>Post</a></li>
														<li onClick={()=>props.displayProps("RegularPost")}><a href={"/blog"}>Blog</a></li>
													</ul>
							  				 </div>
										</li>
										<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",marginBottom:"2%"}}>
											<ul>
												<IndustryPostOptions
														alterSelectedIndustry={alterSelectedIndustry}
														alterSelectedSubCommunities={alterSelectedSubCommunities}
												/>
											</ul>

										</li>
									</ul>
								</li>

								<li style={{listStyle:"none",marginBottom:"1%"}}>
									<TextArea id="textarea">
										<p style={{float:"left",width:"85%",overflowY:"auto",outline:"none"}} onClick={()=>emptyTextArea()} contentEditable="true" id="textAreaContainer"  onKeyPress={e=>regardLetters(e)}>
											Testing
										</p>
									</TextArea>
								</li>

								<li style={{listStyle:"none",backgroundColor:"#C8B0F4",width:"20%",padding:"10px",textAlign:"center",fontSize:"15px",borderRadius:"5px",marginLeft:"80%"}}>
									
									<ul onClick={()=>sendRegularPost(userInformation.profileType)} style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
											<SendIcon
												style={{fontSize:20,color:"white"}}
											/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"white"}}>
											Send
										</li>
									</ul>

								</li>
								<li>	
									<ul style={{padding:"0px"}}>


									</ul>

								</li>
							</ul>
							<canvas id="canvas"  style={{width:"240",height:"297",border:"1px solid #d3d3d3"}}>

							</canvas>




						*/}
							
						</Container>
					}}
				</PostConsumer>
			)
		}

const mapStateToProps=state=>{
	return{
		personalProfileId:state.personalInformation.id,
		companyProfileId:state.companyInformation.id
	}
}

export default connect(
	mapStateToProps,
	null
)(RegularPostCreation);








