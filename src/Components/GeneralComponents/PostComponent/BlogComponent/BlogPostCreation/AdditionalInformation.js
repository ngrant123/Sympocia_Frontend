import React,{useState,Component} from "react";
import styled from "styled-components";

const Container=styled.div`
	position:fixed;
	width:15%;
	height:40%;
	left:83%;
	top:17%;
	border-radius:5px;
	background-color:white;

`;

const ProfilePicture=styled.div`

	position:relative;
	margin-left:2px;
	margin-top:1px;
	width:60px;
	height:15%;
	border-radius:50%;
	background-color:red;

`;

const ViewTipsButton=styled.div`
	border-color:#5298F8;
	border-style:solid;
	border-width:1px;
	color:#5298F8;
	padding:10px;
	text-align:center;
	background-color:white;
	border-radius:5px;

`;

const AdditionalInformation=(props)=>{

	const [profilePictureContributors,changeContributors]=useState([{},{},{},{},{}]);

	return(
		<Container>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",fontSize:"30px",marginBottom:"3%"}}>
					<b>Contributors</b>
				</li>


				<li style={{listStyle:"none",marginBottom:"10%"}}>
					<ul style={{padding:"0px"}}>
						{profilePictureContributors.map(data=>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5%"}}>
								<ProfilePicture/>

							</li>

						)}

					</ul>

				</li>

				<li style={{listStyle:"none"}}>
					<ViewTipsButton>
						View Tips
					</ViewTipsButton>

				</li>


			</ul>

		</Container>
	)
}

export default AdditionalInformation;