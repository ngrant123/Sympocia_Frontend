import React,{useContext} from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';


const SymposiumSpecilistsCSS={
	boxShadow:"1px 1px 5px #dbdddf",
	display:"flex",
	flexDirection:"column",
	marginTop:"2%",
	borderRadius:"5px",
	width:"95%",
	height:"260px"
}

const SymposiumResourcesCSS={
	boxShadow:"1px 1px 5px #dbdddf",
	display:"flex",
	flexDirection:"column",
	marginTop:"5%",
	borderRadius:"5px",
	width:"95%",
	height:"260px"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}

const SymposiumUniversity=()=>{

	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		featuresPageSecondaryInformation:{
			specialists,
			resources
		}
	}=featuresPageConsumer;

	const constructSpecialists=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",height:"60%",overflowY:"auto",padding:"20px"}}>
				{specialists.map(data=>
					<React.Fragment>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
							<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
								<img src={NoProfilePicture}
									style={{height:"40px",width:"46px",borderRadius:"50%"}}
								/>
								<p style={{marginLeft:"10%"}}>Nathan</p>
							</div>
							<OfflineBoltOutlinedIcon
								style={{fontSize:"24"}}
							/>
						</div>
						<hr style={HorizontalLineCSS}/>
					</React.Fragment>
				)}
			</div>
		)
	}

	const constructResources=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",height:"60%",overflowY:"auto",padding:"20px"}}>
				{resources.map(data=>
					<React.Fragment>
						<div style={{display:"flex",flexDirection:"row"}}>
							<img src={NoProfilePicture}
								style={{height:"40px",width:"46px",borderRadius:"50%"}}
							/>
							<div style={{display:"flex",flexDirection:"column",marginLeft:"10%"}}>
								<p>
									<b>Nathan</b>
								</p>
								<p>
									I found this document talking
								</p>
							</div>
						</div>
						<hr/>
					</React.Fragment>
				)}
			</div>
		)
	}

	return(
		<React.Fragment>
			<div style={SymposiumSpecilistsCSS}>
				<div style={{padding:"10px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
					<p>Symposium Specialists</p>
					<div style={DropDownCSS}>
						<ExpandMoreIcon
							style={{fontSize:"24"}}
						/>
					</div>
				</div>
				<hr style={HorizontalLineCSS}/>
				{constructSpecialists()}
			</div>
			<div style={SymposiumResourcesCSS}>
				<div style={{padding:"10px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
					<p>Symposium Resources</p>
					<div style={DropDownCSS}>
						<ExpandMoreIcon
							style={{fontSize:"24"}}
						/>
					</div>
				</div>
				<hr style={HorizontalLineCSS}/>
				{constructResources()}
			</div>

		</React.Fragment>
	)
}


export default SymposiumUniversity;