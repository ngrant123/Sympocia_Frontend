import React from "react";
import styled from "styled-components";
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CloseIcon from '@material-ui/icons/Close';

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:17;
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
//Later down the road should add a contact button in this modal
const EmployeeDisplayModal=(props)=>{
	console.log(props);
	const {data,closeModal}=props;
	return(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<ul style={{padding:"10px"}}>
					<li style={{listStyle:"none",marginLeft:"95%"}}>
						<a href="javascript:void(0)" style={{textDecoration:"none"}}>
							<CloseIcon onClick={()=>closeModal()}/>
						</a>
					</li>
					<li style={{listStyle:"none",width:"90%",marginBottom:"2%"}}>
						<ul style={{padding:"10px"}}>
							<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block",width:"60%"}}>
								<img src={data.imgUrl} style={{borderRadius:"5px",width:"90%",height:"60%",marginBottom:"2%"}}/>
								{data.shortbio}
							</li>

							<li style={{position:"relative",top:"0px",listStyle:"none",display:"inline-block"}}>
								<p style={{fontSize:"15px",color:"#5298F8"}}>
									<b><PersonIcon style={{fontSize:"20"}}/>Name</b>
								</p>
								{data.name}

								<p style={{marginTop:"2%",fontSize:"15px",color:"#5298F8"}}><WorkIcon style={{fontSize:"25"}}/>Work title</p>
								 {data.title}

								<p style={{marginTop:"2%",fontSize:"15px",color:"#5298F8"}}><LocationCityIcon style={{fontSize:"25"}}/>Location</p>
									{data.location}

								<p style={{marginTop:"2%",fontSize:"15px",color:"#5298F8"}}> Bio </p>
								<li style={{listStyle:"none",fontSize:"15px"}}>
									{data.bio}
								</li>
							</li>
							
						</ul>
					</li>
				</ul>
			</Container>
		</React.Fragment>
	)
}

export default EmployeeDisplayModal;