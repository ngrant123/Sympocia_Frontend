import React,{Component} from "react";
import styled from "styled-components";
import SmallProfile from "../../Profile/SmallProfilePostOptionComp/SmallProfile.js";
import bannerimage from "../../../designs/background/banner.png";



const Container = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background:#f7f8ff;
`;

const PaymentOptionContainer = styled.div`
	position:absolute;
	background-color:#d9deff;
	width:100%;
	height:10%;
	border-style:solid;
	border-width:0px 0px 2px 0px;
	border-color:#9093aa;


`;

const PaymentOption = styled.div`

	position:absolute;
	width:40%;
	height:50%;
	left:55%;
	top:20%;
	background:#5298F8;
	border-radius:5px;
	text-align:center;
	color:white;

`;

const BackgroundImageContainer = styled.div`

	position:absolute;
	background-image:url(${bannerimage});
	zoom: 80%;
	width:55%;
	height:50%;
	left:20%;
	top:12%;
	border-radius:5px;
	background-size: cover;
	background-position:center center;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #b9baba;


`;

const ProfileImageContainer = styled.div`

	position:absolute;
	background-color:blue;
	left:30%;
	width:50%;
	height:25%;
	top:25%;
	border-radius:50%;



`;

const CompanyDetailsDivider = styled.div`
	
	position:absolute;
	background-color:#e8ebff;
	height:50%;
	width:100%;
	top:65%;
	border-radius:5px;

`;


const SmallProfileContainer = styled.div`
	
	position:relative;
	background-color:#ccd1ed;
	top:70%;
	left:10%;
	width:35%;
	height:20%;
	border-radius:5px;
	overflow:scroll;
	box-shadow: 1px 1px 1px 1px #b9baba;
	transition:.8s;

	&:hover{


		background-color:#7481cd;
	}
`;

const IndustryContainer = styled.div`

	position:absolute;
	height:6%;
	width:40%;
	left:55%;
	top:77%;
	border-radius:5px;
	

`;


const PointsContainer = styled.div`

	position:absolute;
	height:5%;
	width:45%;
	left:55%;
	top:85%;
	border-radius:5px;

`;


const EditButton = styled.div`

	position:absolute;
	background-color:#5298F8;
	height:55%;
	width:30%;
	left:10%;
	top:25%;
	border-radius:5px;
	color:white;
	text-align:center;

`;

const ChangeIndustryButton = styled.div`

	position:absolute;
	background-color:#5298F8;
	height:55%;
	width:40%;
	left:55%;
	top:25%;
	border-radius:5px;
	color:white;
	text-align:center;

`;

const SmallProfileImage = styled.div`
	position:absolute;
	background-color:red;
	width:20%;
	height:20%;
	border-radius:50%;

`;

const Profile = styled.div`
	position:relative;
	width:40%;
	height:60%;
	top:7%;
	left:-15%;


`;

const ActiveUserContainer = styled.div`

	position:absolute;
	height:6%;
	width:40%;
	left:55%;
	top:70%;

`;

const ActiveUserTitle = styled.div`

	position:absolute;
	width:75%;
	height:55%;
	left:5%;
	color:#773be2;



`;

const ActiveFriends = styled.div`

	position:absolute;
	width:70%;
	height:35%;
	top:55%;
	left:5%;
	font-size:90%;


`;

const CompanyDescription = styled.textarea`

	position:absolute;
	background-color:#f7f8ff;
	top:55%;
	width:80%;
	height:25%;
	left:15%;
	resize:none;
	border-radius:5px;
	padding:5px;


`;

const EmployeesDividerAndInfo = styled.div`
	position:absolute;
	height:20%;
	width:2%;
	border-radius:5px;
	background-color:#9093aa;
	top:70%;
	left:50%;



`;

const IndustyTitle = styled.div`
	position:absolute;
	width:75%;
	height:55%;
	left:5%;
	color:#773be2;


`;

const Industry = styled.div`
	position:absolute;
	width:70%;
	height:35%;
	top:55%;
	left:5%;
	font-size:90%;


`;

const NumberOfPointsTitle = styled.div`
	position:absolute;
	width:75%;
	height:55%;
	left:5%;
	color:#773be2;
	font-size:90%;


`;

const Points = styled.div`
	position:absolute;
	width:70%;
	height:35%;
	top:55%;
	left:5%;
	font-size:90%;

`;


const testerdata=[

	{
		testerdata:1

	},
	{
		testerdata:1

	}
]

const CompanyDescriptionSaveButton = styled.div`
	position:absolute;
	width:40%;
	height:10%;
	background-color:#5298F8;
	transition:.8s;
	top:87%;
	left:50%;
	border-radius:5px;
	text-align:center;
	color:white;
	border-radius:2px;
	border-color:white;
	text-align:center;
	font-size:120%;


`;

const EditAndChangleIndustryContainer = styled.div`
	position:absolute;
	width:100%;
	top:92%;
	height:8%;
	background-color:#d9deff;


`;

class MediumCompanyDetailsContainer extends Component{

	constructor(props){


		super(props);

		this.state={
			EmployeeArrayContainer:testerdata,
			ActiveFriends:2,
			savebuttonindicator:0

		};
	}

	ShortCompanyBioSaveButton = () =>{

		var savebuttonindicator=this.state.savebuttonindicator==1?<CompanyDescriptionSaveButton onClick={()=>this.handleSave()}>Save</CompanyDescriptionSaveButton>:<p></p>;

		return savebuttonindicator;

	}

	handleCompanySummaryClick = ()=>{


		this.setState({
			savebuttonindicator:1

		});
	}

	handleSave(){

		var textvalue=document.getElementById("CompanySummaryBio").value;
		console.log(textvalue);
	}


	render(){


		return(
			<Container>
				<PaymentOptionContainer>

					<PaymentOption>Payment</PaymentOption>

				</PaymentOptionContainer>

				<BackgroundImageContainer>

					<ProfileImageContainer>
					</ProfileImageContainer>

					<CompanyDescription id="CompanySummaryBio" onClick={()=>this.handleCompanySummaryClick()}>
					</CompanyDescription>
					{this.ShortCompanyBioSaveButton()}

				</BackgroundImageContainer>

				<CompanyDetailsDivider/>

				<SmallProfileContainer>
					<Profile>
						<ul>
								{this.state.EmployeeArrayContainer.map(data=>
									<li style={{listStyle:"none",display:"block",marginBottom:"5px"}}>
										<SmallProfile/>
									</li>
									)
								}
						</ul>
					</Profile>
					
				</SmallProfileContainer>
				<EmployeesDividerAndInfo/>

				<ActiveUserContainer>
					<ActiveUserTitle>Active Friends:</ActiveUserTitle>
					<ActiveFriends>Hello</ActiveFriends>
				</ActiveUserContainer>

				<IndustryContainer>
					<IndustyTitle>Industry:</IndustyTitle>
					<Industry>Engineering</Industry>

				</IndustryContainer>

				<PointsContainer>
					<NumberOfPointsTitle>Number of Points:</NumberOfPointsTitle>
					<Points>5</Points>
				</PointsContainer>

				<EditAndChangleIndustryContainer>
					<EditButton>Edit</EditButton>
					<ChangeIndustryButton>Change Industry</ChangeIndustryButton>
				</EditAndChangleIndustryContainer>

			</Container>


		)
	}


}

export default MediumCompanyDetailsContainer;