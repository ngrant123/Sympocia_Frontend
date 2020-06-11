import React,{Component} from "react";
import styled, {keyframes} from "styled-components";
import { keyFrameExampleOne } from './KeyFrames';
import PersonalHomeFeed from "../../PersonalHomeFeed/PersonalizedPage/PersonalizedPage.js";
import ExplorePageCommunities from "./ExplorePageCommunities";
import {connect} from "react-redux";
import {
			getCommunitiesNotFollowed
		} from "../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";
import CreatePostComponent  from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js"; 
import Checkbox from '@material-ui/core/Checkbox';
import {getSymposiumsExplore} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";

 const keyFrameExampleTwo= keyframes`
  0% {
    width:410px;
	height:40%;
	left:0%;
	top:0px;
  }
  100% {
    height: 55%;
    top:-430px;
    left:-25%;
    width:110vw;
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
	width:450px;
	height:50%;
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

const ListCommunities=styled.div`
	position:relative;
	width:80px;
	height:7%;
	background-color:white;
	border-radius:5px;
	padding:10px;
	margin-right:20px;
	box-shadow:1px 1px 5px #6e6e6e;
	color:#5298F8;
	overflow-x:hidden;
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

const DisplayRecommendedPageLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%",
	fontSize:"15px",
	width:"15%"
}


const ProfilePicture=styled.div`
	position:relative;
	width:45px;
	height:5%;
	background-color:black;
	border-radius:50%;
`;

const CommentTextArea=styled.textarea`
	position:relative;
	resize:none;
	border-style:none;
	height:5%;
	text-align:center;
	padding-top:10px;
	width:220%;
`;


/*
	The main point of the trigger animation method etc was because there was supposed to be an animation
	that happened when you clicked on a symposium but it all depending on view size and its just another 
	hassle that i dont want to deal with when creating the mvp so i'll just implement it later
*/


class ExplorePage extends Component{

	constructor(props){
		super(props);

		this.state={
			symposiums:[],
			temp2communities:[{}],
			triggerAnimation:false,
			displayPersonalPage:false,
			displayInitialPage:true,
			triggerModalProps:{},
			backgroundColor:"",
			mostPopularButtonColor:"#5298F8",
			popularCommunities:[{communityName:"Cats"},{communityName:"Poop"},{communityName:"Turtles"}],
			newestCommunities:[{communityName:"Lotion"},{communityName:"Dinosaur"}],
			popularOrNewCommunites:[],
			displayCreatePostComponent:false
		}
	}

	async componentDidMount(){
		/*
			Make api call
			const communities=getCommunitiesNotFollowed(this.props.id);

			this.setState(prevState=>({
				...prevState,
				symposiums:communities
			}))
		*/
		debugger;
		console.log(this.props);
		const{userInformation}=this.props;
		const {id,isPersonalPage}=userInformation;
		var symposiums;
		if(isPersonalPage==true){
			symposiums=await getSymposiumsExplore(id,PERSONAL_INDUSTRIES.INDUSTRIES);
		}else{

		}

		debugger;
		this.setState(prevState=>({
			...prevState,
			symposiums:symposiums,
			popularOrNewCommunites:this.state.popularCommunities
		}))
	}


	handleDisplayPersonalizedPage=(props)=>{

		this.setState(prevState=>({
			...prevState,
			triggerAnimation:true,
			triggerModalProps:props,
			symposiums:this.state.symposiums

		}),function(){
				this.triggerTimer();
			}
		);

	   //this.displayAnimation(props);
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
		debugger;
		setTimeout(function(){ 
			this.setState({
				displayInitialPage:false,
				displayPersonalPage:true

			})
		 }.bind(this));
	}

	changeColorForPopularButton=()=>{

		console.log("Change button");

		document.getElementById("popularButton").style.color="white";
		document.getElementById("popularButton").style.backgroundColor="#5298F8";

		document.getElementById("bestCommunitiesButton").style.color="#6e6e6e";
		document.getElementById("bestCommunitiesButton").style.backgroundColor="white";

		this.setState(prevState=>({
			...prevState,
			popularOrNewCommunites:this.state.popularCommunities
		}))
	}

