import React,{Component} from "react";
import styled from "styled-components";


const Container = styled.div`
	position:relative;
	width:90%;
	height:50px;
	top:7px;
	border-radius:5px;
	box-shadow: 1px 1px 5px 5px #d8d9df;
	transition:.8s;

	&:hover{
		background-color:#c8ddf8;
		box-shadow: 1px 1px 30px 10px 	#ffffa5;

	}


`;

const ImageContainer = styled.div`

	position:absolute;
	width:13%;
	height:75%;
	background-color:black;
	top:7px;
	left:5%;
	border-radius:50%;

`;

const DateContainer = styled.div`

	position:absolute;
	width:30%;
	height:50%;
	top:7px;
	left:20%;
	overflow:hidden;
	font-size:120%;
	color:#C8B0F4;
`;

const TypeOfInvestmentContainer = styled.div`

	position:absolute;
	width:25%;
	height:30%;
	top:30px;
	left:20%;
	overflow:hidden;
	font-size:80%;
	color:	#32383f;
`;

const InvestmentDescription = styled.div`
	

	position:absolute;
	width:45%;
	height:70%;
	top:7px;
	left:55%;
	overflow:scroll;
	color:	#32383f;

`;




class SmallInvestments extends Component{

	constructor(props){
		super(props);
		this.state ={
			investmentType:props.investmentType,
			date:props.date,
			description:props.description,
			companyName:props.companyName,
			amount:props.amount

		};

		console.log(this.state);
	}


	handleDisplaySmallInvestment=()=>{


		this.props.handleDisplaySmallInvestment(this.state);

	}

	render(){
		return(
			<Container onClick={()=>this.handleDisplaySmallInvestment()}>
				<ImageContainer>

				</ImageContainer>
			
				<DateContainer>{this.state.date}</DateContainer>
				<TypeOfInvestmentContainer>{this.state.investmentType}</TypeOfInvestmentContainer>
				<InvestmentDescription>{this.state.description}</InvestmentDescription>
 
			</Container>
		)
		
	}
}

export default SmallInvestments;