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
`;

class SmallMapPost extends Component{

	constructor(props){
		super(props);

		  this.state = {
		    lat: 51.505,
		    lng: -0.09,
		    zoom: 16,
  		  }
	}

	render(){
		const position = [this.state.lat, this.state.lng]

		return(

			<Container>

				<Map center={position} zoom={this.state.zoom} style={{position:"relative",height:"300px",width:"107%"}}>
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
			  
			</Container>


		);
	}
}

export default SmallMapPost;