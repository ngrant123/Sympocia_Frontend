import React, {Component} from "react";
import styled from "styled-components";
import AddEmployeesAction from "../CompanyProfileSubset/CompanyDetails/CompanyEmployees/AddEmployees.js";
import SmallProfile from "../CompanyProfileSubset/CompanyDetails/CompanyEmployees/SmallProfile.js";
import MediumCompanyStats from "../CompanyProfileSubset/CompanyDetails/CompanyNews/MediumCompanyStats.js";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMap from "react-google-maps";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import GeneralPostComponent from "../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";


const ProfileContainer = styled.div`

	position:relative;
	background-color:#fefefd;
	width:100%;
	height:100%;
`;

const PostContainer = styled.div`

	position:absolute;
	width:47%;
	height:65%;
	top:20%;
	left:28%;
	background-color:#f9f9f9;
	border-radius:5px;
	border-style:solid;
	border-width: 2px;
	border-color:#D5D5D5;
	z-index:2;
`;

const CompanyDetails = styled.div`

	position:absolute;
	background-color:#f9f9f9;
	width:22%;
	top:18%;
	left:2%;
	height:75%;
	border-radius:5px;
	border-style:solid;
 	border-width:2px 1px 2px 1px;
 	border-color:#e0e0e0;



`;

const CompanyStats = styled.div`

	position:absolute;
	background-color:#f9f9f9;
	left:80%;
	height:80%;
	width:18%;
	top:18%;
	border-radius:5px;
	overflow:hidden;
	border-style:solid;
 	border-width:2px 1px 2px 1px;
 	border-color:#e0e0e0;



`;

const PostOptionsContainer = styled.div`
	position:absolute;
	width:100%:
	height:


`;
const CreateAPost = styled.div`
	position:absolute;
	width:100%;
	height:25%;
	top:0%;
	left:0%;
	font-size:260%;
	color:#565656;
	text-align:center;
	background-color:#AFAFAF;


`;

const CreateAPostLine = styled.div`
	position:absolute;
	width:100%;
	height:49%;
	top:50%;
	left:0%;
	font-size:70%;
	color:#565656;
	text-align:center;
	background-color:#e2e2e2;
	bottom:0%;

`;

const PostTextContainer = styled.textarea`

	position:absolute;
	top:28%;
	height:55%;
	width:92%;
	left:4%;
	border-radius:5px;
	resize:none;
	font-size:122%;
	padding:10px;
	z-index:1;

`;
const PostImageContainer = styled.div`

	position:absolute;
	background-color:#c6c6c6;
	top:28%;
	height:55%;
	width:92%;
	left:4%;
	border-radius:5px;
	resize:none;
	font-size:122%;
	z-index:2;
	overflow:hidden;
	border-style:solid;
	border-width:1px;

`;

const ImageContainer = styled.div`
	position:relative;
	width:65%;
	height:100%
`;

const ImageContainerTextarea = styled.textarea`
	position:absolute;
	left:65%
	width:35%;
	height:100%;
	top:0%;
	resize:none;
	padding:10px;
`;



const AttachFileButton = styled.div`
		
	position:absolute;
	background-color:#5298F8;
	top:85%;
	height:10%;
	width:25%;
	left:55%;
	color:white;
	text-align:center;
	font-size:120%;
	border-radius:10px;

	transition:.8s;

	&:hover{
		background-color:#325f99;
	}


`;

const SubmitPostionBottom = styled.div`
	position:absolute;
	background-color:#5298F8;
	top:85%;
	height:10%;
	width:25%;
	left:20%;
	color:white;
	text-align:center;
	font-size:120%;
	border-radius:10px;

	transition:.8s;

	&:hover{
		background-color:#325f99;
	}



`;

const Options = styled.div`

	position:absolute;
	background-color:#ffffff;
	top:1%;
	width:20%;
	height:40%;
	left:79%;
	border-radius:10px;
	border-style:solid;
	border-width: 1px;
	overflow:hidden;

`;

const EmployeeTitle = styled.div`

	position:absolute;
	width:75%;
	height:27%;
	left:10%;
	top:3%;
	font-size:210%;
	border-bottom:1px solid;
	font-family:'Roboto', sans-serif;
	color:	#424242;
	overflow:hidden;


`;

