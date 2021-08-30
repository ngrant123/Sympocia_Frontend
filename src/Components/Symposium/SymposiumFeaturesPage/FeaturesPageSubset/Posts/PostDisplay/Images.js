import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Container=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;

	@media screen and (max-width:1370px){
		margin-top:5%;
		#image{
			width:250px !important;
			height:210px !important;
		}
	}

	@media screen and (max-width:650px){
		#image{
			width:120px !important;
			height:100px !important;
		}
		#beaconInformation{
			display:none !important;
		}
		#imageContainer{
			margin-right:10% !important;
			margin-bottom:10% !important;
		}
		#beaconCorrectAndExpandMoreDiv{
			left:60% !important;
		}
		#expandMoreIcon{
			font-size:24px !important;
		}
		#checkMarkIcon{
			font-size:24px !important;			
		}
		#profilePicture{
			height:30px !important;
			width:30px !important;
		}
	}
`;


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%",
	height:"1px"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer",
	marginLeft:"10%"
}

const Images=({posts})=>{
	return(
		<Container>
			{posts.map(data=>
				<div id="imageContainer" style={{display:"flex",flexDirection:"column",marginRight:"8%",marginBottom:"5%"}}>
					<div style={{position:"relative"}}>
						<div id="beaconCorrectAndExpandMoreDiv"
							style={{position:"absolute",display:"flex",flexDirection:"column",top:"5%",left:"75%"}}>
							{data.correctAnswerStatus==true &&(
								<CheckCircleIcon
									id="checkMarkIcon"
									style={{color:"#43D351",fontSize:"36"}}
								/>
							)}
							<div style={DropDownCSS}>
								<ExpandMoreIcon
									id="expandMoreIcon"
									style={{color:"#2B2B2B",fontSize:"36"}}
								/>
							</div>
						</div>
						<img id="image" src={NoProfilePicture} 
							style={{width:"220px",height:"190px",borderRadius:"5px"}}
						/>
					</div>
					<div style={{display:"flex",flexDirection:"row",marginTop:"5%"}}>
						<img id="profilePicture" src={NoProfilePicture}
							style={{height:"40px",width:"46px",borderRadius:"50%"}}
						/>
						<div id="beaconInformation" style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
							<p>
								<b><span style={{color:"#43D351"}}>1000000</span> beacon replies</b>
							</p>
							<hr style={HorizontalLineCSS}/>
							<p>asked 1 min ago</p>
						</div>
					</div>
				</div>
			)}
		</Container>
	)
}


export default Images;