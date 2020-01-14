import React,{Component} from "react";
import styled from "styled-components";
import domtoimage from 'dom-to-image';
import { connect } from "react-redux";
import { addCompanyIcon } from "../../../../Actions/Redux/Actions/CompanyActions";




const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	border-radius:50%;
	border-color:#D5D5D5;
	font-size:785%;
	color:#7f7f7f;
	text-align:center;

`;

class CompanyIcon extends Component{


	handleCompanyClick(){

			document.getElementById("imagefile").click();
			console.log("This is getting clicked");
		    //console.log(image.value);
	}
	handleSubmit(){

		var node = document.getElementById('imagecontainer');
		var dataUrl=document.getElementById("imagefile").files[0];
		var reader= new FileReader();

		reader.onloadend=function(){
			node.src=reader.result;
			node.style.opacity="1";
			document.getElementById("container").src=reader.result;

			const iconUrl=reader.result;
			this.props.addCompanyIcon(iconUrl);

		}

		if(dataUrl!=null){
			reader.readAsDataURL(dataUrl);

		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}
	}

	render(){

		return(
			<div>
				<Container id="container" onClick={()=>this.handleCompanyClick()} src="">
					+
					<img src="" id="imagecontainer" style={{position:"absolute",height:"100%", width:"100%",left:"0%",top:"0%",borderRadius:"50%",opacity:"0"}}/>
				</Container>
				

			
				<input type="file" name="img" id="imagefile" onSubmit={()=>this.handleSubmit()} style={{opacity:"0", zIndex:"-3"}} onChange={()=>this.handleSubmit()}></input>
				
			</div>

		)
	}
}

const mapStateToProps=(state)=>{

	return{
		companyIcon:state.companyInformation.companyIcon
	}
}

const mapDispatchToProps=dispatch=>{

	return{
		addCompanyIcon:(coverIconUrl)=> dispatch(addCompanyIcon(coverIconUrl))

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(CompanyIcon);
