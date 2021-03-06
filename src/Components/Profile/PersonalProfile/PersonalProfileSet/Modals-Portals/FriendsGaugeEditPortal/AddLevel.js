import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createLevel} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {
	getProfileForHomePage,
	retrieveFriendsGaugeMaxLimitPaymentVerification
} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import VideoLoadingPrompt from "../../../../../GeneralComponents/PostComponent/VideoLoadingPrompt.js";

const Container=styled.div`
	@media screen and (min-width:2500px){
		padding:20px;
		#friendsGaugeTitleText{
			font-size:36px !important;
			margin-bottom:5% !important;
		}
		#levelName{
			font-size:48px !important;
		}
		#levelDescription{
			font-size:30px !important;
		}
		#recruitImage{
			height:200px !important;
		}
		#recruitFirstName{
			margin-top:5%;
			font-size:30px !important;
		}
		#addRecruitsToLevelText{
			font-size:30px !important;
		}
		#addButton{
			font-size:36px !important;
		}
		#removedRecruitIcon{
			font-size:48px !important;
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
			width:45px !important;
			height:40px !important;
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
	width:100%;

	@media screen and (min-width:2500px){
		font-size:36px !important;
		padding:10px;
	}
`;

const SubmitButton=styled.div`
	position:relative;
	text-align:center;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;
	cursor:pointer;
	@media screen and (min-width:2500px){
		font-size:36px !important;
	}

`;

