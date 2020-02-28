import React, { Component } from "react";
import styled from "styled-components";
import { GeneralNavBar } from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";

import { 
		credientialMapSearch,
		UserLocation

		} from "../../../Actions/Tasks/userTasks.js";
import {
		  Map, 
		  TileLayer, 
		  Marker, 
		  Popup

	} from 'react-leaflet';

	import ReactMapGL from 'react-map-gl';


const Container = styled.div`

	position:absolute;
	width:100%;
	height:100%;

`;

const ShadowBackground = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	z-index:2;

`;

const SearchContainer = styled.div`

	position:absolute;
	width:30%;
	height:55%;
	top:15%;
	left:3%;
	background-color:white;
	z-index:5;
	border-radius:5px;
	overflow:hidden;


`;

const NavBar = styled.div`
	position:absolute;
	left:10%;
	height:7%;
	background-color:white;
	width:85%;
	z-index:5;
	border-radius:5px;



`;

const testerdata= [
	[
		72,
		-44

	],
	[
		72,
		-43
	]

]

const testtest= {

	tester:{
		test:"test",
		data:2
	},
	tester:{
		test:"test",
		data:3
	}
}

const MAPBOX_TOKEN ="pk.eyJ1IjoibmdyYW50MTIzIiwiYSI6ImNrNzZzcjV3NTAwaGYza3BqbHZjNXJhZDkifQ.DsFpgYjX7ZUtOe7cFmylhQ"


class LargeMapContainer extends Component {

	constructor(props){

		super(props);

		/*
		  this.state = {
		    lat: -73.97732549999999,
		    lng:40.7527743,
		    testlat:0,
		    zoom: 16,
			showShadowBackground:false,
			companiesLocation:[]
  		  }
  		  */
  		  this.state = {
		    viewport: {
		      width: 400,
		      height: 400,
		      latitude: 37.7577,
		      longitude: -122.4376,
		      zoom: 8
		    }
		  };

	}

	componentDidMount(){	

		if(this.state.lat==0 && this.state.lng==0){

			this.setState({

				showShadowBackground:true
			})
		}


		if(navigator.geolocation){

			navigator.geolocation.getCurrentPosition((position)=> {
					let longitude = position.coords.longitude;
					let latitude = position.coords.latitude;
					console.log(longitude);
					console.log(latitude);

					let testlatitude = position.coords.latitude+1;


					this.setState({

						lat:latitude,
						lng:longitude,
						testlat:testlatitude,
						showShadowBackground:false

					});

			},function(e){

				console.log(e);
				UserLocation();

			},{
				//timeout:10000,
				 enableHighAccuracy: true
			});
	
		} 
		else{
			console.log("Not supported");
			this.getLocationManually();
		}
	}


	getLocationManually = () =>{


	}


	handleSumbit =() => {

		let industyValue=document.getElementById("IndustrySearchValue").value;
		let areaValue=document.getElementByIdl("AreaSearchValue").value;
		let nameValue=document.getElementById("NameSearchValue").value;

		credientialMapSearch(industyValue,areaValue,nameValue);
		
	}

	displayShadowBackground =()=>{

		return this.state.showShadowBackground ? <ShadowBackground /> : <p style={{display:"none"}}></p> ;
	}

	render(){

		const position=[this.state.lat,this.state.lng];
		const position2=[this.state.testlat,this.state.lng];

		return(

			<Container>
				{this.displayShadowBackground()}

				<NavBar>
					<GeneralNavBar
						pageType={"Map"}
					/>

				</NavBar>
				 <ReactMapGL
					        {...this.state.viewport}
					        onViewportChange={(viewport) => this.setState({viewport})}
					        mapboxApiAccessToken={MAPBOX_TOKEN}
					      />
					

			{/*

				<Map center={position} zoom={this.state.zoom} style={{position:"absolute",height:"900px",width:"107%",zIndex:"1"}}>
			        <TileLayer
			          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			        />
			        <Marker position={position} id="userMarker">
			          <Popup>
			            A pretty CSS3 popup. <br /> Easily customizable.
			          </Popup>
			        </Marker>

			        <ul>
			        	{testerdata.map(data=>
			        		<li>
						         <Marker position={data}>
						          <Popup>
						            A pretty CSS3 popup. <br /> Easily customizable.
						          </Popup>
						        </Marker>
				       		</li>

			        	)}

			        </ul>
      			</Map>



			*/}
			</Container>
		)
	}
}

export default LargeMapContainer;