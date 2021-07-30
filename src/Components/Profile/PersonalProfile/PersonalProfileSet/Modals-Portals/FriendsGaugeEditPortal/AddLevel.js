import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createLevel} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {getProfileForHomePage} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";

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

	@media screen and (max-width:650px){
		#recruitImage{
			width:45px !important;
			height:40px !important;
		}
	}

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#recruitImage{
			height:60% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	#recruitImage{
			width:60% !important;
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
	width:"80%",
	height:"55px",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px"
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


const AddLevel=({userId,nodeNumber,recruitsInformation,closeModal})=>{
	const [displayAddNodeScreen,changeDisplayAddScreen]=useState(false);
	const [selectedRecruits,changeSelectedRecruits]=useState([]);

	const [currentSearchNames,changeCurrentSearchedNames]=useState([]);
	const [currentSearchName,changeSearchName]=useState([]);

	const [levelName,changeLevelName]=useState();
	const [levelDescription,changeLevelDescription]=useState();
	const [isProcessingSubmit,changeIsSubmitProcessing]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isMaxNodesReached,changeIsMaxNodesReached]=useState(nodeNumber==3?true:false);

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
			nodeCounter:nodeNumber,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}
		const {confirmation,data}=await createLevel(levelObject);
		if(confirmation=="Success"){
			const {message}=data;
			const newNode={
				name:levelName,
				description:levelDescription,
				nodeCounter:nodeNumber,
				_id:message
			}
			const addNodeAction={
				actionType:"Add",
				node:newNode
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

	return(
		<Container>
			{isMaxNodesReached==true?
				<p style={{padding:"20px"}}>Maximum nodes is 3 :( Please delete one</p>:
				<React.Fragment>
					{displayAddNodeScreen==true?
					 <ul style={{padding:"10px"}}>
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
																 <a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		<li onClick={()=>pushSelectedPersonToArray(data)} style={{listStyle:"none",color:"#5298F8",borderRadius:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",padding:"10px",textAlign:"center"}}>
																			Add 
																		</li>
																</a>

															</ul>
														</li>
													)}
												</>:
												<>
													{recruitsInformation.map(data=>
														<li style={{listStyle:"none",display:"inline-block",width:"25%",marginRight:"3%",borderRadius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
															<ul style={{padding:"10px"}}>
																<li style={{listStyle:"none"}}>
																	<img id="recruitImage" src={data.profilePicture==null?
																								NoProfilePicture:data.profilePicture} 
																		 style={ImageCSS}/>
																</li>
																<li id="recruitFirstName" style={{listStyle:"none"}}>
																	{data.firstName}
																</li>
																<li id="addButton" 
																	onClick={()=>pushSelectedPersonToArray(data)} style={AddButtonCSS}>
																	Add
																</li>
															</ul>
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