import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {sendAnonymousTipsEmail} from "../../../../Actions/Requests/EmailServiceRequests.js";

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:45;
	top:20%;
	border-radius:5px;
	left:40%;
	display:flex;
	flex-direction: column;
	padding:30px;
	overflow-y:scroll;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}
	@media screen and (max-width:650px){
		top:5% !important;
		height:90% !important;

		#closeAnonymousSuggestionPortal{
			display:block !important;
		}
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:110%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
	left:-5%;
`;
const SearchTextArea=styled.textarea`
	position:relative;
	resize:none;
	width:500px;
	height:90%;
	padding-top:10px;
	border-style:none;

	border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/

`;


const TextInput=styled.textarea`
	position:relative;
	width:100%;
	height:30%;
	border-radius:5px;
	resize:none;
	margin-bottom:5%;
	border-style:solid;
   	border-color: #E6E6E6;

   	@media screen and (max-width:650px){
   		width:100%;
   		height:250px !important;
   	}
`;

const Button=styled.div`
  background-color:white;
  border-radius:5px;
  padding:10px;
  color:#3898ec;
  border-style:solid;
  border-width:2px;
  border-color:#3898ec;
  cursor:pointer;
`;

const ConfirmationCheckIcon=styled.div`

`;


const AnonymousSuggestions=({targetDom,closeModal})=>{
	const [confirmationDisplay,changeConfirmationDisplay]=useState(false);

	const sendValue=async()=>{
		const suggestion=document.getElementById("suggestionValue").value;
		if(isValidSuggestion(suggestion)==true){
			const {confirmation,data}=await sendAnonymousTipsEmail({content:suggestion});
			if(confirmation=="Success"){
				changeConfirmationDisplay(true);
			}else{
				alert('Unfortunately there has been an error when trying to send this tip. Please try again');
			}
		}else{
			alert('Please enter a valid suggestion. Add more suggestions to your opinion :)');
		}
	}

	const isValidSuggestion=(suggestion)=>{
		if(suggestion!=""){
			const spacesAmount=suggestion.match(/ /g).length;
			if(suggestion.length>10 && spacesAmount>4){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	const confirmationIcon=()=>{
		return <ConfirmationCheckIcon>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="44" height="44"
					  viewBox="0 0 24 24" stroke-width="1.5" stroke="#00FF40" fill="none" stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M9 12l2 2l4 -4" />
					</svg>
			   </ConfirmationCheckIcon>
	}
	return createPortal(
		<>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<div id="closeAnonymousSuggestionPortal" onClick={()=>closeModal()} 
					style={{display:"none",marginBottom:"5%"}}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
					</svg>
				</div>
				{confirmationDisplay==false? 
					<>
						<p>
							Send an anonymous suggestion for the platform. We are alwayst trying to improve 
							so any suggestion would be greatly appreciated
						</p>
						<TextInput
							id="suggestionValue"
							placeholder="Enter suggestion here"
						/>

						<Button onClick={()=>sendValue()}>
							Send
						</Button>
					</>:
					<>
						{confirmationIcon()}
						<p>
							Thank you for submitting you tip :)
						</p>
						<Button onClick={()=>closeModal()}>
							Close
						</Button>
					</>
				}

			</Container>
		</>
	,document.getElementById(targetDom))
}

export default AnonymousSuggestions;