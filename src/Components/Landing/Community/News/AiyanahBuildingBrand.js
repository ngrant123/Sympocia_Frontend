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
				<b> How to build a brand as a  <span style={{color:"#C8B0F4"}}>Poet</span> </b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				Form your identity before publishing. Know who you are in the narration,
				and what you want to say.  That doesn't mean it's always the same.  That
				doesn't mean the point of view is always the author's.  It just means to
				be authentic and true to the identity.  For example, my last name is
				impossible to remember, so I use my native spirit name as my pen name (or
				pseudonym) for poetry.  I also do freelance work other than poetry under a
				different name, as this work does not necessarily fit the theme and
				personality of Aiyanah and what she wants to convey.
				<br/>
				<br/>
				<br/>

				Look for venues and publications that fit your piece, and choose publishers
				and publishing space wisely.  Not every piece is for every publication.  And
				you don't want to write for every publication - trust me on this.  In online
				space, interact with others! That means reading their works as well,
				commenting and following if your goal is to grow readership.  Be sure to be
				genuine.  When you interact, doors open and great experiences happen to make
				you better.  Even if it’s just a quick exchange.
				<br/>
				<br/>
				<br/>

				Most importantly, write for the love of writing or because you have something
				to say in your own special way.  Let that be the reward for writing.  Money
				comes from doing your best at something you're passionate about.  If you
				aren't passionate about the subject, write about something else.  Readers know
				the difference.  In terms of generating income from writing, plan to branch
				out in terms of venues, projects and collaborations for different sources of
				income and exposure.  Sometimes you publish to get exposure, especially in the
				beginning.  But your excitement and enthusiasm shining through from the love
				of your work is what develops a following.
			</p>
			<p style={{fontSize:"20px",marginTop:"5%"}}>
				Sincerly,
			</p>
			<p style={{fontSize:"20px"}}>
				<span style={{color:"#C8B0F4"}}>Aiyanah Rose</span>
			</p>
		</Container>
	)

}

export default BuildingBrand; 