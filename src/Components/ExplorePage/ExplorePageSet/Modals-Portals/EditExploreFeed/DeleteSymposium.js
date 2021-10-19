import React,{useState} from "react";
import styled from "styled-components";
import {
	deleteSymposiumFeedRecommedonations
} from "../../../../../Actions/Requests/ExplorePageRequests/ExplorePageAdapter.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

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
	marginBottom:"2%",
	width:"20%"
}

const DeletionIndicatorButtonCSS={
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
	marginBottom:"2%",
	width:"20%",
	marginRight:"2%"
}


const DeleteSymposiumOptions={
	borderColor:"#D0D0D0",
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	padding:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer",
	backgroundColor:"white",
	color:"#000000",
	marginBottom:"2%"
}


const DeleteSymposiumFeed=({closeModal,symposiumId,userId,deleteSymposiumFeedBreakDown})=>{
	const [displayPostTypeOption,changeDisplayPostTypeOption]=useState(false);
	const [selectedPostType,changeSelectedPostType]=useState("Images");

	const updatedSelectedPostType=(selectedPostType)=>{
		if(selectedPostType=="Text"){
			selectedPostType="RegularPosts";
		}
		changeSelectedPostType(selectedPostType);
	}

	const deleteSymposium=async()=>{
		const {confirmation,data}=await deleteSymposiumFeedRecommedonations(
			userId,
			symposiumId,
			selectedPostType);

		if(confirmation=="Success"){
			alert("Deleted symposium");
			deleteSymposiumFeedBreakDown(symposiumId);
			closeModal();
		}else{
			alert("Unfortunatley an error has occured when delete this symposium from your feed. Please try again");
		}
	}
	return(
		<div style={{display:"flex",flexDirection:"column"}}>
			<div style={ButtonCSS} onClick={()=>closeModal()}>
				Back
			</div>
			{displayPostTypeOption==true?
				<React.Fragment>
					<p>Select which which post-type feed you want to deleted</p>
					<div class="btn-group">
						<button class="btn btn-primary dropdown-toggle" type="button" 
							data-toggle="dropdown" style={DeleteSymposiumOptions}>
							{selectedPostType}
							<ArrowDropDownCircleOutlinedIcon
								style={{fontSize:"15",color:"7C7C7C",marginLeft:"10px"}}
							/>
						</button>
						<ul class="dropdown-menu" style={{padding:"10px"}}>
							<li style={{cursor:"pointer"}}
								onClick={()=>updatedSelectedPostType("Images")}>
								Images 
							</li>
							<hr/>	
							<li style={{cursor:"pointer"}}
								onClick={()=>updatedSelectedPostType("Videos")}>
								Videos
							</li>	
							<hr/>
							<li style={{cursor:"pointer"}}
								onClick={()=>updatedSelectedPostType("Blogs")}>
								Blogs
							</li>	
							<hr/>
							<li style={{cursor:"pointer"}}
								onClick={()=>updatedSelectedPostType("Text")}>
								Text
							</li>	
						</ul>
					</div>	
					<div style={DeletionIndicatorButtonCSS} onClick={()=>deleteSymposium()}>
						Delete
					</div>
				</React.Fragment>:
				<React.Fragment>
					<p> Are you sure you want to delete this symposium from your feed?</p>
					<div style={{display:"flex",flexDirection:"row"}} onClick={()=>changeDisplayPostTypeOption(true)}>
						<div style={DeletionIndicatorButtonCSS}>
							Yes
						</div>
						<div style={DeletionIndicatorButtonCSS} onClick={()=>closeModal()}>
							No
						</div>
					</div>
				</React.Fragment>
			}
		</div>
	)
}

export default DeleteSymposiumFeed;