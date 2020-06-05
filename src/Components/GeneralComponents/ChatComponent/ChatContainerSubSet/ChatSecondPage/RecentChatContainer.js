import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";

const Container=styled.div`
	position:relative;
	background-color:white;
	width:500px;
	height:10%;
	border-radius:5px;
	box-shadow: 1px 1px 30px #d5d5d5;
	overflow-x:auto;
	overflow-y:hidden;
	white-space: nowrap;
	margin-top:1%;
	margin-left:5%;
`;

const RecentsContainer=styled.div`
	position:relative;
	background-color:white;
	width:150px;
	height:60%;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#5298F8;
	padding:5px;
	overflow:hidden;
	transition:.8s;


	&:hover{
		background-color:#eef3f8;
	}
`;

const ProfilePicture=styled.div`
	position:relative;
	width:35px;
	height:100%;
	border-radius:50%;
	background-color:red;
`;

const RecentChatContainer=(props)=>{

	console.log(props);

	return(

		<Container>

			<ul style={{padding:"10px"}}>
				{props.friends.map(data=>

					<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
						<RecentsContainer>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
									<ProfilePicture>

									</ProfilePicture>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<p style={{position:"absolute",top:"20%",color:"#999999"}}>Tester</p>
								</li>
							</ul>
						</RecentsContainer>
					</li>
				)}
			</ul>
		</Container>
	)
}


export default RecentChatContainer;
