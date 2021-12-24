import React,{useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CreateAPostComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";
import {
	disableScrolling,
	enableScrolling
} from "../../../../../Actions/Tasks/DisableScrolling.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:35;
	top:0px;
`;

const PostCreationContainer=styled.div`
	position:absolute;
	z-index:35;
	top:0px;
	background-color:white;
`;

const PostCreationPortal=(props)=>{
	const {closeModal}=props;

	useEffect(()=>{
		disableScrolling("personalContainer");
	},[]);


	const closeModalHandle=()=>{
		enableScrolling("personalContainer");
		closeModal();
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModalHandle()}
			/>
			<CreateAPostComponent {...props}/>

		</React.Fragment>
	,document.getElementById("personalContainer"));
}

export default PostCreationPortal;