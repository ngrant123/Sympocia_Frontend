import React,{Component} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {ArenaConsumer} from "./ArenaContext.js";
import CompetitionEndDate from "./CompetitionEndsDecider.js";


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
			posts
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
			posts
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
					{posts.map((data,index)=>
						<li style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
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
										<video key={data.video._id} style={{borderRadius:"5px"}} width="100%" height="40%" autoplay="true" controls>
											<source src={data.video.videoUrl} type="video/mp4"/>
										</video>
									</li>
								</a>

								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
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
							<video key={headerPost.video._id} style={{borderRadius:"5px"}} width="100%" height="45%" autoplay="true" controls>
								<source src={headerPost.video.videoUrl} type="video/mp4"/>
							</video>
						</li>
					</a> 

					<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
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
										<li  onClick={()=>arenaConsumer.displayViewAllModal(2,"Videos")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"#03A9F4"}}>
											View all
										</li>
									</a>

									<a href="javascript:void(0)">
										<li  onClick={()=>arenaConsumer.displayPreviousWinners("Videos")}  style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
											View Previous Winners
										</li>
									</a>

									<a href="javascript:void(0)">
										<li onClick={()=>arenaConsumer.displayReactionModal("Videos")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
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
								</ul>

							</li>
							<InputContainer placeholder="Search for someone here"/>
							<li style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									{this.state.headerPost!=null?
										<li style={{position:"relative",listStyle:"none",display:"inline-block",width:"40%",top:"-60px"}}>
											{this.headerPost(arenaConsumer)}
										</li>
										:<p> No posts yet :( </p>
									}
									{this.state.posts!=null &&(
										<li style={{position:"relative",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"75%",top:"0px",width:"55%",overflowX:"scroll"}}>
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