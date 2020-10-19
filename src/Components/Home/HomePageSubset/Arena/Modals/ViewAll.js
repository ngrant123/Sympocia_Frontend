import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
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

const ViewAll=({closeModal,postType,currentPosts})=>{
	debugger;
	const [posts,changePosts]=useState(currentPosts==null?[]:currentPosts);
	useEffect(()=>{

	},[]);

	const constructDate=(dateMilliseconds)=>{
		const newDate=new Date(dateMilliseconds).toLocaleDateString();
		return newDate;
	}

	const images=(arenaContext)=>{
		return(
			<ul style={{padding:"0px"}}>
				{posts.map((data,index)=>
					<li style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {index+1} </p>
									</li>
								</ul>
							</li>

							<a href="javascript:void(0)" style={{textDecoration:"none"}}>
								<li onClick={()=>arenaContext.displayPostModal("Images",data.image)} style={{listStyle:"none"}}>
									<img src={data.image.imgUrl} style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
								</li>
							</a>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
										<a href={`/profile/${data.image.owner._id}`} style={{textDecoration:"none"}}>
											<img src={data.image.owner.profilePicture==null?
														NoProfilePicture:
														data.image.owner.profilePicture
													  }
											style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
										</a>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.image.owner.firstName}</b>
									</li>
								</ul>
							</li>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={BoostButton} onClick={()=>arenaContext.handleBoost(data.image)}>
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
			</ul>
		);
	}

	const videos=(arenaContext)=>{
		return(
			<ul style={{padding:"0px"}}>
				{posts.map((data,index)=>
					<li style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {index+1} </p>
									</li>
								</ul>
							</li>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>arenaContext.displayPostModal("Videos",data.video)} style={{listStyle:"none"}}>
									<video style={{borderRadius:"5px"}} width="100%" height="40%" autoplay="true" controls>
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
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>arenaContext.handleBoost()} style={BoostButton}>
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
			</ul>
		);
	}

	const blogs=(arenaContext)=>{
		return <ul style={{padding:"0px"}}>
				{posts.map((data,index)=>
					<li style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {index+1} </p>
									</li>
								</ul>
							</li>
							<p style={{fontSize:"15px",height:"5%",overflow:"hidden"}}>
								<b>{data.blog.title}</b>
							</p>
							<p style={{height:"5%",overflow:"hidden"}}>
								{data.blog.description}
							</p>

							<li onClick={()=>arenaContext.displayPostModal("Blogs",data.blog)} style={{listStyle:"none"}}>
								<img src={data.blog.blogImageUrl} style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
							</li>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
										<a href={`/profile/${data.blog.owner._id}`} style={{textDecoration:"none"}}>
											<img src={data.blog.owner.profilePicture==null?
														NoProfilePicture:
														data.blog.owner.profilePicture} 
											 style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
										 </a>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.blog.owner.firstName}</b>
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
				</ul>;
	}

	const regularPosts=(arenaContext)=>{
		return  <ul style={{padding:"0px"}}>
				 {posts.map((data,index)=>
					<li style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {index+1} </p>
									</li>
								</ul>
							</li>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
										<a href={`/profile/${data.regularPost.owner._id}`} style={{textDecoration:"none"}}>	
											<img src={data.regularPost.owner.profilePicture==null?
														NoProfilePicture:
														data.regularPost.imgSrc}
											style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
										</a>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.regularPost.owner.firstName}</b>
									</li>
								</ul>
							</li>
							<li style={{listStyle:"none",height:"40%",overflowY:"auto",marginBottom:"1%"}}>
								{data.regularPost.post}
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
				</ul>;
	}

	const renderPost=(arenaContext)=>{
		debugger;
		switch(postType){
			case 'Images':
				return images(arenaContext);
				break;

			case 'Blogs':
				return blogs(arenaContext);
				break;

			case 'Videos':
				return videos(arenaContext);
				break;

			case 'RegularPosts':
				return regularPosts(arenaContext);
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
							<ul>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>closeModal()} style={{marginLeft:"90%",listStyle:"none"}}>
										<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
										  <path stroke="none" d="M0 0h24v24H0z"/>
										  <circle cx="12" cy="12" r="9" />
										  <path d="M10 10l4 4m0 -4l-4 4" />
										</svg>
									</li>
								</a>

								<li style={{listStyle:"none"}}>
									{renderPost(arenaContext)}
								</li>
							</ul>
						</Container>
					</>
			}}
		</ArenaConsumer>
	)
}

export default ViewAll;