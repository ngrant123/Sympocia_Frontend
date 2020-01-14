import React, {Component} from "react";
import styled from "styled-components";
import SocialMedia from "./SocialMediaContainer.js";
import { connect } from "react-redux";
import { addCompanyCoverPhoto } from "../../../../../Actions/Redux/Actions/CompanyActions";


const Container= styled.div`
	position:absolute;
	width:100%;
	height:100%

`;

const NaveBarContainer = styled.div`
	position:absolute;
	width:100%;
	height:20%;
	top:0%

`;

const UpdateCoverPhoto = styled.div`

	position:absolute;
	left:5%;
	width:15%;
	height:70%;
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


		//
	}

	handleChangeCover(){


		var node=document.getElementById("coverphotoimage");
		var image=document.getElementById("coverphotoimagefile").files[0];
		var reader= new FileReader();


		reader.onloadend=function(){

			node.src=reader.result;
			console.log(reader.result);
			document.getElementById("coverphotoimage").style.opacity=1;

			const coverPhotoUrl=reader.result;
			this.props.addCompanyCoverPhoto(coverPhotoUrl);

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

	render(){

		return(

			<Container>
				<NaveBarContainer>
					<UpdateCoverPhoto onClick={()=>this.handleClickButton()}>
						+ Cover Photo
						 <input type="file" name="img" id="coverphotoimagefile" style={{opacity:"0", zIndex:"-3"}} onChange={()=>this.handleChangeCover()}></input>
					</UpdateCoverPhoto>
					<SocialMediaContainer>
						<SocialMedia/>
					</SocialMediaContainer>
				</NaveBarContainer>

				<img src={this.props.coverPhoto} name="coverphotoimage" id="coverphotoimage" style={{position:"relative",height:"100%", width:"80%",left:"10%",top:"0%",opacity:"0"}}/>
			</Container>

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
