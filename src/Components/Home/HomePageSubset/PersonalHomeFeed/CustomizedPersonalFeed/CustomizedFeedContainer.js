import React,{Component} from "react";
import styled from "styled-components";
import Recommendation from "./RecommendedContainer.js";


const RecommendedContainer=styled.div`
	position:absolute;
	top:13%;
	width:80%;
	height:27%;
	left:15%;
	border-radius:5px;
	padding-left:10px;
	box-shadow: 10px 10px 10px 1px black;
`;

const ColorTextChangeCSS={
	color:"black"
}

class CustomizedFeedContainer extends Component{

	constructor(props){
		
		super(props);

		this.state={
			videos:[{},{},{}]
		};
	}
	render(){
		return(
			<React.Fragment>
				<RecommendedContainer>
					<Recommendation/>

				</RecommendedContainer>

					<ul>
						{this.state.videos.map(data=>
							<li style={{listStyle:"none"}}>

							</li>
						)}

					</ul>

			</React.Fragment>

		)
	}

}

export default CustomizedFeedContainer;