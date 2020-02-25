import React,{Component} from "react";
import styled from "styled-components";

const ProfilePicture=styled.div`
	position:relative;
	width:53px;
	height:13%;
	border-radius:50%;
	background-color:blue;
`;

const CommentText=styled.div`
	position:relative;
	width:80%;
	margin-left:10px;
	margin-top:2%;


`;

const Comment=(userData)=>{

	return(
		<React.Fragment>
			<ul style={{marginBottom:"20px"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"180px"}}>
							<ProfilePicture>

							</ProfilePicture>
						</li>
						<li style={{listStyle:"none",display:"inline-block"}}>
							<ul>
								<li style={{listStyle:"none"}}>
									Like option

								</li>

								<li style={{listStyle:"none"}}>
									Number of likes

								</li>
							</ul>
						</li>

					</ul>
				</li>

					<CommentText>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
						sed do eiusmod tempor incididunt ut labore et dolore magna
						 aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
						 ullamco laboris nisi ut aliquip ex ea commodo consequat. 
						 Duis aute irure dolor in reprehenderit in voluptate velit
						  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
						   occaecat cupidatat non proident, sunt in culpa qui officia
						    deserunt mollit anim id est laborum.
					</CommentText>

			</ul>
		</React.Fragment>
	)
}

export default Comment;