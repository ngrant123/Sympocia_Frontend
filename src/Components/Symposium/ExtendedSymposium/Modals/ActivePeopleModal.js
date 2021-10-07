import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";
import {
	BackgroundModalContainer
} from "../indexCSS.js";


const PeopleContainer =styled(Link)`
	position:relative;
	width:100px;
	background-color:white;
	border-radius:5px;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
	height:40%;
	cursor:pointer;
	margin-right:5%;
	margin-bottom:5%;
	display:flex;
	flex-direction:column;
	align-items:center;

	@media screen and (max-width:1370px){
		height:30%;
	}

	@media screen and (max-width:650px){
		height:40%;
		#profilePicture{
			width:50px !important;
			height:55px !important;
		}
	}

	@media screen and (min-width:400px) and (max-width:720px) and (min-height:1100px) and (max-height:1370px){
		height:20%;
		#profilePicture{
			width:60px !important;
			height:55px !important;
		}
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		height:75%;
		#profilePicture{
			width:50px !important;
			height:50px !important;
		}
	}
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
	height:"60px",
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

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const ActivePeopleModal=(props)=>{
	return(	
		<div style={{padding:"5px"}}>
			<p style={{fontSize:"18px"}}>
				<b>Active People</b>
			</p>
			<hr/>
			{props.peopleActive.length==0?
				<p>Unfortunately there are no people here at the moment. Why dont you follow the symposium instead? </p>:
				<ActivePeople>
					{props.peopleActive.map(data=>
						<PeopleContainer to={{pathname:`/profile/${data._id}`}}>
							<img id="profilePicture" src={data.profilePicture==null?
									NoProfilePicture:data.profilePicture}
							style={ProfilePictureCSS}/>
							<hr style={HorizontalLineCSS}/>
							<p style={{overflow:"hidden",color:"black"}}>
								<b>{data.firstName}</b>
							</p>
						</PeopleContainer>
					)}
				</ActivePeople>
			}
		</div>
	)
}



export default ActivePeopleModal;