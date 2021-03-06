import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
		getPromotedRecruits,
		getNodesSpecificToRecruit
	} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {demoteRecruit} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const Container=styled.div`
	padding:10px;
	overflow-y:scroll;

	@media screen and (min-width:2500px){
		padding:20px;
		#title{
			font-size:36px !important;
		}

		#secondaryText{
			font-size:24px !important;
		}
		#recruitImage{
			width:110px !important;
			height:100px !important;
		}
		#recruitFirstName{
			font-size:36px !important;
		}
		#demoteButton{
			font-size:24px !important;
		}
		#removedRecruitIcon{
			font-size:48px !important;
		}
		#nodeTitle{
			font-size:36px !important;
			margin-top:5% !important;
		}
		#nodeDescription{
			font-size:24px !important;
		}

		#backButton{
			font-size:24px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		#recruitImage{
			width:90px !important;;
			height:80px !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	#recruitImage{
			width:65px !important;
			height:60px !important;
		}
    }
`;


const Submit=styled.div`
	position:relative;
	text-align:center;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;
	cursor:pointer;
	margin-top:15%;

	
	@media screen and (min-width:2500px){
		font-size:36px !important;
	}
`;


const ImageCSS={
	width:"70px",
	height:"65px",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px",
	padding:"5px"
}

const RecruitsContainerCSS={
	display:"flex",
	flexDirection:"column",
	justifyContent:"center",
	alignItems:"center",
	width:"35%",
	marginRight:"3%",
	borderRadius:"5px",
	boxShadow:"1px 1px 10px #d5d5d5",
	cursor:"pointer"
}

const ButtonCSS={
	listStyle:"none",
	color:"#5298F8",
	borderRadius:"5px",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	padding:"10px",
	textAlign:"center",
	cursor:"pointer",
	marginBottom:"5%"
}


