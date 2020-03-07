import React,{useState,Component} from "react";
import styled from "styled-components";


const PostContentAndCommentsButtons=styled.div`
	position:relative;
	height:80%;
	width:800;
	overflow:hidden;

`;

const PostContent=styled.div`
	position:relative;
	width:95%;
	max-height:250px;
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
	width:500px;
	display:flex;
	overflow-x:auto;

`;

const SmallProfilePicture=styled.div`
	position:relative;
	background-color:black;
	width:40px;
	height:80%;
	border-radius:50%;
`;

const PostInformation=(props)=>{

	const [pplWhoLiked,changePplWhoLiked]=useState([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);
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

		<PostContentAndCommentsButtons id="postContentContainer">
			<ul style={{padding:"0px",position:"absolute"}}>
		
				<li style={{listStyle:"none",maxHeight:"80%"}}>
					<PostContent id="postContent">
						Lorem ipsum dolor sit amet, enim aenean integer vitae,
						nibh eleifend voluptatem fringilla, amet fermentum platea,
						fusce at scelerisque. Pellentesque id velit tortor maecenas
						donec, viverra vulputate suspendisse vivamus vel. Commodo elit
						nunc. In massa vehicula amet eu aliquam, neque magna amet enim,
						massa dolor, mollis mauris neque, a amet ipsum lectus mus vestibulum.
					</PostContent>
				</li>

				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
				
						<li style={{listStyle:"none",display:"inline-block",marginRight:"1%",marginBottom:"2%"}}>
							<CommentsAndLikeButtonsContainer>
								Share
							</CommentsAndLikeButtonsContainer>	
						</li>

						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"2%"}}>
							<CommentsAndLikeButtonsContainer onClick={()=>displayComments()}>
								{commentsDisplayed==false?<p>Comments </p>:<p>Hide Comments</p>}
							</CommentsAndLikeButtonsContainer>	
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<PeopleWhoLikedPostContainer>

								{pplWhoLiked.map(data=>
									<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
										<SmallProfilePicture/>
									</li>

								)}
								
							</PeopleWhoLikedPostContainer>
						</li>



					</ul>

				</li>
			</ul>

		</PostContentAndCommentsButtons>
	)
}

export default PostInformation;