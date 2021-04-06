import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import AssessmentIcon from '@material-ui/icons/Assessment';
import CloseIcon from '@material-ui/icons/Close';


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:15;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:40%;
	z-index:18;
	top:0px;
	left:30%;
	top:10%;
	overflow-y:auto;
`;

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
  marginRight:"5%"
}


const NewsDisplayPortal=(props)=>{
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>props.closeModal()}
			/>
			<Container>
				<ul style={{padding:"50px"}}>
					<li style={{listStyle:"none",marginLeft:"80%"}}>
						<a href="javascript:void(0)" style={{textDecoration:"none"}}>
							<CloseIcon onClick={()=>props.closeModal()}/>
						</a>
					</li>

					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
								<AssessmentIcon
										style={{fontSize:"60"}}
								/>
							</li>
							<li style={{listStyle:"none",display:"inline-block",marginBottom:"5%"}}>
								<p style={{fontSize:"30px",color:"#5298F8"}}>{props.data.date}</p>
								<hr/>
								<p>{props.data.newsDescription}</p>
							</li>
						</ul>
					</li>

					<li style={{listStyle:"none"}}>
						<a href="javascript:void(0)" style={{textDecoration:"none"}}>
							<li style={ExploreButton} onClick={()=>props.closeModal()}>
								Close
							</li>
						</a>
					</li>
				</ul>
			</Container>

		</React.Fragment>
	,document.getElementById("companyProfileContainer"));
}

export default NewsDisplayPortal;