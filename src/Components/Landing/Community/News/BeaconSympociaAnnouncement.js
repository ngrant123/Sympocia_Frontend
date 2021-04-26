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

const BeaconsAnnoucement=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> Introducing <span style={{color:"#C8B0F4"}}>Beacons</span> </b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				We wanted to give you guys a more detailed explanation about what made us create beacons and
				what we have in store for sympocia for this week. So we created beacons because I personally
				have been in situations for example on youtube where I wished I was able to ask for a 
				specific video. Having studied advanced mathematics in college, I've encountered that a lot. 
				So I thought that it would be a great addition to the platform and it's something that 
				hasn't really been done before. It has a long way to mature as we add more features and make it 
				better but yeah hope you like it.

				 <br/>
				 <br/>
				 Now for this week we've recieved a lot of message that our ui is...how do I exclaim this as accurate
				 as possible.... <b>"Looks very bad"</b> as one guy said. So this week we're going to redesign our 
				 explore page,symposium page, and the post section of the platform. Then probably next week 
				 I'll work on implementing it. Additionally we have new improvements to friend gauge coming out sometime
				 this week and also an email service rolling out soon hopefully :). For the marketing sides of things we
				have two new videos about the platform coming out soon so stay tuned for that and many other stuff
				cooking in the background. But yeah thanks for reading this and I hope you have an amazing day.
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

export default BeaconsAnnoucement; 