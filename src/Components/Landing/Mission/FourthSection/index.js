import React from "react";
import CopyrightIcon from '@material-ui/icons/Copyright';
import {Link} from "react-router-dom";
import {Container} from "./indexCSS.js";

const QuestionsContainerCSS={
	display:"flex",
	flexDirection:"column",
	justifyContent:"center",
	alignItems:"center",
	width:"100%",
	backgroundColor:"#303030"
}

const FrequentlyAskedQuestionsCSS={
	backgroundColor:"#303030",
	display:"flex",
	flexDirection:"column",
	alignItems:"center",
	justifyContent:"center"
}

const QuestionsSpecificDivCSS={
	marginTop:"2%",
	marginBottom:"5%",
	width:"40%",
	textAlign:"center"
}

const HeaderQuestionCSS={
	fontSize:"18px",
	color:"white"
}

const QuestionAnswerCSS={
	fontSize:"18px",
	color:"#C5C5C5"
}

const CompanyInformationEndNotesCSS={
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	width:"100%",
	alignItems:"center",
	padding:"10px"
}

const SignUpButton={
    listStyle:"none",
    display:"inline-block",
    backgroundColor:"#3898ec",
    borderRadius:"5px",
    padding:"10px",
    color:"white",
    marginRight:"2%",
    cursor:"pointer",
    width:"120px",
    marginBottom:"5%",
    textAlign:"center"
}

const ExploreButton={
 	listStyle:"none",
    display:"inline-block",
    backgroundColor:"white",
    borderRadius:"5px",
    padding:"10px",
    color:"#3898ec",
    marginRight:"2%",
    cursor:"pointer",
    width:"120px",
    marginBottom:"5%",
    borderStyle:"solid",
    borderWidth:"1px",
    borderColor:"#3898ec",
    textAlign:"center"
}

const CopyrightCSS={
	alignItems:"center",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	marginTop:"7%",
	fontSize:"18px",
	marginBottom:"2%"
}

const FourthSection=({history})=>{
	return(
		<Container>
			<div style={{display:"flex",justifyContent:"center",width:"100%",backgroundColor:"#232323",padding:"10px"}}>
				<p id="headerTexts" style={{fontSize:"36px",color:"#C8B0F4"}}>
					<b>Frequently asked questions </b>
				</p>
			</div>
			<div style={QuestionsContainerCSS}>
				<div id="questionSpecificDiv" style={QuestionsSpecificDivCSS}>
					<p id="questionId" style={HeaderQuestionCSS}>
						<b>
							Is Sympocia free?
						</b>
					</p>
					<p id="questionId" style={QuestionAnswerCSS}> 
						Although we will offer some small features to our paying customers, all the major features 
						in Sympocia are free and always will be.
					</p>
				</div>

				<div id="questionSpecificDiv" style={QuestionsSpecificDivCSS}>
					<p id="questionId" style={HeaderQuestionCSS}>
						<b>Is Sympocia safe to use?</b>
					</p>
					<p id="questionId" style={QuestionAnswerCSS}> 
						Yes, it is. Your safety and privacy are our biggest concerns. No one can
						get access to your private information.
					</p>
				</div>

				<div id="questionSpecificDiv" style={QuestionsSpecificDivCSS}>
					<p id="questionId" style={HeaderQuestionCSS}>
						<b>Does Sympocia have access to all of my account info?</b>
					</p>
					<p id="questionId" style={QuestionAnswerCSS}> 
						No, we don’t. We only save 3 pieces of information in our storage. Name, email, and posts.
					</p>
				</div>
			</div>
			<div id="companyInformationDiv" style={CompanyInformationEndNotesCSS}>
				<div id="companySecondaryInformation" style={{display:"flex",flexDirection:"row"}}>
					<div id="socialNetworksContainer"
						style={{display:"flex",flexDirection:"column",marginRight:"20%",width:"160px"}}>
						<p id="questionId" style={{fontSize:"18px"}}>
							<b>Follow us</b>
						</p>
						<a href="https://www.instagram.com/sympocia/">
							<p>Instagram</p>
						</a>
						<a href="https://twitter.com/sympocia">
							<p>Twitter</p>
						</a>
					</div>
					<div style={{display:"flex",flexDirection:"column"}}>
						<p id="questionId" style={{fontSize:"18px"}}>
							<b>Company</b>
						</p>

						<Link to={{pathname:"/privacyPolicy"}}>
							<p>Privacy Policy</p>
						</Link>

						<Link to={{pathname:"/termsOfService"}}>
							<p>Terms & Conditions</p>
						</Link>
					</div>
				</div>
				<div style={{display:"flex",flexDirection:"row",marginLeft:"15%"}}>
					<div style={SignUpButton}
						onClick={()=>history.push({
	                     pathname:'/signup'
	                })}>
						Sign Up
					</div>
					<div id="enterAsGuestButton" style={ExploreButton}
						onClick={()=>history.push({
	                       pathname:'/home'
	                    })}>
						Enter as Guest
					</div>
				</div>
			</div>
			<div style={CopyrightCSS}>
				<CopyrightIcon style={{marginRight:"2%"}}/> <b>2021 Sympocia</b>
			</div>
		</Container>
	)
}

export default FourthSection;