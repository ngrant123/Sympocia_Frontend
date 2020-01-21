import React,{useState,useEffect} from "react";
import styled from "styled-components";


const SearchContainer=styled.textarea`
	position:absolute;
	width:60%;
	height:10%;
	background-color:white;
	border-radius:5px;
	resize:none;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
	border:none;
	left:20%;
	top:5%;
	text-align:center;

`;

const ActivePeopleContainer=styled.div`
	position:relative;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:10%;
	width:80%;
	height:73%;
	padding:10px;
	overflow-y:scroll;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
`;

const ActivePeopleListCSS={

	display:"inline-block",
	listStyle:"none",
	marginRight:"30px",
	marginTop:"20px"
}

const PeopleContainer =styled.div`
	position:relative;
	width:100px;
	height:50%;
	background-color:white;
	border-radius:5px;
	box-shadow: 1px 5px 5px 1px #d5d5d5;

`;

const ProfilePicture=styled.div`
	position:relative;
	width:60px;
	height:40%;
	background-color:red;
	border-radius:50%;
	margin-bottom:10px;
	text-align:center;

`;

const MessageButton=styled.div`
	position:relative;
	width:60px;
	height:20%;
	border-radius:5px;
	background-color:#5298F8;
	font-size:10px;
	color:white;
	padding-top:7px;
	text-align:center;
	border-style:solid;
	border-width:1px;
	border-color:#0750b3;


`;


const ProfileContainerContentsCSS={
	listStyle:"none"
}



const ActivePeopleModal=(props)=>{

	const [friendsArray,changeFriends]=useState([]);
	console.log("Test");
	useEffect(()=>{

		changeFriends(props.peopleActive);
	})

	return(

		<React.Fragment>
			<SearchContainer placeholder="Search here nigga"> 
				</SearchContainer>

				<ActivePeopleContainer>

					<ul>
						{friendsArray.map(data=>
								<li style={ActivePeopleListCSS}>
									<PeopleContainer>
										<ul style={{position:"relative",left:"-20%",top:"5%"}}>

											<li style={ProfileContainerContentsCSS}>
												<ProfilePicture>

												</ProfilePicture>
											</li>
											<li style={ProfileContainerContentsCSS}>
												<p style={{overflowX:"scroll",color:"#a2a2a2"}}><b>Nathan</b></p>
											</li>
											<li style={ProfileContainerContentsCSS}>
												<MessageButton>
													Message
												</MessageButton>
											</li>
										</ul>
									</PeopleContainer>
								</li>
							)}
					</ul>

				</ActivePeopleContainer>


		</React.Fragment>

	)
}



export default ActivePeopleModal;