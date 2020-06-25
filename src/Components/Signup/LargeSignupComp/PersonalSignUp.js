import React,{Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import SympociaIcon from "../../../designs/img/SympociaIcon.jpg";
import {createProfile} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {checkIfEmailIsUsed} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {connect} from "react-redux";
import {
	addName,
	addLastName,
	addEmail,
	addPersonalIdentificationId,
	loginPersonalPage
} from "../../../Actions/Redux/Actions/PersonalProfile.js";
import {loginCompanyPage} from "../../../Actions/Redux/Actions/CompanyActions.js";


const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;

	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const SubmitButton=styled(Link)`

	   width:30%;
	   height:10%;
	   border-color: #C8B0F4;
	   border-style:solid;
	   background-color:#C8B0F4;
	   color:white;
	   text-decoration:none;

	   display: flex;
	   align-items: center;
	   justify-content: center;
	   transition:8s;
	  border-radius:5px;
	  padding:20px;
	  margin-left:25%;
	  margin-bottom:10%;

	   z-index:2;
	   &:hover{

	      background-color:white;

	    color:#C8B0F4;
	   border-style:solid;
	   border-color: #C8B0F4;
	   text-decoration:none;

	   }

	  @media screen and (max-width:400px) {top:78%}
	  @media screen and (max-width:330px) {top:79%;font-size:10px}
	  @media screen and (max-width:414px) {top:77%;}
	  @media screen and (max-height:570px) {top:85%}
	  @media screen and (max-height:530px) {top:75%;height:20%}
`;

const TermsOfAgreement=styled.div`

  color:black;
  position:relative;
  height:30%;
  font-size:10px;


  @media screen and (max-width:1375px) {font-size:10px}
  @media screen and (max-width:1024px) {left:10%;width:75%;font-size:10px}
  @media screen and (max-width:900px) {display:none}
  @media screen and (max-width:400px) {left:5%;width:90%;top:60%;font-size:7px}
  @media screen and (max-width:414px) {left:5%;width:90%;top:60%;font-size:7px}
  @media screen and (max-width:330px) {left:2%;width:100%;top:60%;font-size:6px}


   @media screen and (max-height:630px) {font-size:10px;top:110%}

   @media screen and (max-height:400px) {display:none}
   @media screen and (max-height:680px) {display:none}
   @media screen and (max-height:930px) {top:110%}

`;



class PersonalSignUp extends Component{
	constructor(props){
		super(props);
		this.state={
			isEmailValid:false,
			createProfile:this.handleSignUpButton,
			password:""
		}
	}

	handleSignUpButton=async(previousProps,profileObject,reduxFunctions)=>{
		debugger;
		const props=previousProps;
		const {firstName,lastName,email,password}=profileObject;
		const {
				addName,
			 	addLastName,
			 	addEmail,
			 	addPersonalIdentificationId,
			 	loginPersonalPage,
			 	loginCompanyPage
			 }=reduxFunctions


			 	loginPersonalPage(true);
				loginCompanyPage(false);
				addName(firstName);
				addLastName(lastName);
				addEmail(email);

				var profileCreationId;
				debugger;
				if(props.investorInformation!=null){
					const {investorInformation}=props;
					const {industries,location}=investorInformation;
					const {long,lat}=location;

					profileCreationId=await createProfile({
						firstName:firstName,
						lastName:lastName,
						email:email,
						isInvestor:true,
						industries:industries,
						location:{
							long:long,
							lat:lat
						},
						password:password
					});
				}else{
					profileCreationId=await createProfile({
						firstName:firstName,
						lastName:lastName,
						email:email,
						isInvestor:false,
						password:password
					});

					addPersonalIdentificationId(profileCreationId._id);
					

					return profileCreationId;
				}

				
	}

	checkIfEmailIsValid=async()=>{
		debugger;
		const email=document.getElementById("email").value;
		if(email!=''){
			 var {emailIndicator}=await checkIfEmailIsUsed(email);
			 if(emailIndicator==true){
			 	alert('The email that you have typed is already used unfortunately by someone else. Please enter another one or sign in if its yours');
			 }else{
			 	const ProfileObject={
			 		firstName:document.getElementById("firstName").value,
			 		lastName:document.getElementById("lastName").value,
					email:document.getElementById("email").value,
					password:document.getElementById("password").value
			 	}

			 	const ReduxObjectFunctions={
			 		addName:this.props.addFirstName,
			 		addLastName:this.props.addLastName,
			 		addEmail:this.props.addEmail,
			 		addPersonalIdentificationId:this.props.addPersonalIdentificationId,
			 		loginPersonalPage:this.props.loginPersonalPage,
			 		loginCompanyPage:this.props.loginCompanyPage
			 	}
			 	this.setState({
			 		isEmailValid:true,
			 		previousProps:this.props,
			 		profile:ProfileObject,
			 		reduxFunctions:ReduxObjectFunctions
			 	})
			 }
		}
	}

	handlePasswordEnter=(character)=>{
		debugger;
		const currentPassword=this.state.password;
		var newPassWord=currentPassword+character;
		this.setState({
			password:newPassWord
		})
	}

	render(){
		return (
			<React.Fragment>
				<ul style={{padding:"0px"}}>
					<img src={SympociaIcon} style={{position:"relative",marginLeft:"35%",width:"20%",height:"15%"}}/>
					<p style={{fontSize:"30px",marginLeft:"17%",color:"#424242"}}>
						<b>Welcome to Sympocia</b>
					</p>
					<p style={{marginLeft:"35%"}}> Sign up is quick and easy </p>

					<ul style={{paddingLeft:"70px"}}>
						<li style={{listStyle:"none"}}>
							<InputContainer id="email" style={{width:"85%"}} placeholder="Email"/>
						</li>
						<li style={{listStyle:"none",marginBottom:"5%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
									<InputContainer onClick={()=>this.checkIfEmailIsValid()} id="firstName" placeholder="First Name"/>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<InputContainer onClick={()=>this.checkIfEmailIsValid()} id="lastName" placeholder="Last Name (optional)"/>
								</li>
							</ul>
						</li>

						<li style={{listStyle:"none"}}>
							<InputContainer onKeyPress={e=>this.handlePasswordEnter(e.key)} onClick={()=>this.checkIfEmailIsValid()} id="password" style={{width:"85%"}} placeholder="Password"/>
						</li>

						<SubmitButton to={{pathname:`/home`,query:{createProfile:{
													...this.state,
													profile:{
														...this.state.profile,
														password:this.state.password
													},
													isPersonalProfile:true
												}}}}>
							Submit
						</SubmitButton>

						 <TermsOfAgreement>
                           By clicking Submit, you agree to our Terms, Data Policy and Cookies Policy.
                           We dont use your data or sell it without letting you know first.

                        </TermsOfAgreement>
					</ul>
				</ul>

			</React.Fragment>
		)
	}
}

const mapDispatchToProps=dispatch=>{

	return{
		addFirstName:(firstName)=>dispatch(addName(firstName)),
		addLastName:(lastName)=>dispatch(addLastName(lastName)),
		addEmail:(email)=>dispatch(addEmail(email)),
		addPersonalIdentificationId:(id)=>dispatch(addPersonalIdentificationId(id)),
		loginPersonalPage:(loginIndicator)=>dispatch(loginPersonalPage(loginIndicator)),
		loginCompanyPage:(loginIndicator)=>dispatch(loginCompanyPage(loginIndicator))
	}
}


export default connect(
		null,
		mapDispatchToProps
	)(PersonalSignUp);