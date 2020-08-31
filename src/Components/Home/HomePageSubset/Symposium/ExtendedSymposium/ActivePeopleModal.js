import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";

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
	padding:15px;
	overflow-y:scroll;
	z-index:17;
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
	textAlign:"center",

}


const ActivePeopleModal=(props)=>{
	return(
			<ActivePeopleContainer>
					{props.peopleActive.length==0?
						<p>Unfortunately there are no people here at the moment. Why dont you follow the symposium instead? </p>:
						<ul>
							{props.peopleActive.map(data=>
									<li style={ActivePeopleListCSS}>
										<PeopleContainer>
											<ul style={{position:"relative",left:"-20%",top:"5%"}}>

												<li style={ProfileContainerContentsCSS}>
													{data.ProfilePicture==null?
														<img src={NoProfilePicture} style={ProfilePictureCSS}/>:
														<img src={data.ProfilePicture} style={ProfilePictureCSS}/>
													}
												</li>
												<li style={ProfileContainerContentsCSS}>
													<p style={{overflowX:"scroll",color:"#a2a2a2"}}><b>{data.firstName}</b></p>
												</li>
												<li style={ProfileContainerContentsCSS}>
													<ViewProfileButton to={{pathname:`/profile/${data._id}`}}>
														View Profile
													</ViewProfileButton>
												</li>
											</ul>
										</PeopleContainer>
									</li>
								)}
						</ul>
					}
			</ActivePeopleContainer>

	)
}



export default ActivePeopleModal;