import React,{useState,useEffect} from "react";
import styled from "styled-components";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import {promoteRecruitRequest} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const Container=styled.div`
	@media screen and (min-width:2500px){
		padding:20px;
		#title{
			font-size:36px !important;
		}
		#recruitImage{
			width:110px !important;
			height:100px !important;
		}
		#recruitFirstName{
			font-size:36px !important;
		}
		#promoteButton{
			font-size:24px !important;
		}
		#removedRecruitIcon{
			font-size:48px !important;
		}
		#nodeTitle{
			font-size:36px !important;
		}
		#nodeDescription{
			font-size:24px !important;
		}
	}

	@media screen and (max-width:1370px){
		#recruitImage{
			width:65px !important;
			height:60px !important;
		}
	}

	@media screen and (max-width:550px){
		#recruitImage{
			height:70px !important;
			width:75px !important;
		}
		#recruitContainer{
			padding:10px !important;
			width:40% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#recruitImage{
			width:65px !important;
			height:60px !important;
		}
    }
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;

	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	padding-right:120px;
`;

const NextButton=styled.div`
	position:sticky;
	text-align:center;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;
	cursor:pointer;
	top:10px;
	margin-bottom:5%;

	@media screen and (min-width:2500px){
		font-size:36px !important;
	}
`;

