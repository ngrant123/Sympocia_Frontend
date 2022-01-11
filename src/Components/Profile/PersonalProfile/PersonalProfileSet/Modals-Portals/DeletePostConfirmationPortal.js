import React,{useState} from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {createPortal} from "react-dom";
import {deleteChampion} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {UserConsumer} from "../../UserContext.js";
import {deletePost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";


const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:51;
	top:25%;
	border-radius:5px;
	left:40%;
	display:flex;
	flex-direction: column;
	padding:30px;

	@media screen and (max-width:1370px){
		width:80% !important;
		left:10% !important;
		overflow:scroll !important;
	}
`;

const ConfirmationContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:50;
	top:0px;
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const ConfirmationButtonCSS={
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	marginBottom:"2%",
	cursor:"pointer",
	marginRight:"2%"
}
const DeletePostConfirmationPortal=({postType,content,closeModal,selectedPostType,removeContextLocation,targetDom,history})=>{
	const userId=useSelector(state=>state.personalInformation.id);	
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isProcessingDeletion,changeIsProcessingDeletion]=useState(false);
	const dispatch=useDispatch();

	const handleDelete=(personalContextInformation)=>{
		if(postType=="Champion")
			handleDeleteChampion({personalContextInformation,isAccessTokenUpdated:false});
		else
			handleDeletePost({personalContextInformation,isAccessTokenUpdated:false});
	}

	const handleDeletePost=async({isAccessTokenUpdated,updatedAccessToken})=>{

		changeIsProcessingDeletion(true);
		const {
			_id,
			industriesUploaded,
			owner,
			isCrownedPost
		}=content;
		const postId=(_id==null)?content.id:_id;
		const removedPost={
			postType:selectedPostType,
			postId,
			industriesUploaded,
			profileId:owner,
			isCrownedPost,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}

		const {confirmation,data}=await deletePost(removedPost); 
		if(confirmation=="Success"){
			if(selectedPostType=="Blogs"){
				alert('Post has been deleted. Please reload page to view updated post section');
				history.push(`/profile/${owner}`);
			}else{
				removeContextLocation(postId,selectedPostType);
				closeModal();
			}
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						handleDeletePost,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error deleting this post. Please try again');
			}
		}
		changeIsProcessingDeletion(false);
 	}
	const handleDeleteChampion=async({personalContextInformation,isAccessTokenUpdated,updatedAccessToken})=>{
      const {confirmation,data}=await deleteChampion({
      									userId,
      									accessToken:isAccessTokenUpdated==true?updatedAccessToken:
										personalInformation.accessToken
      								});
      if(confirmation=="Success"){
        personalContextInformation.deleteChampionModal({
          name:"",
          description:"",
          imgUrl:""
        })
        closeModal();
      }else{
      	const {statusCode}=data;
		if(statusCode==401){
			await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					handleDeleteChampion,
					dispatch,
					{personalContextInformation},
					false
				);
		}else{
			alert('Unfortunately there has been an error deleting this post. Please try again');
		}
      }
    }


    const closeModalIcon=()=>{
		return(
			<div id="closeModalButton" 
				onClick={()=>closeModal()} style={{marginTop:"0%",cursor:"pointer"}}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
				 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
				 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}


	return createPortal(
		<UserConsumer>
			{personalContextInformation=>{
				return <>
						<Container>
							{closeModalIcon()}
							{isProcessingDeletion==true?
								<p>Please wait...</p>:
								<React.Fragment>
									<p style={{fontSize:"20px"}}>
										<b>Are you sure you want to delete this {postType=="Champion"?"champion":"post"}? </b>
									</p>
									<hr style={HorizontalLineCSS}/>
									<ConfirmationContainer>
										<p onClick={()=>handleDelete(personalContextInformation)} style={ConfirmationButtonCSS}> Yes </p>
										<p onClick={()=>closeModal()} style={ConfirmationButtonCSS}> No </p>
									</ConfirmationContainer>
								</React.Fragment>
							}
						</Container>
						<ShadowContainer
							onClick={()=>closeModal()}
						/>
					</>
			}}
		</UserConsumer>
		,document.getElementById(targetDom)
	)
}

export default DeletePostConfirmationPortal;