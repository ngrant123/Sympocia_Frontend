import React,{Component} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CreationModal from "./CreationModal.js";

const Container=styled.div`
	position:fixed;
	width:65%;
	height:70%;
	background-color:white;
	border-radius:5px;
	z-index:31;
	top:10%;
	left:20%;
	overflow-y:auto;
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:30;
	top:0px;
`;

const LeaderProfilePicture=styled.div`
	border-radius:50%;
	width:130px;
	height:20%;
	background-color:red;
`;

const ParticipantsProfilePicture=styled.div`
	border-radius:50%;
	width:60px;
	height:30%;
	background-color:red;
`;

const CreateGroupVideoCallButtonCSS={
	borderColor:"#C8B0F4",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#C8B0F4",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"15px",
	width:"30%",
	listStyle:"none",
	marginBottom:"5%"
}

class GroupVideoCall extends Component{

	constructor(props){
		debugger;
		console.log(props);
		super(props);
		this.state={
			currentVideoCalls:[{
				participants:[{},{},{},{},{},{},{},{}]
			},{
				participants:[{},{},{},{},{},{},{},{}]
			},{
				participants:[{},{},{},{},{},{},{},{}]
			},{
				participants:[{},{},{},{},{},{},{},{}]	
			}],
			displayCreationModal:true
		}
	}



	render(){
		return createPortal(
			<>
				<ShadowContainer
					onClick={()=>this.props.closeModal()}
				/>

				<Container>
					{this.state.displayCreationModal==true?
						<CreationModal
							closeModal={this.props.closeModal}
							symposiumId={this.props.symposiumId}
							routerHistory={this.props.routerHistory}
						/>:
						<ul style={{padding:"30px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",fontSize:"40px"}}>
										<b>
											Group video calls
										</b>
									</li>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>this.props.closeModal()} style={{listStyle:"none",display:"inline-block",marginLeft:"60%"}}>
											<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
												 width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3" fill="none"
												  stroke-linecap="round" stroke-linejoin="round">
												  <path stroke="none" d="M0 0h24v24H0z"/>
												  <circle cx="12" cy="12" r="9" />
												  <path d="M10 10l4 4m0 -4l-4 4" />
											</svg>
										</li>
									</a>
								</ul>
							</li>
							<p> Check out what other people are talking about in this symposium </p>
							<hr/>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={CreateGroupVideoCallButtonCSS}>
									Create Group Call
								</li>
							</a>

							<li style={{listStyle:"none"}}>
								<ul style={{padding:"10px"}}>
									{this.state.currentVideoCalls.map(data=>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li style={{listStyle:"none",marginBottom:"5%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
														<LeaderProfilePicture/>
													</li>
													<li style={{listStyle:"none",display:"inline-block",width:"55%",height:"25%",overflowY:"auto"}}>
														<p style={{fontSize:"20px"}}>
															<b>Nathn</b>
														</p>
														<p>Testing Information Again</p>
														<p>
														Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
														do eiusmod tempor incididunt ut labore et dolore magna aliqua.
														 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
														  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
														  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
														   Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
														    deserunt mollit anim id est laborum.
														</p>
													</li>
													<li style={{listStyle:"none",display:"inline-block",height:"25%",width:"20%",overflowY:"auto"}}>
														<ul style={{padding:"0px"}}>
															<p> Pariticipants </p>
															<hr/>
															{data.participants.map(participantsData=>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
																	<ParticipantsProfilePicture/>
																</li>
															)}
														</ul>
													</li>
													<hr/>
												</ul>
											</li>
										</a>
									)}
								</ul>
							</li>
						</ul>
					}
				</Container>
			</>
		,document.getElementById("extendedSymposiumContainer"));
	}
}

export default GroupVideoCall;
