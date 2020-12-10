import React from "react";
import styled from "styled-components";
import previewImage from '../../../../designs/img/PreviewPlatform.png';


const Container = styled.div`
	  position:relative;
	  height:100%;
	  text-align:center;
	  margin:auto;
	  padding:0;  
	  transition:.8s;

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

const FourthSection=()=>{

	return(
		<Container>
			<ul id="fourthSection">
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginBottom:"2%"}}>
							<p style={{fontSize:"30px"}}>
								<b>Heres a preview of the product </b>
							</p>
							<p> We have a lot of features that we havent talked about here so submit your 
								email so that you can learn more </p>
						</li>
						<li style={{listStyle:"none",display:"inline-block"}}>
							<img id="previewImage" src={previewImage} style={{borderRadius:"5px",width:"50%",height:"40%",boxShadow:"1px 5px 5px 5px #d5d5d5"}}/>
						</li>
					</ul>
				</li>

				<li style={{listStyle:"none",marginTop:"15%",marginBottom:"20%"}}>
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

					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mood-smile" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z"/>
					  <circle cx="12" cy="12" r="9" />
					  <line x1="9" y1="10" x2="9.01" y2="10" />
					  <line x1="15" y1="10" x2="15.01" y2="10" />
					  <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
					</svg>

				</li>
			</ul>
		</Container>
	)
}

export default FourthSection;