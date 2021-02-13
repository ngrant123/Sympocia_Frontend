import React from "react";
import styled from "styled-components";
import previewImage from '../../../../designs/img/PreviewPlatform.png';


const Container = styled.div`
	  display:flex;
	  flex-direction:column;
	  text-align:center;
	  margin:auto;
	  padding:20;  
	  transition:.8s;
	  margin-top:15%;

	  @media screen and (max-width:1370px){
	  	font-size:20px;
	  }
	  @media screen and (max-width:700px){
	  	font-size:15px;
	  	#headerTexts{
	  		font-size:20px !important;
	  	}
	  }
		@media screen and (max-width:700px){
			#previewImage{
			      width:250px !important;
			      height:225px!important;
			}
		}
		@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
	      	#previewImage{
			      width:400px !important;
			      height:225px!important;
			}
	    }
`;

const ImageContainer=styled.div`
	position:relative;
	display:flex;
	justify-content:center;

`;

const FourthSection=()=>{

	return(
		<Container>
			<p id="headerTexts" style={{fontSize:"30px"}}>
				<b>Heres a preview of the product </b>
			</p>
			<p> 
				We have a lot of features that we havent talked about here so when you 
				have a chance clicked the signup or explore button and check it out.
			</p>
			<img id="previewImage" src={previewImage}
			 style={{borderRadius:"5px",width:"60%",height:"450px",boxShadow:"1px 5px 5px 5px #d5d5d5"}}
			/>
			<hr/>
			<p id="headerTexts" style={{fontSize:"30px"}}>
				<b>Frequently asked questions </b>
			</p>
			
			<p>
				<b>Is Sympocia free?</b>
			</p>
			<p>Yes. Free now and free forever </p>
			<hr/>
			<p>
				<b>Are we going to sell you're data and think of you as information rather than people like 
					our other competitors?
				</b>
			</p>
			<p> No our main mission is serving you guys so we will never do that </p>
			<hr/>

			<p>
				<b>What information do we store about the user? </b>
			</p>
			<p> We store the general information about the user like name, email, and posts. Thats the
			 only thing we store. Dont worry we're not like our other competitors who track
			your every move on the internet </p>


		</Container>
	)
}

export default FourthSection;