import React,{Component} from "react";
import styled from "styled-components";
import { GeneralNavBar } from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import MediumCompanyDetailsContainer from "../MediumHomeContainer/MediumCompanyDetailsContainer.js"
import MediumNotificationContainer from "../MediumHomeContainer/MediumNotificationContainer.js";
import { greetingdependingonTime } from "../../../Actions/Tasks/userTasks.js";
import { getNewFeedUpdates } from "../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";
import MediumMapDetails from "../MediumHomeContainer/MediumMapDetails.js";
import Industries from "../../../Constants/constants.js";
import Posts from "../MediumHomeContainer/MediumPostContainer.js";
import Chat from "../../GeneralComponents/ChatComponent/LargeChatComponent/LargeChatComponent.js";
import GeneralPostCreationContainer from "../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";

const Container= styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:white;

`;

const NavContainer = styled.div`
	position:fixed;
	width:100%;
	height:7%;

`;

const PostCreationContainer= styled.div`

	position:absolute;
	width:40%;
	height:30%;
	top:15%;
	left:30%;
	border-radius:5px;
	overflow:hidden;
	border-radius:5px;
	box-shadow: 1px 1px 2px 2px #999a9b;

`;

const PostBackgroundDivider = styled.div`
	
	position:absolute;
	width:42%;
	height:100%;
	left:29%;
	z-index:0.5;

`;

const CompanyDetailsContainer = styled.div`
	position:fixed;
	background-color:blue;
	width:23%;
	height:70%;
	border-radius:5px;
	top:25%;
	left:5%;
	overflow:hidden;
	box-shadow: 1px 1px 1px 1px #999a9b;

`;

const NotificationContainer = styled.div`
	position:fixed;
	background-color:blue;
	border-radius:blue;
	height:30%;
	width:26%;
	left:72%;
	top:15%;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #999a9b;

`;

const PostDivider = styled.div`

	position:absolute;
	background-color:#4d5050;
	height:1%;
	width:40%;
	top:52%;
	left:30%;
	border-radius:5px;

`;


const GreetingsContainer = styled.div`
	position:absolute;
	left:5%;
	height:8%;
	width:23%;
	top:15%;
	border-radius:5px;
	font-size:130%;
	padding:7px;
	color:	#6f7bbe;
	box-shadow: 1px 1px 1px 1px #b9baba; 


`;

const UpgradeButton = styled.div`

	position:absolute;
	width:15%;
	height:5%;
	border-radius:5px;
	top:8%;
	background-color:#5298F8;
	left:83%;
	font-size:160%;
	color:white;
	text-align:center;
	border-style:solid;
	border-color:white;
	border-width:2px;

`;


const MediumPieChartContainer = styled.div`

	position:fixed;
	height:40%;
	width:26%;
	left:72%;
	top:50%;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #999a9b;
	overflow-flow:hidden;


`;

const PostContainer = styled.div`

	position:relative;
	width:40%;
	height:30%;
	top:55%;
	left:30%;
	border-radius:5px;
	border-radius:5px;

`;

const ChatContainer = styled.div`

	position:absolute;
	background-color:red;
	width:30%;
	height:55%;
	top:20%;
	left:35%;
	z-index:4;
	border-radius:5px;

`;

const ShadowContainer = styled.div`

	position:absolute;
	height:100%;
	width:100%;
	z-index:3;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

`;


class LargeHomeContainer extends Component{

	constructor(props){

		super(props);

		this.state={
			greetingdescription:"",
			industries:[],
			//TESTER CHAT MESSAGE INDICATOR
			displayChatMessages:true

		}
	}

	componentDidMount(){

		//Get the user from the database and place it in below

		var greeting=greetingdependingonTime("Nathan");
		var industriesConstants=Industries.INDUSTRIES;
		this.setState({

			greetingdescription:greeting,
			industries:industriesConstants

		});
	}

	closeShadowContainer=()=>{

		this.setState({
			displayChatMessages:false
		})

	}

	ChatMessage = () =>{
		return this.state.displayChatMessages ?
			<div>
				<ShadowContainer id="shadowContainer" onClick={()=>this.closeShadowContainer()}/>
					<ChatContainer>
						<Chat />

					</ChatContainer>


			</div>
	
			: <p></p>;
	}
	
	Greetings = () =>{

		var greetings=this.state.greetingdescription;
		return <p>{greetings}</p>;
	}

	handleChange=(props)=>{

		var industryValue=document.getElementById(props).innerHTML;
		console.log(industryValue);
		
	}

	render(){


		return(
			<Container>
				<PostBackgroundDivider/>
				<NavContainer>
					<GeneralNavBar
						pageType={"Home"}
					/>
				</NavContainer>

				{this.ChatMessage()}


				<UpgradeButton>Upgrade</UpgradeButton>

				<GreetingsContainer><b>{this.state.greetingdescription}</b> <p2 style={{fontSize:"60%", color:"#a8a9af"}}>Update yourself with all of the latest information</p2></GreetingsContainer>

			
				<PostCreationContainer>
					<GeneralPostCreationContainer/>
				</PostCreationContainer>

				<PostContainer>
					<Posts/>
				</PostContainer>
				

				<CompanyDetailsContainer>
					<MediumCompanyDetailsContainer/>
				</CompanyDetailsContainer>

				<MediumPieChartContainer>
					<MediumMapDetails/>
				</MediumPieChartContainer>

				<NotificationContainer>
					<MediumNotificationContainer/>
				</NotificationContainer>


				<div class="dropdown" style={{position:"absolute", height:"4%",width:"7%",left:"63%",top:"47%", zIndex:"2"}}>
						    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor:"#5298F8",width:"100%",left:"2%",top:"2%",height:"100%",color:"white"}}>Industry
						    	<span class="caret"></span>
						    </button>
						    <ul class="dropdown-menu">
								{this.state.industries.map(data=>
									 <li onClick={()=>this.handleChange(data.id)} id={data.id}><a href="#">{data.industry}</a></li>
								)}
						    </ul>
  				 </div>

  				 <div class="dropdown" style={{position:"absolute", height:"4%",width:"7%",left:"55%",top:"47%", zIndex:"2"}}>
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor:"#5298F8",width:"100%",left:"2%",top:"2%",height:"100%",color:"white"}}>Order By
						    <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
						    <li><a href="#">Fashion</a></li>
						    <li><a href="#">Health</a></li>
						    <li><a href="#">Consulting</a></li>
						</ul>
  				 </div>

				<PostDivider/>
				
			</Container>
		)
	}
}

export default LargeHomeContainer;