import React from "react";
import styled from "styled-components";
import AuthenticPostButton from "../../designs/img/AuthenticPostButton.png";
import MoreInformationButton from "../../designs/img/MoreInformationButton.png";
import StampButton from "../../designs/img/StampButton.png";
import CommentsButton from "../../designs/img/CommentsButton.png";

const ShadowContainer=styled.div`
	position:fixed;
	width:110%;
	left:-5%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:35;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:35;
	left:30%;
	top:20%;
	overflow-y:scroll;

`;
const IconContainer=styled.div`
	display:flex;
	flex-direction:column;
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


const PostOnboarding=({closeModal})=>{
	return(
		<React.Fragment>
			<ShadowContainer/>
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
						<div style={{display:"flex",flexDirection:"row"}}>
							<img src={StampButton} style={{width:"70px",height:"70px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								The stamps are intergral to posts. If you like a post then just click
								this button to show appreciation and a little stamp button will show up
							</p>
						</div>

						<div style={{display:"flex",flexDirection:"row"}}>
							<img src={AuthenticPostButton} style={{width:"70px",height:"70px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								We value authenticity so if you see a post that looks fake or if you 
								love it click on this button. Explain why you feel the way you feel and submit your opinion about that post
							</p>
						</div>

						<div style={{display:"flex",flexDirection:"row"}}>
							<img src={CommentsButton} style={{width:"70px",height:"70px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								Hard to believe but this is the comments button. Crazy right?
								But here you can upload also video comments. Just click on the button and get started
							</p>
						</div>

						<div style={{display:"flex",flexDirection:"row"}}>
							<img src={MoreInformationButton} style={{width:"70px",height:"70px"}}/>
							<p id="text" style={{width:"40%",marginLeft:"10%"}}>
								When you see this icon it means that theres more information about the post.
								Click on it when you see it to learn more.
							</p>
						</div>

					</IconContainer>

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