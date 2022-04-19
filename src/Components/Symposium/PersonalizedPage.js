import React,{Component} from "react";
import styled, {keyframes} from "styled-components";
import Chat from "./ChatRoom.js";
import { connect } from "react-redux";
import SubCommunities from "./SubCommunities";
import ActivePeopleModal from "./ActivePeopleModal";


 const keyFrameExampleTwo= keyframes`
  0% {
    width:100%;
	height:42%;
	left:0%;
	top:0px;
  }
  100% {
  	height:20%;
    width:100%;
  }
`;


const CommunityHeaderAnimation=styled.div`
	position:relative;
	background-color:red;
	width:400px;
	height:40%;
	paddding-left:5px;
	transition: transform 300ms ease-in-out;
	boxShadow: "1px 1px 1px 1px #d5d5d5";
	border-radius:5px;
	animation:${keyFrameExampleTwo} 1s ease-in-out 0s forwards;
`;

const Container=styled.div`
	position:relative;
	background: linear-gradient(to left, #9933ff 0%, #ff99ff 100%);
	width:100%;
	height:42%;
	paddding-left:5px;
	transition: transform 300ms ease-in-out;
	boxShadow: "1px 1px 1px 1px #d5d5d5";
	borderRadius:5px;
	z-index:2;
`;

const PopularContainer=styled.div`

	position:relative;
	width:40%;
	background-color:white;
	height:25%;
	top:70%;
	left:30%;
	border-radius:5px;
	padding:10px;

`;

const PopularVideos=styled.div`
	position:relative;
	width:80px;
	height:90%;
	background-color:red;
	border-radius:5px;
`;

const ActiveContainer =styled.div`
	position:relative;
	width:17%;
	height:50%;
	background-color:white;
	top:15%;
	left:80%;
	padding:5px;
	padding-top:10px;
	overflow:auto;

	-ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none;
`;


const ActiveProfilePictures=styled.div`
	position:relative;
	width:50px;
	height:25%;
	border-radius:50%;
	background-color:red;

`;


const PostsChatInformation=styled.div`
	position:relative;
	width:90%;
	height:50%;
	left:7%;
	z-index:2;
	background-color:white;
	overflow-y:auto;
	overflow-x:hidden;
	opacity:0;
  	transition:opacity 1s linear;
`;


const CommunityChoicesContainer=styled.div`
	position:relative;
	width:50%;
	height:20%;
	left:23%;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
	background-color:white;
	border-radius:5px;
	top:2%;
	padding:10px;
	overflow:hidden;
	

`;

const CommunityChoicesDiv=styled.div`
	position:relative;
	width:100%;
	height:70%;
	padding:10px;
	border-radius:5px;
	transition:.8s;
	border-style:solid;
	border-color:black;
	border-width:2px;
	overflow:hidden;

	&:hover{
		box-shadow: 1px 5px 5px 1px #d5d5d5;
	}
`;

const PostOptionsContainer=styled.div`
	position:absolute;
	width:15%;
	height:40%;
	background-color:white;
	border-radius:5px;
	top:5%;
	left:7%;
`;

const PostOptions=styled.div`

	position:relative;
	background-color:white;
	width:80%;
	top:5%;
	border-radius:5px;
	height:80%;

`;

const Option=styled.div`
	position:relative;
	background-color:white;
	border-radius:5px;
	width:60%;
	height:20%;
	border-style:solid;
	border-color:#5298F8;
	border-width:1px;
	text-align:center;
	margin-bottom:10px;
	transition:.8s;


	&:hover{
		background-color:#5298F8;
		color:white;

	}

`;


const BackgroundModalContainer= styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background: rgba(0, 0, 0, 0.5);
	z-index:3;

`;


const ChatContainer=styled.div`
	position:absolute;
	width:20%;
	height:80%;
	top:5%;
	left:78%;
	background-color:blue;
	border-radius:5px;
	overflow:visible;
		border-style:solid;
	border-width:1px;
	border-color:#5298F8;

