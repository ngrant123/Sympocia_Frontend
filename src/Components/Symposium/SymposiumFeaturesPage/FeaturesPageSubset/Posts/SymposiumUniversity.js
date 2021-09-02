import React,{useState,useContext} from "react";
import styled from "styled-components";
import {PostsHeader} from "./index.js";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import Images from "./PostDisplay/Images.js";
import Videos from "./PostDisplay/Videos.js";
import RegularPosts from "./PostDisplay/RegularPosts.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:100%;

	@media screen and (max-width:650px){
		#universityResponsesDiv{
			width:90% !important;
		}
	}
`;

const PostsContainer=styled.div`
	background-color:green;
	margin-top:2%;
	width:100%;
`;


const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer",
	marginLeft:"10%",
	padding:"2px",
	marginRight:"5px"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%",
	height:"1px"
}

const ResponsesCSS={
	backgroundColor:"#C8B0F4",
	justifyContent:"space-between",
	display:"flex",
	flexDirection:"row",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#B38AFF",
	color:"white",
	width:"40%",
	height:"40px",
	marginTop:"2%"
}



const SymposiumUniversity=({featuresType})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const [currentQuestionIndex,changeCurrentQuestionIndex]=useState(0);
	const {
		featuresPagePrimaryInformation:{
			headerQuestions
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

	const universityResponse=()=>{
		return(
			<div id="universityResponsesDiv" style={ResponsesCSS}>
				<div style={{backgroundColor:"#C8B0F4",display:"flex",alignItems:"center"}}>
					<p>116 Responses</p>
				</div>
				<div style={{backgroundColor:"#B38AFF",width:"15%",display:"flex",justifyContent:"center",alignItems:"center"}}>
					<KeyboardArrowDownIcon
						style={{fontSize:"25"}}
					/>	
				</div>
			</div>
		)
	}

	const desktopHeaders=()=>{
		return(
			<React.Fragment>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginTop:"2%"}}>
					<p style={{fontSize:"20px"}}>{headerQuestions[currentQuestionIndex].question}</p>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>

						{currentQuestionIndex>0 &&(
							<div style={DropDownCSS} onClick={()=>decrementQuestionIndex()}>
								<ArrowBackIosOutlinedIcon/>
							</div>
						)}

						{currentQuestionIndex<headerQuestions.length-1 &&(
							<div style={DropDownCSS} onClick={()=>incrementQuestionIndex()}>
								<ArrowForwardIosOutlinedIcon/>
							</div>
						)}
					</div>
				</div>

				{universityResponse()}
			</React.Fragment>
		)
	}

	const mobileHeaders=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",marginTop:"2%"}}>
				<p style={{fontSize:"20px"}}>{headerQuestions[currentQuestionIndex].question}</p>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					{currentQuestionIndex>0 &&(
						<div style={{...DropDownCSS,marginLeft:"0%",marginRight:"5%"}} 
							onClick={()=>decrementQuestionIndex()}>
							<ArrowBackIosOutlinedIcon/>
						</div>
					)}
					{currentQuestionIndex<headerQuestions.length-1 &&(
						<div style={{...DropDownCSS,marginRight:"5%"}} onClick={()=>incrementQuestionIndex()}>
							<ArrowForwardIosOutlinedIcon/>
						</div>
					)}

					{universityResponse()}
				</div>
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

export default SymposiumUniversity;