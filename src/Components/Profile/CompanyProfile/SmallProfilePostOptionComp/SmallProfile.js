import React, {Component} from "react";
import styled from "styled-components";


const Container= styled.div`
	position:relative;
	background-color:black;
`;

const Profile = styled.div`

	position:relative;
	background-color:#fbfbfb;
	border-radius:5px;
	width:63px;
	height:100px;
	left:-70%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;

`;

const ProfileContainer = styled.div`

	background-color:black;
	left:5%;
	height:70%;
	width:20%;
	top:20%;

`;


const Image = styled.div`
	position:relative;
	width:70%;
	height:42%;
	left:15%;
	top:10%;
	border-radius:50%;

`;

const Title = styled .div`
	position:relative;
	width:60%;
	height:30%;
	border-radius:5px;
	left:20%;
	top:20%;
	text-align:center;
	font-size:50%;
	background-color:#C8B0F4;
	color:white;

`;

const ImageContainer = styled.div`
     position:absolute;
	 height:45%;
	 width:20%;
	 border-radius:50%;
	 border-width:5px;
	border-style:solid;
	border-color:#D5D5D5;
	text-align:center;
	color:#D5D5D5;
	font-size:260%;
	left:40%;
	top:10%;

`;

const TitleContainer = styled.textarea`
	
	position:relative;
	height:40px;
	width:140px;
	resize:none;
	border-radius:5px;
	font-size:50%;
	top:65%;
	left:37%;
	text-align:center;

`;

const TitleCaption = styled.div`

	position:absolute;
	height:45px;
	width:25%;
	font-size:20%;
	background-color:red;
	top:62%;
	left:10%;
	border-radius:5px;
	font-size:50%;
	color:white;
	text-align:center;
	background-color:#5298F8;
	padding:5px 5px 5px 5px;

`;
const MaxEmployee = styled.div`

	position:absolute;
	left:30%;
	height:10%;
	top:2%;
	width:40%;
	font-size:45%;
	border-radius:5px;
	border-style:solid;
	border-color:red;
	text-align:center;

`;

const EmployeeBio = styled.textarea`
	position:absolute;
	top:85%;
	width:45%;
	height:37%;
	left:37%;
	resize:none;
	border-radius:5px;
	font-size:50%;
`;

const EmployeeBioCaption = styled.div`

	position:absolute;
	top:90%;
	left:10%;
	width:25%;
	height:15%;
	background-color:#5298F8;
	border-radius:5px;
	color:white;
	font-size:50%;
	text-align:center;


`;


class SmallProfile extends Component {
	constructor(props){

		super(props);

		this.state ={

			title:props.title,
			bio:props.bio,
			imageurl:props.imgUrl,
			id:props.id,
			name:props.name,
			email:props.email,
			location:props.location,
			shortbio:props.shortbio
		}
	}
	componentDidMount(){

		document.getElementById(this.state.id+"imagecontainer").src=this.state.imageurl;
		document.getElementById(this.state.id+"imagecontainer").style.opacity=1;

	}

	handleOnClick(){
			this.props.displayEmployee(this.state);
	}

	render(){


		return(

				<Profile onClick={()=>this.handleOnClick()}> 
							<Image>
								<img src="" id={this.state.id+"imagecontainer"} style={{position:"relative",height:"100%", width:"100%",left:"0%",top:"0%",borderRadius:"50%",opacity:"1"}}/>
							</Image>
							<Title><b>{this.state.title}</b></Title>

			    </Profile> 
		)
	}
}


export default SmallProfile; 