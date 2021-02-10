import React,{useState} from "react";
import styled from "styled-components";
import {uploadFakePostsAdmin} from "../../Actions/Requests/AdminRequests.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	padding:50px;
`;

const PostContainer=styled.div`
	display:flex;
	flex-direction:column;	
`;

const ProfileIdContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const PostTypeContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const InputContainer=styled.textarea`
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;
`;
const StepsContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:-10%;
`;

const Step1Container=styled.div`
	display:flex;
	flex-direction:column;
`;

const Step2Container=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:10%;
`;

const VideoContainer=styled.div`
	width:80%;
	height:200%;
`;
const Post=styled.div`
`;

const SubmitButtonContainerCSS={
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"5%",
  marginBottom:"20%",
  marginTop:"5%",
  marginLeft:"2%",
  height:"20%"
}

const ButtonContainerCSS={
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"5%",
  marginBottom:"20%",
  marginTop:"5%"
}

const BackContainerCSS={
	...ButtonContainerCSS,
	width:"20%"
}


const UploadPost=({closeUploadPostModal})=>{
	console.log("Testing");
	const [postType,changePostType]=useState("Videos");
	const [postUrl,changePostUrl]=useState();
	const [isFileUploaded,changeIsFileUploadedStatus]=useState(false);
	const [token,changeUploadToken]=useState();



	const submitPost=async()=>{
		let postData={
			token:document.getElementById("verficationTokenId").value,
		    postType,
		    _id:document.getElementById("targetProfileId").value,
		    profileIndicator:"Personal"
		}
		let searchCriteria;
		if(postType=="Images"){
			searchCriteria={
				caption:document.getElementById("imageCaption").value,
		        description:document.getElementById("imageDescription").value,
		        industryArray:[{
		            industry:document.getElementById("symposium").value,
		            subIndustry:[]
		        }],
		        isCrownedPost:false,
		        imgUrl:postUrl
			}
		}else if(postType=="Videos"){
			searchCriteria={
		        audioDescription:null,
		        description:"lolol",
		        isCrownedPost:false,
		        title:document.getElementById("videoTitle").value,
		        videoDescription:null,
		        description:document.getElementById("videoDescription").value,
		        industriesUploaded:[{
		            industry:document.getElementById("symposium").value,
		            subIndustry:[]
		        }],
		        isCrownedPost:false,
		        videoUrl:postUrl
			}
		}else{
			postData={
				...postData,
				postType:"RegularPosts",
				id:document.getElementById("targetProfileId").value
			}
			searchCriteria={
				industryArray:[{
		            industry:document.getElementById("symposium").value,
		            subIndustry:[]
		        }],
		        isAudioPost:null,
		        isCrownedPost:false,
		        isPostAuthentic:{
		            numOfApprove:[],
		            numOfDisapprove:[]
		        },
		        post:document.getElementById("regularPostText").value
			}
		}
		postData={
			...postData,
			searchCriteria
		}

		const {confirmation,data}=await uploadFakePostsAdmin(postData);
		if(confirmation=="Success"){
			if(data==false)
				alert('Incorrect token. Please try again');
			else
				alert('Post has been added correctly');

		}else{
			alert('An error has occured when trying to upload a post');
		}
	}

	const uploadFile=()=>{
		const reader=new FileReader();
		const post=document.getElementById("postId").files[0];

		reader.onload=()=>{
			const data=reader.result;
			changeIsFileUploadedStatus(true);
			changePostUrl(data);
		}

		if(post!=null){
			reader.readAsDataURL(post);
		}else{
			alert('An error has occured');
		}
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const uploadFileTypeButton=()=>{
		if(postType=="Images"){
			return <input id="postId" type="file" accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip"
						onChange={()=>uploadFile()}
					/>
		}else if(postType=="Videos"){
			return <input id="postId" type="file" accept="video/*"
						onChange={()=>uploadFile()}
					/>
		}else{
			return <InputContainer id="regularPostText" placeholder="Enter post here"/>
		}
	}

	const postDescriptionContainer=()=>{
		if(postType=="Images"){
			return (
				<>
					<InputContainer id="imageCaption" placeholder="Enter caption"/>
					<hr/>
					<InputContainer id="imageDescription" placeholder="Enter description"/>
				</>
			)
		}else if(postType=="Videos"){
			return (
				<>
					<InputContainer id="videoTitle" placeholder="Enter title"/>
					<hr/>
					<InputContainer id="videoDescription" placeholder="Enter description"/>
				</>
			)
		}else{
			return (
				<>
				</>
			)
		}
	}

	const triggerPostUploadDisplay=(postType)=>{
		if(postType=="Images"){
			changePostType("Images")
		}else if(postType=="Videos"){
			changePostType("Videos");
		}else{
			changePostType("Regular");
			changeIsFileUploadedStatus(false);
		}
	}

	const postUrlDisplay=()=>{
		debugger;
		return(
			<>
				{postType=="Images"?
					<img src={postUrl} style={{height:"150px",width:"150px"}}/>:
					<VideoContainer>
						<video key={uuidv4()} width="100%" height="200px" autoplay="true" controls>
		 					<source src={postUrl} type="video/mp4"/>
		   				</video>
					</VideoContainer>
				}
			</>
		)
	}
	return(
		<Container>
			<div onClick={()=>closeUploadPostModal()} style={BackContainerCSS}>
				Back
			</div>
			<StepsContainer>
				<Step1Container>
					<p style={{fontSize:"30px"}}>
						<b>Step 1:</b>
					</p>
					<ProfileIdContainer>
						<p>
							 <b>ProfileId:</b>
						</p>
						<InputContainer
							placeholder="Target profile Id"
							id="targetProfileId"
						/>
						<hr/>
						<p>
							 <b>Verification Id:</b>
						</p>
						<InputContainer
							id="verficationTokenId"
							placeholder="Verification token"
						/>
					</ProfileIdContainer>


					<PostTypeContainer>
						   <p>Post Type: </p>
						   <div onClick={()=>triggerPostUploadDisplay("Images")} style={ButtonContainerCSS}>
						   		Images
						   </div>

						   <div onClick={()=>triggerPostUploadDisplay("Videos")} style={ButtonContainerCSS}>
						   		Videos
						   </div>

						   <div onClick={()=>triggerPostUploadDisplay("Regular")} style={ButtonContainerCSS}>
						   		Regular Posts
						   </div>

					</PostTypeContainer>
					<p>Selected post type: <b>{postType}</b></p>
				</Step1Container>

				<Step2Container>
					<p style={{fontSize:"30px"}}>
						<b>Step 2:</b>
					</p>
					<PostContainer>
						<div style={{marginBottom:"10%"}}>
							{uploadFileTypeButton()}
						</div>
						{isFileUploaded==true &&(
							<>{postUrlDisplay()}</>	
						)}

					</PostContainer>
				</Step2Container>

				<Step2Container>
					<p style={{fontSize:"30px"}}>
						<b>Step 3:</b>
					</p>
					{postDescriptionContainer()}
					<hr/>
					<InputContainer id="symposium" placeholder="Enter Symposium" />
				</Step2Container>
				<div onClick={()=>submitPost()} style={SubmitButtonContainerCSS}>
					Submit
				</div>

			</StepsContainer>
		</Container>
	)
}

export default UploadPost;


