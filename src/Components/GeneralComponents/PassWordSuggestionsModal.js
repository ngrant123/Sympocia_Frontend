import React from "react";
import styled from "styled-components";


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:45;
	top:0px;
	left:0%;
`;

const PasswordSuggestionContainer=styled.div`
	position:fixed;
	width:25%;
	height:35%;
	background-color:white;
	z-index:46;
	top:45%;
	border-radius:5px;
	left:60%;
	overflow-y:auto;
	padding:20px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}

	@media screen and (max-width:650px){
		width:100%;
		left:0%;
		top:10%;
		height:80%;
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		top:25%;
		height:50%;
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){

    }

`;


const PasswordSuggestions=({closePasswordSuggestionsModal,displayPasswordSuggestionsModal})=>{
	return(
		<React.Fragment>
			{displayPasswordSuggestionsModal==true &&(
				<React.Fragment>
					<PasswordSuggestionContainer>
						<div style={{marginBottom:"2%",cursor:"pointer"}} 
							onClick={()=>closePasswordSuggestionsModal()}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
								 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
								 stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <circle cx="12" cy="12" r="9" />
								  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</div>
						<p style={{fontSize:"18px"}}>
							<b>Password Requirements</b>
						</p>
						<hr/>
						<p style={{color:"#23A00D"}}>Must contain at least one capital character</p>
						<hr/>
						<p style={{color:"#23A00D"}}>Must contain at least one special character</p>
						<hr/>
						<p style={{color:"#23A00D"}}>Must contain at least one lower-case character</p>
						<hr/>
						<p style={{color:"#23A00D"}}>Must be longer than five characters</p>
						<hr/>
						<p style={{color:"#D52323"}}>No spaces</p>
					</PasswordSuggestionContainer>
					<ShadowContainer onClick={()=>closePasswordSuggestionsModal()}/>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default PasswordSuggestions;

