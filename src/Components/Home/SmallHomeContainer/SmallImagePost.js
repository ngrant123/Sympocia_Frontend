import React,{ Component } from "react";
import styled from "styled-components";
import Comments from "./SmallPostCommentContainer.js";

const Container=styled.div`

	position:relative;
	width:107%;
	height:300%;
	left:5%;
	display:flex;
	flex-direction: column;
	overflow:hidden;

`;

const ImagePostContainer=styled.div`

	position:relative;
	width:100%;
	height:300px;
	left:0%;
	padding-bottom:5px;
	border-radius:5px;

`;

const ImageContainer = styled.div`

	position:absoolute;
	width:100%;
	height:100%;
	background-color:red;
	overflow:hidden;

`;

const ExpandImagePostContainer = styled.div`

	position:absolute;
	background-color:white;
	width:40%;
	top:60%;
	height:20%;
	left:5%;
	border-radius:5px;
	z-index:2;
	opacity:0.3;
	transition:.8s;

`;

const ExpandedDivProfileContainer = styled.div`

	position:absolute;
	background-color:red;
	width:20%;
	top:10%;
	height:80%;
	left:5%;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;

`;

const ImageDescription = styled.div`

	position:absolute;
	width:60%;
	top:10%;
	height:50%;
	left:35%;
	overflow-y:scroll;
	font-size:80%;

`;

const ExpandDescriptionContainer = styled.div`

	position:absolute;
	background-color:#5298F8;
	color:white;
	width:60%;
	top:65%;
	height:30%;
	left:35%;
	border-radius:5px;
	font-size:90%;
	text-align:center;
`;


const CommentContainer = styled.div`

	position:absolute;
	width:40%;
	top:83%;
	height:15%;
	left:5%;
	border-radius:5px;
	z-index:2;
	opacity:0.3;
	color:#1e6ecd;
	transition:.8s;

`;

const CommentContainerProfilePicture = styled.div`
	
	position:absolute;
	background-color:red;
	width:15%;
	top:10%;
	height:70%;
	left:5%;
	border-radius:50%;

`;

const CommentSection = styled.div`

	position:absolute;
	background-color:#c8ddf8;
	width:67%;
	top:20%;
	height:60%;
	left:30%;
	font-size:85%;
	text-align:center;
	border-radius:5px;

`;


const OptionsContainer = styled.div`

	position:absolute;
	background-color:black;
	width:20%;
	top:5%;
	height:10%;
	left:75%;
	border-radius:5px;
	z-index:2;

`;

const ReputationContainer = styled.div`

	position:absolute;
	background-color:#C8B0F4;
	width:20%;
	top:5%;
	height:10%;
	left:5%;
	border-radius:5px;
	z-index:2;
	color:white;
	text-align:center;
	font-size:110%;
	opacity:0.3;
	transition:.8s;

`;

const ProfilePictureContainer = styled.div`

	position:absolute;
	background-color:black;
	width:12%;
	top:50%;
	height:20%;
	left:75%;
	border-radius:50%;
	z-index:2;
	opacity:0.3;
	transition:.8s;

`;

const NameContainer = styled.div`

	position:absolute;
	background-color:#ece4f8;
	width:25%;
	top:72%;
	height:7%;
	left:70%;
	border-radius:5px;
	text-align:center;
	color:	#9262e8;
	opacity:0.3;
	transition:.8s;

`;

const TitleContainer = styled.div`

	position:absolute;
	background-color:#ece4f8;
	width:25%;
	top:80%;
	height:7%;
	left:70%;
	border-radius:5px;
	text-align:center;
	color:	#9262e8;
	opacity:0.3;
	transition:.8s;
	
`;

const CompanyContainer = styled.div`

	position:absolute;
	background-color:#ece4f8;
	width:25%;
	top:88%;
	height:7%;
	left:70%;
	border-radius:5px;
	text-align:center;
	color:#9262e8;
	opacity:0.3;
	transition:.8s;
	
`;

const CommentDiv = styled.div`

	position:relative;
	background-color:white;
	width:100%;
	height:300px;
	left:0%;
	border-radius:5px;
	box-shadow:0px 0px 1px 1px;
	overflow-y:scroll;
	opacity:0.3;
	transition:.8s;



`;

const ImageDescriptionDiv = styled.div`

	position:relative;
	width:100%;
	height:200px;
	left:0%;
	border-radius:5px;
	overflow-y:scroll;
	box-shadow:1px 1px 1px 1px;

`;

const ImageDescriptionProfileContainer = styled.div`

	position:absolute;
	left:10%;
	top:10%;
	height:35%;
	width:12%;
	border-radius:50%;
	background-color:#5298F8;
	padding:5px;
`;

const ImageDescriptionProfilePicture = styled.div`

	position:absolute;
	left:10%;
	top:10%;
	height:80%;
	width:80%;
	border-radius:50%;
	background-color:black;
	border-style:solid;
	border-width:5px;
	border-color:white;

`;

const ImageDescriptionPosterInfo = styled.div`

	position:absolute;
	left:8%;
	top:50%;
	height:35%;
	width:25%;

`;

const ImageDescriptionCommentContainer = styled.div`

	position:absolute;
	background-color:#ddeaf8;
	height:20%;
	width:60%;
	left:35%;
	top:65%;
	border-radius:5px;

`;

