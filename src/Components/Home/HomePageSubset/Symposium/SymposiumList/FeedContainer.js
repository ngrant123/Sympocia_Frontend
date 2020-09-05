import React,{Component} from "react";
import styled,{keyframes} from "styled-components";
import CommunityContainer from "./CommunityContainer";
import Symposium from "../ExtendedSymposium/index.js"
import {getSymposiumsFollowedHome,getSymposiumsNotFollowed} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getFollowedSymposiumsCompanyHome} from "../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";


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

const CommunityContainerAnimationFollowed=styled.div`

	position:relative;
	width:70%;
	height:30%;
	transition: transform 300ms ease-in-out;
	border-radius:5px;
	animation:${keyFrame} 1s ease-in-out 0s forwards;
`;

const CommunityContainerAnimationExplore=styled.div`

	position:relative;
	width:70%;
	height:30%;
	transition: transform 300ms ease-in-out;
	border-radius:5px;
	animation:${keyFrame} 1s ease-in-out 0s forwards;
`;

const ExploreButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"30%"
}


/*
	For some reason the delayed animation that I have set up
	isnt triggering properly will have to fix that later but
	thats a minor issue at the moment





	Right now im passing in this.props.history so that it can push 
	directly to extended symposium but later on I should make this 
	page its standalone page 
*/ 

class PersonalFeedContainer extends Component{


	constructor(props){

		super(props);

		this.state={
			symposiumArray:[],
			triggerAnimation:false,
			selectedSymposium:{},
			displaySymposiumPage:false,
			triggerExploreAnimation:false,
			isLoading:true
		}
	}

	//Find a better way of doing this
	async componentDidMount(){
		try{
			console.log(this.props);
			const {isPersonalProfile,profileId}=this.props;
			var symposiumsResponse;

			if(isPersonalProfile==true){
				symposiumsResponse=await getSymposiumsFollowedHome(profileId);
			}else{
				symposiumsResponse=await getFollowedSymposiumsCompanyHome(profileId);
			}
			console.log(symposiumsResponse);
			debugger;
			var symposiums=[];
			if(symposiumsResponse.length>0){
				for(var i=0;i<symposiumsResponse.length;i++){
					const specificCommunity=symposiumsResponse[i];
					const newTimer=100*i;
					await this.timerFunction(newTimer);

					symposiums.push(specificCommunity);

					this.setState(prevState=>({
						...prevState,
						symposiumArray:symposiums,
						isPersonalProfile:isPersonalProfile,
						isLoading:false
					}));
				}
			}else{
				this.setState(prevState=>({
					...prevState,
					symposiumArray:symposiums,
					isPersonalProfile:isPersonalProfile,
					isLoading:false
				}));	
			}
			
		}catch(err){
			console.log(err.message);
		}
	}

	timerFunction=(seconds)=>{
		return new Promise(resolve => setTimeout(resolve, seconds));
	}

	changeColorForFastestGrowingButton=()=>{
		document.getElementById("fastestGrowingButton").style.color="white";
		document.getElementById("fastestGrowingButton").style.backgroundColor="#5298F8";

		document.getElementById("mostPopularButton").style.color="#6e6e6e";
		document.getElementById("mostPopularButton").style.backgroundColor="white";

		this.setState(prevState=>({
			...prevState,
			popularOrNewCommunites:this.state.newestCommunities
		}))
	}

	changeColorForPopularButton=()=>{

		console.log("Change button");

		document.getElementById("mostPopularButton").style.color="white";
		document.getElementById("mostPopularButton").style.backgroundColor="#5298F8";

		document.getElementById("fastestGrowingButton").style.color="#6e6e6e";
		document.getElementById("fastestGrowingButton").style.backgroundColor="white";

		this.setState(prevState=>({
			...prevState,
			popularOrNewCommunites:this.state.popularCommunities
		}))
	}

	handleSymposiumClick=(data)=>{
		var symposiums=[];
		console.log(data);
		debugger;
		for(var i=0;i<this.state.symposiumArray.length;i++){
			const currentSymposium=this.state.symposiumArray[i];
			if(currentSymposium.symposium!=data.symposium){
				symposiums.push(currentSymposium);
			}
		}

		this.props.routerHistory.push({
		  pathname:`/symposium/${data.symposium}`,
		  state: {
		  	selectedSymposium:data,
			symposiums:symposiums,
			profileId:this.props.profileId
		  }
		});
	}

	displayFollowSymposiums=async()=>{

		const followingSymposiumButton=document.getElementById("followedSymposiumsButton");
		const exploreSymposiumsButton=document.getElementById("exploreSymposiumsButton");

		var explorePosts=[];
	
		followingSymposiumButton.style.color="#151518";
		exploreSymposiumsButton.style.color="#999999";

		explorePosts=await getSymposiumsFollowedHome(this.props.profileId);
		debugger;
		this.setState({
			symposiumArray:(explorePosts.length==0?[]:explorePosts),
			isLoading:false
		})
	}

