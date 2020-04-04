import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import SendIcon from '@material-ui/icons/Send';

const Image=styled.div`



`;
const ImageTextArea=styled.textarea`
	width:170%;
	resize:none;
	text-decoration:none;
	color:#8c8c8c;
	border-style:none;
	border-radius:5px;
	background-color:#f1f1f1;
	padding:5px;
`;

class EditImageCreation extends Component{

	constructor(props){
		super(props);
		this.state={
			imgUrl:"",
			isCaptionCleared:false,
			isImageTitleCleared:false
		}
	}

	componentDidMount(){
		this.setState({
			imgUrl:this.props.imageSrcUrl
		})
	}

	clearImageCaptionTextArea=()=>{

		if(this.state.isCaptionCleared==false){
			document.getElementById("captionTextArea").value="";
			document.getElementById("captionTextArea").stlye.color="black";

			this.setState(prevState=>({
				...prevState,
				isCaptionCleared:true
			}))
		}else if(this.state.isImageTitleCleared==false){

			document.getElementById("titleTextArea").value="";
			document.getElementById("titleTextArea").stlye.color="black";
			this.setState(prevState=>({
				...prevState,
				isImageTitleCleared:true
			}))
		}
	}

	render(){
		return(
			<React.Fragment>
				<ul style={{padding:"10px"}}>
					<li style={{listStyle:"none",display:"inline-block",marginRight:"25%"}}>
						<img src={this.state.imgUrl} style={{height:"100%",width:"180%"}}/>
					</li>

					<li style={{position:"absolute",listStyle:"none",display:"inline-block",top:"2%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								Choose an industry:
								<div class="dropdown">
													<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"#5298F8",
																																			backgroundColor:"white"}}>
														Industries
													   	<span class="caret"></span>
													</button>
													<ul class="dropdown-menu" style={{height:"350px",overflowY:"auto"}}>
														{PERSONAL_INDUSTRIES.INDUSTRIES.map(data=>
															<li>
																<a href="javascript:;">{data.industry}</a>
															</li>
														)}
													</ul>
							  	</div>

							</li>

							<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px"}}>
								<ImageTextArea id="captionTextArea" onClick={()=>this.clearImageCaptionTextArea()}>
									Writing a caption...
								</ImageTextArea>

							</li>

							<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px"}}>
								<ImageTextArea id="titleTextArea" onClick={()=>this.clearImageCaptionTextArea()}>
									Write a title description...
								</ImageTextArea>

							</li>

							<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px"}}>
									<ul>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<SendIcon
												style={{fontSize:20,color:"white"}}
											/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",color:"white"}}>
											Send
										</li>

									</ul>
							</li>
						</ul>
					</li>
				</ul>


			</React.Fragment>
		)
	}
}

export default EditImageCreation;


