import React,{ Component } from "react";
import styled from "styled-components";

 const TesterContainer = styled.div`

	position:relative;
	width:90%;
	height:70px;
	border-radius:5px;
	overflow:scroll;

 `;

const Container = styled.div`
	
	position:relative;
	width:100%;
	height:100%						

`;

const CommentContainer = styled.div`

	position:absolute;
	top:0%;
	width:100%;
	height:70px;
	background-color:white;
	border-radius:5px;

`;

const ProfilePictureCommentContainer = styled.div`

	position:absolute;
	width:15%;
	height:90%;
	left:5%;
	background-color:red;
	top:5%;
	border-radius:50%;
	border-style:solid;
	border-width:3px;
	border-color:#5298F8;

`;

const NameCommentContainer = styled.div`

	position:absolute;
	left:23%;
	height:30%;
	width:15%;
	top:10%;
	color:	#a47cec;
	border-style:solid;
	border-width: 0px 3px 0px 0px;
	border-color:#5c5c5c;

`;

const CompanyNameCommentContainer = styled.div`

	position:absolute;
	left:23%;
	height:30%;
	width:15%;
	top:40%;
	color:#C8B0F4;
	border-style:solid;
	border-width: 0px 3px 0px 0px;
	border-color:#5c5c5c;


`;


const ReputationCommentContainer = styled.div`

	position:absolute;
	left:23%;
	height:25%;
	width:15%;
	top:70%;
	color:#C8B0F4;
	border-style:solid;
	border-width: 0px 3px 0px 0px;
	border-color:#5c5c5c;


`;

const Comment = styled.div`

	position:absolute;
	left:40%;
	height:52%;
	width:50%;
	top:5%;
	transition:.8s;
	overflow-y:scroll;
	border-radius:5px;

	&:hover{
		background-color:#c8ddf8;
	}

`;

const CommentRepliesContainer = styled.div`

	position:absolute;
	left:40%;
	height:40%;
	width:40%;
	top:60%;
	color:#5298f8;
	border-radius:5px;

`;


const SubCommentsContainer = styled.div`

	position:relative;
	background-color:white;
	width:80%;
	height:70px;
	top:70px;
	border-radius:5px;
`;



const ResponseProfilePicture = styled.div`

	position:absolute;
	width:12%;
	height:60%;
	left:5%;
	background-color:red;
	top:5%;
	border-radius:50%;
	border-style:solid;
	border-width:3px;
	border-color:#5298F8;

`;

const ResponseComment = styled.div`

	position:absolute;
	left:25%;
	height:70%;
	width:70%;
	top:5%;
	transition:.8s;
	overflow-y:scroll;
	border-radius:5px;
	background-color:white;
	padding: 5px;

`;

const ResponseNameContainer = styled.div`

	position:absolute;
	left:7%;
	height:30%;
	width:15%;
	top:70%;
	color:	#a47cec;

`;


const testerData= [

	{
		personTitle:"CEO",
		personName:"Jenniffer",
		personComment:"That shit funny as fuck",
		persondata:"Today",
		persondataLikes:"3",
		personIcon:"",
		personReputationIcon:"",
		key:1,



		replies:[
			{
				personTitle:"CEO",
				personName:"Jenniffer",
				personComment:"That shit funny as fuck",
				persondata:"Today",
				persondataLikes:"3",
				personIcon:"",
				personReputationIcon:""


			},
			{

				personTitle:"CTO",
				personName:"Jenniffer",
				personComment:"That shit funny as fuck",
				persondata:"Today",
				persondataLikes:"3",
				personIcon:"",
				personReputationIcon:""



			},
			{

				personTitle:"CFO",
				personName:"Jenniffer",
				personComment:"That shit funny as fuck",
				persondata:"Today",
				persondataLikes:"3",
				personIcon:"",
				personReputationIcon:""	


			}


		]



	},
	{
		personTitle:"CTO",
		personName:"Nathan",
		personComment:"That shit funny as fuck",
		persondata:"Today",
		persondataLikes:"3",
		personIcon:"",
		personReputationIcon:"",
		key:2,



		replies:[]


	},
	{
		personTitle:"CFO",
		personName:"Sandra",
		personComment:"That shit funny as fuck",
		persondata:"Today",
		persondataLikes:"3",
		personIcon:"",
		personReputationIcon:"",
		key:3,



		replies:[
			{
				personTitle:"CEO",
				personName:"Jenniffer",
				personComment:"That shit funny as fuck",
				persondata:"Today",
				persondataLikes:"3",
				personIcon:"",
				personReputationIcon:""


			},
			{

				personTitle:"CTO",
				personName:"Jenniffer",
				personComment:"That shit funny as fuck",
				persondata:"Today",
				persondataLikes:"3",
				personIcon:"",
				personReputationIcon:""



			},
			{

				personTitle:"CFO",
				personName:"Jenniffer",
				personComment:"That shit funny as fuck",
				persondata:"Today",
				persondataLikes:"3",
				personIcon:"",
				personReputationIcon:""	


			}
		]
	}
]


