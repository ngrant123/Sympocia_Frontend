import React,{Component} from "react";
import styled,{keyframes} from "styled-components";
import CommunityContainer from "./CommunityContainer";
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
						category:"Anime",
						backgroundColor:"linear-gradient(to left, #9933ff 0%, #ff99ff 100%)",
						color:"#9933ff",
						key:1
					},
			{
				category:"Dogs",
				backgroundColor:"linear-gradient(to left, #8E2DE2 0%, #4A00E0 100%)",
				color:"#8E2DE2",
				key:2
			},
			{category:"Cats",backgroundColor:"linear-gradient(to left, #ee9ca7 0%, #ffdde1 100%)",color:"#ee9ca7",
				key:3},
			{category:"Terminates",backgroundColor:"linear-gradient(to left, #b92b27 0%, #1565C0 100%)",color:"#b92b27",
				key:4},
			{category:"Coding",backgroundColor:"linear-gradient(to left, #f953c6 0%, #b91d73 100%)",color:"#f953c6",
				key:5}
			],
			communityArray:[]
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

	render(){
		return(
			<React.Fragment>
				<ul style={{paddingTop:"10%"}}>
					{this.state.communityArray.map(data=>
						<li style={{paddingBottom:"40px",listStyle:"none"}}>
							<CommunityContainerAnimation>
								<CommunityContainer
									data={data}
								/>
							</CommunityContainerAnimation>
						</li>
					)}
				</ul>

			</React.Fragment>

		)
	}

}

export default PersonalFeedContainer;