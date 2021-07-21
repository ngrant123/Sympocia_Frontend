import React from "react";
import styled from "styled-components";
import LandingImage from '../../../../designs/img/SecondSectionImage.png';
import {
	Container,
	InformationalContainer
} from "./indexCSS.js";


const BackgroundDivCSS={
	display:"flex",
	flexShrink:0,
	position:"static",
	width:"150%",
	height:"750px",
	transform:"rotate(-5deg)",
	marginLeft:"-5%",
	marginTop:"3%",
	backgroundColor:"#303030",
	overflow:"hidden",
	marginBottom:"10%"
}

const SecondaryBackgroundDivCSS={
	backgroundColor:"#171717",
	width:"35%",
	transform:"rotate(5deg)",
	height:"120%",
	marginTop:"-5%"
}

const OLListCSS={
  marginBottom:"5%"
}

const SecondSection=()=>{
	return(
		<Container>
			<InformationalContainer>
				<div style={{marginLeft:"5%"}}>
					<img id="secondSectionImage" src={LandingImage} 
						style={{width:"427px",height:"435px",left:"5%",borderRadius:"50%"}}
					/>
				</div>
                 <div id="secondSectionPrimaryText" style={{width:"40%",marginRight:"5%"}}>
                 	<p id="manifestoText" style={{color:"#C8B0F4",fontSize:"24px"}}>
                      <b>Manifesto</b>
                    </p>
                    <p id="secondSectionHeaderText" style={{fontSize:"36px",color:"white"}}>
                      <b>How are we different?</b>
                    </p>
                    <p id="howAreWeDifferentText" style={{marginBottom:"15%",color:"#DFDFDF",fontSize:"18px"}}>
                      We've all been there. You've asked yourself "I really like this photo but will it get likes?"
                      or "Will anyone care about my hobbies?". You've also asked yourself, "Why do I feel so alone after
                      using social media?". We've asked ourselves these question also. Which is why we built Sympocia
                    </p>
                    <p id="offerHeaderText"style={{color:"#5298F8",fontSize:"18px"}}>Here’s some things that we offer:</p>
                    <ol id="OLListCSSID"style={{color:"#5298F8",fontSize:"18px"}}>
                      <li style={OLListCSS}>
                        New improved algorithm for images, videos, blogs, and regular posts
                      </li>
                      <li style={OLListCSS}>
                        More emphasis on creating real connections with people that you like
                      </li>

                      <li style={OLListCSS}>
                        More control over posts than you ever had before
                      </li>
                    </ol>
                 </div>
			</InformationalContainer>
			<div id="backgroundDiv" style={BackgroundDivCSS}>
				<div id="secondaryBackgroundDiv" 
					style={SecondaryBackgroundDivCSS}
				/>
			</div>
		</Container>
	)
}


export default SecondSection;