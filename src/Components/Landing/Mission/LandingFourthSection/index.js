import React from "react";
import styled from "styled-components";
import previewImage from '../../../../designs/img/PreviewPlatform.png';
import {Link} from "react-router-dom";


const Container = styled.div`
	 position:relative;
	  display:flex;
	  flex-direction:column;
	  text-align:center;
	  margin:auto;
	  padding-bottom:10%;  
	  transition:.8s;
	  width:70%;

	  @media screen and (max-width:1370px){
	  	font-size:15px;
	  	justify-content:center;
	  	margin-left:20%;
	  	width:60%;
	  	#questionId{
	  		font-size:15px !important;
	  	}
	  	#headerTexts{
	  		font-size:20px !important;
	  	}
	  	#previewImage{
			height:200px !important;
		}
	  }

	  
	  @media screen and (max-width:650px){
	  	margin-left:10%;
	  }
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		margin-top:20%;
      	#previewImage{
		      width:400px !important;
		      height:225px!important;
		}
    }
`;

const CompanyInformationEndNotes=styled.div`
	display:flex;
	flex-direction:row;
	justify-content:space-between;
	width:70%;
	margin-top:10%;

	@media screen and (max-width:1370px){
		font-size:15px !important;
		flex-direction:column;
		#companySignUpDiv{
			flex-direction:column !important;
		}
		#companyInformation{
			margin-right:70%;
		}
	}
`;

const ImageContainer=styled.div`
	position:relative;
	display:flex;
	justify-content:center;
`;

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
    marginBottom:"5%"
}

const ExploreButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
    width:"120px"
}

const HorizontalLineCSS={
  marginLeft:"0",
  marginRight:"0"
}


const FourthSection=({history})=>{

	return(
		<Container>
			<p id="headerTexts" style={{fontSize:"36px",color:"#C8B0F4"}}>
				<b>Frequently asked questions </b>
			</p>
			<hr/>
			<p id="questionId" style={{fontSize:"18px"}}>
				<b>Are we going to sell you're data and think of you as information rather than people like 
					our other competitors?
				</b>
			</p>
			<p id="questionId" style={{fontSize:"18px"}}> No our main mission is serving you guys so we will never do that </p>
			<hr/>

			<p id="questionId" style={{fontSize:"18px"}}>
				<b>What information do we store about the user? </b>
			</p>
			<p> We store the general information about the user like name, email, and posts. Thats the
			 only thing we store. Dont worry we're not like our other competitors who track
			your every move on the internet </p>
			<hr style={HorizontalLineCSS}/>
			<CompanyInformationEndNotes>
				<div style={{display:"flex",flexDirection:"row"}}>
					<div id="companyInformation" style={{display:"flex",flexDirection:"column",marginRight:"70%"}}>
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

					<div id="companyInformation"  style={{display:"flex",flexDirection:"column"}}>
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
				<div id="companySignUpDiv" style={{display:"flex",flexDirection:"row",height:"50px"}}>
	                    <li onClick={()=>history.push({
	                      pathname:'/signup'
	                    })} 
	                      style={SignUpButton}>
	                        Sign Up
	                    </li>
	                    <li onClick={()=>history.push({
	                      pathname:'/home'
	                    })} style={ExploreButton}>
	                        Enter as Guest
	                    </li>
				</div>
			</CompanyInformationEndNotes>

		</Container>
	)
}

export default FourthSection;