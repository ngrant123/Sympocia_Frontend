import React,{Component} from "react";
import styled from "styled-components";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CameraIcon from '@material-ui/icons/Camera';
import EditImageCreation from "./EditImageCreation.js";
import CreateImageModal from "./CreateImageModal.js";

const Container=styled.div`
	position:fixed;
	z-index:21;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:30%;
	height:40%;
	overflow:scroll;

	@media screen and (max-width:330px){
		left:1% !important; 
		height:100% !important;
    }
    @media screen and (max-width:414px){
    	top:20% !important;
    	width:100% !important;
		left:1% !important; 
		height:100% !important;
    }
   	@media screen and (max-width:740px) and (max-height:420px){
    	top:20% !important;
    	width:100% !important;
		left:1% !important; 
		height:100% !important;
    }
`;


const ImageOptionsCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"white",
	backgroundColor:"#5298F8"
}


class ImageCreation extends Component{
	constructor(props){
		super(props);
		this.state={
			pictureUrl:"",
			displayEditImagesScreen:false,
			displayCreateImageScreen:false
		};
	}
	clickUploadPhotoButton=()=>{
		document.getElementById("uploadPictureFile").click();
	}
	handleUploadPicture=()=>{
		let reader= new FileReader();
		const picture=document.getElementById("uploadPictureFile").files[0];

		reader.onloadend=()=>{
			const picUrl=reader.result;
			if(this.props.isPreviousLoaded==true){
				this.props.handleNewlyCreatedImage(picUrl);
			}else{
				this.setState({
					pictureUrl:picUrl,
					displayEditImagesScreen:true
				})
			}
		}

		if(picture!=null){
				reader.readAsDataURL(picture);
		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}
	}

	createImage=()=>{
		this.setState({
			displayCreateImageScreen:true	
		})
	}

	handleNewlyCreatedImage=(imgData)=>{
		localStorage.removeItem('placeholder');
		this.setState({
				pictureUrl:imgData,
				displayEditImagesScreen:true
		})
	}

	render(){
		return(
			<React.Fragment>
				{this.state.displayEditImagesScreen==false?
					<Container id="container">
						{this.state.displayCreateImageScreen==false?
							<ul style={{position:"relative",left:"20%",top:"10%",padding:"1px"}}>
								<li style={{fontSize:"25px",marginBottom:"1%",listStyle:"none"}}>	
									Image Creation
								</li>
								<li onClick={()=>this.clickUploadPhotoButton()} style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={ImageOptionsCSS}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												<CameraIcon/>
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
												Upload Photo
											</li>
										</ul>																			
									</button>
									<input type="file" name="img" id="imageFile" style={{opacity:"0"}}  onChange={()=>this.handleUploadPicture()} 
								        accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip" 
								        name="attachments">
								    </input>
								</li>

								<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
									<button onClick={()=>alert('Option coming soon')} class="btn btn-primary dropdown-toggle"
										 type="button" data-toggle="dropdown" style={ImageOptionsCSS}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												<AddAPhotoIcon/>
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
												Take a picture
											</li>
										</ul>	
									</button>
									{/*
										This is not used but its here because for some reason if its not css would be messed up 
										sooooooo 
									*/}
									<input type="file" name="img" id="uploadPictureFile" style={{opacity:"0"}}  onChange={()=>this.handleUploadPicture()} 
								        accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip" 
								        name="attachments">
								    </input>

								</li>
							</ul>:<CreateImageModal
									handleNewlyCreatedImage={this.handleNewlyCreatedImage}
								  />
						}
					</Container>:
					<EditImageCreation
						imageSrcUrl={this.state.pictureUrl}
					/>
				}
			</React.Fragment>

		)
	}
}

export default ImageCreation;