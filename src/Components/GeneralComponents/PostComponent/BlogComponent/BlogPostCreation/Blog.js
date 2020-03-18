import React,{Component} from "react";
import styled from "styled-components";


const Container=styled.div`
	position:absolute;
	width:60%;
	min-height:40%;
	left:20%;
	top:17%;
	border-radius:5px;
	margin-bottom:5%;

`;

class Blog extends Component{


	constructor(props){
		super(props);

		this.state={
			firstTimeClick:true
		}
	}

	emptyTextArea=()=>{
		if(this.state.firstTimeClick==true){

			const textArea=document.getElementById("textArea");
			textArea.innerHTML="";
			textArea.style.color="#272626";
			textArea.style.fontSize="20px";

			this.setState({
				firstTimeClick:false
			})
		}
	}


	render(){

		return(

			<Container>
				<p id="textArea" style={{height:"40%",outline:"none",color:"#A5A4A4",fontSize:"30px"}} onClick={()=>this.emptyTextArea()} contenteditable="true">
					Click here to start your masterpiece...
				</p>
			</Container>

		)
	}
}

export default Blog;