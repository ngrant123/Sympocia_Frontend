import React, {Component} from "react";
import styled from "styled-components";
import { MediumPosts } from "../../../../GeneralComponents/PostComponent/MediumPostComponent/MediumPosts.js";

const PostContainer = styled.div`

	position:absolute;
	height:130%;
	width:90%;
`;

const CreatePost = styled.div`
	position:relative;
	background-color:red;
	width:70px;
	height:40px;
	top:4%;
	left:15%;
	border-radius:5px;
`;

const Post = styled.div`
	position:absolute;
	background-color:red;
	width:70%;
	height:40%;
	top:55%;
	left:15%;
	border-radius:5px;
`;


const PostDivider = styled.div`

	position:absolute;
	background-color:#4d5050;
	height:1%;
	width:90%;
	border-radius:5px;
	top:-5%;
	left:3%;

`;


const Testerdata=[
	{
		posttype:"regularpost"
	},
	{
		posttype:"image"

	},
	{
		posttype:"map"

	}
]


class PostComp extends Component{

	constructor(props){
		super(props);

		this.state={
			industries:[]

		}
	}

	render(){

		return(

			<React.Fragment>

				<ul style={{position:"absolute",width:"90%",top:"-10%"}}>
					<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
						<div class="dropdown" style={{height:"4%",top:"-10%",zIndex:"6"}}>
								    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor:"#5298F8",width:"100%",left:"2%",top:"2%",height:"100%",color:"white"}}>Industry
								    	<span class="caret"></span>
								    </button>
								    <ul class="dropdown-menu">
										{this.state.industries.map(data=>
											 <li onClick={()=>this.handleChange(data.id)} id={data.id}><a href="#">{data.industry}</a></li>
										)}
								    </ul>
		  				 </div>
		  			</li>

		  			<li style={{listStyle:"none",display:"inline-block"}}>

		  				 <div class="dropdown" style={{ height:"4%",zIndex:"2"}}>
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor:"#5298F8",width:"100%",left:"2%",top:"2%",height:"100%",color:"white"}}>Order By
								    <span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
								    <li><a href="#">Fashion</a></li>
								    <li><a href="#">Health</a></li>
								    <li><a href="#">Consulting</a></li>
								</ul>
		  				 </div>

	  				</li>

	  			</ul>

	  			<PostDivider/>

				<PostContainer>
					<ul>
						{Testerdata.map(data=>

							<li style={{position:"relative",listStyle:"none",marginBottom:"20px",marginTop:"20px",left:"-60px"}}>
								<MediumPosts 
									postdata={data.posttype}
								/>
							</li>

							)}
					</ul>

				</PostContainer>

			</React.Fragment>
		)
	}

}



export default PostComp;