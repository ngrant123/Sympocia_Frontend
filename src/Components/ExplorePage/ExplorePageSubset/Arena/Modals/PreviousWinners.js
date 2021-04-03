import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {ArenaConsumer} from "../ArenaContext.js";

const Container=styled.div`
	position:fixed;
	z-index:13;
	height:90%;
	width:60%;
	border-radius:5px;
	top:5%;
	left:20%;
	overflow-y:auto;
	background-color:white;
	padding:20px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		#postLI{
			width:80% !important;
			margin-left:-5% !important;
			height:80% !important;
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
	width:180%;
	height:5%;
`;


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

const FilterButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

const DateCaption={
	listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

/*
Sample api call
	imageData:{
			owner:{
				firstName:"Bob"
			}
		},
		arenaScore:20,
		winnerDate:1597939577235

Could later on add a search bar
*/

const PreviousWinnersModal=({closeModal,postType,currentPosts})=>{

	const [posts,changePosts]=useState([...currentPosts]);
	const constructDate=(dateMilliseconds)=>{
		const newDate=new Date(dateMilliseconds).toLocaleDateString();
		return newDate;
	}

	const imageWinners=(arenaContext)=>{
		return(
			<>
				{posts.map(data=>
					<li id="postLI" style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							{/*
								<li style={DateCaption}>
									Winner on: {constructDate(data.winnerDate)}
								</li>
							*/}
							<a href="javascript:void(0)" style={{textDecoration:"none"}}>
								<li onClick={()=>arenaContext.displayPostModal("Images",data.winner)} style={{listStyle:"none"}}>
									<img src={data.winner.imgUrl} style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
								</li>
							</a>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
										<a href={`/profile/${data.winner.owner._id}`} style={{textDecoration:"none"}}>
											<img src={data.winner.owner.profilePicture==null?
														NoProfilePicture:
														this.state.headerVideo.videoSrc
													}
											style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
										</a>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.winner.owner.firstName}</b>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				)}
			</>
		);
	}

	const videoWinners=(arenaContext)=>{
		return(
			<>
				{posts.map(data=>
					<li id="postLI" style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							{/*
								<li style={DateCaption}>
									Winner on: {constructDate(data.winnerDate)}
								</li>
							*/}
							<a href="javascript:void(0)" style={{textDecoration:"none"}}>
								<li onClick={()=>arenaContext.displayPostModal("Videos",data.winner)} 
									style={{listStyle:"none",marginTop:"1%"}}>
									<video key={data.winner._id} style={{borderRadius:"5px"}} width="100%" height="40%" autoplay="true" controls>
										<source src={data.winner.videoUrl} type="video/mp4"/>
									</video>
								</li>
							</a>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
										<a href={`/profile/${data.winner.owner._id}`} style={{textDecoration:"none"}}>
											<img src={data.winner.owner.profilePicture==null?
														NoProfilePicture:
														data.winner.owner.profilePicture
													}
											style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
										</a>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.winner.owner.firstName}</b>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				)}
			</>
		);
	}

	const blogWinners=(arenaContext)=>{
		return <>
					{posts.map(data=>
						<li id="postLI" style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
							<ul style={{padding:"0px"}}>
								{/*
									<li style={DateCaption}>
										Winner on: {constructDate(data.winnerDate)}
									</li>
								*/}
					
								<p style={{fontSize:"15px",height:"5%",overflow:"hidden"}}>
									<b>{data.winner.title}</b>
								</p>
								<p style={{height:"5%",overflow:"hidden"}}>
									{data.winner.description}
								</p>

								<a href="javascript:void(0)" style={{textDecoration:"none"}}>
									<li onClick={()=>arenaContext.displayPostModal("Blogs",data.winner)} style={{listStyle:"none"}}>
										<img src={data.winner.blogImageUrl} style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
									</li>
								</a>

								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li onClick={()=>arenaContext.displayPostModal("Blogs",data.winner)} style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
											<a href={`/profile/${data.winner.owner._id}`} style={{textDecoration:"none"}}>
												<img src={data.winner.owner.profilePicture==null?
															NoProfilePicture:
															data.winner.owner.profilePicture
														}
												style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
											</a>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
											<b>{data.winner.owner.firstName}</b>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					)}
			   </>;
	}

	const regularPostWinners=(arenaContext)=>{
		return  <>
					{posts.map(data=>
						<li id="postLI" style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
							<ul style={{padding:"0px"}}>
								{/*
									<li style={DateCaption}>
										Winner on: {constructDate(data.winnerDate)}
									</li>
								*/}
							
								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
											<a href={`/profile/${data.winner.owner._id}`} style={{textDecoration:"none"}}>
												<img src={data.winner.owner.profilePicture==null?
															NoProfilePicture:
															data.winner.owner.profilePicture
														}
												style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
											</a>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
											<b>{data.winner.owner.firstName}</b>
										</li>
									</ul>
								</li>
								<li style={{listStyle:"none",height:"40%",overflowY:"auto",marginBottom:"1%"}}>
									 {data.winner.post}
								</li>
							</ul>
						</li>
					)}
				</>;
	}
	const filterByMostPopular=()=>{
		const currentPosts=posts;

		currentPosts.sort(function(a,b){
			const aScore=a.score;
			const bScore=b.score;
			return aScore<bScore?1:-1;
		});
		changePosts([...currentPosts]);
	}

	const filterByNewest=()=>{
		const currentPosts=posts;

		currentPosts.sort(function(a,b){
			const aDate=a.dateWon;
			const bDate=b.dateWon;
			return aDate<bDate?1:-1;
		});
		changePosts([...currentPosts]);
	}

	const renderPost=(arenaContext)=>{
		switch(postType){
			case 'Images':
				return imageWinners(arenaContext);
				break;

			case 'Blogs':
				return blogWinners(arenaContext);
				break;

			case 'Videos':
				return videoWinners(arenaContext);
				break;

			case 'RegularPosts':
				return regularPostWinners(arenaContext);
				break;

			default:
			break;
		}
	}

	return(
		<ArenaConsumer>
			{arenaContext=>{
				return <>
						<ShadowContainer onClick={()=>closeModal()}/>
						<Container>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
									<p style={{fontSize:"25px"}}>
										 <b>Previous Winners</b>
									</p>
								</li>
								<hr/>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>filterByMostPopular()} style={FilterButton}>
												Most Popular
											</li>
										</a>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>filterByNewest()}style={FilterButton}>
												Newest
											</li>
										</a>
									</ul>
								</li>
								<hr/>
							</ul>
							{renderPost(arenaContext)}
						</Container>
					</>
			}}
		</ArenaConsumer>

	)
}

export default PreviousWinnersModal;