const ImageDescriptionPersonalImage = styled.div`

	position:absolute;
	background-color:red;
	width:10%;
	height:80%;
	left:5%;
	top:10%;
	border-radius:50%;

`;

const ImageDescriptionCaption = styled.div`

	position:absolute;
	background-color:#ddeaf8;
	height:50%;
	width:60%;
	left:35%;
	top:10%;
	border-radius:5px;
	overflow-y:scroll;
	padding:15px;
	color:	#307acc;

`;

class SmallImagePost extends Component{

	constructor(props){

		super(props);

		this.state={

			showComments:false,
			showImageDescription:false
		}
	}

	displayComments = ()=>{

		return this.state.showComments ? 
		<Comments>
			Comments Description
		</Comments> :

		<p></p>;
	}

	displayImageDescription =()=>{

		this.cleanoutImageDiv();

		return this.state.showImageDescription ? 
		<ImageDescriptionDiv>

			<ImageDescriptionProfileContainer>
				<ImageDescriptionProfilePicture>
				</ImageDescriptionProfilePicture>


			</ImageDescriptionProfileContainer>

			<ImageDescriptionPosterInfo>

				<ul style={{position:"absolute",left:"-20%",listStyle:"none"}}>
					<li style={{fontSize:"120%",color:"#5298F8"}}><b>Nathan</b></li>
					<li>Title: CEO</li>
					<li>Company: Google</li>

				</ul>

			</ImageDescriptionPosterInfo>

			<ImageDescriptionCaption>
				This is a simple caption about the picture etc etc etc 

			</ImageDescriptionCaption>

			<ImageDescriptionCommentContainer onClick={()=>this.handleDisplayComments()}>

				<ImageDescriptionPersonalImage>
				</ImageDescriptionPersonalImage>

				<p style={{position:"absolute",left:"30%",top:"10%",color:"#6aa2dd",fontSize:"110%"}}>Click here to comment ...</p>


			</ImageDescriptionCommentContainer>

		</ImageDescriptionDiv>:
		<p></p>
	}

	cleanoutImageDiv(){

		if(this.state.showImageDescription==true){

			document.getElementById("expandImageContainer").style.display="none";
			document.getElementById("commentContainer").style.display="none";
			document.getElementById("optionsContainer").style.display="none";
			document.getElementById("reputationContainer").style.display="none";
			document.getElementById("profilepictureContainer").style.display="none";
			document.getElementById("nameContainer").style.display="none";
			document.getElementById("titleContainer").style.display="none";
			document.getElementById("companyContainer").style.display="none";

		}
	}

	handleDisplayComments = ()=>{

		this.setState({
			showComments:true
		})
	}

	handleImageDescription =()=>{
		this.setState({
			showImageDescription:true
		})
	}

	handleMouseEnter(){

			document.getElementById("expandImageContainer").style.opacity="1";
			document.getElementById("commentContainer").style.opacity="1";
			document.getElementById("optionsContainer").style.opacity="1";
			document.getElementById("reputationContainer").style.opacity="1";
			document.getElementById("profilepictureContainer").style.opacity="1";
			document.getElementById("nameContainer").style.opacity="1";
			document.getElementById("titleContainer").style.opacity="1";
			document.getElementById("companyContainer").style.opacity="1";
	}

	handleMouseOut(){

			document.getElementById("expandImageContainer").style.opacity=".3";
			document.getElementById("commentContainer").style.opacity=".3";
			document.getElementById("optionsContainer").style.opacity=".3";
			document.getElementById("reputationContainer").style.opacity=".3";
			document.getElementById("profilepictureContainer").style.opacity=".3";
			document.getElementById("nameContainer").style.opacity=".3";
			document.getElementById("titleContainer").style.opacity=".3";
			document.getElementById("companyContainer").style.opacity=".3";
	}

	render(){

		return(

			<Container>

				<ImagePostContainer onMouseEnter={()=>this.handleMouseEnter()} onMouseOut={()=>this.handleMouseOut()}>
						<ImageContainer>
							<img src="" style={{position:"relative",width:"100%",height:"100%",backgroundColor:"blue",borderRadius:"5px"}} />
						</ImageContainer>

						<ExpandImagePostContainer id="expandImageContainer">

							<ExpandedDivProfileContainer>
							</ExpandedDivProfileContainer>

							<ImageDescription>
								This is a description about the image etc etc etc etc 
							</ImageDescription>

							<ExpandDescriptionContainer onClick={()=>this.handleImageDescription()}>Expand Description</ExpandDescriptionContainer>

						</ExpandImagePostContainer>

						<CommentContainer id="commentContainer">

							<CommentContainerProfilePicture></CommentContainerProfilePicture>

							<CommentSection onClick={()=>this.handleDisplayComments()}>Click here to comment...</CommentSection>

						</CommentContainer>

						<OptionsContainer id="optionsContainer"></OptionsContainer>

						<ReputationContainer id="reputationContainer">Beginner</ReputationContainer>

						<ProfilePictureContainer id="profilepictureContainer"></ProfilePictureContainer>

							<NameContainer id="nameContainer">Edward</NameContainer>
							<TitleContainer id="titleContainer">CEO</TitleContainer>
							<CompanyContainer id="companyContainer">Google</CompanyContainer>

				</ImagePostContainer>


				{this.displayImageDescription()}
				{this.displayComments()}

			</Container>
		)
	}
}

export default SmallImagePost;