	displayExploreSymposiums=async()=>{
		const followingSymposiumButton=document.getElementById("followedSymposiumsButton");
		const exploreSymposiumsButton=document.getElementById("exploreSymposiumsButton");
		var explorePosts=[];


		followingSymposiumButton.style.color="#999999";
		exploreSymposiumsButton.style.color="#151518";

		if(this.props.isPersonalProfile==true){
			explorePosts=await getSymposiumsNotFollowed(this.props.profileId);
			debugger;
		}
		this.setState({
			symposiumArray:(explorePosts.length==0?[]:explorePosts),
			isLoading:false
		})
	}


	 TransitionAnimationTrigger=()=>{
	 	console.log("Tester");
	 	if(this.state.triggerAnimation==true)
			this.triggerAnimation();

	 	return this.state.triggerAnimation==false?
	 		<ul style={{position:"relative",paddingTop:"10%"}}>
	 			<ul style={{position:"relative",left:"20%",marginBottom:"30px"}}>
					<li style={{listStyle:"none",marginBottom:"2%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>this.displayFollowSymposiums()} id="followedSymposiumsButton" style={{display:"inline-block",listStyle:"none",fontSize:"40px",marginRight:"5%"}}>
											<b>My symposiums</b>
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>this.displayExploreSymposiums()} id="exploreSymposiumsButton" style={{color:"#999999",display:"inline-block",listStyle:"none",fontSize:"40px",marginLeft:"5%"}}>
											<b>Explore Symposiums</b>
										</li>
									</a>
								</ul>
							</li>
							<hr/>
							<li onClick={()=>this.changeColorForPopularButton()} id="mostPopularButton" style={{display:"inline-block",listStyle:"none",padding:"10px",backgroundColor:"#5298F8",color:"white",boxShadow:"1px 1px 5px #6e6e6e",marginRight:"10px",borderRadius:"5px"}}>Most Popular</li>
							<li onClick={()=>this.changeColorForFastestGrowingButton()} id="fastestGrowingButton" style={{display:"inline-block",listStyle:"none",padding:"10px",backgroundColor:"white",color:"#6e6e6e",boxShadow:"1px 1px 5px #6e6e6e",marginRight:"5px",borderRadius:"5px"}}>Fastest Growing</li>
						</ul>
					</li>
					<li style={{listStyle:"none",width:"30%"}}>
						Go back and check out the newest posts in the symposiums you follow. 
					</li>
				</ul>
				{this.state.isLoading==false && this.state.symposiumArray.length==0?
						<li style={{listStyle:"none",marginLeft:"30%"}}>
							<ul>
								<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
									<img src={StampIcon} style={{borderRadius:"50%",width:"95%",height:"20%"}}/>
								</li>
								<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none"}}>
											<p> Unfortunately, we noticed that you arent following any symposiums  </p>
											<p> Click the explore button below to search and find news ones  </p>
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.displayExploreSymposiums()} style={ExploreButton}>
												Explore
											</li>
										</a>
									</ul>
								</li>
							</ul>
						</li>:
					<React.Fragment>
						{this.state.symposiumArray.map(data=>
							<li style={{paddingBottom:"40px",listStyle:"none"}}>
								<CommunityContainerAnimationFollowed>
									<CommunityContainer
										data={data}
										isPersonalProfile={this.props.isPersonalProfile}
										handleSymposiumClickHandler={this.handleSymposiumClick}
									/>
								</CommunityContainerAnimationFollowed>
							</li>
						)}
					</React.Fragment>
				}
			{/*
				{this.state.triggerFollowAnimation==true?
					<React.Fragment>
						{this.state.symposiumArray.map(data=>
							<li style={{paddingBottom:"40px",listStyle:"none"}}>
								<CommunityContainerAnimationFollowed onClick={()=>this.handleSymposiumClick(data)}>
									<CommunityContainer
										data={data}
										isPersonalProfile={this.props.isPersonalProfile}
									/>
								</CommunityContainerAnimationFollowed>
							</li>
						)}
					</React.Fragment>:
					<React.Fragment>
								{this.state.symposiumArray.map(data=>
									<li style={{paddingBottom:"40px",listStyle:"none"}}>
										<CommunityContainerAnimationExplore onClick={()=>this.handleSymposiumClick(data)}>
											<CommunityContainer
												data={data}
												isPersonalProfile={this.props.isPersonalProfile}
											/>
										</CommunityContainerAnimationExplore>
									</li>
								)}
					</React.Fragment>
				}
			*/}		
			</ul>:
				<CommunityTransitionAnimation style={{background:this.state.selectedSymposium.backgroundColor}}>
				</CommunityTransitionAnimation>
	}

	triggerAnimation=()=>{

		setTimeout(()=>{
			this.setState(prevState=>({
				...prevState,
				displaySymposiumPage:true
			}))
		},1300);
	}

	displaySymposiumPage=()=>{
		console.log(this.state.selectedSymposium);

		return this.state.displaySymposiumPage==true?
			<Symposium
				selectedSymposium={this.state.selectedSymposium}
				symposiums={this.state.symposiums}
			/>:
			<React.Fragment></React.Fragment>
	}

	render(){
		return(
			<React.Fragment>
				{this.displaySymposiumPage()}
				{this.TransitionAnimationTrigger()}
			</React.Fragment>
		)
	}

}

export default PersonalFeedContainer;