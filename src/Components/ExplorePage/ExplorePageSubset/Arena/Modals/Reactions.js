import React,{Component} from "react";
import styled from "styled-components";
import VideoDescriptionPortal from "../../../../GeneralComponents/PostComponent/VideoDescription/VideoDescriptionPortal.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import MicIcon from '@material-ui/icons/Mic';
import {connect} from "react-redux";
import {
	getVideoReactions,
	getTextComments
} from "../../../../../Actions/Requests/ArenaPageAxiosRequests/ArenaPageGetRequests.js";  

import {
	addTextReaction,
	addVideoReaction
} from "../../../../../Actions/Requests/ArenaPageAxiosRequests/ArenaPageSetRequests.js";  

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

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		top:15% !important;
		height:80% !important;

		#reactionOptionsLI{
			margin-top:20% !important;
		}
	}
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
  width:"10%",
  marginBottom:"2%"
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
			videoReactions:[],
			textReactions:[],
			displayCreationPrompt:false,
			isLoading:true
		}
	}

	async componentDidMount(){
		const {
			arenaId,
			postType
		}=this.props
		if(this.props.arenaId!=null){
			const {confirmation,data}=await getVideoReactions({arenaId,postType,textCounter:1})
			if(confirmation=="Success"){
				this.setState({
					videoReactions:data,
					isLoading:false
				})
			}else{	
				alert('Unfortunately there has been an issue with get the video reaections. Please try again');

			}
		}
	}

	videoReactions=()=>{

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
												<a href={`/profile/${data.owner._id}`} style={{textDecoration:"none"}}>
													<img src={data.owner.profilePicture==null
																?NoProfilePicture
																:data.owner.profilePicture}
													style={{borderRadius:"50%",width:"100%",height:"15%"}}/>
												</a>
											</li>

											<li style={{color:"#FFFFFF",listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
												<b>{data.owner.firstName}</b>
											</li>
										</ul>
									</li>
								</VideoOwnerInformationContainer>

								<video style={{borderRadius:"5px"}} width="80%" height="80%" autoplay="true" controls>
									<source src={data.videoUrl} type="video/mp4"/>
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
		return <>
				{this.state.displayTextReactions==true?
					<ul>
						{this.state.textReactions.map(data=>
							<>
								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>
											<a href={`/profile/${data.owner._id}`} style={{textDecoration:"none"}}>
												<img src={data.owner.profilePicture==null?
														NoProfilePicture:
														data.owner.profilePicture}
												style={{borderRadius:"50%",width:"100%",height:"20%"}}/>
											</a>
										</li>

										<li style={{color:"#FFFFFF",listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
											<b>{data.owner.firstName}</b>
										</li>
									</ul>
								</li>
								<li style={{color:"#FFFFFF",listStyle:"none",height:"40%",overflowY:"auto",marginBottom:"1%"}}>
									 {data.post}
								</li>
								<hr/>
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
	submitTextReaction=async()=>{
		const {
			personalState,
            postType,
            arenaId
		}=this.props;
		const post=document.getElementById("textReaction").value;

		const textReaction={
            post,
            ownerId:personalState.id,
            postType,
            arenaId
        }
        let {confirmation,data}=await addTextReaction(textReaction);
        
		if(confirmation=="Success"){
			data={
				...data,
				owner:{
					...data.owner,
					firstName:this.props.personalState.firstName
				}
			}
			const currentTextReactions=this.state.textReactions;
			currentTextReactions.splice(0,0,data);

			this.setState(prevState=>({
				...prevState,
				textReactions:currentTextReactions,
				displayCreationPrompt:false,
				createVideoReaction:false,
				createTextReaction:false
			}))

		}else{
			alert('Unfortunately there was an error creating your video response. Please try again');
		}
	}

	submitVideoReaction=async()=>{
		const {
			personalState,
            postType,
            arenaId
		}=this.props;

		const videoReaction={
            videoUrl:this.state.videoCreationSrc,
            ownerId:personalState.id,
            postType,
            arenaId
        }

		let {confirmation,data}=await addVideoReaction(videoReaction);
		
		if(confirmation=="Success"){
			data={
				...data,
				owner:{
					...data.owner,
					firstName:this.props.personalState.firstName
				}
			}
			const currentVideoReactions=this.state.videoReactions;
			currentVideoReactions.splice(0,0,data);

			this.setState(prevState=>({
				...prevState,
				videoReactions:currentVideoReactions,
				displayCreationPrompt:false,
				createVideoReaction:false,
				createTextReaction:false,
				confirmationVideoReactionCreation:false
			}))
		}else{
			alert('Unfortunately there was an error creating your video response. Please try again');
		}
	}

	fetchTextReactions=async()=>{
		const {
			arenaId,
			postType
		}=this.props

		const {confirmation,data}=await getTextComments({arenaId,postType,textCounter:1})

		if(confirmation=="Success"){
			this.setState({
				textReactions:data,
				displayVideoReactions:false,
				displayTextReactions:true
			})
		}else{	
			alert('Unfortunately there has been an issue with get the video reaections. Please try again');
		}
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

							<ul id="reactionOptionsLI" style={{padding:"0px"}}>
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
											<li onClick={()=>this.fetchTextReactions()} 
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

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.setState({
														createVideoReaction:false,
														createTextReaction:false
													 })} style={BackButtonCSS}>
												Back
											</li>
										</a>

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
														<a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<li onClick={()=>this.submitVideoReaction()} style={ButtonCSS}>
																Submit
															</li>
														</a>
													</ul>
												}
											</li>:
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<InputContainer id="textReaction" placeholder="Enter a reaction here"/>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li onClick={()=>this.submitTextReaction()}style={ButtonCSS}>
															Submit
														</li>
													</a>
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

const mapStateToProps=(state)=>{
	return{
		personalState:state.personalInformation
	}
}

export default connect(
	mapStateToProps,
	null
)(Reaction);


