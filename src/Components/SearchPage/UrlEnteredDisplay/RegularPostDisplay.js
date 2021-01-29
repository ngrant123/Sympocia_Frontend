import React,{Component} from "react";
import styled from "styled-components";
import RegularPostContainer from "../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import {getPostById} from "../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import LoadingAnimation from "../../../LoadingAnimation.js";
import {GeneralNavBar} from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import {connect} from "react-redux";
import ExploreIcon from '@material-ui/icons/Explore';

const Container=styled.div`
	width:100%;
	height:100%;
	display:flex;
	flex-direction:column;
`;

const PostContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:10%;
	height:50%;
	width:100%;
	padding-left:2%;
`;

const ExploreIconContainer=styled.div`
	height:30%;
	width:70px;
	border-radius:5px;
	background-color:white;
	padding:10px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;
	cursor:pointer;
	margin-right:5%;
	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const RegularPostDisplayContainer=styled.div`
	position:fixed;
	z-index:45;
	height:40%;
	top:20%; 
	width:60%;
	border-radius:5px;
	left:20%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
	box-shadow: 1px 1px 5px #707070; 

	@media screen and (max-width:1360px){
		position:fixed;
		z-index:45;
		height:90%;
		width:95%;
		border-radius:5px;
		top:15%;
		left:5%;
		overflow-y:auto;
		background-color:white;
	}
`;


const PostContainerCSS={
	borderRadius:"5px",
	borderStyle:"solid",
	borderColor:"#F2F2F2",
	borderWidth:"1px"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}


class RegularPostDisplay extends Component{
	constructor(props){
		super(props);
		this.state={
			isLoading:true,
			postData:{}
		}
	}

	async componentDidMount(){
		const {
			history,
			match:{
					params:{
						id
					}
				}
			}=this.props;
		const {confirmation,data}=await getPostById({postId:id,userId:this.props.personalState.id,postType:"RegularPosts"})
		console.log(confirmation);

		if(confirmation=="Success"){
			const {message}=data;
			this.setState({
				isLoading:false,
				postData:message
			})
		}else{
			alert('Unfortunately an error has occured when trying to retrieve this post information. Please try again');
		}
	}

	displayChatPageHandle=()=>{

	}
	handleDisplayExplorePage=()=>{
		this.props.history.push({
			pathname:"/home"
		})
	}

	closeModal=()=>{

	}

	render(){
		return(
			<Container id="urlEnteredRegularPostContainer">
				<GeneralNavBar
					displayChatPage={this.displayChatPageHandle}
					page={"UrlEnteredPostPage"}
					routerHistory={this.props.history}
					targetDom={"urlEnteredRegularPostContainer"}
				/>
				{this.state.isLoading==false?
					<PostContainer>
						<ExploreIconContainer onClick={()=>this.handleDisplayExplorePage()}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<ExploreIcon
										style={{fontSize:50}}
									/>
								</li>

								<li style={{listStyle:"none"}}>
									Explore
								</li>
							</ul>
						</ExploreIconContainer>
						<RegularPostDisplayContainer>
							<RegularPostContainer
								postData={this.state.postData}
								targetDom={"urlEnteredRegularPostContainer"}
							/>
						</RegularPostDisplayContainer>
					</PostContainer>
					:<LoadingAnimation/>
				}
			</Container>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		personalState:state.personalInformation
	}
}

export default connect(
	mapStateToProps
)(RegularPostDisplay);


