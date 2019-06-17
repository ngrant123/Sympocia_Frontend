import React,{Component} from "react";
import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import SmallInvestorProfile from "../SmallInvestorComp/SmallInvestorProfile.js";
import SmallInvestorMediaContainer from "../SmallInvestorComp/SmallInvestorMediaContainer.js";
import SmallInvestmentsContainer from "../SmallInvestorComp/SmallInvestments.js";




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

`;


const InvestorBox = styled.div`
	position:relative;
	background-color:	#f2f5f8;
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

	position:absolute;
	background-color:#1674f4;
	width:15%;
	height:60%;
	top:20%;
	left:7%;
	border-radius:5px;
	text-align:center;
	color:white;

`;

const InvestOptionsActiveButton = styled.div`

	position:absolute;
	background-color:#1674f4;
	width:10%;
	height:60%;
	top:20%;
	left:25%;
	border-radius:5px;
	text-align:center;
	color:white;

`;

const PreviousNextIconContainer= styled.div`
	position:absolute;
	width:100%;
	height:9%;
	background-color:#bfcae6;
	border-radius:5px;
	text-align:center;
	color:white;
	font-size:140%;
	transition:.8s;

	&:hover{

		background-color:	#c4bfe6;
	}
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
	background-color:#bfcae6;
	border-radius:5px;
	top:91%;
	text-align:center;
	color:white;
	font-size:140%;
	transition:.8s;

		&:hover{

		background-color:	#c4bfe6;
	}


`;


const InvestorModalContainer = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	z-index:2;
	


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
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;

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

const MessageButton = styled.div`





`;

const CancleButton = styled.div`

