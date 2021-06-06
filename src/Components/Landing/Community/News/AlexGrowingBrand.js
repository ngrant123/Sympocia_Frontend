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

const BuildingBrand=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> Growing your <span style={{color:"#C8B0F4"}}>Brand</span> as a video game writer </b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				The only way you can grow is by applying yourself. Write, write and keep
				writing and hope that it leads somewhere. Also, don't be afraid to freelance.
				Right now I'm freelancing for two different websites (Keengamer.com and
				SuperJump) yet still my work is nothing to scoff at. Go online and search for
				gaming websites that are looking for writers (I've written for at least five
				in my career and that's excluding the two I'm working for right now!) I know
				it can seem like a daunting task and even once you get accepted and submit
				your first article, you might get a whole bunch of corrections that make you
				feel as if you totally suck but trust me, that's not the case. You just need
				to keep working at it. 

				<br/>
				<br/>

				Or, if you feel too overwhelmed by it, you can always let it go and come back
				later. That's the beauty of freelance journalism. You're not tied down by any
				contract, so you're not obligated to do anything. It's all about how much you
				want to make yourself keep going. And if you think that what you're doing
				isn't worth anything, well, let me just tell you that most of the major gaming
				journalists you see on IGN, GameSpot and all those other publications, that's
				how they got started!

			</p>
			<p style={{fontSize:"20px",marginTop:"5%"}}>
				Sincerly,
			</p>
			<p style={{fontSize:"20px"}}>
				<span style={{color:"#C8B0F4"}}>Alex Anyfantis</span>
			</p>
		</Container>
	)

}

export default BuildingBrand; 