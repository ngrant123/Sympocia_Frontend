import React,{Component} from "react";
import styled from "styled-components";
import VideoDescriptionPortal from "../../../../GeneralComponents/PostComponent/VideoDescriptionPortal.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import TestProfilePicture from "../../../../../designs/img/FirstSectionLandingPAgeImage.png";
import MicIcon from '@material-ui/icons/Mic';

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	z-index:13;
	height:60%;
	width:60%;
	border-radius:5px;
	top:5%;
	left:20%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
	background-color:#1d1d1d;
`;


const CreatePostButton=styled.div`
	position:fixed;
	top:50px;
	width:70px;
	height:70px;
	border-radius:50%;
	background-color:white;
	border-color:white;
	border-style:solid;
	padding:15px;
	border-width:5px;
	animation: glowing 1300ms infinite;
	z-index:20;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	margin-top:3%;
	margin-bottom:3%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	width:70%;
	height:50%;
`;

const VideoOwnerInformationContainer=styled.div`
	top:0px;
	left:10%;
`;
const ReactionOptionButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"5px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginLeft:"20%"
}

const BackButtonCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"5px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"10%"
}

const ButtonCSS={
	  listStyle:"none",
	  backgroundColor:"white",
	  borderRadius:"5px",
	  padding:"20px",
	  color:"#3898ec",
	  borderStyle:"solid",
	  borderWidth:"2px",
	  borderColor:"#3898ec",
	  width:"60%"
}


class Reaction extends Component{
	constructor(props){
		super(props);
		this.state={
			displayTextReactions:false,
			displayVideoReactions:true,
			createVideoReaction:false,
			confirmationVideoReactionCreation:false,
			videoCreationSrc:null,
			createTextReaction:false,
			videoReactions:[{owner:{firstName:"Bib"}},{owner:{firstName:"Derrik"}},{owner:{firstName:"B"}}],
			textReactions:[{owner:{firstName:"Bib"}},{owner:{firstName:"Derrik"}},{owner:{firstName:"B"}},{owner:{firstName:"P"}}],
			displayCreationPrompt:false,
			isLoading:true
		}
	}

	componentDidMount(){
		this.setState({
			isLoading:false
		})
	}

	creationPrompt=()=>{
	}
	videoReactions=()=>{
		if(this.state.isLoading==false)
			document.getElementById("container").style.backgroundColor="#1d1d1d";

		return <>
		{this.state.displayVideoReactions==true?
				<ul>
					{this.state.videoReactions.map(data=>
						<>
							<li style={{listStyle:"none"}}>
								<VideoOwnerInformationContainer>
									<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",width:"10%"}}>	
												<img src={data.profilePicture==null?TestProfilePicture:data.profilePicture}
												style={{borderRadius:"50%",width:"100%",height:"15%"}}/>
											</li>

											<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
												<b>{data.owner.firstName}</b>
											</li>
										</ul>
									</li>
								</VideoOwnerInformationContainer>

								<video style={{borderRadius:"5px"}} width="80%" height="80%" autoplay="true" controls>
									<source src={data.videoSrc} type="video/mp4"/>
								</video>
							</li>
							<hr/>
						</>
					)}
				</ul>:null
		}
				</>
	}

	textReaction=()=>{
		if(this.state.isLoading==false)
			document.getElementById("container").style.backgroundColor="white";
		return <>
				{this.state.displayTextReactions==true?
					<ul>
						{this.state.textReactions.map(data=>
							<>
								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
											<img src={data.profilePicture==null?TestProfilePicture:data.profilePicture}
											style={{borderRadius:"50%",width:"100%",height:"20%"}}/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
											<b>{data.owner.firstName}</b>
										</li>
									</ul>
								</li>
								<li style={{listStyle:"none",height:"40%",overflowY:"auto",marginBottom:"1%"}}>
									  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
									  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
									  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
									  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
									  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
									  qui officia deserunt mollit anim id est laborum.
								</li>
							</>
						)}
					</ul>
					:null
				}
			   </>;
	}
	createVideoDescription=(videoSrc)=>{
		this.setState({
			confirmationVideoReactionCreation:true,
			videoCreationSrc:videoSrc
		})
	}
	submitTextReaction=()=>{

	}

	submitVideoReaction=()=>{
		/*
			const {confirmation,data}=await createVideoResponse(videoResponse);
			if(confirmation=="Success"){
				const newComment={
						videoSrc:this.state.createdVideoSrc,
						profilePicture:data.profilePicture,
						ownerObject:{
							owner:{
								firstName:isPersonalProfileIndicator==true?this.props.personalState.firstName:
								this.props.companyState.companyName
							}
						},
						_id:data.comments.videoComments[data.comments.videoComments.length-1]._id.toString()
					}

				const currentVideos=this.state.videoResponses;
				currentVideos.splice(0,0,newComment);
				this.setState({
					videoResponses:currentVideos
				},function(){
					this.props.closeVideoCreationModal()
				})
			}else{
				alert('Unfortunately there was an error creating your video response. Please try again');
			}
		*/
	}

	closeModal=()=>{
		this.setState({
			createVideoReaction:false,
			createTextReaction:false
		 })
	}

	render(){
		return(
			<>
				<ShadowContainer onClick={()=>this.props.closeModal()}/>
				<Container id="container">
					{this.state.displayCreationPrompt==false?
						<>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<CreatePostButton onClick={()=>this.setState({displayCreationPrompt:true})}>
									<BorderColorIcon
										style={{fontSize:"30",color:"#C8B0F4"}}
									/>
								</CreatePostButton>
							</a>

							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginBottom:"2%"}}>
									<ul style={{padding:"0px"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.setState({
																	displayVideoReactions:true,
																	displayTextReactions:false
																})}
											style={ReactionOptionButton}>
												Video Reactions
											</li>
										</a>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.setState({
																	displayVideoReactions:false,
																	displayTextReactions:true
																})} 
											style={ReactionOptionButton}>
												Text Reactions 
											</li>
										</a>
									</ul>
								</li>
								{this.videoReactions()}
								{this.textReaction()}
							</ul>
						</>:
						<ul>
							{this.state.createVideoReaction==true || this.state.createTextReaction==true?
								<li style={{listStyle:"none",marginTop:"2%"}}>
									<ul style={{padding:"0px"}}>
										<li onClick={()=>this.setState({
													createVideoReaction:false,
													createTextReaction:false
												 })} style={BackButtonCSS}>
											Back
										</li>
										{this.state.createVideoReaction==true?
											<li style={{listStyle:"none"}}>
												{this.state.confirmationVideoReactionCreation==false?
													<VideoDescriptionPortal
														closeModal={this.closeModal}
														createVideoDescription={this.createVideoDescription}
														parentContainer="arenaContainer"
													/>:
													<ul>
														<li style={{listStyle:"none"}}>
															<video style={{borderRadius:"5px"}} width="100%" height="45%" autoplay="true" controls>
																<source src={this.state.videoCreationSrc} type="video/mp4"/>
															</video>
														</li>
														<li onClick={()=>this.submitVideoReaction()} style={ButtonCSS}>
															Submit
														</li>
													</ul>
												}
											</li>:
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<InputContainer id="textReaction" placeholder="Enter a reaction here"/>
													<li onClick={()=>this.submitTextReaction()}style={ButtonCSS}>
														Submit
													</li>
												</ul>
											</li>
										}
									</ul>
								</li>
								:
								<li style={{listStyle:"none",marginTop:"2%"}}>
									<ul style={{padding:"0px"}}>
										<li onClick={()=>this.setState({
														createVideoReaction:false,
														createTextReaction:false,
														displayCreationPrompt:false
												 })}style={BackButtonCSS}>
											Back
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.setState({createTextReaction:true})} style={ButtonCSS}>
												<BorderColorIcon/> Write Post
											</li>
										</a>
										<li style={{marginTop:"10%",marginBottom:"10%",listStyle:"none",display:"inline-block",marginRight:"2%"}}>
											Or
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.setState({createVideoReaction:true})} style={ButtonCSS}>
												<MicIcon/> Record Post
											</li>
										</a>
									</ul>
								</li>
							}
						</ul>
					}
				</Container>
			</>
		)
	}

}

export default Reaction;
