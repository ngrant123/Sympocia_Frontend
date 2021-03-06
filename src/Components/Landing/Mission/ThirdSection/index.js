import React from "react";
import styled from "styled-components";
import LandingImage from "../../../../designs/img/ThirdSectionImage.png";
import {
	Container,
	InformationDiv
} from "./indexCSS.js";

const ReasoningCSS={
	color:"#5B5B5B",
	fontSize:"18px"
}

const ImageDivCSS={
	marginBottom:"10%",
	marginTop:"5%",
	display:"flex",
	flexDirection:"row",
	width:"100%",
	justifyContent:"center"
}

const ThirdSection=()=>{
	const addictionSymbol=()=>{
		return(
			<svg id="sectionDescriptionIcons"
				xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-biohazard" 
				width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" 
				stroke-linecap="round" stroke-linejoin="round">
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <circle cx="12" cy="12" r="2" />
			  <path d="M11.939 14c0 .173 .048 .351 .056 .533l0 .217a4.75 4.75 0 0 1 -4.533 4.745l-.217 0m-4.75 -4.75a4.75 4.75 0 0 1 7.737 -3.693m6.513 8.443a4.75 4.75 0 0 1 -4.69 -5.503l-.06 0m1.764 -2.944a4.75 4.75 0 0 1 7.731 3.477l0 .217m-11.195 -3.813a4.75 4.75 0 0 1 -1.828 -7.624l.164 -.172m6.718 0a4.75 4.75 0 0 1 -1.665 7.798" />
			</svg>
		)
	}

	const normalitySympbol=()=>{
		return(
			<svg id="sectionDescriptionIcons"
				xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mood-crazy-happy"
			 	width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" 
				stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<circle cx="12" cy="12" r="9" />
				<line x1="7" y1="8.5" x2="10" y2="11.5" />
				<path d="M7 11.5l3 -3" />
				<line x1="14" y1="8.5" x2="17" y2="11.5" />
				<path d="M14 11.5l3 -3" />
				<path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
			</svg>
		)
	}

	const atomSymbol=()=>{
		return(
			<svg id="sectionDescriptionIcons"
				xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-atom" 
				width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" 
				fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				<line x1="12" y1="12" x2="12" y2="12.01" />
				<path d="M12 2a4 10 0 0 0 -4 10a4 10 0 0 0 4 10a4 10 0 0 0 4 -10a4 10 0 0 0 -4 -10" transform="rotate(45 12 12)" />
				<path d="M12 2a4 10 0 0 0 -4 10a4 10 0 0 0 4 10a4 10 0 0 0 4 -10a4 10 0 0 0 -4 -10" transform="rotate(-45 12 12)" />
			</svg>
		)
	}


	return(
		<Container>
			<div>
				<p id="purposeText" style={{color:"#C8B0F4",fontSize:"24px"}}>
                   <b>Purpose</b>
                </p>
                <p id="thirdSectionHeaderText" style={{fontSize:"36px"}}>
                  <b>Why should you care?</b>
                </p>
                <div id="thirdSectionPrimaryText"
                	style={{marginTop:"5%",display:"flex",flexDirecition:"row",justifyContent:"space-between"}}>
                	<InformationDiv textAlignPosition={"right"}>
                		{addictionSymbol()}
                		<div>
	                		<p id="reasoningTitleText" style={{marginTop:"10%"}}>
	                			<b>Addiction</b>
	                		</p>
	                		<p id="reasoningText" style={ReasoningCSS}>
	                			Whether we like it or not, we???re all addicted to social media.
	                			We love connecting with people, learning, and growing from each other. 
	                		</p>
                		</div>
                	</InformationDiv>

                	<InformationDiv textAlignPosition={"left"}>
                		{normalitySympbol()}

                		<div>
	                		<p id="reasoningTitleText" style={{marginTop:"10%"}}>
	                			<b>Normality</b>
	                		</p>
	                		<p id="reasoningText" style={ReasoningCSS}>
	                			But currently we live in an era where misinformation is the new normal.
	                			Where being fake is the new normal. Where getting clout is the main goal not authenticity.
	                		</p>
                		</div>
                	</InformationDiv>

                	<InformationDiv textAlignPosition={"right"}>
                		{atomSymbol()}

                		<div>
	                		<p id="reasoningTitleText" style={{marginTop:"10%"}}>
	                			<b>Solution</b>
	                		</p>
	                		<p id="reasoningText" style={ReasoningCSS}>
	                			Sympocia allows you to truly be authentic and doesn???t force you to fit into this mold that other platforms have.
								Just be yourself :) 
	                		</p>
                		</div>
                	</InformationDiv>
                </div>
            </div>
            <div style={ImageDivCSS}>
                <img id="thirdSectionImage" src={LandingImage} 
                	style={{borderRadius:"50%",width:"427px",height:"435px"}}
                />
            </div>
		</Container>
	)
}

export default ThirdSection;