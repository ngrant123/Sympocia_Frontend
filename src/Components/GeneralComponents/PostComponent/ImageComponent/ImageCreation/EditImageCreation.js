import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Image=styled.div`
	position:relative;
	width:100%;
	height:100%;
	overflow:hidden;
	border-radius:5px;
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

const SelectedIndustryButton=styled.div`
	border-radius:5px;
	border-color:white;
	border-style:solid;
	border-width:1px;
	padding:10px;
	color:white;
	background-color:#5298F8;
`;

class EditImageCreation extends Component{

	constructor(props){
		super(props);
		this.state={
			imgUrl:"",
			isCaptionCleared:false,
			isImageTitleCleared:false,
			industriesSelected:[]
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

	sendImageDateToDB=()=>{


	}

	addSelectedIndustry=(industry)=>{
		console.log(industry);
	}

	render(){
		return(
			<React.Fragment>
				<ul style={{padding:"10px"}}>
					<li style={{listStyle:"none",display:"inline-block",backgroundColor:'red',width:"50%",marginRight:"2%"}}>
						<Image>
							<img src={this.state.imgUrl} style={{position:"relative",height:"100%",width:"100%"}}/>
						</Image>
					</li>

					<li style={{position:"relative",top:"-150px",left:"0%",listStyle:"none",display:"inline-block"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
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
																	<li onClick={()=>this.addSelectedIndustry(data.industry)}>
																		<a href="javascript:;">{data.industry}</a>
																	</li>
																)}
															</ul>
									  	</div>
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										{this.state.industriesSelected.map(data=>
											<SelectedIndustryButton>
												{data}
											</SelectedIndustryButton>
										)}
									</li>


								</ul>

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
									<ul onClick={()=>this.sendImageDateToDB()}>
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


