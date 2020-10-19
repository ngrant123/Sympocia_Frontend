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

class BlogSection extends Component{

	constructor(props){
		super(props);
		console.log(props);
		debugger;
		let{
			endDate,
			posts,
			arenaId
		}=props.posts;

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
		const {_id,blog}=postSelected;
		const {score}=blog
		const {arenaId}=this.props.posts;
		const boostInformation={
			postId:_id,
			score,
			postType:"Blogs",
			arenaId
		}
		arenaContext.triggerBoostCall(boostInformation);
	}

	posts=(arenaContext)=>{
		let{posts}=this.props.posts;
		posts=posts.slice(1,posts.length);

		return <ul style={{padding:"0px"}}>
					{posts.map((data,index)=>
						<li style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:""}}>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {index+2} </p>
										</li>
									</ul>
								</li>
								<p style={{fontSize:"15px",height:"5%",overflow:"hidden"}}>
									<b>{data.blog.title}</b>
								</p>
								<p style={{height:"5%",overflow:"hidden"}}>
									{data.blog.description}
								</p>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>arenaContext.displayPostModal("Blogs",data.blog)} style={{listStyle:"none"}}>
										<img src={data.blog.blogImageUrl}
										style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
									</li>
								</a>

								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
											<a href={`/profile/${data.blog.owner._id}`} style={{textDecoration:"none"}}>
												<img src={data.blog.owner.profilePicture==null?
															NoProfilePicture:
															data.blog.owner.profilePicture
														}
												style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
											</a>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
											<b>{data.blog.owner.firstName}</b>
										</li>
									</ul>
								</li>
								{data.blog.hasProfileVoted==false?
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={BoostButton} onClick={()=>this.boostPost(data,arenaContext)}>
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

	headerPost=(arenaContext)=>{
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
					<p style={{fontSize:"25px",height:"5%",overflow:"hidden"}}>
						<b>{this.state.headerPost.blog.title}</b>
					</p>
					<p style={{height:"5%",overflow:"hidden"}}>{headerPost.blog.description}</p>

					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li style={{listStyle:"none"}}>
							<img onClick={()=>arenaContext.displayPostModal("Blogs",headerPost.blog)}
								 src={headerPost.blog.blogImageUrl}
							style={{width:"100%",height:"55%",borderRadius:"5px"}}/>
						</li>
					</a>

					<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
								<a href={`/profile/${headerPost.blog.owner._id}`} style={{textDecoration:"none"}}>
									<img src={headerPost.blog.owner.profilePicture==null?
												NoProfilePicture:
												headerPost.blog.owner.profilePicture
											}
									style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
								</a>
							</li>

							<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
								<b>{headerPost.blog.owner.firstName}</b>
							</li>
						</ul>
					</li>
					{headerPost.blog.hasProfileVoted==false?
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li style={BoostButton} onClick={()=>this.boostPost(headerPost,arenaContext)}>
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
				{arenaContext=>{
					return <Container>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",fontSize:"40px"}}>
										<b>Blogs</b>
									</li>

									<a href="javascript:void(0)">
										<li onClick={()=>arenaContext.displayViewAllModal(2,"Blogs")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"#03A9F4"}}>
											View all
										</li>
									</a>

									<a href="javascript:void(0)">
										<li onClick={()=>arenaContext.displayPreviousWinners("Blogs")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
											View Previous Winners
										</li>
									</a>

									<a href="javascript:void(0)">
										<li onClick={()=>arenaContext.displayReactionModal("Blogs",this.state.arenaId)} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
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
										<li style={{listStyle:"none",display:"inline-block",width:"40%"}}>
											{this.headerPost(arenaContext)}	
										</li>
										:
										<p> No posts yet :(</p>
									}
									{this.state.posts!=null && (
										<li style={{position:"relative",listStyle:"none",display:"inline-block",marginLeft:"5%",height:"75%",top:"0px",width:"55%",overflowX:"scroll"}}>
											{this.posts(arenaContext)}
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

export default BlogSection;