import React,{Component} from "react";
import styled from "styled-components";
import NoProfileIcon from "../../../../../designs/img/NoProfilePicture.png";
import {InvestorConsumer} from "../../../InvestorContext.js";

const Container = styled.div`

	position:relative;
	height:80px;
	width:90%;
	left:5%;
	top:1px;
	border-radius:5px;
	box-shadow: 1px 1px 2px 2px #b9c0c7; 
	transition:.8s

	&:hover{

		box-shadow: 1px 10px 10px #b9c0c7; 
	}
`;

const InvestorIcon = styled.div`
	position:relative;
	background-color:black;
	width:19%;
	height:45px;
	margin-left:3%;
	top:10%;
	border-radius:50%;

`;

const NameIconContainer = styled.div`
	position:absolute;
	width:68%;
	height:57%;
	margin-left:27%;
	top:4%;
	font-size:160%;
	color:#053b86;
	overflow:hidden;


`;

const NameshortDescription = styled.div`
	position:absolute;
	width:100%;
	height:70%;
	top:63%;
	color:#577aad;
	overflow:hidden;
	font-size:56%;

`;

const Name = styled.div`
	position:relative;
	width:100%;
	height:63%;
	font-size:105%;
	overflow:hidden;

`;

const ActiveInvestmentContainer= styled.div`
	position:absolute;
	width:68%;
	height:35%;
	top:62%;
	margin-left:27%;

`;

const ActiveContainer= styled.div`
	position:absolute;
	width:50%;
	height:100%;
	margin-left:0%;
	margin-top:-1%;
	overflow:hidden;
	border-style:solid;
	border-width:0px 1px 0px 0px;
`;

const ActiveDescription = styled.div`
	position:relative;
	width:100%;
	height:57%;
	font-size:103%;
	overflow:hidden;
	color:#C8B0F4;

`;

const ActiveNumber = styled.div`
	position:relative;
	width:100%;
	height:42%;
	top:0%;
	font-size:70%;
	overflow:hidden;

`;
const InvestmentsContainer = styled.div`

	position:relative;
	width:50%;
	height:100%;
	margin-left:55%;
	margin-top:-1%;
	overflow:hidden;
`;

const InvestmentDescription = styled.div`
	position:relative;
	width:100%;
	height:51%;
	top:0%;
	font-size:98%;
	overflow:hidden;
	color:#C8B0F4;
`;


const InvestmentNumber = styled.div`
	position:relative;
	width:100%;
	height:51%;
	top:0%;
	font-size:90%;
	overflow:hidden;

`;

const ActiveIcon = styled.div`
	position:absolute;
	background-color:	#00ff00;
	width:5%;
	height:15%;
	left:85%;
	top:10%;
	border-radius:50%;
`;

const ExitIcon = styled.div`
	position:absolute;
	background-color:#454f5b;
	width:5%;
	height:15%;
	left:93%;
	top:10%;
	border-radius:50%;
	text-align:center;
	font-size:70%;
	color:white;
`;


const InvestorProfilePictureCSS={
	position:"relative",
	backgroundColor:"black",
	width:"19%",
	height:"45px",
	marginLeft:"3%",
	top:"10%",
	borderRadius:"50%"
}

class SmallInvestorProfileTab extends Component{

	constructor(props){


		super(props);

		this.state={

			name:props.name,
			bio:props.bio,
			activenumber:props.activenumber,
			investmentnumber:props.investmentnumber,
			investments:props.investments
		}
	}

	handledisplayInvestorPage =()=>{
		this.props.bubbleUpInvestorData(this.props);
	}
	render(){

		return(
			<InvestorConsumer>
				{investorInformation=>{
					return <Container onClick={()=>investorInformation.displayInvestorProfile(this.props)}>
								{this.props.profilePicture==null?
									<img src={NoProfileIcon} style={InvestorProfilePictureCSS}/>:
									<img src={this.props.profilePicture} style={InvestorProfilePictureCSS}/>
								}
								<NameIconContainer>
									<Name>{this.state.name}</Name>
									<NameshortDescription>{this.state.bio}</NameshortDescription>

								</NameIconContainer>
								<ActiveInvestmentContainer>
									<ActiveContainer>
										<ActiveDescription>Active:</ActiveDescription>
										<ActiveNumber>2 days ago</ActiveNumber>
									</ActiveContainer>

									<InvestmentsContainer>
										<InvestmentDescription>Investments:</InvestmentDescription>
										<InvestmentNumber>
											{this.state.investments==null?0:<React.Fragment>{this.state.investments.length}</React.Fragment>}
										</InvestmentNumber>


									</InvestmentsContainer>

								</ActiveInvestmentContainer>

								<ActiveIcon/>
								<ExitIcon>x</ExitIcon>
							</Container>
				}}
			</InvestorConsumer>
		)
	}
}

export default SmallInvestorProfileTab;