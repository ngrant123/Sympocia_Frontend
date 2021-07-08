import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Container=styled.div`
	position:relative;
	width:80%;
	height:100%;
	padding:10px;
	border-radius:5px;
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		width:100%;
		#profilePicture{
			height:65px !important;
			width:80px !important;
		}
		#postCommentsLI{
			display:none !important;
		}
		#profilePictureInformation{
			display:none !important;
		}
	}

	@media screen and (max-width:650px){
		width:100%;
		flex-direction:column;
	}


    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	#profilePicture{
			height:50px !important;
			width:60px !important;
		}
		width:200%;
    }
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	 	height:70% !important;
	 	width:200% !important;
	 	#profilePicture{
			height:65px !important;
			width:80px !important;
		}
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
	overflow:hidden;
	font-size:15px;
	heigth:20%;
	padding-top:30px;
	background-color:white;

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		heigth:70% !important;
		#headerPostTest{
			max-height:90% !important;
			width:100% !important;
		}
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

const PostFirstSection=styled.div`
	display:flex;
	flex-direction:column;
	width:30%;
	margin-right:5%;
	@media screen and (max-width:1370px){
		width:60% !important;
	}
	@media screen and (max-width:700px){
		display:none !important;
	}
	 @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	width:40% !important;
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:55% !important;
		width:100% !important;
    }
`;

const PostSecondSection=styled.div`
	display:flex;
	flex-direction:column;	
	width:100%;
	@media screen and (max-width:650px){
		width:100% !important;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:50% !important;
    }

`;

const ColorPatchContainer=styled.div`
	width:30px;
	height:25px;
	border-radius:50%;
	z-index:8;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
    }
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

const HeaderRegularPost=({post,profilePicture,displayPostModal,friendsColorNodesMap})=>{
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const regularPost=()=>{
		const colorCode=friendsColorNodesMap.get(post.levelNode);
		return(
			<React.Fragment>
				<ColorPatchContainer colorCode={colorCode}/>
				<PostFirstSection>
					<img id="profilePicture" src={profilePicture==null?NoProfilePicture:profilePicture} 
						style={{width:"100%",height:"60%",borderRadius:"50%",marginBottom:"4%"}}
					/>
					{post.industriesUploaded[0]!=null?
						<li style={IndustryButtonCSS}>
								<p>{post.industriesUploaded[0].industry}</p>
						</li>:null
					}
				</PostFirstSection>

				<PostSecondSection>
					<li style={{listStyle:"none",marginBottom:"2%",height:"60%"}}>
						<Post>
							{post.isAudioPost==true?
								<audio key={uuidv4()} style={{width:"90%"}} controls>
									<source src={post.post} type="audio/ogg"/>
									<source src={post.post} type="audio/mp4"/>
									Your browser does not support the audio element.
								</audio>:
								<React.Fragment>
									<p id="headerPostTest" style={{maxHeight:"60%",overflow:"hidden"}}>
										{post.post}
									</p>
								</React.Fragment>
							}
						</Post>
					</li>
				</PostSecondSection>
			</React.Fragment>
		)
	}
	

	return(
		<Container id="headerContainerLI" onClick={()=>displayPostModal(post)} 
			style={{cursor:"pointer",listStyle:"none",marginBottom:"2%",marginBottom:"2%",height:"25%"}}>
			{regularPost()}
		</Container>
	)
}

export default HeaderRegularPost;