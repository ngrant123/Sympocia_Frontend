import React,{Component} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {ArenaConsumer} from "./ArenaContext.js";
import {addBoost} from "../../../../Actions/Requests/ArenaPageAxiosRequests/ArenaPageSetRequests.js";  
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
	}

	@media screen and (max-width:740px) and (max-height:420px){
		#headerPost{
			height:150% !important;
		}
		#headerPostOwnerPicture{
			height:20% !important;
		}
		#headerPostLI{
			height:40% !important;
		}
		#headerPostOwnerPicture{
			height:20% !important;
		}
		#postsLI{
			margin-top:40% !important;
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


const MobileArenaOptions=styled.div`

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

/*

	setterMethods:{
		addTextReaction,
		addVideoReaction,
		addBoost,
		addStampToTextReaction,
		addStampToVideoReaction,
		removeVideoReaction,
		removeTextReaction
	}

	
	getterMethods:{
		fetchArenaInformation,
		getVideoReactions,
		getTextComments,
		getPreviousWinners
	}
*/
class ImageSection extends Component{

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
		}
	}
	
	boostPost=async(postSelected,arenaContext)=>{
		debugger;
		const {_id,image}=postSelected;
		const {score}=image
		const {arenaId}=this.props.posts;
		const boostInformation={
			postId:_id,
			score,
			postType:"Images",
			arenaId
		}
		arenaContext.triggerBoostCall(boostInformation);
	}
	
	headerPost=(arenaContext)=>{
		debugger;
		console.log(this.props.posts);
		let{posts}=this.props.posts;
		let headerPost=posts[0];
		console.log(headerPost);
		return 	<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:""}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> 1 </p>
							</li>
						</ul>
					</li>
					<a href="javascript:void(0)" style={{textDecoration:"none"}}>
						<li onClick={()=>arenaContext.displayPostModal("Images",headerPost.image)} style={{listStyle:"none"}}>
							<img id="headerPost"  src={headerPost.image.imgUrl} style={{width:"100%",height:"55%",borderRadius:"5px"}}/>
						</li>
					</a>

					<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							<li id="headerPostOwnerPicture" style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
								<a href={`/profile/${headerPost.image.owner._id}`} style={{textDecoration:"none"}}>
									<img src={headerPost.image.owner.profilePicture==null?
												NoProfilePicture:
												headerPost.image.owner.profilePicture
											}
									style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
								</a>
							</li>

							<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
								<b>{headerPost.image.owner.firstName}</b>
							</li>
						</ul>
					</li>

					{headerPost.image.hasProfileVoted==false?
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

	arenaOptions=(arenaContext)=>{
		return 	<>
					<a href="javascript:void(0)">
						<li onClick={()=>arenaContext.displayViewAllModal(2,"Images")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"#03A9F4"}}>
							View all
						</li>
					</a>

					<a href="javascript:void(0)">
						<li onClick={()=>arenaContext.displayPreviousWinners("Images")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
							View Previous Winners
						</li>
					</a>

					<a href="javascript:void(0)">
						<li onClick={()=>arenaContext.displayReactionModal("Images",this.state.arenaId)}
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
											<li onClick={()=>arenaContext.displayViewAllModal(2,"Images")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"#03A9F4"}}>
												View all
											</li>
										</a>
										<hr/>

										<a href="javascript:void(0)">
											<li onClick={()=>arenaContext.displayPreviousWinners("Images")} style={{marginLeft:"3%",listStyle:"none",display:"inline-block",color:"black"}}>
												View Previous Winners
											</li>
										</a>
										<hr/>

										<a href="javascript:void(0)">
											<li onClick={()=>arenaContext.displayReactionModal("Images",this.state.arenaId)}
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



	posts=(arenaContext)=>{
		let{posts}=this.props.posts;
		posts=posts.slice(1,posts.length);

		return <ul style={{padding:"0px"}}>
				{this.props.isDesktop==false &&(
					<hr/>
				)}
		
				{posts.map((data,index)=>
					<li id="smallPostLI" style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/>{index+2} </p>
									</li>
								</ul>
							</li>

							<a href="javascript:void(0)" style={{textDecoration:"none"}}>
								<li onClick={()=>arenaContext.displayPostModal("Images",data.image)} style={{listStyle:"none"}}>
									<img src={data.image.imgUrl}
									style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
								</li>
							</a>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li id="postProfilePicture" style={{listStyle:"none",display:"inline-block",width:"20%"}}>
										<a href={`/profile/${data.image.owner._id}`} style={{textDecoration:"none"}}>	
											<img src={data.image.owner.profilePicture==null?
														NoProfilePicture:
														data.image.owner.profilePicture
													} style={{borderRadius:"50%",width:"100%",height:"10%"}}
											/>
										</a>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.image.owner.firstName}</b>
									</li>
								</ul>
							</li>	
							{data.image.hasProfileVoted==false?
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

	render(){
		return(
			<ArenaConsumer>
				{arenaContext=>{
				return <Container>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",fontSize:"40px"}}>
									<b>Images</b>
								</li>

								{this.arenaPostUIOptions(arenaContext)}
							</ul>
						</li>
						<InputContainer placeholder="Search for someone here"/>
						<li style={{listStyle:"none",marginTop:"2%"}}>
							<ul style={{padding:"0px"}}>
								{this.state.headerPost!=null ?
									<li  id="headerPostLI" style={{listStyle:"none",display:"inline-block",width:"40%"}}>
										{this.headerPost(arenaContext)}
									</li>
									:<p> No posts :(</p>
								}

								{this.state.posts!=null &&(
									<li id="postsLI" style={{position:"relative",listStyle:"none",display:"inline-block",marginLeft:"5%",height:"75%",top:"0px",width:"55%",overflowX:"scroll"}}>
										{this.posts(arenaContext)}
									</li>
								)}
							</ul>
						</li>
					</ul>
					</Container>
					}	
				}

			</ArenaConsumer>
		)
	}
}

export default ImageSection;