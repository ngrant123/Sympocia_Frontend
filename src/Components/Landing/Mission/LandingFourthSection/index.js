import React from "react";
import styled from "styled-components";
import previewImage from '../../../../designs/img/PreviewPlatform.png';


const Container = styled.div`
	  display:flex;
	  flex-direction:column;
	  flex-wrap:wrap;
	  text-align:center;
	  margin:auto;
	  padding:20;  
	  transition:.8s;
	  margin-top:15%;

	  @media screen and (max-width:1340px){
	  		#fourthSection{
	  			margin-top:70% !important;
	  		}
	  }

	   @media screen and (max-width:960px){
	  		#fourthSection{
	  			margin-top:150% !important;
	  		}
	  }
	   @media screen and (max-width:820px){
	   		#previewImage{
	   			width:75% !important;
	   		}
	   }

	    @media screen and (max-width:620px){
	   		#fourthSection{
	   			 margin-top:10% !important;
	   		}
	   		#previewImage{
	   			width:75% !important;
	   		}
	   }

	   @media screen and (max-width:520px){
	   		#previewImage{
	   			width:95% !important;
	   			margin-left:-10% !important;
	   		}
	   }

	    @media screen and (max-width:380px){
	   		#previewImage{
	   			width:110% !important;
	   			margin-left:-5% !important;
	   		}
	   		#fourthSection{
	   			margin-left:-20%;
	   		}
	   }
`;

const ImageContainer=styled.div`
	display:flex;
	justify-content:center;

	@media screen and (max-width:600px){
		#previewImage{
			width:90% !important;
		}
	}
`;

const FourthSection=()=>{

	return(
		<Container>
			<p style={{fontSize:"30px"}}>
				<b>Heres a preview of the product </b>
			</p>
			<p> We have a lot of features that we havent talked about here so submit your 
				email so that you can learn more 
			</p>
			<ImageContainer>
				<img id="previewImage" src={previewImage}
				 style={{borderRadius:"5px",width:"50%",height:"90%",boxShadow:"1px 5px 5px 5px #d5d5d5"}}
				/>
			</ImageContainer>

			<p style={{fontSize:"30px"}}>
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
			<p> We store the general information about the user like name, email, posts and etc. Thats the
			 only thing we store. Dont worry we're not like our other competitors who track
			your every move on the internet </p>


		</Container>
	)
}

export default FourthSection;