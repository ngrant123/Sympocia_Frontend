import React, {Component} from "react";
import styled from "styled-components";
import {CompanyConsumer} from "../../../CompanyContext.js";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
		addEmployeeToCompanyDB
	} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPagePostRequests.js";
import CloseIcon from '@material-ui/icons/Close';

const AddEmployeeIcon = styled.div`

	position:absolute;
	background-color:#C8B0F4;
	left:80%;
	width:18%;
	height:90%;
	top:7%; 
	border-radius:50%;
	text-align:center;
	color:white;
	transition:.8s;
	text-align:center;

	&:hover{

		background-color:#6941E5;
	}

`;


const EmployeeTitle = styled.div`
	position:absolute;
	width:100%;
	heigth:30%;
	overflow:hidden;


`;

const EmployeeDescription = styled.div`
	position:absolute;
	height:30%;
	width:100%;
	top:57%;
	font-size:40%;

`;

const ImageContainer = styled.div`
     position:relative;
	 height:25%;
	 width:40%;
	 border-radius:50%;
	 border-width:5px;
	border-style:solid;
	border-color:#D5D5D5;
	text-align:center;
	color:#D5D5D5;
	font-size:80px;

`;

const TitleContainer = styled.textarea`
	
	position:absolute;
	height:40px;
	width:140px;
	resize:none;
	border-radius:5px;
	font-size:50%;
	top:10%;
	left:37%;
	text-align:center;

`;

const TitleCaption = styled.div`

	position:absolute;
	height:35px;
	width:30%;
	background-color:red;
	top:10%;
	left:2%;
	border-radius:5px;
	font-size:60%;
	color:white;
	text-align:center;
	background-color:#5298F8;
	padding:1px 1px 1px 1px;

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
	top:40%;
	width:53%;
	height:60%;
	left:37%;
	resize:none;
	border-radius:5px;
	font-size:50%;
`;

const EmployeeBioCaption = styled.div`

	position:absolute;
	top:40%;
	left:2%;
	width:30%;
	height:20%;
	background-color:#5298F8;
	border-radius:5px;
	color:white;
	font-size:60%;
	text-align:center;


`;

const FirstSectionContainer = styled.div`

	position:absolute;
	top:65%;
	width:50%;
	height:60%;
	overflow:hidden;
	border-style:solid;
	transition:.8s;
	border-width:0px 2px 0px 0px;

`;

const NameEmployee = styled.div`

	position:absolute;
	height:37px;
	width:27%;
	font-size:20%;
	top:10%;
	left:5%;
	border-radius:5px;
	font-size:50%;
	color:white;
	text-align:center;
	background-color:#5298F8;
	padding:5px 5px 5px 5px;
	overflow:hidden;

`;

const NameEmployeeTextarea = styled.textarea`
	position:absolute;
	height:40px;
	width:50%;
	top:10%;
	left:40%;
	border-radius:5px;
	font-size:50%;
	color:black;
	padding:5px 5px 5px 5px;
	overflow:hidden;
	resize:none;

`;


const EmployeeEmailContainer = styled.div`
	position:absolute;
	height:37px;
	width:27%;
	font-size:20%;
	top:40%;
	left:5%;
	border-radius:5px;
	font-size:50%;
	color:white;
	text-align:center;
	background-color:#5298F8;
	padding:5px 5px 5px 5px;
	overflow:hidden;

`;

const EmployeeEmailTextarea = styled.textarea`
	position:absolute;
	height:37px;
	width:50%;
	top:40%;
	left:40%;
	border-radius:5px;
	font-size:50%;
	color:black;
	padding:5px 5px 5px 5px;
	resize:none;

`;

const EmployeeLocationContainer = styled.div`
	position:absolute;
	height:37px;
	width:27%;
	font-size:20%;
	top:70%;
	left:5%;
	border-radius:5px;
	font-size:50%;
	color:white;
	text-align:center;
	background-color:#5298F8;
	padding:5px 5px 5px 5px;
	overflow:hidden;

`;

const EmployeeLocationTextarea = styled.textarea`
	position:absolute;
	height:37px;
	width:50%;
	top:70%;
	left:40%;
	border-radius:5px;
	font-size:50%;
	color:black;
	text-align:center;
	resize:none;
`;



const SecondSectionContainer = styled.div`
	position:absolute;
	top:65%;
	width:45%;
	height:60%;
	overflow:hidden;
	left:53%;
	transition:.2s;


`;

