import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {removeLevel} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
	left:0%;
`;

const RemoveLevelVerificationContainer=styled.div`
	position:fixed;
	width:35%;
	height:30%;
	background-color:white;
	z-index:13;
	top:25%;
	border-radius:5px;
	left:35%;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		top:20%;
		left:20% !important;
		width:60% !important;
		height:30%;
	}
`;

{/*
	Right now the plan in the future is to be able to allow the user
	to delete the level and move the posts to a different one or create 
	a new level from the users in the previously deleted one. Since time 
	doesn't really permit that I'll just adapt but it should be implemeted later
*/}

const RemoveLevel=({nodes,closeModal,id})=>{
	const [displayRemoveNodeVerification,changeRemoveNodeVerificationModal]=useState(false);
	const [nodeId,changeNodeId]=useState();
	const [isProcessingSubmit,changeIsSubmitProcessing]=useState(false); 
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	const addRemovedNodeToQueue=(node)=>{
		/*
			var currentRemovedNodes=removedNodes;
			currentRemovedNodes.push(node);
			changeRemovedNodes([...currentRemovedNodes]);
		*/
		changeNodeId(node._id);
		changeRemoveNodeVerificationModal(true);
	}
	const closeRemoveNodeVerificationModal=()=>{
		changeRemoveNodeVerificationModal(false);
	}

	const removeLevelHandler=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const levelObject={
			_id:id,
			levelId:nodeId,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}
		debugger;
		const {confirmation,data}=await removeLevel(levelObject);
			if(confirmation=="Success"){
				const removeNodeAction={
						actionType:"Remove",
						node:{
							_id:nodeId
						}
				}
				closeModal(removeNodeAction);
			}else{
				debugger;
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							removeLevelHandler,
							dispatch,
							{},
							false
						);
				}else{
					alert('Unfortunately there has been an error. Please try again');
				}
			}
		changeIsSubmitProcessing(false);
	}

	const removeNodeVerification=()=>{
		return(
			<>
				<ShadowContainer
					onClick={()=>closeRemoveNodeVerificationModal()}
				/>
				<RemoveLevelVerificationContainer>
					<ul style={{padding:"20px"}}>
						<p> Are you sure you want to remove this level? All of your posts in this level will be placed
						in the general section </p>
						<li style={{listStyle:"none"}}>
							<ul style={{pading:"20px"}}>
								{isProcessingSubmit==true?
									<p>Please wait</p>:
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>removeLevelHandler({isAccessTokenUpdated:false})}style={{listStyle:"none",display:"inline-block"}}>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7cfc00" fill="none" stroke-linecap="round" stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z"/>
													  <circle cx="12" cy="12" r="9" />
													  <path d="M9 12l2 2l4 -4" />
													</svg> Yes
												</li>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none",marginTop:"3%"}}>
												<li onClick={()=>closeRemoveNodeVerificationModal()} style={{listStyle:"none",display:"inline-block"}}>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#E91E63" fill="none" stroke-linecap="round" stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z"/>
													  <rect x="4" y="4" width="16" height="16" rx="2" />
													  <path d="M10 10l4 4m0 -4l-4 4" />
													</svg> No
												</li>
											</a>
										</ul>
									</li>
								}
							
							</ul>
						</li>
					</ul>
				</RemoveLevelVerificationContainer>
			</>
		)
	}

	return(
		<>
			{displayRemoveNodeVerification==false?
				null:
				removeNodeVerification()
			}
			<ul style={{padding:"10px"}}>
				<p>Click on the level you would like to remove </p>
				{nodes.length>=1 &&(
					<>
						{nodes.map(data=>
							<>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>addRemovedNodeToQueue(data)} style={{listStyle:"none"}}>
										<p style={{fontSize:"25px"}}>
											<b> {data.name} </b>
										</p>
										<p>{data.description}</p>
									</li>
								</a>
								<hr/>
							</>
						)}
					</>
				)}
				</ul>
		</>

	)
}

export default RemoveLevel;