import React,{Component} from "react";
import styled from "styled-components";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CameraIcon from '@material-ui/icons/Camera';
import EditImageCreation from "./EditImageCreation.js";
import CreateImageModal from "./CreateImageModal.js";
import {PostConsumer} from "../../PostContext.js";

const Container=styled.div`

	${({displayEditImagesScreen})=>
		displayEditImagesScreen==true?
		`
			position:fixed;
			z-index:35;
			background-color:white;
			border-radius:5px;
			top:10%;
			left:10%;
			width:80%;
			overflow:auto;
			height:80%;
			padding:5px;
		`:
		`
			position:fixed;
			z-index:35;
			background-color:white;
			border-radius:5px;
			top:20%;
			left:30%;
			height:50%;
			overflow:auto;
			width:45%;

		`
	}

	@media screen and (min-width:2500px){
		#text{
			font-size:36px !important;
		}
	}
	

	@media screen and (max-width:1370px){
		left:10%;
		width:80%;
	}

	@media screen and (max-width:650px){
		top:0% !important;
    	width:100% !important;
		left:0% !important; 
		height:100% !important;

		#text{
    		font-size:18px !important;
    	}


		#closeModalButton{
			marginTop:-80% !important;
			display:block !important;
		}
    }
   	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
       	top:10% !important;
		height:80% !important;
    }



   	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	top:0% !important;
    	width:100% !important;
		left:0% !important; 
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
			const maxFileSize=7000*1024;
			if(picture.size>maxFileSize){
				alert('Your file is too large. We only accept images that have a max size of 7MB. You can go to preview (Mac) and lower the resolution there.');
			}else{
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
			<Container id="container" displayEditImagesScreen={this.state.displayEditImagesScreen}>
				{this.state.displayEditImagesScreen==false?
					<React.Fragment>
						<div id="closeModalButton" 
							onClick={()=>this.props.closeModal()} style={{display:"none",marginTop:"0%"}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
							 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
							 stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							  <circle cx="12" cy="12" r="9" />
							  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</div>
						{this.state.displayCreateImageScreen==false?
							<ul style={{padding:"0px",marginLeft:"15%",paddingTop:"10%",width:"70%"}}>
								<p id="text" style={{fontSize:"25px"}}>
									<b>Create your own image here with the click of a button</b>
								</p>
								<p id="secondaryCreationText" style={{fontSize:"15px",color:"#b3b3b3"}}>
									Everyone loves pictures. Show people your skills
								</p>
								<hr/>
								<li onClick={()=>this.clickUploadPhotoButton()} style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={ImageOptionsCSS}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												<CameraIcon/>
											</li>

											<li id="text" style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
												Upload Photo
											</li>
										</ul>																			
									</button>
								</li>
								<input type="file" name="img" id="uploadPictureFile" style={{opacity:"0"}}  onChange={()=>this.handleUploadPicture()} 
							        accept="image/jpeg" 
							        name="attachments">
							    </input>

								{/*
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
										This is not used but its here because for some reason if its not css would be messed up 
										sooooooo 
									</li>
								*/}

							</ul>:<CreateImageModal
									handleNewlyCreatedImage={this.handleNewlyCreatedImage}
								  />
						}
					</React.Fragment>:
					<EditImageCreation
						imageSrcUrl={this.state.pictureUrl}
						closeModal={this.props.closeModal}
						isPhoneUIEnabled={this.props.isPhoneUIEnabled}
					/>
				}
			</Container>
		)
	}
}

export default ImageCreation;