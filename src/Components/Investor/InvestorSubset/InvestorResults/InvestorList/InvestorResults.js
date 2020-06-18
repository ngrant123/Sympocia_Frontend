import React,{Component} from "react";
import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import SmallInvestorProfileTab from "./SmallInvestorProfileTab.js";
import InvestorProfile from "../../InvestorProfile/InvestorProfile.js";
import SmallInvestorMediaContainer from "../../InvestorProfile/InvestorMediaContainer.js";
import SmallInvestmentsContainer from "../../InvestorProfile/Investments.js";
import SearchInformation from "./SearchInformation";
import Investors from "./Investors";
import {
		searchforfirstName,
		searchforLastName
	} from "../../../../../Actions/Tasks/userTasks.js";
import {InvestorConsumer} from "../../../InvestorContext.js";

const Container = styled.div`
	position:absolute;
	width:100%;
	height:100%;
`;

const SearchBox = styled.div`
	position:absolute;
	background-color:#f7f8ff;
	width:80%;
	height:17%;
	left:10%;
	top:5%;
	border-radius:5px;
	box-shadow: 1px 1px 5px 5px #d8d9df;
	overflow:hidden;
	filter: blur(5px);
`;


const InvestorBox = styled.div`
	position:relative;
	background-color:white;
	width:80%;
	height:70%;
	left:10%;
	top:25%;
	border-radius:5px;
	box-shadow: 1px 1px 5px 5px #d8d9df;

`;

const FirstSectionInvestorBody = styled.div`
	position:absolute;
	width:50%;
	height:80%;
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


const InvestorModalContainer = styled.div`

	position:absolute;
	width:50%;
	height:80%;
	background-color:red; 
	z-index:5;
	margin-left:10%;
	margin-top:10%;

`;

const InvestorModalBackground = styled.div`
	position:absolute;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	width:100%;
	height:100%;
	display:none;
	z-index:-4;

`;

const InvestorSmallProfile = styled.div`

	position:absolute;
	background-color:white;	
	left:30%;
	height:70%;
	width:60%;
	top:20%;
	border-radius:5px;
	overflow:hidden;
	box-shadow: 1px 1px 5px 5px #d8d9df;
`;


const ImageContainer = styled.div`

	position:absolute;
	background-color:black;
	border-radius:50%;
	height:30%;
	width:35%;
	top:5%;
	left:10%;
	border-style:solid;
	border-width:5px;
	border-color:#C8B0F4;
`;


const BioGraphyContainer = styled.div`

	position:absolute;
	height:9%;
	width:45%;
	top:7%;
	left:50%;
	overflow:hidden;
	font-size:170%;
	border-style:solid;
	border-width:0px 0px 1px 0px;
	background-color:#5298F8;
	border-radius:5px 5px 0px 0px;
	padding:5px;
	color:white;
`;

const BioGraphyText = styled.div`

	position:absolute;
	height:40%;
	width:45%;
	top:20%;
	left:50%;
	overflow:scroll;
	color:#464c56;

`;

const SocialMediaContainer = styled.div`

	position:relative;
	height:10%;
	width:35%;
	top:37%;
	left:10%;
	border-radius:5px;
	border-style:solid;
	border-color:#5298F8;
	border-width:2px;
	transition:.8s;

	&:hover{
		background-color:#5298F8;
	}

`;


const NameContainer = styled.div`

	position:absolute;
	height:12%;
	width:40%;
	top:48%;
	left:5%;
	font-size:280%;
	text-align:center;
	overflow-x:scroll;
	color:#464c56;

`;

const InvestmentContainer = styled.div`
	position:relative;
	height:25%;
	width:90%;
	top:55%;
	left:5%;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	transition:.8s;
	overflow:scroll;

	&:hover{
		background-color:#f1f5f8;
	}
	
`;

const ShadowContainerInvestor = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:rgba(0,0,0,0.4); /* Black w/ opacity */
	z-index:5;

`;

const ShadowContainerInvestment = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:4;

`;

const SmallInvesmentContainer = styled.div`
	position:absolute;
	left:20%;
	width:70%;
	height:30%;
	z-index:5;
	top:20%;
	background-color:white;
	border-radius:5px;


`;

const CompanyDescription = styled.div`

	position:absolute;
	width:20%;
	left:5%;
	height:20%;
	top:7%;
	background-color:	#5298f8;
	color:white;
	border-radius:5px;
	text-align:center;

`;

const CompanyName = styled.div`

	position:absolute;
	width:40%;
	left:5%;
	height:20%;
	top:30%;
	font-size:150%;
	overflow:scroll;
`;

const AmountDescription = styled.div`
	position:absolute;
	width:20%;
	left:5%;
	height:20%;
	top:52%;
	background-color:	#5298f8;
	color:white;
	text-align:center;
	border-radius:5px;
`;

const AmountNumber = styled.div`
	position:absolute;
	width:30%;
	left:5%;
	height:20%;
	top:75%;
	font-size:120%;
	overflow:scroll;

