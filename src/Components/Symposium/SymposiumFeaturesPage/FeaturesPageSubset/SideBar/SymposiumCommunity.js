import React,{useContext} from "react";
import styled from "styled-components";
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SubmissionsCSS={
	padding:"15px",
	borderRadius:"5px",
	color:"white",
	backgroundColor:"#A878FF",
	display:"flex",
	justifyContent:"center",
	alignItems:"center"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const TagsContainerCSS={
	boxShadow:"1px 1px 5px #dbdddf",
	display:"flex",
	flexDirection:"column",
	width:"95%",
	borderRadius:"5px",
	padding:"10px"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}

const VotesCSS={
	padding:"10px",
	color:"white",
	backgroundColor:"#43D351",
	width:"30%",
	borderRadius:"5px",
	display:"flex",
	justifyContent:"center",
	alignItems:"center"
}

const SymposiumCommunity=()=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const{
		featuresPageSecondaryInformation:{
			submissionCount,
			currentQuestionsStandings
		}
	}=featuresPageConsumer;

	const constructQuestionStandings=()=>{
		return(
			<React.Fragment>
				{currentQuestionsStandings.map(data=>
					<div style={{display:"flex",flexDirection:"column"}}>
						<p>{data.question}</p>
						<div style={VotesCSS}>
							{data.votes}
						</div>
						<hr style={HorizontalLineCSS}/>
					</div>
				)}
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			<div style={{display:"flex",flexDirection:"column"}}>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<p style={{fontSize:"36px",color:"#C8B0F4"}}>
						<b>23:12:06</b>
					</p>

					<div style={SubmissionsCSS}>
						{submissionCount} submissions
					</div>
				</div>
				<p style={{color:"#B38AFF"}}>
					Competition Ends: July 12
				</p>
			</div>
			<hr style={HorizontalLineCSS}/>

			<div style={TagsContainerCSS}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<p>
						<b>Current questions standings:</b>
					</p>
					<div style={DropDownCSS}>
						<ExpandMoreIcon
							style={{fontSize:"24"}}
						/>
					</div>
				</div>
				<hr style={HorizontalLineCSS}/>
				{constructQuestionStandings()}
			</div>
		</React.Fragment>
	)
}



export default SymposiumCommunity;