import React,{Component} from "react";
import styled from "styled-components";
import TestProfilePicture from "../../../../designs/img/FirstSectionLandingPAgeImage.png";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {ArenaConsumer} from "./ArenaContext.js";

const Container=styled.div`
	width:90%;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	width:35%;
	height:8%;
`;

const CompetitionButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"5px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginLeft:"3%"
}

const BoostButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"5px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

class BlogSection extends Component{

	constructor(props){
		super(props);
		this.state={
			searchName:"",
			headerBlog:{title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",rank:24,firstName:"Nathan"},
			posts:[{owner:{},rank:1},{owner:{},rank:2},{owner:{},rank:3},{owner:{},rank:4},{owner:{},rank:5}]
		};
	}

	render(){
		return(
			<ArenaConsumer>
				{arenaContext=>{
					return <Container>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",fontSize:"40px"}}>
										<b>Blogs</b>
									</li>

									<a href="javascript:void(0)">
										<li onClick={()=>arenaContext.displayViewAllModal("Blog")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"#03A9F4"}}>
											View all
										</li>
									</a>

									<a href="javascript:void(0)">
										<li onClick={()=>arenaContext.displayPreviousWinners("Blog")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
											View Previous Winners
										</li>
									</a>

									<a href="javascript:void(0)">
										<li onClick={()=>arenaContext.displayReactionModal("Blog")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
											See What people are saying
										</li>
									</a>
									<li style={CompetitionButton}>
										Competition Ends: Friday 13
									</li>
								</ul>
							</li>
							<InputContainer placeholder="Search for someone here"/>
							<li style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"40%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<ul style={{padding:""}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {this.state.headerBlog.rank} </p>
													</li>
												</ul>
											</li>
											<p style={{fontSize:"25px",height:"5%",overflow:"hidden"}}>
												<b>{this.state.headerBlog.title}</b>
											</p>
											<p style={{height:"5%",overflow:"hidden"}}>{this.state.headerBlog.description}</p>


											<li style={{listStyle:"none"}}>
												<img onClick={()=>arenaContext.displayPostModal("Blog",this.state.headerBlog)} src={this.state.headerBlog.imgSrc==null?TestProfilePicture:this.state.headerBlog.imgSrc}
												style={{width:"100%",height:"55%",borderRadius:"5px"}}/>
											</li>

											<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
														<img src={this.state.headerBlog.imgSrc==null?TestProfilePicture:this.state.headerBlog.imgSrc}
														style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
													</li>

													<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
														<b>{this.state.headerBlog.firstName}</b>
													</li>
												</ul>
											</li>
											<li onClick={()=>arenaContext.handleBoost()} style={BoostButton}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
												  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
												  <path stroke="none" d="M0 0h24v24H0z"/>
												  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
												</svg>

												Boost
											</li>
										</ul>
									</li>

									<li style={{position:"relative",listStyle:"none",display:"inline-block",marginLeft:"5%",height:"75%",top:"0px",width:"55%",overflowX:"scroll"}}>
										<ul style={{padding:"0px"}}>
											{this.state.posts.map(data=>
												<li style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none"}}>
															<ul style={{padding:""}}>
																<li style={{listStyle:"none",display:"inline-block"}}>
																	<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {this.state.headerBlog.rank} </p>
																</li>
															</ul>
														</li>
														<p style={{fontSize:"15px",height:"5%",overflow:"hidden"}}>
															<b>{this.state.headerBlog.title}</b>
														</p>
														<p style={{height:"5%",overflow:"hidden"}}>
															{this.state.headerBlog.description}
														</p>

														<li onClick={()=>arenaContext.displayPostModal("Blog",data)} style={{listStyle:"none"}}>
															<img src={this.state.headerBlog.imgSrc==null?TestProfilePicture:this.state.headerBlog.imgSrc}
															style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
														</li>

														<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
																	<img src={this.state.headerBlog.imgSrc==null?TestProfilePicture:this.state.headerBlog.imgSrc}
																	style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
																</li>

																<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
																	<b>{this.state.headerBlog.firstName}</b>
																</li>
															</ul>
														</li>
														<li onClick={()=>arenaContext.handleBoost()} style={BoostButton}>
															<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
															  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
															  <path stroke="none" d="M0 0h24v24H0z"/>
															  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
															</svg>

															Boost
														</li>
													</ul>
												</li>
											)}
											{this.state.posts.length>5?
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li style={{listStyle:"none"}}>
														See more... 
													</li>
												</a>:null
											}
										</ul>
									</li>
								</ul>
							</li>
						</ul>
							</Container>
				}}
			</ArenaConsumer>
		)
	}
}

export default BlogSection;