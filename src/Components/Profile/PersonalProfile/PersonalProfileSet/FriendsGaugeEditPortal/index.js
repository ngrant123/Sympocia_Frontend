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
				const recruitsData=await getProfileForHomePage(props.userId);
				console.log(recruitsData.recruits);
				changeRecruitsInformation(recruitsData.recruits);
		};
		getRecruitData();
	},[]);


	const constructFriendsGaugeEditPortal=(actionType)=>{
		if(actionType=="Add"){
			return <AddLevel
						userId={props.userId}
						nodeNumber={props.nodeNumber}
						actionType={props.actionType}
						recruitsInformation={recruitsInformation}
						closeModal={props.hideModal}
					/>;
		}else if(actionType=="Promote"){
			return <Promote
						actionType={props.actionType}
						recruitsInformationProp={recruitsInformation}
					/>;
		}else{
			return <RemoveLevel
						nodes={props.nodes}
						id={props.userId}
					/>;
		}
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={props.hideModal}
			/>
			<Container>
				{constructFriendsGaugeEditPortal(props.actionType)}
			</Container>

		</React.Fragment>
	,document.getElementById("personalContainer"));
};

export default FriendsGaugeEditPortal;