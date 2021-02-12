import React,{Component} from "react";
import styled from "styled-components";
import SmallInvestorProfileTab from "./SmallInvestorProfileTab.js";



const InvestorBox = styled.div`
	position:relative;
	background-color:white;
	width:600px;
	height:120%;
	border-radius:5px;
	box-shadow: 1px 1px 5px 5px #d8d9df;

`;


const FirstSectionInvestorBody = styled.div`
	position:absolute;
	width:50%;
	left:0%;
	top:10%;
	border-style:solid;
	border-width:0px 3px 0px 0px;
	border-color:#7a95bc;
	overflow:hidden;


`;
const FirstInvestorProfileContainer = styled.div`
	position:relative;
	width:100%;
	height:75%;
	left:-5%;
	overflow:hidden;

`;

const SecondSectionInvestorBody = styled.div`
	position:absolute;
	width:48%;
	height:80%;
	left:51%;
	top:10%;

`;
const SecondInvestorProfileContainer = styled.div`
	position:relative;
	width:90%;
	height:100%;
	left:0%;
	overflow:hidden;
`;


const InvestorSearchContainer = styled.div`
	position:absolute;
	background-color:#fefbfa;
	width:100%;
	height:60%;
	border-style:solid;
	border-width: 0px 0px 1px 0px;
	border-color:#b3b1b1;
`;

const InvestorSearchBox = styled.textarea`

	position:absolute;
	background-color:#fefbfa;
	width:50%;
	height:50%;
	left:8%;
	top:25%;
	resize:none;
	border-radius:5px;
	font-size:120%;
	border-style:solid;
	border-color:	#bbd7fd;

`;

const SearchIcon = styled.div`
	position:absolute;
	background-color:	#a1a0a0;
	width:5%;
	height:47%;
	left:1%;
	top:25%;
	border-radius:50%;



`;

const InvestorSearchBoxButton = styled.div`

	position:absolute;
	background-color:#C8B0F4;
	left:60%;
	height:48%;
	width:10%;
	border-radius:5px;
	top:25%;
	text-align:center;
	font-size:130%;
	color:white;
	transition:.8s;

	&:hover{

		background-color:#6941E5;
	}

`;

const InvestorSearchMatchButton = styled.div`

	position:absolute;
	background-color:#5298F8;
	left:80%;
	height:48%;
	width:15%;
	border-radius:5px;
	top:25%;
	text-align:center;
	font-size:130%;
	color:white;
	transition:.8s;

	&:hover{

		background-color:#325f99;
	}

`;

const InvestorOptionsContainer = styled.div`
	position:absolute;
	background-color:#f3f1f0;
	width:100%;
	top:60%;
	height:40%;

`;

const InvestOptionsAlphabetize = styled.div`

	position:relative;
	background-color:#1674f4;
	width:110%;
	height:60%;
	border-radius:5px;
	text-align:center;
	color:white;
	padding:5px;

`;

const InvestOptionsActiveButton = styled.div`

	position:relative;
	background-color:#1674f4;
	width:110%;
	height:60%;
	border-radius:5px;
	text-align:center;
	color:white;
	padding:5px;

`;

const PreviousNextIconContainer= styled.div`
	position:absolute;
	width:100%;
	height:9%;
	border-radius:5px;
	text-align:center;
	color:white;
	font-size:140%;
	transition:.8s;

`;
const NextIcon = styled.div`
	position:absolute;
	width:10%;
	height:80%;
	background-color:#6941E5;
	top:10%;
	border-radius:5px;
	left:85%;
	text-align:center;
	color:white;
	font-size:105%;
	transition:.8s;

		&:hover{

		background-color:#C8B0F4;
	}
`;

const PreviousIcon = styled.div`
	position:absolute;
	width:15%;
	height:80%;
	background-color:#6941E5;
	top:10%;
	border-radius:5px;
	left:5%;
	text-align:center;
	color:white;
	font-size:105%;
	transition:.8s;
	opacity:-1;

		&:hover{

		background-color:#C8B0F4;
	}
`;

const PageContainer = styled.div`
	position:absolute;
	width:100%;
	height:9%;
	border-radius:5px;
	top:91%;
	text-align:center;
	color:white;
	font-size:140%;
	transition:.8s;
`;


var investorpagetracker=1;
class Investors extends Component{

	constructor(props){
		super(props);	
		this.state={
			name:"",
			bio:"",
			activenumber:0,
			investmentnumber:0,
			totalinvestors:props.totalinvestors,
			firstinvestors:[],
			secondinvestors:[],
			stackInvestorsContainer:[],
			investments:[],
			displayInvestorContainer:false,
			displayInvestmentContainer:false
		}
	}

