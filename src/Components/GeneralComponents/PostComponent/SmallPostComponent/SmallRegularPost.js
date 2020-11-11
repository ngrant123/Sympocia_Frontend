import React,{Component} from "react";
import styled from "styled-components";
import Comments from "./SmallPostCommentContainer.js";

const RegularPostContainer=styled.div`

	position:relative;
	background-color:white;
	width:107%;
	height:170px;
	left:5%;
	border-radius:1px;
	box-shadow:0px 0px 5px 1px;

	overflow-y:scroll;
`;


const PostContainer = styled.div`
	
	position:absolute;
	height:100%;
	width:100%;

`;


const RegularPostProfilePicture = styled.div`

	position:absolute;
	height:45%;
	width:15%;
	top:19%;
	left:3%;
	background-color:black;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#C8B0F4;

`;

const RegularPostReputationContainer = styled.div`
	
	position:absolute;
	left:3%;
	height:15%;
	width:15%;
	top:2%;
	background-color:#C8B0F4;
	border-radius:5px;
	text-align:center;
	color:white;
	font-size:110%;

`;

const RegularPostReputationTitle = styled.div`

	position:absolute;


`;

const RegularPostTitleContainer = styled.div`

	position:absolute;
	left:5%;
	height:15%;
	width:11%;
	top:63%;
	text-align:center;
	font-size:110%;
	color:#C8B0F4;

`;

const RegularPostCompanyContainer = styled.div`

	position:absolute;
	left:1%;
	height:13%;
	width:20%;
	top:73%;
	text-align:center;
	font-size:140%;
	color:#C8B0F4;

`;

const RegularPostIndustryContainer = styled.div`

	position:absolute;
	left:30%;
	height:20%;
	width:30%;
	background-color:#5298F8;
	top:2%;
	border-radius:5px;
	font-size:150%;
	border-style:solid;
	border-width:1px;
	border-color:#0649a4;
	color:white;
	text-align:center;

`;



const RegularPostContentContainer = styled.div`

	position:absolute;
	left:30%;
	height:50%;
	width:60%;
	font-size:120%;
	top:25%;
	overflow-y:scroll;
	color:#555555;

`;


const RegularPostCommentContainer = styled.div`

	position:absolute;
	left:30%;
	height:20%;
	width:40%;
	background-color:#c8ddf8;
	top:75%;
	border-radius:10px;

`;


const RegularPostCommentImageContainer = styled.div`
	
	position:absolute;
	height:80%;
	width:15%;
	top:15%;
	background-color:black;
	border-radius:50%;
	left:5%;


`;


const RegularPostLikesContainer = styled.div`

	position:absolute;
	left:72%;
	height:15%;
	width:11%;
	background-color:black;
	top:80%;

`;

const RegularPostCommentsNumberContainer = styled.div`

	position:absolute;
	left:85%;
	height:15%;
	width:11%;
	background-color:black;
	top:80%;


`;

const PostPrivacyContainer = styled.div`

	position:absolute;
	left:65%;
	height:10%;
	width:13%;
	background-color:black;
	top:2%;

`;

const OptionsContainer = styled.div`

	position:absolute;
	left:85%;
	height:10%;
	width:13%;
	background-color:black;
	top:2%;
	

`;

const CommentContainer = styled.div`

	position:absolute;
	top:38%;
	width:100%;
	height:50%;
	background-color:#ebf1f8;
	overflow-y:scroll;

`;


const PosterInfo = {

	postCompany:"Google",
	postReputation:"Beginner",
	postTitle:"CEO",
	postIndustry:"Engineering",

}


class SmallRegularPost extends Component{

	constructor(props){


		super(props);
		this.state={

			inductorCommentButton:"false"
		}
	}

	componetDidMount(){


	}

	 handleCommentSectionClick=()=>{

		//Think of a better way of implementing this 
			/*
				Takes old height and stores it and replaces it with the current one 
				after the div extension

			*/
		var regularPostContainerObject=this.returnDivContainerHeight("RegularPostContainer");
		var postCreationContainerObject=this.returnDivContainerHeight("PostContainer");


		
		if(regularPostContainerObject.divHeight==170){
			var newheight=regularPostContainerObject.divHeight+300;

			regularPostContainerObject.container.style.height=newheight+"px";
			postCreationContainerObject.container.style.height=postCreationContainerObject.divHeight+"px";

			this.setState({

				inductorCommentButton:"true"
			})

		}
	}

	displayCommentSection =()=>{

		return this.state.inductorCommentButton=="false" ? <p></p> :
			 <CommentContainer>
			 	<Comments/>

			</CommentContainer>;
	}


	 returnDivContainerHeight =(divId)=>{

		var divContainer=document.getElementById(divId);

		var divContainerObject={
			container:divContainer,
			divHeight:divContainer.offsetHeight
		}

		return divContainerObject;
	}     


	render(){
 
		return(
			<RegularPostContainer id="RegularPostContainer">
					<PostContainer id="PostContainer">
						<RegularPostProfilePicture id="PosterProfilePic"> 

						<img id="EmployeeImageContainer" src=""/>

					</RegularPostProfilePicture>

					<RegularPostReputationContainer id="EmployeeReputation">

						{PosterInfo.postReputation}

					</RegularPostReputationContainer>

					<RegularPostTitleContainer>
						<b>{PosterInfo.postTitle}</b>

					</RegularPostTitleContainer>

					<RegularPostCompanyContainer>

						<b>{PosterInfo.postCompany}</b>

					</RegularPostCompanyContainer>

					<RegularPostIndustryContainer id="CompanyIndustry">

						{PosterInfo.postIndustry}

					</RegularPostIndustryContainer>

					<RegularPostContentContainer id="regularPostTextArea"> 
						This is just a test post to see how stuff looks 
					</RegularPostContentContainer>

					<RegularPostCommentContainer onClick={this.handleCommentSectionClick}>

						<RegularPostCommentImageContainer>
						</RegularPostCommentImageContainer>

						<p style={{position:"absolute",left:"25%",top:"10%",color:"#1e6ecd"}}> Click here to comment... </p>

					</RegularPostCommentContainer>
					<RegularPostLikesContainer></RegularPostLikesContainer>
					<RegularPostCommentsNumberContainer></RegularPostCommentsNumberContainer>

					<PostPrivacyContainer id="PrivacyContainer"></PostPrivacyContainer>
					<OptionsContainer id="OptionsContainer"></OptionsContainer>

				</PostContainer>

				{this.displayCommentSection()}
			</RegularPostContainer>
		)
	}
}

export default SmallRegularPost;