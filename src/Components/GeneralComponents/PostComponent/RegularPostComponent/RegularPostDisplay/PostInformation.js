import React,{useState,Component} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";


const PostContentAndCommentsButtons=styled.div`
	position:relative;
	width:800px;
	overflow:hidden;

`;

const PostContent=styled.div`
	position:relative;
	width:90%;
	height:140px;
	overflow-y:auto;
	font-size:20px;
`;

const CommentsAndLikeButtonsContainer=styled.div`
	position:relative;
	background-color:#5298F8;
	left:30%;
	text-align:center;
	width:90px;
	padding:10px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;

const PeopleWhoLikedPostContainer=styled.div`
	position:relative;
	top:0%;
	height:60px;
	width:400px;
	display:flex;
	overflow:hidden;

`;

const SmallProfilePicture=styled.div`
	position:relative;
	background-color:black;
	width:50px;
	height:75%;
	border-radius:50%;
`;

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const PostInformation=(props)=>{
	console.log(props);
	const {post,isAudioPost,comments}=props.userData;
	const [commentsDisplayed,changeCommentsDisplayStatus]=useState(false);

	const displayComments=()=>{
		if(commentsDisplayed==false){
			props.displayComments();
			changeCommentsDisplayStatus(true);	
		}else{
			props.hideComments();
			changeCommentsDisplayStatus(false);
		}
		

	}
	return(
		<React.Fragment>
			<ul style={{padding:"0px",position:"absolute"}}>
				<li style={{marginTop:"-180px",listStyle:"none",maxHeight:"80%",marginBottom:"2%"}}>
					{isAudioPost==false?
						<PostContent id="postContent">
							{post}
						</PostContent>:
						<audio style={{width:"90%"}} controls>
							<source src={post} type="audio/ogg"/>
							<source src={post} type="audio/mpeg"/>
							Your browser does not support the audio element.
						</audio>
					}
				</li>

				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						{/*
							<li style={ButtonCSS}>
									Share
							</li>
						*/}

						<li onClick={()=>displayComments()} style={ButtonCSS}>
								{commentsDisplayed==false?<p>Comments</p>:<p>Hide Comments</p>}
						</li>

						<li style={{listStyle:"none",display:"inline-block",marginLeft:"2%"}}>
							<PeopleWhoLikedPostContainer>
								{comments.map(data=>
									<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
										<SmallProfilePicture>
											{data.profilePicture==null?
												<img src={NoProfilePicture} style={{width:"100%",height:"100%"}}/>:
												<img src={data.profilePicture} style={{width:"100%",height:"100%"}}/>
											}
										</SmallProfilePicture>
									</li>
								)}
								
							</PeopleWhoLikedPostContainer>
						</li>



					</ul>

				</li>
			</ul>
		</React.Fragment>

	)
}

export default PostInformation;