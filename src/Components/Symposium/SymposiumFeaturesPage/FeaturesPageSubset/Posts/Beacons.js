import React,{useState,useContext} from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {PostsHeader} from "./index.js";
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Images from "./PostDisplay/Images.js";
import Videos from "./PostDisplay/Videos.js";
import RegularPosts from "./PostDisplay/RegularPosts.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:100%;
	@media screen and (max-width:650px){
		#currentSelectedPostOption{
			display:none !important;
		}
		#beaconsPostOptions{
			margin-right:10px !important;
			margin-left:-20px !important;
		}
	}
`;

const PostsContainer=styled.div`
	margin-top:2%;
	width:100%;
`;

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer",
	marginLeft:"10%"
}

const PostTypeCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	borderColor:"#D8D8D8",
	display:"flex",
	alignItems:"center",
	flexDirection:"row",
	justifyContent:"center",
	padding:"10px",
	backgroundColor:"white",
	color:"#000000",
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"110%",
	height:"1px"
}

const SelectedPostTypeCSS={
	display:"flex",
	alignItems:"center",
	flexDirection:"row",
	justifyContent:"center",
	padding:"10px",
	backgroundColor:"#5298F8",
	color:"white",
	borderRadius:"5px",
	minWidth:"70%",
	marginLeft:"10%"
}

const BeaconPosts=({featuresType})=>{
	const [postType,changePostType]=useState("Images");
	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		featuresPagePrimaryInformation:{
			posts
		}
	}=featuresPageConsumer;
	
	const postsDisplayFunctionality=()=>{
		switch(postType){
			case "Images":{
				return <Images posts={posts}/>
			}
			case "Videos":{
				return <Videos posts={posts}/>
			}

			case "Regular":{
				return <RegularPosts posts={posts}/>
			}
		}
	}

	const displaySpecificBeaconPostType=(selectedPostType)=>{
		changePostType(selectedPostType);
	}

	return(
		<Container>
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
				<PostsHeader
					featuresType={featuresType}
					triggerPostTypeChange={displaySpecificBeaconPostType}
				/>
				<div id="beaconsPostOptions"
					style={{display:"flex",flexDirection:"row",alignItems:"center",marginRight:"165px"}}>
					<div class="dropdown">
						<button class="btn btn-primary dropdown-toggle" id="text"
							type="button" data-toggle="dropdown" style={PostTypeCSS}>
							<p>Post Type</p>
							<ArrowDropDownIcon
								style={{marginTop:"-10"}}
							/>
						</button>
						<ul class="dropdown-menu" style={{padding:"5px",height:"250px",overflowY:"auto",overflowX:"hidden"}}>
							<li style={{listStyle:"none",cursor:"pointer"}}
								onClick={()=>displaySpecificBeaconPostType("Images")}>
								Images
							</li>
							<hr/>

							<li style={{listStyle:"none",cursor:"pointer"}}
								onClick={()=>displaySpecificBeaconPostType("Videos")}>
								Videos
							</li>
							<hr/>

							<li style={{listStyle:"none",cursor:"pointer"}}
								onClick={()=>displaySpecificBeaconPostType("Regular")}>
								Regular Posts
							</li>
							<hr/>
						</ul>
				  	</div>
				  	<div id="currentSelectedPostOption" style={SelectedPostTypeCSS}>
				  		<p>{postType}</p>
				  		<HighlightOffIcon
				  			style={{marginLeft:"5%",marginTop:"-5px"}}
				  		/>
				  	</div>
				</div>
			</div>
			<hr style={HorizontalLineCSS}/>
			<PostsContainer>
				{postsDisplayFunctionality()}
			</PostsContainer>
		</Container>
	)
}


export default BeaconPosts;