const DemoteRecruit=({nodes,closeModal,id})=>{
	const [profileNodes,changeProfileNodes]=useState([...nodes]);
	const [recruits,changeRecruits]=useState([]);
	const [selectedRecruit,changeSelectedRecruit]=useState();
	const [selectedNodeInformation,changeSelectedNodeInformation]=useState();
	const [nodesAssignedToRecruit,changeNodesAssignedToRecruit]=useState([]);
	const [nodesNotAssignedToRecruit,changeNodesNotAssignedToRecruit]=useState([]);
	const [destinationDemoteNode,changeDestinationDemoteNode]=useState();
	const [isSubmitting,changeIsSubmitting]=useState(false);
	const [loadingStatus,changeLoadingStatus]=useState(true);

	const [isGeneralNode,changeIsGeneralNode]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		const fetchData=async({isAccessTokenUpdated,updatedAccessToken})=>{
			const {confirmation,data}=await getPromotedRecruits({
												id,
												accessToken:isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken
											});
			if(confirmation=="Success"){
				const {message}=data;
				changeRecruits([...message]);
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							fetchData,
							dispatch,
							{},
							false
						);
				}else{
					alert('There was an error getting your promoted recruits :(');
					closeModal();
				}
			}
			changeLoadingStatus(false);
		}
		fetchData({isAccessTokenUpdated:false});
	},[]);

	const filterOutSelectedNode=(currentSelectedNode)=>{
		for(var i=0;i<profileNodes.length;i++){
			if(profileNodes[i]._id==currentSelectedNode.node._id){
				profileNodes.splice(i,1);
			}
		}
		changeNodesNotAssignedToRecruit([...profileNodes])
		changeSelectedNodeInformation(currentSelectedNode)
	}

	const fetchSpecificNodesForRecruit=async({isAccessTokenUpdated,updatedAccessToken,target})=>{
		const {confirmation,data}=await getNodesSpecificToRecruit(
											id,
											target.recruits._id,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken);
		if(confirmation=="Success"){
			const {message}=data;
			const specificRecruitNodesMap=new Map();
			for(var i=0;i<message.length;i++){
				specificRecruitNodesMap.set(message[i].node._id,1);
			}
			const tempRecruitNodesContainer=[];
			for(var j=0;j<profileNodes.length;j++){
				if(specificRecruitNodesMap.get(profileNodes[j]._id)!=null){
					continue;
				}else{
					tempRecruitNodesContainer.push(profileNodes[j])
				}
			}
			changeProfileNodes([...tempRecruitNodesContainer])
			changeNodesAssignedToRecruit([...message]);
			changeSelectedRecruit(target);
		}else{
						const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						fetchSpecificNodesForRecruit,
						dispatch,
						{target},
						false
					);
			}else{
				alert('An error has occured when getting nodes assigned to recruit');
			}
		}
	}

	const demoteRecruitHandle=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeIsSubmitting(true);
		const {confirmation,data}=await demoteRecruit({
											profileId:id,
											recruitId:selectedRecruit.recruits._id,
											selectedNodeInformation:selectedNodeInformation.node._id,
											destinationDemoteNode:destinationDemoteNode._id,
											isGeneralNode,
											accessToken:isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken
									})
		if(confirmation=="Success"){
			alert('Recruit successfully demoted. Please know that if your recruit is on other levels they would have to be deleted from there also if you want them to be completely at the general node');
			closeModal();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						demoteRecruitHandle,
						dispatch,
						{},
						false
					);
			}else{
				alert('An error has occured when trying to demote this recurit');
			}
		}
		changeIsSubmitting(false);
	}

	const selectDestinationNode=(data,index)=>{
		if(index==0)
			changeIsGeneralNode(true);
		changeDestinationDemoteNode(data)
	}

	const backButtonDisplay=(action,data)=>{
		return(
			<p id="backButton" style={ButtonCSS} onClick={()=>action(data)}>
				Back
			</p>
		)
	}
	return(

		<Container>
			{selectedRecruit!=null?
				<React.Fragment>
					{selectedNodeInformation==null?
						<React.Fragment>
							{backButtonDisplay(changeSelectedRecruit,null)}
							<p id="title">You've selected <b>{selectedRecruit.recruits.firstName}</b> to demote </p>
							<p id="secondaryText">
								Below are the current nodes they are on. Click on the node 
								that you want to demote them from.
							</p>
							<hr/>
							{nodesAssignedToRecruit.map(data=>
								<React.Fragment>
									<p id="nodeTitle" onClick={()=>filterOutSelectedNode(data)}
										style={{color:"#C8B0F4",fontSize:"20px",cursor:"pointer"}}>
										<b>{data.node.name}</b>
									</p>
									<hr/>
								</React.Fragment>
							)}
						</React.Fragment>:
						<React.Fragment>
							{destinationDemoteNode==null?
								<React.Fragment>
									{backButtonDisplay(changeSelectedNodeInformation,null)}
									<p id="title">What node do you want to demote the recruit to?</p>
									{nodesNotAssignedToRecruit.map((data,index)=>
										<React.Fragment>
											<p id="nodeTitle" onClick={()=>selectDestinationNode(data,index)}
												style={{color:"#C8B0F4",fontSize:"20px",cursor:"pointer"}}>
												<b>{data.name}</b>
											</p>
											<hr/>
										</React.Fragment>
									)}
								</React.Fragment>:
								<React.Fragment>

									{backButtonDisplay(changeDestinationDemoteNode,null)}
									<p id="title"> 
										Are you sure you want to demote <b>{selectedRecruit.recruits.firstName}</b>
									</p>
									<p id="title"> from <b>{selectedNodeInformation.node.name}</b></p>
									<p id="title"> to <b>{destinationDemoteNode.name}</b> ?</p>
		 							<Submit onClick={()=>demoteRecruitHandle({isAccessTokenUpdated:false})}> 
		 								{isSubmitting==false?
		 									<p>Demote</p>:
		 									<p>Submitting...</p>
		 								}
		 							</Submit>
								</React.Fragment>
							}
						</React.Fragment>
					}
				</React.Fragment>:
				<React.Fragment>
					{loadingStatus==true?
						<p style={{padding:"10px"}}>Loading please wait...</p>:
						<React.Fragment>
							{recruits.length==0?
								<p>No recruits to demote :(</p>:
								<React.Fragment>
									<p id="title">Here are the recruits you have promoted so far. Click one to demote </p>
									<hr/>
									<div style={{display:"flex",flexDirection:"row"}}>
										{recruits.map(data=>
											<div onClick={()=>fetchSpecificNodesForRecruit({isAccessTokenUpdated:false,target:data})}
												 style={RecruitsContainerCSS}>
												<img id="recruitImage" src={data.recruits.profilePicture==null?
													NoProfilePicture:data.recruits.profilePicture} style={ImageCSS}
												/>
												<p id="recruitFirstName">{data.recruits.firstName}</p>
												<p id="demoteButton" style={ButtonCSS}>
													Demote
												</p>
											</div>
										)}
									</div>
								</React.Fragment>
							}
						</React.Fragment>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default DemoteRecruit;