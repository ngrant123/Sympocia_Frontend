import React, { Component } from "react";
import styled from "styled-components";
import { credientialMapSearch } from "../../../Actions/Tasks/userTasks.js";
import {
		  Map, 
		  TileLayer, 
		  Marker, 
		  Popup

	} from 'react-leaflet';


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



class LargeMapContainer extends Component {

	constructor(props){

		super(props);

		  this.state = {
		    lat: 0,
		    lng:0,
		    testlat:0,
		    zoom: 16,
			showShadowBackground:false
  		  }

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

					let testlatitude = position.coords.latitude+1;


					this.setState({

						lat:latitude,
						lng:longitude,
						testlat:testlatitude,
						showShadowBackground:false

					});

			},function(e){

				console.log(e);

			},{
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
		let credientials = [];

		let industyValue=document.getElementById("IndustrySearchValue").value;
		let areaValue=document.getElementByIdl("AreaSearchValue").value;
		let nameValue=document.getElementById("NameSearchValue").value;


		if(industyValue!=null){
			credientials.push(industyValue);
		}
		else if(areaValue!=null){
			credientials.push(areaValue);
		}
		else{
			credientials.push(nameValue);
		}

		credientialMapSearch(credientials);
		
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

			         <Marker position={position2}>
			          <Popup>
			            A pretty CSS3 popup. <br /> Easily customizable.
			          </Popup>
			        </Marker>
      			</Map>

      			<SearchContainer>
      				<form style={{position:"absolute",top:"10%",left:"15%",width:"90%",height:"80%"}}>

      					<label style={{fontSize:"150%",marginRight:"10px",color:"#5298F8"}}> Enter the industry you want to search:  <span style={{fontSize:"60%"}}> ( Optional ) </span></label>
      					<input type="text" id="IndustrySearchValue" placeholder="Text1" style={{marginBottom:"10px",width:"70%",height:"12%"}} />

      					<br/>
      					<hr style={{position:"fixed",left:"0%",width:"40%"}}/>
      					<br/>
      					<label style={{fontSize:"150%",marginRight:"10px",color:"#5298F8"}}>Enter the area: <span style={{fontSize:"60%"}}> ( Optional ) </span></label>
      					<br/>
      					<input type="text" id="AreaSearchValue" placeholder="" style={{marginBottom:"10px",width:"70%",height:"12%"}}/>
      					<br/>
      					<hr style={{position:"fixed",left:"0%",width:"40%"}}/>
      					<br/>
      					<label style={{fontSize:"150%",marginRight:"10px",color:"#5298F8"}}> Search by Name: <span style={{fontSize:"60%"}}> ( Optional ) </span></label>
      					<br/>
      					<input type="text" id="NameSearchValue" placeholder="Text1" style={{marginBottom:"10px",width:"70%",height:"12%"}}/>
      					<br/>

      					<input type="submit" placeholder="Submit"
      						 style={{position:"absolute",left:"5%",width:"60%",height:"12%",borderRadius:"5px",
      								backgroundColor:"#5298F8",color:"white"}} 
      						onClick={()=>this.handleSumbit()}
      					/>
      				</form>

      			</SearchContainer>

			</Container>
		)
	}
}

export default LargeMapContainer;