const SubmitButton=styled.div`
	position:relative;
	text-align:center;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;

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
	borderWidth:"1px"
}

const RecruitsContainerCSS={
	display:"flex",
	flexDirection:"column",
	justifyContent:"center",
	alignItems:"center",
	width:"35%",
	marginRight:"5%",
	borderRadius:"5px",
	boxShadow:"1px 1px 10px #d5d5d5",
	cursor:"pointer",
	marginBottom:"10%",
	padding:"5px"
}

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

const PromoteButtonCSS={
	color:"#5298F8",
	borderRadius:"5px",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	padding:"10px",
	textAlign:"center"
}

const PromoteSomeone=({recruitsInformationProp,nodes,closeModal,id})=>{
	const [recruitsInformation,changeRecruitsInformation]=useState(recruitsInformationProp);
	const [displayPromoteSomeoneScreen,changeDisplayPromotionScreen]=useState(false);
	const [selectedRecruits,changeSelectedRecruits]=useState([]);
	const [selectedNode,changeSelectedNode]=useState();
	const [selectedRecruitsMap,changeSelectedRecruitsMap]=useState(new Map());
	const [isProcessingSubmit,changeIsSubmitProcessing]=useState(false); 
	const [displaySubmitPromotionModal,changeDisplaySubmitPromotionModal]=useState(false);

	useEffect(()=>{
		
		const selectedRecruitsMapping=new Map();
		for(var i=0;i<selectedRecruits.length;i++){
			const {_id,firstName}=selectedRecruits[i];
			selectedRecruitsMapping.set(_id,firstName);
		}
		changeSelectedRecruitsMap(selectedRecruitsMapping)
	},[selectedRecruits]);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	const removeSelectedPerson=(data)=>{
		
		const selectedId=data._id;
		var newArray=[];
		for(var i=0;i<selectedRecruits.length;i++){
			const {_id}=selectedRecruits[i];
			if(_id==selectedId)
				continue
			else
				newArray.push(selectedRecruits[i]);
		}

		changeSelectedRecruits([...newArray]);
	}

	const pushSelectedPersonToArray=(data)=>{
		console.log(data);
		selectedRecruits.push(data);
		const newSelectedRecruitsArray=selectedRecruits;
		changeSelectedRecruits([...newSelectedRecruitsArray]);
	} 


	const promoteRecruits=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const promoteRecruit={
			selectedRecruits:selectedRecruits,
			node:selectedNode._id,
			_id:id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}

		const {confirmation,data}=await promoteRecruitRequest(promoteRecruit);
		if(confirmation=='Success'){
			
			const {message}=data;
			let{
				recruitsAdded,
				recruitsNotAdded
			}=message;
			if(recruitsNotAdded.length>0){
				for(var j=0;j<recruitsNotAdded.length;j++){
					const _id=recruitsNotAdded[j];
					const recruitName=selectedRecruitsMap.get(_id);
					recruitsNotAdded[j]=recruitName;
				}
				alert("The selected recruits:"+recruitsNotAdded.toString()+' have not been added because they have already'+
				' been added to your level before.');
			}else{
				alert('Selected recruits promoted');
				closeModal();
			}
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						promoteRecruits,
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

	const triggerDisplaySubmitPrompt=(data)=>{
		changeSelectedNode(data);
		changeDisplaySubmitPromotionModal(true);
	}
	const submitText=()=>{
		let usersEligibleForPromotion="";
		for(var i=0;i<selectedRecruits.length;i++){
			if(i!=selectedRecruits.length-1){
				usersEligibleForPromotion+=selectedRecruits[i].firstName+",";
			}else{
				usersEligibleForPromotion+=" and "+selectedRecruits[i].firstName;
			}
		}
		return <p>Are you sure you want to promote {usersEligibleForPromotion} to node level: {selectedNode.name}?</p>
	}

	return(
		<Container>
			{displayPromoteSomeoneScreen==false?
				<ul style={{padding:"25px"}}>
					{selectedRecruits.length>0 &&(
						<NextButton onClick={()=>changeDisplayPromotionScreen(true)}>
							Next
						</NextButton>
					)}
			 		{/*
						<li style={{listStyle:"none",marginTop:"5%",marginLeft:"10%"}}>
							<InputContainer placeholder="Search for some here"/>
						</li>
						<hr/>
			 		*/}
			 		<p id="title">
			 			<b>Click on the recruits that you would like to promote </b>
			 		</p>
			 		<hr/>
					{selectedRecruits.map(data=>
						<li style={{listStyle:"none",display:"inline-block",width:"20%",marginBottom:"5%"}}>
							<ul style={{padding:"0px",width:"150%"}}>
								<li id="recruitFirstName" style={{listStyle:"none",display:"inline-block"}}>
									{data.firstName}
								</li>
								<li onClick={()=>removeSelectedPerson(data)} 
									style={{listStyle:"none",display:"inline-block",width:"20%",cursor:"pointer"}}>
									<HighlightOffIcon
										id="removedRecruitIcon"
										onClick={()=>removeSelectedPerson(data)}
									/>
								</li>
							</ul>
						</li>
					)}
					<li style={{listStyle:"none",height:"45%",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							{recruitsInformationProp.length==0?
								<p> Unfortunately you dont have any recruits. Add some then come back here later </p>:
								<div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
									{recruitsInformationProp.map(data=>
										<div id="recruitContainer"
											onClick={()=>pushSelectedPersonToArray(data)} style={RecruitsContainerCSS}>
											<img id="recruitImage" src={data.profilePicture==null?
												NoProfilePicture:data.profilePicture} style={ImageCSS}
											/>
											<p id="recruitFirstName">{data.firstName}</p>
											<p id="promoteButton" style={PromoteButtonCSS}>
												Promote
											</p>
										</div>
									)}
								</div>
							}
						</ul>
					</li>
				</ul>:
				<>
					<ul style={{padding:"25px"}}>
						{displaySubmitPromotionModal==false?
							<React.Fragment>
								<div style={BackButtonCSS} onClick={()=>changeDisplayPromotionScreen(false)}>
									Back
								</div>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<p id="title"  style={{marginBottom:"5%"}}>
								 			Click the level that you want to promote the recruit to
								 		</p>
								 		<hr/>
								 		{nodes.length==0?
								 			<p>
								 				Unfortunately you have no levels to promote your recruit to.
								 			 	Please create a new one and revisit this screen again
								 			</p>:
								 			<>
												{nodes.map(data=>
													<>
														<li onClick={()=>triggerDisplaySubmitPrompt(data)}
															style={{listStyle:"none",cursor:"pointer"}}>
															<p id="nodeTitle" style={{fontSize:"25px"}}>
																<b> {data.name} </b>
															</p>
															<p id="nodeDescription">{data.description}</p>
														</li>
														<hr/>
													</>
												)}
								 			</>
								 		}
									</ul>
								</li>
							</React.Fragment>:
							<React.Fragment>
								<div style={BackButtonCSS} onClick={()=>changeDisplaySubmitPromotionModal(false)}>
									Back
								</div>
								<p>{submitText()}</p>
								{isProcessingSubmit==true?
									<p>Please wait...</p>
									:<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={{listStyle:"none",marginBottom:"5%"}}>
											<SubmitButton onClick={()=>promoteRecruits({isAccessTokenUpdated:false})}>
												Submit
											</SubmitButton>
										</li>
									</a>
								}
							</React.Fragment>
						}
					</ul>
				</>
			}
		</Container>

	)
}

export default PromoteSomeone;