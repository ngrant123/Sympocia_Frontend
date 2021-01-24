import React from "react";
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
	z-index:45;
	top:20%;
	border-radius:5px;
	left:40%;
	display:flex;
	flex-direction: column;
	padding:30px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
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
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

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
	const dispatch=useDispatch();

	const handleDelete=(personalContextInformation)=>{
		if(postType=="Champion")
			handleDeleteChampion({personalContextInformation,isAccessTokenUpdated:false});
		else
			handleDeletePost({personalContextInformation,isAccessTokenUpdated:false});
	}

	const handleDeletePost=async({isAccessTokenUpdated,updatedAccessToken})=>{
		debugger;
		const {
			_id,
			industriesUploaded,
			owner
		}=content;
		const postId=(_id==null)?content.id:_id;
		const removedPost={
			postType:selectedPostType,
			postId,
			industriesUploaded,
			profileId:owner,
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
          description:""
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

	return createPortal(
		<UserConsumer>
			{personalContextInformation=>{
				return <>
						<Container>
							<p style={{fontSize:"20px"}}>
								<b>Are you sure you want to delete this {postType=="Champion"?"champion":"post"}? </b>
							</p>
							<hr/>
							<ConfirmationContainer>
								<p onClick={()=>handleDelete(personalContextInformation)} style={ConfirmationButtonCSS}> Yes </p>
								<p onClick={()=>closeModal()} style={ConfirmationButtonCSS}> No </p>
							</ConfirmationContainer>
						</Container>
						<ShadowContainer
							onClick={()=>closeModal()}
						/>
					</>
			}}
		</UserConsumer>
		,document.getElementById("personalContainer")
	)
}

export default DeletePostConfirmationPortal;