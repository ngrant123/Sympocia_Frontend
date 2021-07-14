import React,{useState,useEffect} from "react";
import styled from "styled-components";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import {promoteRecruitRequest} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const Container=styled.div`
	@media screen and (max-width:1370px){
		#recruitImage{
			height:40% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#recruitImage{
			height:60% !important;
			width:60% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	#recruitImage{
			width:45% !important;
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
	position:relative;
	text-align:center;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;
`;

const SubmitButton=styled.div`
	position:relative;
	text-align:center;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;
`;

const ImageCSS={
	width:"70px",
	height:"30%",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px"
}

const PromoteSomeone=({recruitsInformationProp,nodes,closeModal,id})=>{
	const [recruitsInformation,changeRecruitsInformation]=useState(recruitsInformationProp);
	const [displayPromoteSomeoneScreen,changeDisplayPromotionScreen]=useState(false);
	const [selectedRecruits,changeSelectedRecruits]=useState([]);
	const [selectedNode,changeSelectedNode]=useState();
	const [selectedRecruitsMap,changeSelectedRecruitsMap]=useState(new Map());
	const [isProcessingSubmit,changeIsSubmitProcessing]=useState(false); 

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


	return(
		<Container>
			{displayPromoteSomeoneScreen==false?
				 <ul style={{padding:"25px"}}>
				 		{/*
							<li style={{listStyle:"none",marginTop:"5%",marginLeft:"10%"}}>
								<InputContainer placeholder="Search for some here"/>
							</li>
							<hr/>
				 		*/}
				 		<p style={{fontSize:"20px"}}>
				 			<b>Click on the recruits that you would like to promote </b>
				 		</p>
				 		<hr/>
						{selectedRecruits.map(data=>
										<li style={{listStyle:"none",display:"inline-block",width:"20%",marginBottom:"5%"}}>
											<ul style={{padding:"0px",width:"150%"}}>
												<li style={{listStyle:"none",display:"inline-block"}}>
													{data.firstName}
												</li>
												<li onClick={()=>removeSelectedPerson(data)} style={{listStyle:"none",display:"inline-block",width:"20%"}}>
														<HighlightOffIcon
															onClick={()=>removeSelectedPerson(data)}
														/>
												</li>
											</ul>
										</li>
							)}
						<li style={{listStyle:"none",height:"45%",overflowY:"auto",marginBottom:"1%"}}>
							<ul style={{padding:"0px"}}>
								{recruitsInformationProp.length==0?
									<p> Unfortunately you dont have any recruits. Add some then come back here later </p>:
									<>
										{recruitsInformationProp.map(data=>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li  onClick={()=>pushSelectedPersonToArray(data)} style={{listStyle:"none",display:"inline-block",width:"35%",marginRight:"3%",borderRadius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
													<ul style={{padding:"10px"}}>
														<li style={{listStyle:"none"}}>
															<img id="recruitImage" src={data.profilePicture==null?
																NoProfilePicture:data.profilePicture} style={ImageCSS}
															/>
														</li>
														<li style={{listStyle:"none"}}>
															{data.firstName}
														</li>
														<li style={{listStyle:"none",color:"#5298F8",borderRadius:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",padding:"10px",textAlign:"center"}}>
															Promote
														</li>
													</ul>
												</li>
											</a>
										)}
									</>
								}
							</ul>
						</li>
						{selectedRecruits.length>0?
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<NextButton onClick={()=>changeDisplayPromotionScreen(true)}>
									Next
								</NextButton>
							</a>

						:null}
					</ul>:
					<>
						<ul style={{padding:"25px"}}>
							{selectedNode!=null?
								<>
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
								</>:null
							}
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<p style={{fontSize:"20px"}}>
							 			<b>Click the level that you want to promote the recruit to</b>
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
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li onClick={()=>changeSelectedNode(data)} style={{listStyle:"none"}}>
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
							 		}
								</ul>
							</li>
						</ul>
					</>
				}
		</Container>

	)
}

export default PromoteSomeone;