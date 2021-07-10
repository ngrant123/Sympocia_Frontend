import React from "react";
import styled from "styled-components";

const Container=styled.div`
	@media screen and (max-width:1370px){
		#quoteCoreContent{
			width:90% !important;
			margin-left:0% !important;
		}
	}
	@media screen and (max-width:650px){
		#headerTitle{
			font-size:20px !important;
		}
		#coreContent{
			font-size:15px !important;
			width:90% !important;
		}
		#quoteCoreContent{
			font-size:15px !important;
			width:90% !important;
			margin-left:0% !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		#quoteCoreContent{
			width:90% !important;
			margin-left:0% !important;
		}
	}
`;

const QuoteCSS={
	backgroundColor:"#323232",
	borderRadius:"5px",
	padding:"20px",
	color:"white",
	marginLeft:"10%",
	width:"50%",
	fontSize:"20px"
}

const SympociaRepresents=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> What do we represent at <span style={{color:"#C8B0F4"}}>Sympocia?</span> </b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				I’ve asked myself this numerous times on numerous occasions. In fact, I have two whole Moleskine books dedicated to me writing out what my platform represents and how it’s going to look. Although I’m just currently launching Sympocia and I have yet to see what it becomes, I have a basic guideline of what I envision the platform to be. Here is an excerpt that I have written down:
			</p>
			<br/>
			<p id="quoteCoreContent" style={QuoteCSS}>
				Sympocia represents <span style={{color:"#C8B0F4"}}><b>authenticity</b></span> and 
					<span style={{color:"#C8B0F4"}}><b> family</b></span>. What does that mean? When you use Sympocia, I want you to feel like you have nothing to hide and you can be yourself. By joining and finding people who truly think your way, you start building a family. Not because you were forced to interact and view them by an algorithm, but because you chose to. And that is how we differ. Sympocia offers something else that other platforms don’t. Our main goal is to provide the means to an escape from other platforms (maybe from real life also) and into a place you never knew existed. A new kind of platform.
			</p>
			<br/>
			<p id="coreContent" style={{width:"80%",fontSize:"20px"}}>
				Powerful stuff right? Hope you guys like it :)
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

export default SympociaRepresents; 