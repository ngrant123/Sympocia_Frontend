import React,{useState,useEffect} from "react";
import styled from "styled-components";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import BorderColorIcon from '@material-ui/icons/BorderColor';


const InputContainer=styled.textarea`
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	margin-top:2%;
	width:100%;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;


const ElectionCardContainer=styled.div`
	height:130px;
	display:flex;
	flex-direction:row;
	margin-bottom:5%;
	padding:10px;
	overflow:hidden;
`;

const BoltContainer=styled.div`
	cursor:pointer;
	transform: rotate(25deg);
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

const ElectionDisplay=({displayCreationModal,displayElectionCard,newContestant})=>{
	const [electionContestants,changeElectionContestants]=useState([{
		firstName:"Nathan",
		electionSpeech:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."	
	},{

	},{

	},{

	}]);
	useEffect(()=>{
		if(newContestant!=null){
			electionContestants.splice(0,0,newContestant);
			changeElectionContestants([...electionContestants]);
		}
	},[]);
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
			<ElectionCardContainer>
				{index<=2 &&(
					<EmojiEventsIcon
						style={{fontSize:"40",color:colorTrophy}}
					/>
				)}
				<img src={data.profilePicture==null?
						NoProfilePicture:data.profilePicture} 
						style={{width:"70px",height:"70px",borderRadius:"50%"}}
				/>
				<div style={{marginLeft:"2%",width:"70%",display:"flex",flexDirection:"column"}}>
					<div style={{display:"flex",flexDirection:"row"}}>
						<p style={{fontSize:"24px"}}>
							<b>{data.firstName}</b>
						</p>
						<p style={{color:"#C8B0F4",marginLeft:"5%",fontSize:"20px"}}>Rank: {index+1}</p>
					</div>
					<p>{data.electionSpeech}</p>
				</div>
				<BoltContainer onClick={()=>displayElectionCard(data)}>
					<OfflineBoltIcon
						style={{fontSize:"50"}}
					/>
				</BoltContainer>
				<hr style={HorizontalLineCSS}/>
			</ElectionCardContainer>
		)
	}
	return(
		<React.Fragment>
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<p style={{fontSize:"36px"}}>
						<b>Oligarchs</b>
					</p>
					<div style={CreationIconCSS} onClick={()=>displayCreationModal()}>
						<BorderColorIcon
							style={{fontSize:"20",color:"#C8B0F4"}}
						/>
					</div>
				</div>
				<div style={{display:"flex",flexDirection:"row"}}>
				</div>
			</div>
			<div>
				<InputContainer placeholder="Search just the oligarch contestant here"/>
			</div>
			<div style={{marginTop:"5%"}}>
				{electionContestants.map((data,index)=>
					<React.Fragment>
						{electionCards(data,index)}
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	)
}


export default ElectionDisplay;