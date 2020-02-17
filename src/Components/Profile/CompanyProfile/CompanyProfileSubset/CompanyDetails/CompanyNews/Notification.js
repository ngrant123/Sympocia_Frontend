import React,{Component} from "react";
import styled from "styled-components";


const Container = styled.div`

	position:relative;
	width:150%;
	max-width:170px;
	height:50px;
	left:-30%;
	border-radius:5px;
	overflow:hidden;
	transition:.8s;

`;



const Icon = styled.div`
	position:absolute;
	width:17%;
	height:60%;
	left:5%;
	top:10%;
	background-color:black;
	border-radius:50%;
`;

const NotificationCaption = styled.div`
	position:relative;
	width:80%;
	height:100%;
	top:0%;
	left: 30%;
    font-size:140%;

`;

const DateContainer = styled.div`
	position:relative;
	width:90%;
	top:0%;
	color:#5298F8;



`;


const Caption = styled.div`
	position:relative;
	width:90%;
	height:100%;
	top:0%;
    font-size:70%;



`;

//Could be a functional component

class Notification extends Component{




	constructor(props){
		super(props);

		this.state={
			description:props.caption,
			date:props.date,
			key:props.id
		};

	//	handleClick=handleClick.bind(this);

	}

	handleDivEnter(){

		document.getElementById(this.state.key).style.borderStyle="solid";
		document.getElementById(this.state.key).style.borderWidth="1px";
		document.getElementById(this.state.key).style.borderColor="#5298F8";

	}

	handleDivOut(){

		document.getElementById(this.state.key).style.borderStyle="none";

	}

	handleClick(){
		this.props.displayData(this.state);
		this.props.addNewsToContext(this.state);

	}

			render(){

				return(
					<Container onMouseOver={()=>this.handleDivEnter()} onMouseOut={()=>this.handleDivOut()} id={this.state.key} onClick={()=>this.handleClick()}>
						<Icon></Icon>	
						<NotificationCaption>
							<DateContainer>{this.state.date}</DateContainer>
							<Caption>{this.state.description}</Caption>
						</NotificationCaption>
					</Container>

				)
			}
}


export default Notification;