const ShortDescriptionTitle = styled.div`
	position:absolute;
	height:45px;
	width:40%;
	font-size:20%;
	top:70%;
	left:5%;
	border-radius:5px;
	font-size:50%;
	color:white;
	text-align:center;
	background-color:#5298F8;
	padding:5px 5px 5px 5px;
	overflow:hidden;

`;

const ShortDescriptionTextarea = styled.textarea`
	position:absolute;
	height:50%;
	width:45%;
	top:70%;
	left:50%;
	border-radius:5px;
	font-size:50%;
	color:black;
	padding:5px 5px 5px 5px;
	overflow:hidden;
	resize:none;


`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
`;

const InputBioContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
	height:20%;
`;

const InputShortDescriptionContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
	height:20%;
	width:90%;
`;


const ButtonListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"30px"
}

class AddEmployees extends Component{


	constructor(props){

		super(props);

		this.state= {
			data:"This a test to see if state is passed upwards",
			numofEmployees:props.numberofEmployeeCompany,
			title:"",
			bio:"",
			imgUrl:"",
			email:"",
			location:"",
			name:"",
			continueAddemployee:"Continue",
			addEmployeeClick:1,
			shortbio:"",
			displaySecondPage:false,
			justMounted:false
		};
	}

	componentDidMount(){


		this.setState(prevState=>({
			...prevState,
			justMounted:true
		}))
				document.getElementById("TitleCaptionValue").value="";
				document.getElementById("BioValue").value="";
				document.getElementById("employeeimagefile").src="";
				document.getElementById("EmployeeName").value="";
				document.getElementById("EmployeeEmail").value="";
				document.getElementById("Location").value="";
	}


	handleNextPageButton=(companyId)=>{

		var titlevalue;
		var biodescription;
		var imageurl;
		var Employeename;
		var Emplpyeeemail;
		var Employeelocation;
		if(this.state.displaySecondPage!=true){
			if(this.state.displaySecondPage==true && this.state.justMounted==true){
			document.getElementById("ShortDescriptionTextarea").value="";
					this.setState(prevState=>({
								...prevState,
								justMounted:false
							}))
					}
		}
		return this.state.displaySecondPage==false?
			<button type="button" class="btn btn-default" id="AddEmployeeButton" onClick={()=>this.setState(prevState=>({...prevState,
				title:document.getElementById("TitleCaptionValue").value,
				bio:document.getElementById("BioValue").value,
				name:document.getElementById("EmployeeName").value,
				email:document.getElementById("EmployeeEmail").value,
				location:document.getElementById("Location").value,
				displaySecondPage:true}))}>{this.state.continueAddemployee}</button>:
			<button type="button" class="btn btn-default" id="AddEmployeeButton" data-dismiss="modal" onClick={()=>this.handleAddEmployee(companyId)}>{this.state.continueAddemployee}</button>
	}

	toggleSecondPage=()=>{
		this.setState({
			displaySecondPage:true
		})
	}

	handleDisplaySecondPage=(compnyId)=>{

		return this.state.displaySecondPage==false?
			<React.Fragment>
				<ul style={{padding:"0px",marginLeft:"10%"}}>
					<li style={{listStyle:"none",display:"inline-block",borderRight:"1px solid black",paddingRight:"20px"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",width:"170%"}}>
								<InputContainer id="EmployeeName" placeholder="First Name"/>
							</li>

							<li style={{listStyle:"none",width:"170%"}}>
								<InputContainer id="EmployeeEmail" placeholder="Email Address"/>
							</li>

							<li style={{listStyle:"none",width:"170%"}}>
								<InputContainer id="Location" placeholder="Location"/>
							</li>
						</ul>
					</li>

					<li style={{marginLeft:"5%",position:"relative",top:"0px",listStyle:"none",display:"inline-block"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<InputContainer id="TitleCaptionValue" placeholder="e.x CEO CTO"/>
							</li>
							
							<li style={{listStyle:"none"}}>
								<InputBioContainer id="BioValue" placeholder="Write something nice :)"/>
							</li>
						</ul>
					</li>
				</ul>
			</React.Fragment>:
			<React.Fragment>
				<ul>
					<InputShortDescriptionContainer id="ShortDescriptionTextarea" placeholder="Add a short description about yourself"/>
				</ul>
			</React.Fragment>
	}

	handleChildAddClick(){

		var numEmployees=this.state.numofEmployees;
		var num=numEmployees.length+1;
		if(num==7){
			document.getElementById("AddEmployeeButton").style.pointerEvents="none";
			document.getElementById("MaxEmployessContainer").style.opacity="1";
		}
		else{
			document.getElementById("MaxEmployessContainer").style.opacity="0";
		}

	}

	handleAddEmployee(companyId){

		var ShortDescription=document.getElementById("ShortDescriptionTextarea").value;
		document.getElementById("ShortDescriptionTextarea").value="";
		this.setState(prevState=>({
			...prevState,
			displaySecondPage:false,
			shortbio:ShortDescription
		}),function(){

			document.getElementById("TitleCaptionValue").value="";
			document.getElementById("BioValue").value="";
			document.getElementById("employeeimagecontainer").src="";
			document.getElementById("EmployeeName").value="";
			document.getElementById("EmployeeEmail").value="";
			document.getElementById("Location").value="";

			const Employee={
				employeeName:this.state.name,
				employeeShortDescription:this.state.shortbio,
				employeeEmail:this.state.email,
				employeeLocation:this.state.location,
				employeeTitle:this.state.title,
				employeeBio:this.state.bio,
				employeeImg:this.state.imgUrl
			};
			addEmployeeToCompanyDB(companyId,Employee);
			this.props.closeModal();
		}.bind(this));


	}


	handleUploadEmployeeImage(){
		var node = document.getElementById('employeeimagecontainer');
		var dataUrl=document.getElementById("employeeimagefile").files[0];
		var reader= new FileReader();

		reader.onloadend=()=>{
			node.src=reader.result;
			node.style.opacity="1";
			this.setState({
				imgUrl:reader.result
			})
		}

		if(dataUrl!=null){
			reader.readAsDataURL(dataUrl);

		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}

	}

	handleEmployeeImage(){
		document.getElementById("employeeimagefile").click();

	}

	handleClick(){

		this.setState({
			displaySecondPage:false
		})
	}

	handleBackButton=()=>{
		return this.state.displaySecondPage==false?
			<React.Fragment></React.Fragment>:
			<button type="button" class="btn btn-default" onClick={()=>this.setState(prevState=>({...prevState,displaySecondPage:false}))}>Back</button>
	}

	render(){
	

		return(
			<CompanyConsumer>
				{companyInformation=>{
					return <React.Fragment>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"10px"}}>
											<li style={{fontSize:"20px",listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												Add Information
											</li>
											<li style={{listStyle:"none",display:"inline-block",marginLeft:"60%"}}>
												<a href="javascript:void(0)" style={{textDecoration:"none"}}>
													<CloseIcon
														onClick={()=>this.props.closeModal()}
													/>
												</a>
											</li>
										</ul>
									</li>
									<hr/>

									<li style={{listStyle:"none"}}>
										<ul>
											<li style={{listStyle:"none",marginLeft:"30%"}}>
												<a href="javascript:void(0)" style={{textDecoration:"none"}}>
													<ImageContainer id="image" onClick={()=>this.handleEmployeeImage()}> + 
													 	<img src="" id="employeeimagecontainer" style={{position:"absolute",height:"100%", width:"100%",left:"0%",top:"0%",borderRadius:"50%",opacity:"0"}}/>
													 </ImageContainer>
													 <input accept="image/x-png,image/gif,image/jpeg" type="file" name="img" id="employeeimagefile" style={{opacity:"0", zIndex:"-3"}} onChange={()=>this.handleUploadEmployeeImage()}></input>
														 &nbsp;
												</a>
											</li>
											{this.handleDisplaySecondPage()}
										</ul>
									</li>

									<li style={{listStyle:"none",marginLeft:"40%",marginTop:"2%"}}>
										<ul>
											<li key="1" style={ButtonListCSS}>{this.handleBackButton()}</li>
											<li key="2" style={ButtonListCSS}>{this.handleNextPageButton(companyInformation.state.userProfile._id)}</li>
											<li key="3" style={ButtonListCSS}><button type="button" class="btn btn-default" data-dismiss="modal" onClick={()=>this.handleClick()}>Close</button></li>
										</ul>
									</li>
								</ul>
									 
									
							</React.Fragment>
				}}
			</CompanyConsumer>
		)
	}
}


export default AddEmployees;