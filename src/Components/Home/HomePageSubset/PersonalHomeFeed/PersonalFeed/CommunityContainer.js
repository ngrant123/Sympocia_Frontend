import React,{useState,useEffect} from "react";
import styled from "styled-components";

const Container=styled.div`
	position:absolute;
	width:90%;
	height:100%;
	left:15%;
	border-radius:5px;
	box-shadow: 10px 10px 10px 1px #d5d5d5;
`;

const ActivePeopleContainer=styled.div`
	width:40%;
	height:50%;
	border-radius:5px;
	background-color:white;
	overflow:auto;
	padding-top:10px;
`;


const PopularVideosContainer=styled.div`
	width:40%;
	height:25%;
	border-radius:5px;
	background-color:white;
	overflow:hidden;
	padding-top:5px;
`;


const ActivePeople=styled.div`
	position:"relative";
	width:45px;
	height:40%;
	background-color:white;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
`;

const PopularVideos=styled.div`
	position:"relative";
	width:60px;
	height:90%;
	background-color:red;
	border-radius:5px;
`;

const CommunityDetailsListCSS={
	listStyle:"none",
	marginBottom:"20px"
}

const ActivePeopleListCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"20px",
	marginBottom:"10px"
}

const PopularVideosListCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"20px",
	marginBottom:"10px"
}

const CommunityContainer=(props)=>{
	console.log(props);
	console.log(props.backgroundColor);

	//Dont need state
	const [popularVideos,changePopularVideos]=useState([{},{},{},{},{}]);
	const [activePeople,changeActivePeople]=useState([{},{},{},{},{},{},{},{},{},{}]);
	

	useEffect(()=>{
		/*
			changePopularVideos(props.data.popularVideos);
			changeActivePeople(props.data.activePeople);
		*/
	});

	return(

		<React.Fragment>
			<Container style={{background:props.data.backgroundColor}}>
				<p style={{position:"absolute",left:"-10%",top:"10%",fontSize:"90px",color:"#5298F8",fontFamily:"'Fredoka One', cursive"}}>{props.data.category}</p>

				<ul style={{position:"relative",left:"50%",top:"10%"}}>
					<li style={CommunityDetailsListCSS}>
						<ActivePeopleContainer>
							<ul>
								{activePeople.map(data=>
									<li style={ActivePeopleListCSS}>
										<ActivePeople>

										</ActivePeople>

									</li>
								)}

							</ul>

						</ActivePeopleContainer>
					</li>
					<li style={CommunityDetailsListCSS}>
						<PopularVideosContainer>
							<ul>

								{popularVideos.map(data=>
									<li style={PopularVideosListCSS}>
										<PopularVideos>

										</PopularVideos>

									</li>
								)}
							</ul>

						</PopularVideosContainer>
					</li>
				</ul>
			</Container>

		</React.Fragment>
	)
}

export default CommunityContainer;