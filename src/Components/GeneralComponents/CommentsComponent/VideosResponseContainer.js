import React,{Component} from "react";
import styled from "styled-components";
import AwesomeSlider from 'react-awesome-slider';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import CommentsContainer from "./CommentContainer.js";


const Video=styled.div`

	position:absolute;
	background-color:red;
	width:100%;
	height:80%;
	overflow:hidden;
`;


const CommentsContainerDiv=styled.div`
	position:absolute;
	width:70%;
	height:60%;
	top:40%;
	background-color:white;
	left:10%;
	border-radius:5px;
	overflow-y:scroll;
`;


class VideoResponseContainer extends Component{

	constructor(props){

		super(props);
		this.state={
			videoResponses:[
				{
					backgroundColor:"blue"

				},{
					backgroundColor:"red"
				},{
					backgroundColor:"yellow"
				}
			],
			indicatorPositin:0,
			displayComments:false
		}
	}



	VideoComponent=()=>{ 
		const videoData=this.state.videoResponses[this.state.indicatorPositin];

		return <Video style={{backgroundColor:videoData.backgroundColor}}>

					<p style={{fontSize:"25px",marginLeft:"5%"}}>
						<b>Nathan Grant</b>
					</p>
					<ul style={{zIndex:"2",padding:"0px",backgroundColor:"red",width:"15%",marginLeft:"80%"}}>
						<li style={{listStyle:"none",marginBottom:"40%"}}>
							Likes
						</li>

						<li style={{listStyle:"none",marginBottom:"40%"}} onClick={()=>this.setState({displayComments:!this.state.displayComments})}>
							Comments
						</li>

						<li style={{listStyle:"none"}} onClick={()=>this.handleDisplayComments()}>
							Share
						</li>
					</ul>

					{
						this.state.displayComments==true?
							<CommentsContainerDiv>
								<CommentsContainer/>

							</CommentsContainerDiv>:
							<React.Fragment>
							</React.Fragment>
					}
				</Video>
	}

	handleNextResponse=()=>{
		console.log("Testing video Component");
		let currentIndicator=this.state.indicatorPositin;

		if(currentIndicator<this.state.videoResponses.length-1){
			const newIndicator=currentIndicator+1;

			this.setState({
				indicatorPositin:newIndicator,
				displayComments:false
			})
		}
	}



	handlePreviousResponse=()=>{

		let currentIndicator=this.state.indicatorPositin;

		if(currentIndicator!=0){
			const newIndicator=currentIndicator-1;

			this.setState({
				indicatorPositin:newIndicator,
				displayComments:false
			})
		}
	}

	render(){
		return(
			<React.Fragment>

				{this.VideoComponent()}
				{this.state.indicatorPositin==0?
					<React.Fragment>
					</React.Fragment>:
					<KeyboardArrowLeftIcon onClick={()=>this.handlePreviousResponse()} style={{fontSize: 40,position:"absolute",top:"70%",left:"5%"}}/>
				}
				{this.state.indicatorPositin==this.state.videoResponses.length-1?
					<React.Fragment>
					</React.Fragment>:
					<KeyboardArrowRightIcon onClick={()=>this.handleNextResponse()} style={{fontSize: 40,position:"absolute",top:"70%",right:"5%"}}/>
					}
				
				
			</React.Fragment>
		)
	}
}

export default VideoResponseContainer;