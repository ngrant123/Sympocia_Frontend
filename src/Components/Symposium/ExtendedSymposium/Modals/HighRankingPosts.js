import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
	getHighRankingPostPerSymposium
} from "../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import Images from "../Posts/PostDisplay/Image.js";
import Videos from "../Posts/PostDisplay/Video.js";
import Blogs from "../Posts/PostDisplay/Blogs.js";
import Text from "../Posts/PostDisplay/RegularPosts.js";

const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;


`;

const PostOptionCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
}

const HighRankingPosts=({symposiumId,postType})=>{
	const [highRankingPosts,changeHighRankingPosts]=useState([]);
	const [loadingStatus,changeIsLoading]=useState(true);

	useEffect(()=>{
		fetchData(postType);
	},[]);
	const fetchData=async(postTypeRetrieval)=>{
		changeIsLoading(true);
		const {confirmation,data}=await getHighRankingPostPerSymposium(symposiumId,postTypeRetrieval);
		if(confirmation=="Success"){
			const {message}=data;
			changeHighRankingPosts([...message]);
		}else{
			alert('Unfortunately there has been an error retrieving these symposiums high-ranking posts. Please try again');
		}
		changeIsLoading(false);
	}	
	const highRankingPostOptions=()=>{
		return(
			<div class="dropdown" id="mobileOligarchOptionsDropDown">
				<button class="btn btn-primary dropdown-toggle" 
					type="button" data-toggle="dropdown" style={PostOptionCSS}>
					{postType}
					<span class="caret"></span>
				</button>

				<ul id="mobileDropDown" class="dropdown-menu" style={{padding:"10px"}}>
					<li style={{listStyle:"none",cursor:"pointer"}}>
						<div onClick={()=>fetchData("Image")}>
							Images
						</div>
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}>
						<div onClick={()=>fetchData("Video")}>
							Videos
						</div>
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}>
						<div onClick={()=>fetchData("Blog")}>
							Blogs
						</div>
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}>
						<div onClick={()=>fetchData("Regular")}>
							Text
						</div>
					</li>
				</ul>
		  	</div>
		)
	}

	const postDisplay=(data)=>{
		switch(postType){
			case "Image":{
				return(
					<Images
						imageInformation={data}
					/>
				)
			}
			case "Video":{
				return(
					<Videos
						videoInformation={data}
					/>
				)
			}
			case "Regular":{
				return(
					<Text
						regularPostInformation={data}
						displayDesktopUI={false}
					/>
				)
			}
			case "Blog":{
				return(
					<Blogs
						blogInformation={data}
					/>	
				)
			}
		}
	}
	const posts=()=>{
		return(
			<div style={{marginTop:"2%",display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
				{loadingStatus==true?
					<p>Loading...</p>:
					<>
						{highRankingPosts.length==0?
							<p>No posts</p>:
							<>
								{highRankingPosts.map(data=>
									<>{postDisplay(data)}</>
								)}
							</>
						}
					</>
				}
			</div>
		)
	}


	return(
		<Container>
			<p style={{fontSize:"25px"}}>
				<b>High Ranking posts</b>
			</p>
			<p>Here are this symposium's high ranking posts </p>
			<hr/>
			{highRankingPostOptions()}
			{posts()}
		</Container>
	)
}


export default HighRankingPosts;