const EmployeeContainer = styled.div`

	position:absolute;
	width:100%;
	height:30%;
	left:1%;
	top:32%;
	font-size:150%;
	font-family:'Roboto', sans-serif;
	color:#424242;
	overflow:scroll;


	
`;

const CompanyBio = styled.textarea`

	position:absolute;
	width:80%;
	height:16%;
	left:10%;
	top:65%;
	font-size:90%;
	resize:none;
	font-family:'Roboto', sans-serif;
	color:	#424242;
	border-radius:5px;


`;


const SaveButton = styled.div`
	position:absolute;
	background-color:#5298F8;
	top:86%;
	width:24%;
	height:7%;
	left:18%;
	color:white;
	border-radius:5px;
	text-align:center;

	transition:.8s;

	&:hover{
		background-color:#325f99;
	}

`;

const CancelButton = styled.div`
	position:absolute;
	background-color:#5298F8;
	top:86%;
	width:24%;
	height:7%;
	left:56%;
	color:white;
	border-radius:5px;
	text-align:center;


	transition:.8s;

	&:hover{
		background-color:#325f99;
	}


`;

const EmployeeButton = styled.div`

	position:absolute;
	width:25%;
	height:85%;
	top:0%;
	left:70%;
`;

const ActivityLogButton = styled.div`
	position:absolute;
	width:10%;
	height:8%;
	left:70%;
	text-align:center;
	border-radius:0px 0px 5px 5px;
	box-shadow: 2px 2px 1px 1px #d8d9df;
	transition:.3s;
	color:black;
	text-align:center;
	padding:5px;

	&:hover{
		background-color:#C8B0F4;
		color:white;
	}
`;

const FriendsButton = styled.div`
	position:absolute;
	width:10%;
	height:8%;
	left:82%;
	text-align:center;
	border-radius:0px 0px 5px 5px;
	box-shadow: 2px 2px 1px 1px #d8d9df;
	transition:.3s;
	color:black;
	text-align:center;
	padding:5px;

	&:hover{
		background-color:#C8B0F4;
		color:white;
	}

`;

const PostLocation = styled.div`

	position:absolute;
	background-color:#5298F8;
	height:35%;
	width:15%;
	left:5%;
	top:5%;
	border-radius:5px;
	text-align:center;
	color:white;
	overflow:hidden;
	font-size:40%;
	border-style:solid;
	border-width:1px;
	transition:.8s;
	&:hover{
		background-color:#325f99;
	}



`;

const GeneralLocation = styled.div`

	position:absolute;
	background-color:#5298F8;
	height:35%;
	width:15%;
	left:22%;
	top:5%;
	border-radius:5px;
	text-align:center;
	color:white;
	overflow:hidden;
	font-size:40%;
	border-style:solid;
	border-width:1px;
	opacity:0;
	z-index:-2;
	transition:1s;
	&:hover{
		background-color:#325f99;
	}

`;

const DesignatedLocation = styled.div`

	position:absolute;
	background-color:#5298F8;
	height:35%;
	width:15%;
	left:40%;
	top:5%;
	border-radius:5px;
	text-align:center;
	color:white;
	overflow:hidden;
	font-size:40%;
	border-style:solid;
	border-width:1px;
	opacity:0;
	z-index:-2;
	transition:2s;
	&:hover{
		background-color:#325f99;
	}

`; 


const PlusCssObject = {


	backgroundColor:'#C8B0F4'

}


const TesterData=[

];

const EmployeeCSS = {
	 listStyleType: 'none'

}


class ProfileComp extends Component{

	constructor(props){

		super(props);

		this.state= {

			Employees:[],
			title:"Poop",
			postdecider:1,
			industryType:"Engineering",
			location:"Location"
		}
		this.handleAddEmployee=this.handleAddEmployee.bind(this);
		this.displayEmployee=this.displayEmployee.bind(this);
		this.displayNotification=this.displayNotification.bind(this);
		
	}

	handleUpdateProfile(){

	}