const NextButton=styled.div`
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
	width:"60px",
	height:"55px",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px"
}

const ButtonCSS={	
  borderColor:"#5298F8",
  borderStyle:"solid",
  borderWidth:"1px",
  color:"#5298F8",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  marginBottom:"5%",
  cursor:"pointer"
}



const AddButtonCSS={
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


const AddLevel=({userId,nodeNumber,recruitsInformation,closeModal,isPhoneUITriggered})=>{
	const [displayAddNodeScreen,changeDisplayAddScreen]=useState(false);
	const [selectedRecruits,changeSelectedRecruits]=useState([]);

	const [currentSearchNames,changeCurrentSearchedNames]=useState([]);
	const [currentSearchName,changeSearchName]=useState([]);
	const [nodeVideoDescription,changeNodeVideoDescription]=useState();
	const [levelName,changeLevelName]=useState();
	const [levelDescription,changeLevelDescription]=useState();
	const [isProcessingSubmit,changeIsSubmitProcessing]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isMaxNodesReached,changeIsMaxNodesReached]=useState(nodeNumber==3?true:false);

	useEffect(()=>{
		const fetchPaymentVerification=async({isAccessTokenUpdated,updatedAccessToken})=>{
			const {confirmation,data}=await retrieveFriendsGaugeMaxLimitPaymentVerification(
												userId,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken);
			if(confirmation=="Success"){
				const {message}=data;
				if(message==true){
					changeIsMaxNodesReached(nodeNumber==5?true:false);
				}
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						fetchPaymentVerification,
						dispatch,
						{},
						false
					);
				}else{
					alert('Unfortunately there has been an error verifying payment so you will be limited to max 3 nodes. Please try again');
				}
			}
		}
		fetchPaymentVerification({isAccessTokenUpdated:false});
	},[]);

	useEffect(()=>{
		if(displayAddNodeScreen==false &&(levelName!=null && levelDescription!=null)){
			document.getElementById("levelName").value=levelName;
			document.getElementById("levelDescription").value=levelDescription;
		}
	},[displayAddNodeScreen]);

	const addNodeToProfile=()=>{
		if(document.getElementById("levelName").value!=""){
			changeLevelName(document.getElementById("levelName").value);
			changeLevelDescription(document.getElementById("levelDescription").value);
			changeDisplayAddScreen(true);
		}else{
			alert('Please enter a name for this level');
		}
	}

	const pushSelectedPersonToArray=(data)=>{
		selectedRecruits.push({_id:data._id,firstName:data.firstName});
		const newSelectedRecruitsArray=selectedRecruits;
		changeSelectedRecruits([...newSelectedRecruitsArray]);
	}

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

	const submitNode=async({isAccessTokenUpdated,updatedAccessToken})=>{
		
		changeIsSubmitProcessing(true);
		const levelObject={
			name:levelName,
			description:levelDescription,
			recruits:selectedRecruits,
			_id:userId,
			nodeVideoDescription,
			isPhoneUIEnabled:isPhoneUITriggered,
			nodeCounter:nodeNumber,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
			personalInformation.accessToken
		}
		if(nodeVideoDescription!=null && isAccessTokenUpdated==false){
			alert('Your video is processing. We wil notify via email and on here when your video description is uploaded :). You can close this screen now');
		}

		const {confirmation,data}=await createLevel(levelObject);
		if(confirmation=="Success"){
			const {message}=data;
			const newNode={
				name:levelName,
				description:levelDescription,
				nodeCounter:nodeNumber,
				nodeVideoDescription,
				containsVideoDescription:nodeVideoDescription==null?false:true,
				_id:message
			}
			const addNodeAction={
				actionType:"Add",
				node:newNode,
				isMaxAllowed:isMaxNodesReached==5?true:false
			}
			closeModal(addNodeAction);
		}else{

			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						submitNode,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error creating this level. Please try again');
			}
		}
		changeIsSubmitProcessing(false);
	}
	/*
		Right now the big o is O(n^2) its fine when a user has a short 
		amount of recruits but is ass when there is a larger amount 
		so has to be implemented differently later imp
	*/

	const constructWordFromArray=(wordArray)=>{
		var string="";
		for(var i=0;i<wordArray.length;i++){
			string=string+wordArray[i];
		}
		return string;
	}

	/*
		So far this implementation is 100% correct it displays the name correctly
		but the backspace implementation doesnt really work and if the user 
		types in a name that isnt there it just shoes the whole array instead of 
		saying no results. Its trivial at this stage though
	*/
	const searchForPerson=(key)=>{
		var searchedNames=[];
		if(key=="Backspace"){
			var currentName=constructWordFromArray(currentSearchName);

			currentSearchName.pop();
			for(var i=0;i<currentSearchNames.length;i++){
				const name=currentSearchNames[i].firstName;
				var indicator=true;
				for(var j=0;j<name.length;j++){
					if(name.charAt(j).toLowerCase()!=currentName.charAt(j).toLowerCase()){
						indicator=false;
						break;
					}
				}

				if(indicator==true){
					searchedNames.push(currentSearchNames[i]);
				}
			}
		}else{
				currentSearchName.push(key);
				var currentName=constructWordFromArray(currentSearchName);

				for(var i=0;i<recruitsInformation.length;i++){
					var {firstName}=recruitsInformation[i];
					if(currentName.charAt(0).toLowerCase()==firstName.charAt(0).toLowerCase()){
						if(currentName.length>1){
							var isSameIndicator=true;
							for(var j=1;j<currentName.length;j++){
								var firstNameCharacter=firstName.charAt(j);
								if(firstNameCharacter!=currentName.charAt(j)){
									isSameIndicator=false;
									break;
								}
							}

							if(isSameIndicator==true){
								searchedNames.push(recruitsInformation[i]);
							}
						}else{
							searchedNames.push(recruitsInformation[i]);
						}
					}
				}

			changeSearchName(currentSearchName);
			changeCurrentSearchedNames(searchedNames);
		}
	}

	const toggleVideoCreation=()=>{
		document.getElementById("uploadVideoFile").click();
	}

	const uploadNodeVideoDescription=()=>{
		const videoFile=document.getElementById("uploadVideoFile").files[0];
		const filereader=new FileReader();
		const maxFileSize=15*1024*1024
		const videoSize=videoFile.size;

		if(videoSize>maxFileSize){
			alert('The file you selected is too large. As of right now we only accept files of size 15MB for videos. Sorry for the inconvenience.');
		}else{
			filereader.onloadend=()=>{
				const videoUrl=filereader.result;
				changeNodeVideoDescription(videoUrl);
			}

			if(videoFile==null){
				alert('File format is not accepted unfortunately')
			}else{
				filereader.readAsDataURL(videoFile);
			}	
		}
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	return(
		<Container>
			{isMaxNodesReached==true?
				<p style={{padding:"20px"}}>Maximum nodes is 3 :( Please delete one</p>:
				<React.Fragment>
					{displayAddNodeScreen==true?
					 	<ul style={{padding:"10px"}}>
					 		<div style={{...ButtonCSS,width:"25%"}} onClick={()=>changeDisplayAddScreen(false)}>
					 			Back
					 		</div>
							<p id="levelName" style={{color:"#292929"}}>
								<b>{levelName}</b>
							</p>
							<p id="levelDescription" style={{color:"#292929"}}>{levelDescription}</p>
							<hr/>
							<p id="addRecruitsToLevelText" style={{color:"#A4A4A4"}}>
								List the people who you want to add to your new level (optional) 
							</p>
							{recruitsInformation.length==0?
								<p>Unfortunately, you dont have any recruits right now</p>:
								<>
									<li style={{listStyle:"none",marginTop:"5%"}}>
										<InputContainer id="firstNameContainer" onKeyDown={(e)=>searchForPerson(e.key)} placeholder="Search for someone here"/>
									</li>
									{selectedRecruits.map(data=>
										<li style={{listStyle:"none",display:"inline-block",width:"20%",marginBottom:"5%"}}>
											<ul style={{padding:"0px",width:"150%"}}>
												<li id="recruitFirstName" style={{listStyle:"none",display:"inline-block"}}>
													{data.firstName}
												</li>
												<li onClick={()=>removeSelectedPerson(data)} style={{listStyle:"none",display:"inline-block",width:"20%"}}>
													<HighlightOffIcon
														id="removedRecruitIcon"
														onClick={()=>removeSelectedPerson(data)}
													/>
												</li>
											</ul>
										</li>
									)}
									<li style={{marginTop:"2%",listStyle:"none",height:"45%",overflowY:"auto",marginBottom:"1%"}}>
										<ul style={{padding:"0px"}}>
											{currentSearchNames.length!=0?
												<>
													{currentSearchNames.map(data=>
														<li style={{listStyle:"none",display:"inline-block",width:"25%",marginRight:"3%",borderRadius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
															<ul style={{padding:"10px"}}>
																<li style={{listStyle:"none"}}>
																	<img id="recruitImage" src={
																			data.profilePicture==null?
																			NoProfilePicture:
																			data.profilePicture} style={ImageCSS}/>
																</li>
																<li id="recruitFirstName" style={{listStyle:"none"}}>
																	{data.firstName}
																</li>
																<li onClick={()=>pushSelectedPersonToArray(data)} style={ButtonCSS}>
																	Add 
																</li>
															</ul>
														</li>
													)}
												</>:
												<>
													{recruitsInformation.map(data=>
														<li style={{listStyle:"none",display:"inline-block",width:"25%",marginRight:"3%",borderRadius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
															<div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px"}}>
																<img id="recruitImage" src={
																	data.profilePicture==null?
																	NoProfilePicture:
																	data.profilePicture} style={ImageCSS}
																/>
																<p>{data.firstName}</p>
																<li onClick={()=>pushSelectedPersonToArray(data)} style={ButtonCSS}>
																	Add 
																</li>
															</div>
														</li>
													)}
												</>

											}
										</ul>
									</li>
								</>
							}

							{isProcessingSubmit==true?
								<p>Please wait.... </p>:
								<SubmitButton onClick={()=>submitNode({isAccessTokenUpdated:false})}>
									Submit
								</SubmitButton>
							}
						</ul>
						:<ul style={{padding:"20px"}}>
							<p id="friendsGaugeTitleText" style={{color:"#A4A4A4"}}>
								Give us more details about what you want to call this level 
							</p>
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<InputContainer id="levelName" placeholder="What do you want to call this level?"/>
							</li>

							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<InputContainer id="levelDescription" style={{height:"40%"}}placeholder="Enter a description (optional)"/>
							</li>
							{nodeVideoDescription==null?
								<div onClick={()=>toggleVideoCreation()} style={ButtonCSS}>
									Create video description
								</div>:
								<div style={{display:"flex",flexDirection:"column"}}>
									<div style={{display:"flex",flexDirection:"row"}}>
										<div onClick={()=>toggleVideoCreation()} style={ButtonCSS}>
											Redo video
										</div>
										<div onClick={()=>changeNodeVideoDescription(null)} 
											style={{...ButtonCSS,marginLeft:"2%"}}>
											Clear video
										</div>
									</div>
									{nodeVideoDescription!=null &&(
										<VideoLoadingPrompt
											videoElement={
												<video id="friendsLevelVideoDescription" key={uuidv4()} 
													width="100%" height="100%" borderRadius="50%"
													autoPlay loop autoBuffer 
													controls playsInline style={{backgroundColor:"#151515"}}>
													<source src={nodeVideoDescription} type="video/mp4"/>
												</video>
											}
											videoId="friendsLevelVideoDescription"
										/>
									)}
								</div>
							}
							<input type="file" accept="video/mp4,video/x-m4v,video/*" name="img"
								 id="uploadVideoFile" style={{position:"relative",opacity:"0",zIndex:"0"}}
								 onChange={()=>uploadNodeVideoDescription()}>
							</input>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<NextButton onClick={()=>addNodeToProfile()}>
									Next
								</NextButton>
							</a>
						</ul>
					}
				</React.Fragment>
			}
		</Container>

	)
}

export default AddLevel;