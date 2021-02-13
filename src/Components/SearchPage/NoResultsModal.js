import React from "react";
import styled from "styled-components";
import NoSearchResultDisplay from "../../designs/img/FirstSectionLandingPAgeImage.png";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	justify-content:center;
	align-items:center;

	@media screen and (max-width:1370px){
		flex-direction:column !important;
		#image{
			width:70% !important;
		}
	}

	@media screen and (max-width:740px){
		#image{
			height:50% !important;
		}
	}
`;

const NoResultsModal=()=>{
	return(
		<Container>
			<img id="image" src={NoSearchResultDisplay} style={{borderRadius:"50%",width:"35%",height:"400px"}}/>
			<p style={{fontSize:"30px"}}>
				<b>
					No results unfortunately :( Maybe search for something else?
				</b>
			</p>
		</Container>
	)
}

export default NoResultsModal;