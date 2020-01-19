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
	listStyle:"none"
}


const CommunityChoicesDiv=styled.div`
	position:relative;
	width:140px;
	height:20%;
	padding:10px;
	border-radius:5px;
	transition:.8s;

	border-style:solid;	
	border-width:4px;
	border-image-slice: 1;
	margin:10px;

	&:hover{
		box-shadow: 1px 5px 5px 1px #d5d5d5;
	}
`;




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
									<p> Tester </p>
								</li>
							)}
					</ul>

				</ActivePeopleContainer>


		</React.Fragment>

	)
}



export default ActivePeopleModal;