	handleAddEmployee(props){

		//Idea is basically for the key, if array is empty create a key but if it is not then access previous key then add one to it
		var Employee;
		var EmployeeContainer;
		var Employeelength;
		var LastEmployeekey;

		if(this.state.Employees.length==0){

			Employee ={

				title:props.title,
				bio:props.bio,
				imgUrl:props.imgUrl,
				name:props.name,
				email:props.email,
				location:props.location,
				id:1,
				shortbio:props.shortbio

			};

			EmployeeContainer=this.state.Employees;
			EmployeeContainer.push(Employee);

			this.setState({

				Employees:EmployeeContainer

			});
		}
		else{
			Employeelength=this.state.Employees.length;
			LastEmployeekey=this.state.Employees[Employeelength-1].id;

			Employee ={

				id:LastEmployeekey+1,
				title:props.title,
				bio:props.bio,
				imgUrl:props.imgUrl,
				name:props.name,
				email:props.email,
				location:props.location,
				id:LastEmployeekey+1,
				shortbio:props.shortbio

			};

			EmployeeContainer=this.state.Employees;
			EmployeeContainer.push(Employee);


			this.setState({

				Employees:EmployeeContainer


			});
		}
	}
//COMBINE THESE TWO METHODS

	displayEmployee(props){

		//Gets state from small profile file then displays it 
		var tempprops=props;
		tempprops.neworemployee=1;


		this.props.displaytoplevelemployeeprofile(tempprops);
	}

	displayNotification(props){

		//Gets state from small profile file then displays it 
		var tempprops=props;
		tempprops.neworemployee=2;

		this.props.displaytoplevelnewsprofile(tempprops);
	}


	render(){
		//Condidtional rendering for post/image/location section 
		var PostOptions;

		if(this.state.postdecider==1){
			PostOptions = <PostTextContainer placeholder="Whats on your mind?"></PostTextContainer>;
		}
		else if(this.state.postdecider==2){
			PostOptions  = <PostImageContainer>

								<ImageContainer>
									<img src="" id="postimagecontainer" style={{position:"absolute",height:"100%", width:"100%",left:"0%",top:"0%",opacity:"0"}}/>
								</ImageContainer>
								<ImageContainerTextarea></ImageContainerTextarea>

						</PostImageContainer>;
		}
		else{

		}

		return(

			<ProfileContainer>
			  <div class="dropdown" style={{position:"absolute", height:"10%",width:"13%",left:"2%",top:"2%"}}>
				    <button class="btn btn-primary dropdosuwn-toggle" type="button" data-toggle="dropdown" style={{backgroundColor:"#5298F8",width:"100%",left:"2%",top:"2%",height:"100%",color:"white"}}>{this.state.industryType}
				    <span class="caret"></span></button>
				    <ul class="dropdown-menu">
				      <li><a href="#">Fashion</a></li>
				      <li><a href="#">Health</a></li>
				      <li><a href="#">Consulting</a></li>
				    </ul>
  				</div>

  				<ActivityLogButton>Activity Log</ActivityLogButton>
  				<FriendsButton>Friendships</FriendsButton>


				<PostContainer>

					<GeneralPostComponent />

				</PostContainer>

				<CompanyDetails>

					<EmployeeTitle>

						<AddEmployeesAction
							
							handleAddEmployee={this.handleAddEmployee}
							numberofEmployeeCompany={this.state.Employees}
							key={1}

						/>

					</EmployeeTitle>


					<EmployeeContainer> 

						<ul style={{EmployeeCSS}}>

							{this.state.Employees.map(data =>

								<li style={{ display:"inline-block", marginLeft:"19px", marginBottom:"10px"}}>
									<SmallProfile 
										title={data.title}
										imgUrl={data.imgUrl}
										bio={data.bio}
										id={data.id}
										name={data.name}
										location={data.location}
										email={data.email}
										displayEmployee={this.displayEmployee}
										shortbio={data.shortbio}
									/>
								</li> 
								)
							}
						</ul>

					</EmployeeContainer>


					<CompanyBio placeholder="Tell us about your company"></CompanyBio>
					<SaveButton>Save</SaveButton>
					<CancelButton>Cancel</CancelButton>

				</CompanyDetails>

				<CompanyStats>

					<MediumCompanyStats 
						number={1}
						displayEmployee={this.displayNotification}
					/>

				</CompanyStats>

			</ProfileContainer>

		)
	}

}


export default ProfileComp;
