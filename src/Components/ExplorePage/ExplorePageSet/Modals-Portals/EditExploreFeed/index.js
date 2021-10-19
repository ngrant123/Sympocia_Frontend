import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {retrieveProfileFeedBreakDowns} from "../../../../../Actions/Requests/ExplorePageRequests/ExplorePageRetrieval.js";
import {useSelector} from "react-redux";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import EditRelationshipValue from "./EditRelationshipValue.js";
import ClearFeed from "./ClearFeed.js";
import DeleteSymposium from "./DeleteSymposium.js";

const Container=styled.div`
	position:fixed;
	background-color:red;
	z-index:40;
	height:65%;
	width:40%;
	border-radius:5px;
	top:20%;
	left:30%;
	background-color:white;
	padding:20px;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		left:10%;
		width:80%;

	}

	@media screen and (max-width:650px){
		width:100%;
		height:100%;
		top:0%;
		left:0%;

		#mobileCloseModalIcon{
			display:block !important;
		}
	}
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:110%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	left:-5;
	top:0px;
`;

const ClearFeedButton={
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
	marginBottom:"2%"
}


const ExplorePageOptionsCSS={
	borderColor:"#D0D0D0",
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	padding:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer",
	backgroundColor:"white",
	color:"#000000"
}

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"5%",
	marginBottom:"2%",
	cursor:"pointer"
}

const EditExplorePageFeed=({closeModal})=>{
	const [feedBreakDowns,changeFeedBreakDowns]=useState([]);
	const [isLoading,changeIsLoadingStatus]=useState(true);
	const [displayEditRelationshipValueModal,changeEditRelationshipValueModal]=useState(false);
	const [displayDeleteSymposiumModal,changeDisplayDeleteSymposiumModal]=useState(false);
	const [displayCloseModal,changeDisplayCloseModal]=useState(false);
	const [displayClearFeedModal,changeDisplayClearFeedModal]=useState();
	const [displayIndex,changeDisplayIndex]=useState(true);
	const [selectedSymposium,changeSelectedSymposium]=useState();
	const [indexToSymposiumMapping,changeIndexToSymposiumMapping]=useState({});

	const userId=useSelector(state=>state.personalInformation.id);
	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveProfileFeedBreakDowns(userId);
			if(confirmation=="Success"){
				debugger;
				const {message}=data;
				const mapping={};
				for(var i=0;i<message.length;i++){
					mapping[message[i].symposiumId]=i;
				}
				changeIndexToSymposiumMapping(mapping);
				changeFeedBreakDowns([...message]);
			}else{
				alert("Unfortunately there has been an error when retrieving feed breakdown. Please try again");
			}
			changeIsLoadingStatus(false);
		}
		fetchData();
	},[])

	const feedBreakDown=(data)=>{
		console.log(data);
		return(
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<p style={{fontSize:"18px",marginRight:"5%"}}>
					<b>{data.symposiumName}</b>
				</p>
				<p style={{fontSize:"18px",marginRight:"20%"}}>{data.relationshipValue}</p>
				<BorderColorIcon
					onClick={()=>triggerDisplayEditModal(data)}
					style={{fontSize:40,...ShadowButtonCSS}}
				/>

				<svg id="removePostOption" onClick={()=>triggerDeleteSymposiumModal(data)}
					 xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
					width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
					stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <line x1="4" y1="7" x2="20" y2="7" />
				  <line x1="10" y1="11" x2="10" y2="17" />
				  <line x1="14" y1="11" x2="14" y2="17" />
				  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
				  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
				</svg>
			</div>
		)
	}

	const triggerDeleteSymposiumModal=(data)=>{
		clearModals();	
		changeSelectedSymposium(data);
		changeDisplayDeleteSymposiumModal(true);
	}

	const triggerDisplayEditModal=(data)=>{
		clearModals();
		changeSelectedSymposium(data);
		changeEditRelationshipValueModal(true)
	}

	const triggerDisplayIndex=()=>{
		changeDisplayIndex(true);
	}

	const closeEditModal=()=>{
		changeEditRelationshipValueModal(false);
		triggerDisplayIndex();
	}

	const clearModals=()=>{
		changeEditRelationshipValueModal(false);
		changeDisplayIndex(false);
	}

	const closeDeleteModal=()=>{
		changeDisplayDeleteSymposiumModal(false);
		triggerDisplayIndex();
	}

	const deleteSymposiumFeedBreakDown=(symposiumId)=>{
		debugger;
		const index=indexToSymposiumMapping[symposiumId];
		feedBreakDowns.splice(index,1);
		changeFeedBreakDowns([...feedBreakDowns]); 
	}

	const deleteSymposium=()=>{
		return(
			<React.Fragment>
				{displayDeleteSymposiumModal==true &&(
					<DeleteSymposium
						closeModal={closeDeleteModal}
						symposiumId={selectedSymposium.symposiumId}
						userId={userId}
						deleteSymposiumFeedBreakDown={deleteSymposiumFeedBreakDown}
					/>
				)}
			</React.Fragment>
		)
	}

	const updateRelationShipValue=(symposiumId,value)=>{
		debugger;
		const index=indexToSymposiumMapping[symposiumId];
		feedBreakDowns[index]={
			...feedBreakDowns[index],
			relationshipValue:value
		}
		changeFeedBreakDowns([...feedBreakDowns]);
	}

	const editRelationshipValue=()=>{
		return(
			<React.Fragment>
				{displayEditRelationshipValueModal==true&&(
					<EditRelationshipValue
						closeModal={closeEditModal}
						symposiumData={selectedSymposium}
						userId={userId}
						updateRelationShipValue={updateRelationShipValue}
					/>
				)}
			</React.Fragment>
		)
	}

	const closeClearModal=()=>{
		changeDisplayClearFeedModal(false);
		triggerDisplayIndex();
	}

	const clearFeedBreakDowns=()=>{
		debugger;
		changeFeedBreakDowns([]);
	}

	const clearFeed=()=>{
		return(
			<React.Fragment>
				{displayClearFeedModal==true &&(
					<ClearFeed
						closeModal={closeClearModal}
						userId={userId}
						clearFeedBreakDowns={clearFeedBreakDowns}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerClearFeedModal=()=>{
		clearModals();
		changeDisplayClearFeedModal(true);
	}

	const index=()=>{
		return(
			<React.Fragment>
				{displayIndex==true &&(
					<React.Fragment>
						{mobileCloseIcon()}
						<p style={{fontSize:"24px"}}>
							<b>Explore Feed Settings</b>
						</p>
						<p>Edit explore feed settings here</p>
						<hr/>
						<div style={ClearFeedButton} onClick={()=>triggerClearFeedModal()}>
							Clear Feed
						</div>
						{isLoading==true?
							<p>Loading...</p>:
							<React.Fragment>
								{feedBreakDowns.length==0?
									<p>No feed information</p>:
									<React.Fragment>
										{feedBreakDowns.map(data=>
											<>{feedBreakDown(data)}</>
										)}
									</React.Fragment>
								}
							</React.Fragment>
						}
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	const mobileCloseIcon=()=>{
		return(
			<div id="mobileCloseModalIcon" onClick={()=>closeModal()}
				style={{cursor:"pointer",display:"none"}} >
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{index()}
				{editRelationshipValue()}
				{deleteSymposium()}
				{clearFeed()}
			</Container>
		</React.Fragment>
	,document.getElementById("homePageContainer"))
}

export default EditExplorePageFeed;