`;



const data = [


	{
		name:"Nathan",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:2,
		investmentnumber:4,
		investments:[
			{
				investmentType:"angel investment",
				date:"June 24 1996",
				description:"24 On this date I investment this amount of money into this company",
				companyName:"Stars Wars enterprise",
				amount:5000

			},
			{
				investment:"not an angel investment",
				date:"June 25 1996",
				description:" 25 On this date I investment this amount of money into this company",
				companyName:"Wars enterprise",
				amount:5010

			},
			{
				investment:"investment nigga",
				date:"June 26 1996",
				description:" 26 On this date I investment this amount of money into this company",
				companyName:" enterprise",
				amount:5002

			}
		]


	},
	{
		name:"Edward",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:3,
		investmentnumber:5,
		investments:[
			{
				date:"June 27 1996",
				description:"27 On this date I investment this amount of money into this company",
				companyName:"Stars enterprise",
				amount:5000

			},
			{
				date:"June 28 1996",
				description:" 28 On this date I investment this amount of money into this company",
				companyName:"Wars Wars enterprise",
				amount:5000

			},
			{
				date:"June 29 1996",
				description:" 29 On this date I investment this amount of money into this company",
				companyName:" enterprise enterprise",
				amount:5000

			}
		]



	},
	{
		name:"Christian",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:6,
		investmentnumber:7,
		investments:[
			{
				date:"June 30 1996",
				description:"31 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 31 1996",
				description:" 32 On this date I investment this amount of money into this company",
				companyName:"2Wars enterprise",
				amount:5000

			},
			{
				date:"June 32 1996",
				description:" 33 On this date I investment this amount of money into this company",
				companyName:" enterprise1",
				amount:5000

			}
		]

	},
	{
		name:"Daniel",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Jack",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Joe",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	}
	,
	{
		name:"Kevin",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Durant",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"King James",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Steph curry",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"KevinDurant",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Bryanna Quinones",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Marie Berry",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Paul",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Edward",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Idk nigga",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Nathan",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Sandra",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	},
	{
		name:"Nathan Grant",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:8,
		investmentnumber:9,
		investments:[
			{
				date:"June 44 1996",
				investmentType:"Angel Investment",
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise",
				amount:5000

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise",
				amount:5000

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise",
				amount:5000

			}
		]
	}
];
//Write Search method
//Write and get working method that seperates investors to appropriate column

var investorpagetracker=1;

class InvestorComp extends Component{

	
	constructor(props){
		super(props);

		this.state = {
			name:"",
			bio:"",
			activenumber:0,
			investmentnumber:0,
			totalinvestors:data,
			firstinvestors:[],
			secondinvestors:[],
			stackInvestorsContainer:[],
			investments:[],
			displayInvestorContainer:false,
			displayInvestmentContainer:false
		
		};
	}

	componentDidMount(){
		this.handleInvestorPageData(data);
	}

	/*
		Handles Investor Data and checks to see if the data can fit on one 
		page or it has to go on multiple

	*/

	handleInvestorPageData =(data)=>{
		var length=data.length;
		var stoppingpoint;
		var startingpoint;

		//checks to see if data can fit on one page
		if(length<=8){
			this.placedataintocolumns(data);
		}
		else if(length>8){
			stoppingpoint=8*investorpagetracker;
			startingpoint=stoppingpoint-8;
			this.storefirsteightinvestors(data,stoppingpoint,startingpoint);
		}
		this.disableorenablePreviousButton(true);

	}

//Stores the recnt eight investors and displays them on the screen

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

	//Places the data into either the left or right investor body

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

		var tracker=8*investorpagetracker;
		var startpoint=tracker-8;
		var nextbuttonindicator=false;

		investorpagetracker++;
		this.storefirsteightinvestors(data,tracker,startpoint);
		this.disableorenablePreviousButton(false);


		if(tracker>=this.state.totalinvestors.length)
			this.disableorenableNextButton(true);


	}

	disableorenableNextButton(decider){
		if(decider==true)
			document.getElementById("nextButton").style.zIndex="-2";
		else
			document.getElementById("nextButton").style.zIndex="2";
	}

	handlePreviousButton = () =>{
		console.log(this.state.stackInvestorsContainer);
		investorpagetracker--;
		var stoppingpoint=8*investorpagetracker;
		var startingpoint=stoppingpoint-8;

		this.storefirsteightinvestors(data,stoppingpoint,startingpoint);

		this.disableorenableNextButton(false);
		if(startingpoint==0)
			this.disableorenablePreviousButton(true);

	}

	disableorenablePreviousButton(decider){
		if(decider==true)
			document.getElementById("previousbutton").style.zIndex="-2";
		else
			document.getElementById("previousbutton").style.zIndex="2";

	}

	handleDisplayInvestorProfile = (props)=>{


		this.setState({

			name:props.name,
			bio:props.bio,
			activenumber:props.activenumber,
			investmentnumber:props.investmentnumber,
			investments:props.investments,
			displayInvestorContainer:true

		});
	}


	handleDisplaySmallInvestment=(props)=>{
		this.setState({
			amount:props.amount,
			companyname:props.companyName,
			displayInvestmentContainer:true
		});
	}


	handleDisappearInvestorModal(){
		console.log(this.state.displayInvestorContainer)
		this.setState({
			displayInvestorContainer:false

		});
	}

	handleDisappearInvestmentModal(){
		console.log(this.state.displayInvestmentContainer)
		this.setState({
			displayInvestmentContainer:false

		});
	}

	handleSearch = ()=>{
		var investorname=document.getElementById("searchcontainer").value;
		var investorfirstlastname=investorname.split(" ");
		var firstName=investorfirstlastname[0];
		var lastName;
		var firstnameindicator;
		var lastnameindicator;

		if(investorfirstlastname.length>1){

			lastName=investorfirstlastname[1];

		}
		firstnameindicator=this.searchforfirstName(firstName,data);
		lastnameindicator=[];
		if(firstnameindicator.length!=0)
			lastnameindicator=this.searchforLastName(firstnameindicator,lastName);

		if(lastnameindicator.length==0)
			this.storefirsteightinvestors(firstnameindicator,8,0);
		else
			this.storefirsteightinvestors(lastnameindicator,8,0);
	}

	searchforfirstName(firstName,data){
		var investorcontainer=[];
		var investorname;
		var investorobject;
		var fullname;
		var firstname;

		for(var i=0;i<data.length;i++){
			investorobject=data[i];
			investorname=investorobject.name;
			fullname=investorname.split(" ");
			firstname=fullname[0];

			if(firstname==firstName)
				investorcontainer.push(investorobject);
		}

		return investorcontainer;
	}

	searchforLastName(firstnamecontainer,lastName){

		var investorcontainer=[];
		var investorobject;
		var investorname;
		var fullname;
		var lastname;

		for(var i=0;i<firstnamecontainer.length;i++){

			investorobject=firstnamecontainer[i];
			investorname=investorobject.name;
			fullname=investorname.split(" ");
			if(fullname.length>1){
				lastname=fullname[1];

				if(lastname=lastName)
					investorcontainer.push(investorobject);

			}
		}
		return investorcontainer;

	}



	DisplayInvestmentContainer = () =>{

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



	DisplayInvestorsContainer = () =>{

		var displayInvestor = (this.state.displayInvestorContainer) ? (
		

					<InvestorModalContainer id="modalcontainer">
						<ShadowContainerInvestor id="shadowinvesmentcontainer" onClick={()=>this.handleDisappearInvestorModal()}/>
						<InvestorSmallProfile id="smallinvestorprofile">
										<this.DisplayInvestmentContainer/>
								
										<ImageContainer />

										<SocialMediaContainer>
											<SmallInvestorMediaContainer/>
										</SocialMediaContainer>


										<NameContainer>
											{this.state.name}
										</NameContainer>

										<BioGraphyContainer>
											Biography:
										</BioGraphyContainer>

										<BioGraphyText>
											{this.state.bio}
										</BioGraphyText>

										<InvestmentContainer>
											<ul style={{display:"block"}}>
												
													{this.state.investments.map(data=>
														<li style={{listStyle:"none",marginBottom:"10px"}}>
															<SmallInvestmentsContainer 

																investmentType={data.investmentType}
																date={data.date}
																description={data.description}
																companyName={data.companyName}
																amount={data.amount}
																handleDisplaySmallInvestment={this.handleDisplaySmallInvestment}

															/>
														</li>
														)
													}
											</ul>
										</InvestmentContainer>
							</InvestorSmallProfile>

						</InvestorModalContainer>	
				) : (<p></p>);

				return displayInvestor;
		
	
	}

	handleInvementsModalDisappear(){
		document.getElementById("shadowinvesmentcontainer").style.display="none";
		document.getElementById("shadowinvesmentcontainer").style.zIndex=-1;

		document.getElementById("invesmentcontainer").style.display="none";
		document.getElementById("invesmentcontainer").style.zIndex=-1;
	}

	render(){


		return(

			<Container >
				<this.DisplayInvestorsContainer/>

						
				<SearchBox>
					<InvestorSearchContainer>
						<SearchIcon/>

						<InvestorSearchBox placeholder="Enter the Investors name" id="searchcontainer"></InvestorSearchBox>
						<InvestorSearchBoxButton onClick={()=>this.handleSearch()}>Search</InvestorSearchBoxButton>
						<InvestorSearchMatchButton>Match</InvestorSearchMatchButton>

					</InvestorSearchContainer>

			

					<InvestorOptionsContainer>
						<InvestOptionsAlphabetize>Alphabetize</InvestOptionsAlphabetize>
						<InvestOptionsActiveButton>Active</InvestOptionsActiveButton>


					</InvestorOptionsContainer>

				</SearchBox>

				<InvestorBox>
					<PreviousNextIconContainer>
						<NextIcon id="nextButton" onClick={()=>this.handleNextButton()}>Next</NextIcon>
						<PreviousIcon id="previousbutton" onClick={()=>this.handlePreviousButton()}>Previous</PreviousIcon>

					</PreviousNextIconContainer>

					<FirstSectionInvestorBody>
						<ul style={{listStyle:"none",marginBottom:"20px",position:"relative"}}>
							<FirstInvestorProfileContainer>
								{this.state.firstinvestors.map(data=>
									<li style={{ position:"relative",marginBottom:"17px"}}>

										
											<SmallInvestorProfile 
												name={data.name}
												bio={data.bio}
												activenumber={data.activenumber}
												investmentnumber={data.investmentnumber}
												investments={data.investments}
												amount={data.amount}
												handleDisplayInvestorProfile={this.handleDisplayInvestorProfile}
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

										
											<SmallInvestorProfile 
												name={data.name}
												bio={data.bio}
												activenumber={data.activenumber}
												investmentnumber={data.investmentnumber}
												investments={data.investments}
												amount={data.amount}
												handleDisplayInvestorProfile={this.handleDisplayInvestorProfile}
											/>
									</li>
								)}
								</SecondInvestorProfileContainer>
						</ul>

					</SecondSectionInvestorBody>

					<PageContainer></PageContainer>

				</InvestorBox>

			</Container>

		)
	}
}

export default InvestorComp;