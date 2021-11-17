import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { ProgressBar, Step } from "react-step-progress-bar";
import GoldStampIcon from "../../../../../designs/img/GoldStampIcon.png";
import SilverStampIcon from "../../../../../designs/img/SilverStampIcon.png";
import BronzeStampIcon from "../../../../../designs/img/BronzeStampIcon.png";

import "react-step-progress-bar/styles.css";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {retrieveUnlockedUserTokenBreakDown} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

const Container=styled.div`
	position:fixed;
	height:45%;
	width:65%;
	left:20%;
	top:20%;
	z-index:51;
	background-color:white;
	border-radius:5px;
	display:flex;
	flex-direction:column;
	justify-content:center;
	padding:10%;

	@media screen and (max-width:650px){
		width:100%;
		height:100%;
		top:0%;
		left:0%;
		justify-content:flex-start;

		#mobileCloseIcon{
			display:block !important;
		}
	}
`;

const TokenLevelDisplayCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	marginLeft:"2%"
}

const ProgressBarOutLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#ECECEC",
	borderRadius:"10px",
	width:"30%"
}


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}

const UserUnlockedCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"#3898ec",
	borderRadius:"5px",
	padding:"10px",
	color:"white",
	marginRight:"2%",
	cursor:"pointer",
	width:"180px"
}

const VerticalLineCSS={
	position:"relative",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginLeft:"3%",
 	marginRight:"3%"
}


const TokenLevelDetails=({tokenScore,tokenLevel,closeModal})=>{
	let [currentPercentage,changeCurrentPercentage]=useState(0);
	const [bronzeUnlockedUsers,changeBronzeUnlockedUsers]=useState(0);
	const [silverUnlockedUsers,changeSilverUnlockedUsers]=useState(0);
	const [goldUnlockedUSers,changeGoldUnlockedUsers]=useState(0);

	useEffect(()=>{
		retrieveUsersUnlocked();
		triggerProgressBarCompletion();
	},[]);

	const retrieveUsersUnlocked=async()=>{
		const {confirmation,data}=await retrieveUnlockedUserTokenBreakDown();
		if(confirmation=="Success"){
			const {message}=data;
			const {
				Bronze,
				Silver,
				Gold
			}=message;
			changeBronzeUnlockedUsers(Bronze==null?0:Bronze);
			changeSilverUnlockedUsers(Silver==null?0:Silver);
			changeGoldUnlockedUsers(Gold==null?0:Gold);

		}
	}

	const triggerProgressBarCompletion=()=>{
		debugger;
		const normalizedTokenScore=Math.floor((tokenScore/1000)*100)-(tokenLevel=="Gold"?0:10);
		console.log(normalizedTokenScore);
		setTimeout(()=>{
	        while(currentPercentage<normalizedTokenScore){
	        	console.log("Percentage increase");
	        	changeCurrentPercentage(currentPercentage);
	          	currentPercentage++;
        	}
      	},1000);
	}

	const constructNodeElements=()=>{
	    const ProgressBarSteps=[];
	    debugger;
	    for(var i=0;i<4;i++){
	    	if(i==0){
	    		ProgressBarSteps.push(<div></div>);  
	    	}else{    	
	    		let stampIcon;	
	    		switch(i){
	    			case 1:{
	    				stampIcon=BronzeStampIcon;
	    				break;
	    			}
	    			case 2:{
	    				stampIcon=SilverStampIcon;
	    				break;
	    			}

	    			case 3:{
	    				stampIcon=GoldStampIcon;
	    				break;
	    			}
	    		}
				const StepElement=<Step transition="scale"
		                    index={0}>
		                {({ accomplished,index }) => (
			                <img style={{ 
			                	borderRadius:"50%",
			                	cursor:"pointer"}}
				                width="40" src={stampIcon}
				            />
		                )}
		            </Step>;
				ProgressBarSteps.push(StepElement);    	
	    	}
	    }
	    return ProgressBarSteps;
	}

	const unlockedUsers=(userUnlocked)=>{
		return(
            <div style={{display:"flex",flexDirection:"row"}}>
            	<p> 
            		<b>{userUnlocked}</b> people unlocked
            	</p>
            </div>
		)
	}

	const mobileCloseIcon=()=>{
		return(
			<div style={{display:"none"}} onClick={()=>closeModal()} id="mobileCloseIcon">
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
	return(
		<Container>
			{mobileCloseIcon()}
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<p>
					<b>Progress Bar</b>
				</p>
				<div style={TokenLevelDisplayCSS}>
					{tokenLevel}
				</div>
			</div>
			<hr style={HorizontalLineCSS}/>
			<div id="progressBarDiv" style={{position:"relative",width:"100%",borderRadius:"5px"}}>
				<ProgressBar
				    percent={currentPercentage}
				    height={30}
					filledBackground="linear-gradient(to right, #F6F4FA, #C8B0F4)"
				>
					{constructNodeElements()}
				</ProgressBar>
			</div>
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
				{unlockedUsers(bronzeUnlockedUsers)}
				<div style={VerticalLineCSS}/>

				{unlockedUsers(silverUnlockedUsers)}
				<div style={VerticalLineCSS}/>

				{unlockedUsers(goldUnlockedUSers)}
			</div>
		</Container>
	)
}


export default TokenLevelDetails;