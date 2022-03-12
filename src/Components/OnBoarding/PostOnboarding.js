import React from "react";
import styled from "styled-components";
import AuthenticPostButton from "../../designs/img/AuthenticPostButton.png";
import MoreInformationButton from "../../designs/img/MoreInformationButton.png";
import StampButton from "../../designs/img/StampButton.png";
import CommentsButton from "../../designs/img/CommentsButton.png";
import FriendsGaugeBadge from "../../designs/img/FriendsGaugeBadge.png";

const ShadowContainer=styled.div`
	position:fixed;
	width:110%;
	left:-5%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:45;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:45;
	left:30%;
	top:20%;
	overflow-y:auto;
	overflow-x:hidden;

	@media screen  and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70% !important;
    }


    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
      left:10% !important;
      width:80% !important;
    }
`;
const IconContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:150%;

	@media screen and (max-width:1370px){
		#iconInformation{
			flex-direction:column !important;
		}
		#text{
			width:60% !important;
		}
	}
`;

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const IconsInformationCSS={
	marginBottom:"5%",
	display:"flex",
	flexDirection:"row"
}


const PostOnboarding=({closeModal})=>{
	return(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<hr/>
				<ul style={{padding:"30px"}}>
					<p>
						Awesome I’m glad you’re actually trying to interact with the posts. You’re growing up so fast :”-).
					  	Before you continue though you should check out what each post option means
					</p>
					<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%",marginTop:"5%"}}>
						<b>Post Options:</b>
					</p>
					<IconContainer>
						<div id="iconInformation" style={IconsInformationCSS}>
							<img src={StampButton} style={{width:"60px",height:"50px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								The stamps are intergral to posts. If you like a post then just click
								this button to show appreciation and a little stamp button will show up
							</p>
						</div>
						<hr style={HorizontalLineCSS}/>
						<div id="iconInformation" style={IconsInformationCSS}>
							<img id="iconInformation" src={AuthenticPostButton} style={{width:"60px",height:"50px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								We value authenticity so if you see a post that looks fake or if you 
								love it click on this button. Explain why you feel the way you feel and submit your opinion about that post
							</p>
						</div>	
						<hr style={HorizontalLineCSS}/>
						<div id="iconInformation" style={IconsInformationCSS}>
							<img src={CommentsButton} style={{width:"60px",height:"50px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								Hard to believe but this is the comments button. Crazy right?
								Just click on the button and get started.
								We also created something called comment pools which are basically commection sections that 
								the creator of the post made. 
							</p>
						</div>
						<hr style={HorizontalLineCSS}/>
						<div id="iconInformation" style={IconsInformationCSS}>
							<img src={FriendsGaugeBadge} style={{width:"60px",height:"50px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								The friends gauge badge icon allows you to get a sneak peek into someone's profile.
								Clicking this badge displays hand selected posts by the user.
							</p>
						</div>
						<hr style={HorizontalLineCSS}/>
						<div id="iconInformation" style={IconsInformationCSS}>
							<img src={MoreInformationButton} style={{width:"80px",height:"70px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								When you see this icon it means that theres more information about the post.
								Click on it when you see it to learn more.
							</p>
						</div>


					</IconContainer>
					<hr/>
					<p style={{marginBottom:"5%"}}>Finally if you're looking at an image or a video you can click on it to isolate it and view it </p>

					<p style={{color:"#C8B0F4"}}>
						Easy right? Well go on then and remember that we value communication. Let people know how you feel
					</p>

					<hr/>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"10px"}}>
							<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
								Step 1 of 1
							</li>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>closeModal()} style={ButtonCSS}>
									Close
								</li>
							</a>
						</ul>
					</li>
				</ul>
			</Container>
		</React.Fragment>
	)
}

export default PostOnboarding;