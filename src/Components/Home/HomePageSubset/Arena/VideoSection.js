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

class VideoSection extends Component{

	constructor(props){
		super(props);
		this.state={
			searchName:"",
			headerVideo:{rank:24,firstName:"Nathan"},
			posts:[{title:"Testing video title", description:"Testing video description",rank:1},{rank:2},{rank:3},{rank:4},{rank:5}]
		};
	}

	render(){
		return(
			<ArenaConsumer>
				{arenaConsumer=>{
					return <Container>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",fontSize:"40px"}}>
												<b>Videos</b>
											</li>

											<a href="javascript:void(0)">
												<li  onClick={()=>arenaConsumer.displayViewAllModal("Video")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"#03A9F4"}}>
													View all
												</li>
											</a>

											<a href="javascript:void(0)">
												<li  onClick={()=>arenaConsumer.displayPreviousWinners("Video")}  style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
													View Previous Winners
												</li>
											</a>

											<a href="javascript:void(0)">
												<li onClick={()=>arenaConsumer.displayReactionModal("Video")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
													See What people are saying
												</li>
											</a>
											<li style={CompetitionButton}>
												Competition Ends: Friday 11
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
																<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {this.state.headerVideo.rank} </p>
															</li>
														</ul>
													</li>

													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li onClick={()=>arenaConsumer.displayPostModal("Video",this.state.headerVideo)} style={{listStyle:"none"}}>
															<video style={{borderRadius:"5px"}} width="100%" height="45%" autoplay="true" controls>
																<source src={this.state.headerVideo.videoSrc} type="video/mp4"/>
															</video>
														</li>
													</a>

													<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
																<img src={this.state.headerVideo.videoSrc==null?TestProfilePicture:this.state.headerVideo.videoSrc}
																style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
															</li>

															<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
																<b>{this.state.headerVideo.firstName}</b>
															</li>
														</ul>
													</li>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li onClick={()=>arenaConsumer.handleBoost()} style={BoostButton}>
															<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
															  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
															  <path stroke="none" d="M0 0h24v24H0z"/>
															  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
															</svg>

															Boost
														</li>
													</a>
												</ul>
											</li>

											<li style={{position:"relative",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"75%",top:"0px",width:"55%",overflowX:"scroll"}}>
												<ul style={{padding:"0px"}}>
													{this.state.posts.map(data=>
														<li style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none"}}>
																	<ul style={{padding:""}}>
																		<li style={{listStyle:"none",display:"inline-block"}}>
																			<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {this.state.headerVideo.rank} </p>
																		</li>
																	</ul>
																</li>

																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<li onClick={()=>arenaConsumer.displayPostModal("Video",data)} style={{listStyle:"none"}}>
																		<video style={{borderRadius:"5px"}} width="100%" height="40%" autoplay="true" controls>
																			<source src={this.state.headerVideo.videoSrc} type="video/mp4"/>
																		</video>
																	</li>
																</a>

																<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
																	<ul style={{padding:"0px"}}>
																		<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
																			<img src={this.state.headerVideo.videoSrc==null?TestProfilePicture:this.state.headerVideo.videoSrc}
																			style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
																		</li>

																		<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
																			<b>{this.state.headerVideo.firstName}</b>
																		</li>
																	</ul>
																</li>
																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<li onClick={()=>arenaConsumer.handleBoost()} style={BoostButton}>
																		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
																		  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
																		  <path stroke="none" d="M0 0h24v24H0z"/>
																		  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
																		</svg>

																		Boost
																	</li>
																</a>
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

export default VideoSection;