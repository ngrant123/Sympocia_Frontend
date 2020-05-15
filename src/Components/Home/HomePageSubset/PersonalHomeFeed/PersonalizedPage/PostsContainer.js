import React,{Component} from "react";
import styled from "styled-components";
import { ScrollPage} from 'react-scrollpage';
import HotCategoriesContainer from "./HotCategoriesContainer";
import ImageContainer from "../../../../../Components/GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";
import RegularPostContainer from "../../../../../Components/GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import BlogPostContainer from "../../../../../Components/GeneralComponents/PostComponent/BlogComponent/BlogPostDisplay/BlogPostContainer.js";
import VideoPostContainer from "../../../../../Components/GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";
import ReactSnapScroll from 'react-snap-scroll';


const ExamplePosts=styled.div`
	position:relative;
	width:90%;
	height:70%;
	background-color:red;
	z-index:3;
`;

const Container=styled.div`
 
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  display: flex;


`;

const Section=styled.div`
scroll-snap-align: center;
`;

const Container1=styled.div`


	position:absolute;
	width:20%;
	height:30%;
	background-color:red;
`;

const Container2=styled.div`
	
	position:absolute;
	width:20%;
	height:30%;
	background-color:yellow;


`;
const Container3=styled.div`
	
	position:absolute;
	width:20%;
	height:30%;
	background-color:blue;


`;



class PostContainer extends Component{

	constructor(props){
		super(props);

		this.state={
			posts:[]
		}
	}

	componentDidMount(){
		/*
			Get posts from api call
		*/
	}

/*
	If there are no videos then you can scroll normally
	but once there are videos then use react snap scroll (?)



*/
	render(){

		 const options = {
		      curPage: 1,           // inital page number, most 1
		      totalPage: 5         // delay between two scoll animation
		    }

		return(
			<React.Fragment>

		{/*
			<ReactSnapScroll 
					transition="move-top-bottom"
					customDuration={"50000","50000"}
					>
			 			
		

			</ReactSnapScroll>
		*/}
			

			</React.Fragment>
		)
	}
}

export default PostContainer;