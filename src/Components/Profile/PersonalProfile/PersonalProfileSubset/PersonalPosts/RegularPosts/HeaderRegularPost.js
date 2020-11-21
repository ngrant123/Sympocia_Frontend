import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Container=styled.div`
	position:relative;
	width:80%;
	height:25%;
	padding:10px;
	border-radius:5px;

	@media screen and (max-width:1030px){
		width:200%;
		#postCommentsLI{
			display:none !important;
		}
		#profilePictureInformation{
			display:none !important;
		}
	}


	@media screen and (max-width:450px){
		width:40%;
		display:flex;
	}

	@media screen and (max-width:740px) and (max-height:420px){
	 	height:70% !important;
    }



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
	@media screen and (max-width:450px){
		width:80% !important;
		height:50% !important;
	}
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
	height:50%;
	width:90%;
	overflow-y:scroll;
	font-size:15px;
	padding-top:30px;

	@media screen and (max-width:450px){
		display:flex;
		height: 80% !important;
		width:130% !important;
	}
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
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	display:"inline-block"					
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

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
	

	return(
		<Container>
			<ul style={{padding:"0px"}}>
				<li id="profilePictureInformation" style={{listStyle:"none",width:"30%",display:"inline-block",marginTop:"0%"}}>
						<ul style={{padding:"0px"}}>
							{post.industriesUploaded[0]!=null?
								<li style={IndustryButtonCSS}>
										<p>{post.industriesUploaded[0].industry}</p>
								</li>:null
							}
						</ul>
					</li>

					<li id="postContainer" style={{listStyle:"none",display:"inline-block"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<Post>
									{post.isAudioPost==true?
										<audio key={uuidv4()} style={{width:"90%"}} controls>
											<source src={post.post} type="audio/ogg"/>
											<source src={post.post} type="audio/mpeg"/>
											Your browser does not support the audio element.
										</audio>:<React.Fragment>{post.post}</React.Fragment>
										
									}
								</Post>
							</li>
							<li id="postCommentsLI" style={{listStyle:"none"}}>
								<ul>
									{post.comments.regularComments.length==0?
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