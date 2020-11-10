import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Container=styled.div`
	position:relative;
	background-color:white;
	width:90%;
	height:30%;
	marginRight:20%;
	border-radius:5px;

	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	padding:10px;
	overflow:hidden;

	@media screen and (max-width:1030px){
		width:200% !important;
		height:20%;
		#postOwnerInformation{
			display:none !important;
		}
		#commentLI{
			display:none !important;
		}
	}

	@media screen and (max-width:600px){
		width:150% !important;
		#postOwnerInformation{
			display:none !important;
		}
		#postLI{
			height:60% !important;
		}

		#commentLI{
			display:none !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	
    }

    @media screen  and (max-width:730px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	width:350% !important;
		height:60% !important;
    }
`;

const ProfilePicture=styled.div`
	position:relative;
	border-radius:50%;
	height:20%;
	width:60px;
	margin-top:2%;
	overflow:hidden;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
`;

const SmallProfileCommentPicture=styled.div`
	position:relative;
	width:40px;
	height:15%;
	background-color:red;
	border-radius:50%;
	margin-top:2%;
`;

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
			<ul>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li id="postOwnerInformation" style={{listStyle:"none",display:"inline-block",marginLeft:"25%",marginBottom:"2%"}}>
							<ProfilePicture>
								{profilePicture==null?
									 <img id="profilePicture" src={NoProfilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>:
									 <img id="profilePicture" src={profilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>
								}													    
							</ProfilePicture>
						</li>
						<li id="postLI" style={{listStyle:"none",display:"inline-block",height:"40%",overflowY:"auto",color:"#A4A4A4",marginBottom:"4%"}}>
							{post.isAudioPost==true?
								<audio key={uuidv4()} style={{width:"150px"}} controls>
											<source src={post.post} type="audio/ogg"/>
											<source src={post.post} type="audio/mpeg"/>
											Your browser does not support the audio element.
								</audio>:<React.Fragment>{post.post}</React.Fragment>
							}
						</li>
						<div id="commentLI">	
							{post.comments.regularComments.length==0?
								<React.Fragment>
									<p> No comments here :(<ExpandMoreIcon/> </p>
									<p style={CommentButtonCSS}> Create a comment </p>
								</React.Fragment>:
								<React.Fragment>
									<p> Show comments <ExpandMoreIcon/> </p>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											{post.comments.regularComments.map(data=>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
													<SmallProfileCommentPicture>
														<img id="profilePicture" src={NoProfilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>:
														<img id="profilePicture" src={data.profilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>
													</SmallProfileCommentPicture>
												</li>
												)}
											</ul>
										</li>
									</React.Fragment>
								}
						</div>
					</ul>
				</li>
			</ul>
		</Container>
	)
}

export default SmallRegularPosts;