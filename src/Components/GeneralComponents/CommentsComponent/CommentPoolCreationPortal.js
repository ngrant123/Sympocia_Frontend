import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {createCommentPool} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../Actions/Tasks/index.js";


const Container=styled.div`
	position:fixed;
	width:45%;
	height:50%;
	background-color:white;
	z-index:41;
	top:20%;
	border-radius:5px;
	left:30%;
	overflow-y:auto;
	display:flex;
	padding:40px;
	flex-direction:column;

	@media screen and (max-width:1370px){
		width:60% !important;
		left:20% !important;
    }

    @media screen and (max-width:650px){
		width:100% !important;
		left:0% !important;
		height:100%;
		top:0%;
	}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:65%;
    }
`;
const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	margin-bottom:5%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	height:100px;
	padding-right:120px;
`;


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const SubmitButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"#3898ec",
  borderRadius:"5px",
  padding:"5px",
  color:"white",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  width:"30%"
}

const CommentPoolCreation=({
							closeModal,
							currentCommentPools,
							addCommentPool,
							commentType,
							postType,
							postId,
							targetContainer
						})=>{
	const [initialTextAreaClick,changeInitialTextAreaClick]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isProcessing,changeIsProcessing]=useState(false);

	const initializeFirstClick=()=>{
		if(initialTextAreaClick==false){
			document.getElementById("commentPoolName").placeholder="";
			changeInitialTextAreaClick(true);
		}	
	}

	const submitCommentPool=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const commentPoolInputValue=document.getElementById("commentPoolName").value;
		if(commentPoolInputValue==""){
			alert("Please enter a value");
		}else{
			changeIsProcessing(true);
			const {confirmation,data}=await createCommentPool({
												userId:personalInformation.id,
									            postId,
									            postType,
									            commentType,
									            commentPoolDescription:commentPoolInputValue,
												accessToken:isAccessTokenUpdated==true?updatedAccessToken:
															personalInformation.accessToken
											});
			if(confirmation=="Success"){
				const {message}=data;
				const commentPoolAddition={
					description:commentPoolInputValue,
					_id:message
				}

				currentCommentPools.splice(0,0,commentPoolAddition);
				addCommentPool(currentCommentPools);	
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							submitCommentPool,
							dispatch,
							{},
							false
						);
				}else{
					alert('Unfortunately there has been an error creating this comment pool. Please try again');
				}
			}
			changeIsProcessing(false);
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
		<React.Fragment>
			<Container>
				{closeModalIcon()}
				{currentCommentPools.length==3?
					<p>Maximum comment pools reached. Please delete one </p>:
					<React.Fragment>
						<p>
							<b>Create comment pool topic</b>
						</p>
						<hr style={HorizontalLineCSS}/>
						<p style={{fontSize:"18px"}}>
							<b>Name</b>
						</p>
						<InputContainer id="commentPoolName" onClick={()=>initializeFirstClick()} 
							placeholder="Enter comment pool name here"
						/>
						{isProcessing==true?
							<p>Please wait</p>:
							<div onClick={()=>submitCommentPool({isAccessTokenUpdated:false})} style={SubmitButtonCSS}>
								Submit
							</div>
						}
					</React.Fragment>
				}
			</Container>
			<ShadowContainer onClick={()=>closeModal()}/>
		</React.Fragment>
	,document.getElementById(targetContainer))
}

export default CommentPoolCreation;

