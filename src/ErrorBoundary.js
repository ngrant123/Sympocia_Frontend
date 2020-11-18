import React,{Component} from "react";
import styled from "styled-components";


const Container=styled.div`
	@media screen and (max-width:1370px){
		width:50% !important;
		#spinningGif{
			width:90% !important;
		}
		#descriptionLI{
			width:90% !important;
		}
	}

	@media screen and (max-width:600px){
		#descriptionLI{
			width:80% !important;
			height:40% !important;
		}
		#explanationLI{
			font-size:10px !important;
		}
	}


`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	margin-right:5%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:25px;
	width:60%;

	@media screen and (max-width:600px){
		font-size:10px !important;
	}
`;


const SubmitButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}



class ErrorBoundary extends Component{
	constructor(props){
		super(props);
		this.state={
			hasError:false,
			error:null,
			errorInfor:null,
			cubeSize:35,
			displayVerificationPage:false
		}
	}

	componentDidCatch(error,errorInfo){
		this.setState({
			hasError:true,
			error,
			errorInfo
		})
	}

	render(){
		return(
			<React.Fragment>
				{this.state.hasError==true?
					<Container>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<img id="spinningGif" src="https://i.pinimg.com/originals/b1/4c/a3/b14ca3ac3be660af02b717d8c1a35c6e.gif" alt="this slowpoke moves"  width="800"/>
							</li>
							<li id="descriptionLI" style={{listStyle:"none",display:"inline-block",width:"40%",marginTop:"10%"}}>
								{this.state.displayVerificationPage==false?
									<ul>
										<p id="explanationLI" style={{fontSize:"25px",color:"#424242"}}> We noticed that you encountered an error with the platform </p>
										<p id="explanationLI"> 
											If you want you can either go back and never speak about this again or you can send us a message and tell us what happened
											so we can fix it immediately 
										</p>

										<li style={{listStyle:"none",width:"180%",marginBottom:"10%"}}>
											<InputContainer placeholder="Explain what you did so that we can fix it later :)"/>
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.setState({displayVerificationPage:true})}style={SubmitButton}>
												Submit
											</li>
										</a>
									</ul>:
									<ul id="explanationLI">
										<p style={{fontSize:"25px",marginBottom:"3%",color:"#424242"}}> Thanks for letting us know what we did wrong </p>
										<p> Now leave please we know we messed up we're working on it now we promise</p>
									</ul>
								}
							</li>
						</ul>
					</Container>:
					<React.Fragment>
						{this.props.children}
					</React.Fragment>
				}
			</React.Fragment>
		)
	}
}

export default ErrorBoundary;