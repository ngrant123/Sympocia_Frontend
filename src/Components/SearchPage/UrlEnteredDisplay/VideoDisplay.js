import React,{Component} from "react";
import styled from "styled-components";
import VideoDisplayContainer from "../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";
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


class VideoDisplay extends Component{
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
		const {confirmation,data}=await getPostById({postId:id,userId:this.props.personalState.id,postType:"Videos"})
		console.log(confirmation);

		if(confirmation=="Success"){
			this.setState({
				isLoading:false,
				postData:data
			})
		}else{
			alert('Unfortunately an error has occured when trying to retried this post information. Please try again');
		}
	}

	displayChatPageHandle=()=>{

	}
	handleDisplayExplorePage=()=>{
		this.props.history.push({
			pathname:"/home"
		})
	}

	render(){
		return(
			<Container id="urlEnteredVideoContainer">
				<GeneralNavBar
					displayChatPage={this.displayChatPageHandle}
					page={"UrlEnteredPostPage"}
					routerHistory={this.props.history}
					targetDom={"urlEnteredVideoContainer"}
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
						<div>
							<VideoDisplayContainer
								videoData={this.state.postData}
								recommendedVideos={[]}
								targetDom={"urlEnteredVideoContainer"}
							/>
						</div>
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
)(VideoDisplay);