`;

const SubCommunitiesContainer=styled.div`
	position:absolute;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:50%;
	z-index:3;
	left:30%;
	top:15%;


`;

const ActivePeopleContainer=styled.div`

	position:absolute;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:50%;
	z-index:3;
	left:30%;
	top:15%;
`;




const CommunityChoicesListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"20px",
	marginBottom:"50px",
	fontSize:"20px",
	padding:"10px",
	paddingRight:"20px"
}

const CommunityChoicesListCSSLast={
	display:"inline-block",
	listStyle:"none",
	marginRight:"50px",
	marginBottom:"50px",
	fontSize:"20px",
	padding:"10px"

}

const PostOptionCSS={

	display:"flex",
	listStyle:"none",
	marginBottom:"2px",
	fontSize:"20px",
	padding:"5px"

}

class PersonalizedPage extends Component{

	constructor(props){
		super(props);

		this.state={ 
			headerAnimation:false,
			popularVideos:[{},{},{},{}],
			activePeople:[{},{},{},{},{}],
			selectedCommunityTitle:"",
			communityCounter:0,
			communities:[],
			backgroundColor:"",
			untogglePostOptions:false,
			displayPopularVideos:false,
			displayModalPeopleActive:false,
			displayModalSubCommunities:false,
			subCommunities:[{
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
		]
	}
}

	  handleScroll=()=>{

	  	document.getElementById("postChatInformation").style.overflow="visible";
	  	if(this.state.headerAnimation==false){

	  		this.setState(prevState=>({
	  			...prevState,
	  			headerAnimation:true
	  		}))
	  	  }		
	  }

	  componentDidMount(){

	  		const postContainerElement=document.getElementById("postChatInformation");
	  		const headerContentsContainerElement=document.getElementById("headerContents");

		  		const communities=this.props.communities;
		  		let communityCounter=0;

		  		//Keep track of where you are at in the array of subcommuities

		  		for(var i=0;i<communities.length;i++){
		  			const community=communities[i];

		  			if(community.communityName==this.props.selectedCommunity.communityName){
		  				communityCounter=i;
		  				break;
		  			}
		  		}

			  	this.setState(prevState=>({
				  		...prevState,
				  		selectedCommunityTitle:this.props.selectedCommunity.communityName,
				  		communities:this.props.communities,
				  		communityCounter:communityCounter,
				  		backgroundColor:this.props.selectedCommunity.backgroundColor
			  		})
		  	)

			  	setTimeout(function(){
					postContainerElement.style.opacity="1";
					headerContentsContainerElement.style.opacity="1";

			  	},500);
	  }

	  handlePreviousCommunityButton=()=>{

	  	this.fadeOutInEffect();


	  	if(this.state.communityCounter!=0){

	  		const newCounter=this.state.communityCounter-1;
	  		const newCommunity=this.state.communities[newCounter];
	  		this.setState(prevState=>({
	  			...prevState,
	  			selectedCommunityTitle:newCommunity.communityName,
	  			backgroundColor:newCommunity.backgroundColor,
	  			communityCounter:newCounter
	  		}))
	  	}

	  }


	  fadeOutInEffect=()=>{

	  		document.getElementById("postChatInformation").style.opacity="0";
	  		document.getElementById("headerContents").style.opacity="0";

	  		setTimeout(function(){
	  			document.getElementById("postChatInformation").style.opacity="1";
			  	document.getElementById("headerContents").style.opacity="1";
	  		},1000);




	  }

	  handleNextCommunityButton=()=>{

	  		this.fadeOutInEffect();
	  		if((this.state.communityCounter+1)<this.state.communities.length){

	  		const newCounter=this.state.communityCounter+1;
	  		const newCommunity=this.state.communities[newCounter];
	  		this.setState(prevState=>({
	  			...prevState,
	  			selectedCommunityTitle:newCommunity.communityName,
	  			backgroundColor:newCommunity.backgroundColor,
	  			communityCounter:newCounter
	  		}))
	  	}
	  }

	  handleSeeAllPopularVideos=()=>{

	  	return this.state.displayPopularVideos==true?
	  		<React.Fragment>
	  			<BackgroundModalContainer onClick={()=>this.setState(prevState=>({...prevState,displayPopularVideos:false}))}/>
	  		</React.Fragment>:
	  		<React.Fragment>
	  		</React.Fragment>
	  }


	  handleHeaderContents=()=>{
	  	const counter=this.state.communityCounter;
	  	const previousCommunityTitle=counter>0?<p onClick={()=>this.handlePreviousCommunityButton()}>{this.state.communities[counter-1].communityName}</p>:<React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>;
	  	const nextCommunityTitle=counter==this.props.communities.length-1?<React.Fragment></React.Fragment>:<p onClick={()=>this.handleNextCommunityButton()}>{this.props.communities[counter+1].communityName}</p>;
	 

	  	return(
	  
	  			<div style={{position:"absolute",width:"100%",height:"100%",opacity:"0",transition:"opacity 2s linear"}} id="headerContents">

		  			<p id="communityContainer" style={{position:"absolute",left:"30%",top:"35%",fontSize:"60px",color:"white"}}>
		  				<b> 
			  				<ul>
			  					<li style={{listStyle:"none",display:"inline-block",fontSize:"40px",opacity:".5"}}>{previousCommunityTitle}</li>
			  					<li style={{listStyle:"none",display:"inline-block",fontSize:"40px"}}>&nbsp;&nbsp;&nbsp;&nbsp; {this.state.selectedCommunityTitle} &nbsp;&nbsp;&nbsp;&nbsp;</li>
			  					<li style={{listStyle:"none",display:"inline-block",fontSize:"40px",opacity:".5"}}>{nextCommunityTitle}</li>

			  				</ul>
		  				</b>
		  			</p>

		  			<p style={{position:"absolute",top:"60%",left:"30%",color:"white",fontSize:"20px"}}> <b>Popular Videos </b></p>
		  			<p style={{position:"absolute",top:"60%",left:"65%",color:"white",fontSize:"15px"}} onClick={()=>this.setState(prevState=>({...prevState,displayPopularVideos:true}))}> <b>See all </b></p>
			 		<PopularContainer>
			 			<ul>
			 				{this.state.popularVideos.map(data=>
			 					<li style={{listStyle:"none",display:"inline-block",marginRight:"30px"}}> 
			 						<PopularVideos>


			 						</PopularVideos>
			 					</li>
			 				)}
			 			</ul>

			 		</PopularContainer>

			 		<p style={{position:"absolute",top:"25%",left:"80%",color:"white",fontSize:"20px"}}> <b>Active People</b> </p>
			 		<p style={{position:"absolute",top:"25%",left:"95%",color:"white",fontSize:"15px"}} onClick={()=>this.setState(prevState=>({...prevState,displayModalPeopleActive:true}))}> <b>See all</b> </p>
			 		<ActiveContainer>

			 			<ul>
			 				{this.state.activePeople.map(data=>

			 						<li  style={{listStyle:"none",display:"inline-block",marginRight:"30px",marginBottom:"10px"}}>
			 							<ActiveProfilePictures>

			 							</ActiveProfilePictures>
			 						</li>
			 				)}
			 			</ul>
			 		</ActiveContainer>

		 		</div>
	  	)
	  }

	  handleSeeAllPeopleActiveModal=()=>{
	  	return this.state.displayModalPeopleActive==true?
	  		<React.Fragment>
	  			<BackgroundModalContainer onClick={()=>this.setState(prevState=>({...prevState,displayModalPeopleActive:false}))}/>

	  			<ActivePeopleContainer>
	  				<ActivePeopleModal
	  					peopleActive={this.state.activePeople}
	  				/>


	  			</ActivePeopleContainer>
	  		</React.Fragment>:
	  		<React.Fragment>
	  		</React.Fragment>
	  }

	  handleHeaderAnimatedContents=()=>{


	  	return (
	  		<React.Fragment>


	  		</React.Fragment>
	  	)
	  }

	  handleSubCommunitiesChoices=(props)=>{
	  }

	  handleSeeAllSubCommunities=()=>{

	  	return this.state.displayModalSubCommunities==true?
	  		<React.Fragment>
	  			<BackgroundModalContainer onClick={()=>this.setState(prevState=>({...prevState,displayModalSubCommunities:false}))}/>
	  			<SubCommunitiesContainer>
	  				<SubCommunities
	  					subCommunities={this.state.subCommunities}
	  					subCommunitiesChoices={this.handleSubCommunitiesChoices}
	  				/>

	  			</SubCommunitiesContainer>
	  		</React.Fragment>:
	  		<React.Fragment>
	  		</React.Fragment>
	  }


	  handleHeaderAnimation=()=>{
	  	const backgroundColor=this.state.backgroundColor;
	  	return this.state.headerAnimation==false ? 
	  		<Container id="headerContainer" style={{background:backgroundColor}}>
	  			{this.handleHeaderContents()}
	  		</Container>:
	  		<CommunityHeaderAnimation style={{background:backgroundColor}}>
	  			{this.handleHeaderAnimatedContents()}
	  		</CommunityHeaderAnimation>
	  }

	  changeOptionColors=(option)=>{

	  	/*
	  		Could be implementd in  better way
	  	*/
	  	const element=document.getElementById(option);
	  	if(element.style.color=="white"){

	  		element.style.color="black";
	  		element.style.backgroundColor="white";
	  		element.style.borderColor="#5298F8";

	  	}else{
	  		element.style.color="white";
	  		element.style.backgroundColor="#5298F8";

	  	}
	  }

	render(){


		return(
			<React.Fragment>
			
				{this.handleSeeAllSubCommunities()}
				{this.handleSeeAllPeopleActiveModal()}
				{this.handleSeeAllPopularVideos()}
				{this.handleHeaderAnimation()}
				

				<PostsChatInformation id="postChatInformation" onScroll={()=>this.handleScroll()}>
					<PostOptionsContainer>

						<ul style={{listStyle:"none"}}>
							<li><p style={{position:"relative",fontSize:"15px",left:"20%"}}><b>Post Options</b></p></li>
							<li>
								<PostOptions>
									<ul style={{listStyle:"none"}}>
										<li style={{PostOptionCSS}} key={1}><Option id="postOption" onClick={()=>this.changeOptionColors("postOption")}>Posts</Option></li>
										<li style={{PostOptionCSS}} key={2}><Option id="imageOption" onClick={()=>this.changeOptionColors("imageOption")}>Images</Option></li>
										<li style={{PostOptionCSS}} key={3}><Option id="videoOption" onClick={()=>this.changeOptionColors("videoOption")}>Videos</Option></li>
										<li style={{PostOptionCSS}} key={4}><Option id="blogOption" onClick={()=>this.changeOptionColors("blogOption")}>Blogs</Option></li>
									</ul>
								</PostOptions>
							</li>
						</ul>
					</PostOptionsContainer>

					<p style={{position:"relative",fontSize:"30px",left:"23%"}}><b>Categories</b></p>
					<CommunityChoicesContainer>

						<ul style={{textAlign:"center",overflow:"hidden",width:"90%"}}>

							{this.state.subCommunities.map(data=>
								<li style={CommunityChoicesListCSS}>
									<CommunityChoicesDiv style={{borderColor:data.color}}> {data.category} </CommunityChoicesDiv>
								</li>
							)}

						</ul>
						<p style={{position:"absolute",left:"90%",top:"10%",color:"#5298F8"}} onClick={()=>this.setState(prevState=>({...prevState,displayModalSubCommunities:true}))}>See all </p>
					</CommunityChoicesContainer>

					<ChatContainer id="chatContainer">
						<Chat/>
					</ChatContainer>

				</PostsChatInformation>
			</React.Fragment>
		)
	}
}


const mapStateToProps=(state)=>{

	return{

	}
}

const mapDispatchToProps=dispatch=>{
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonalizedPage);




