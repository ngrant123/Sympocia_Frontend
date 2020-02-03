import React,{Component} from "react";
import styled, {keyframes} from "styled-components";
import { keyFrameExampleOne } from './KeyFrames';
import PersonalHomeFeed from "../../PersonalHomeFeed/PersonalizedPage/PersonalizedPage.js";
import ExplorePageCommunities from "./ExplorePageCommunities";
import {connect} from "react-redux";
import {
			getCommunitiesNotFollowed
		} from "../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

 const keyFrameExampleTwo= keyframes`
  0% {
    width:400px;
	height:40%;
	left:0%;
	top:0px;
  }
  100% {
    height: 50%;
    top:-151px;
    left:-14%;
    width:101vw;
  }
`;

const CommunityContainerAnimation=styled.div`
	position:relative;
	background: linear-gradient(to left, #9933ff 0%, #ff99ff 100%);
	width:400px;
	height:40%;
	paddding-left:5px;
	transition: transform 300ms ease-in-out;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	border-radius:5px;
	animation:${keyFrameExampleTwo} 1s ease-in-out 0s forwards;
`;

const CommunityContainer=styled.div`
	position:relative;
	background: linear-gradient(to left, #9933ff 0%, #ff99ff 100%);
	width:400px;
	height:40%;
	paddding-left:5px;
	transition: transform 300ms ease-in-out;
	box-shadow: 10px 20px 20px  #BDBDBD;
	border-radius:5px;
	padding:10px;
`;


const Container=styled.div`
	position:absolute;
	top:12%; 
	width:85%;
	height:85%;
	left:10%;
	padding:20px;

`;

const PopularVideosContainer=styled.div`
	position:relative;
	width:80%;
	height:35%;
	background-color:red;
	border-radius:5px;

`;

const CommunitiesListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"50px",
	marginBottom:"50px"
		
	}

const CommunityContainerCSS={
	listStyle:"none"
}

class ExplorePage extends Component{

	constructor(props){
		super(props);

		this.state={
			communities:[{
				communityName:"Acting",
				backgroundColor:"linear-gradient(to right, #c6ffdf, #c9facc, #d0f4b9, #dbeda7, #e8e496, #f0d989, #f8cd7f, #ffc079, #ffae75, #ff9c74, #fd8a77, #f7797d)",
				popularVideos:[
					{
						videoUrl:""
					},
					{
						videoUrl:""
					}
				],
				key:1
			},{
				communityName:"Sports",
				backgroundColor:"linear-gradient(to right, #ff9933 0%, #ffff00 100%)",
				popularVideos:[
					{
						videoUrl:""
					}
				],
				key:2
			},{
				communityName:"Walking",
				backgroundColor:"linear-gradient(to right, #00ccff 0%, #00ffff 100%)",
				popularVideos:[
					{
						videoUrl:""
					},
					{
						videoUrl:""
					}
				],
				key:3

			},{
				communityName:"Diving",
				backgroundColor:"linear-gradient(to right, #ffff66 0%, #ffffcc 100%)",
				popularVideos:[
					{
						videoUrl:""
					},
					{
						videoUrl:""
					}
				],
				key:4
			}],
			tempcommunities:[{}],
			temp2communities:[{}],
			triggerAnimation:false,
			displayPersonalPage:false,
			displayInitialPage:true,
			triggerModalProps:{},
			backgroundColor:""
		}
	}

	componentDidMount(){

		/*
			Make api call
			const communities=getCommunitiesNotFollowed(this.props.id);

			this.setState(prevState=>({
				...prevState,
				tempcommunities:communities
			}))

		*/

		this.setState(prevState=>({
			...prevState,
			tempcommunities:this.state.communities
		}))
	}


	handleDisplayPersonalizedPage=(props)=>{
		

		const propObject={
			communites:this.state.communities,
			targetedCommunity:props
		}

		this.setState(prevState=>({
			...prevState,
			triggerAnimation:true,
			triggerModalProps:props,
			tempcommunities:this.state.temp2communities

		}),function(){
			this.triggerTimer();
			}
		);

	   this.displayAnimation(props);
	}

	displayAnimation=(props)=>{


		console.log(props);
		const backgroundColor=document.getElementById(props.key+"").style.background;
		this.setState(prevState=>({
			...prevState,
			backgroundColor:backgroundColor
		}))
	}

	

	triggerTimer=()=>{
		console.log("Timer start");
		setTimeout(function(){ 
			this.setState(prevState=>({
				...prevState,
				displayInitialPage:false,
				displayPersonalPage:true

			}))
			 }
			 .bind(this), 
			 2000);
	}

	displayCommunityList=()=>{

		console.log(this.state.tempcommunities);
		return this.state.displayInitialPage==true?
				<Container>
					<ul>	
						<li> Recoommended</li>
						<li> Recoommended</li>
						{this.state.tempcommunities.map(data=>
							<li style={CommunitiesListCSS} key={data.key}> 
								{this.displayCommunityAnimation(data)}
							 </li>
							)}
					</ul>
				</Container>:<React.Fragment></React.Fragment>
	}


	displayPersonalizedPage=()=>{

		return this.state.displayPersonalPage==true ? 
			<PersonalHomeFeed
				selectedCommunity={this.state.triggerModalProps}
				communities={this.state.communities}
			/>
		:<React.Fragment></React.Fragment>;
	}

	displayCommunityAnimation=(data)=>{
		console.log(data);

		if(this.state.triggerAnimation==true){
			const backgroundColor=this.state.backgroundColor;
			return <CommunityContainerAnimation style={{background:this.state.backgroundColor}}><p> </p></CommunityContainerAnimation>;
		}
		else{
			return <CommunityContainer id={data.key} style={{background:data.backgroundColor}} onClick={()=>this.handleDisplayPersonalizedPage(data)}>
						<ExplorePageCommunities
							communityData={data}
						/>
					</CommunityContainer>;
		}
	}

	render(){
		return(

			<React.Fragment>
				<p> Recommended </p>
				{this.displayCommunityList()}
				{this.displayPersonalizedPage()}				
			</React.Fragment>


		)
	}
}

const mapStateToProps=(state)=>{


	return {
		_id:state.personalInformation.id
	}
}


export default connect(
	mapStateToProps,
	null)(ExplorePage);