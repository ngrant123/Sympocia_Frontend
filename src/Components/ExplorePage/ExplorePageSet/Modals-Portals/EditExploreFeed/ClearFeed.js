import React,{useState} from "react";
import styled from "styled-components";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {clearFeedRecommendations} from "../../../../../Actions/Requests/ExplorePageRequests/ExplorePageAdapter.js";

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

const ClearFeedIndicatorButtonCSS={
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

const ClearFeedPostOptions={
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

const HelpIconOptionsCSS={
	borderStyle:"none",
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

const ClearFeed=({closeModal,symposiumId,userId,clearFeedBreakDowns})=>{
	const [displayPostTypeOption,changeDisplayPostTypeOption]=useState(false);
	const [selectedPostType,changeSelectedPostType]=useState("Images");

	const updatedSelectedPostType=(selectedPostType)=>{
		if(selectedPostType=="Text"){
			selectedPostType="RegularPosts";
		}
		changeSelectedPostType(selectedPostType);
	}

	const clearFeed=async()=>{
		debugger;
		const {confirmation,data}=await clearFeedRecommendations(userId,selectedPostType );
		if(confirmation=="Success"){
			alert("Feed cleared");
			clearFeedBreakDowns();
			closeModal();
		}else{
			alert('Unfortunately there has been an error when clearing this feed. Please try again');
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
							data-toggle="dropdown" style={ClearFeedPostOptions}>
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
					<div style={ClearFeedIndicatorButtonCSS} onClick={()=>clearFeed()}>
						Clear Feed
					</div>
				</React.Fragment>:
				<React.Fragment>
					<div style={{display:"flex",flexDirection:"row"}}>
						<p style={{width:"80%"}}>
							Are you sure you want to clear your symposium feed? Click on the question mark 
							for more information about what it does
						</p>
						<div class="btn-group">
							<button class="btn btn-primary dropdown-toggle" type="button" 
								data-toggle="dropdown" style={HelpIconOptionsCSS}>
								<HelpOutlineOutlinedIcon style={{fontSize:"25"}}/>
							</button>
							<ul class="dropdown-menu" style={{marginLeft:"-100px",padding:"10px"}}>
								<li style={{cursor:"pointer"}}>
									<p>
										Your feed for the selected post type will be cleared specifically but the
										symposium relationship values for all post-types will be cleared also. 
									</p>
								</li>
							</ul>
						</div>	
					</div>

					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={ClearFeedIndicatorButtonCSS} onClick={()=>changeDisplayPostTypeOption(true)}>
							Yes
						</div>
						<div style={ClearFeedIndicatorButtonCSS} onClick={()=>closeModal()}>
							No
						</div>
					</div>
				</React.Fragment>
			}
		</div>
	)
}

export default ClearFeed;