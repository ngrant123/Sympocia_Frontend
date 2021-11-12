import React from "react";
import styled from "styled-components";
import Ads from "./Ads/index.js";
import Creation from "./Creation/index.js"

const Container=styled.div`
	position:relative;
	background-color:green;
`;

const AdsPageOptions=({adDisplayOptionType})=>{
	const modalDecider=()=>{
		switch(adDisplayOptionType){
			case "Ads":{
				return <Ads/>
			}
			case "Creation":{
				return <Creation/>
			}
		}
	}
	return(
		<React.Fragment>	
			{modalDecider()}
		</React.Fragment>
	)
}


export default AdsPageOptions;