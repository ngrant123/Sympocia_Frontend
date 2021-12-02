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

const Badges=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b>What are <span style={{color:"#C8B0F4"}}>Badges</span>?</b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				Essentially badges are modals that people 
				can see when they either look at your post or a comment you made. It'll be like a sneak peek into you profile 
				and you can manage what posts you want to be on the badge and what image you want the badge to be down the road.

				<br/>
				<br/>
				<br/>
				When you go on your profile you will see a badge icon (on mobile you have to click on the arrow pointing down next to you name and then click personal information). After you click on the badge you can either create a badge
				or view the posts that you have already. As of right now you can only have five posts on your badge and they
				must all be of the same type.

				<br/>
				<br/>
				<br/>
				In my opinion, I believe this adds more customizability to the platform and makes everything more fun. If you have any suggestions don't hesitate to reach out to me at nathan@sympocia.com.
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

export default Badges; 