import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ImagePostDisplayPortal from "../../../HomePageSet/ImageHomeDisplayPortal.js";
import {HomeConsumer} from "../../../HomeContext.js";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:97%;
	margin-top:1%;
`;

const HeaderImageCSS={
	width:"100%",
	height:"80%",
	borderRadius:"5px",
	backgroundColor:"red",
	borderRadius:"5px"
}

const ImageCSS={
	position:"relative",
	width:"280px",
	height:"230px",
	borderRadius:"5px",
	backgroundColor:"red"
}

const ShadowContainer= styled.div`
	position:absolute;
	width:280px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
`;

const ImageLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const displayPersonalIndustryFeed=(personalInformationRedux,post,homePageInformation,selectedPost)=>{
	debugger;
		console.log(homePageInformation);

		//have to format selected industries in and add additional information so that the personalPage can 
		//accept props
		var isPersonalProfile;
		var personalIndustries=PersonalIndustry.INDUSTRIES;
		var companyIndustries=CompanyIndustry.INDUSTRIES;
		var industryColorMap=new Map();
		if(personalInformationRedux.loggedIn==true){
			for(var i=0;i<personalIndustries.length;i++){
				const industry=personalIndustries[i];
				industryColorMap.set(industry.industry,industry.backgroundColor);
			}
		}else{
			for(var i=0;i<companyIndustries.length;i++){
				const industry=personalIndustries[i];
				industryColorMap.set(industry.industry,industry.backgroundColor);
			}
		}

		const industryArray=[];
		const currentSelectedIndustry=selectedPost.industriesUploaded;
		var industryMap=new Map();
		for(var i=0;i<currentSelectedIndustry.length;i++){
			const currentIndustry=currentSelectedIndustry[i];
			industryMap.set(currentIndustry.industry,1);
		}


		for(var i=0;i<post.length;i++){
			const currentPost=post[i];
			for(var j=0;j<currentPost.industriesUploaded.length;j++){
				const currentPostIndustry=currentPost.industriesUploaded[j];
				if(!industryMap.has(currentPostIndustry.industry)){

					const industryObject={
						backgroundColor:industryColorMap.get(currentPostIndustry.industry),
						symposiumName:currentPostIndustry.industry,
						popularVideos:[]
					}

					industryArray.push(industryObject);
					industryMap.set(currentPostIndustry.industry,1);
				}
			}
		}
		const selectedSymposiumsObject={
			selectedSymposiums:{
				backgroundColor:industryColorMap.get(selectedPost.industriesUploaded[0].industry),
				symposiumName:selectedPost.industriesUploaded[0].industry
			},
			symposiums:industryArray
		}

		homePageInformation.displaySymposium(selectedSymposiumsObject);
	}



const ImagePostsModal=(props)=>{
	debugger;
	console.log(props);
	const headerImage=props.posts[0];
	const images=props.posts.slice(1,props.posts.length);

	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);


	const [displayImageDisplayPortal,changeImageDisplay]=useState(false);
	const [selectedImage,changeSelectedImage]=useState();
	const [displayRecommendedImages,changeRecommendedImages]=useState();


	const closeModal=()=>{
		changeImageDisplay(false)
	}

	const handleDisplayHeaderImage=()=>{
		changeSelectedImage(headerImage);
		changeRecommendedImages(images);
		changeImageDisplay(true);
	}

	const displayImageModal=(data)=>{
		changeSelectedImage(data);
		changeRecommendedImages(images);
		changeImageDisplay(true);
	}

	return(
			<HomeConsumer>
				{homePageInformation=>{
					return <React.Fragment>
								{props.posts.length>=1?
									<React.Fragment>
										<li style={{listStyle:"none",display:"inline-block",width:"50%"}}>
											<ul style={{padding:"0px"}}>
												<li onClick={()=>handleDisplayHeaderImage()} style={{listStyle:"none",backgroundColor:"red",width:"90%",borderRadius:"5px",position:"relative",top:"-80px"}}>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<img src={headerImage.imgUrl} style={HeaderImageCSS}/>
													</a>
												</li>
												<li style={{listStyle:"none",width:"80%",position:"relative",top:"-70px"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",fontSize:"30px",marginRight:"2%"}}>
															<b>{headerImage.firstName}</b>
														</li>

														<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,images,homePageInformation,headerImage)} style={ImageLabelCSS}>
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																{headerImage.industriesUploaded[0].industry}
															</a>
														</li>

														<li style={ImageLabelCSS}>
															Recruit
														</li>
														<li style={{listStyle:"none",width:"90%"}}>
															{headerImage.description}
														</li>
													</ul>
												</li>
											</ul>
										</li>

										<li style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
											<ul style={{padding:"0px"}}>
												{images.map(data=>
													<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"4%"}}>
														<ul style={{padding:"0px"}}>
															<li onClick={()=>displayImageModal(data)} style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<ShadowContainer/>
																	<img src={data.imgUrl} style={ImageCSS}/>
																</a>
															</li>
															<li style={{listStyle:"none",marginBottom:"1%"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																		<b>{data.firstName}</b>
																	</li>

																	<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,images,homePageInformation,headerImage)} style={ImageLabelCSS}>
																		{data.industriesUploaded[0].industry}
																	</li>
																</ul>
															</li>
															<li style={{listStyle:"none",width:"100%",height:"20%",overflow:"hidden"}}>
																  <p>{data.description}</p>
															</li>
											 			</ul>
													</li>
												)}
											</ul>
										</li>

										{displayImageDisplayPortal==false?
											null:
											<ImagePostDisplayPortal
												closeModal={closeModal}
												selectedImage={selectedImage}
												recommendedImages={displayRecommendedImages}
											/>
										}
									</React.Fragment>
									:<p>No posts </p>
								}
							</React.Fragment>
						}}
						</HomeConsumer>
					)
			}

export{
	ImagePostsModal,
	displayPersonalIndustryFeed
};