	componentDidMount(){

		var length=this.state.totalinvestors.length;
		var stoppingpoint;
		var startingpoint;

		//checks to see if data can fit on one page
		if(length<=8){
			this.placedataintocolumns(this.state.totalinvestors);
		}
		else if(length>8){
			stoppingpoint=8*investorpagetracker;
			startingpoint=stoppingpoint-8;
			this.storefirsteightinvestors(this.state.totalinvestors,stoppingpoint,startingpoint);
		}
	}

	storefirsteightinvestors = (data,stoppingpoint,startingpoint) =>{
			var tempinvestorcontainer=[];
			var counter=startingpoint;
			var limitcounter=0;
			var investorobject;

			 while(data[counter]!=null){
			 	if(counter<stoppingpoint){
				 	investorobject=data[counter];
					tempinvestorcontainer.push(investorobject);
				 	counter++;
			 	}
			 	else
			 		break;
			 }
			//Not being used but decent idea
			//this.state.stackInvestorsContainer.push(tempinvestorcontainer);
			this.placedataintocolumns(tempinvestorcontainer);
	}

	placedataintocolumns = (data) =>{

		var counter=0;
		var rightinvestorcontainer=[];
		var leftinvestorcontainer=[];
		var investorobject;


		while(counter<data.length){
			investorobject=data[counter];
			if(counter>3){
				rightinvestorcontainer.push(investorobject);

			}
			else{
				leftinvestorcontainer.push(investorobject);
			}
			counter++;
		}

		//Investigate further later but this is the only fix 

		this.setState({
			firstinvestors:[],
			secondinvestors:[]
		},function(){
			this.setState({
					firstinvestors:leftinvestorcontainer,
					secondinvestors:rightinvestorcontainer
			});
			
		});
	}


		//Based on the investor page tracker we can determine where the user is and what data should be displayed
	handleNextButton = () => {

		investorpagetracker++;
		var tracker=8*investorpagetracker;
		var startpoint=tracker-8;
		var nextbuttonindicator=false;

		this.storefirsteightinvestors(this.state.totalinvestors,tracker,startpoint);
		document.getElementById("previousbutton").style.opacity="1";


		if(tracker>=this.state.totalinvestors.length){
			document.getElementById("nextButton").style.zIndex="-2";
			document.getElementById("nextButton").style.opacity="-1";
		}

	}

	handlePreviousButton = () =>{
		investorpagetracker--;
		var stoppingpoint=8*investorpagetracker;
		var startingpoint=stoppingpoint-8;

		this.storefirsteightinvestors(this.state.totalinvestors,stoppingpoint,startingpoint);

		document.getElementById("nextButton").style.zIndex="2";
		document.getElementById("nextButton").style.opacity="1";
		if(startingpoint==0){
			document.getElementById("previousbutton").style.opacity="-1";
		}

	}



	render(){

		return(
			<React.Fragment>
					<PreviousNextIconContainer>
						<NextIcon id="nextButton" onClick={()=>this.handleNextButton()}>Next</NextIcon>
						<PreviousIcon id="previousbutton" onClick={()=>this.handlePreviousButton()}>Previous</PreviousIcon>
					</PreviousNextIconContainer>

					<FirstSectionInvestorBody>
						<ul style={{listStyle:"none",marginBottom:"20px",position:"relative"}}>
							<FirstInvestorProfileContainer>
								{this.state.firstinvestors.map(data=>
									<li style={{ position:"relative",marginBottom:"17px"}}>
											<SmallInvestorProfileTab 
												name={data.firstName}
												bio={data.bio}
												activenumber={data.activenumber}
												investments={data.investments}
												amount={data.amount}
												profilePicture={data.profilePicture}
												_id={data._id}
											/>
									</li>
								)}
								</FirstInvestorProfileContainer>
						</ul>

					</FirstSectionInvestorBody>
					<SecondSectionInvestorBody>
						<ul style={{listStyle:"none",marginBottom:"20px",position:"relative"}}>
							<SecondInvestorProfileContainer>
								{this.state.secondinvestors.map(data=>
									<li style={{ position:"relative",marginBottom:"17px"}}>
											<SmallInvestorProfileTab 
												name={data.firstName}
												bio={data.bio}
												activenumber={data.activenumber}
												investments={data.investments}
												amount={data.amount}
												profilePicture={data.profilePicture}
												_id={data._id}
											/>
									</li>
								)}
								</SecondInvestorProfileContainer>
						</ul>

					</SecondSectionInvestorBody>
					<PageContainer></PageContainer>

		</React.Fragment>

		)
	}
}
export default Investors;