class SmallPostCommentContainer extends Component{

	constructor(props){

		super(props);

		this.state={
			showReplies:"false",
			commentDivClicked:[]


		}
	}

	componentDidMount(){


		let numberOfComments=0;

		while(numberOfComments<testerData.length){

		//	let testerData[numberOfComments].comments.length;
			numberOfComments++;

		}

		let newCommentContainerHeight=numberOfComments*10;
		let commentsContainer=document.getElementById("testcontainer");
		//let newtest=commentsContainer.offsetHeight+30;
		//commentsContainer.style.height=newtest+"px";

		//console.log(commentsContainer.offsetHeight);
		console.log(document.getElementById("commentDiv2"));
		console.log(numberOfComments);
	
	}

	assignCommentsDivId=(key)=>{

		let commentsDivIdentifier="commentDiv"+key;
		return commentsDivIdentifier;
	}

	assignRepliesDivId=(key)=>{

		let commentsDivIdentifier="replyDiv"+key;
		return commentsDivIdentifier;
	}


	handleDisplayReplies = (key,replies)=>{

		let divCommentKeyContainer=this.state.commentDivClicked;
		console.log(divCommentKeyContainer.length);

		let tester=divCommentKeyContainer.push(key);
		console.log(divCommentKeyContainer.length);

		this.setState({

			commentDivClicked:divCommentKeyContainer
		},function(){

			console.log(this.state.commentDivClicked);
		});


		let commentsDivIdentifier="commentDiv"+key;
		let commentDiv=document.getElementById(commentsDivIdentifier);
		let sizeOfCommentsArr=replies.length;
		let numToExpandDivHeight=sizeOfCommentsArr*50;

		let currentCommentDivHeight=commentDiv.offsetHeight;
		let newHeight=currentCommentDivHeight+(numToExpandDivHeight);
		commentDiv.style.height=newHeight+"px";

	}

	displayReplies=(commentsdata)=>{

		return this.containsCommentKey(commentsdata.key) ?
		<ul>
					{commentsdata.replies.map(replies =>
						<li style={{listStyle:"none",marginBottom:"20px",marginTop:"10px"}}>
							<SubCommentsContainer id={this.assignRepliesDivId(commentsdata.key)}>

								
											<ResponseProfilePicture></ResponseProfilePicture>
											<ResponseNameContainer>Bob</ResponseNameContainer>

											<ResponseComment>

												This is just some testing values for the comment post

											</ResponseComment>
										

							</SubCommentsContainer>
						</li>
					)}
				</ul> :	

				<p></p>;
	}
	
	containsCommentKey=(key)=>{

		let commentsKeyContainer=this.state.commentDivClicked;
		console.log(commentsKeyContainer.length);
		for(let i=0;i<commentsKeyContainer.length;i++){

			let keyvalue=commentsKeyContainer[i];
			if(keyvalue==key){
				return true;
			}
		}
		return false;

	}


	displayComments=()=>{

		return      <ul>
						{testerData.map(commentsdata=>
							<li style={{listStyle:"none",marginBottom:"30px",marginTop:"10px"}}>
								<TesterContainer id={this.assignCommentsDivId(commentsdata.key)}>
									<CommentContainer onClick={()=>this.handleDisplayReplies(commentsdata.key,commentsdata.replies)}>

											<ProfilePictureCommentContainer></ProfilePictureCommentContainer>

											<NameCommentContainer><b>Nathan</b></NameCommentContainer>

											<CompanyNameCommentContainer>CEO</CompanyNameCommentContainer>

											<ReputationCommentContainer>Beginner</ReputationCommentContainer>
											<CommentRepliesContainer>Click here to comment...</CommentRepliesContainer>

											<Comment>
												This is just some testing values for the comment post
											</Comment>
										
										{this.displayReplies(commentsdata)}

									</CommentContainer>
								</TesterContainer>
							</li>
						)}

					</ul>;
	}


	render(){

		return(

			<Container>

				{this.displayComments()}

			</Container>

		)
	}
}

export default SmallPostCommentContainer;