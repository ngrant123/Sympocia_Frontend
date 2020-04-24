import React, {Component} from "react";
import styled from "styled-components";
import SocialMedia from "./SocialMediaContainer.js";
import { connect } from "react-redux";
import { addCompanyCoverPhoto } from "../../../../../Actions/Redux/Actions/CompanyActions";
import {sendCoverPhotoToDB} from "../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPagePostRequests.js"
import {CompanyConsumer} from "../../CompanyContext.js";


const Container= styled.div`
	position:absolute;
	width:100%;
	height:100%
	overflow:hidden;

`;

const NaveBarContainer = styled.div`
	position:absolute;
	width:100%;
	height:400px;
	top:0%

`;

const UpdateCoverPhoto = styled.div`

	position:absolute;
	left:5%;
	width:15%;
	height:10%;
	top:10%;
	border-radius:10px;
	text-align:center;
	font-size:155%;
	border-style:solid;
	border-width:2px;
	color:#d6d6d6;
	overflow:hidden;
	z-index:3;
	transition: all ease 0.8s;


	 &:hover{

      background-color:#5298F8;

	   color:white;
	   border-style:solid;

   }

`;

const SocialMediaContainer = styled.div`

	position:absolute;
	left:75%;
	height:70%;
	top:10%;
	width:20%;
	z-index:3;


`;



class CoverPhoto extends Component{

	constructor(props){

		super(props);

		this.state={
			coverPhotoUrl:""
		}
	}

	componentDidMount(){
		console.log("Testing cover photo component");
	}

	handleChangeCover(companyId){
		console.log(companyId);

		var node=document.getElementById("coverphotoimage");
		var image=document.getElementById("coverphotoimagefile").files[0];
		var reader= new FileReader();


		reader.onloadend=()=>{

			node.src=reader.result;
			console.log(reader.result);
			document.getElementById("coverphotoimage").style.opacity=1;

			const coverPhotoUrl=reader.result;
			this.props.addCompanyCoverPhoto(coverPhotoUrl);
			debugger;
			sendCoverPhotoToDB(companyId,coverPhotoUrl);

		}

		if(image!=null){
			reader.readAsDataURL(image);
		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}

	}

	handleClickButton(){
		document.getElementById("coverphotoimagefile").click();
	}
	handleDisplayCoverPhoto=(companyInformation)=>{
		if(companyInformation.state.userProfile.companyCoverPhoto==null || companyInformation.state.userProfile.companyCoverPhoto==""){
			return <img src={companyInformation.state.userProfile.companyCoverPhoto} name="coverphotoimage" id="coverphotoimage" style={{position:"relative",height:"100%", width:"100%",top:"0%",opacity:"1"}}/>;
		}else{
			return <img src={companyInformation.state.userProfile.companyCoverPhoto} name="coverphotoimage" id="coverphotoimage" style={{position:"absolute",top:"0%",opacity:"1"}}/>;

		}
	}

	render(){

		return(
			<CompanyConsumer>
				{companyInformation=>{
					return <Container>
								{/*

									<NaveBarContainer>
										{companyInformation.state.isOwnProfile==true?
											<UpdateCoverPhoto onClick={()=>this.handleClickButton()}>
												+ Cover Photo
												 <input type="file" name="img" id="coverphotoimagefile" style={{opacity:"0", zIndex:"-3"}} onChange={()=>this.handleChangeCover(companyInformation.state.userProfile._id)}></input>
											</UpdateCoverPhoto>:
											<React.Fragment>
											</React.Fragment>
										}
										<SocialMediaContainer>
											<SocialMedia/>
										</SocialMediaContainer>
									</NaveBarContainer>
								*/}

								{/*
									Could prevent images of a certain size from being uploaded
									Youtube only allows at least 2048 pixels wide and 1152 pixels tall to be uploaded
								*/}

								{this.handleDisplayCoverPhoto(companyInformation)}
							</Container>
					}
				}
			</CompanyConsumer>
		)
	}
}

const mapStateToProps=(state)=>{

	return{
		coverPhoto:state.companyInformation.companyCoverPhoto
	}
}

const mapDispatchToProps=dispatch=>{

	return{
		addCompanyCoverPhoto:(coverPhotoUrl)=> dispatch(addCompanyCoverPhoto(coverPhotoUrl))

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(CoverPhoto);
