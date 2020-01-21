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
	background-color:white;
	width:5%;
	height:20%;
	top:12%;
	left:2%;
	border-radius:5%;
	z-index:4;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
`;


const PersonalPageIndicator=styled.div`
	position:absolute;
	background-color:white;
	width:5%;
	height:10%;
	top:23%;
	left:8%;
	border-radius:5%;
	z-index:4;
	box-shadow: 1px 1px 1px 1px #d5d5d5;


`;

const Home=styled.div`
	position:absolute;
	top:12%; 
	width:85%;
	height:85%;
	background-color:blue;
	left:10%;

`;

const ExploreIcon=styled.div`
	position:relative;
	width:50px;
	height:30%;
	left:-80%;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;


`;

const ForYouIcon=styled.div`
	position:relative;
	width:50px;
	height:30%;
	left:-80%;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;

`;

const FollowedForYouPageIcon=styled.div`
	position:relative;
	width:50px;
	height:30%;
	left:-80%;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;



`;

const CustomizedForYouPageIcon=styled.div`
	position:relative;
	width:50px;
	height:30%;
	left:-80%;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;


`;


class HomePageContainer extends Component{

	constructor(props){
		super(props);

		this.state={
			displayPersonalFeed:false,
			displayExplorerFeed:true,
			displayForYourChoices:false

		}
	}

	displayPersonalOrExploreFeed=()=>{

		return this.state.displayExplorerFeed==true? 
			<ExplorePage/>:<PersonalPage/>
	}

	handleDisplayForYouChoices=()=>{
	
		if(this.state.displayForYourChoices==false){
			this.setState(prevState=>({
				...prevState,
				displayForYourChoices:true
			}))
		}else{
				this.setState(prevState=>({
				...prevState,
				displayForYourChoices:false
			}))

		}
			

	}

	handleDisplayHideForYouChoices=()=>{

		this.setState(prevState=>({
				...prevState,
				displayForYourChoices:false
			}))
	}

	displayForYouChoices=()=>{

		return this.state.displayForYourChoices==true?
			<PersonalPageIndicator>
				<ul>	
					<li style={{listStyle:"none",marginBottom:"10px",marginTop:"10px"}}>
						<FollowedForYouPageIcon>

						</FollowedForYouPageIcon>
					</li>
					<li style={{listStyle:"none"}}>
						<CustomizedForYouPageIcon>

						</CustomizedForYouPageIcon>

					</li>
				</ul>
			</PersonalPageIndicator>:<React.Fragment></React.Fragment>
	}
	render(){
		return(
			<Container>
				<GeneralNavBar/>

				<PageIndicator>
					<ul>
						<li style={{listStyle:"none",marginBottom:"30px",marginTop:"10px"}} onClick={()=>this.handleDisplayHideForYouChoices()}>
							<ExploreIcon>
								<p style={{fontSize:"10px"}}>Explore </p>
							</ExploreIcon>
						</li>
						<li style={{listStyle:"none"}} onClick={()=>this.handleDisplayForYouChoices()}>
							<ForYouIcon>
								<p style={{fontSize:"10px"}}>For you</p>
							</ForYouIcon>
						</li>

						{/*
							Home for you like for what you subscribed
							and something like a mix between what you already like and what you may like
						*/}
					</ul>
				</PageIndicator>

				{this.displayForYouChoices()}
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