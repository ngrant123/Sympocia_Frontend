import React,{Component} from "react";
import styled from "styled-components";
import Comment from "./Comment.js";


const CommentContainerDiv=styled.div`
	position:relative;
	width:50%;
`;

const CommentCreationContainer=styled.div`
	position:relative;
	width:250px;
	height:10%;
	background-color:white;
	border-radius:10px;
	border-style:solid;
	border-width:1px;
	border-color:#a2a2a2;
`;

const ExtendedTextArea=styled.div`
	position:relative;
	width:500px;
	height:40%;
	background-color:white;
	border-radius:10px;
	border-style:solid;
	border-width:1px;
	border-color:#a2a2a2;
	margin-bottom:10px;
`;

const ProfilePicture=styled.div`
	position:relative;
	width:35px;
	height:90%;
	background-color:red;
	border-radius:50%;

`;

const CommentTextArea=styled.textarea`
	resize:none;
	border-style:none;
	height:90%;
`;

class CommentsContainer extends Component{

/*

	Right now the program just initiliazes the current comment key then stores it in state
	Then after the displayResponses is true it checks if the key matches the this state key
	problem with this is that its continuously re rendering the prop (could be done in a better way)

*/

	constructor(props){

		super(props);
		this.state={
			comments:[
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					],
					key:1
			},
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					],
					key:2
			},
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					],
					key:3
			},
			{
				originalComment:"Testing out comment system",
				response:[],
					key:4
			}
			],
			displayResponses:false,
			keyToDisplayRespones:0,
			extendCreationAreaa:false
		}
	}
	componentDidMount(){


	}

	extendCommentCreation=(key)=>{
		console.log("Testing");

		if(this.state.extendCreationAreaa==false || key!=this.state.keyToDisplayRespones){
				return <CommentCreationContainer id={"commentCreationContainer"+key} onClick={()=>this.setState({extendCreationAreaa:true})}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
									<ProfilePicture>

									</ProfilePicture>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<CommentTextArea placeholder="Enter a comment">

									</CommentTextArea>

								</li>
							</ul>
						</CommentCreationContainer>
		}
		else{

			if(key==this.state.keyToDisplayRespones){

				return <ExtendedTextArea>

					   </ExtendedTextArea>;
			}
		}
	}

	ResponseCreationContainer=(key)=>{

		return (
			<React.Fragment>
				<ul style={{padding:"0px",marginLeft:"10%"}}>
					<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5px"}} onClick={()=>this.setState({displayResponses:true})}>

						<b>View 5 replies </b>
					</li>

					<li style={{listStyle:"none",display:"inline-block"}}>
						
						{this.extendCommentCreation(key)}
					</li>
				</ul>
			</React.Fragment>
		)
	}

	handleDisplayResponses=(responses,key)=>{
		console.log(this.state.keyToDisplayRespones); 
		if(key==this.state.keyToDisplayRespones){
			return <ul>
						{responses.map(data=>
							<li style={{listStyle:"none"}}>
								<Comment/>
							</li>
						)}
					</ul>
		}
		else{
			return <React.Fragment>
			</React.Fragment>
		}
	}


	render(){
		return(
			<React.Fragment>
				<ul style={{padding:"0px",backgroundColor:"white"}}>
					{this.state.comments.map(data=>
						<li style={{padding:"0px",listStyle:"none",marginBottom:"10px"}} key={data.key} onClick={()=>this.setState({keyToDisplayRespones:data.key})}>
							<Comment/>	
							{this.ResponseCreationContainer(data.key)}
							{this.handleDisplayResponses(data.response,data.key)}
						</li>
					)}
				</ul>
			</React.Fragment>

		)
	}
}

export default CommentsContainer;