import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {editNodeInformation} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:36;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow:auto;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:36;
	top:0px;
`;

const NameTextArea=styled.textarea`
	width:90%;
	resize:none;
	border-style:none;
`;

const DescriptionTextArea=styled.textarea`
	width:90%;
	height:40%;
	resize:none;
	border-style:none;
	margin-bottom:5%;
`;
const ExploreButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const NodeInformationPortal=({isOwner,userId,nodeInformation,closeModal,updateNode})=>{
	const [displayEditArea,changeDisplayEditArea]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	const submitInformation=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const name=document.getElementById("name").value;
		const description=document.getElementById("description").value;

		const nodeObject={
			_id:userId,
			name:name,
			description:description,
			levelId:nodeInformation._id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}
		const {confirmation,data}=await editNodeInformation(nodeObject);
		if(confirmation=="Success"){
			updateNode({
				...nodeObject,
				nodeNumber:nodeInformation.nodeCounter
			});
			closeModal();
		}else{
			
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						submitInformation,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error. Please upload again');
			}
		}
	}
	return createPortal(
		<>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<ul style={{padding:"15px"}}>
					{isOwner==true &&(
						<React.Fragment>
							{nodeInformation.nodeCounter==0 ?
								<p>Your general node can not be edited. Create a new one to be able to edit it</p>:
								<li style={{listStyle:"none",marginBottom:"10%"}}>
									<ul style={{padding:"0px"}}>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>changeDisplayEditArea(true)} style={{listStyle:"none",display:"inline-block",marginRight:"80%"}}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#2196F3" fill="none" stroke-linecap="round" stroke-linejoin="round">
												  <path stroke="none" d="M0 0h24v24H0z"/>
												  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
												  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
												  <line x1="16" y1="5" x2="19" y2="8" />
												</svg>
											</li>
										</a>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>closeModal()} style={{listStyle:"none",display:"inline-block"}}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#2196F3" fill="none" stroke-linecap="round" stroke-linejoin="round">
												  <path stroke="none" d="M0 0h24v24H0z"/>
												  <rect x="4" y="4" width="16" height="16" rx="2" />
												  <path d="M10 10l4 4m0 -4l-4 4" />
												</svg>
											</li>
										</a>
									</ul>
								</li>
							}
						</React.Fragment>
					)}
					<li style={{listStyle:"none"}}>
						{displayEditArea==false?
							<>
								<p style={{fontSize:"30px"}}>{nodeInformation.name}</p>
								<hr/>
								<p>{nodeInformation.description}</p>
							</>:
							<>
								<NameTextArea id="name">
									{nodeInformation.name}
								</NameTextArea>
								<hr/>
								<DescriptionTextArea id="description">
									{nodeInformation.description}
								</DescriptionTextArea>
								<a href="javascript:void(0);" onClick={()=>submitInformation({isAccessTokenUpdated:false})} style={{textDecoration:"none"}}>
									<li style={ExploreButton}>
										Submit
									</li>
								</a>
							</>
						}
					</li>
				</ul>

			</Container>
		</>
	,document.getElementById("personalContainer"));
}

export default NodeInformationPortal;