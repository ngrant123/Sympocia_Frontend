import React,{useState,useEffect} from "react";
import styled from "styled-components";
import TestProfilePicture from "../../../../../designs/img/FirstSectionLandingPAgeImage.png";
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

const ViewAll=({closeModal,postType})=>{
	console.log(postType);
	const [posts,changePosts]=useState([{title:"Test",description:"d",owner:{firstName:"f"}},
		{title:"Tesst",description:"dq",owner:{firstName:"n"}},
		{title:"de",description:"dwq",owner:{firstName:"nd"}},
		{title:"dqw",description:"dwwwww",owner:{firstName:"s"}},
		{title:"T",description:"d",owner:{firstName:"q"}}]);

	useEffect(()=>{

	},[]);

	const constructDate=(dateMilliseconds)=>{
		const newDate=new Date(dateMilliseconds).toLocaleDateString();
		return newDate;
	}

	const images=(arenaContext)=>{
		return(
			<ul style={{padding:"0px"}}>
				{posts.map(data=>
					<li style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {data.rank} </p>
									</li>
								</ul>
							</li>

							<a href="javascript:void(0)" style={{textDecoration:"none"}}>
								<li onClick={()=>arenaContext.displayPostModal("Image",data)} style={{listStyle:"none"}}>
									<img src={data.imgSrc==null?TestProfilePicture:data.imgSrc}
									style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
								</li>
							</a>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
										<img src={data.imgSrc==null?TestProfilePicture:data.imgSrc}
										style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.owner.firstName}</b>
									</li>
								</ul>
							</li>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={BoostButton} onClick={()=>arenaContext.handleBoost(data)}>
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
				{posts.map(data=>
					<li style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {data.rank} </p>
									</li>
								</ul>
							</li>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>arenaContext.displayPostModal("Video",data)} style={{listStyle:"none"}}>
									<video style={{borderRadius:"5px"}} width="100%" height="40%" autoplay="true" controls>
										<source src={data.videoSrc} type="video/mp4"/>
									</video>
								</li>
							</a>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
										<img src={data.profilePicture==null?TestProfilePicture:data.profilePicture}
										style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.owner.firstName}</b>
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
				{posts.map(data=>
					<li style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {data.rank} </p>
									</li>
								</ul>
							</li>
							<p style={{fontSize:"15px",height:"5%",overflow:"hidden"}}>
								<b>{data.title}</b>
							</p>
							<p style={{height:"5%",overflow:"hidden"}}>
								{data.description}
							</p>

							<li onClick={()=>arenaContext.displayPostModal("Blog",data)} style={{listStyle:"none"}}>
								<img src={data.imgSrc==null?TestProfilePicture:data.imgSrc}
								style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
							</li>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
										<img src={data.imgSrc==null?TestProfilePicture:data.imgSrc}
										style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.owner.firstName}</b>
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
				 {posts.map(data=>
					<li style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:""}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p> Ranking: <ArrowDropUpIcon style={{color:"#01ff30"}}/> {data.rank} </p>
									</li>
								</ul>
							</li>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
										<img src={data.imgSrc==null?TestProfilePicture:data.imgSrc}
										style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.owner.firstName}</b>
									</li>
								</ul>
							</li>
							<li style={{listStyle:"none",height:"40%",overflowY:"auto",marginBottom:"1%"}}>
								  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
								  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
								  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
								  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
								  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
								  qui officia deserunt mollit anim id est laborum.
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
			case 'Image':
				return images(arenaContext);
				break;

			case 'Blog':
				return blogs(arenaContext);
				break;

			case 'Video':
				return videos(arenaContext);
				break;

			case 'RegularPost':
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