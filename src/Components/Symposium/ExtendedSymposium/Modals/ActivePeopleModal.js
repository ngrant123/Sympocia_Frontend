import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";

import {
	ActivePeopleContainer,
	BackgroundModalContainer
} from "../indexCSS.js";


const PeopleContainer =styled(Link)`
	position:relative;
	width:100px;
	height:50%;
	background-color:white;
	border-radius:5px;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
	cursor:pointer;
	overflow:hidden;
	margin-right:5%;
	margin-bottom:5%;
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

const ViewProfileButton=styled(Link)`
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

const ActivePeople=styled.div`
	display:flex;
	flex-direction:row;
	height:100%;
	flex-wrap:wrap;

`;


const ProfileContainerContentsCSS={
	listStyle:"none"
}

const ProfilePictureCSS={
	position:"relative",
	width:"60px",
	height:"40%",
	backgroundColor:"red",
	borderRadius:"50%",
	marginBottom:"10px",
	textAlign:"center"
}

const ActivePeopleListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"30px",
	marginTop:"20px"
}

const ActivePeopleModal=(props)=>{
	const {
			changeState,
			displayModalPeopleActive
		}=props;
	return(
		<>
			{displayModalPeopleActive==true &&(
				<React.Fragment>	
					<ActivePeopleContainer>
							{props.peopleActive.length==0?
								<p>Unfortunately there are no people here at the moment. Why dont you follow the symposium instead? </p>:
								<ActivePeople>
									{props.peopleActive.map(data=>
										<PeopleContainer to={{pathname:`/profile/${data._id}`}}>
											<ul style={{position:"relative",left:"-20%",top:"5%"}}>

												<li style={ProfileContainerContentsCSS}>
													<img src={data.profilePicture==null?
															NoProfilePicture:data.profilePicture}
													style={ProfilePictureCSS}/>
												</li>
												<li style={ProfileContainerContentsCSS}>
													<p style={{overflow:"hidden",color:"#a2a2a2"}}>
														<b>{data.firstName}</b>
													</p>
												</li>
											</ul>
										</PeopleContainer>
									)}
								</ActivePeople>
							}
					</ActivePeopleContainer>
					<BackgroundModalContainer onClick={()=>changeState.setState({displayModalPeopleActive:false})}/>
				</React.Fragment>
			)}
		</>
	)
}



export default ActivePeopleModal;