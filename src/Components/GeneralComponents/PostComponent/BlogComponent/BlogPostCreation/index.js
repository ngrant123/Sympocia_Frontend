import React,{Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {
	BlogConsumer,
	BlogProvider
} from "./BlogContext.js";
import {GeneralNavBar} from "../../../NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import AdditionalInformation from "./AdditionalInformation.js";
import TextOptions from "./TextOptions.js";
import Blog from "./Blog.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:#FFFFFF;


`;


class BlogPostCreation extends Component{


	constructor(props){
		super(props);

		console.log("Teste");
		this.state={
			userInformation:{}
		}
	}

	componentDidMount=()=>{
		this.setState({
			userInformation:this.props.state
		})
	}


	render(){

		return(

			<BlogProvider value={{
				state:this.state.userInformation
			}}>
				<Container>
					<GeneralNavBar/>
					<AdditionalInformation/>
					<TextOptions/>
					<Blog/>
				</Container>

			</BlogProvider>

		)
	}
}

const mapStateToProps=(state)=>{

	return{
		state:state.personalInformation
	}
}


export default connect(
		mapStateToProps,
		null
	)(BlogPostCreation);




