import React , {Component} from "react";
import styled from "styled-components";
import {GeneralNavBar} from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import { connect } from "react-redux";
import HomeConext from "../HomeContext.js";
import ExplorePage from "../HomePageSubset/ExploreHomeFeed/ExplorePage/ExplorePage";
import PersonalFeed from "../HomePageSubset/PersonalHomeFeed/PersonalFeed/PersonalFeedContainer";
import CustomizedFeed from "../HomePageSubset/PersonalHomeFeed/CustomizedPersonalFeed/CustomizedFeedContainer";
import ChatPageContainer from "../../GeneralComponents/ChatComponent/ChatContainerSet/ChatContainer.js";
import SearchExploreScreen from "../HomePageSubset/SearchExplorePage/SearchExploreSet/index.js";

import ExploreIcon from '@material-ui/icons/Explore';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AssistantIcon from '@material-ui/icons/Assistant';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';

const Container=styled.div`
	position:absolute;
	width:100%;
	padding:10px;
	height:100%;
	background-color:white;
	overflow-y:scroll;
	transition:.8s;
	overflow-x:hidden;
	overflow-y:scroll;
`;


const PageIndicator=styled.div`
	position:absolute;
	width:5%;
	height:20%;
	top:7%;
	left:2%;
	border-radius:5%;
	z-index:4;
`;


const PersonalPageIndicator=styled.div`
	position:absolute;
	height:40%;
	top:30%;
	left:10%;
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

const ExploreIconContainer=styled.div`
	position:relative;
	width:70px;
	left:-80%;
	border-radius:5px;
	background-color:white;
	padding:10px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const ForYouIconContainer=styled.div`
	position:relative;
	width:70px;
	left:-80%;
	border-radius:5px;
	background-color:white;
	padding:10px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const FollowedForYouPageIcon=styled.div`
	position:relative;
	width:70px;
	padding-left:5px;
	left:-80%;
	border-radius:5px;

	background-color:white;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const CustomizedForYouPageIcon=styled.div`
	position:relative;
	padding-left:5px;
	left:-80%;

	background-color:white;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;


class HomePageContainer extends Component{

	constructor(props){
		super(props);

		this.state={
			displayPersonalFeed:false,
			displayExplorerFeed:true,
			displayCustomizedFeed:false,
			displayForYourChoices:false,
			profileId:0,
			displayChatPage:false,
			chatPageIndicator:""
		}
	}

	componentDidMount(){

		/*
			

		*/
	}

	displayPersonalOrExploreFeed=()=>{

		if(this.state.displayCustomizedFeed==true){


			return <CustomizedFeed/>
		}else if(this.state.displayPersonalFeed==true){	
			return <PersonalFeed/>	
		}
		else{
			return <ExplorePage/>;
		}
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
//Could be implemented in a better way

	handleDisplayCustomizedForYouPage=()=>{

		document.getElementById('container').style.backgroundColor="#222222";

		this.setState(prevState=>({
					 ...prevState,
					displayPersonalFeed:false,
					displayExplorerFeed:false,
					displayCustomizedFeed:true}))
	}

	handleDisplayFollowedCommunitiesPage=()=>{

		document.getElementById('container').style.backgroundColor="white";

		this.setState(prevState=>({
					 ...prevState,
					 displayPersonalFeed:true,
					 displayExplorerFeed:false,
					 displayCustomizedFeed:false}))
	}


	handleDisplayExplorePage=()=>{

		document.getElementById('container').style.backgroundColor="white";

		this.setState(prevState=>({
						...prevState,
						displayPersonalFeed:false,
						displayExplorerFeed:true,
						displayForYourChoices:false,
						displayCustomizedFeed:false}))


	}
	displayForYouChoices=()=>{

		return this.state.displayForYourChoices==true?
			<PersonalPageIndicator>
				<ul>	
					<li style={{listStyle:"none",marginBottom:"20px",marginTop:"10px"}}>
						<FollowedForYouPageIcon onClick={()=>this.handleDisplayFollowedCommunitiesPage()}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginLeft:"20%"}}>
									<AssistantIcon
										style={{fontSize:30}}
									/>	
								</li>

								<li style={{listStyle:"none",fontSize:"10px",marginLeft:"20%"}}>
									Following
								</li>

							</ul>
						</FollowedForYouPageIcon>
					</li>
					<li style={{listStyle:"none"}}>
						<CustomizedForYouPageIcon onClick={()=>this.handleDisplayCustomizedForYouPage()}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginLeft:"20%"}}>
									<YoutubeSearchedForIcon
										style={{fontSize:30}}
									/>	
								</li>

								<li style={{listStyle:"none",fontSize:"10px"}}>
									Recommended
								</li>

							</ul>
						</CustomizedForYouPageIcon>

					</li>
				</ul>
			</PersonalPageIndicator>:<React.Fragment></React.Fragment>
	}

	displayChatPage=(pageIndicator)=>{

		this.setState(prevState=>({

			...prevState,
			displayChatPage:true,
			chatPageIndicator:pageIndicator
		}))
	}

	hideChatPage=()=>{
		this.setState(prevState=>({

			...prevState,
			displayChatPage:false
		}))

	}

	chatPage=()=>{
		console.log(this.state.displayChatPage);
		return this.state.displayChatPage==true?
			<ChatPageContainer
				pageIndicator={this.state.chatPageIndicator}
				hideChatContainer={this.hideChatPage}
			/>:<React.Fragment></React.Fragment>
	}

	render(){
		return(
			<Container id="container">
				<GeneralNavBar
					displayChatPage={this.displayChatPage}
					page={"Home"}
				/>

				{this.chatPage()}
				<PageIndicator>
					<ul>
						<li style={{listStyle:"none",marginBottom:"30px",marginTop:"10px"}}>
						
							<ExploreIconContainer onClick={()=>this.handleDisplayExplorePage()}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<ExploreIcon
											style={{fontSize:50}}
										/>
									</li>

									<li style={{listStyle:"none"}}>
										Explore
									</li>
								</ul>
							</ExploreIconContainer>

						</li>
						<li style={{listStyle:"none"}} onClick={()=>this.handleDisplayForYouChoices()}>
							<ForYouIconContainer>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<PersonPinIcon
											style={{fontSize:50}}
										/>
									</li>

									<li style={{listStyle:"none"}}>
										For You
									</li>
								</ul>
							</ForYouIconContainer>
						</li>

						{/*
							Home for you like for what you subscribed
							and something like a mix between what you already like and what you may like
						*/}
					</ul>
				</PageIndicator>
				{this.props.displaySearch==null?
					<SearchExploreScreen/>:
					<React.Fragment>
						{this.displayForYouChoices()}
						{this.displayPersonalOrExploreFeed()}
					</React.Fragment>
				}

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