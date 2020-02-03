import React,{Component} from "react";
import styled,{keyframes} from "styled-components";
import CommunityContainer from "./CommunityContainer";
import PersonalizedPage from "../PersonalizedPage/PersonalizedPage"



 const keyFrameExampleThree= keyframes`
  0% {
  	top:10%;
  	left:20%
	width:70%;
	height:30%;
  }
  100% {
  	top:0%;
  	left:0%;
    height: 40%;
    width:100%;
  }
`;


 const keyFrame= keyframes`
  0% {
	left:110%;
  }
  100% {
    left:20%;

  }
`;

 const keyFrameOnClick= keyframes`
  0% {
	left:110%;
  }
  100% {
  	top:0%;
  	width:100%;
    left:0%;

  }
`;


const CommunityTransitionAnimation=styled.div`
	position:relative;
	background-color:red;
	width:70%;
	height:30%;
	transition: transform 300ms ease-in-out;
	border-radius:5px;
	z-index:1;
	animation:${keyFrameExampleThree} 1s ease-in-out 0s forwards;
`;
const CommunityContainerAnimation=styled.div`

	position:relative;
	width:70%;
	height:30%;
	transition: transform 300ms ease-in-out;
	border-radius:5px;
	animation:${keyFrame} 1s ease-in-out 0s forwards;
`;


class PersonalFeedContainer extends Component{


	constructor(props){

		super(props);

		this.state={
				communities:[
					{
						communityName:"Anime",
						backgroundColor:"linear-gradient(to left, #9933ff 0%, #ff99ff 100%)",
						popularVideos:[
							{
								videoUrl:""
							},
							{
								videoUrl:""
							}
						],
						color:"#9933ff",
						key:1
					},
			{

				communityName:"Dogs",
						backgroundColor:"linear-gradient(to left, #8E2DE2 0%, #4A00E0 100%)",
						popularVideos:[
							{
								videoUrl:""
							},
							{
								videoUrl:""
							}
						],
						color:"#8E2DE2",
						key:2

			}],
			communityArray:[],
			triggerAnimation:false,
			selectedCommunity:{},
			displayPersonalizedPage:false
		}
	}

	//Find a better way of doing this
	async componentDidMount(){

		try{
			/*
				Make api call 
				const communities=getCommunitiesFollowed(this.props.profileId);

				this.setState(...prevState,({
					...prevState,
					communities:communities
				}))
			*/

			for(var i=0;i<this.state.communities.length;i++){

				const community=this.state.communityArray;
				const specificCommunity=this.state.communities[i];
				const newTimer=100*i;
				await this.timerFunction(newTimer);

				community.push(specificCommunity);

				this.setState(prevState=>({
					...prevState,
					communityArray:community
				}))
			}
		}catch(err){
			console.log(err.message);
		}
	}

	timerFunction=(seconds)=>{
		return new Promise(resolve => setTimeout(resolve, seconds));
	}


	 TransitionAnimationTrigger=()=>{
	 	console.log("Tester");
	 	if(this.state.triggerAnimation==true)
			this.triggerAnimation();

	 	return this.state.triggerAnimation==false?
	 		<ul style={{paddingTop:"10%"}}>
					{this.state.communityArray.map(data=>
						<li style={{paddingBottom:"40px",listStyle:"none"}}>
							<CommunityContainerAnimation onClick={()=>this.setState(prevState=>({
																					...prevState,
																					triggerAnimation:true,
																					selectedCommunity:data
																		}))}>
								<CommunityContainer
									data={data}
								/>
							</CommunityContainerAnimation>
						</li>
					)}
			</ul>:
				<CommunityTransitionAnimation style={{background:this.state.selectedCommunity.backgroundColor}}>
				</CommunityTransitionAnimation>
	}

	triggerAnimation=()=>{

		setTimeout(()=>{
			this.setState(prevState=>({
				...prevState,
				displayPersonalizedPage:true
			}))
		},1300);
	}

	displayPersonalizedPage=()=>{
		console.log(this.state.selectedCommunity);

		return this.state.displayPersonalizedPage==true?
			<PersonalizedPage
				selectedCommunity={this.state.selectedCommunity}
				communities={this.state.communities}
			/>:
			<React.Fragment></React.Fragment>
	}

	render(){
		return(
			<React.Fragment>

				{this.displayPersonalizedPage()}
				{this.TransitionAnimationTrigger()}
			</React.Fragment>
		)
	}

}

export default PersonalFeedContainer;