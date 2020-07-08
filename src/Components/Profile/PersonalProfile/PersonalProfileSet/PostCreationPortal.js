import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CreateAPostComponent from "../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:20;
	top:0px;
`;

const PostCreationContainer=styled.div`
	position:absolute;
	z-index:21;
	top:0px;
	background-color:white;
`;

const PostCreationPortal=(props)=>{
	const {postOption,closeModal}=props;
	console.log(props);

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<CreateAPostComponent
				postOption={postOption}
				closeModal={closeModal}
			/>

		</React.Fragment>
	,document.getElementById("personalContainer"));
}

export default PostCreationPortal;