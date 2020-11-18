import React,{Component} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addCompanyIcon } from "../../../../Actions/Redux/Actions/CompanyActions";
import {CompanyConsumer} from "../CompanyContext.js";
import {sendCompanyIconToDB} from "../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPagePostRequests.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";




const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	border-radius:50%;
	border-color:#D5D5D5;
	font-size:785%;
	color:#7f7f7f;
	text-align:center;
	overflow:hidden;

`;

class CompanyIcon extends Component{

	constructor(props){
		super(props);
		this.state={
			imgUrl:"",
			companyInformation:{}
		}
	}

	handleCompanyClick=(companyInformation)=>{

			if(companyInformation.state.isOwnProfile==true){
				document.getElementById("imagefile").click();
				console.log("This is getting clicked");
				this.setState({
					companyInformation:companyInformation
				})
			}
		    //console.log(image.value);
	}

	handleSubmit=(companyInformation)=>{
		const companyId=this.state.companyInformation.state.userProfile._id;
		console.log(this.state.companyInformation);
		console.log(this.props);
		console.log(companyId);
		var node = document.getElementById('imagecontainer');
		var dataUrl=document.getElementById("imagefile").files[0];
		var reader= new FileReader();

		reader.onloadend=()=>{
			node.src=reader.result;
			node.style.opacity="1";
			document.getElementById("container").src=reader.result;

			const iconUrl=reader.result;
			console.log(iconUrl);
			sendCompanyIconToDB(companyId,iconUrl);
		}

		if(dataUrl!=null){
			reader.readAsDataURL(dataUrl);

		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}
	}

	 handleTest(){
		console.log("Click");
	}

	handleSettingDefaultProfilePicture=(companyInformation)=>{
		if(companyInformation.state.userProfile.companyIconPicture=="" && companyInformation.state.isOwnProfile!=true){
			return <img src={NoProfilePicture} id="imagecontainer" style={{position:"absolute",height:"100%", width:"100%",left:"0%",top:"0%",borderRadius:"50%",opacity:"1"}}/>
		}else{
			return <React.Fragment>
						+
						<img src={companyInformation.state.userProfile.companyIconPicture} id="imagecontainer" style={{position:"absolute",height:"100%", width:"100%",left:"0%",top:"0%",borderRadius:"50%",opacity:"1"}}/>
				   </React.Fragment>
		}
	}

	render(){
		return(
			<CompanyConsumer>	
				{companyInformation=>{
					return <div>
								<Container id="container" onClick={()=>this.handleCompanyClick(companyInformation)} src="">
									{this.handleSettingDefaultProfilePicture(companyInformation)}
								</Container>
								<input type="file" name="img" id="imagefile" onSubmit={()=>this.handleSubmit(companyInformation)} style={{opacity:"0", zIndex:"-3"}} onChange={()=>this.handleSubmit(companyInformation.state.id)}></input>					
							</div>
				}}
			</CompanyConsumer>

		)
	}
}

export default CompanyIcon;
