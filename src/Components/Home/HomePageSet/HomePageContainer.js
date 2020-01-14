import React , {Component} from "react";
import styled from "styled-components";
import { GeneralNavBar } from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import { connect } from "react-redux";
import HomeConext from "../HomeContext.js";
import ExplorePage from "../HomePageSubset/ExploreHomeFeed/ExplorePage/ExplorePage";
import PersonalPage from "../HomePageSubset/PersonalHomeFeed/PersonalizedPage";


const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:white;
	overflow-y:scroll;
	overflow-x:hidden;

`;


const PageIndicator=styled.div`
	position:absolute;
	background-color:blue;
	width:5%;
	height:20%;
	top:12%;
	left:2%;
	border-radius:5%;
	z-index:4;
`;


const Home=styled.div`
	position:absolute;
	top:12%; 
	width:85%;
	height:85%;
	background-color:blue;
	left:10%;

`;


class HomePageContainer extends Component{

	constructor(props){
		super(props);

		this.state={
			displayPersonalFeed:false,
			displayExplorerFeed:true

		}
	}

	displayPersonalOrExploreFeed=()=>{

		return this.state.displayExplorerFeed==true? 
			<ExplorePage/>:<PersonalPage/>
	}


	render(){


		return(
			<Container>
				<GeneralNavBar/>

				<PageIndicator>
					<ul>
						<li>    </li>
						<li>    </li>
					</ul>

				</PageIndicator>
				{this.displayPersonalOrExploreFeed()}

			</Container>
		)
	}
}

const mapStateToProps=()=>{


	return{

	}
}

const mapDispatchToPorps=dispatch=>{

	return {

	}
}


export default connect(
		mapStateToProps,
		mapDispatchToPorps
	)(HomePageContainer);