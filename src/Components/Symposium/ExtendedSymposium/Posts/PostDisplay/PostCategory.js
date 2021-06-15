import React from "react";
import styled from "styled-components";
import CreateIcon from '@material-ui/icons/Create';
import Image from "./Image.js";

const Container=styled.div`
	width:600px;
	height:600px;
	margin-right:2%;
	padding:5px;
	overflow-y:scroll;
`;

const PostCategory=(props)=>{
	const {headers,postType,posts}=props;
	console.log(props);

	const postsDisplay=(data)=>{
		switch(postType){
			case "Image":{
				return(
					<Image
						imageInformation={data}
					/>
				)
			}
		}
	}
	return(
		<Container>
			<div style={{display:"flex",flexDirection:"column"}}>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<p style={{fontSize:"24px"}}>
						<b>{headers.title}</b>
					</p>
					<CreateIcon
						style={{fontSize:"25",color:"#C8B0F4"}}
					/>
				</div>
				<p>{headers.secondaryTitle}</p>
			</div>
			<div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
				{posts.map(data=>
					<>{postsDisplay(data)}</>
				)}
			</div>
		</Container>
	)	
}

export default PostCategory;