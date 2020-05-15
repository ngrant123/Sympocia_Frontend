import React,{Component} from "react";
import styled from "styled-components";


const Container=styled.div`
	position:relative;
	width:45%;
	height:250%;
	background-color:white;
	border-radius:5px;
	left:28%;
	top:39%;
	box-shadow: 1px 1px 10px #d5d5d5;
	z-index:7;
	overflow-y:auto;
`;

const SymposiumsContainer=styled.div`
	position:relative;
	width:100%;
	height:20%;
	border-radius:5px;
	background-color:red;
	padding:10px;
	color:white;
	transition:.8s;

	&:hover{
		box-shadow: 5px 5px 10px #d5d5d5;
		margin-bottom:2%;
	}
`;


class SearchBarModal extends Component{
	constructor(props){
		super(props);
		this.state={
			recentSearchesTest:[
				{
					search:"Testing1",
					industry:"Engineering"
				},
				{
					search:"Testing2",
					industry:"Engineering2"
				},
				{
					search:"Testing3",
					industry:"Engineering3"
				},
				{
					search:"Testing4",
					industry:"Engineerin4"
				},
				{
					search:"Testing5",
					industry:"Engineering5"
				}
			],
			suggestedCommunitiesTest:[
				{
					industry:"Engineering"
				},
				{
					industry:"Fashion"
				},
				{
					industry:"Sports"
				},
				{
					industry:"Math"
				},
				{
					industry:"Drawing"
				}
			]
		}
	}

	componentDidMount(){
		this.changeHeaderOptionCSS("Recent");
	}

	changeHeaderOptionCSS=(option)=>{
		const recent=document.getElementById("recentOption");
		recent.style.color="#BDBDBD";
		recent.style.borderBottom="none";

		const people=document.getElementById("peopleOption");
		people.style.color="#BDBDBD";
		people.style.borderBottom="none";

		const symposiums=document.getElementById("symposiumsOption");
		symposiums.style.color="#BDBDBD";
		symposiums.style.borderBottom="none";


		if(option=="Recent"){
			recent.style.color="black";
			recent.style.borderBottom="solid 2px";
			recent.style.borderColor="black";
		}else if (option=="People"){
			people.style.color="black";
			people.style.borderBottom="solid 2px";
			people.style.borderColor="black";
		}else{
			symposiums.style.color="black";
			symposiums.style.borderBottom="solid 2px";
			symposiums.style.borderColor="black";
		}
	}

	render(){
		return(
			<Container>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",borderBottom:"solid",borderColor:"#F2F2F2",borderWidth:"2px",marginBottom:"1%"}}>
						<ul style={{paddingLeft:"10px",paddingTop:"20px"}}>
							<li id="recentOption" onClick={()=>this.changeHeaderOptionCSS("Recent")} style={{listStyle:"none",display:"inline-block",fontSize:"15px",marginRight:"10%"}}>
								<a style={{textDecoration:"none",color: "inherit"}} href="javascript:void(0);">
									Recent Searches
								</a>
							</li>
							<li id="peopleOption" onClick={()=>this.changeHeaderOptionCSS("People")} style={{listStyle:"none",display:"inline-block",fontSize:"15px",marginRight:"10%"}}>
								<a style={{textDecoration:"none",color: "inherit"}} href="javascript:void(0);">
									People
								</a>
							</li>
							<li id="symposiumsOption" onClick={()=>this.changeHeaderOptionCSS("Symposiums")} style={{listStyle:"none",display:"inline-block",fontSize:"15px"}}>
								<a style={{textDecoration:"none",color: "inherit"}} href="javascript:void(0);">
									Symposiums
								</a>
							</li>
						</ul>
					</li>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",width:"40%"}}>
								<p style={{color:"#A4A4A4",paddingLeft:"5px"}}><b>Recent Searches</b></p>
								<ul style={{padding:"10px",overflowY:"auto"}}>
									{this.state.recentSearchesTest.map(data=>
											<a style={{textDecoration:"none",color: "inherit"}} href="javascript:void(0);">
												<li style={{listStyle:"none",marginBottom:"2%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",fontSize:"15px",marginRight:"15%"}}>
															<b>{data.search}</b>
														</li>
														<li style={{listStyle:"none",display:"inline-block",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",padding:"10px",borderRadius:"5px"}}>
															{data.industry}
														</li>
													</ul>
												</li>
										 	</a>

									)}
								</ul>
							</li>
							<li style={{listStyle:"none",display:"inline-block",position:"relative",top:"-140px"}}>
								<p style={{color:"#A4A4A4",paddingLeft:"5px"}}><b>Recommneded Symposiums</b></p>
								<ul style={{padding:"10px"}}>
									{this.state.suggestedCommunitiesTest.map(data=>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5%"}}>
											<a style={{textDecoration:"none"}} href="javascript:void(0);">
												<SymposiumsContainer>
													<b>{data.industry}</b>
												</SymposiumsContainer>
											</a>
										</li>
									)}
								</ul>

							</li>
						</ul>
					</li>
				</ul>

			</Container>
		)
	}
}

export default SearchBarModal;