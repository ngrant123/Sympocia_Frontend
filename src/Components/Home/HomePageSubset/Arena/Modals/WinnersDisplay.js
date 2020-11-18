import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

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

const PostTitleCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"50%"
}

const CloseModalButton={

}



const WinnersDisplay=({closeModal,winnersData,displayConfetti})=>{
	const [imageWinner,changeImageWinner]=useState();
	const [imageRunnerUp,changeImageRunnerUp]=useState([]);

	const [videoWinner,changeVideoWinner]=useState();
	const [videoRunnerUp,changeVideoRunnerUp]=useState([]);

	const [blogWinner,changeBlogWinner]=useState();
	const [blogRunnerUp,changeBlogRunnerUp]=useState([]);

	const [regularPostWinner,changeRegularPostWinner]=useState();
	const [regularPostRunnerUp,changeRegularPostRunnerUp]=useState([]);

	const [isLoading,changeIsLoadingStatus]=useState(true);

	useEffect(()=>{
		
		displayConfetti();
		const {
			Images,
			Blogs,
			RegularPosts,
			Videos
		}=winnersData;

		constructImages(Images.winners);
		constructVideos(Videos.winners);
		constructBlogs(Blogs.winners);
		constructRegularPosts(RegularPosts.winners);

		changeIsLoadingStatus(false);
	},[]);

	const constructImages=(imageWinners)=>{
		if(imageWinners.length==0)
			changeImageWinner(null);
		else{
			let winner=imageWinners.splice(0,1);
			winner=winner[0];
			const runnerUps=imageWinners.slice(0,imageWinners.length);
			changeImageWinner(winner);
			changeImageRunnerUp(runnerUps);
		}
	}

	const constructVideos=(videoWinners)=>{
		if(videoWinners.length==0)
			changeVideoWinner(null);
		else{
			let winner=videoWinners.splice(0,1);
			winner=winner[0];
			const runnerUps=videoWinners.slice(0,videoWinners.length);
			changeVideoWinner(winner);
			changeVideoRunnerUp(runnerUps);
		}
	}

	const constructBlogs=(blogWinners)=>{
		if(blogWinners.length==0)
			changeBlogWinner(null);
		else{
			let winner=blogWinners.splice(0,1);
			winner=winner[0];
			const runnerUps=blogWinners.slice(0,blogWinners.length);
			changeBlogWinner(winner);
			changeBlogRunnerUp(runnerUps);
		}
	}

	const constructRegularPosts=(regularPostWinners)=>{
		if(regularPostWinners.length==0)
			changeRegularPostWinner(null);
		else{
			let winner=regularPostWinners.splice(0,1);
			winner=winner[0];
			const runnerUps=regularPostWinners.slice(0,regularPostWinners.length);
			changeRegularPostWinner(winner);
			changeRegularPostRunnerUp(runnerUps);
		}
	}

	const constructRunnerUpsTitle=()=>{

	}

	const ImageWinners=()=>{
			return <>
					{imageWinner!=null &&(
						<li style={{listStyle:"none",height:"70%",overflowY:"scroll"}}>
							<ul style={{padding:"0px"}}>
									<li style={PostTitleCSS}>
										Images
									</li>
									<li style={{listStyle:"none"}}>
											<ul style={{padding:"0px"}}>
												<li style={{position:"relative",top:"-200px",listStyle:"none",display:"inline-block",width:"50%",height:"50%",marginRight:"2%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",marginBottom:"2%"}}>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
																	1st place
																</li>
																<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
																	<img src={imageWinner.image.owner.profilePicture==null?
																			NoProfilePicture:
																			imageWinner.image.owner.profilePicture
																	} style={{backgroundColor:"red",width:"60%",height:"50px",borderRadius:"50%"}}/>
																</li>
																<li style={{listStyle:"none",display:"inline-block"}}>
																	{imageWinner.image.owner.firstName}
																</li>
															</ul>
														</li>
														<li style={{listStyle:"none",width:"100%"}}>
															<img src={imageWinner.image.imgUrl} style={{backgroundColor:"red",width:"100%",height:"320",borderRadius:"5px"}}/>
														</li>
													</ul>
												</li>

												<li style={{overflowY:"scroll",marginRight:"2%",width:"45%",height:"80%",position:"relative",top:"10px",listStyle:"none",display:"inline-block"}}>
													{imageRunnerUp.map((data,index)=>
														<ul style={{padding:"0px",marginBottom:"2%",height:"90%"}}>
															<li style={{listStyle:"none",marginBottom:"2%"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
																		{index+2} place
																	</li>
																	<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
																		<img src={data.image.owner.profilePicture==null?
																					NoProfilePicture:
																					data.image.owner.profilePicture
																			} style={{backgroundColor:"red",width:"60%",height:"50px",borderRadius:"50%"}}/>
																	</li>
																	<li style={{listStyle:"none",display:"inline-block"}}>
																		{data.image.owner.firstName}
																	</li>
																</ul>
															</li>
															<li style={{listStyle:"none"}}>
																<img src={data.image.imgUrl} style={{backgroundColor:"red",width:"80%",height:"250"}}/>
															</li>
														</ul>
													)}
												</li>
											</ul>
										</li>
									<hr/>
							</ul>
					   </li>
					)}
			</>
	}
//
	const VideoWinners=()=>{
		return <>
				{videoWinner!=null &&(
					<li style={{listStyle:"none",height:"70%"}}>
						<ul style={{padding:"0px"}}>
							<li style={PostTitleCSS}>
								Videos
							</li>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{position:"relative",top:"10px",listStyle:"none",display:"inline-block",width:"50%",height:"50%",marginRight:"2%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginBottom:"2%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
														1st place
													</li>
													<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
														<img src={videoWinner.video.owner.profilePicture==null?
																	NoProfilePicture:
																	videoWinner.video.owner.profilePicture
															} style={{backgroundColor:"red",width:"60%",height:"50px",borderRadius:"50%"}}/>
													</li>
													<li style={{listStyle:"none",display:"inline-block"}}>
														{videoWinner.video.owner.firstName}
													</li>
												</ul>
											</li>
											<li style={{listStyle:"none",width:"100%"}}>
												<video  key={videoWinner.video._id} style={{borderRadius:"5px"}} width="100%" height="140%" autoplay="true" controls>
													<source src={videoWinner.video.videoUrl} type="video/mp4"/>
												</video>
											</li>
										</ul>
									</li>

									<li style={{overflowY:"scroll",marginRight:"2%",width:"45%",height:"80%",position:"relative",top:"10px",listStyle:"none",display:"inline-block"}}>
										{videoRunnerUp.map((data,index)=>
											<ul style={{padding:"0px",marginBottom:"2%",height:"90%"}}>
												<li style={{listStyle:"none",marginBottom:"2%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
															{index+2} place
														</li>
														<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
															<img src={data.video.owner.profilePicture==null?
																	NoProfilePicture:
																	data.video.owner.profilePicture
																} style={{backgroundColor:"red",width:"60%",height:"50px",borderRadius:"50%"}}/>
														</li>
														<li style={{listStyle:"none",display:"inline-block"}}>
															{data.video.owner.firstName}
														</li>
													</ul>
												</li>
												<li style={{listStyle:"none"}}>
													<video key={data.video._id}  style={{borderRadius:"5px"}} width="70%" height="50%" autoplay="true" controls>
														<source src={data.video.videoUrl} type="video/mp4"/>
													</video>
												</li>
											</ul>
										)}
									</li>
								</ul>
							</li>
							<hr/>
						</ul>
				   </li>
				)}
			</>
	}

	const BlogWinners=()=>{
		return <>
				{blogWinner!=null &&(
					<li style={{listStyle:"none",height:"70%",overflowY:"scroll"}}>
						<ul style={{padding:"0px"}}>
							<li style={PostTitleCSS}>
								Blogs
							</li>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{position:"relative",top:"10px",listStyle:"none",display:"inline-block",width:"50%",height:"50%",marginRight:"2%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginBottom:"2%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
														1st place
													</li>
													<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
														<img src={blogWinner.blog.owner.profilePicture==null?
																		NoProfilePicture:
																		blogWinner.blog.owner.profilePicture
																}  style={{backgroundColor:"red",width:"60%",height:"50px",borderRadius:"50%"}}/>
													</li>
													<li style={{listStyle:"none",display:"inline-block"}}>
														{blogWinner.blog.owner.firstName}
													</li>
												</ul>
											</li>
											<li style={{listStyle:"none",width:"100%"}}>
												<img src={blogWinner.blog.blogImageUrl} style={{backgroundColor:"red",width:"80%",height:"250",borderRadius:"5px"}}/>
											</li>
											<p style={{fontSize:"20px",height:"10%",overflowY:"hidden"}}>
												{blogWinner.blog.title}
											</p>
											<p style={{fontSize:"10px",height:"10%",overflowY:"hidden"}}>
												{blogWinner.blog.description}
											</p>
										</ul>
									</li>

									<li style={{overflowY:"scroll",marginRight:"2%",width:"45%",height:"80%",position:"relative",top:"10px",listStyle:"none",display:"inline-block"}}>
										{blogRunnerUp.map((data,index)=>
											<ul style={{padding:"0px",marginBottom:"2%",height:"90%"}}>
												<li style={{listStyle:"none",marginBottom:"2%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
															{index+2} place
														</li>
														<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
															<img src={data.blog.owner.profilePicture==null?
																		NoProfilePicture:
																		data.blog.owner.profilePicture
																}  style={{backgroundColor:"red",width:"60%",height:"50px",borderRadius:"50%"}}/>
														</li>
														<li style={{listStyle:"none",display:"inline-block"}}>
															{data.blog.owner.firstName}
														</li>
													</ul>
												</li>
												<li style={{listStyle:"none"}}>
													<img src={data.blog.blogImageUrl} style={{backgroundColor:"red",width:"70%",height:"150"}}/>
												</li>
												<p style={{fontSize:"20px",height:"10%",overflowY:"hidden"}}>
													{data.blog.title}
												</p>
												<p style={{fontSize:"10px",height:"10%",overflowY:"hidden"}}>
													{data.blog.description}
												</p>
											</ul>
										)}
									</li>
								</ul>
							</li>
							<hr/>
						</ul>
				   </li>
				)}
			   </>
	}
	const RegularPostWinners=()=>{
		return  <>
					{regularPostWinner!=null &&(
						<li style={{listStyle:"none",height:"70%",overflowY:"scroll"}}>
							<ul style={{padding:"0px"}}>
								<li style={PostTitleCSS}>
									Regular Posts
								</li>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{position:"relative",top:"-50px",listStyle:"none",display:"inline-block",width:"50%",height:"50%",marginRight:"2%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",marginBottom:"2%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
															1st place
														</li>
														<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
															<img src={regularPostWinner.regularPost.owner.profilePicture==null?
																		NoProfilePicture:
																		regularPostWinner.regularPost.owner.profilePicture
																} style={{backgroundColor:"red",width:"60%",height:"50px",borderRadius:"50%"}}/>
														</li>
														<li style={{listStyle:"none",display:"inline-block"}}>
															{regularPostWinner.regularPost.owner.firstName}
														</li>
													</ul>
												</li>
												<p style={{fontSize:"20px",height:"30%",overflowY:"scroll"}}>
													{regularPostWinner.regularPost.post}
												</p>
											</ul>
										</li>

										<li style={{overflowY:"scroll",marginRight:"2%",width:"45%",height:"60%",position:"relative",top:"10px",listStyle:"none",display:"inline-block"}}>
											{regularPostRunnerUp.map((data,index)=>
												<ul style={{padding:"0px",marginBottom:"2%",height:"90%"}}>
													<li style={{listStyle:"none",marginBottom:"2%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
																{index+2} place
															</li>
															<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
																<img src={data.regularPost.owner.profilePicture==null?
																		NoProfilePicture:
																		data.regularPost.owner.profilePicture
																} style={{backgroundColor:"red",width:"60%",height:"50px",borderRadius:"50%"}}/>
															</li>
															<li style={{listStyle:"none",display:"inline-block"}}>
																{data.regularPost.owner.firstName}
															</li>
														</ul>
													</li>
													<p style={{fontSize:"15px",height:"25%",overflowY:"scroll"}}>
														{data.regularPost.post}
													</p>
												</ul>
											)}
										</li>
									</ul>
								</li>
								<hr/>
							</ul>
					   </li>
					)}
				</> 
	}

	return (
		<React.Fragment>
			<ShadowContainer onClick={()=>closeModal()}/>
			<Container>
				<ul style={{padding:"20px"}}>
					<li style={{listStyle:"none"}}>
						<p style={{fontSize:"25px"}}> 
							<b>Winners</b> 
						</p>
					</li>
					<hr/>
					{isLoading==true?
						<p>Give us a second </p>:
						<>
							{ImageWinners()}
							{VideoWinners()}
							{BlogWinners()}
							{RegularPostWinners()}
						</>
					}

					<li style={{marginTop:"5%",height:"10%",listStyle:"none",backgroundColor:"#C8B0F4",width:"20%",textAlign:"center",fontSize:"15px",borderRadius:"5px",color:"white",padding:"20px"}}>
						Submit
					</li>
				</ul>
			</Container>
		</React.Fragment>
	)
}

export default WinnersDisplay;