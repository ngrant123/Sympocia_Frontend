import React,{ Component } from "react";
import styled from "styled-components";
import IndustryContainer from "../SmallProfileComp/IndustryContainer.js";


const FriendsTitleContainer=styled.div`
	position:relative;
	background-color:white;
	width:80%;
	height:20%;
	left:10%;
	top:-1%;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
`;


const IndustriesContainer=styled.div`
	position:relative;
	background-color:white;
	width:80%;
	height:40%;
	left:10%;
	top:5%;
	border-radius:5px;
	padding:5px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	padding-top: 10px;


`;

const TesterFriendsArray=[
	{
		name:"Fred",
		imgsrc:""

	},
	{
		name:"Dave",
		imgsrc:""
	},
	{
		name:"Buster",
		imgsrc:""
	}
]

const FriendsDescriptionCSS={
	position:"absolute",
	fontSize:"45%",
	marginLeft:"7%",
	top:"-3%",
	width:"55%",
	color:"#d757f6",
	borderRadius:"5px",
	padding:"5px"

}

const IndustryDescriptionCSS={
	position:"relative",
	fontSize:"90%",
	marginLeft:"7%",
	top:"-3%",
	width:"50%",
	color:"#d757f6",
	borderRadius:"5px",
	padding:"5px"
	//background: "linear-gradient(to bottom left, #66ffcc -13%, #0099ff 100%)",


}





class MediumProfilePersonalInformation extends Component{

	constructor(props){

		super(props);
		this.state={
			friendsContainer:[]

		}
	}

	componentDidMount(){

		this.setState({
			friendsContainer:TesterFriendsArray
		})
	}

	render(){

		return(
			<React.Fragment>	
				<p style={{position:"relative",fontSize:"200%",left:"13%",color:"#1464f6"}}> <b>Friends</b> 
					<p1 style={FriendsDescriptionCSS}> 
					<b>View all of you friends and see what they've been up to</b> 
					</p1>
				</p>
				<FriendsTitleContainer>


				</FriendsTitleContainer>

				<p style={{position:"relative",fontSize:"200%",left:"7%",color:"#1464f6"}}> <b>Industries interested in:</b>
				</p>
					<p1 style={IndustryDescriptionCSS}> 
						<b>Check out the industries that you subscribed to</b> 
					</p1>


				<IndustriesContainer>
					<ul>
						{this.state.friendsContainer.map(data=>

							<li style={{display:"inline-block",listStyle:"none",marginLeft:"45px",marginBottom:"20px"}}>

								<IndustryContainer
									name={data.name}
									imgSrc={data.imgsrc}
								/>

							</li>

							)
						}
					</ul>

				</IndustriesContainer>


				



			</React.Fragment>
		)
	}
}

export default MediumProfilePersonalInformation;