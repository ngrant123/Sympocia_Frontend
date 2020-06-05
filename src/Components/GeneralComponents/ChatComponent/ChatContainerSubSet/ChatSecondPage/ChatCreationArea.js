import React,{Component} from "react";
import styled from "styled-components";
import SendIcon from '@material-ui/icons/Send';


const Container=styled.div`
	position:relative;
	width:80%;
	height:10%;
	background-color:white;
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
	width:80%;
	height:70%;
	left:25%;
	top:0px;
	resize:none;
	background-color:white;
	padding:5px;
	outline: none;
	z-index:6;
	border-color:#D8D8D8;
	border-radius:5px;	
	border-style:solid;
	border-width:1px;
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
			originalScrollHeight:0,
			initialTextCleared:false
		}
	}


	handleInput=()=>{
		const TextArea=document.getElementById("TextArea");
		const height=TextArea.style.top;

		if(TextArea.scrollHeight!=32){

			const differenceBetweenHeight=Math.abs(this.state.previousScrollHeight-TextArea.scrollHeight);
			TextArea.style.top="-"+(TextArea.offsetTop+differenceBetweenHeight+10)+"px";
	  		TextArea.style.height = Math.min((TextArea.scrollHeight+20), ChatAreaHeightLimit) + "px";

	  		this.setState({
				previousScrollHeight:TextArea.scrollHeight,
				initialTextCleared:true
			})
		}
		else{
			this.setState({
				previousScrollHeight:TextArea.scrollHeight,
				originalScrollHeight:TextArea.scrollHeight,
				initialTextCleared:true
			})
		}
	}
	bubbleUpMessage=()=>{
		if(this.state.initialTextCleared!=false){
			this.props.sendMessage(document.getElementById("TextArea").value);
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
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<SendIcon
						onClick={()=>this.bubbleUpMessage()}
						style={{position:"absolute",left:"110%",top:"20%",fontSize:30,color:"#5298F8"}}
					/>
				</a>

			</Container>
		)
	}
}

export default ChatCreationArea;