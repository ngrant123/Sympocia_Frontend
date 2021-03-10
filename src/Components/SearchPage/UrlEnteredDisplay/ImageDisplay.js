import React,{Component} from "react";
import styled from "styled-components";
import ImageDisplayContainer from "../../GeneralComponents/PostComponent/ImageAndVideoDisplay/PostContainer.js";
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

	@media screen and (max-width:740px){
		padding:10px !important;
	}
`;

const PostContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:10%;
	height:50%;
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

const ImageContainer=styled.div`
	position:relative;
	height:120%;
	padding:10px;
	width:100%;

	@media screen and (max-width:1370px){
		margin-left:5% !important;
    	width:90% !important;
    	height:150% !important;
    	border-radius:5px !important;
    	margin-top:10%;
    }

    @media screen and (max-width:700px){
		margin-left:0% !important;
    	width:100% !important;
    	height:160% !important;
    	border-radius:5px !important;
    	margin-top:10%;
    }

     @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		width:95% !important;
    	height:150% !important;
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


class ImageDisplay extends Component{
	constructor(props){
		super(props);
		this.state={
			isLoading:true,
			imageData:{}
		}
	}

	triggerUIChange=()=>{
		if(window.innerWidth<700){

			this.setState({
				displayPhoneUI:true,
				displayIpadUI:false,
				displayDesktopUI:false
			})
		}else if(window.innerWidth<1400){
			this.setState({
				displayPhoneUI:false,
				displayIpadUI:true,
				displayDesktopUI:false
			})

		}else{
			this.setState({
				displayPhoneUI:false,
				displayIpadUI:false,
				displayDesktopUI:true
			})
		}
	}

	async componentDidMount(){
		window.addEventListener('resize',this.triggerUIChange)
		const {
			history,
			match:{
					params:{
						id
					}
				}
			}=this.props;
		const {confirmation,data}=await getPostById({postId:id,userId:this.props.personalState.id,postType:"Images"})

		if(confirmation=="Success"){
			const {message}=data;
			this.setState({
				isLoading:false,
				imageData:message
			})
		}else{
			alert('Unfortunately an error has occured when trying to retrieve this post information. Please try again');
		}
		this.triggerUIChange();
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
			<Container id="urlEnteredImageContainer">
				<GeneralNavBar
					displayChatPage={this.displayChatPageHandle}
					page={"UrlEnteredPostPage"}
					routerHistory={this.props.history}
					targetDom={"urlEnteredImageContainer"}
				/>
				{this.state.isLoading==false?
					<PostContainer>
						{this.state.displayDesktopUI==true && (
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
						)}
						<ImageContainer>
							<ImageDisplayContainer
								imageData={this.state.imageData}
								targetDom={"urlEnteredImageContainer"}
								closePostModal={this.closeModal}
							/>
						</ImageContainer>
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
)(ImageDisplay);
