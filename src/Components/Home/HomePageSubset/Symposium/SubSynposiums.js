import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';

const SearchContainer=styled.textarea`
	position:absolute;
	width:60%;
	height:10%;
	background-color:white;
	border-radius:5px;
	resize:none;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
	border:none;
	left:20%;
	top:5%;
	text-align:center;

`;

const SubCommunitiesContainer=styled.div`
	position:relative;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:10%;
	width:80%;
	height:73%;
	padding:10px;
	overflow-y:scroll;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
`;

const SubCommunitiesListCSS={

	display:"inline-block",
	listStyle:"none"
}


const CommunityChoicesDiv=styled.div`
	position:relative;
	width:140px;
	height:20%;
	padding:10px;
	border-radius:5px;
	transition:.8s;

	border-style:solid;	
	border-width:4px;
	border-image-slice: 1;
	margin:10px;

	&:hover{
		box-shadow: 1px 5px 5px 1px #d5d5d5;
	}
`;



class SubCommunities extends Component{



	constructor(props){
		super(props);

		this.state={
			subCommunities:[],
			subCommunitiesArray:[]

		}
	}

	componentDidMount(){


		this.setState(prevState=>({

			...prevState,
			subCommunities:this.props.subCommunities
		}))
	}


	componentWillUnmount(){
		this.props.subCommunitiesChoices(this.state.subCommunitiesArray);
	}


	 addCommunity=(data)=>{
		const element=document.getElementById(data.key);
		const elementParagraph=document.getElementById(data.key+"P");

		if(elementParagraph.style.color=="white"){
			element.style.background="white";
			elementParagraph.style.color=data.color;

			const target=data.category;
			for(var i=0;i<this.state.subCommunitiesArray.length;i++){
				const category=this.state.subCommunitiesArray[i];
				if(category==target){
					this.state.subCommunitiesArray.splice(i,1);
				}
			}

		}
		else{

			element.style.background=data.backgroundColor;
			elementParagraph.style.color="white";
			this.state.subCommunitiesArray.push(data.category);
		}
	}

	 uniqueParagraph=(data)=>{
		const uniqueParagraph=data.key+"P";
		return(
			<p id={uniqueParagraph} style={{color:data.color}}>{data.category} </p>
		)
	}

	render(){


		return(
			<React.Fragment>

				<SearchContainer placeholder="Search here nigga"> 
				</SearchContainer>

				<SubCommunitiesContainer>

					<ul>
						{this.state.subCommunities.map(data=>
								<li style={SubCommunitiesListCSS}>
									<CommunityChoicesDiv key={data.key} id={data.key} style={{borderColor:data.color}} onClick={()=>this.addCommunity(data)}>
										{this.uniqueParagraph(data)}


									</CommunityChoicesDiv>
								</li>
							)}
					</ul>

				</SubCommunitiesContainer>

			</React.Fragment>



		)
	}
}

export default SubCommunities;