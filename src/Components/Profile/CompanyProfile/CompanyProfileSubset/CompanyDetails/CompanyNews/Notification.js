import React,{Component} from "react";
import styled from "styled-components";
import AssessmentIcon from '@material-ui/icons/Assessment';
import NewsDisplayPortal from "../../../CompanyProfileSet/NewsDisplayPortal.js";

const Container = styled.div`

	position:relative;
	width:150%;
	max-width:170px;
	height:50px;
	left:-30%;
	border-radius:5px;
	overflow:hidden;
	transition:.8s;

`;



const Icon = styled.div`
	position:absolute;
	width:17%;
	height:60%;
	left:5%;
	top:10%;
`;

const NotificationCaption = styled.div`
	position:relative;
	width:80%;
	height:100%;
	top:0%;
	left: 30%;
    font-size:140%;

`;

const DateContainer = styled.div`
	position:relative;
	width:90%;
	top:0%;
	color:#5298F8;



`;


const Caption = styled.div`
	position:relative;
	width:90%;
	height:100%;
	top:0%;
    font-size:70%;



`;

//Could be a functional component
class Notification extends Component{




	constructor(props){
		super(props);
		this.state={
			description:props.caption,
			date:props.date,
			key:props.id,
			displayTopLevelNewsModal:false
		};
	}

	closeModal=()=>{
		this.setState({
			displayTopLevelNewsModal:false
		})
	}
	handleClick(){
		this.setState({
			displayTopLevelNewsModal:true
		})
	}

			render(){

				return(
					<React.Fragment>
						<Container id={this.state.key} onClick={()=>this.handleClick()}>
							<a href="javascript:void(0)" style={{textDecoration:"none"}}>
								<Icon>
									<AssessmentIcon
										style={{fontSize:"20"}}
									/>
								</Icon>	
								<NotificationCaption>
									<DateContainer>{this.props.newsData.date}</DateContainer>
									<Caption>{this.props.newsData.newsDescription}</Caption>
								</NotificationCaption>
							</a>
						</Container>
						{this.state.displayTopLevelNewsModal==true?
							<NewsDisplayPortal
								data={this.props.newsData}
								closeModal={this.closeModal}
							/>:null
						}
					</React.Fragment>
				)
			}
}


export default Notification;
