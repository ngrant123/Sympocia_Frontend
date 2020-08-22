import React,{useState} from "react";
import styled from "styled-components";
import TestProfilePicture from "../../../../../designs/img/FirstSectionLandingPAgeImage.png";

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

const PreviousWinnersModal=({closeModal,postType})=>{
	console.log(postType);
	const [posts,changePosts]=useState([{
		regularPostData:{
			owner:{
				firstName:"Nathan"
			}
		},
		arenaScore:45,
		winnerDate:1597939586403
	},{
		regularPostData:{
			owner:{
				firstName:"Bob"
			}
		},
		arenaScore:20,
		winnerDate:1597939577235
	},{
		regularPostData:{
			owner:{
				firstName:"Derrick"
			}
		},
		arenaScore:60,
		winnerDate:1597939570595
	},{
		regularPostData:{
			owner:{
				firstName:"Roger"
			}
		},
		arenaScore:70,
		winnerDate:1597939561476
	},{
		regularPostData:{
			owner:{
				firstName:"Noca"
			}
		},
		arenaScore:90,
		winnerDate:1597938956529
	}]);

	const constructDate=(dateMilliseconds)=>{
		const newDate=new Date(dateMilliseconds).toLocaleDateString();
		return newDate;
	}

	const imageWinners=()=>{
		return(
			<>
				{posts.map(data=>
					<li style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={DateCaption}>
								Winner on: {constructDate(data.winnerDate)}
							</li>

							<li style={{listStyle:"none"}}>
								<img src={data.imageData.imgSrc==null?TestProfilePicture:data.imageData.imgSrc}
								style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
							</li>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
										<img src={data.profilePicture==null?TestProfilePicture:data.profilePicture}
										style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.imageData.owner.firstName}</b>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				)}
			</>
		);
	}

	const videoWinners=()=>{
		return(
			<>
				{posts.map(data=>
					<li style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={DateCaption}>
								Winner on: {constructDate(data.winnerDate)}
							</li>
							<li style={{listStyle:"none",marginTop:"1%"}}>
								<video style={{borderRadius:"5px"}} width="100%" height="40%" autoplay="true" controls>
									<source src={data.videoData.imgSrc} type="video/mp4"/>
								</video>
							</li>

							<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"15%"}}>	
										<img src={data.videoData.videoSrc==null?TestProfilePicture:this.state.headerVideo.videoSrc}
										style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
										<b>{data.videoData.owner.firstName}</b>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				)}
			</>
		);
	}

	const blogWinners=()=>{
		return <>
					{posts.map(data=>
						<li style={{listStyle:"none",display:"inline-block",width:"30%",marginLeft:"2%",marginBottom:"5%"}}>
							<ul style={{padding:"0px"}}>
								<li style={DateCaption}>
									Winner on: {constructDate(data.winnerDate)}
								</li>
								<p style={{fontSize:"15px",height:"5%",overflow:"hidden"}}>
									<b>{data.blogData.title}</b>
								</p>
								<p style={{height:"5%",overflow:"hidden"}}>
									{data.blogData.description}
								</p>

								<li style={{listStyle:"none"}}>
									<img src={data.blogData.imgSrc==null?TestProfilePicture:data.blogData.imgSrc}
									style={{width:"90%",height:"30%",borderRadius:"5px"}}/>
								</li>

								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
											<img src={data.blogData.imgSrc==null?TestProfilePicture:data.blogData.imgSrc}
											style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
											<b>{data.blogData.owner.firstName}</b>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					)}
			   </>;
	}

	const regularPostWinners=()=>{
		return  <>
					{posts.map(data=>
						<li style={{listStyle:"none",display:"inline-block",width:"45%",marginLeft:"2%",marginBottom:"5%"}}>
							<ul style={{padding:"0px"}}>
								<li style={DateCaption}>
									Winner on: {constructDate(data.winnerDate)}
								</li>
								<li style={{listStyle:"none",marginTop:"1%",marginBottom:"1%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>	
											<img src={data.regularPostData.imgSrc==null?TestProfilePicture:this.state.headerImage.imgSrc}
											style={{borderRadius:"50%",width:"100%",height:"10%"}}/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"2%"}}>
											<b>{data.regularPostData.owner.firstName}</b>
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
							</ul>
						</li>
					)}
				</>;
	}
	const filterByMostPopular=()=>{
		const currentPosts=posts;

		currentPosts.sort(function(a,b){
			const aScore=a.winnerScore;
			const bScore=b.winnerScore;
			return aScore<bScore?1:-1;
		});
		changePosts([...currentPosts]);
	}

	const filterByNewest=()=>{
		const currentPosts=posts;

		currentPosts.sort(function(a,b){
			const aDate=a.winnerDate;
			const bDate=b.winnerDate;
			return aDate<bDate?1:-1;
		});
		changePosts([...currentPosts]);
	}

	const renderPost=()=>{
		debugger;
		switch(postType){
			case 'Image':
				return imageWinners();
				break;

			case 'Blog':
				return blogWinners();
				break;

			case 'Video':
				return videoWinners();
				break;

			case 'RegularPost':
				return regularPostWinners();
				break;

			default:
			break;
		}
	}

	return(
		<>
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
				{renderPost()}
			</Container>
		</>

	)
}

export default PreviousWinnersModal;