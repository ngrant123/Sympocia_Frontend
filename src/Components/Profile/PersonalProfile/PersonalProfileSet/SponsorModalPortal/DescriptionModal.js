import React,{useState} from "react";
import styled from "styled-components";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InstagramIcon from '@material-ui/icons/Instagram';

const BackButtonCSS={
	listStyle:"none",
	borderRadius:"5px",
	borderStyle:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px",
	color:"#5298F8",
	width:"20%",
	padding:"10px",
	marginBottom:"5%"
}

const ProfilePicture=styled.div`
	position:relative;
	width:115%;
	height:40%;
	border-radius:50%;
	background-color:red;
	border-style:solid;
	border-color:#5298F8;
	border-width:5px;
`;

const NameTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	width:130%;
`;

const DescriptionTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	height:50%;
	width:165%;
`;

const SubmitButton=styled.div`
	position:relative;
	color:white;
	padding:10px;
	width:50%;
	height:10%;
	background-color:#C8B0F4;
	border-radius:5px;

`;

const ShadowContainer= styled.div`
	position:fixed;
	width:40%;
	height:60%;
	background-color: rgba(0,0,0,0.4);
	top:95px;
	z-index:5;
`;

const SocialMediaUrlContainer=styled.div`
	position:absolute;
	width:60%;
	height:30%;
	background-color:white;
	top:0px;
	z-index:6;
	border-radius:5px;
	top:20%;
	left:20%;
	padding:20px;
`;

const InstagramUrlTextArea=styled.textarea`
	position:relative;
	width:300px;
	height:50px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	border-radius:5px;
`;

const SocialMediaSubmitButton=styled.div`
	position:relative;
	color:white;
	padding:10px;
	width:50%;
	height:30%;
	background-color:#5298F8;
	border-radius:5px;
	margin-top:10px;
`;


const TikTokUrlTextArea=styled.textarea`
	position:relative;
	width:300px;
	height:50px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	border-radius:5px;

`;


const DescriptionModal=(props)=>{

	const [instagramUrl,changeInstagramUrl]=useState();
	const [tikTokUlr,changeTikTokUrl]=useState();

	const [displayIGUrlPrompt,changeDisplayIGUrlPrompt]=useState(false);
	const [displayTikTokUrlPrompt,changeDisplayTikTokUrlPrompt]=useState(false);

	const handleSubmitIGUrl=()=>{

		const instagramUrl=document.getElementById("igUrl").value;

		changeInstagramUrl(instagramUrl);
		changeDisplayIGUrlPrompt(false);

	}

	const handleSubmitTikTokUrl=()=>{
		const tikTokUrl=document.getElementById("tikTokUrl").value;

		changeTikTokUrl(tikTokUrl);
		changeDisplayTikTokUrlPrompt(false);


	}
	
	return(
		<React.Fragment>
			<ul style={{padding:"15px"}}>
				<li style={BackButtonCSS} onClick={()=>props.backButton()}>
					<a style={{textDecoration:"none"}} href="javascript:void(0);">
						<ArrowBackIcon
							style={{color:"#5298F8"}}
						/> Back
					</a>
				</li>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"15%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginBottom:"25px"}}>
									<ProfilePicture>
									</ProfilePicture>
								</li>
								<p><b>Name</b></p>
								<li style={{listStyle:"none"}}>
									<NameTextArea placeholder="Enter a name here"/>
								</li>
								<li style={{listStyle:"none"}}>
									<ul>
										<li onClick={()=>changeDisplayIGUrlPrompt(!displayIGUrlPrompt)} style={{listStyle:"none",display:"inline-block",marginRight:"35%"}}>
											<InstagramIcon
												style={{fontSize:45,
													color:(instagramUrl!=null?"#5298F8":"black")}}
											/>
										</li>

										<li onClick={()=>changeDisplayTikTokUrlPrompt(!displayTikTokUrlPrompt)} style={{listStyle:"none",display:"inline-block"}}>
											<InstagramIcon
												style={{fontSize:45}}
											/>
										</li>

									</ul>
								</li>

							</ul> 
						</li>

						<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",borderLeft:"solid",borderColor:"#D8D8D8"}}>
							<ul style={{paddingLeft:"25px"}}>
								<p><b>Description</b></p>
								<li style={{listStyle:"none",marginBottom:"5%"}}>
									<DescriptionTextArea placeholder="Start writing"/>
								</li>

								<li style={{listStyle:"none"}}>
									<SubmitButton>
										Submit
									</SubmitButton>
								</li>
							</ul>
						</li>
					</ul>

				</li>

			</ul>
		{/*Could below could be refactored in a better way later on as its just the same could 
		but switched based on which social media indicator is true*/}

			{
				displayIGUrlPrompt==false?
				<React.Fragment></React.Fragment>:
				<React.Fragment>
					<ShadowContainer
						onClick={()=>changeDisplayIGUrlPrompt(!displayIGUrlPrompt)}
					/>
					<SocialMediaUrlContainer>
						<InstagramUrlTextArea
							placeholder="Enter the instagram url here"
							id="igUrl"
						/>
						<SocialMediaSubmitButton onClick={()=>handleSubmitIGUrl()}>
							Submit
						</SocialMediaSubmitButton>


					</SocialMediaUrlContainer>

				</React.Fragment>
			}

			{
				displayTikTokUrlPrompt==false?
				<React.Fragment></React.Fragment>:
				<React.Fragment>
					<ShadowContainer
						onClick={()=>changeDisplayTikTokUrlPrompt(!displayTikTokUrlPrompt)}
					/>
					<SocialMediaUrlContainer>
						<TikTokUrlTextArea
							placeholder="Enter the tik tok url here"
							id="tikTokUrl"
						/>
						<SocialMediaSubmitButton onClick={()=>handleSubmitTikTokUrl()}>
							Submit
						</SocialMediaSubmitButton>


					</SocialMediaUrlContainer>

				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default DescriptionModal;