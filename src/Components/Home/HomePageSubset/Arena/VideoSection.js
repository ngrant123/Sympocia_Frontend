import React,{Component} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {ArenaConsumer} from "./ArenaContext.js";
import CompetitionEndDate from "./CompetitionEndsDecider.js";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const Container=styled.div`
	width:90%;
	@media screen and (max-width:1370px){
		#headerPostLI{
			display:block !important;
		}
		#postsLI{
			display:block !important;
			width:180% !important;
			margin-left:-10% !important;
		}

		#headerPost{
			height:30% !important;
			width:200% !important;
		}
		#smallPostLI{
			width:30% !important;
			margin-right:5% !important;
		}
		#headerPostOwnerPicture{
			width:50% !important;
		}
		#postProfilePicture{
			width:40% !important;
		}
		#postsLIContainer{
			margin-top:40% !important;
		}
	}

	@media screen and (max-width:740px) and (max-height:420px){
		#headerPost{
			height:60% !important;
		}
		#headerPostLI{
			height:170% !important;
		}
    }	
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

	@media screen and (max-width:1370px){
		width:90% !important;
	}
	@media screen and (max-width:740px) and (max-height:420px){
		height:20% !important;
    }	
`;

const CompetitionButtonMobile={
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
  marginLeft:"3%",
  width:"25%"
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

const BoostedButtonCSS={
 listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"5px",
  color:"#FFC107",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#FFC107"
}

class VideoSection extends Component{

	constructor(props){
		super(props);
		let{
			endDate,
			posts,
			arenaId
		}=props.posts;
		debugger;
		let headerPost;
		if(posts!=null){
			headerPost=posts[0];
			posts=posts.slice(1,posts.length);
		}

		this.state={
			searchName:"",
			headerPost,
			posts,
			arenaId
		};
	}

	boostPost=async(postSelected,arenaContext)=>{
		debugger;
		const {_id,video}=postSelected;
		const {score}=video
		const {arenaId}=this.props.posts;
		const boostInformation={
			postId:_id,
			score,
			postType:"Videos",
			arenaId
		}
		arenaContext.triggerBoostCall(boostInformation);
	}

	posts=(arenaConsumer)=>{
		let{posts}=this.props.posts;
		posts=posts.slice(1,posts.length);

		return <ul style={{padding:"0px"}}>
					{this.props.isDesktop==false &&(
						<hr/>
					)}
					{posts.map((data,index)=>
						<li id="smallPostLI" style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:""}}>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {index+2} </p>
										</li>
									</ul>
								</li>

								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>arenaConsumer.displayPostModal("Videos",data.video)} style={{listStyle:"none"}}>
										<video key={data.video._id} style={{borderRadius:"5px"}} width="100%" height="40%" autoplay="true" controls muted>
											<source src={data.video.videoUrl} type="video/mp4"/>
										</video>
									</li>
								</a>

								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li id="postProfilePicture" style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
											<a href={`/profile/${data.video.owner._id}`} style={{textDecoration:"none"}}>	
												<img src={data.video.owner.profilePicture==null?
															NoProfilePicture:
															data.video.owner.profilePicture
														}
												style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
											</a>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
											<b>{data.video.owner.firstName}</b>
										</li>
									</ul>
								</li>
								{data.video.hasProfileVoted==false?
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={BoostButton} onClick={()=>this.boostPost(data,arenaConsumer)}>
											<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
											  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
											  <path stroke="none" d="M0 0h24v24H0z"/>
											  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
											</svg>

											Boost
										</li>
									</a>:
									<li style={BoostedButtonCSS}>
										<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
										  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
										  <path stroke="none" d="M0 0h24v24H0z"/>
										  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
										</svg>

										Boosted
									</li>
								}
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
	}

	headerPost=(arenaConsumer)=>{
		let{posts}=this.props.posts;
		let headerPost=posts[0];

		return <ul style={{padding:"0px"}}>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:""}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/>1</p>
							</li>
						</ul>
					</li>

					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>arenaConsumer.displayPostModal("Videos",headerPost.video)} style={{listStyle:"none"}}>
							<video id="headerPost" key={headerPost.video._id} style={{borderRadius:"5px"}} width="100%" height="45%" autoplay="true" controls muted>
								<source src={headerPost.video.videoUrl} type="video/mp4"/>
							</video>
						</li>
					</a> 

					<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							<li id="headerPostOwnerPicture" style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
								<a href={`/profile/${headerPost.video.owner._id}`} style={{textDecoration:"none"}}>
									<img src={headerPost.video.owner.profilePicture==null?
												NoProfilePicture:
												headerPost.video.owner.profilePicture
											}
									style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
								</a>
							</li>

							<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
								<b>{headerPost.video.owner.firstName}</b>
							</li>
						</ul>
					</li>

					{headerPost.video.hasProfileVoted==false?
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li style={BoostButton} onClick={()=>this.boostPost(headerPost,arenaConsumer)}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
								  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z"/>
								  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
								</svg>

								Boost
							</li>
						</a>:
						<li style={BoostedButtonCSS}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
							  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z"/>
							  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
							</svg>

							Boosted
						</li>
					}
				</ul>
	}

	arenaOptions=(arenaContext)=>{
	return 	<>
				<a href="javascript:void(0)">
					<li onClick={()=>arenaContext.displayViewAllModal(2,"Videos")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"#03A9F4"}}>
						View all
					</li>
				</a>

				<a href="javascript:void(0)">
					<li onClick={()=>arenaContext.displayPreviousWinners("Videos")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
						View Previous Winners
					</li>
				</a>

				<a href="javascript:void(0)">
					<li onClick={()=>arenaContext.displayReactionModal("Videos",this.state.arenaId)}
						 style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
						See What people are saying
					</li>
				</a>
				<li style={CompetitionButton}>
					{this.props.posts.endDate==null ?
							<p> No competition end date </p>:
							<CompetitionEndDate
								days={this.props.posts.endDate.competitionEndDate}
							/>
						}
				</li>
			</>
	}

	arenaPostUIOptions=(arenaContext)=>{
		return <>
					{this.props.isDesktop==true?
						<>{this.arenaOptions(arenaContext)}</>
						:<li style={{marginLeft:"3%",listStyle:"none",display:"inline-block"}}>
							<div class="btn-group dropleft">
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"
									style={{backgroundColor:"white",borderStyle:"none"}}
								>
									<KeyboardArrowDownIcon
										style={{color:"black",borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
									/>
								</button>
								<div class="dropdown-menu" style={{marginLeft:"-20%"}}>
									<ul>
										<a href="javascript:void(0)">
											<li onClick={()=>arenaContext.displayViewAllModal(2,"Videos")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"#03A9F4"}}>
												View all
											</li>
										</a>
										<hr/>

										<a href="javascript:void(0)">
											<li onClick={()=>arenaContext.displayPreviousWinners("Videos")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
												View Previous Winners
											</li>
										</a>
										<hr/>

										<a href="javascript:void(0)">
											<li onClick={()=>arenaContext.displayReactionModal("Videos",this.state.arenaId)}
												 style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
												See What people are saying
											</li>
										</a>
										<hr/>
										<li style={CompetitionButtonMobile}>
											{this.props.posts.endDate==null ?
													<p> No competition end date </p>:
													<CompetitionEndDate
														days={this.props.posts.endDate.competitionEndDate}
													/>
												}
										</li>
									</ul>
								</div>
							</div>
						</li>
					}
				</>
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

									{this.arenaPostUIOptions(arenaConsumer)}
								</ul>
							</li>
							<InputContainer placeholder="Search for someone here"/>
							<li id="postsLIContainer" style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									{this.state.headerPost!=null?
										<li id="headerPostLI" style={{position:"relative",listStyle:"none",display:"inline-block",width:"40%",top:"-60px"}}>
											{this.headerPost(arenaConsumer)}
										</li>
										:<p> No posts yet :( </p>
									}
									{this.state.posts!=null &&(
										<li id="postsLI" style={{position:"relative",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"75%",top:"0px",width:"55%",overflowX:"scroll"}}>
											{this.posts(arenaConsumer)}
										</li>
									)}
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