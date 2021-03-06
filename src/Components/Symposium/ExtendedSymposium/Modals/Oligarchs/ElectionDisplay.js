import React,{useState,useEffect} from "react";
import styled from "styled-components";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {
	getSymposiumOligarchCards,
	searchForSpecificOligarchCard
} from "../../../../../Actions/Requests/OligarchRequests/OligarchRetrieval.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import CurrentOligarchs from "./CurrentOligarchs.js";


const InputContainer=styled.textarea`
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	margin-top:2%;
	width:100%;
	resize:none;
	padding:5px;
`;


const ElectionCardContainer=styled.div`
	position:relative;
	display:flex;
	flex-direction:row;
	margin-bottom:5%;
	padding:10px;
	overflow:hidden;

	@media screen and (max-width:650px){
		#contestantProfilePicture{
			height:40px !important;
			width:40px !important;
		}
		#trophyAndNameContainer{
			flex-direction:column !important;
		}
		#ranking{
			display:none !important;
		}
		#electionSpeechAndNameDiv{
			width:95% !important;
		}
		#contestantFirstName{
			font-size:18px !important;
		}
	}
`;

const BoltContainer=styled.div`
	cursor:pointer;
	transform: rotate(25deg);

	@media screen and (max-width:650px){
		display:none !important;
	}
`;

const ShadowContainer=styled.div`
	position:absolute
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const CurrentOligarchsContainer=styled.div`
	position:absolute;
	background-color:red;
	width:265px;
	height:400px;
	border-radius:5px;
	left:70%;
	top:15%;
