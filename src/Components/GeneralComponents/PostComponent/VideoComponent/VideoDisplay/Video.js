import React,{Component} from "react";

import styled from "styled-components";
import {  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton } from 'video-react';
import QierPlayer from 'qier-player';



const Container=styled.div`
	position:relative;
	width:900px;
	height:95%;
	background-color:black;
	borderRadius:5px;

`;

const OptionsContainer=styled.div`
	position:absolute;
	width:7%;
	height:75%;
	background-color:red;
	z-index:3;
	top:0%;
	left:90%;
`;



class Video extends Component{


	constructor(props){
		super(props);

		this.state={
			displayComments:false,
			seconds:0
		}
	}


displaySecondVideo=()=>{

	return this.state.displayComments==true?
			<ul style={{padding:"0px",position:"relative",zIndex:"5px"}}>

				<li style={{listStyle:"none",display:"inline-block",color:"yellow"}}>
					Testing

				</li>

				<li style={{listStyle:"none",display:"inline-block",color:"yellow"}}>
					Testign

				</li>
			</ul>:<React.Fragment></React.Fragment>


}
//Like,Dislike,Comment,Share,Promote
	render(){

		return(
			<Container>
				
			{this.displaySecondVideo()}

    			<video height="100%" width="100%" controls autoplay>
				    <source src="https://www.w3schools.com/tags/movie.mp4" codecs="avc1.42E01E, mp4a.40.2"/>
				</video>

				<OptionsContainer>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",marginBottom:"20px"}}>
							Like
						</li>

						<li style={{listStyle:"none",marginBottom:"20px"}}>
							Dislike
						</li>

						<li onClick={()=>this.setState({displayComments:true})} style={{listStyle:"none",marginBottom:"20px"}}>
							Comment
						</li>

						<li style={{listStyle:"none",marginBottom:"20px"}}>
							Share
						</li>

						<li style={{listStyle:"none"}}>
							Promote
						</li>
					</ul>

				</OptionsContainer>

			</Container>


		)
	}
}

export default Video;