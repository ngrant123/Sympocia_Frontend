import React from "react";
import styled from "styled-components";


const Container=styled.div`
	width:100%;
	height:100%;
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const ProgressBarBeaconsExtended=()=>{
	const mobileCloseIcon=()=>{
		return(
			<div id="mobileCloseModalIcon" style={{cursor:"pointer",display:"none"}} >
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
			<p style={{fontSize:"24px"}}>
				<b>Progress Bar</b>
			</p>
			<hr style={HorizontalLineCSS}/>
		</Container>
	)
}


export default ProgressBarBeaconsExtended;