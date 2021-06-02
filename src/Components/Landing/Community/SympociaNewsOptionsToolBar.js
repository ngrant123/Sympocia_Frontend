import React from "react";
import styled from "styled-components";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const TitleContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:5%;

	@media screen and (max-width:650px){
		flex-direction:column;
		#sympociaNewsHeader{
			display:none !important;
		}
	}
`;

const SearchOptions=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:none;
	width:20%;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;
	margin-left:2%;

	@media screen and (max-width:700px){
		width:95% !important;
	}
`;

const PostTypeOptionButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	borderRadius:"0px",
	borderStyle:"solid",
	marginRight:"5%",
	marginBottom:"2%",
	cursor:"pointer",
	borderBottom:"2px",
	borderColor:"#5298F8",
	borderStyle:"none",
	textDecoration:"none",
	borderBottom:"3px solid #5298F8"
}

const PostFilterButtonCSS={
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#D8D8D8",
	backgroundColor:"white",
	color:"#C6C6C6",
	marginLeft:"2%"
}

const PostOptionButtonCSS={
	listStyle:"none",
	fontSize:"17px",
	padding:"10px",
	textDecoration:"none",
	color:"#C8B0F4",
	cursor:"pointer"
}

const SympociaNewsOptionToolBar=({changePostTypeOption,news,interviews})=>{
	return(
		<React.Fragment>
			<TitleContainer>
				<p id="sympociaNewsHeader" style={{fontSize:"40px",marginRight:"5%"}}>
					<b>Sympocia Community</b>
				</p>
				<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
						style={PostTypeOptionButtonCSS}>
						News
				   		<ArrowDropDownCircleOutlinedIcon
				   			style={{marginLeft:"20px",fontSize:"20",color:"#C2C2C2"}}
				   		/>
					</button>
					<ul class="dropdown-menu">
						<li style={PostOptionButtonCSS} onClick={()=>changePostTypeOption(true)}>
							News
						</li>
						<hr/>
						<li style={PostOptionButtonCSS} onClick={()=>changePostTypeOption(false)}>
							Interviews
						</li>
					</ul>
				</div>
			</TitleContainer>

			{/*
				<SearchOptions>
					<SearchOutlinedIcon
						style={{fontSize:"20",marginTop:"1%"}}
					/>
					<InputContainer
						placeholder="Search posts...."
					/>
					<div class="dropdown">
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
							style={PostFilterButtonCSS}>
								Sort By
						</button>
						<ul class="dropdown-menu">
							<li style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>
								<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
									Date
								</a>
							</li>
						</ul>
					</div>
					<div class="dropdown" style={{marginLeft:"2%"}}>
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
							style={PostFilterButtonCSS}>
								Symposiums
						</button>
						<ul class="dropdown-menu">
							<li style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>
								<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
									Blogs
								</a>
							</li>
							<li style={{listStyle:"none",fontSize:"17px",padding:"10px"}}>
								<a id="images" href="javascript:void(0);" style={{textDecoration:"none",color:"#C8B0F4"}}>
									Videos
								</a>
							</li>
						</ul>
					</div>
				</SearchOptions>
			*/}
		</React.Fragment>
	)
}

export default SympociaNewsOptionToolBar;

