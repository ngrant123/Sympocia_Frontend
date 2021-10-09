import React,{useState,useEffect} from "react";
import styled from "styled-components";

const ShadowDivCSS={
	position:"absolute",
	width:"100%",
	height:"100%",
	zIndex:5
}


const ShadowOverlay=({posts,postType})=>{
	const [displayPosts,changeDisplayPosts]=useState([]);
	useEffect(()=>{
		const {grind,accomplishment,progress}=posts;
		const displayPostsTemp=[];

		for(var i=0;i<grind.length;i++){
			displayPostsTemp.push(grind[i]);
		}

		for(var i=0;i<accomplishment.length;i++){
			displayPostsTemp.push(accomplishment[i]);
		}

		for(var i=0;i<progress.length;i++){
			displayPostsTemp.push(progress[i]);
		}
		changeDisplayPosts([...displayPostsTemp]);

	},[]);
	
	return(
		<div style={ShadowDivCSS}>
			<div style={{background:"rgba(0, 0, 0, 0.7)",position:"absolute",width:"100%",height:"100%",zIndex:2}}/>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",zIndex:-2,width:"100%",height:"100%",opacity:.4}}>
				{displayPosts.map(data=>
					<img src={data.imgUrl} style={{width:"33.3%",height:"30%",zIndex:-2}}/>
				)}
			</div>
		</div>
	)
}


export default ShadowOverlay;