	changeColorForNewestCommunitiesButton=()=>{

		document.getElementById("bestCommunitiesButton").style.color="white";
		document.getElementById("bestCommunitiesButton").style.backgroundColor="#5298F8";

		document.getElementById("popularButton").style.color="#6e6e6e";
		document.getElementById("popularButton").style.backgroundColor="white";

		this.setState(prevState=>({
			...prevState,
			popularOrNewCommunites:this.state.newestCommunities
		}))
	}

	handleCheckBoxCheck=()=>{
		console.log("Testeing check box check");
		console.log(this.props);
		this.props.displayGrids(true);
	}

	handleDisplayCreationPost=()=>{
		this.setState({

		})
	}

	displayCommunityList=()=>{
		console.log(this.state.symposiums);
		return this.state.displayInitialPage==true?
				<Container>
					<ul style={{listStyle:"none"}}>	
						{this.state.displayCreatePostComponent==true?
							<li style={{listStyle:"none",width:"70%",marginLeft:"20%",marginTop:"3%"}}>
								<CreatePostComponent/>
							</li>:
							<React.Fragment>
							</React.Fragment>}

						<li style={{marginBottom:"10px"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",fontSize:"40px",marginLeft:"30%",marginRight:"20%"}}>
									<b> Explore Communities</b> 
								</li>
								<li style={DisplayRecommendedPageLabelCSS}>
									<Checkbox
										style={{fontSize:20,color:"#5298F8"}}
										onChange={()=>this.handleCheckBoxCheck()}
									/>
									Click here to view a more recommeneded feed that will grow to your tastes
								</li>

							</ul>
						</li>
						<li style={{marginLeft:"20%",marginBottom:"20px",color:	"#6e6e6e",fontSize:"20px"}}> Browse Sympocias top growing communities that everyone seems to enjoy </li>
						<ul style={{marginBottom:"30px"}}>
							<li onClick={()=>this.changeColorForPopularButton()} id="popularButton"style={{display:"inline-block",marginLeft:"30%",fontSize:"15px",backgroundColor:"#5298F8",padding:"10px",color:"white",borderRadius:"5px",boxShadow:"1px 1px 5px #6e6e6e"}}>Most Popular</li>
							<li onClick={()=>this.changeColorForNewestCommunitiesButton()} id="bestCommunitiesButton" style={{color:"#6e6e6e",display:"inline-block",marginLeft:"10%",fontSize:"15px",boxShadow:"1px 1px 5px #6e6e6e",padding:"10px",borderRadius:"5px"}}>Newest Communities</li>
						</ul>
						<ul style={{marginLeft:"20%",padding:"20px",marginBottom:"20px",boxShadow:"1px 1px 5px #6e6e6e",borderRadius:"5px",width:"55%"}}>
							{this.state.popularOrNewCommunites.map(data=>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<ListCommunities>
										{data.communityName}
									</ListCommunities>
									 
								</li>
							)}
						</ul>
						<ul>
						{this.state.symposiums.map(data=>
							<li style={CommunitiesListCSS} key={data.key}> 
								{this.displayCommunityAnimation(data)}
							 </li>
						)}
						</ul>
					</ul>
				</Container>:<React.Fragment></React.Fragment>
	}


	displayPersonalizedPage=()=>{

		return this.state.displayPersonalPage==true ? 
			<PersonalHomeFeed
				selectedSymposium={this.state.triggerModalProps}
				symposiums={this.state.symposiums}
			/>
		:<React.Fragment></React.Fragment>;
	}

	displayCommunityAnimation=(data)=>{
		console.log(data);
			return <ExplorePageCommunities
							communityData={data}
							id={data.key}
							backgroundColor={data.backgroundColor}
							displayPersonalizedPage={this.handleDisplayPersonalizedPage}
						/>;
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

const mapStateToProps=(state)=>{


	return {
		_id:state.personalInformation.id
	}
}


export default connect(
	mapStateToProps,
	null)(ExplorePage);