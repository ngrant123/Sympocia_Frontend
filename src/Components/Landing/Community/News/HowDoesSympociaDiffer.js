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

const SympociaDiffer=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> How do we <span style={{color:"#C8B0F4"}}>differ</span> ?</b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				Whether we like it or not, the age of social media platforms is booming but not in a good way. How do you feel after using social media platforms like Twitter, Facebook, Instagram, or Reddit? It’s a toss-up, right? 50% chance you leave the platform feeling decent and 50% chance you leave feeling triggered.

				<br/>
				<br/>
				We at Sympocia think the problem boils down to how people are connecting with each other on these platforms. Connecting these days refers to simply clicking a follow button. No additional work is needed. Sympocia is looking to change everything and hopefully spearhead these platforms in the correct direction. 

				 <br/>
				 <br/>
				 <p style={{fontSize:"24px"}}>
				 	<b>Profiles</b>
				 </p>
				 <br/>
				 <br/>
				 Let's start with how connections are actually made. When you follow someone on other platforms like Facebook or Instagram you essentially gain access to them as a whole but here at Sympocia we are taking a different approach. After you recruit someone you then encounter something we call the friend’s gauge. Essentially, the friend’s gauge is a level system for your posts and you give people access to the level you want them to see or restrict them. You can look at it like peeling an onion. The more you get to know someone, the more posts you see, and the more access you get to their profile as a whole.
				<br/>
				<br/>
				Additionally, we only allow up to 100 friends per profile. Shocking right? But ask yourself this: How many people on your follower’s list do you actually talk to per day? Personally, I talk to about half a person per day, and definitely not my 500 followers on Instagram. But other platforms' main focus is not on connecting people but on the number of followers a person has. You see this with them blue checking certain people based on their clout. We on the other hand don’t want to promote that. Only connect with people with whom you truly feel a connection. 
				<br/>
				<br/>
				Champions are something that we included early on in development. We listened to other content creators and repeatedly heard them say “Shout out to” something. You’ve heard it also, right? For our platform, we give you an easier and more actionable way to convey that feeling by something called Champions. Champions are highlighted people (or things) that are immediately visible on your profile. Think that someone has impacted you significantly? Champion them. Visited a new place that was amazing recently? Champion them also.
				<br/>
				<br/>
				<p style={{fontSize:"24px"}}>
				 	<b>Symposiums</b>
				</p>
				<br/>
				<br/>
				Reddit is obviously a huge competitor because we offer something similar to subreddits so let’s talk about how we are different and better than them in that aspect. Subreddits are basically topic-based areas of Reddit ruled by moderators and each one has a cookie-cutter template. We, on the other hand, tailor each symposium(section) of our website to its respective topic and each section has unique questions, topics, and discussion areas to upload to. For example, in the mathematics symposium, there is a specific section to upload the most beautiful formula you’ve seen or get tutoring services. On the other hand, that same space in the poetry symposium is dedicated to giving out poetry-specific advice.
				<br/>
				<br/>
				Additionally, we also introduced new ideas for our symposiums. Beacons is a question-based section where you ask a specific question in either an image, video, or text post and people have to respond in that selected post type. We also brought in an idea called oligarchs which is a system where people are selected to be oligarchs after being elected in a voting contest. Oligarchs can do anything in a symposium and are on paper similar to moderators. The difference is that they have more responsibility, have to be voted in, and can be reset each month after the voting period. No more dictatorships like Reddit. 
				<br/>
				<br/>
				Having added all this stuff to the symposium section, we then took a step back and started talking to people and showing them our platform. One prospective user asked us what kind of content should he post on there. That’s when it hit us. We can add all these light features but in essence, we are still the same as our competitors. Basically, they offer their users a section to upload in and that's it.  How are our goal and mission conveyed in our platform?  Since our goal for our platform is to give people the chance to make authentic connections, how can we further promote that in the symposiums? We came up with the idea of splitting each symposium into three categories: The Grind, Work in Progress, and Achievements. We believe that giving people the ability to show all stages of themselves and whatever they are working on further promotes the idea of authenticity and learning from each other. Reddit simply throws you into a generic ground but we, on the other hand, give you a slightly different experience. 
				<br/>
				<br/>
				<p style={{fontSize:"24px"}}>
				 	<b>Symposiums</b>
				</p>
				<br/>
				<br/>
				Lastly, for our posts, we had to add some improvements also but this one was a little more complicated. How does one improve something that's been the same for a decade? We didn’t fundamentally change posts but we did elevate them. We added video and audio descriptions to each post so that people now have an additional way to express themselves. Additionally, we added something called the authentic section. Here people can leave comments explaining whether they believed that this post is authentic or not. By adding this we believe that it further promotes the main goal for this platform. 
				<br/>
				<br/>
				Finally, we added a new option called comment pools. The story for this is similar to how symposium category sections were created but a little different. I was watching youtube one day listening to a channel called radbrad and he likes to start off his videos say thanks. He then said something like he guys comment down below if you feel this way about something. I’ve heard YouTubers say this a million times but for some reason when he said this it triggered a new idea. Comment pools. Comment pools are basically subsections of the comment section dedicated to a question that the owner creates. So in radbrad’s case, all he had to do was create a comment pool and everyone can comment down in that specific section. Cool right?
				<br/>
				<br/>

				Here is a deeper analysis of all the features that Sympocia has to offer and the thought process behind them. Having written this there is some stuff that I have not included so check out the actual platform to get a better onboarding process. If you’re reading this and haven’t already signed up I highly encourage you to we’re going to change the gain :). 
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

export default SympociaDiffer; 