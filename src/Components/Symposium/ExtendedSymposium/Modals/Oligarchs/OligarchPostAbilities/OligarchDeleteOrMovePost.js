import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import DeletePost from "./DeletePost.js";
import MovePost from "./MovePost.js";

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:45;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
	padding:15px;

	@media screen and (max-width:1370px){
		width:60% !important;
		left:20% !important;
    }
    @media screen and (max-width:600px){
		width:90% !important;
		left:5% !important;
	}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:65%;
    }
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.8);
	z-index:45;
	top:0px;
`;

const OligarchInitialOptionsCSS={
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#C8B0F4",
	cursor:"pointer",
	padding:"20px",
	marginBottom:"5%",
	display:"flex",
	justifyContent:"center",
	cursor:"pointer",
	color:"#C8B0F4"
}

const HorizontalLineCSS={
	marginLeft:"0",
	position:"relative",
	marginRight:"0"
}

const OligarchDeletOrMovePostPortal=({closeModal,postId,postType,selectedSymposiumCategory})=>{
	const [displayInitialScreen,changeDisplayInitialScreen]=useState(true);
	const [displayDeleteModal,changeDisplayDeleteModal]=useState(false);

	const triggerDeleteModal=()=>{
		changeDisplayDeleteModal(true);
		changeDisplayInitialScreen(false);
	}

	const triggerSwapSymposiums=()=>{
		changeDisplayDeleteModal(false);
		changeDisplayInitialScreen(false);
	}

	const closeModalAndDisplayInitial=()=>{
		changeDisplayInitialScreen(true);
	}
	const deleteOrMovePostProps={
		closeModal:closeModalAndDisplayInitial,
		postId,
		postType,
		selectedSymposiumCategory,
		triggerCloseModalCompletely:closeModal
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{displayInitialScreen==true?
					<React.Fragment>
						<p style={{fontSize:"24px"}}>
							<b>Oligarch Post Options</b>
						</p>
						<hr style={HorizontalLineCSS}/>
						<div>
							<p>Choose one of the two options below:</p>
							<div onClick={()=>triggerDeleteModal()} style={OligarchInitialOptionsCSS}>
								Delete
							</div>

							<div onClick={()=>triggerSwapSymposiums()} style={OligarchInitialOptionsCSS}>
								Swap Symposiums
							</div>
						</div>
					</React.Fragment>:
					<React.Fragment>
						{displayDeleteModal==true?
							<DeletePost
								{...deleteOrMovePostProps}
							/>:
							<MovePost
								{...deleteOrMovePostProps}
							/>
						}
					</React.Fragment>
				}
			</Container>
		</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"))
}


export default OligarchDeletOrMovePostPortal;