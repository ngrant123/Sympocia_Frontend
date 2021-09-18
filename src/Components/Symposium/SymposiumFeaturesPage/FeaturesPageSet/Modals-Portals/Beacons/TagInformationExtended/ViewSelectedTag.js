import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
//import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";

const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
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
	cursor:"pointer",
	marginRight:"2%",
	marginBottom:"5%"
}

const SelectedTag=({selectedTag,displayInitialScreen})=>{

	const [dateCreated,changeDateCreated]=useState(); 
	///const featuresPageConsumer=useContext(FeaturesContext);
	// const {fetchPosts}=featuresPageConsumer;


	useEffect(()=>{
		const dateTagCreated=new Date(selectedTag.dateAdded).toLocaleString();
		changeDateCreated(dateTagCreated);
	},[]);

	// const retrievePostsUsingTag=(selectedPostType)=>{
	// 	const tag=[];
	// 	tag.push(selectedTag);

	// 	const beaconFetchParams={
	// 		postType:selectedPostType,
	// 		tags:tag,
	// 		isNextPostsRequest:false
	// 	}
	// 	fetchPosts("Beacons",beaconFetchParams);


	// }
	return(	
		<Container>
			<div style={ButtonCSS} onClick={()=>displayInitialScreen()}>
				Back
			</div>
			<p>{selectedTag.name}</p>
			<hr/>
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
				<div style={{display:"flex",flexDirection:"column"}}>
					<p>
						<b>Date created:</b>
					</p>
					<p>{dateCreated}</p>
				</div>

				<div style={{display:"flex",flexDirection:"column"}}>
					<p>
						<b>Total posts using tag:</b>
					</p>
					<p>{selectedTag.postCountUsingTag}</p>
				</div>
			</div>
			<hr/>

			{/*
				<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" id="text"
						type="button" data-toggle="dropdown" style={ButtonCSS}>
						<p>View posts using tag</p>
					</button>
					<ul class="dropdown-menu" style={{padding:"5px",height:"170px",overflowY:"auto",overflowX:"hidden"}}>
						<li style={{listStyle:"none",cursor:"pointer"}}
							onClick={()=>retrievePostsUsingTag("Images")}>
							Images
						</li>
						<hr/>

						<li style={{listStyle:"none",cursor:"pointer"}}
							onClick={()=>retrievePostsUsingTag("Videos")}>
							Videos
						</li>
						<hr/>

						<li style={{listStyle:"none",cursor:"pointer"}}
							onClick={()=>retrievePostsUsingTag("Text")}>
							Regular Posts
						</li>
						<hr/>
					</ul>
			  	</div>
			*/}
		</Container>
	)
}

export default SelectedTag;