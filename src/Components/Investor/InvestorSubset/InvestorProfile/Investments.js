import React,{Component} from "react";
import styled from "styled-components";


const Container = styled.div`
	position:relative;
	width:90%;
	height:45%;
	top:7px;
	transition:.8s;
	border-bottom: 5px solid #787878;
	padding:20px;
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

const InvestmentLabels=styled.div`
	position:relative;
	height:20%;
	padding:10px;
	padding-bottom:20px;
	text-align:center;
	background-color:#5298F8;
	margin-right:10px;
	border-radius:5px;
	color:white;

`;


//Could be a functional component
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
		console.log(props);
		console.log(this.state);
	}


	handleDisplaySmallInvestment=()=>{


		this.props.handleDisplaySmallInvestment(this.state);
	}

	render(){
		return(
			<Container>
				<p style={{fontSize:"40px"}}><b>Sympocia</b></p>
				<p>New York, New York </p>
				<p>June 23 1995 </p>

				<ul style={{padding:"0px"}}>
					<li style={{listStye:"none",display:"inline-block"}}>
						<InvestmentLabels>
							Money
						</InvestmentLabels>

					</li>

					<li style={{listStye:"none",display:"inline-block"}}> 
						<InvestmentLabels>
							Investment Money
						</InvestmentLabels>

					</li>
				</ul>
				
 
			</Container>
		)
		
	}
}

export default SmallInvestments;