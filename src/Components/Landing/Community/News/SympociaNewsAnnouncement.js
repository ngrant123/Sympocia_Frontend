import React from "react";
import styled from "styled-components";

const Container=styled.div`
	@media screen and (max-width:650px){
		#headerTitle{
			font-size:20px !important;
		}
		#coreContent{
			font-size:15px !important;
			width:90% !important;
		}
	}
`;

const TEst=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> Welcome to <span style={{color:"#C8B0F4"}}>Sympocia News</span> </b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				We made this separate section of Sympocia dedicated to news about Sympocia 
				and any interviews we have. The reason why we did this is because it’ll allow us 
				to convey any changes that we made to the platform and any future plans we have for it. 
				Hopefully this will brings us as a company closer to you as a user. This will be updated
				weekly and you’ll receive a notification when we upload something new. But for now 
				thanks for checking us out and if you haven’t already sign up and let us know what you
				think about the platform.
			</p>
			<p style={{fontSize:"20px",marginTop:"5%"}}>
				Sincerly, the team at 
			</p>
			<p style={{fontSize:"20px"}}>
				<span style={{color:"#C8B0F4"}}>Sympocia</span>
			</p>
		</Container>
	)

}

export default TEst;