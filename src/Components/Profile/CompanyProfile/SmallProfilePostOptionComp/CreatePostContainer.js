import React,{Component} from "react";
import styled from "styled-components";
import camera from '../../../../designs/postimages/cameraactivated.png';
import pencil from '../../../../designs/postimages/pencilactivated.png';
import event from '../../../../designs/postimages/eventactivated.png';
import cameranotactivated from '../../../../designs/postimages/Notcameraactivated.png';
import pencilnotactivated from '../../../../designs/postimages/Notpencilactivated.png';
import eventnotactivated from '../../../../designs/postimages/Noteventactivated.png';





const WritingSymbol = styled.div`

	position:absolute;
	background-color:white;
	top:45%;
	width:5%;
	height:35%;
	left:27%;
	border-radius:50%;

`;

const Container = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	overflow:hidden;


`;



const CreateAPost = styled.div`
	position:absolute;
	width:20%;
	height:79%;
	top:20%;
	left:12%;
	font-size:70%;
	color:#565656;
	text-align:center;
	background-color:#f9f9f9;
	border-radius:5px 5px 0px 0px;
	font-family:'Roboto', sans-serif;
	font-size:50%;
	overflow:hidden;
	text-align:center;

`;

const Description = styled.div`
	position:absolute;
	height:80%;
	width:40%;
	left:45%;
	top:10%;
	font-family:'Roboto', sans-serif;
	font-size:130%;
	color:#565656;

`;

const AddPicture = styled.div`

	position:absolute;
	width:20%;
	height:79%;
	top:20%;
	left:35%;
	font-size:70%;
	color:#565656;
	text-align:center;
	background-color:#909090;
	border-radius:5px 5px 0px 0px;
	font-family:'Roboto', sans-serif;
	font-size:50%;
	overflow:hidden;


`;


const LocationEvent = styled.div`

	position:absolute;
	width:20%;
	height:79%;
	top:20%;
	left:58%;
	font-size:70%;
	color:#565656;
	text-align:center;
	background-color:#909090;
	border-radius:5px 5px 0px 0px;
	font-family:'Roboto', sans-serif;
	font-size:50%;
	overflow:hidden;


`;

class CreatePostContainer extends Component{

	constructor(props){
		super(props);

	}

	handleRegularPost(){	
			document.getElementById("AddPicture").style.backgroundColor="#909090";
			document.getElementById("CreatePost").style.backgroundColor="#f9f9f9";
			document.getElementById("LocationEvent").style.backgroundColor="#909090";
			this.props.handleRegularPost();

			document.getElementById("postimageid").src=pencil;
			document.getElementById("imageid").src=cameranotactivated;
			document.getElementById("eventimageid").src=eventnotactivated;
	}

	handleImagePost(){


			document.getElementById("AddPicture").style.backgroundColor="#f9f9f9";
			document.getElementById("CreatePost").style.backgroundColor="#909090";
			document.getElementById("LocationEvent").style.backgroundColor="#909090";
			this.props.hanleImagePost();

			document.getElementById("postimageid").src=pencilnotactivated;
			document.getElementById("imageid").src=camera;
			document.getElementById("eventimageid").src=eventnotactivated;

	}

	handleLocationPost(){

			document.getElementById("AddPicture").style.backgroundColor="#909090";
			document.getElementById("CreatePost").style.backgroundColor="#909090";
			document.getElementById("LocationEvent").style.backgroundColor="#f9f9f9";
			this.props.handleLocationPost(3);

			document.getElementById("postimageid").src=pencilnotactivated;
			document.getElementById("imageid").src=cameranotactivated;
			document.getElementById("eventimageid").src=event;

	}


	render(){

		return(

			<Container>

				<CreateAPost id="CreatePost" onClick={()=>this.handleRegularPost()}> 
					<img id="postimageid" src={pencil} style={{position:'absolute',backgroundColor:'red', width:'30%', height:'90%',left:'5%',transform: 'scale(1)'}}/>
					<Description>Post</Description>
				</CreateAPost>


				<AddPicture id="AddPicture" onClick= {()=>this.handleImagePost()}>
				<img id="imageid" src={cameranotactivated} style={{position:'absolute',backgroundColor:'red', width:'30%', height:'90%',left:'5%',transform: 'scale(1)'}}/> 
				<Description>Image</Description> 
				</AddPicture>

				<LocationEvent id="LocationEvent" onClick={()=>this.handleLocationPost()}>
				<img id="eventimageid" src={eventnotactivated} style={{position:'absolute',backgroundColor:'red', width:'20%', height:'80%',left:'5%',transform: 'scale(1)', top:'10%'}}/>  
				<Description>Event</Description> 
				</LocationEvent>

			</Container>

		)
	}

}


export default CreatePostContainer;