import React,{Component} from "react";
import styled from "styled-components";
import CameraIcon from '@material-ui/icons/Camera';
import SendIcon from '@material-ui/icons/Send';
import IndustryPostOptions from "../../IndustryPostOptions.js";

const Container=styled.div`
	position:absolute;
	width:50%;
	height:70%;
	background-color:white;
	border-radius:5px;
	z-index:5;
	top:25%;
	left:30%;
`;

const ImageContainer=styled.div`
	position:relative;
	width:310px;
	height:60%;
`;

const BlogDescription=styled.textarea`
	height:30%;
	resize:none;
	border-style:none;
	color:#e4e9eb;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:170%;
	padding:5px;
`;

const BlogTitle=styled.textarea`
	height:10%;
	resize:none;
	border-style:none;
	color:#e4e9eb;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:170%;
	marginBottom:5%;
	padding:5px;
`;


class BlogEditSubmitModal extends Component{

	constructor(props){
		super(props);
		this.state={
			pictureUrl:"",
			displayImage:false,
			displayIndustrySelectModal:false
		}
	}

	clickInputFileButton=()=>{
		document.getElementById("uploadPictureFile").click();
	}

	handleUploadPicture=()=>{
		let fileReader= new FileReader();
		const picture=document.getElementById("uploadPictureFile").files[0];

		fileReader.onloadend=()=>{
			console.log(fileReader.result);
			const picUrl=fileReader.result;
			this.setState({
				pictureUrl:picUrl,
				displayImage:true
			})
		}

		if(picture!=null){
			fileReader.readAsDataURL(picture);
		}else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}
	}


	render(){
		return(
			<Container>	
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:'none',marginLeft:"5%",marginTop:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",fontSize:"25px"}}>
								<b>Final touches</b>    (optional)
							</li>
							<li style={{listStyle:"none"}}>
								Before you finally submit your blog you can add some additional information. This would allow people to 
								learn about your article more and even locate it easier 
							</li>
						</ul>
					</li>
					<li style={{listStyle:"none",display:"inline-block",boxShadow:"1px 1px 5px #8c8c8c",borderStyle:"dotted",borderRadius:"5px",marginLeft:"4%",marginTop:"10%"}}>
						{this.state.displayImage==false?
							<React.Fragment>
								<a href="javascript:;" style={{textDecoration:"none"}}>
									<ul onClick={()=>this.clickInputFileButton()}style={{padding:"110px"}}>
										<li style={{listStyle:"none",marginLeft:"25%"}}>
											<CameraIcon
												style={{fontSize:35,color:"#5298F8"}}
											/>
										</li>
										<li style={{listStyle:"none",color:"#5298F8"}}>
											Upload photo
										</li>
									</ul>
								</a>
								<input type="file" name="img" id="uploadPictureFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>this.handleUploadPicture()}></input>
							</React.Fragment>:
							<ImageContainer>
								<img src={this.state.pictureUrl} width="100%" height="100%"/>
							</ImageContainer>

						}
					</li>

					<li style={{position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",marginTop:"15%"}}>
						{this.state.displayIndustrySelectModal==false?
								<ul style={{padding:"0px"}}>
									<p> Title (optinal)</p>
									<BlogTitle
										placeholder="Write down a title so it will immediately grab users attention"
									/>
									<p> Description (optinal)</p>
									<BlogDescription
										placeholder="Write down a description so readers can get a quick summary of you masterpiece"
									/>
									<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
														<ul onClick={()=>this.setState({
																	displayIndustrySelectModal:true
																})}>
															<li style={{listStyle:"none",display:"inline-block",color:"white"}}>
																Next
															</li>

														</ul>
									 </li>
								</ul>:
								<li style={{top:"-280px",listStyle:"none"}}>
									<IndustryPostOptions/>
								</li>
							}
					</li>
				</ul>

			</Container>

		)
	}
}

export default BlogEditSubmitModal;