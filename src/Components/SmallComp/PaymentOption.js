import React, {Component} from "react";
import styled from "styled-components";

const Payment1 = styled.div`

	position:relative;

	width:30%;
	height:400px;
	left:1%;
	top:40px;
	border-radius:5px;
	transition: all ease 3s;
	padding:10px 0;
	border-style:none;



	&:hover{

   background-color: #ded2f9;

   color:white;
   transition: all ease 0.8s;

   }
	
`;


const P1PriceDescript = styled.div`

	position:relative;
	color:black;
	width:50%;
	height:9%;
	left:25%;
	top:30px;
	border-radius:5px;
	text-align:center;
	font-size:30px;
	font-family:Helvetica;

`;

const P1Number = styled.div`
	position:absolute;

	color:#A57FEA;
	width:50%;
	height:21%;
	left:25%;
	top:20%;
	border-radius:5px;
	font-size:65px;
	text-align:center;

`;

const P1Description = styled.div`
	position:absolute;
	color:#727274;
	width:82%;
	height:17%;
	left:12%;
	top:40%;
	border-radius:5px;
	font-size:18px;
	font-family:Helvetica;

`;


const P1SecondDescription = styled.div`
	position:absolute;
	color:black;
	width:80%;
	height:20%;
	left:5%;
	top:60%;
	border-radius:5px;
	font-size:14px;
	text-align:center;
	font-family:Helvetica;

`;




const P1Submit = styled.div`
	position:absolute;
	background-color:#C8B0F4;
	color:white;
	width:50%;
	height:10%;
	left:20%;
	top:80%;
	border-radius:5px;
	font-size:20px;

	text-align:center;
	font-family:Myriad Pro;
	padding:10px;
	   transition: all ease 0.8s;



	&:hover{

    background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   transition: all ease 0.8s;

   }

`;






class PaymentOption extends Component {



	constructor(props){

		super(props);


		this.state = {

			pricedescription: props.pricedescription,
			number: props.number,
			description: props.description,
			id:props.id

		

		};
	}


	handleHoverIn(){

		console.log("This hover function is being accessed");
		console.log(this.state.id);
		document.getElementById(this.state.id).style.color="#8b62ea";


	}

	handleHoverOut(){

		console.log("This hover out function is working");

		document.getElementById(this.state.id).style="black";

	}

	handleOnClick(){

		console.log("This functions is being clicked");

		//Fix later 
		document.getElementById(this.state.id+"container").style.borderStyle="solid";
		document.getElementById(this.state.id+"container").style.borderRadius="5px";
		document.getElementById(this.state.id+"container").style.borderColor=" #C8B0F4";

		this.props.handleClick();

	}
	onLoad(){
		console.log("This onload function is being accessed");
	}


	render(){


		return (
					<Payment1 id={this.state.id+"container"} onload= {()=> this.onLoad()}>

						<P1PriceDescript id={this.state.id+''}> {this.state.pricedescription} </P1PriceDescript> 
						<P1Number> {this.state.number} </P1Number>
						<P1Description> {this.state.description} </P1Description>


						<P1SecondDescription>
							<ul> 
								<li> Browse Startups </li>
								<li> Connect with Investors </li>
								<li> Connect with similar Startups</li>

							</ul>
						 </P1SecondDescription>
						<P1Submit onMouseOver= {()=> this.handleHoverIn()} onMouseOut={()=> this.handleHoverOut()} onClick={()=> this.handleOnClick()}> Choose Free </P1Submit>


					</Payment1>	
			
		)
	}
}


export default PaymentOption;