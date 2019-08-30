import React,{Component} from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";

const Container = styled.div`

	position:relative;
	background-color:white;
	height:55px;
	width:85%;
	top:20px;
	border-radius:5px;
	box-shadow: 1px 1px 2px 2px #999a9b;

`;

const CompanyIconNotification = styled.div`

	position:absolute;
	width:20%;
	height:90%;
	left:5%;
	top:6%;
	border-radius:50%;
	background-color:blue;

`;


const NotificationContainer = styled.div`

	position:absolute;
	left:28%;
	width:65%;
	height:70%;
	top:10%;
	border-radius:5px;

`;

const NotificationPersonImage = styled.div`

	position:absolute;
	width:17%;
	height:68%;
	left:5%;
	top:6%;
	border-radius:50%;
	background-color:blue;
	border-style:solid;
	border-color:#C8B0F4;

`;

const NotificationText = styled.div`
	
	position:absolute;
	left:30%;
	height:55%;
	top:15%;
	width:65%;
	font-size:90%;
	overflow:scroll;


`;

const TimeNotificationActivated = styled.div`

	position:absolute;
	left:30%;
	height:40%;
	top:75%;
	width:65%;
	font-size:80%;
	overflow:scroll;
	color:#1e90ff;

`;

const CompanyName = styled.div`

	position:absolute;
	width:17%;
	height:23%;
	left:5%;
	top:75%;
	font-size:80%;
	text-align:center;

`;




class SmallHomeNotificationProfile extends Component{

	constructor(props){
		super(props);

		this.state ={

			companyicon:props.companyImage,
			profileimage:props.profileImage

		}; 
	}

	render(){

		return(

			<Container>

						<NotificationPersonImage>
							<img src={this.state.profileimage} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
						</NotificationPersonImage>
						<CompanyName>Razu</CompanyName>
						<NotificationText><span style={{color:"#20ff1e"}}> Harvey </span> commented on your story</NotificationText>
						<TimeNotificationActivated>Today at 12:30 pm</TimeNotificationActivated>

			</Container>


		)
	}
}

SmallHomeNotificationProfile.propTypes={

	companyicon:PropTypes.string,
	profileImage:PropTypes.string
}

export default SmallHomeNotificationProfile;