import React,{useState} from "react";
import styled from "styled-components";
import { ProgressBar, Step } from "react-step-progress-bar";
import StampIcon from "../../../../../designs/img/StampIcon.png";

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

const TokenLevelDetails=()=>{
	let [currentPercentage,changeCurrentPercentage]=useState(0);

	useState(()=>{
		let progressBarCompletion=100;
		// let completedBeaconsAnsweredPercentage=(beaconInteractedWith)/totalBeacon;
		// if(completedBeaconsAnsweredPercentage==1)
		// 	progressBarCompletion=100;
		// else{
		// 	completedBeaconsAnsweredPercentage*=100;
		// 	Math.floor(completedBeaconsAnsweredPercentage);
		// 	progressBarCompletion=completedBeaconsAnsweredPercentage;
		// }
		setTimeout(()=>{
	        while(currentPercentage<progressBarCompletion){
	        	console.log("Percentage increase");
	        	changeCurrentPercentage(currentPercentage);
	          	currentPercentage++;
        	}
      	},1000);
	},[]);


	const constructNodeElements=()=>{
	    const ProgressBarSteps=[];
	    debugger;
	    for(var i=0;i<2;i++){
	    	if(i==0){
	    		ProgressBarSteps.push(<div></div>);  
	    	}else{    		
				const StepElement= 	<Step transition="scale"
					                        index={0}>
					                    {({ accomplished,index }) => (
					                      <img
					                      	style={{ filter: `grayscale(0%)`,borderRadius:"50%",cursor:"pointer"}}
			                                width="40"
			                                src={StampIcon}
			                              />
					                    )}
					                </Step>;
				ProgressBarSteps.push(StepElement);    	
	    	}
	    }
	    return ProgressBarSteps;
	}

	return(
		<Container>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<p>
					<b>Progress Bar</b>
				</p>
				<div style={TokenLevelDisplayCSS}>
					Beginner
				</div>
			</div>
			<hr style={HorizontalLineCSS}/>
			<div style={{position:"relative",width:"50%"}}>
				<ProgressBar
					percent={currentPercentage}
					filledBackground="linear-gradient(to right, #F6F4FA, #C8B0F4)"
					height={20}
	            >
	            	<p>TEst</p>
	            </ProgressBar>
			</div>
		</Container>
	)
}


export default TokenLevelDetails;