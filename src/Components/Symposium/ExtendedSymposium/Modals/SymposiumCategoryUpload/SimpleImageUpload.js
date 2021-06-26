import React,{useState} from "react";
import styled from "styled-components";
import {createImagePost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";

const PrimaryInputContainer=styled.textarea`
	position:relative;
	resize:none;
	width:350px;
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
	width:350px;
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

const ImageCSS={
	height:"220px",
	width:"250px",
	borderRadius:"5px",
	marginBottom:"5%"
}

const ImageUpload=({selectedCategoryType,currentSymposiumName,isMobileUi,pushDummyPlaceholderPostToStack})=>{
	const [imgUrl,changeImgUrl]=useState();
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isProcessing,changeIsProcessing]=useState(false);

	const submit=async({isAccessTokenUpdated,updatedAccessToken})=>{
		if(imgUrl==null){
			alert('Please add an image to submit');
		}else{
			const primaryTextValue=document.getElementById("primaryTextValue").value;
			const secondaryTextValue=document.getElementById("secondaryTextValue").value;
			changeIsProcessing(true);

			const searchCriteria={
				videoDescription:null,
				audioDescription:null,
				industryArray:[{
					industry:currentSymposiumName,
					subIndustry:[]
				}],
				description:secondaryTextValue,
				caption:primaryTextValue,
				isCrownedPost:false,
				imgUrl,
				isPhoneUIEnabled:isMobileUi,
				symposiumUploadCategory:selectedCategoryType
			}
			const {confirmation,data}=await createImagePost(
										personalInformation.id,
										searchCriteria,
										"Personal",
										isAccessTokenUpdated==true?updatedAccessToken:
										personalInformation.accessToken);
			if(confirmation=="Success"){
				const {message}=data;
				constructPlaceHolderPost(searchCriteria,message);
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

	const constructPlaceHolderPost=(searchCriteria,postId)=>{
		const date=new Date().getTime();
		let postInformation={
			...searchCriteria,
			industriesUploaded:searchCriteria.industryArray.length==0?
			[{industry:"General",subIndustry:[]}]:searchCriteria.industryArray,
			comments:[],
			datePosted:date,
			owner:{
				_id:personalInformation.id
			},
			_id:postId
		}
		pushDummyPlaceholderPostToStack(postInformation);
	}

	const handleUploadPicture=()=>{
		const fileReader=new FileReader();
		const uploadedFile=document.getElementById("uploadPictureFile").files[0];

		fileReader.onloadend=()=>{
			const pictureUrl=fileReader.result;
			const maxFileSize=7000*1024;
			if(uploadedFile.size>maxFileSize){
				alert('Your file is too large. We only accept images that have a max size of 7MB. You can go to preview (Mac) and lower the resolution there.');
			}else{
				changeImgUrl(pictureUrl);
			}
		}

		if(uploadedFile==null){
			alert('Unfortunately this file type is not included');
		}else{
			fileReader.readAsDataURL(uploadedFile);
		}
	}

	return(
		<React.Fragment>
			<div style={{marginRight:"3%"}}>
				{imgUrl==null?
					<input type="file"  style={{marginBottom:"5%"}} name="img" id="uploadPictureFile" onChange={()=>handleUploadPicture()} 
				        accept="image/jpeg" 
				        name="attachments">
				    </input>:
				    <img id="imageDiv" src={imgUrl} style={ImageCSS}/>
				}
			</div>
			<div id="inputDivs">
				<PrimaryInputContainer id="primaryTextValue" placeholder="Enter caption"/>
				<SecondaryInputContainer id="secondaryTextValue" placeholder="Enter description"/>

				{isProcessing==true?
					<p>Processing...</p>:
					<div onClick={()=>submit({isAccessTokenUpdated:false})} style={SubmitButtonCSS}>
						Submit
					</div>
				}
			</div>
		</React.Fragment>
	)
}


export default ImageUpload;