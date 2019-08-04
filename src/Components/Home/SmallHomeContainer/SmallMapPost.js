import React, { Component } from "react";
import styled from "styled-components";
import {
  Map, 
  TileLayer, 
  Marker, 
  Popup
} from 'react-leaflet';


const Container = styled.div`
	
	position:relative;
	width:107%;
	height:300px;
	left:5%;
	display:flex;
	flex-direction: column;
	overflow:hidden;
	background-color:red;
	border-radius:5px;
	overflow:hidden;
	box-shadow:0px 0px 5px 1px;

`;

const MapDescriptionContainer = styled.div`

	position:absolute;
	z-index:2;
	width:100%;
	height:30%;
	bottom:0%;
	background-color:white;
	opacity:.3;
	transition:.8s;

`;

const MapPersonProfilePictureContainer = styled.div`

	position:absolute;
	width:10%;
	height:62%;
	background-color:black;
	left:5%;
	top:20%;
	border-radius:50%;

`;

const MapPersonProfilePicture = styled.div`

	position:absolute;
	width:80%;
	height:80%;
	background-color:red;
	left:10%;
	top:10%;
	border-radius:50%;

`;

const MapDescription = styled.div`
	
	position:absolute;
	left:20%;
	top:10%;
	height:70%;
	width:40%;
	overflow-y:scroll;
	padding:5px;

`;

const MapJoiningPeopleContainer = styled.div`

	position:absolute;
	left:65%;
	top:10%;
	height:40%;
	width:30%;
	background-color:black;	

`;

const MapExpandDescriptionContainer = styled.div`
	position:absolute;
	background-color:#5298F8;
	color:white;
	width:30%;
	top:65%;
	height:30%;
	left:65%;
	border-radius:5px;
	font-size:90%;
	text-align:center;

`;



class SmallMapPost extends Component{

	constructor(props){
		super(props);

		  this.state = {
		    lat: 51.505,
		    lng: -0.09,
		    zoom: 16,
		    showComments:false,
			showImageDescription:false
  		  }
	}

	handleMouseEnter(){
		document.getElementById("mapDescriptionContainer").style.opacity=1;
	}

	handleMouseOut(){

		document.getElementById("mapDescriptionContainer").style.opacity=.3;

	}

	render(){
		const position = [this.state.lat, this.state.lng]

		return(

			<Container onMouseEnter={()=>this.handleMouseEnter()} onMouseOut={()=>this.handleMouseOut()}>

				<Map center={position} zoom={this.state.zoom} style={{position:"relative",height:"300px",width:"107%",zIndex:"1"}}>
			        <TileLayer
			          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			        />
			        <Marker position={position}>
			          <Popup>
			            A pretty CSS3 popup. <br /> Easily customizable.
			          </Popup>
			        </Marker>
      			</Map>

      			<MapDescriptionContainer id="mapDescriptionContainer">

      				<MapPersonProfilePictureContainer>
      					<MapPersonProfilePicture>

      					</MapPersonProfilePicture>

      				</MapPersonProfilePictureContainer>

      				<MapDescription>Hello this is a picture description Hello this is a picture description Hello this is a picture description</MapDescription>
      				<MapJoiningPeopleContainer></MapJoiningPeopleContainer>
      				<MapExpandDescriptionContainer>Expand Description</MapExpandDescriptionContainer>


      			</MapDescriptionContainer>

			</Container>
		);
	}
}

export default SmallMapPost;