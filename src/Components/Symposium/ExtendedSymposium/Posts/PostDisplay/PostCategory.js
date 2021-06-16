import React from "react";
import styled from "styled-components";
import CreateIcon from '@material-ui/icons/Create';
import Image from "./Image.js";

const Container=styled.div`
	width:650px;
	height:600px;
	margin-right:2%;
	padding:5px;
	overflow:scroll;
	background-color:red;

	@media screen and (max-width:1370px){
		overflow:visible !important;
	}
	@media screen and (max-width:650px){
		margin-left:-5%;
	}
`;

const MobileCategoryOptions=styled.div`
	visibility:none;

	@media screen and (max-width:650px){
		visibility:visible
	}
`;
const MobileCaretDropDownCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	borderStyle:"none",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"50%",
	padding:"10px"
}

const PostCategory=(props)=>{
	const {
		headers,
		postType,
		posts,
		defaultPostCategoryInformation,
		triggerChangeCategoryType
	}=props;
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
	const mobileCategoryOptions=()=>{
		return(
			<MobileCategoryOptions>
				<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" 
						type="button" data-toggle="dropdown" style={MobileCaretDropDownCSS}>
					   	<span class="caret"></span>
					</button>

					<ul class="dropdown-menu" style={{height:"170px",overflow:"auto"}}>
						{defaultPostCategoryInformation.map(data=>
							<React.Fragment>
								<li onClick={()=>triggerChangeCategoryType(data.headers.title)} 
									style={{listStyle:"none"}}>
									<a>{data.headers.title}</a>
								</li>
								<hr/>
							</React.Fragment>
						)} 
					</ul>
			  	</div>
			</MobileCategoryOptions>
		)
	}
	return(
		<Container>
				<div style={{display:"flex",flexDirection:"column"}}>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
						<div style={{display:"flex",flexDirection:"row",width:"40%"}}>
							{mobileCategoryOptions()}
							<p style={{marginLeft:"5%",fontSize:"24px"}}>
								<b>{headers.title}</b>
							</p>
						</div>
						<CreateIcon
							style={{
								fontSize:"25",
								color:"#C8B0F4",
								marginLeft:"20%"
							}}
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