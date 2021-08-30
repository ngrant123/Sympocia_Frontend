import React,{useContext,useState} from "react";
import styled from "styled-components";
import {PostsHeader} from "./index.js";
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Images from "./PostDisplay/Images.js";
import Videos from "./PostDisplay/Videos.js";
import RegularPosts from "./PostDisplay/RegularPosts.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:"100%"
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




const SymposiumCommunity=({featuresType})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const [currentQuestionIndex,changeCurrentQuestionIndex]=useState(0);
		const {
		featuresPagePrimaryInformation:{
			headerQuestions
		}
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

	return(
		<Container>
			<PostsHeader
				featuresType={featuresType}
			/>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginTop:"2%"}}>
				<p style={{fontSize:"20px"}}>{headerQuestions[currentQuestionIndex].question}</p>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginLeft:"5%"}}>

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
			<hr style={HorizontalLineCSS}/>
			{postsDisplayFunctionality(headerQuestions[currentQuestionIndex])}
		</Container>
	)
}

export default SymposiumCommunity;