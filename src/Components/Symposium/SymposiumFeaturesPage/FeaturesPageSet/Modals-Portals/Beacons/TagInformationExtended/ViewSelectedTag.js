import React,{useState,useEffect} from "react";
import styled from "styled-components";

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
	useEffect(()=>{
		const dateTagCreated=new Date(selectedTag.dateAdded).toLocaleString();
		changeDateCreated(dateTagCreated);

	},[]);
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
			<div style={ButtonCSS}>
				View posts using tag
			</div>
		</Container>
	)
}

export default SelectedTag;