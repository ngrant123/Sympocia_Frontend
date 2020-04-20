import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import Checkbox from '@material-ui/core/Checkbox';
import SearchExplorePosts from "../SearchExploreSubset/index.js";

const CommentCreationContainer=styled.div`
	position:relative;
	width:80px;
	height:7%;
	background-color:white;
	border-radius:10px;
	border-style:noe;
	box-shadow: 1px 1px 5px 	#9395a0;

`;


const ProfilePicture=styled.div`
	position:relative;
	width:45px;
	height:5%;
	background-color:black;
	border-radius:50%;
`;

const CommentTextArea=styled.textarea`
	position:relative;
	resize:none;
	border-style:none;
	height:5%;
	text-align:center;
	padding-top:10px;
	width:180%;
`;

class SearchExploreContainer extends Component{


	constructor(props){
		super(props);
		this.state={
			subCommunitiesDisplay:[],
			selectedIndustry:"",
			selectedSubCommunities:[]
		}
	}

	handleCheckBoxCheck=()=>{
		console.log("Testing");
	}

	render(){
		return(
			<React.Fragment>
				<ul style={{padding:"0px",marginLeft:"10%",marginTop:"8%"}}>
					<li style={{listStyle:"none",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",marginBottom:"2%"}}>
								<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"2%",color:"#C8B0F4"}}>
													<b>Create a post</b>
												</li>

												<li style={{listStyle:"none",display:"inline-block",width:"30%",boxShadow:"1px 1px 5px #848484",borderRadius:"5px"}}>
													<ul style={{padding:"10px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
															<ProfilePicture>
															</ProfilePicture>
														</li>
														<li style={{listStyle:"none",display:"inline-block"}}>
															<CommentTextArea placeholder="Start typing here to create a post"/>
														</li>


													</ul>
												</li>

												<li style={{marginLeft:"5%",listStyle:"none",display:"inline-block",fontSize:"40px"}}>
													<b>Explore Communities</b>
												</li>
								</ul>
								
							</li>
							Select Industries:

							<li style={{listStyle:"none",display:"inline-block",marginLeft:"2%"}}>

								<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																				borderColor:"#5298F8",
																																				borderStyle:"solid",
																																				borderWidth:"1px",
																																				color:"#5298F8",
																																				backgroundColor:"white"}}>
										Sort By
										<span class="caret"></span>
									</button>
										<ul class="dropdown-menu">
										
											{PERSONAL_INDUSTRIES.INDUSTRIES.map(data=>
												<li><a href="">{data.industry}</a></li>
											)}				
										</ul>
								</div>
							</li>

							<li style={{listStyle:"none",display:"inline-block",marginLeft:"70%"}}>
								Grid Style
								<Checkbox
									style={{fontSize:20,color:"#5298F8"}}
									onChange={this.handleCheckBoxCheck()}
								/>
							</li>
						</ul> 
					</li>

					<li style={{listStyle:"none"}}>
						<SearchExplorePosts/>
					</li>
				</ul>
			</React.Fragment>
		)
	}
}

export default SearchExploreContainer;