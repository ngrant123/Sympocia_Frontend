import React,{Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import SympociaIcon from "../../../designs/img/SympociaIcon.jpg";
import {createProfile} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {checkIfEmailIsUsed} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {connect} from "react-redux";
import {signInPersonalUser} from "../../../Actions/Redux/Actions/PersonalProfile.js";
import {loginCompanyPage} from "../../../Actions/Redux/Actions/CompanyActions.js";


const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:85%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;
`;

const SubmitButton=styled.div`

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
  padding:20px;
  margin-left:-10%;

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

/*
	Currently trying to convert password into * so that to increase security
	but it taking a little bit longer than i had hoped so I'm going to go 
	back to it later
*/


class PersonalSignUp extends Component{
	constructor(props){
		super(props);
		this.state={
			isEmailValid:false,
			createProfile:this.handleSignUpButton,
			password:[],
			reformatedPassword:""
		}
	}

	handleSignUpButton=async()=>{
		

		const firstName=document.getElementById("firstName").value;
		const lastName=document.getElementById("lastName").value;
		const email=document.getElementById("email").value;
		const password=document.getElementById("password").value;

		if(firstName==""||email==""||password==""){
			alert('Your are missing a required field. Please enter a value');
		}else{
			const profile={
				firstName:firstName,
				lastName:lastName,
				email:email,
				isInvestor:false,
				password:password
 			}
			const {confirmation,data}=await createProfile(profile);

			if(confirmation=="Success"){ 
				const promises=[];  
				const {
					signInPersonalUser,
					loginCompanyPage
				}=this.props;

				promises.push(signInPersonalUser({
					...profile,
					...data
				}));
			    promises.push(loginCompanyPage(false));

			    Promise.all(promises).then(result=>{
			    	debugger;
			     	this.props.history.push({
					  pathname:'/home'
					})
			    })
			}else{
				alert('Unfortunately there was an error trying to create your profile. Please try again');
			}
		}
	}

	checkIfEmailIsValid=async()=>{
		
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

	doGetCaretPosition=(oField)=>{

	  // Initialize
		  var iCaretPos = 0;

		  // IE Support
		  if (document.selection) {

		    // Set focus on the element
		    oField.focus();

		    // To get cursor position, get empty selection range
		    var oSel = document.selection.createRange();

		    // Move selection start to 0 position
		    oSel.moveStart('character', -oField.value.length);

		    // The caret position is selection length
		    iCaretPos = oSel.text.length;
		  }

		  // Firefox support
		  else if (oField.selectionStart || oField.selectionStart == '0')
		    iCaretPos = oField.selectionDirection=='backward' ? oField.selectionStart : oField.selectionEnd;

		  // Return results
		  return iCaretPos;
	}

	handlePasswordEnter=(event)=>{
		debugger;
		if(event.key=="Shift" || event.key=="Backspace" ||
		  (event.keyCode >= 48 && event.keyCode <= 57)==true ||
		  (event.keyCode >= 65 && event.keyCode <= 90)==true){
			const password=document.getElementById("password").value;
			const currentCursorLocation=event.target.selectionStart
			let reformatedPassword=password;
			let currentPassword=this.state.password;
			let recentlyAddedCharacter=event.key;

			if(currentCursorLocation==this.state.password.length){
				currentPassword.push(recentlyAddedCharacter);
				this.setState({
					password:currentPassword
				})
			}else{
				if(event.key=="Backspace"){		
					currentPassword.splice(currentCursorLocation+1,1);
					this.setState({
						password:currentPassword
					})
				}else{
					if(event.key=="Shift"){
						recentlyAddedCharacter=recentlyAddedCharacter.toUpperCase();
					}
					currentPassword.splice(currentCursorLocation,0,recentlyAddedCharacter);
					this.setState({
						password:currentPassword
					})
				}
			}
			let finalWord="";
			for(var j=0;j<currentPassword.length;j++){
				let newFinalWord=currentPassword[j].toString();
				finalWord=finalWord+newFinalWord;
			}

			for(var i=0;i<finalWord.toString().length;i++){
				const character=finalWord.charAt(i);
				const newFormat=finalWord.replace(character,'*');
				finalWord=newFormat;
			}
			document.getElementById("password").value=finalWord;
		}
	}

	test=(event)=>{
		/*
			if(event.key=="ENTER"){
				event.preventDefault();
			}else{
				if((event.keyCode >= 48 && event.keyCode <= 57)==true ||
			  		(event.keyCode >= 65 && event.keyCode <= 90)==true){
					event.preventDefault();
				}
				this.handlePasswordEnter(event);
			} 
		*/
	}

	render(){
		return (
			<React.Fragment>
				<ul style={{padding:"0px"}}>
					<img src={SympociaIcon} style={{position:"relative",marginLeft:"40%",width:"80px",height:"60px"}}/>
					<p style={{fontSize:"30px",marginLeft:"10%",color:"#424242"}}>
						<b>Welcome to Sympocia</b>
					</p>
					<p style={{marginLeft:"35%"}}> Sign up is quick and easy </p>

					<ul style={{paddingLeft:"70px"}}>
						<InputContainer id="email" placeholder="Email"/>
						<InputContainer onClick={()=>this.checkIfEmailIsValid()}
							 id="firstName" placeholder="First Name"
						/>

						<InputContainer onClick={()=>this.checkIfEmailIsValid()}
							 id="lastName" placeholder="Last Name (optional)"
						/>

						<InputContainer onKeyDown={e=>this.test(e)} 
							onClick={()=>this.checkIfEmailIsValid()} id="password"
							 style={{width:"85%"}} placeholder="Password"
						/>

						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<SubmitButton onClick={()=>this.handleSignUpButton()}>
								Submit
							</SubmitButton>
						</a>

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
		signInPersonalUser:(profile)=>dispatch(signInPersonalUser(profile)),
		loginCompanyPage:(loginIndicator)=>dispatch(loginCompanyPage(loginIndicator))
	}
}


export default connect(
		null,
		mapDispatchToProps
	)(PersonalSignUp);