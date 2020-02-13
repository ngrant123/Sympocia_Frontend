import React,{Component} from "react";
import styled from "styled-components";
import Notification from "./Notification.js";
import {connect } from "react-redux";
import {addNews} from "../../../../../../Actions/Redux/Actions/CompanyNewsActions.js";

const Container = styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:#f9f9f9;
	overflow:hidden;
`;

const AddNotificationsContainer = styled.div`
	position:absolute;
	width:100%;
	height:25%;
	background-color:#f9f9f9;
	border-bottom:1px solid;


`;

const NotificationTitle = styled.div`
	position:absolute;
	width:100%;
	height:60%;


`;


const NotificationDescription = styled.div`
	position:absolute;
	top:55%;
	height:40%;
	width:90%;
	font-size:80%;
	left:9%;


`;

const NotificationsContainer = styled.div`
	position:relative;
	top:25%;
	left:4%;
	height:78%;
	width:93%;
	background-color:#f9f9f9;
	overflow: -moz-scrollbars-none;
	padding:10px;


`;

const AddButton = styled.div`
	position:absolute;
	width:17%;
	height:70%;
	left:80%;
	border-radius:50%;
	background-color:#C8B0F4;
	color:white;
	top:15%;
	text-align:center;
	font-size:140%;
	transition:.8s;

	&:hover{

		background-color:#6941E5;
	}


`;

const Caption = styled.div`
	position:absolute;
	width:60%;
	height:60%;
	left:4%;
	top:15%;
	overflow:hidden;
	font-size:170%;
	text-align:center;
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
	font-size:120%;
	top:35%;
	left:37%;
	text-align:center;

`;

const TitleCaption = styled.div`

	position:absolute;
	height:45px;
	width:25%;
	font-size:115%;
	background-color:red;
	top:35%;
	left:10%;
	border-radius:5px;
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
	opacity:0;


`;

const NotificationInput = styled.textarea`
	position:absolute;
	top:70%;
	width:45%;
	height:37%;
	left:37%;
	resize:none;
	border-radius:5px;
	font-size:120%;
`;

const NotificaiontCaption = styled.div`

	position:absolute;
	top:70%;
	left:10%;
	width:25%;
	height:15%;
	background-color:#5298F8;
	border-radius:5px;
	color:white;
	font-size:120%;
	text-align:center;


`;


const TesterData= [

	{
		newsDate:'Jun 01 2017',
		news:'Receivedstor',
		key:1

	},
	{
		newsDate:'Jun 01 2017',
		news:'Received 10M From angel investorReceived 10M From angel investorReceived 10M From angel investorReceived 10M From angel investor',
		key:2

	}

];


class MediumCompanyStats extends Component{

	constructor(props){
		super(props);


		this.state={

			Notifications:[]
		}
		this.displayData=this.displayData.bind(this);

	}

	componentDidMount(){

		/*
	
		
		console.log(this.props);
		this.setState(prevState=>({
			Notifications:this.props.companyNews
		}))

		*/

	}


	AddNotificationsAndCheckLimit(){

		var numEmployees=this.state.Notifications;
		var num=numEmployees.length+1;
		if(num==7){
			document.getElementById("AddNotification").style.pointerEvents="none";
			document.getElementById("MaxNotifications").style.opacity="1";
		}
		else{
			document.getElementById("MaxNotifications").style.opacity="0";
		}
	}

	handleAddNews(){

		var datevalue=document.getElementById("DateCaptionValue").value;
		var notificationvalue=document.getElementById("NotificationValue").value;
		var lengthContainer=this.state.Notifications.length;


		if(lengthContainer==0){
			newsObject={
				newsDate:datevalue,
				news:notificationvalue,
				key:1
			}
			 var Container=this.state.Notifications;
			 this.props.addNews(newsObject);
			 Container.push(newsObject);
			
			this.setState({

				Notifications:Container
			});

		}
		else{

		    var Lastkey=this.state.Notifications[lengthContainer-1].key;
			var Container=this.state.Notifications;
			

			var newsObject={
				newsDate:datevalue,
				news:notificationvalue,
				key:Lastkey+1
			}
			this.props.addNews(newsObject);
			Container.push(newsObject);

			this.setState({

				Notifications:Container


			});



		}
			document.getElementById("NotificationValue").value="";
			document.getElementById("DateCaptionValue").value="";


	}

	displayData(data){
	
		this.props.displayEmployee(data);

	}

	render(){


		return(

			<Container>
				<AddNotificationsContainer>

				<NotificationTitle>

					<Caption><b>News</b></Caption>
					<AddButton data-toggle="modal" data-target="#mymodal" onClick={()=>this.AddNotificationsAndCheckLimit()}><b>+</b></AddButton>

				</NotificationTitle>
				<NotificationDescription>
					Let everyone know the exciting news about your company :)
				</NotificationDescription>
				


					<div class="modal fade" id="mymodal" role="dialog">
					 <div class="modal-dialog">
								    
						<div class="modal-content">
						   <div class="modal-header">
						      <button type="button" class="close" data-dismiss="modal">&times;</button>
								   <h4 class="modal-title">Add Information</h4>
								   <MaxEmployee id="MaxNotifications"> 
								   		<p>Maximum Employees. Remove somebody to add a new person </p>
								   </MaxEmployee>
								 </div>
								 <div class="modal-body" style={{height:"270px"}}>
									 &nbsp;
									
									 	<TitleContainer placeholder="e.x. June 23 1996" id="DateCaptionValue"></TitleContainer>
									 	<TitleCaption> Please list the Date </TitleCaption>
									 	<NotificaiontCaption>Explain the news</NotificaiontCaption>
									 	<NotificationInput id="NotificationValue" placeholder="Whats the big news?"></NotificationInput>
								  </div>
								  <div class="modal-body"> &nbsp; </div>
								  <div class="modal-footer">
								    <button type="button" class="btn btn-default" data-dismiss="modal" id="AddNotification" onClick={()=>this.handleAddNews()}>Add News</button>
								    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
								  </div>
							</div>	      
					 </div>
			    </div>
				</AddNotificationsContainer>

				<NotificationsContainer>


					<ul>
							{this.state.Notifications.map(data =>
								<li style={{display:"inline-block",marginBottom:"10px",marginLeft:"1px"}}>
										<Notification 
											date={data.newsDate}
											caption={data.news}
											id={data.key}
											displayData={this.displayData}
										/>	
									</li>
							)}
						
					</ul>

				</NotificationsContainer>


			</Container>


		)
	}
}

const mapStateToProps=(state)=>{
	return{

		companyNews:state.companyNewsInformation
	}
}

const mapDispatchToProps=dispatch=>{

	return{
		addNews:(news)=>dispatch(addNews(news))
	}
}


export default connect(
		mapStateToProps,
		mapDispatchToProps
	)(MediumCompanyStats);


