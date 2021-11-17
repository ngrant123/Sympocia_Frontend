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

const AdExplanation=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b><span style={{color:"#C8B0F4"}}>Ads</span> explained</b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				So in the most recent update, I introduced ads to Sympocia. When you purchase ads they are at a
				fixed rate and last for about a week. Additionally, you can pause and resume the ads whenever you want to. 
				<br/>
				<br/>
				<p style={{fontSize:"24px",color:"#C8B0F4"}}>
				 	<b>How it works</b>
				</p>

				<p>
					Now for the ads and how they are displayed. For the explore page, if your ad is picked then it will 
					be displayed as the second or third post for a viewer. But the thing is that by you getting an 
					ad, it essentially puts it on a stack with other ads. For example, if a user accesses the explore page, your 
					ad has the possibility of getting picked. Once it is picked though, your ad will not be seen to that user again.
					The idea behind this is not to annoy the visitor but on the other hand if your ad is selected then its 
					a 100% guranteed view. We do the heavy lifting and you just provide the content.
				</p>

				<br/>
				<br/>
				<p style={{fontSize:"24px",color:"#C8B0F4"}}>
				 	<b>Conclusion</b>
				</p>
				I hope this helps you to get a better understanding of how ads work on Sympocia. Email me @ nathan.sympocia.com.
				<br/>
				<br/>
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

export default AdExplanation; 