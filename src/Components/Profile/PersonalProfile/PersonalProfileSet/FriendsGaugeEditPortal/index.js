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
	console.log(props);
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
	const [displayClosingScreen,changeDisplayClosingScreen]=useState(false);


	useEffect(()=>{
		const getRecruitData=async()=>{
				const recruitsData=await getProfileForHomePage(props.userInformation);
				var recruits=recruitsData.recruits==null?[]:recruitsData.recruits;
				changeRecruitsInformation(recruits);
		};
		getRecruitData();
	},[]);

	const closingScreen=(data)=>{
		console.log(data);
		props.implementAction(data);
		changeDisplayClosingScreen(true);
	}
	const closingConfirmationScreen=()=>{
		return	 <ul>
						<li onClick={()=>props.closeModal()} style={{listStyle:"none",marginLeft:"75%"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z"/>
								  <circle cx="12" cy="12" r="9" />
								  <path d="M10 10l4 4m0 -4l-4 4" />
								</svg>
							</a>
						</li>

						<li style={{listStyle:"none",marginLeft:"20%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginLeft:"25%"}}>
									<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checkbox" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#01ff08" fill="none" stroke-linecap="round" stroke-linejoin="round">
									  <path stroke="none" d="M0 0h24v24H0z"/>
									  <polyline points="9 11 12 14 20 6" />
									  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
									</svg>
								</li>
								<li style={{listStyle:"none"}}>
									<b>Action Completed</b>
								</li>
								<li style={{listStyle:"none"}}>
									Everything looks all good. 
								</li>
							</ul>
						</li>
					</ul>
	}

	const constructFriendsGaugeEditPortal=(actionType)=>{
		if(actionType=="Add"){
			return <AddLevel
						userId={props.userInformation}
						nodeNumber={props.nodeNumber}
						recruitsInformation={recruitsInformation}
						closeModal={closingScreen}
					/>;
		}else if(actionType=="Promote"){
			return <Promote
						recruitsInformationProp={recruitsInformation}
						nodes={props.nodes}
						closeModal={closingScreen}
						id={props.userId}
					/>;
		}else{
			return <RemoveLevel
						nodes={props.nodes}
						id={props.userId}
						closeModal={closingScreen}
					/>;
		}
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={props.hideModal}
			/>
			<Container>
				{displayClosingScreen==false?
					<>
						{constructFriendsGaugeEditPortal(props.actionType)}
					</>:
					<>
						{closingConfirmationScreen()}
					</>
				}
			</Container>

		</React.Fragment>
	,document.getElementById("personalContainer"));
};

export default FriendsGaugeEditPortal;