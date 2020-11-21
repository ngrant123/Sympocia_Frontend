import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import HightLightedQuestions from "../../HighLightedQuestions.js";
import Chat from "../../ChatRoom.js";
import SpecificFeatureSymposium from "../../SpecificSympsoiumFeatures/index.js";
import {Link} from "react-router-dom"
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";


const Container=styled.div`
	position:absolute;
	z-index:34;
	height:95%;
	width:90%;
	border-radius:5px;
	top:20%;
	left:5%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
	border-radius:5px;
`;

const ActiveProfilePictures=styled(Link)`
	position:relative;
	width:50px;
	height:25%;
	border-radius:50%;
	background-color:red;

`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:34;
	top:0px;
`;

const MobilePostOptionsPortal=(props)=>{
	const {
		closeModal,
		isSymposiumFollowed,
		followUnfollowSymposium
	}=props;

	const [displayHighlightedQuestions,changeDisplayHighlightedQuestions]=useState(false);
	const [displayActiveUsers,changeDisplayActiveUsers]=useState(false);
	const [displaySymposiumFeatures,changeDisplaySymposiumFeatures]=useState(false);

	const triggerHighlightedQuestions=()=>{
		changeDisplayHighlightedQuestions(true);
		changeDisplayActiveUsers(false);
		changeDisplaySymposiumFeatures(false);
	}
	const triggerActiveUsers=()=>{
		changeDisplayHighlightedQuestions(false);
		changeDisplayActiveUsers(true);
		changeDisplaySymposiumFeatures(false);
	}

	const triggerSymposiumFeatures=()=>{
		changeDisplayHighlightedQuestions(false);
		changeDisplayActiveUsers(false);
		changeDisplaySymposiumFeatures(true);

	}

	const highlightedQuestions=()=>{
		return <>
				{displayHighlightedQuestions==true &&(
					<>
						{props.popularQuestionObject.questionInformation.length==0?
								null
							:<HightLightedQuestions
								questionInformation={props.popularQuestionObject.questionInformation}
								isSimplified={props.popularQuestionObject.isSimplified}
								selectedSymposium={props.popularQuestionObject.selectedSymposium}
							/>
						}
					</>
				)}
			   </>
	}

	const activeUsers=()=>{
		return <>
					{displayActiveUsers==true &&(
						<>
							<p>Active Users:</p>
							<ul>
								{props.activePeople.map(data=>
									<li  style={{listStyle:"none",display:"inline-block",marginRight:"30px",marginBottom:"10px"}}>
										<ActiveProfilePictures to={{pathname:`/profile/${data._id}`}}>
											<img src={data.profilePicture!=null?
														data.profilePicture:
														NoProfilePicture} 
											style={{backgroundColor:"red", width:"70px",height:"70px",borderRadius:"50%"}}/>
										</ActiveProfilePictures>
									</li>
								)}
							</ul>
							<hr/>
						</>
					)}
				</>
	}

	const symposiumFeatures=()=>{
		return <>
				{displaySymposiumFeatures==true &&(
					<>
						{props.symposium=="General"||
							props.symposium=="Religion"||
							props.symposium=="Gaming"||
							props.symposium=="Philosophy"?
							<Chat
						  		roomId={props.roomId}
						  		chat={props.chatRoom}
						  		profileId={props.profileId}
						  		socket={props.socket}
							/>:
						  	<SpecificFeatureSymposium
					  			symposium={props.symposium}
					  			symposiumId={props.roomId}
					  			questions={props.symposiumFeatureQuestions}
					  		/>
				  		} 
					</>
				)}
			</>
	}

	return createPortal(
		<>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{highlightedQuestions()}
				{activeUsers()}
				{symposiumFeatures()}

				<ul>	
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>followUnfollowSymposium()}
							style={{listStyle:"none"}}>
							{isSymposiumFollowed==false?
						 		<p>Follow Symposium</p>:
						 		<p>Unfollow Symposium</p>
						 	}
						</li>
					</a>

					<hr/>

					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>alert("Unfortunately this isn't available on mobile please try on desktop")} 
							style={{listStyle:"none"}}>
							Symposium Features
						</li>
					</a>
					<hr/>

					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>triggerHighlightedQuestions()} style={{listStyle:"none"}}>
							Highlighted Questions
						</li>
					</a>
					<hr/>

					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>triggerActiveUsers()} style={{listStyle:"none"}}>
							Active People
						</li>
					</a>
				</ul>
			</Container>
		</>
	,document.getElementById("extendedSymposiumContainer"))
}

export default MobilePostOptionsPortal;