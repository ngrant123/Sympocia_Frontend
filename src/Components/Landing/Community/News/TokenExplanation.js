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

const TokenExplanation=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> What are <span style={{color:"#C8B0F4"}}>tokens</span> ?</b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				So essentially tokens are you know... tokens. Mind blowing right? In Sympocia, you can gain tokens
				by simply interacting with other peoples posts. For example, if you stamp someone's post 
				you gain 2 tokens.

				<br/>
				<br/>
				<p style={{fontSize:"24px",color:"#C8B0F4"}}>
				 	<b>Increments</b>
				</p>
				<br/>
				<br/>

				<p>Now there are three different types of token increments:<b>small, medium, and high end.</b> </p>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 1:Small Increments <span style={{color:"#C8B0F4"}}>(5 points)</span></b>
				</p>
				<p> 
					Small token increments are within the range of 5 points and generally occur when you the user 
					interacts with someone else's posts. This consists of stamping, commenting, leaving a comment about whether its 
					authentic and other items. Later on there will be an increment whenever you post but as of right now 
					the small increments are focused on when you interact with someone else's posts.
				</p>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 2:Medium Increments <span style={{color:"#C8B0F4"}}>(250 points)</span></b>
				</p>
				<p>
					There are three different sections when it comes to medium increments. First one deals with swimming posts.
					If you don't know, a post is considered swimming when it is passes a certain threshold within a time period 
					in comparision to the other posts in the symposium.  If you have 5 posts swimming in one week 
					then you get 250 points.
				</p>

				<br/>
				<br/>
				<p>
					A post is considered a top performer if it ranks higher than the high post score threshold for 
					its symposium. So for example it the threshold is a score of 1 and your post
					has a score of 2 then it is considered a top performer. But later on if the threshold is 15, it would still 
					be considered one because in the past it has reached that level. So if you have three posts that are top
					performers in a week then you qualify for the medium token increment.
				</p>

				<br/>
				<br/>

				<p>
					Lastly if your post passes the average threshold for the other posts in the symposium then it can qualify 
					for a medium increment. If your post score is 90% better than other posts, it will qualify for gold
					<span style={{color:"#C8B0F4"}}><b>(25 tokens)</b></span>.
					70% for silver <span style={{color:"#C8B0F4"}}><b>(15 tokens)</b></span> and 50% for bronze
					<span style={{color:"#C8B0F4"}}><b>(5 tokens)</b></span>.
					If you get ten posts that are gold for a post-type then you 
					qualify for a medium token increment.
				</p>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 3:High Increments <span style={{color:"#C8B0F4"}}>(500 points)</span></b>
				</p>
				<p>
					In order to qualify for a high end token increment requires a certain amount of planning (or luck). 
					Going back to the swimming posts, we previously had a token increment that handled if you had
					five posts swimming in one week. Now for the high end token increment, you have to have 5 posts
					that are swimming through 75% of all of the symposiums. After you accomplish that, then 
					you would have qualified for the increment.
				</p>

				<br/>
				<br/>
				<p>
					If you had 10 posts that were of a gold post-type then you qualified for 
					a medium increment right? The high end token increment is very similar to this. Simiply stated, you will
					get a high end token increment if you have 5 gold posts for all four post types. Simple right?
					Depending on your token score you either reach <b>bronze, silver, or gold status</b>.
				</p>
				<br/>
				<br/>
				<p> Finally, each month tokens are reset soooo yeah.... :)</p>
				<br/>
				<br/>
				<p style={{fontSize:"24px",color:"#C8B0F4"}}>
				 	<b>Conclusion</b>
				</p>

				Hopefully, this post was a little helpful for you. Tokens is something that I think brings a fun interactivity
				to the platform and I hope you like it. Email me @ nathan.sympocia.com.
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

export default TokenExplanation; 