import React,{Component} from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';
import {Doughnut} from 'react-chartjs-2';
import Industries from "../../../Actions/Requests/Constants.js";


const Container = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:	#f9fbfd;
	border-radius:5px;
	overflow:hidden;

`;

const MapContainer = styled.div`

	position:absolute;
	width:100%;
	top:5%;
	height:100%;
	left:0%;

`;

const MapContainerDivider = styled.div`

	position:absolute;
	width:65%;
	height:5%;
	background-color:#f6788e;
	left:5%;
	top:65%;
	border-radius:5px;

`;

const ShortConclusion = styled.div`

	position:absolute;
	width:24%;
	height:90%;
	top:5%;
	left:73%;
	font-size:100%;
	overflow:scroll;


`;

const FractionDisplayPeopleMessaged = styled.div`

	position:absolute;
	background-color:#eef3f9;
	width:15%;
	height:15%;
	top:75%;
	left:10%;
	border-radius:5px;
	color:#5298F8;

`;


const PeopleNotMessagedInIndustry = styled.div`

	position:absolute;
	background-color:#eef3f9;
	width:15%;
	height:15%;
	top:75%;
	left:30%;
	border-radius:5px;
	color:#f6788e;

`;

const PeopleLeftInIndustry = styled.div`

	position:absolute;
	background-color:#eef3f9;
	width:15%;
	height:10%;
	top:75%;
	left:50%;
	border-radius:5px;
	color:#02f000;

`;


const data = {

	labels: [
		'Red',
		'Green',
	],
	datasets: [{
		data: [300, 50],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		]
	}]

};


class MediumMapDetails extends Component{

	constructor(props){
		super(props);

		this.state={

			data:{},
			totalNumberContacted:17,
			totalNumberInIndustry:25,
			totalNumberNotContactedInIndustry:25,
			totalLeftInEntireSite:315,
			totalInvestorsContacted:0,
			totalInvestorsInIndustry:0,
			industries:[]
		}
	}

	componentDidMount(){

		var industriesConstants=Industries.INDUSTRIES;

		this.setState({

			industries:industriesConstants

		})
	}

	handleChange=(props)=>{

		
		var industryValue=document.getElementById(props).innerHTML;
		console.log(industryValue);
		

	}


	render(){

		return( 
     		<Container id="mapContainer">
     			<MapContainer>
     				<Doughnut data={data} />

     			</MapContainer>

     			<div class="dropdown" style={{position:"absolute", height:"13%",width:"25%",left:"5%",top:"50%", zIndex:"2"}}>
						    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor:"#5298F8",width:"100%",left:"2%",top:"2%",height:"100%",color:"white"}}>Industry
						    	<span class="caret"></span>
						    </button>
						    <ul class="dropdown-menu">
								{this.state.industries.map(data=>
									 <li onClick={()=>this.handleChange(data.id)} id={data.id}><a href="#">{data.industry}</a></li>
								)}
						    </ul>
  				 </div>

	  				 <ShortConclusion>
	  				 	In conclusion you have communicated with about blah blah blah
	  				 	short description about all the data we receieved that companies are
	  				 	gonna use and stuff blah blah blah
	  				 </ShortConclusion>

  				 <MapContainerDivider/>

  				 	<FractionDisplayPeopleMessaged>
  				 		{this.state.totalNumberContacted}/{this.state.totalNumberInIndustry} <br/>
  				 		<p style={{fontSize:"80%"}}>People Contacted</p>
  				 	</FractionDisplayPeopleMessaged>

  				 	<PeopleNotMessagedInIndustry>
  				 		{this.state.totalNumberNotContactedInIndustry} <br/>
  				 		<p style={{fontSize:"80%"}}>Not Contacted</p>
  				 	</PeopleNotMessagedInIndustry>

  				 	<PeopleLeftInIndustry>
  				 		{this.state.totalLeftInEntireSite} <br/>
  				 		<p style={{fontSize:"80%"}}>Total In All Industries</p>
  				 	</PeopleLeftInIndustry>
 
     		</Container>

		)
	}
}
export default MediumMapDetails;