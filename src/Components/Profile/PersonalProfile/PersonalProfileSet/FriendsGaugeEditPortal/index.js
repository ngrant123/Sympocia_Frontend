import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {
		createLevel,
		removeLevel,
		changeRecruitLevelStatus,
		editLevelName,
		editLevelDescription
} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {getProfileForHomePage} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddLevel from "./AddLevel.js";
import RemoveLevel from "./RemoveLevel.js";
import Promote from "./Promote.js";

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:12;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
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


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
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

const RemoveLevelVerificationContainer=styled.div`
	position:fixed;
	width:50%;
	height:60%;
	background-color:white;
	z-index:13;
	top:20%;
	border-radius:5px;
	left:30%;
	overflow-y:auto;
`;


const ImageCSS={
	width:"80%",
	height:"30%",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px"
}

const NewNodeImageCSS={
	width:"50%",
	height:"25%",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px",
	boxShadow:"15px #b9d6ff"
}

/*
	Later on since this compeonnt has to the potential to be bigger
	I think it should be refatored into a folder with addLevel,rmoveLevel,
	promoteFriend components in it 

*/

const FriendsGaugeEditPortal=(props)=>{
	const [recruitsInformation,changeRecruitsInformation]=useState([]);
	const [selectedRecruits,changeSelectedRecruits]=useState([]);

	const [displayAddNodeScreen,changeDisplayAddScreen]=useState(false);
	const [displayPromoteSomeoneScreen,changeDisplayPromotionScreen]=useState(false);

	const [levelName,changeLevelName]=useState();
	const [levelDescription,changeLevelDescription]=useState();
	const [currentSearchNames,changeCurrentSearchedNames]=useState([]);
	const [currentSearchName,changeSearchName]=useState([]);

	const [removedNodes,changeRemovedNodes]=useState([]);
	const [displayRemoveNodeVerification,changeRemoveNodeVerificationModal]=useState(false);


	useEffect(()=>{
		const getRecruitData=async()=>{
				const recruitsData=await getProfileForHomePage(props.userInformation);
				console.log(recruitsData.recruits);
				changeRecruitsInformation(recruitsData.recruits);
		};
		getRecruitData();
	},[]);

	const pushSelectedPersonToArray=(data)=>{
		selectedRecruits.push(data);
		const newSelectedRecruitsArray=selectedRecruits;
		changeSelectedRecruits([...newSelectedRecruitsArray]);
		console.log(selectedRecruits);
	} 

	const removeSelectedPerson=(data)=>{
		debugger;
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


	const submitNode=async()=>{
		debugger;
		const levelObject={
			name:levelName,
			description:levelDescription,
			recruits:selectedRecruits,
			_id:props.userInformation,
			nodeCounter:props.nodeNumber
		}

		const {confirmation,data}=await createLevel(levelObject);
		if(confirmation=="Success"){
			
		}else{
			alert('Something went wrong Unfortunately. Please try again');
		}

	}

	const addNodeToProfile=()=>{
		changeLevelName(document.getElementById("levelName").value);
		changeLevelDescription(document.getElementById("levelDescription").value);
		changeDisplayAddScreen(true);
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
		debugger;
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
			console.log(searchedNames);
		}
	}

	const addNodeModal=()=>{
		debugger;
		if(displayAddNodeScreen==true){
			return <ul style={{padding:"10px"}}>
						<p style={{color:"#292929"}}>
							<b>{levelName}</b>
						</p>
						<p style={{color:"#292929"}}>{levelDescription}</p>
						<hr/>
						<p style={{color:"#A4A4A4"}}> List the people who you want to add to your new level (optional) </p>
						{recruitsInformation.length==0?
							<p>Unfortunately, you dont have any recruits right now</p>:
							<>
								<li style={{listStyle:"none",marginTop:"5%"}}>
									<InputContainer id="firstNameContainer" onKeyDown={(e)=>searchForPerson(e.key)} placeholder="Search for someone here"/>
								</li>
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
										{currentSearchNames.length!=0?
											<>
												{currentSearchNames.map(data=>
													<li style={{listStyle:"none",display:"inline-block",width:"25%",marginRight:"3%",borderRadius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
														<ul style={{padding:"10px"}}>
															<li style={{listStyle:"none"}}>
																{data.profilePicture==null?
																	<img src={NoProfilePicture} style={ImageCSS}/>:
																	<img src={data.profilePicture} style={ImageCSS}/>
																}
															</li>
															<li style={{listStyle:"none"}}>
																{data.firstName}
															</li>
															 <a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<li onClick={()=>pushSelectedPersonToArray(data)} style={{listStyle:"none",color:"#5298F8",borderRadius:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",padding:"10px",textAlign:"center"}}>
																		{props.actionType}
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
																{data.profilePicture==null?
																	<img src={NoProfilePicture} style={ImageCSS}/>:
																	<img src={data.profilePicture} style={ImageCSS}/>
																}
															</li>
															<li style={{listStyle:"none"}}>
																{data.firstName}
															</li>
															 <a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<li onClick={()=>pushSelectedPersonToArray(data)} style={{listStyle:"none",color:"#5298F8",borderRadius:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",padding:"10px",textAlign:"center"}}>
																		{props.actionType}
																	</li>
															</a>

														</ul>
													</li>
												)}
											</>

										}
									</ul>
								</li>
							</>
						}
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<SubmitButton onClick={()=>submitNode()}>
								Submit
							</SubmitButton>
						</a>
					</ul>
		}else{
			//Specific add node modal
			return <ul style={{padding:"20px"}}>
						<p style={{color:"#A4A4A4"}}> Give us more details about what you want to call this level </p>
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
	}

	const closeRemoveNodeVerificationModal=()=>{
		changeRemoveNodeVerificationModal(false);
	}

	const removeNodeVerification=()=>{
		return(
			<>
				<ShadowContainer
					onClick={()=>closeRemoveNodeVerificationModal()}
				/>
				<RemoveLevelVerificationContainer>
				</RemoveLevelVerificationContainer>
			</>
		)
	}

	const addRemovedNodeToQueue=(node)=>{
		/*
			debugger;
			var currentRemovedNodes=removedNodes;
			currentRemovedNodes.push(node);
			changeRemovedNodes([...currentRemovedNodes]);
		*/
		changeRemoveNodeVerificationModal(true);
	}

	const removeNodeModal=()=>{
		return <ul style={{padding:"10px"}}>
					<p>Click the ones that you would like to remove </p>
				{/*

					<li style={{listStyle:"none"}}>
							{removedNodes.length!=0?
								<>
									{removedNodes.map(data=>
										<li style={{listStyle:"none",display:"inline-block"}}>
											{data.name}
										</li>
									)}
								</>:null
							}
						</li>
				*/}
					{props.nodes.map(data=>
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
				</ul>
	}
//
	const promoteSomoneModal=()=>{
		if(displayPromoteSomeoneScreen==false){
			return <ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",marginTop:"5%",marginLeft:"10%"}}>
							<InputContainer placeholder="Search for some here"/>
						</li>

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
								{recruitsInformation.length==0?
									<p> Broke ass </p>:
									<>
										{recruitsInformation.map(data=>
											<li style={{listStyle:"none",display:"inline-block",width:"25%",marginRight:"3%",borderRadius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
												<ul style={{padding:"10px"}}>
													<li style={{listStyle:"none"}}>
														{data.profilePicture==null?
															<img src={NoProfilePicture} style={ImageCSS}/>:
															<img src={data.profilePicture} style={ImageCSS}/>
														}
													</li>
													<li style={{listStyle:"none"}}>
														{data.firstName}
													</li>
													 <a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<li onClick={()=>pushSelectedPersonToArray(data)} style={{listStyle:"none",color:"#5298F8",borderRadius:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",padding:"10px",textAlign:"center"}}>
																{props.actionType}
															</li>
													</a>

												</ul>
											</li>
										)}
									</>
								}
							</ul>
						</li>
						<NextButton>
							Next
						</NextButton>
					</ul>
		}else{
			//Screen that allows person to pick which node level to place a person
		}
	}

	const constructFriendsGaugeEditPortal=(actionType)=>{
		if(actionType=="Add"){
			return <AddLevel
						userInformation={props.userInformation}
						nodeNumber={props.nodeNumber}
						actionType={props.actionType}
						recruitsInformationProp={recruitsInformation}
					/>;
		}else if(actionType=="Promote"){
			return <Promote
						actionType={props.actionType}
						recruitsInformationProp={recruitsInformation}
					/>;
		}else{
			return removeNodeModal();
		}
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={props.hideModal}
			/>
			{displayRemoveNodeVerification==false?
				null:
				removeNodeVerification()
			}
			<Container>
				{constructFriendsGaugeEditPortal(props.actionType)}
			</Container>

		</React.Fragment>
	,document.getElementById("personalContainer"));
};

export default FriendsGaugeEditPortal;