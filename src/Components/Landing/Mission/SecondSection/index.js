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
					  Most social media platforms make us feel like we don’t belong. They’re filled with people who’re
					  trying to prove they’re perfect, and in order to mingle with everyone else, you’ve got to 
					  put on this mask of perfection as well.

					  <br/>
					  <br/>
					  Sympocia doesn’t focus on creating an illusion of perfection. We focus on creating
					  authentic connections so people can learn, grow, and create strong bonds. 
					</p>

					<p id="offerHeaderText"style={{color:"#5298F8",fontSize:"18px"}}>
						Here are some things that make Sympocia different:
					</p>
					<ol id="OLListCSSID"style={{color:"#5298F8",fontSize:"18px"}}>
					  
					  <li style={OLListCSS}>
					    A new improved algorithm that chooses the recommended content based on the topic and 
					    people you like.
					  </li>

					  <li style={OLListCSS}>
					    The entire platform is designed to help people connect with similar minded people.
					  </li>

					  <li style={OLListCSS}>
					    Users get a tremendous amount of control over their posts. 
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