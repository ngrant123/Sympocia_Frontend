import React from "react";
import styled from "styled-components";
import LargePostComponent from "./LargePostComponent.js";
import {GeneralNavBar} from "../../NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js"


const Container=styled.div`
	position:absolute;
	background-color:#1C1C1C;
	width:100%;
	height:100%;
`;

const InformationContainer=styled.div`
	position:absolute;
	background-color:red;
	width:60%;
	height:20%;
	top:15%;
	left:10%;
`;
/*
	<ul style={{backgroundColor:"red"}}>
		<li style={{listStyle:"none"}}>
			<GeneralNavBar
				page={"Home"}
				routerHistory={props.history}
			/>
		</li>
		<li style={{listStyle:"none"}}>
		</li>
	</ul>
*/

const CreatePostScreen=(props)=>{

	return(
		<Container>
			<GeneralNavBar
				page={"Home"}
				routerHistory={props.history}
			/>
			<LargePostComponent/>
			
		</Container>
	)
}

export default CreatePostScreen;