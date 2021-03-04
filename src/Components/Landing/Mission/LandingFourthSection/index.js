import React from "react";
import styled from "styled-components";
import previewImage from '../../../../designs/img/PreviewPlatform.png';


const Container = styled.div`
		position:relative;
	  display:flex;
	  flex-direction:column;
	  text-align:center;
	  margin:auto;
	  padding:200px;  
	  transition:.8s;
	  width:80%;


	  @media screen and (max-width:1370px){
	  	font-size:20px;
		#previewImage{
			width:80% !important;
		    margin-left:10% !important;
		}
	  }
	  @media screen and (max-width:650px){
	  	font-size:15px;
	  	#headerTexts{
	  		font-size:20px !important;
	  	}
	  	#previewImage{
			height:200px !important;
		}
	  }
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
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
    width:"120px"
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
			
			<p style={{fontSize:"18px"}}>
				<b>Is Sympocia free?</b>
			</p>
			<p>Yes. Free now and free forever </p>
			<hr/>
			<p style={{fontSize:"18px"}}>
				<b>Are we going to sell you're data and think of you as information rather than people like 
					our other competitors?
				</b>
			</p>
			<p style={{fontSize:"18px"}}> No our main mission is serving you guys so we will never do that </p>
			<hr/>

			<p style={{fontSize:"18px"}}>
				<b>What information do we store about the user? </b>
			</p>
			<p> We store the general information about the user like name, email, and posts. Thats the
			 only thing we store. Dont worry we're not like our other competitors who track
			your every move on the internet </p>
			<hr style={HorizontalLineCSS}/>
			<CompanyInformationEndNotes>
				<div style={{display:"flex",flexDirection:"column"}}>
					<p style={{fontSize:"18px"}}>
						<b>Follow us</b>
					</p>
					<p>Instagram</p>
					<p>Twitter</p>
				</div>

				<div style={{display:"flex",flexDirection:"column"}}>
					<p style={{fontSize:"18px"}}>
						<b>Company</b>
					</p>
					<p>Privacy Policy</p>
					<p>Terms & Conditions</p>
				</div>
				<div style={{display:"flex",flexDirection:"row",height:"50%"}}>
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