import React,{Component} from "react";
import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import SmallInvestorProfile from "/Users/nathangrant/Desktop/company/src/Components/SmallComp/SmallInvestorComp/SmallInvestorProfile.js";


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

const InvestorBody = styled.div`
	position:absolute;
	width:50%;
	height:80%;
	left:0%;
	top:10%;
	border-style:solid;
	border-width:0px 3px 0px 0px;
	border-color:#7a95bc;


`;
const InvestorProfileContainer = styled.div`
	position:relative;
	width:100%;
	height:75%;
	left:-5%;
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


const data = [


	{
		name:"Nathan",
		bio:"At 10 years old I created this bitch yeah hurd",
		activenumber:2,
		investmentnumber:4,
		investments:[
			{
				date:"June 24 1996",
				description:"24 On this date I investment this amount of money into this company",
				companyName:"Stars Wars enterprise"

			},
			{
				date:"June 25 1996",
				description:" 25 On this date I investment this amount of money into this company",
				companyName:"Wars enterprise"

			},
			{
				date:"June 26 1996",
				description:" 26 On this date I investment this amount of money into this company",
				companyName:" enterprise"

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
				companyName:"Stars enterprise"

			},
			{
				date:"June 28 1996",
				description:" 28 On this date I investment this amount of money into this company",
				companyName:"Wars Wars enterprise"

			},
			{
				date:"June 29 1996",
				description:" 29 On this date I investment this amount of money into this company",
				companyName:" enterprise enterprise"

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
				companyName:"3Stars Wars enterprise"

			},
			{
				date:"June 31 1996",
				description:" 32 On this date I investment this amount of money into this company",
				companyName:"2Wars enterprise"

			},
			{
				date:"June 32 1996",
				description:" 33 On this date I investment this amount of money into this company",
				companyName:" enterprise1"

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
				description:"44 On this date I investment this amount of money into this company",
				companyName:"3Stars Wars enterprise"

			},
			{
				date:"June 45 1996",
				description:" 45 On this date I investment this amount of money into this company",
				companyName:"5Wars enterprise"

			},
			{
				date:"June 46 1996",
				description:" 46 On this date I investment this amount of money into this company",
				companyName:" 3enterprise"

			}
		]
	}
];




class InvestorComp extends Component{


	render(){


		return(

			<Container>
				<SearchBox>
					<InvestorSearchContainer>
						<SearchIcon/>

						<InvestorSearchBox placeholder="Enter the Investors name"></InvestorSearchBox>
						<InvestorSearchBoxButton>Search</InvestorSearchBoxButton>
						<InvestorSearchMatchButton>Match</InvestorSearchMatchButton>

					</InvestorSearchContainer>

			

					<InvestorOptionsContainer>
						<InvestOptionsAlphabetize>Alphabetize</InvestOptionsAlphabetize>
						<InvestOptionsActiveButton>Active</InvestOptionsActiveButton>


					</InvestorOptionsContainer>

				</SearchBox>

				<InvestorBox>
					<PreviousNextIconContainer>
						<NextIcon>Next</NextIcon>
						<PreviousIcon>Previous</PreviousIcon>

					</PreviousNextIconContainer>

					<InvestorBody>
						<ul style={{listStyle:"none",marginBottom:"20px",position:"relative"}}>
							<InvestorProfileContainer>
								{data.map(data=>
									<li style={{ position:"relative",marginBottom:"17px"}}>

										
											<SmallInvestorProfile 
												name={data.name}
												bio={data.bio}
												activenumber={data.activenumber}
												investmentnunber={data.investmentnumber}
												investments={data.investments}
											/>
									</li>
								)}
								</InvestorProfileContainer>
							
						</ul>

					</InvestorBody>

					<PageContainer></PageContainer>

				</InvestorBox>

			</Container>

		)
	}





}

export default InvestorComp;