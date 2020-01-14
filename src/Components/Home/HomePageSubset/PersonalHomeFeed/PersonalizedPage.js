import React,{Component} from "react";
import styled, {keyframes} from "styled-components";
import Chat from "./ChatRoom.js";
import { connect } from "react-redux";

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
    background: orange;
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
	height:20%;
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
	border-radius:5px;
	padding:5px;
	padding-top:10px;
	overflow-y:scroll;
`;


const ActiveProfilePictures=styled.div`
	position:relative;
	width:50px;
	height:20%;
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
	overflow-y:scroll;
	overflow-x:hidden;
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
	overflow-y:hidden;
	

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


const CommunityChoicesListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"50px",
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

		console.log(props);
		this.state={ 
			headerAnimation:false,
			popularVideos:[{},{},{},{}],
			activePeople:[{},{},{},{}],
			selectedCommunityTitle:"",
			communityCounter:0,
			communities:[],
			subCommunities:[{
				category:"Anime"
			},
			{
				category:"Dogs"
			},
			{category:"Cats"},{category:"Terminates"},{category:"Coding"},{category:"Cars"},{
				category:"Anime"
			},
			{
				category:"Dogs"
			},
			{category:"Cats"},{category:"Terminates"},{category:"Coding"},{category:"Cars"},{
				category:"Anime"
			},
			{
				category:"Dogs"
			},
			{category:"Cats"},{category:"Terminates"},{category:"Coding"},{category:"Cars"},{
				category:"Anime"
			},
			{
				category:"Dogs"
			},
			{category:"Cats"},{category:"Terminates"},{category:"Coding"},{category:"Cars"}]
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
	  		
	  		/*
				Could be done in a better way

	  		*/

	  		console.log(this.props);
	  		const communities=this.props.communities;
	  		let communityCounter=0;
	  		console.log(this.props.selectedCommunity.communityName);

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
		  		communityCounter:communityCounter
		  		})
		  	)
	  }

	  handlePreviousCommunityButton=()=>{

	  	if(this.state.communityCounter!=0){

	  		const newCounter=this.state.communityCounter-1;
	  		const newCommunity=this.state.communities[newCounter];

	  		/*
				make an api call here
	  		*/
	  		this.setState(prevState=>({
	  			...prevState,
	  			selectedCommunityTitle:newCommunity.communityName,
	  			communityCounter:newCounter
	  		}))
	  	}
	  }

	  handleNextCommunityButton=()=>{
	  		if((this.state.communityCounter+1)<this.state.communities.length){

	  		const newCounter=this.state.communityCounter+1;
	  		const newCommunity=this.state.communities[newCounter];

	  		/*
				make an api call here
	  		*/
	  		this.setState(prevState=>({
	  			...prevState,
	  			selectedCommunityTitle:newCommunity.communityName,
	  			communityCounter:newCounter
	  		}))
	  	}



	  }
	  handleHeaderContents=()=>{

	  	return(
	  		<React.Fragment>

	  			<p style={{position:"absolute",left:"35%",top:"35%",fontSize:"60px",color:"white"}}>
	  				<b>
		  				<ul>
		  					<li style={{listStyle:"none",display:"inline-block"}}><p onClick={()=>this.handlePreviousCommunityButton()}> &lt; </p> </li>
		  					<li style={{listStyle:"none",display:"inline-block"}}>&nbsp;&nbsp;&nbsp;&nbsp; {this.state.selectedCommunityTitle} &nbsp;&nbsp;&nbsp;&nbsp;</li>
		  					<li style={{listStyle:"none",display:"inline-block"}}><p onClick={()=>this.handleNextCommunityButton()}>&gt;</p> </li>

		  				</ul>
	  				</b>

	  			</p>

	  			<p style={{position:"absolute",top:"60%",left:"30%",color:"white",fontSize:"20px"}}> <b>Popular Videos </b></p>
	  			<p style={{position:"absolute",top:"60%",left:"40%",color:"white",fontSize:"15px"}}> <b>See all </b></p>
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
		 		<p style={{position:"absolute",top:"25%",left:"89%",color:"white",fontSize:"15px"}}> <b>See all</b> </p>
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
	 		</React.Fragment>
	  	)
	  }

	  handleHeaderAnimatedContents=()=>{



	  	return (
	  		<React.Fragment>


	  		</React.Fragment>
	  	)
	  }


	  handleHeaderAnimation=()=>{

	  	return this.state.headerAnimation==false ? 
	  		<Container>
	  			{this.handleHeaderContents()}
	  		</Container>:
	  		<CommunityHeaderAnimation>
	  			{this.handleHeaderAnimatedContents()}
	  		</CommunityHeaderAnimation>
	  }

	render(){


		return(
			<React.Fragment>
			
				{this.handleHeaderAnimation()}



				<PostsChatInformation id="postChatInformation" onScroll={()=>this.handleScroll()}>
					<PostOptionsContainer>

						<ul style={{listStyle:"none"}}>
							<li><p style={{position:"relative",fontSize:"15px",left:"20%"}}><b>Post Options</b></p></li>
							<li>
								<PostOptions>
									<ul style={{listStyle:"none"}}>
										<li style={{PostOptionCSS}}><Option>Posts</Option></li>
										<li style={{PostOptionCSS}}><Option>Images</Option></li>
										<li style={{PostOptionCSS}}><Option>Videos</Option></li>
										<li style={{PostOptionCSS}}><Option>Blogs</Option></li>
									</ul>
								</PostOptions>
							</li>
						</ul>

					</PostOptionsContainer>

					<p style={{position:"relative",fontSize:"60px",left:"23%"}}><b>Categories</b></p>
					<CommunityChoicesContainer>

						<ul style={{textAlign:"center",overflowY:"scroll",width:"90%"}}>

							{this.state.subCommunities.map(data=>
								<li style={CommunityChoicesListCSS}>
									<CommunityChoicesDiv> {data.category} </CommunityChoicesDiv>
								</li>
							)}

						</ul>
						<p style={{position:"absolute",left:"90%",top:"10%",color:"#5298F8"}}>See all </p>
						

					</CommunityChoicesContainer>

					<ChatContainer>
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




