import React,{Component} from "react";
import styled from "styled-components";


const Container=styled.div`
	position:fixed;
	width:45%;
	height:40%;
	background-color:white;
	border-radius:5px;
	left:28%;
	top:10%;
	box-shadow: 1px 1px 10px #d5d5d5;
	z-index:30;
	overflow-y:auto;

	@media screen and (max-width:1370px) {
		#searchContainerLI{
			display:block !important;
			width:110% !important;
		}
		#optionLI{
			position:relative !important;
			display:block !important;
			top:0px !important;
			margin-top:2% !important;
		}
		width:80%;
		left:10%;
		height:50% !important;
	}

	@media screen and (max-width:595px) {
		#searchContainerLI{
			display:block !important;
			width:110% !important;
		}
		#optionLI{
			position:relative !important;
			display:block !important;
			top:0px !important;
			margin-top:2% !important;
		}
		width:95%;
		left:2%;
		height:50% !important;
	}

    @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
	 	height:80% !important;
    }
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

const SearchButton=styled.textarea`

	height:15%;
	width:90%;
	resize:none;
	border-radius:5px;
	border-style:none;
	text-align:center;
	z-index:6;
	white-space: nowrap;

	border-style:solid;
	border-width:2px;
	border-color:#BDBDBD;
`;

const SearchButtonCSS={ 
 listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginTop:"5%"
}

const PostOptionsCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"3%"
}

class SearchBarModal extends Component{
	constructor(props){
		super(props);
		this.state={
			searchType:null,
			selectedPostType:null
		}
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

	search=()=>{
		const searchQuery=document.getElementById("searchTextArea").value;
		if(this.state.searchType!=null && searchQuery!=""){
			this.props.history.push({
				pathname:`/search/${searchQuery}/${this.state.searchType}`,
				state:{
					postType:this.state.selectedPostType==null?"Images":this.state.selectedPostType
				}
			});
			this.props.closeSearchModal();
		}else{
			alert("Please enter what you want to search and the type of option");
		}
	}

	highlightSelectedPostType=(postType)=>{

	}

	render(){
		return(
			<Container>
				<ul style={{padding:"20px"}}>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li id="searchContainerLI" style={{listStyle:"none",display:"inline-block",width:"100%"}}>
								<SearchButton id="searchTextArea" placeholder="Search here (case-sensitive)"/>
							</li>
							<hr/>
							<li id="optionLI" style={{listStyle:"none",marginTop:"2%"}}>
								<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" 
											type="button" data-toggle="dropdown" style={{	
																					borderColor:"#5298F8",
																					borderStyle:"solid",
																					borderWidth:"1px",
																					color:"#5298F8",
																					backgroundColor:"white"}}>
										Options
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li onClick={()=>this.setState({searchType:"People"})}>
											<a href="javascript:;">People</a>
										</li>
										<hr/>
										<li onClick={()=>this.setState({searchType:"Posts"})}>
											<a href="javascript:;">Posts</a>
										</li>
										<hr/>
										<li onClick={()=>this.setState({searchType:"Symposiums"})}>
											<a href="javascript:;">Symposiums</a>
										</li>						
									</ul>
								</div>
							</li>
						</ul>
					</li>

					{this.state.searchType!=null?
						<>
							<hr/>
								<li style={{listStyle:"none"}}>
									Search Type: <b>{this.state.searchType}</b>
								</li>
							<hr/>
							{this.state.searchType=="Posts" &&(
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>

										<li style={{listStyle:"none",display:"inline-block"}}>
											<div class="dropdown">
												<button class="btn btn-primary dropdown-toggle" 
														type="button" data-toggle="dropdown" style={{	
																								borderColor:"#5298F8",
																								borderStyle:"solid",
																								borderWidth:"1px",
																								color:"#5298F8",
																								backgroundColor:"white"}}>
													Post Options
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu">
													<li onClick={()=>this.setState({selectedPostType:"Images"})}>
														<a href="javascript:;">Images</a>
													</li>
													<hr/>
													<li onClick={()=>this.setState({selectedPostType:"Videos"})}>
														<a href="javascript:;">Videos</a>
													</li>
													<hr/>
													<li onClick={()=>this.setState({selectedPostType:"Blogs"})}>
														<a href="javascript:;">Blogs</a>
													</li>	
													<hr/>
													<li onClick={()=>this.setState({selectedPostType:"RegularPosts"})}>
														<a href="javascript:;">Regular Posts</a>
													</li>						
												</ul>
											</div>
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginLeft:"2%"}}>
											{this.state.selectedPostType}
										</li>
									</ul>
								</li>
							)}
						</>
						:null
					}
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>this.search()}style={SearchButtonCSS}>
							Search
						</li>
					</a>
				</ul>
			</Container>
		)
	}
}

export default SearchBarModal;