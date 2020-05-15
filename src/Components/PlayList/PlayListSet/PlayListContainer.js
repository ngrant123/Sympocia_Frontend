import React,{Component, useEffect} from "react";
import styled from "styled-components";
import HeaderInformation from "../PlayListSubSet/HeaderInformation.js";
import PlayListContent from "../PlayListSubSet/PlayListContents.js";
import {GeneralNavBar} from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";

const Container =styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:white;
	overflow-x:hidden;
`;

const PlayListContainer=()=>{


	return (
		<Container>
			<HeaderInformation/>
			<hr/>
			<PlayListContent/>
		</Container>


	)
}

export default PlayListContainer;