`;
const CreationIconCSS={
	backgroundColor:"white",
	borderRadius:"50%",
	padding:"10px",
	borderStyle:"solid",
	borderWidth:"5px",
	borderColor:"#C8B0F4",
	marginLeft:"5%",
	cursor:"pointer"
}
const HorizontalLineCSS={
	marginLeft:"0",
	position:"relative",
	marginRight:"0"
}
const BootStrapDropDownButtonCSS={
	borderStyle:"none",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
}

const DropDownMenuCSS={
	marginLeft:"-150px",
	width:"290px",
	height:"400px",
	overflow:"auto",
	marginTop:"30px",
	padding:"10px",
	overflowY:"scroll"
}

const CurrentOligarchsContainerCSS={
	display:"flex",
	flexDirection:"row",
	width:"20%",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#D8D8D8",
	padding:"5px",
	alignItems:"center"
}
const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginLeft:"3%"
}

const ElectionDisplay=({displayCreationModal,displayElectionCard,newContestant,symposiumId,displayCurrentOligarchsMobile})=>{
	const [electionContestants,changeElectionContestants]=useState([]);
	const [loading,changeLoadingStatus]=useState(false);
	const [isSearchResult,changeIsSearchResult]=useState(false);
	useEffect(()=>{
		fetchData();
	},[]);

	const fetchData=async()=>{
		changeLoadingStatus(true);
		changeIsSearchResult(false);
		const {confirmation,data}=await getSymposiumOligarchCards(symposiumId)
		if(confirmation=="Success"){
			const {message}=data;
			changeElectionContestants(message);
		}else{
			alert('Unfortunately there was an error retrieving the oligarch contestants.Please try again');
		}
		changeLoadingStatus(false);
	}
	const electionCards=(data,index)=>{
		let colorTrophy;
		if(index==0){
			colorTrophy="#F8D913";
		}else if(index==1){
			colorTrophy="#B4B4B4"
		}else if(index==2){
			colorTrophy="#A0661C"
		}
		return(
			<ElectionCardContainer onClick={()=>displayElectionCard(data)}>
				<div id="trophyAndNameContainer" style={{display:"flex",flexDirection:"row"}}>
					{isSearchResult==false &&(
						<React.Fragment>
							{index<=2 &&(
								<EmojiEventsIcon
									style={{fontSize:"40",color:colorTrophy}}
								/>
							)}
						</React.Fragment>
					)}
					<img id="contestantProfilePicture" src={data.owner.profilePicture==null?
							NoProfilePicture:data.owner.profilePicture} 
							style={{width:"70px",height:"70px",borderRadius:"50%"}}
					/>
				</div>
				<div id="electionSpeechAndNameDiv"
					style={{marginLeft:"2%",width:"70%",display:"flex",flexDirection:"column"}}>
					<div style={{display:"flex",flexDirection:"row"}}>
						<p id="contestantFirstName" style={{fontSize:"24px"}}>
							<b>{data.owner.firstName}</b>
						</p>
						<p id="ranking" style={{color:"#C8B0F4",marginLeft:"5%",fontSize:"20px"}}>Rank: {index+1}</p>
					</div>
					<div>
						<p>{data.electionSpeech}</p>
					</div>
				</div>
				<BoltContainer>
					<OfflineBoltIcon
						style={{fontSize:"50"}}
					/>
				</BoltContainer>
			</ElectionCardContainer>
		)
	}

	const triggerSearchForSpecificOligarchCard=async(event)=>{
		const keyEntered=event.key;
        if(keyEntered=="Enter"){
        	event.preventDefault();
        	const searchQuery=document.getElementById("searchQuery").value;
        	if(searchQuery==""){
        		fetchData();
        	}else{
        		changeIsSearchResult(true);
        		changeLoadingStatus(true);
	        	const {confirmation,data}=await searchForSpecificOligarchCard(
								        			symposiumId,
								        			searchQuery
								        		);
	        	if(confirmation=="Success"){
	        		const {message}=data;
	        		changeElectionContestants(message);
	        	}else{
	        		alert('Unfortunately there has been an error seach for this specific oligarch card. Please try again');
	        	}	
	        	changeLoadingStatus(false);	
        	}
        }
	}

	const MobileDropDownOptions=()=>{
		return(
			<div class="dropdown" id="mobileOligarchOptionsDropDown" style={{display:"none"}}>
				<button class="btn btn-primary dropdown-toggle" 
					type="button" data-toggle="dropdown" style={{borderStyle:"none",backgroundColor:"white"}}>
					<ArrowDropDownCircleOutlinedIcon
						style={{fontSize:"20",color:"#D9D9D9",cursor:"pointer"}}
					/>
				</button>

				<ul id="mobileDropDown" class="dropdown-menu" style={DropDownMenuCSS}>
					<p onClick={()=>displayCreationModal()}>
						Create Oligarch Card
					</p>
					<hr/>
					<p onClick={()=>displayCurrentOligarchsMobile()}>
						Current oligarchs
					</p>
				</ul>
		  	</div>
		)
	}
	return(
		<React.Fragment>
			<div>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<p style={{fontSize:"36px"}}>
							<b>Oligarchs</b>
						</p>
						<div id="desktopCreationIcon" style={CreationIconCSS} onClick={()=>displayCreationModal()}>
							<BorderColorIcon
								style={{fontSize:"20",color:"#C8B0F4"}}
							/>
						</div>
					</div>
					<div id="desktopOligarchDisplay" style={CurrentOligarchsContainerCSS}>
						<div class="dropdown">
							<button class="btn btn-primary dropdown-toggle" 
								type="button" data-toggle="dropdown" style={BootStrapDropDownButtonCSS}>
								<ArrowDropDownCircleOutlinedIcon
									style={{fontSize:"20",color:"#D9D9D9",cursor:"pointer"}}
								/>
							</button>

							<ul id="currentOligarchsDropDown" class="dropdown-menu" style={DropDownMenuCSS}>
								<CurrentOligarchs
									symposiumId={symposiumId}
								/>
							</ul>
					  	</div>
							
						<div style={VerticalLineCSS}/>
						<img src={NoProfilePicture}
							style={{width:"40px",height:"40px",borderRadius:"50%",marginLeft:"10%"}}
						/>
					</div>
					{MobileDropDownOptions()}
				</div>
				<InputContainer onKeyPress={e=>triggerSearchForSpecificOligarchCard(e)}
					placeholder="Search just the oligarch contestant here"
					id="searchQuery"
				/>
			</div>
			{loading==true?
				<p>Please wait...</p>:
				<div style={{marginTop:"5%"}}>
					{electionContestants.length==0?
						<p>No oligarch contestants</p>:
						<React.Fragment>
							{electionContestants.map((data,index)=>
								<React.Fragment>
									{electionCards(data,index)}
									<hr style={HorizontalLineCSS}/>
								</React.Fragment>
							)}
						</React.Fragment>
					}
				</div>
			}
		</React.Fragment>
	)
}


export default ElectionDisplay;