import React,{Component} from "react";
import styled, {keyframes} from "styled-components";
import { keyFrameExampleOne } from './KeyFrames';
import PersonalHomeFeed from "../../PersonalHomeFeed/PersonalizedPage";


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
    background: linear-gradient(to left, #9933ff 0%, #ff99ff 100%);
  }
`;


const CommunityContainerAnimation=styled.div`
	position:relative;
	background: linear-gradient(to left, #9933ff 0%, #ff99ff 100%);
	width:400px;
	height:40%;
	paddding-left:5px;
	transition: transform 300ms ease-in-out;
	boxShadow: "1px 1px 1px 1px #d5d5d5";
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
	boxShadow: "1px 1px 1px 1px #d5d5d5";
	border-radius:5px;

`;


const Container=styled.div`
	position:absolute;
	top:12%; 
	width:85%;
	height:85%;
	background-color:white;
	left:10%;
	padding:20px;

`;

const CommunitiesListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"50px",
	marginBottom:"50px"
		
	}

class ExplorePage extends Component{

	constructor(props){
		super(props);

		this.state={
			communities:[{
				communityName:"Acting"
			},{
				communityName:"Sports"
			},{
				communityName:"Walking"
			},{
				communityName:"Diving"
			}],
			tempcommunities:[{}],
			temp2communities:[{}],
			triggerAnimation:false,
			displayPersonalPage:false,
			displayInitialPage:true,
			triggerModalProps:{},
		}
	}

	componentDidMount(){

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
		return this.state.displayInitialPage==true ?
				<Container>
					<ul>
						{this.state.tempcommunities.map(data=>

							<li style={CommunitiesListCSS} key={data.tester}> 
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
		return this.state.triggerAnimation==true?<CommunityContainerAnimation><p>{data.tester} </p></CommunityContainerAnimation>:
			<CommunityContainer onClick={()=>this.handleDisplayPersonalizedPage(data)}><p>{data.tester} </p></CommunityContainer>;
	}

	render(){
		return(

			<React.Fragment>
				

				{this.displayCommunityList()}
				{this.displayPersonalizedPage()}
			</React.Fragment>


		)
	}
}

export default ExplorePage;