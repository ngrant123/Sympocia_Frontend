import React,{Component} from "react";
import styled from "styled-components";


const Container=styled.div`
	position:relative;
	width:80%;
	height:10%;
	background-color:white;
	top:20%;
	left:10%;
`;
const PictureButton=styled.div`
	position:relative;
	background-color:red;
	width:40px;
	height:60%;

`;

const AddImageButton=styled.div`
	position:relative;
	background-color:red;
	width:40px;
	height:60%;
`;

const GifButton=styled.div`
	position:relative;
	background-color:red;
	width:40px;
	height:60%;
`;

const TextArea=styled.textarea`
	position:absolute;
	width:65%;
	height:60%;
	left:25%;
	top:10px;
	resize:none;
	background-color:#eef3f8;
	border-radius:5px;
	border-style:none;
	padding:5px;
	outline: none;
	z-index:6;
`;

const SympociaLikeStampButton=styled.div`
	position:relative;
	background-color:blue;
	width:40px;
	height:60%;
`;

const ChatCreationListCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"10px"
}

const LastChatCreationButtonCSS={
	listStyle:"none",
	display:"inline-block",
	marginLeft:"70%"
}


var ChatAreaHeightLimit=80;
class ChatCreationArea extends Component{



	constructor(props){
		super(props);

		this.state={
			previousScrollHeight:0,
			originalScrollHeight:0

		}
	}


	handleInput=()=>{
		const TextArea=document.getElementById("TextArea");
		const height=TextArea.style.top;

		if(TextArea.scrollHeight!=32){

			const differenceBetweenHeight=Math.abs(this.state.previousScrollHeight-TextArea.scrollHeight);
			TextArea.style.top="-"+(TextArea.offsetTop+differenceBetweenHeight+10)+"px";
	  		TextArea.style.height = Math.min((TextArea.scrollHeight+10), ChatAreaHeightLimit) + "px";

	  		this.setState({
				previousScrollHeight:TextArea.scrollHeight
			})
		}
		else{
			this.setState({
				previousScrollHeight:TextArea.scrollHeight,
				originalScrollHeight:TextArea.scrollHeight
			})
		}
	}
 
	render(){

		return(
			<Container>
				<TextArea
					id="TextArea"
					placeholder="Type a message..."
					onInput={()=>this.handleInput()}
				/>


				<ul style={{padding:"10px"}}>
					<li style={ChatCreationListCSS}>
						<PictureButton/>
					</li>
					<li style={ChatCreationListCSS}>
						<AddImageButton/>
					</li>
					<li style={ChatCreationListCSS}>
						<GifButton/>
					</li>
					<li style={LastChatCreationButtonCSS}>
						<SympociaLikeStampButton
						/>
					</li>

				</ul>

			</Container>
		)
	}
}

export default ChatCreationArea;