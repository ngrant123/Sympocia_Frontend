import React,{Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import SympociaIcon from "../../../designs/img/SympociaIcon.jpg";
import {createProfile} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {checkIfEmailIsUsed} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {connect} from "react-redux";
import {signInPersonalUser} from "../../../Actions/Redux/Actions/PersonalProfile.js";
import {loginCompanyPage} from "../../../Actions/Redux/Actions/CompanyActions.js";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import PasswordSuggestions from "../../GeneralComponents/PassWordSuggestionsModal.js";
import {PersonalSignUpCard} from "./LSignUpPageCSS.js";


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
	margin-left:7% !important;


	@media screen and (min-width:1900px){
		padding:10px !important;
		font-size:20px !important;
    }

    @media screen and (min-width:2500px){
		padding:50px !important;
		font-size:40px !important;
    }

    @media screen and (max-width:1370px) {
    	margin-left:5% !important;
	}

	@media screen and (max-width:650px){
		width:95% !important;
		margin-left:0% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:70% !important;
		margin-left:17% !important;
    }

    @media screen and (max-width:700px) and (max-height:650px) and (orientation:landscape){
		margin-left:15% !important;
    }


    @media screen and (max-width:600px) and (max-height:380px) and (orientation:landscape){
		width:95% !important;
		margin-left:0% !important;
    }

`;

const SubmitButton=styled.div`
	position:relative;
	width:20%;
	height:10%;
	border-color: #C8B0F4;
	border-style:solid;
	background-color:#C8B0F4;
	color:white;
	text-decoration:none;
	transition:8s;
	border-radius:5px;
	padding:20px;
	margin-bottom:10%;
	display:flex;
	align-items:center;
	justify-content:center;
	cursor:pointer;

	z-index:2;
	&:hover{
	  	background-color:white;
		color:#C8B0F4;
		border-style:solid;
		border-color: #C8B0F4;
		text-decoration:none;
	}

	@media screen and (min-width:1900px){
		padding:10px !important;
		font-size:20px !important;
		height:20%;
    }
    @media screen and (min-width:2500px){
		font-size:40px !important;
    }


	@media screen and (max-width:1370px){
		width:80% !important;
		padding:10px !important;
		height:5%;
	}

	@media screen and (max-width:650px){
		width:85% !important;
		padding:20px !important;
		height:10%;
	}
`;

const TermsOfAgreement=styled.div`

	color:black;
	position:relative;
	height:30%;
	font-size:10px;
	padding:20px;


	@media screen and (min-width:1920px){
		margin-left:0%;
		font-size:20px !important;
	}
	@media screen and (min-width:2500px){
		margin-left:0%;
		font-size:20px !important;
    }




	@media screen and (max-width:1375px) {
		font-size:10px
		margin-left:1% !important;
	}

	@media screen and (max-width:600px) and (max-height:380px) and (orientation:landscape){
		width:95% !important;
    }

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
			reformatedPassword:"",
			isCreatingProfile:false,
			displayPasswordSuggestionsModal:false
		}
	}

	handleSignUpButton=async()=>{
		const email=document.getElementById("email").value;
		var {emailIndicator}=await checkIfEmailIsUsed(email);
		if(emailIndicator==true){
			alert('The email that you have typed is already used unfortunately by someone else. Please enter another one or sign in if its yours');
		}else{
			const firstName=document.getElementById("firstName").value;
			const lastName=document.getElementById("lastName").value;
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
					const {message}=data;
					const promises=[];  
					const {
						signInPersonalUser,
						loginCompanyPage
					}=this.props;

					promises.push(signInPersonalUser({
						...profile,
						...message
					}));
				    promises.push(loginCompanyPage(false));

				    Promise.all(promises).then(result=>{
				    	
				     	this.props.history.push({
						  pathname:'/home'
						})
				    })
				}else{
					const {statusCode,error}=data;
					if(statusCode==400){
						alert(error);
					}else{
						alert('Unfortunately an error has occured when creating your profile. Please try again later');
					}
				}
			}
			this.setState({
				isCreatingProfile:false
			})

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

	closePasswordSuggestionsModal=()=>{
		this.setState({
			displayPasswordSuggestionsModal:false
		})
	}


	render(){
		return (
			<PersonalSignUpCard>
				<PasswordSuggestions
					closePasswordSuggestionsModal={this.closePasswordSuggestionsModal}
					displayPasswordSuggestionsModal={this.state.displayPasswordSuggestionsModal}
				/>
				<img id="image" src={SympociaIcon} 
					style={{position:"relative",width:"80px",height:"60px"}}
				/>
				<p id="headerText" style={{textAlign:"center",fontSize:"30px",color:"#424242"}}>
					<b>Welcome to Sympocia</b>
				</p>
				<p id="signUpText" style={{textAlign:"center"}}>
					Sign up is quick and easy
				</p>
				<div style={{width:"87%"}}>
					<InputContainer id="email" placeholder="Email (required)"/>
					<InputContainer onClick={()=>this.checkIfEmailIsValid()}
						 id="firstName" placeholder="First Name (required)"
					/>
					<InputContainer onClick={()=>this.checkIfEmailIsValid()}
						 id="lastName" placeholder="Last Name (optional)"
					/>
					<div id="passwordContainer" style={{position:"relative",display:"flex",flexDirection:"row",width:"88%"
					,marginLeft:"1%"}}>
						<InputContainer onKeyDown={e=>this.test(e)} 
							onClick={()=>this.checkIfEmailIsValid()} id="password"
							placeholder="Password (required)"
							style={{width:"85%"}}
						/>
						<div>
							<HelpOutlineOutlinedIcon
								style={{fontSize:"30",marginRight:"5%",color:"#C8B0F4",cursor:"pointer"}}
								onClick={()=>this.setState({displayPasswordSuggestionsModal:true})}
							/>
						</div>
					</div>
				</div>
				{this.state.isCreatingProfile==true ?
					<p>Please wait...</p>
					:<SubmitButton onClick={()=>this.handleSignUpButton()}>
						Submit
					 </SubmitButton>
				}
				<TermsOfAgreement>
					By clicking Submit, you agree to our &nbsp;
					<Link to={{pathname:"/termsOfService"}}>
							Terms
					</Link> and &nbsp;
					<Link to={{pathname:"/privacyPolicy"}}>
						Privacy Policy
					</Link>
					.We dont use your data or sell it without letting you know first.

				</TermsOfAgreement>

			</PersonalSignUpCard>
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