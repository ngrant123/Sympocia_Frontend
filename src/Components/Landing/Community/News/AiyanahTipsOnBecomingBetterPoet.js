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

const TipsOnBecomingABetterPoet=()=>{
	return(
		<Container>
			<p id="headerTitle" style={{fontSize:"40px"}}>
				<b> Four tips to get better at writing <span style={{color:"#C8B0F4"}}>Poetry</span> </b>
			</p>
			<p id="coreContent" style={{width:"80%",fontSize:"20px",marginTop:"5%"}}>
				<b>Tip #1 - Resources </b>
				<br/>

				A style book:  Grammar, spelling and etiquette are fundamentals of writing
				regardless of the chosen format.  A style book, such as Strunk & White’s “The
				Elements of Style” (Authored by William Strunk Jr. and E. B White) is a
				quick-read primer on the basics that are often overlooked.  Poetry falls
				outside some of the elements via freedom of form, style and content, but it’s
				a staple resource for someone new to written composition of any kind.  It is
				typically part of a writing curriculum. There are also many poetry handbooks,
				companions and how-tos to help with form and process.



				A thesaurus: helps replace boring words with extraordinary words. 

				A dictionary:  helps define the extraordinary words suggested by the
				thesaurus.

				A rhyming dictionary:  helps find rhyming words of substance, as there is
				nothing worse in poetry than a rhyme just to rhyme. 

				The three above can be either in book format or just via quick online
				searches.  I like Word Hippo online, as it finds synonyms, antonyms,
				definitions, and rhyming words even organized by number of syllables.

				<br/>
				<br/>
				<br/>

				<b>Tip #2 - Read, read, and read some more.</b>
				<br/>
				Reading works of other poets will
				inspire, teach and help develop one’s own style.

				<br/>
				<br/>
				<br/>


				<b>Tip #3 - Write, write, and write some more.</b>
				<br/>
				Practice is the only way through.
				Start by writing - anything. Then follow the tips below to make it a poem.
				Many people journal their random thoughts, every-day experiences or profound
				insights and the feelings associated with each.  Poems can be free verse or
				one-line ramblings or thoughts - so have fun with it.  It's not all stanzas
				and rhymes. Whether you publish it or not the act of writing will make you
				better, and you've already started.

				<br/>
				<br/>
				<br/>


				<b>Tip #4 - Edit, edit, and edit some more.</b>
				<br/>
				I always say that writing is 10%
				writing and 90% editing.  Just get your thoughts down on paper - no matter how
				bad they sound. Then refine your meaning and delivery.



				Engage the reader with words and form that trigger the reader’s interest and
				feelings.  Be relatable.

				Direct readers where you want them to go - inside the world of your poem.

				Imagine and Inspire by using imagery to transport readers, and language that
				sparks emotion to make them care.

				Tighten by eliminating unnecessary words - make every word count. No
				embellishing just for length. 



				Use these tools to make it shine with creative and engaging verbiage and
				imagery.  Dig deep into your emotions, picture the scene and action, then find
				words, tone and flow that take the reader there.  I sometimes listen to music
				to set a tone, and then turn it off if it becomes distracting.
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

export default TipsOnBecomingABetterPoet; 