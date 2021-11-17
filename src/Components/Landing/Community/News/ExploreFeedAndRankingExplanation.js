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

const FeedAndRankingExplanation=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> How <span style={{color:"#C8B0F4"}}>does it work</span> ?</b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				Awesome so without further ado, let me talk about the ranking and recommendation algorithm. 
				Hopefully being transparent on Sympocia will help you create better content and actually understand
				what succeeds on this platform.

				<br/>
				<br/>
				<p style={{fontSize:"24px",color:"#C8B0F4"}}>
				 	<b>Posts</b>
				 </p>
				 <br/>
				 <br/>
				 <p style={{fontSize:"18px"}}>
				 	<b>Part 1:Ranking</b>
				 </p>
				So to start, the ranking system is different for each of the posts. For example, the ranking for images is slightly different for videos while videos are slightly different for texts posts, and so on and so forth. So how is a post score determined? It takes into consideration the number of comments you have, stamps for your post, and watch time (amongst other things). Like I said before though each post is weighed differently and considers more things. For example, videos take into consideration the watch time for the video itself in addition to the video and audio description. Additionally, if the amount of people who comment on the post and claim it as unauthentic (through the authentic/unauthentic poll option button) is exponentially greater than anything else then that starts to lower the score also.  
				<br/>
				<br/>
				<br/>
				 <p style={{fontSize:"18px"}}>
				 	<b>Part 2:Popular Posts</b>
				 </p>
				Additionally, your posts can attain certain statuses after they pass a certain threshold. Each post score is recorded and added to a total symposium post score at which point a popular post threshold is updated. If a post score passes this threshold then they are placed in the popular post’s category. Naturally, the popular post threshold will be easier at the beginning since fewer and fewer people are joined in the symposium. That’s the point ;). I wanted to give you a lot of rewards for using the platform first. 

				<br/>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 3:Swimming Posts</b>
				</p>
				Lastly, when it comes to posting we have the topic of swimming. Now when you upload a post, the system calculates an average score for it in comparison to all the other posts. Now if your post passes this average score, then it reaches a status of “swimming” for a certain time period. What that basically means is that, if your post is swimming then that means it would essentially travel to different symposiums. As it travels to different symposiums, if it is liked at these symposiums it continues to travel to different ones. If you post travels to all the symposiums then you get a prize!!!! Not really (lolz) but I’m currently implementing a token system that will be impacted by that soon. Right now, if you see a post glowing gold then that means that it is 
					currently swimming.
				<br/>
				<br/>
				<br/>
				<p style={{fontSize:"24px",color:"#C8B0F4"}}>
				 	<b>Explore Feed</b>
				</p>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 1:Algorithm Explanation</b>
				</p>
				Next is the explore feed display system. Now the explore feed is created using a combination of two recommendation algorithms. One focuses on comparing the specific post you interacted with other posts that people liked also.
					The other one takes into consideration what symposium you interacted with. My hope is that this mixture of algorithms will hopefully make your experience a little better. 
				<br/>
				<br/>
				<br/>
				<p style={{fontSize:"18px"}}>
				 	<b>Part 2:Feed Options</b>
				</p>
				On top of that, I’m giving you the option to either clear your feed and start over or edit your feed. If you click on the little folder icon near the explore page title, a screen will display to you with a symposium and a number next to it. Now after you interact with a certain post in a symposium, a score gets incremented also. That’s essentially your symposium relationship score and what that means is that it is basically the interaction score that you have with this symposium. Now this score is taken into consideration when completing the symposium algorithm. 
				<br/>
				<br/>
				Basically, if your score is higher then you will be matched with people who have higher scores also. On the other hand, if your score is lower then you will be matched with people who generally just started posting in this symposium. The thought process behind this is that people who post more in a symposium are generally more dedicated to the symposium and will hopefully be producing higher quality posts. Since that amount of people is fewer that would naturally mean you won’t be recommended a lot of posts. This is why I’m giving you the option to edit your explore feed. Now that I’m thinking of it, I should have given you guys the option to add a symposium… Next update then. So yeah right now you can clear your feed, delete a symposium, and lower the symposium score or increase it. 

				<br/>
				<br/>
				<p style={{fontSize:"24px",color:"#C8B0F4"}}>
				 	<b>Conclusion</b>
				</p>
				Hopefully, this post was a little helpful for you. Down the road when I fine-tune the algorithms behind this I will create a new post but let me know what you think. Email me @ nathan.sympocia.com.
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

export default FeedAndRankingExplanation; 