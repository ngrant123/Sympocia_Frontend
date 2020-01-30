import React,{Component} from "react";
import styled from "styled-components";
import { ScrollPage, Section } from 'react-scrollpage';
import HotCategoriesContainer from "./HotCategoriesContainer";


const ExamplePosts=styled.div`
	position:relative;
	width:90%;
	height:70%;
	background-color:red;
	z-index:3;
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

	render(){

		 const options = {
		      curPage: 1,           // inital page number, most 1
		      totalPage: 4,         // totoal page number
		      delay: 500           // delay between two scoll animation
		    }

		return(
			<React.Fragment>
			 <ScrollPage {...options}>
			 	<ul style={{listStyle:"none"}}>
			 		<li>
			 			<Section>
						<ExamplePosts>

						</ExamplePosts>
						</Section>

					
			 		</li>

			 		<li>
			 		<Section>
					<ExamplePosts>

					</ExamplePosts>
					</Section>

			 		</li>

			 		<li>
			 			<Section>
			 				<HotCategoriesContainer/>
			 			</Section>


			 		</li>

			 	<li>
			 		<Section>
					<ExamplePosts>

					</ExamplePosts>
					</Section>

					
			 	</li>




			 	</ul>
		

 			</ScrollPage> 
			

			</React.Fragment>
		)
	}
}

export default PostContainer;