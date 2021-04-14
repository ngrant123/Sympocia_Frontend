import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
		getPromotedRecruits,
		getNodesSpecificToRecruit
	} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {demoteRecruit} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	padding:10px;
	overflow-y:scroll;

	@media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		#recruitImage{
			width:90px !important;;
			height:80px !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	#recruitImage{
			width:90px !important;;
			height:80px !important;
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
`;


const ImageCSS={
	width:"80%",
	height:"20%",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px"
}

const RecruitsCSS={
	listStyle:"none",
	display:"inline-block",
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
	cursor:"pointer"
}


const DemoteRecruit=({nodes,closeModal,id})=>{
	console.log(nodes);
	const [profileNodes,changeProfileNodes]=useState([...nodes]);
	const [recruits,changeRecruits]=useState([]);
	const [selectedRecruit,changeSelectedRecruit]=useState();
	const [selectedNodeInformation,changeSelectedNodeInformation]=useState();
	const [nodesAssignedToRecruit,changeNodesAssignedToRecruit]=useState([]);
	const [nodesNotAssignedToRecruit,changeNodesNotAssignedToRecruit]=useState([]);
	const [destinationDemoteNode,changeDestinationDemoteNode]=useState();
	const [isSubmitting,changeIsSubmitting]=useState(false);

	const [isGeneralNode,changeIsGeneralNode]=useState(false);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await getPromotedRecruits(id);
			if(confirmation=="Success"){
				const {message}=data;
				changeRecruits([...message]);
			}else{
				alert('There was an error getting your promoted recruits :(');
				closeModal();
			}
		}
		fetchData();
	},[]);

	const filterOutSelectedNode=(currentSelectedNode)=>{
		debugger;
		for(var i=0;i<profileNodes.length;i++){
			if(profileNodes[i]._id==currentSelectedNode.node._id){
				profileNodes.splice(i,1);
			}
		}
		changeNodesNotAssignedToRecruit([...profileNodes])
		changeSelectedNodeInformation(currentSelectedNode)
	}

	const fetchSpecificNodesForRecruit=async(target)=>{
		const {confirmation,data}=await getNodesSpecificToRecruit(id,target.recruits._id);
		if(confirmation=="Success"){
			const {message}=data;
			const specificRecruitNodesMap=new Map();
			debugger;
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

			console.log(message);
			changeNodesAssignedToRecruit([...message]);
			changeSelectedRecruit(target);
		}else{
			alert('An error has occured when getting nodes assigned to recruit');
		}
	}

	const demoteRecruitHandle=async()=>{
		changeIsSubmitting(true);
		const {confirmation,data}=await demoteRecruit({
											profileId:id,
											recruitId:selectedRecruit.recruits._id,
											selectedNodeInformation:selectedNodeInformation.node._id,
											destinationDemoteNode:destinationDemoteNode._id,
											isGeneralNode
									})
		if(confirmation=="Success"){
			alert('Recruit successfully demoted. Please know that if your recruit is on other levels they would have to be deleted from there also if you want them to be completely at the general node');
			closeModal();
		}else{
			alert('An error has occured when trying to demote this recurit');
		}
		changeIsSubmitting(false);
	}

	const selectDestinationNode=(data,index)=>{
		debugger;
		if(index==0)
			changeIsGeneralNode(true);
		changeDestinationDemoteNode(data)
	}
	return(

		<Container>
			{selectedRecruit!=null?
				<React.Fragment>
					{selectedNodeInformation==null?
						<React.Fragment>
							<p style={ButtonCSS} onClick={()=>changeSelectedRecruit(null)}>Back</p>
							<p>You've selected <b>{selectedRecruit.recruits.firstName}</b> to demote </p>
							<p>Below are the current nodes they are on. Click on the node that you want to demote them from.</p>
							<hr/>
							{nodesAssignedToRecruit.map(data=>
								<React.Fragment>
									<p onClick={()=>filterOutSelectedNode(data)}
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
									<p style={ButtonCSS} onClick={()=>changeSelectedNodeInformation(null)}>
										Back
									</p>
									<p>What node do you want to demote the recruit to?</p>
									{nodesNotAssignedToRecruit.map((data,index)=>
										<React.Fragment>
											<p onClick={()=>selectDestinationNode(data,index)}
												style={{color:"#C8B0F4",fontSize:"20px",cursor:"pointer"}}>
												<b>{data.name}</b>
											</p>
											<hr/>
										</React.Fragment>
									)}
								</React.Fragment>:
								<React.Fragment>
									<p style={ButtonCSS} onClick={()=>changeDestinationDemoteNode(null)}>
										Back
									</p>
									<p> Are you sure you want to demote <b>{selectedRecruit.recruits.firstName}</b></p>
									<p> from <b>{selectedNodeInformation.node.name}</b></p>
									<p> to <b>{destinationDemoteNode.name}</b> ?</p>
		 							<Submit onClick={()=>demoteRecruitHandle()}> 
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
					{recruits.length==0?
						<p>No recruits to demote :(</p>:
						<React.Fragment>
							<p>Here are the recruits you have promoted so far. Click one to demote </p>
							<hr/>
							{recruits.map(data=>
								<li onClick={()=>fetchSpecificNodesForRecruit(data)} style={RecruitsCSS}>
									<ul style={{padding:"10px"}}>
										<li style={{listStyle:"none"}}>
											<img id="recruitImage" src={data.recruits.profilePicture==null?
												NoProfilePicture:data.recruits.profilePicture} style={ImageCSS}/>
										</li>
										<li style={{listStyle:"none"}}>
											{data.recruits.firstName}
										</li>
										<li style={ButtonCSS}>
											Demote
										</li>
									</ul>
								</li>
							)}
						</React.Fragment>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default DemoteRecruit;