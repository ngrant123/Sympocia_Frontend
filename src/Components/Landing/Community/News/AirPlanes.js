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

const AirPlanes=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> What do the <span style={{color:"#C8B0F4"}}>Airplanes</span> mean? </b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				Let me take you back to a night a few months ago. I was thinking to myself about how I can make 
				Sympocia more interactive and make it feel more commmunity orientated. Although other platforms 
				have people posting on it, I never had like a real time feeling of me using the platform with other people. 
				In other words I wanted Sympocia to feel like I was in times square with people around. 
				<br/>
				<br/>
				<br/>
				Interesting concept right? But how to implement it. At first I thought of implementing some 
				sort of leaderboard that updates when people uses it. 
				Cool right but in my opinion that was too easy. Leaderboards are something that have been done in 
				the gaming industry etc. After tossing and turning over some ideas, I came up with airplanes. What do 
				airplanes represent? Whenever someone interacts with an area of sympocia other people are notified of it
				by seeing an airplane of them heading to the area they clicked. Why an airplane? Its simple, clean, and cute. 
				The interesting thing about it is that you can toggle off this feature and have it so that people don't 
				get notifications of your actions(airplanes). Additionally, you can also click on the airplane and get
				sent to their profile. 

				<br/>
				<br/>
				Hopefully, this makes the platform feel more alive. Right now the airplanes are unfortunately not real time 
				but will be soon in the near feature. Hope you like it.
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

export default AirPlanes; 