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
`;


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
			console.log(reader.result);
			const picUrl=reader.result;
			this.setState({
				pictureUrl:picUrl,
				displayEditImagesScreen:true
			})
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
								<li style={{listStyle:"none",marginLeft:"15%",marginTop:"5%"}}>	
									<div class="dropdown">
																<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																						borderColor:"#5298F8",
																																						borderStyle:"solid",
																																						borderWidth:"1px",
																																						color:"#5298F8",
																																						backgroundColor:"white"}}>
																	Change Post Option
																   	<span class="caret"></span>
																</button>

																<ul class="dropdown-menu">
																	<li onClick={()=>this.props.displayProps("ImagePosts")}><a>Image</a></li>
																	<li onClick={()=>this.props.displayProps("VideoPosts")}><a>Video</a></li>
																	<li onClick={()=>this.props.displayProps("RegularPost")}><a>Post</a></li>
																	<li onClick={()=>this.props.displayProps("RegularPost")}><a href={"/blog"}>Blog</a></li>
																</ul>
										 </div>
								</li>
								<li style={{fontSize:"25px",marginBottom:"1%",listStyle:"none"}}>	
									Image Creation
								</li>
								<li onClick={()=>this.clickUploadPhotoButton()} style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																														borderColor:"#5298F8",
																														borderStyle:"solid",
																														borderWidth:"1px",
																														color:"white",
																														backgroundColor:"#5298F8"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												<CameraIcon/>
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
												Upload Photo
											</li>
										</ul>																			
									</button>
									<input type="file" name="img" id="uploadPictureFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>this.handleUploadPicture()} accept="image/x-png,image/gif,image/jpeg"></input>
								</li>

								<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
									<button onClick={()=>this.createImage()} class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																														borderColor:"#5298F8",
																														borderStyle:"solid",
																														borderWidth:"1px",
																														color:"white",
																														backgroundColor:"#5298F8"}}>
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
									<input type="file" name="img" id="uploadPictureFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>this.handleUploadPicture()}></input>

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