`;


const InvestmentBioDescription = styled.div`
	position:absolute;
	width:50%;
	left:45%;
	height:75%;
	top:7%;
	color:#626466;
	border-radius:5px;
	text-align:center;
	transition:.8s;
	border-style:solid;
	border-width:1px;
	border-color:#5298f8;
	overflow:scroll;
	&:hover{


		background-color:#f1f5f8;
	}

`;

const SearchInformationContainer=styled.div`
	position:absolute;
	width:37%;
	height:70%;
	top:25%;
	border-radius:5px;
	margin-left:15px;
	padding:5px;
`;

const InvestorsContainer=styled.div`
	position:absolute;
	left:41%;
	width:58%;
	top:25%;
	height:70%;
	border-radius:5px;
`;


const MessageButton = styled.div`





`;

const CancleButton = styled.div`

`;


const TestContainer=styled.div`
	position:relative;
	width:20px;
	height:20%;
	background-color:red;


`;
//Write Search method
//Write and get working method that seperates investors to appropriate column

var investorpagetracker=1;

class InvestorComp extends Component{
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			name:"",
			bio:"",
			activenumber:0,
			investmentnumber:0,
			totalinvestors:this.props.investorData,
			firstinvestors:[],
			secondinvestors:[],
			stackInvestorsContainer:[],
			investments:[],
			displayInvestorContainer:false,
			displayInvestmentContainer:false,
			investorData:{}
		};
		console.log(this.props);
	}



	handleDisappearInvestorModal=(data)=>{
		this.setState(prevState=>({
			...prevState,
			displayInvestorContainer:!this.state.displayInvestorContainer,
			investorData:data
		}))
	}

	handleDisappearInvestmentModal(){
		console.log(this.state.displayInvestmentContainer)
		this.setState({
			displayInvestmentContainer:false
		});
	}

	handleSearch=()=>{
		var investorname=document.getElementById("searchcontainer").value;
		var investorfirstlastname=investorname.split(" ");
		var firstName=investorfirstlastname[0];
		var lastName;
		var firstnameindicator;
		var lastnameindicator;

		if(investorfirstlastname.length>1){
			lastName=investorfirstlastname[1];
		}
		firstnameindicator=searchforfirstName(firstName,this.state.totalinvestors);
		lastnameindicator=[];
		if(firstnameindicator.length!=0)
			lastnameindicator=searchforLastName(firstnameindicator,lastName);

		if(lastnameindicator.length==0)
			this.storefirsteightinvestors(firstnameindicator,8,0);
		else
			this.storefirsteightinvestors(lastnameindicator,8,0);
	}

	DisplayInvestmentContainer=()=>{
		var investmentdisplay= (this.state.displayInvestmentContainer) ? (
					<div>
							<ShadowContainerInvestment id="shadowinvesmentcontainer" onClick={()=>this.handleDisappearInvestmentModal()}/>
							<SmallInvesmentContainer id="invesmentcontainer">
								<CompanyDescription>Company: </CompanyDescription>
								<CompanyName>{this.state.companyname}</CompanyName>
								<AmountDescription>Amount:</AmountDescription>
								<AmountNumber>{this.state.amount}</AmountNumber>
								<InvestmentBioDescription>{this.state.bio}</InvestmentBioDescription>
							</SmallInvesmentContainer>
					</div>

					): (<p></p>);
		return investmentdisplay;
	}

	display=()=>{
		this.setState({
			displayInvestorContainer:false
		})
	}

	render(){
		return(
			<InvestorConsumer>
				{investorInformation=>{
					return <Container>
								{/*SEARCH BOX BELOW IS NOT IMPLEMENTED YET. WILL DO AT A LATER TIME*/}
								<SearchBox>
									<InvestorSearchContainer>
										<SearchIcon/>
										<InvestorSearchBox placeholder="Enter the Investors name" id="searchcontainer"></InvestorSearchBox>
										<InvestorSearchBoxButton onClick={()=>this.handleSearch()}>Search</InvestorSearchBoxButton>
										<InvestorSearchMatchButton>Match</InvestorSearchMatchButton>
									</InvestorSearchContainer>

									<InvestorOptionsContainer>
										<ul style={{padding:"10px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
												<InvestOptionsAlphabetize>Alphabetize</InvestOptionsAlphabetize>
											</li>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
												<InvestOptionsActiveButton>Active</InvestOptionsActiveButton>
											</li>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
												<InvestOptionsActiveButton>Active</InvestOptionsActiveButton>
											</li>
										</ul>
									</InvestorOptionsContainer>
								</SearchBox>
										<SearchInformationContainer>
											<SearchInformation
												investors={investorInformation.state.investorResults}
											/>
										</SearchInformationContainer>

										 <InvestorsContainer>
										 	<Investors
												firstinvestors={this.state.firstinvestors}
												secondinvestors={this.state.secondinvestors}
												totalinvestors={investorInformation.state.investorResults}
											/>
										 </InvestorsContainer>
							</Container>
				}}
			</InvestorConsumer>
		)
	}
}

export default InvestorComp;