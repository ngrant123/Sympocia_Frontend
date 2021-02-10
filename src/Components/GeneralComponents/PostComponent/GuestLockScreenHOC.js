import React from "react";
import styled from "styled-components";

const Container=styled.div`
	@media screen and (max-width:600px){
		#LockSymbol{
			margin-top:0% !important;
			margin-left:0% !important;
		}
	}
`;

const GuestLockScreenHOC=({component})=>{
	return(
		<Container>
			<div id="LockSymbol"style={{position:"absolute",zIndex:"30",borderRadius:"5px",backgroundColor:"#C8B0F4",padding:"10px"}}
				onClick={()=>alert('Please sign up to access this feature')}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="44"
				 height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#FFFFFF" fill="none" stroke-linecap="round" 
				 stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <rect x="5" y="11" width="14" height="10" rx="2" />
				  <circle cx="12" cy="16" r="1" />
				  <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
				</svg>
			</div>
			<div style={{filter:"blur(5px)",pointerEvents:"none"}}>
				{component}
			</div>
		</Container>
	)
}

export default GuestLockScreenHOC