import React, { Component } from "react";
import styled from "styled-components";
import { Tester } from "../SmallHomeContainer/SmallPosts.js";




const Container = styled.div`

	position:relative;
	width:100%;
	height:100%;
`;

const data = [

	{
		posttype:"regularpost"
	},
	{
		posttype:"image"
	},
	{
		posttype:"map"

	}
]

class MediumPostContainer extends Component{

	constructor(props){
		super(props);

		this.state={


		}
	}

	componentDidMount=()=>{

	}

	render(){

		return(
			<Container>

				<ul>
					{data.map(data =>
						<li style={{position:"relative",listStyle:"none",marginBottom:"20px",marginTop:"20px",left:"-65px"}}>
							<Tester
								postdata={data.posttype}
							/>

						</li>		
					)}
				</ul>

			</Container>
		)
	}
}

export default MediumPostContainer;