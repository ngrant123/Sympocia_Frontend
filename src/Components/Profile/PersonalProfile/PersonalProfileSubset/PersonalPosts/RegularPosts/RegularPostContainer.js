import React,{Component} from "react";
import styled from "styled-components";
import {getRegularPostFromUser} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import NoPostsModal from "../NoPostsModal.js";
import {UserConsumer} from "../../../UserContext.js";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:50%;
	background-color:white;
`;

const RegularPostContainer=styled.div`
	background-color:white;
	width:102%;
	height:60%;
	border-radius:5px;
	box-shadow: 10px 10px 20px 	#dbdddf;
`;


const ProfilePicture=styled.div`
	position:relative;
	border-radius:50%;
	height:30%;
	width:30%
	background-color:red;
	margin-top:2%;
	overflow:hidden;
	border-radius:5px;
	margin-left:25%;
`;

const PostCommentsAndLikesButtons=styled.div`
	padding:5px;
	width:100%;
	border-color:#5298F8;
	border-style:solid;
	border-width:1px;
	color:#5298F8;
	background-color:white;
	border-radius:5px;
`;

const Post=styled.div`
	position:relative;
	width:450px;
	height:50%;
	overflow-y:scroll;
	font-size:15px;
`;

const CommentsProfile=styled.div`
	position:relative;
	width:450px;
	overflow-x:hidden;
	height:70%;

`;

const SmallProfileCommentPicture=styled.div`
	position:relative;
	width:55px;
	height:95%;
	background-color:red;
	border-radius:50%;
	margin-top:2%;
`;


class RegularPostsContainer extends Component{

	constructor(props){
		super(props);
		console.log("Regular  Post component");
		this.state={
			regularPosts:[{
				commenterImages:[{},{},{},{},{},{},{},{},{},{},{},{}]
			},
			{commenterImages:[{},{},{},{},{},{},{},{},{},{},{},{}]},
			{commenterImages:[{},{}]},
			{commenterImages:[{}]}],
			isLoading:true
		}
	}

	async componentDidMount(){
		const regularPosts=await getRegularPostFromUser(this.props.id);
		debugger;
		console.log(regularPosts);
		this.setState({
			regularPosts:regularPosts,
			isLoading:false
		})
	}

	render(){
		return(
			<UserConsumer>
				{personalInformation=>{
					return <Container>
							{this.state.isLoading==true?<p>We are currently getting posts</p>:
								<React.Fragment>
									{this.state.regularPosts.length==0?<NoPostsModal
																		postType={"post"}
																	/>:
												<ul style={{padding:"0px"}}>
													{this.state.regularPosts.map(data=>
														<li style={{listStyle:"none",marginBottom:"10%",marginRight:"2%"}}>
															<RegularPostContainer>
																<ul>
																	<li style={{listStyle:"none",width:"30%",display:"inline-block",marginTop:"0%"}}>
																		<ul style={{padding:"0px"}}>
																			<li style={{listStyle:"none",marginBottom:"2%"}}>
																				<ProfilePicture>
																					<img src={personalInformation.userProfile.profilePicture} width="100%" height="100%"/>
																				</ProfilePicture>
																			</li>
																			<li style={{listStyle:"none",marginBottom:"2%",marginLeft:"30%"}}>
																				<b> {personalInformation.userProfile.firstName}</b>

																			</li>
																			<li style={{textAlign:"center",listStyle:"none",padding:"5px",marginLeft:"12%",width:"60%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"white",backgroundColor:"#5298F8",borderRadius:"5px"}}>
																				{data.industriesUploaded[0].industry}
																			</li>
																			<li style={{listStyle:"none",marginBottom:"2%",marginTop:"5%"}}>
																				<ul style={{padding:"0px"}}>
																					<li style={{textAlign:"center",listStyle:"none",width:"30%",display:"inline-block",marginRight:"9%",marginLeft:"5%"}}>
																						<PostCommentsAndLikesButtons>
																							24 likes
																						</PostCommentsAndLikesButtons>

																					</li>

																					<li style={{textAlign:"center",listStyle:"none",width:"40%",display:"inline-block"}}>
																						<PostCommentsAndLikesButtons>
																							{data.comments.length} comments
																						</PostCommentsAndLikesButtons>

																					</li>
																				</ul>
																			</li>

																		</ul>
																	</li>

																	<li style={{listStyle:"none",display:"inline-block"}}>
																		<ul style={{padding:"0px"}}>
																			<li style={{listStyle:"none",marginTop:"5%"}}>
																				<Post>
																					{data.post}

																				</Post>
																			</li>
																			{data.comments.length>0?
																				<li style={{listStyle:"none",marginTop:"2%",height:"30%"}}>
																					<CommentsProfile>
																						{data.commenterImages.map(commentData=>
																							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																								<SmallProfileCommentPicture/>
																							</li>
																						)}
																					</CommentsProfile>
																				</li>:
																				<React.Fragment></React.Fragment>}
																			

																		</ul>
																	</li>
																</ul>
															</RegularPostContainer>
														</li>

													)}
												</ul>

										}
									</React.Fragment>
								}
							</Container>
				}}
			</UserConsumer>
		)
	}
}

export default RegularPostsContainer;