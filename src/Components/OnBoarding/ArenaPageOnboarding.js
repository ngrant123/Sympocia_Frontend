import React,{useState} from "react";
import styled from "styled-components";
import ArenaPostTypes from "../../designs/img/ArenaPostTypes.png";
import ArenaPostExample from "../../designs/img/ArenaPostExample.png";
import {completeOnboardingArenaPage} from "../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:25;
	left:30%;
	top:20%;
	overflow-y:scroll;

	@media screen  and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70% !important;
		#closeOptionIconLI{
			display:none !important;
		}
    }
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:25;
	top:0px;
`;

const ButtonCSS={
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

const ExplorePageOnboarding=({closeModal})=>{

	const personalInformationId=useSelector(state=>state.personalInformation.id);

	const [displayFirstPage,changeFirstDisplayPage]=useState(true);
	const [displaySecondPage,changeSecondDisplayPage]=useState(false);
	const [displayThirdPage,changesThirdDisplayPage]=useState(false);

	const displayFirstPageHandle=()=>{
		changeFirstDisplayPage(true);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(false);
	}

	const displaySecondPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(true);
		changesThirdDisplayPage(false);
	}

	const displayThirdPageHandle=()=>{
		changeFirstDisplayPage(false);
		changeSecondDisplayPage(false);
		changesThirdDisplayPage(true);
	}


	const onBoardingCloseModal=async()=>{
		const {confirmation,data}=await completeOnboardingArenaPage(personalInformationId);
		if(confirmation=="Success")
			closeModal();
		else
			alert('Sorry there has been an error. Please try again ');
	}


	return (
			<>
				<ShadowContainer
					onClick={()=>onBoardingCloseModal()}
				/>
				<Container>
					{displayFirstPage && (
						<ul style={{padding:"30px"}}>
							<li style={{listStyle:"none"}}> 
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<p style={{fontSize:"30px"}}>
											<b>The only place where clout doesnt matter </b>
										</p>
									</li>
									<a href="javascript:void(0);" style={{textDecoration:"none",marginLeft:"50%"}}>
										<li id="closeOptionIconLI" style={{listStyle:"none",display:"inline-block"}}>
											<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" 
												width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3"
												fill="none" stroke-linecap="round" stroke-linejoin="round">
												<path stroke="none" d="M0 0h24v24H0z"/>
												<circle cx="12" cy="12" r="9" />
												<path d="M10 10l4 4m0 -4l-4 4" />
											</svg>
										</li>
									</a>
								</ul>
							</li>
							<hr/>
							<p> 
								Welcome to the <b>arena</b>. Let us give 
								you a quick run down first
							</p>
							<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px"}}> 
								What is the arena? Let me answer your question with a question of my own.. Do you hate the idea of 
								clout or popularity? If yes then thats what the arena is. Its a place where peoples posts can be showcased 
								regardless of popularity or fame. The best content wins the competition. Interested in learing more? Click the next 
								button to continue.
							</p>
							<hr/>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
										Step 1 of 3
									</li>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>onBoardingCloseModal()} style={ButtonCSS}>
											Close
										</li>
									</a>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displaySecondPageHandle()} style={ButtonCSS}>
											Next
										</li>
									</a>
								</ul>
							</li>
						</ul>
					)}

					{displaySecondPage && (
						<ul style={{padding:"30px"}}>
							<li id="closeOptionIconLI" style={{listStyle:"none",marginLeft:"85%"}}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" 
									width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3"
									fill="none" stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z"/>
									<circle cx="12" cy="12" r="9" />
									<path d="M10 10l4 4m0 -4l-4 4" />
								</svg>
							</li>

							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
										<b>Arena Post Options:</b>
									</p>
									<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px"}}>
										Each post type is divided into four sections: images,videos,blogs, and regular posts. 
										For each category you can view all of the current contestants, view all previous winners, 
										and even see what people are currently saying about this competition. Awesome right? :)
									</p>

									<img src={ArenaPostTypes} style={{width:"90%"}}/>

									<hr/>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
												Step 2 of 3
											</li>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>displayFirstPageHandle()} style={ButtonCSS}>
													Previous
												</li>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>displayThirdPageHandle()} style={ButtonCSS}>
													Next
												</li>
											</a>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					)}

					{displayThirdPage && (
						<ul style={{padding:"30px"}}>
							<li id="closeOptionIconLI" style={{listStyle:"none",marginLeft:"85%"}}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" 
									width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3"
									fill="none" stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z"/>
									<circle cx="12" cy="12" r="9" />
									<path d="M10 10l4 4m0 -4l-4 4" />
								</svg>
							</li>

							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<p style={{color:"#585858",fontSize:"20px",marginBottom:"7%"}}>
										<b>Arena Post:</b>
									</p>
									<p style={{color:"#848484",marginBottom:"5%",fontSize:"17px"}}>
										Each post here is has two unique features: a ranking and a boost button. The ranking 
										displays the current ranking of the post in the competition. The boost button on the other hand
										is similar to a vote. You think a post is the best here? Just boost it. The post
										with the most amount of boosts wins. Simple.
									</p>

									<img src={ArenaPostExample} style={{width:"90%"}}/>

									<hr/>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",color:"#BDBDBD",marginRight:"4%"}}>
												Step 3 of 3
											</li>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>displaySecondPageHandle()} style={ButtonCSS}>
													Previous
												</li>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>onBoardingCloseModal()} style={ButtonCSS}>
													Close
												</li>
											</a>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					)}

				</Container>
			</>
		);
}

export default ExplorePageOnboarding;