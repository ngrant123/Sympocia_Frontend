import React,{useContext,useState} from "react";
import styled from "styled-components";
import {PostsHeader} from "./index.js";
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Images from "./PostDisplay/Images.js";
import Videos from "./PostDisplay/Videos.js";
import RegularPosts from "./PostDisplay/RegularPosts.js";
import {CountDownTimer} from "../SideBar/SymposiumCommunity.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:"100%"
`;

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	cursor:"pointer",
	padding:"2px",
	marginRight:"5px"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%",
	height:"1px"
}




const SymposiumCommunity=({featuresType})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const [currentQuestionIndex,changeCurrentQuestionIndex]=useState(0);
	const {
		featuresPagePrimaryInformation:{
			headerQuestions,
			competitionEndDate
		},
		isDesktop
	}=featuresPageConsumer;



	const incrementQuestionIndex=()=>{
		let currentCounterIndex=currentQuestionIndex;
		currentCounterIndex++
		changeCurrentQuestionIndex(currentCounterIndex);
	}

	const decrementQuestionIndex=()=>{
		let currentCounterIndex=currentQuestionIndex;
		currentCounterIndex--
		changeCurrentQuestionIndex(currentCounterIndex);
	}

	const postsDisplayFunctionality=({questionType,responses})=>{
		switch(questionType){
			case "Images":{
				return <Images posts={responses}/>
			}
			case "Videos":{
				return <Videos posts={responses}/>
			}

			case "Regular":{
				return <RegularPosts posts={responses}/>
			}
		}
	}

	const mobileHeaders=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",marginTop:"2%"}}>
				<p style={{fontSize:"20px"}}>
					{headerQuestions[currentQuestionIndex].question}
				</p>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					{currentQuestionIndex>0 &&(
						<div style={{...DropDownCSS,marginRight:"5%"}} onClick={()=>decrementQuestionIndex()}>
							<ArrowBackIosOutlinedIcon/>
						</div>
					)}
					{currentQuestionIndex<headerQuestions.length-1 &&(
						<div style={{...DropDownCSS,marginRight:"5%"}} onClick={()=>incrementQuestionIndex()}>
							<ArrowForwardIosOutlinedIcon/>
						</div>
					)}
					<CountDownTimer
						countDownDateMilliSeconds={competitionEndDate}
					/>
				</div>
			</div>
		)
	}

	const desktopHeaders=()=>{
		return(
			<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginTop:"2%"}}>
				{currentQuestionIndex>0 &&(
					<div style={DropDownCSS} onClick={()=>decrementQuestionIndex()}>
						<ArrowBackIosOutlinedIcon/>
					</div>
				)}

				<p style={{marginLeft:currentQuestionIndex==0?"0%":"5%",marginRight:"5%",fontSize:"20px"}}>
					{headerQuestions[currentQuestionIndex].question}
				</p>

				{currentQuestionIndex<headerQuestions.length-1 &&(
					<div style={DropDownCSS} onClick={()=>incrementQuestionIndex()}>
						<ArrowForwardIosOutlinedIcon/>
					</div>
				)}
			</div>
		)
	}

	return(
		<Container>
			<PostsHeader
				featuresType={featuresType}
			/>
			{isDesktop==true?
				<React.Fragment>
					{desktopHeaders()}
				</React.Fragment>:
				<React.Fragment>
					{mobileHeaders()}
				</React.Fragment>
			}
			
			<hr style={HorizontalLineCSS}/>
			{postsDisplayFunctionality(headerQuestions[currentQuestionIndex])}
		</Container>
	)
}

export default SymposiumCommunity;