import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {removeLevel} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";

const Container=styled.div`	
	@media screen and (min-width:2500px){
		padding:20px;
		#removeLevelTitle{
			font-size:36px !important;
		}
		#nodeLevelName{
			font-size:36px !important;
		}
		#nodeLevelDescription{
			font-size:24px !important;
		}

		#backButton{
			font-size:24px !important;
		}
		#removeVerificationText{
			margin-top:5% !important;
			font-size:36px !important;
		}
		#removeLevelOptions{
			margin-top:5%;
			font-size:36px !important;
		}

	}

`;



const BackButtonCSS={
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
  marginBottom:"5%"
}

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
		changeIsSubmitProcessing(true);
		const levelObject={
			_id:id,
			levelId:nodeId,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}
		
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

	return(
		<Container>
			{displayRemoveNodeVerification==false?
				<ul style={{padding:"10px"}}>
					<p id="removeLevelTitle">Click on the level you would like to remove </p>
					<hr/>
					{nodes.length>=1 &&(
						<>
							{nodes.map(data=>
								<>
									<li onClick={()=>addRemovedNodeToQueue(data)} 
										style={{listStyle:"none",cursor:"pointer"}}>
										<p id="nodeLevelName" style={{fontSize:"25px"}}>
											<b> {data.name} </b>
										</p>
										<p id="nodeLevelDescription">{data.description}</p>
									</li>
									<hr/>
								</>
							)}
						</>
					)}
				</ul>:
				<div style={{padding:"10px"}}>
					<div id="backButton" onClick={()=>closeRemoveNodeVerificationModal()} style={BackButtonCSS}>
						Back
					</div>

					<p id="removeVerificationText">
						Are you sure you want to remove this level? All of your posts in this level will be placed
						in the general section 
					</p>
					<hr/>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div id="removeLevelOptions" style={{...BackButtonCSS,marginRight:"2%"}}
							onClick={()=>removeLevelHandler({isAccessTokenUpdated:false})}>
							Yes
						</div>

						<div id="removeLevelOptions" style={BackButtonCSS}
							onClick={()=>closeRemoveNodeVerificationModal()}>
							No
						</div>
					</div>
				</div>
			}
		</Container>

	)
}

export default RemoveLevel;