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
				<b> Tips for getting better at <span style={{color:"#C8B0F4"}}>Writing</span> </b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				 I must've mentioned this in the first question but, you need to give yourself
				 time. There are of course many different writing techniques and if you start
				 working or freelancing, others may ask certain things of you -for example to
				 base your articles around SEOs- but you won't get there from the start. You
				 need to give yourself the room to make mistakes and learn from them so that
				 you can grow as a writer/journalist. 

				 <br/>
				 <br/>

				Do your research, make sure that what you're writing about is a fact and not
				just some rumor going around online (or if it is a rumor, make sure you tell
				that to your reader), don't be a sensationalist no matter how tempting that
				may be for the clicks and likes, treat your sources with professionalism and
				proofread your own articles to make life easy for your editors. Remember that
				any correction is done to help you improve as a writer, there's nothing
				personal here. Most of the time, these people don't even know you personally. 
				<br/>
				<br/>
				Also be wary of what you post online through your social media if you want to
				become a professional. These things will exist over time and can create a
				negative impact on your public image. Find a good time within the day for you
				to do your writing. It could be in the morning, the afternoon or even after
				hours. No one will judge. And don't judge yourself too hard either.
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