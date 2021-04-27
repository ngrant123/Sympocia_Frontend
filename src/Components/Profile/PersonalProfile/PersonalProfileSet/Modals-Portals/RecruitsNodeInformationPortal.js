import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {
		editNodeInformation,
		requestAccessToNode
	} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
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


const ColorChoicesContainer=styled.div`
	display:flex;
	flex-direction:row;
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

const ColorBlockCSS={
	height:"40px",
	width:"40px",
	borderRadius:"5px",
	marginRight:"2%",
	marginBottom:"2%",
	cursor:"pointer"
}

const RequestAccessButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}


const NodeInformationPortal=({isOwner,userId,nodeInformation,closeModal,updateNode})=>{
	const [displayEditArea,changeDisplayEditArea]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [selectedColorCode,changeSelectedColorCode]=useState(nodeInformation.colorCode);
	const [colorCodes,changeColorCodes]=useState([
		"#7FFFD4","#8A2BE2","#FF4500","#008000","#0000FF","#FFC0CB","#DFFF00",
		"#FFF9E3","#F92424","#3F9FFF","#35FA2C","#FFFB00"
	])

	const submitInformation=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const name=document.getElementById("name").value;
		const description=document.getElementById("description").value;

		const nodeObject={
			_id:userId,
			name:name,
			description:description,
			colorScheme:selectedColorCode,
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

	const changeSelectedColorCodeHandle=(colorCode,index)=>{
		changeSelectedColorCode(colorCode);
		for(var i=0;i<colorCodes.length;i++){
			document.getElementById(`colorCode-${i}`).style.borderStyle="none";
		}
		if(colorCode==null){
			document.getElementById("noColorScheme").style.color="red";
		}else{
			document.getElementById("noColorScheme").style.color="black";
			document.getElementById(`colorCode-${index}`).style.borderStyle="dotted dashed solid double";
		}
	}

	const requestTrigger=async()=>{
		const {confirmation,data}=await requestAccessToNode({
			nodeName:nodeInformation.name,
			targetId:userId,
			requestOwnerId:personalInformation.id
		})
		if(confirmation=="Success"){
			alert('Your request has been sent');
		}else{
			alert('There has been an error sending your request');
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
								{(isOwner==false && nodeInformation.isFirstNode==false)&&(
									<p onClick={()=>requestTrigger()} style={RequestAccessButtonCSS}>
										Request Access
									</p>
								)}
								<p style={{fontSize:"30px"}}>{nodeInformation.name}</p>
								<hr/>
								<p>{nodeInformation.description}</p>
								<hr/>
								<p>
									<b>Selected color:</b>
								</p>
								{nodeInformation.colorCode==null?
									<p>None</p>:
									<div style={{backgroundColor:nodeInformation.colorCode,
												height:"40px",width:"40px",borderRadius:"5px"}}
									/>
								}
							</>:
							<>
								<NameTextArea id="name">
									{nodeInformation.name}
								</NameTextArea>
								<hr/>
								<DescriptionTextArea id="description">
									{nodeInformation.description}
								</DescriptionTextArea>
								<p style={{marginBottom:"5%"}}>Select a color scheme:</p>
								<p id="noColorScheme" style={{cursor:"pointer"}}
									onClick={()=>changeSelectedColorCodeHandle(null)}
								>None</p>
								<ColorChoicesContainer>
									{colorCodes.map((data,index)=>
										<div id={`colorCode-${index}`} style={{...ColorBlockCSS,backgroundColor:data}}
											onClick={()=>changeSelectedColorCodeHandle(data,index)}
										/>
									)}
									
								</ColorChoicesContainer>
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