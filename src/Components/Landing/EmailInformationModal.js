import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Confetti from 'react-confetti';

const ShadowContainer=styled.div`
	position:fixed;
	width:120%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:2;
	top:0px;
	left:0px;
`;

const Container=styled.div`
	position:fixed;
	width:30%;
	background-color:white;
	border-radius:5px;
	height:50%;
	top:140px;
	padding:20px;
	padding-right:30px;
	left:35%;
	z-index:2;
	text-align:center;
	overflow-y:auto;

	@media screen and (max-width:900px){
		width:50%;
		left:25%;
	}

	@media screen and (max-width:430px){
		width:70%;
		left:15%;
	}
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:80%;
	height:70px;
	margin-left:10%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const LinkTextContainer=styled.input`
    border: none;
    overflow: auto;
    outline: none;
    resize:none;
    border-radius:5px;
    width:80%;
    border-style:solid;
    border-width:2px;
    border-color:#d9d9d9;
`;


const CloseModalButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}


const RegisterButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginTop:"5%"
}

/*
	Right now since I'm on just displaying the images on the entertainment component
	not on the business component but I need to implement that in the future
*/

const EmailInformationModal=({closeModal,pushProfileObject,id,profileType})=>{
	const [displayConfetti,changeDisplayConfetti]=useState(true);

	useEffect(()=>{
		confettiAnimation();
	})
	

	const confettiAnimation=()=>{
		setTimeout(()=>{
			changeDisplayConfetti(false);
		},5000);
	}
	
	return(
		<>
			{displayConfetti==false?null:
				<Confetti
					style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
					 run={true}
				/>
			}
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								 <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checkbox" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3" fill="none" stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z"/>
								  <polyline points="9 11 12 14 20 6" />
								  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
								</svg>
							</li>
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								Thanks for submitting your email :) I really appreciate it. 
								In the meantime, I'll send you a confirmation email later on today and we can go from there
							</li>
						</ul>
					</li>
				</ul>
			</Container>
		</>

	)
}

export default EmailInformationModal;