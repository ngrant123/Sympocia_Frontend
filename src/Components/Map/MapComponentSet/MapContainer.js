import React, { Component } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { GeneralNavBar } from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import SearchComponent from "../MapComponentSubSet/SearchComponent.js";
import { 
		credientialMapSearch,
		UserLocation
		} from "../../../Actions/Tasks/userTasks.js";
import ReactMapGL ,{Marker,Popup } from 'react-map-gl';
import {MapProvider} from "../MapContext.js";


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


const MarkerContainer=styled.div`

	position:relative;
	background-color:white;
	width:70px;
	height:65px;
	border-radius:5px;
	padding:2px;
	overflow:hidden;
	box-shadow:2px 2px 5px #707070;

`;

const CompanyLogo=styled.div`
	position:relative;
	background-color:red;
	border-radius:50%;
	width:70%;
	height:65%;
`;

const ViewCompanyButton=styled(Link)`
	position:relative;
	text-align:center;
	background-color:#5298F8;
	width:40px;
	height:10%;
	border-radius:5px;
	padding:5px;
	color:white;
	margin-top:20%;

`;

const EmployeePicture=styled.div`
	position:relative;
	background-color:red;
	border-radius:50%;
	width:50px;
	height:40px;

`;
const EmployeesContainer=styled.div`
	position:relative;
	width:90%;
	height:50px;
	overflow:hidden;
	margin-bottom:10px;
	box-shadow:2px 2px 2px #707070;
	border-radius:5px;
`;

const InformationalModal=styled.div`
	position:absolute;
	top:15%;
	left:40%;
	height:20%;
	width:25%;
	background-color:white;
	border-radius:5px;
	padding:5px;


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


class MapContainer extends Component {
	constructor(props){

		super(props);
		console.log("testing");

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
		      width: "100%",
		      height:"100%",
		      latitude:40.730610,
		      longitude:-73.935242,
		      zoom: 8
		    },
		    lat: -73.97732549999999,
		    lng:40.7527743,
		    testlat:0,
		    zoom: 16,
			showShadowBackground:false,
			companiesLocation:[],
			displayPopup:false,
			popupLat:0,
			popupLong:0,
			displayInformationalModal:true,
			selectedCompany:{}
		  };

	}

	componentDidMount(){	
		console.log("testing");
		/*
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
		*/
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

	dispayPopupModal=(props)=>{
		this.setState({
			displayPopup:true,
			popupLat:props.latitude,
			popupLong:props.longitude,
			selectedCompany:{
				name:props.name,
				id:props._id,
				activeTime:props.activeTime,
				employees:props.employees
			}
		})
	}
	closePopModal=()=>{
		this.setState({
			displayPopup:false
		})
	}

	popup=()=>{

		if(this.state.displayPopup==true){
			return <Popup 
						latitude={this.state.popupLat} longitude={this.state.popupLong}
						style={{boxShadow:"2px 2px 5px #707070"}}
						onClose={()=>this.closePopModal()}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<h1>{this.state.selectedCompany.name}</h1>
							</li>
							<li style={{listStyle:"none",marginBottom:"2%"}}>
								Active:{this.state.selectedCompany.activeTime} days ago	
							</li>
							<li style={{listStyle:"none",marginBottom:"2%"}}>
									Employees:
							</li>
						</ul>

						<EmployeesContainer>
							{this.state.selectedCompany.employees.map(data=>
												<li style={{display:"inline-block",listStyle:"none",marginRight:"2%",marginBottom:"1%"}}>
													<EmployeePicture>
													</EmployeePicture>
												</li>
											)}
						</EmployeesContainer>
						<ViewCompanyButton to="/profile">
							View Company
						</ViewCompanyButton>
						
					</Popup>
		}
	}


	handleClick=(props)=>{
		console.log(props);
	}

	render(){

		const position=[this.state.lat,this.state.lng];
		const position2=[this.state.testlat,this.state.lng];

		return(
			<MapProvider
				value={{
					displayInformationalModal:(decider)=>{
						this.setState({
							displayInformationalModal:decider
						})
					},
					updateCompaniesLocation:(companiesArray)=>{
						this.setState({
							companiesLocation:companiesArray
							})
						}
					}}
				>
				<Container>
					{this.displayShadowBackground()}

						<GeneralNavBar
							page={"Map"}
						/>
					<ReactMapGL
						{...this.state.viewport}
						mapboxApiAccessToken={MAPBOX_TOKEN}
						mapStyle="mapbox://styles/ngrant123/ck77anbmh01mg1ipu8893ou54"
						onViewportChange={(viewport) => this.setState({viewport})}
						onClick={e=>this.handleClick(e)}
						style={{height:"100%"}}
						center={this.state.center}>

						{this.state.companiesLocation.map(data=>
							<Marker latitude={data.latitude} longitude={data.longitude} offsetLeft={-20} offsetTop={-10}>
					          <MarkerContainer onClick={()=>this.dispayPopupModal(data)}>
					          		<ul style={{padding:"0px"}}>
					          			<li style={{listStyle:"none",marginLeft:"20%"}}>
					          				<CompanyLogo>
					          				</CompanyLogo>
					          			</li>

					          			<li style={{listStyle:"none",fontSize:"10px",textAlign:"center"}}>
					          				{data.name}
					          			</li>

					          		</ul>
					          </MarkerContainer>
					        </Marker>
				        )}
						{this.state.displayInformationalModal && (
							
							<InformationalModal>
								<p style={{color:"#5298F8"}}> Search for companies who are nearby and connect with them. Heres how the map works:</p>
								<ul>
									<li>
										Choose by what state and industry you want (or search directly by name)
									</li>

									<li>
										When all your information is done press submit and let us handle the rest

									</li>

								</ul>

							</InformationalModal>

						)}
				       {this.popup()}

					</ReactMapGL>

	      			<SearchComponent/>

				</Container>
			</MapProvider>
		)
	}
}

export default MapContainer;