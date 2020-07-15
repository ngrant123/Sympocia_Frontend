import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Container=styled.div`
	position:relative;
	width:80%;
	height:25%;
	background-color:white;
	padding:10px;
	border-radius:5px;
`;

const ProfilePicture=styled.div`
	position:relative;
	border-radius:50%;
	height:40%;
	width:45%;
	background-color:red;
	margin-top:2%;
	overflow:hidden;
	border-radius:50%;
	margin-left:20%;

	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
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
	padding-top:30px;
`;

const CommentsProfile=styled.div`
	position:relative;
	width:120%;
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

/*
				comments: [],
				datePosted: 1594504222028,
				industriesUploaded: [],
				isAudioPost: true,
				owner: "5f07eabdda8abe1fb10375e5",
				post: "",
				regularPostScore: 0,
				stampCount: 0,
				subCommunity: "",
				__v: 0,
				_id: "5f0a3422ae15f53311588fdc"

*/

const IndustryButtonCSS={
	textAlign:"center",
	listStyle:"none",
	padding:"5px",
	marginLeft:"12%",
	width:"60%",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px"					
}

const CommentButtonCSS={
	textAlign:"center",
	listStyle:"none",
	padding:"5px",
	width:"60%",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px"	
}

const SmallRegularPosts=(props)=>{

	const {post,profilePicture}=props;
	console.log(post);
	return(
		<Container>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",width:"30%",display:"inline-block",marginTop:"0%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<ProfilePicture>
									{profilePicture==null?
									 	<img id="profilePicture" src={NoProfilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>:
									 	<img id="profilePicture" src={profilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>
									}													    
								</ProfilePicture>
							</li>
							{post.industriesUploaded[0]!=null?
								<li style={IndustryButtonCSS}>
										<p>{post.industriesUploaded[0].industry}</p>
								</li>:null
							}
						</ul>
					</li>

					<li style={{listStyle:"none",display:"inline-block"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<Post>
									{post.isAudioPost==true?
										<audio style={{width:"90%"}} controls>
											<source src={post.post} type="audio/ogg"/>
											<source src={post.post} type="audio/mpeg"/>
											Your browser does not support the audio element.
										</audio>:<React.Fragment>{post.post}</React.Fragment>
									}
								</Post>
							</li>
							<li style={{listStyle:"none"}}>
								<ul>
									{post.comments.length==0?
										<li style={{listStyle:"none"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
													No comments here unfortunately
												</li>

												<li style={CommentButtonCSS}>
													Leave a comment
												</li>
											</ul>
										</li>:
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												<ul style={{padding:"0px"}}>	
													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
														Show comments <ExpandMoreIcon/>
													</li>
													<li style={{listStyle:"none",display:"inline-block",marginTop:"2%",height:"30%"}}>
														<CommentsProfile>
															{post.comments.map(commentData=>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																	<SmallProfileCommentPicture>
																		<img id="profilePicture" src={NoProfilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>:
																		<img id="profilePicture" src={commentData.profilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>
																	</SmallProfileCommentPicture>
																</li>
															)}
														</CommentsProfile>
													</li>
												</ul>
											</li>
										</a>
									}
								</ul>
							</li>
						</ul>
					</li>
			</ul>
		</Container>
	)
}

export default SmallRegularPosts;